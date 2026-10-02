import { SFXParams } from '../types/sfx';
import { audioBufferToWav } from './wavEncoder';

class SFXEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private isMuted: boolean = false;

  private getAudioContext(): AudioContext | null {
    try {
      if (!this.ctx) {
        const AudioCtxClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtxClass) return null;
        this.ctx = new AudioCtxClass();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 1024;
        this.analyser.smoothingTimeConstant = 0.75;
        this.analyser.connect(this.ctx.destination);
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public getAnalyser(): AnalyserNode | null {
    if (!this.analyser) {
      this.getAudioContext();
    }
    return this.analyser;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  // Create BitCrush transfer curve for WaveShaperNode
  private createBitCrushCurve(bits: number): Float32Array | null {
    if (bits <= 0 || bits >= 16) return null;
    const n = 4096;
    const arrayBuffer = new ArrayBuffer(n * 4);
    const curve = new Float32Array(arrayBuffer);
    const steps = Math.pow(2, bits);
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      curve[i] = Math.round(x * steps) / steps;
    }
    return curve;
  }

  // Create White/NES-style Noise Buffer
  private createNoiseBuffer(ctx: BaseAudioContext, duration: number): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const bufferSize = Math.max(1, Math.floor(sampleRate * Math.max(0.5, duration)));
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const output = buffer.getChannelData(0);
    
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.03 * white) / 1.03;
      lastOut = output[i];
      output[i] *= 3.0;
    }
    return buffer;
  }

  /**
   * Set up audio nodes inside a BaseAudioContext
   */
  private setupGraph(
    ctx: BaseAudioContext,
    destination: AudioNode,
    params: SFXParams,
    pitchMultiplier = 1.0
  ): { duration: number; stop: () => void } {
    // For realtime context, add 15ms lookahead to ensure timestamps are never in the past
    const isOffline = ctx instanceof (window.OfflineAudioContext || (window as unknown as { webkitOfflineAudioContext: typeof OfflineAudioContext }).webkitOfflineAudioContext);
    const t0 = isOffline ? 0 : ctx.currentTime + 0.015;

    const isMelody = Boolean(params.melodyNotes && params.melodyNotes.length > 0);

    // 1. Duration calculation
    let totalDuration: number;
    if (isMelody) {
      totalDuration = params.melodyNotes!.reduce((sum, n) => sum + Math.max(0.04, n.duration), 0) + 0.1;
    } else {
      const attackTime = Math.max(0.003, params.attackTime);
      const sustainTime = Math.max(0.03, params.sustainTime);
      const decayTime = Math.max(0.08, params.decayTime);
      totalDuration = attackTime + sustainTime + decayTime;
    }

    // 2. Master Gain & FX chain (Filter & BitCrush)
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(1.0, t0);

    let effectChain: AudioNode = masterGain;

    // Filter
    if (params.filterType !== 'none') {
      const filter = ctx.createBiquadFilter();
      filter.type = params.filterType;
      filter.frequency.setValueAtTime(Math.max(20, Math.min(20000, params.filterCutoff)), t0);
      filter.Q.setValueAtTime(Math.max(0.1, params.filterResonance), t0);
      effectChain.connect(filter);
      effectChain = filter;
    }

    // BitCrusher
    if (params.bitCrush > 0 && params.bitCrush < 16) {
      const shaper = ctx.createWaveShaper();
      const curve = this.createBitCrushCurve(params.bitCrush);
      if (curve) {
        shaper.curve = curve as unknown as Float32Array<ArrayBuffer>;
        effectChain.connect(shaper);
        effectChain = shaper;
      }
    }

    effectChain.connect(destination);

    // 3. Sound Generation
    let sourceStop: () => void = () => {};

    if (params.waveType === 'noise') {
      const gainNode = ctx.createGain();
      const peakVolume = Math.min(1.0, Math.max(0.05, params.masterVolume * (1 + params.punch * 0.4)));

      const noiseBuffer = this.createNoiseBuffer(ctx, totalDuration + 0.5);
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.connect(gainNode);
      gainNode.connect(masterGain);

      const attackEnd = t0 + Math.max(0.003, params.attackTime);
      const sustainEnd = attackEnd + Math.max(0.02, params.sustainTime);
      const decayEnd = sustainEnd + Math.max(0.05, params.decayTime);

      gainNode.gain.setValueAtTime(0.0001, t0);
      gainNode.gain.linearRampToValueAtTime(peakVolume, attackEnd);
      gainNode.gain.linearRampToValueAtTime(peakVolume * Math.max(0.15, params.sustainLevel), sustainEnd);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, decayEnd);

      noiseSource.start(t0);
      noiseSource.stop(decayEnd + 0.05);
      sourceStop = () => {
        try {
          noiseSource.stop();
        } catch {}
      };
    } else if (isMelody) {
      // NOTE SEQUENCE (MELODIC ARPEGGIO): Coin, 1-UP, Victory, Powerup, Game Over
      const notes = params.melodyNotes!;
      const peakVolume = Math.min(1.0, Math.max(0.08, params.masterVolume * (1 + params.punch * 0.3)));
      const activeOscillators: OscillatorNode[] = [];
      let elapsed = 0;

      notes.forEach((note, index) => {
        const isLast = index === notes.length - 1;
        const startTime = t0 + elapsed;
        const noteDuration = Math.max(0.04, note.duration);
        const noteFreq = Math.max(20, note.freq * pitchMultiplier);

        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = params.waveType as OscillatorType;
        osc.frequency.setValueAtTime(noteFreq, startTime);

        // Connect and start oscillator FIRST before scheduling stop
        osc.connect(noteGain);
        noteGain.connect(masterGain);
        osc.start(startTime);

        // Immediate punchy 8-bit attack at note startTime
        noteGain.gain.setValueAtTime(peakVolume, startTime);

        if (!isLast) {
          // Sharp staccato decay to 0.001 over noteDuration
          const releaseTime = startTime + noteDuration;
          noteGain.gain.exponentialRampToValueAtTime(0.001, releaseTime);
          osc.stop(releaseTime + 0.01);
        } else {
          // Final note: holds and then fades out over noteDuration
          const holdTime = Math.min(0.15, noteDuration * 0.4);
          noteGain.gain.setValueAtTime(peakVolume * Math.max(0.4, params.sustainLevel), startTime + holdTime);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + noteDuration);
          osc.stop(startTime + noteDuration + 0.05);

          // Vibrato on final note if requested
          if (params.vibratoDepth > 0 && params.vibratoSpeed > 0) {
            const lfo = ctx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.setValueAtTime(params.vibratoSpeed, startTime);
            const lfoGain = ctx.createGain();
            lfoGain.gain.setValueAtTime(params.vibratoDepth, startTime);
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start(startTime + 0.02);
            lfo.stop(startTime + noteDuration + 0.05);
          }
        }

        activeOscillators.push(osc);
        elapsed += noteDuration;
      });

      sourceStop = () => {
        activeOscillators.forEach((o) => {
          try {
            o.stop();
          } catch {}
        });
      };
    } else {
      // Monophonic Pitch Slide (Jump, Laser, Hit, Warp, etc.)
      const gainNode = ctx.createGain();
      const peakVolume = Math.min(1.0, Math.max(0.05, params.masterVolume * (1 + params.punch * 0.4)));

      gainNode.connect(masterGain);

      const attackTime = Math.max(0.003, params.attackTime);
      const sustainTime = Math.max(0.02, params.sustainTime);
      const decayTime = Math.max(0.05, params.decayTime);

      const tAttack = t0 + attackTime;
      const tSustain = tAttack + sustainTime;
      const tDecay = tSustain + decayTime;

      gainNode.gain.setValueAtTime(0.0001, t0);
      gainNode.gain.linearRampToValueAtTime(peakVolume, tAttack);
      gainNode.gain.linearRampToValueAtTime(
        Math.max(0.0001, peakVolume * Math.max(0.1, params.sustainLevel)),
        tSustain
      );
      gainNode.gain.exponentialRampToValueAtTime(0.0001, tDecay);

      const osc = ctx.createOscillator();
      osc.type = params.waveType as OscillatorType;

      const baseStart = Math.max(20, params.startFreq * pitchMultiplier);
      const baseEnd = Math.max(20, params.endFreq * pitchMultiplier);

      osc.frequency.setValueAtTime(baseStart, t0);

      const slideDuration = Math.max(0.04, Math.min((tDecay - t0) * 0.95, params.pitchSlideTime));
      const tSlideEnd = t0 + slideDuration;

      if (params.hasArpeggio && params.arpPitch > 0) {
        const arpTarget = Math.max(20, params.arpPitch * pitchMultiplier);
        const tArp = t0 + Math.max(0.02, Math.min(slideDuration * 0.5, params.arpTime));

        osc.frequency.setValueAtTime(baseStart, t0);
        osc.frequency.setValueAtTime(arpTarget, tArp);

        const tAfterArp = Math.max(tArp + 0.01, tSlideEnd);
        if (params.slideCurve === 'exponential') {
          osc.frequency.exponentialRampToValueAtTime(baseEnd, tAfterArp);
        } else {
          osc.frequency.linearRampToValueAtTime(baseEnd, tAfterArp);
        }
      } else {
        if (params.slideCurve === 'exponential') {
          osc.frequency.exponentialRampToValueAtTime(baseEnd, tSlideEnd);
        } else {
          osc.frequency.linearRampToValueAtTime(baseEnd, tSlideEnd);
        }
      }

      // Vibrato
      if (params.vibratoDepth > 0 && params.vibratoSpeed > 0) {
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(params.vibratoSpeed, t0);

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(params.vibratoDepth, t0);

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        const lfoStart = t0 + Math.max(0, Math.min(params.vibratoDelay, totalDuration * 0.5));
        const lfoStop = t0 + totalDuration + 0.05;
        if (lfoStop > lfoStart) {
          lfo.start(lfoStart);
          lfo.stop(lfoStop);
        }
      }

      osc.connect(gainNode);
      osc.start(t0);
      osc.stop(tDecay + 0.05);

      sourceStop = () => {
        try {
          osc.stop();
        } catch {}
      };
    }

    return {
      duration: totalDuration + 0.05,
      stop: sourceStop,
    };
  }

  /**
   * Play real-time sound effect
   */
  public play(params: SFXParams, pitchMultiplier = 1.0): void {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx || !this.analyser) return;

      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      this.setupGraph(ctx, this.analyser, params, pitchMultiplier);
    } catch (err) {
      console.error('Playback error:', err);
    }
  }

  /**
   * Render offline and generate WAV Blob for download
   */
  public async renderToWav(
    params: SFXParams,
    sampleRate: 44100 | 22050 | 11025 = 44100,
    bitDepth: 16 | 8 = 16
  ): Promise<{ blob: Blob; url: string; sizeBytes: number; duration: number }> {
    try {
      let totalDuration: number;
      if (params.melodyNotes && params.melodyNotes.length > 0) {
        totalDuration = params.melodyNotes.reduce((sum, n) => sum + Math.max(0.04, n.duration), 0) + 0.1;
      } else {
        const attackTime = Math.max(0.003, params.attackTime);
        const sustainTime = Math.max(0.03, params.sustainTime);
        const decayTime = Math.max(0.08, params.decayTime);
        totalDuration = attackTime + sustainTime + decayTime + 0.08;
      }

      const numSamples = Math.ceil(sampleRate * totalDuration);

      const OfflineCtxClass =
        window.OfflineAudioContext ||
        (window as unknown as { webkitOfflineAudioContext: typeof OfflineAudioContext }).webkitOfflineAudioContext;

      const offlineCtx = new OfflineCtxClass(1, numSamples, sampleRate);

      this.setupGraph(offlineCtx, offlineCtx.destination, params);

      const renderedBuffer = await offlineCtx.startRendering();
      const wavBlob = audioBufferToWav(renderedBuffer, bitDepth);
      const url = URL.createObjectURL(wavBlob);

      return {
        blob: wavBlob,
        url,
        sizeBytes: wavBlob.size,
        duration: totalDuration,
      };
    } catch (err) {
      console.error('renderToWav error:', err);
      throw err;
    }
  }
}

export const sfxEngine = new SFXEngine();
