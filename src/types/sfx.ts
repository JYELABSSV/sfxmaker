export type WaveType = 'square' | 'sawtooth' | 'triangle' | 'sine' | 'noise';

export type SlideCurve = 'linear' | 'exponential' | 'jump';

export interface SFXParams {
  id: string;
  name: string;
  category: 'jump' | 'coin' | 'laser' | 'hit' | 'explosion' | 'powerup' | 'gameover' | 'blip' | 'magic' | 'secret' | 'dash' | 'alert' | 'level_up' | 'shield' | 'custom';
  
  // Waveform
  waveType: WaveType;
  dutyCycle: number; // 0.1 to 0.9 (for square wave pulse width)

  // Frequency & Pitch
  startFreq: number; // 20Hz - 3000Hz
  endFreq: number; // 20Hz - 3000Hz
  pitchSlideTime: number; // seconds (0.01 - 1.0)
  slideCurve: SlideCurve;
  
  // Arpeggio / Pitch Step (e.g. coin pickup, extra life)
  hasArpeggio: boolean;
  arpPitch: number; // Target frequency for second note (Hz)
  arpTime: number; // Time when arp jumps (seconds from start, e.g. 0.05 - 0.3)
  melodyNotes?: { freq: number; duration: number }[]; // Multi-note melodic chiptune sequences (1-Up, Victory, Fanfare)

  // Volume & Envelope (ADSR)
  attackTime: number; // seconds (0.001 - 0.5)
  sustainTime: number; // seconds (0 - 0.8)
  decayTime: number; // seconds (0.01 - 1.5)
  sustainLevel: number; // 0 - 1
  punch: number; // 0 - 1 (initial punch volume spike)
  masterVolume: number; // 0 - 1

  // Vibrato (Frequency Modulation LFO)
  vibratoDepth: number; // 0 - 200 Hz
  vibratoSpeed: number; // 0 - 40 Hz
  vibratoDelay: number; // seconds (0 - 0.5)

  // Filter & Vintage Crunch
  filterType: 'none' | 'lowpass' | 'highpass';
  filterCutoff: number; // 100 - 15000 Hz
  filterResonance: number; // 0.1 - 15 (Q)
  bitCrush: number; // 0 (off), 16, 12, 8, 4 bits
}

export interface ExportSettings {
  sampleRate: 44100 | 22050 | 11025;
  bitDepth: 16 | 8;
  format: 'wav';
}

export interface SoundHistoryItem {
  id: string;
  params: SFXParams;
  timestamp: number;
  isFavorite?: boolean;
}
