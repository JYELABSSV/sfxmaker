import { SFXParams } from '../types/sfx';

export const PRESETS: SFXParams[] = [
  {
    id: 'jump',
    name: '점프 (Jump)',
    category: 'jump',
    waveType: 'square',
    dutyCycle: 0.5,
    startFreq: 140,
    endFreq: 640,
    pitchSlideTime: 0.32,
    slideCurve: 'exponential',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    attackTime: 0.005,
    sustainTime: 0.12,
    decayTime: 0.38,
    sustainLevel: 0.75,
    punch: 0.3,
    masterVolume: 0.7,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    vibratoDelay: 0,
    filterType: 'none',
    filterCutoff: 8000,
    filterResonance: 1,
    bitCrush: 8,
  },
  {
    id: 'coin',
    name: '코인 획득 (Coin)',
    category: 'coin',
    waveType: 'square',
    dutyCycle: 0.5,
    startFreq: 987,
    endFreq: 1318,
    pitchSlideTime: 0.42,
    slideCurve: 'jump',
    hasArpeggio: true,
    arpPitch: 1318,
    arpTime: 0.07,
    // B5(987Hz)를 0.07초 짧게 치고 바로 E6(1318Hz)로 올려서 0.35초 유지하는 2단 벨소리
    melodyNotes: [
      { freq: 987.77, duration: 0.07 }, // B5: 0.07s
      { freq: 1318.51, duration: 0.35 }, // E6: 0.35s
    ],
    attackTime: 0.005,
    sustainTime: 0.15,
    decayTime: 0.35,
    sustainLevel: 0.7,
    punch: 0.35,
    masterVolume: 0.7,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    vibratoDelay: 0,
    filterType: 'highpass',
    filterCutoff: 250,
    filterResonance: 1,
    bitCrush: 8,
  },
  {
    id: 'laser',
    name: '레이저 (Laser)',
    category: 'laser',
    waveType: 'sawtooth',
    dutyCycle: 0.5,
    startFreq: 1550,
    endFreq: 120,
    pitchSlideTime: 0.28,
    slideCurve: 'exponential',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    attackTime: 0.002,
    sustainTime: 0.08,
    decayTime: 0.36,
    sustainLevel: 0.5,
    punch: 0.4,
    masterVolume: 0.65,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    vibratoDelay: 0,
    filterType: 'none',
    filterCutoff: 10000,
    filterResonance: 1,
    bitCrush: 8,
  },
  {
    id: 'hit',
    name: '피격 / 대미지 (Hit)',
    category: 'hit',
    waveType: 'noise',
    dutyCycle: 0.5,
    startFreq: 340,
    endFreq: 65,
    pitchSlideTime: 0.25,
    slideCurve: 'exponential',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    attackTime: 0.003,
    sustainTime: 0.06,
    decayTime: 0.34,
    sustainLevel: 0.45,
    punch: 0.5,
    masterVolume: 0.75,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    vibratoDelay: 0,
    filterType: 'lowpass',
    filterCutoff: 2600,
    filterResonance: 2.2,
    bitCrush: 4,
  },
  {
    id: 'explosion',
    name: '폭발 (Explosion)',
    category: 'explosion',
    waveType: 'noise',
    dutyCycle: 0.5,
    startFreq: 220,
    endFreq: 35,
    pitchSlideTime: 0.6,
    slideCurve: 'linear',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    attackTime: 0.008,
    sustainTime: 0.18,
    decayTime: 0.82,
    sustainLevel: 0.55,
    punch: 0.55,
    masterVolume: 0.8,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    vibratoDelay: 0,
    filterType: 'lowpass',
    filterCutoff: 1400,
    filterResonance: 3.0,
    bitCrush: 4,
  },
  {
    id: 'one_up',
    name: '1-UP 보너스 (1-Up)',
    category: 'powerup',
    waveType: 'square',
    dutyCycle: 0.5,
    startFreq: 659,
    endFreq: 1568,
    pitchSlideTime: 0.38,
    slideCurve: 'jump',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    // 슈퍼마리오 오리지널 1-UP: 초고속 6음 띠리리리링 (각 음 0.055초 초고속 스피드)
    melodyNotes: [
      { freq: 659.25, duration: 0.055 }, // E5
      { freq: 783.99, duration: 0.055 }, // G5
      { freq: 1318.51, duration: 0.055 }, // E6
      { freq: 1046.50, duration: 0.055 }, // C6
      { freq: 1174.66, duration: 0.055 }, // D6
      { freq: 1567.98, duration: 0.28 },  // G6 (경쾌하고 깔끔한 마무리)
    ],
    attackTime: 0.003,
    sustainTime: 0.12,
    decayTime: 0.28,
    sustainLevel: 0.8,
    punch: 0.35,
    masterVolume: 0.72,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    vibratoDelay: 0,
    filterType: 'none',
    filterCutoff: 10000,
    filterResonance: 1,
    bitCrush: 8,
  },
  {
    id: 'victory',
    name: '승리 팡파르 (Victory)',
    category: 'powerup',
    waveType: 'sawtooth', // 웅장한 브라스 음색 (1-UP의 사각파와 명확히 구분)
    dutyCycle: 0.5,
    startFreq: 392,
    endFreq: 784,
    pitchSlideTime: 0.95,
    slideCurve: 'jump',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    // 클래식 아케이드 웅장한 승리 팡파르: "따-다-다-딴! 다-따안~!" 리듬
    melodyNotes: [
      { freq: 392.00, duration: 0.10 }, // G4 (따)
      { freq: 523.25, duration: 0.10 }, // C5 (다)
      { freq: 659.25, duration: 0.10 }, // E5 (다)
      { freq: 783.99, duration: 0.24 }, // G5 (딴!)
      { freq: 659.25, duration: 0.12 }, // E5 (다)
      { freq: 783.99, duration: 0.55 }, // G5 (따안~~! 찬란한 영광의 비브라토)
    ],
    attackTime: 0.005,
    sustainTime: 0.25,
    decayTime: 0.55,
    sustainLevel: 0.85,
    punch: 0.35,
    masterVolume: 0.74,
    vibratoDepth: 25,
    vibratoSpeed: 16,
    vibratoDelay: 0.02,
    filterType: 'none',
    filterCutoff: 10000,
    filterResonance: 1,
    bitCrush: 8,
  },
  {
    id: 'powerup',
    name: '파워업 (Powerup)',
    category: 'powerup',
    waveType: 'triangle',
    dutyCycle: 0.5,
    startFreq: 392,
    endFreq: 1046,
    pitchSlideTime: 0.5,
    slideCurve: 'jump',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    // Ascending powerup sparkle arpeggio: G4 -> C5 -> E5 -> G5 -> C6
    melodyNotes: [
      { freq: 392.00, duration: 0.07 }, // G4
      { freq: 523.25, duration: 0.07 }, // C5
      { freq: 659.25, duration: 0.07 }, // E5
      { freq: 783.99, duration: 0.08 }, // G5
      { freq: 1046.50, duration: 0.40 }, // C6
    ],
    attackTime: 0.008,
    sustainTime: 0.18,
    decayTime: 0.45,
    sustainLevel: 0.75,
    punch: 0.25,
    masterVolume: 0.72,
    vibratoDepth: 22,
    vibratoSpeed: 20,
    vibratoDelay: 0.05,
    filterType: 'none',
    filterCutoff: 8000,
    filterResonance: 1,
    bitCrush: 12,
  },
  {
    id: 'game_over',
    name: '게임 오버 (Game Over)',
    category: 'gameover',
    waveType: 'sawtooth',
    dutyCycle: 0.5,
    startFreq: 523,
    endFreq: 415,
    pitchSlideTime: 0.85,
    slideCurve: 'linear',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    // Classic melancholic chromatic defeat sequence
    melodyNotes: [
      { freq: 523.25, duration: 0.16 }, // C5
      { freq: 392.00, duration: 0.16 }, // G4
      { freq: 329.63, duration: 0.20 }, // E4
      { freq: 440.00, duration: 0.18 }, // A4
      { freq: 493.88, duration: 0.18 }, // B4
      { freq: 440.00, duration: 0.18 }, // A4
      { freq: 415.30, duration: 0.20 }, // G#4
      { freq: 466.16, duration: 0.20 }, // A#4
      { freq: 415.30, duration: 0.50 }, // G#4
    ],
    attackTime: 0.015,
    sustainTime: 0.25,
    decayTime: 0.65,
    sustainLevel: 0.6,
    punch: 0.2,
    masterVolume: 0.68,
    vibratoDepth: 18,
    vibratoSpeed: 8,
    vibratoDelay: 0.15,
    filterType: 'lowpass',
    filterCutoff: 3200,
    filterResonance: 2,
    bitCrush: 8,
  },
  {
    id: 'blip',
    name: '선택음 (Blip)',
    category: 'blip',
    waveType: 'square',
    dutyCycle: 0.5,
    startFreq: 700,
    endFreq: 940,
    pitchSlideTime: 0.12,
    slideCurve: 'linear',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    attackTime: 0.003,
    sustainTime: 0.06,
    decayTime: 0.2,
    sustainLevel: 0.5,
    punch: 0.3,
    masterVolume: 0.65,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    vibratoDelay: 0,
    filterType: 'none',
    filterCutoff: 8000,
    filterResonance: 1,
    bitCrush: 16,
  },
  {
    id: 'warp',
    name: '워프 / 텔레포트 (Warp)',
    category: 'custom',
    waveType: 'sawtooth', // 공상과학 레이저 빔 / 포털 텔레포트 음색
    dutyCycle: 0.5,
    startFreq: 2100, // 초고주파에서 시작하여
    endFreq: 110,    // 급격히 빨려 들어가는 웜홀 사운드
    pitchSlideTime: 0.55,
    slideCurve: 'exponential',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    attackTime: 0.003,
    sustainTime: 0.15,
    decayTime: 0.52,
    sustainLevel: 0.6,
    punch: 0.3,
    masterVolume: 0.72,
    vibratoDepth: 160, // 극적인 45Hz SF 텔레포트 쉬머 모듈레이션
    vibratoSpeed: 45,
    vibratoDelay: 0.01,
    filterType: 'highpass',
    filterCutoff: 700,
    filterResonance: 3.2,
    bitCrush: 6, // 디지털 양자 분해 크런치
  },
  {
    id: 'bounce',
    name: '바운스 (Bounce)',
    category: 'custom',
    waveType: 'triangle', // 부드럽고 탄력 있는 고무 삼각파
    dutyCycle: 0.5,
    startFreq: 220,
    endFreq: 640,
    pitchSlideTime: 0.38,
    slideCurve: 'linear',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    // 카툰/아케이드 특유의 탄력 있는 "통-보오잉~!" 2단 스프링 바운스
    melodyNotes: [
      { freq: 240, duration: 0.07 }, // 통! (첫 번째 작은 바운스)
      { freq: 380, duration: 0.06 }, // (스프링 반동)
      { freq: 190, duration: 0.06 }, // (압축)
      { freq: 580, duration: 0.32 }, // 보~잉! (길고 탄력 있는 본 바운스)
    ],
    attackTime: 0.005,
    sustainTime: 0.12,
    decayTime: 0.35,
    sustainLevel: 0.7,
    punch: 0.45,
    masterVolume: 0.75,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    vibratoDelay: 0,
    filterType: 'lowpass',
    filterCutoff: 3800,
    filterResonance: 1.5,
    bitCrush: 12,
  },
  {
    id: 'magic',
    name: '별빛 마법 (Magic Spell)',
    category: 'magic',
    waveType: 'sine',
    dutyCycle: 0.5,
    startFreq: 1318,
    endFreq: 2637,
    pitchSlideTime: 0.55,
    slideCurve: 'jump',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    // Shimmering fairy sparkle arpeggio: E6 -> G6 -> B6 -> E7
    melodyNotes: [
      { freq: 1318.51, duration: 0.06 }, // E6
      { freq: 1567.98, duration: 0.06 }, // G6
      { freq: 1975.53, duration: 0.07 }, // B6
      { freq: 2637.02, duration: 0.42 }, // E7
    ],
    attackTime: 0.005,
    sustainTime: 0.15,
    decayTime: 0.48,
    sustainLevel: 0.8,
    punch: 0.25,
    masterVolume: 0.72,
    vibratoDepth: 38,
    vibratoSpeed: 24,
    vibratoDelay: 0.02,
    filterType: 'none',
    filterCutoff: 12000,
    filterResonance: 1,
    bitCrush: 12,
  },
  {
    id: 'secret',
    name: '비밀 발견 (Secret Found)',
    category: 'secret',
    waveType: 'triangle',
    dutyCycle: 0.5,
    startFreq: 392,
    endFreq: 784,
    pitchSlideTime: 0.85,
    slideCurve: 'jump',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    // Classic mystery solved chime: G4 -> C5 -> E5 -> G5
    melodyNotes: [
      { freq: 392.00, duration: 0.12 }, // G4
      { freq: 523.25, duration: 0.12 }, // C5
      { freq: 659.25, duration: 0.12 }, // E5
      { freq: 783.99, duration: 0.52 }, // G5
    ],
    attackTime: 0.008,
    sustainTime: 0.22,
    decayTime: 0.55,
    sustainLevel: 0.78,
    punch: 0.3,
    masterVolume: 0.75,
    vibratoDepth: 18,
    vibratoSpeed: 10,
    vibratoDelay: 0.08,
    filterType: 'none',
    filterCutoff: 8000,
    filterResonance: 1,
    bitCrush: 16,
  },
  {
    id: 'dash',
    name: '스피드 대시 (Speed Dash)',
    category: 'dash',
    waveType: 'sawtooth',
    dutyCycle: 0.5,
    startFreq: 1900,
    endFreq: 240,
    pitchSlideTime: 0.22,
    slideCurve: 'exponential',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    attackTime: 0.002,
    sustainTime: 0.06,
    decayTime: 0.28,
    sustainLevel: 0.5,
    punch: 0.5,
    masterVolume: 0.72,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    vibratoDelay: 0,
    filterType: 'lowpass',
    filterCutoff: 4600,
    filterResonance: 3.2,
    bitCrush: 8,
  },
  {
    id: 'alert',
    name: '위험 경보 (Danger Alert)',
    category: 'alert',
    waveType: 'square',
    dutyCycle: 0.5,
    startFreq: 880,
    endFreq: 659,
    pitchSlideTime: 0.5,
    slideCurve: 'jump',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    // Two-tone warning beacon: A5 -> E5 -> A5 -> E5
    melodyNotes: [
      { freq: 880.00, duration: 0.08 }, // A5
      { freq: 659.25, duration: 0.08 }, // E5
      { freq: 880.00, duration: 0.08 }, // A5
      { freq: 659.25, duration: 0.28 }, // E5
    ],
    attackTime: 0.003,
    sustainTime: 0.1,
    decayTime: 0.35,
    sustainLevel: 0.7,
    punch: 0.4,
    masterVolume: 0.7,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    vibratoDelay: 0,
    filterType: 'none',
    filterCutoff: 10000,
    filterResonance: 1,
    bitCrush: 8,
  },
  {
    id: 'level_up',
    name: '레벨 업 (Level Up)',
    category: 'level_up',
    waveType: 'square',
    dutyCycle: 0.5,
    startFreq: 523,
    endFreq: 1318,
    pitchSlideTime: 0.75,
    slideCurve: 'jump',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    // Ascending victory fanfare: C5 -> E5 -> G5 -> B5 -> C6 -> E6
    melodyNotes: [
      { freq: 523.25, duration: 0.065 }, // C5
      { freq: 659.25, duration: 0.065 }, // E5
      { freq: 783.99, duration: 0.065 }, // G5
      { freq: 987.77, duration: 0.065 }, // B5
      { freq: 1046.50, duration: 0.09 },  // C6
      { freq: 1318.51, duration: 0.45 },  // E6
    ],
    attackTime: 0.004,
    sustainTime: 0.18,
    decayTime: 0.48,
    sustainLevel: 0.82,
    punch: 0.35,
    masterVolume: 0.75,
    vibratoDepth: 25,
    vibratoSpeed: 18,
    vibratoDelay: 0.05,
    filterType: 'none',
    filterCutoff: 12000,
    filterResonance: 1,
    bitCrush: 8,
  },
  {
    id: 'shield',
    name: '에너지 실드 (Energy Shield)',
    category: 'shield',
    waveType: 'sine',
    dutyCycle: 0.5,
    startFreq: 320,
    endFreq: 780,
    pitchSlideTime: 0.5,
    slideCurve: 'linear',
    hasArpeggio: false,
    arpPitch: 0,
    arpTime: 0,
    attackTime: 0.012,
    sustainTime: 0.22,
    decayTime: 0.45,
    sustainLevel: 0.65,
    punch: 0.2,
    masterVolume: 0.75,
    vibratoDepth: 95,
    vibratoSpeed: 38,
    vibratoDelay: 0.01,
    filterType: 'lowpass',
    filterCutoff: 2400,
    filterResonance: 4.5,
    bitCrush: 12,
  },
];

/**
 * Slightly mutates existing sound parameters (10-25% variance)
 */
export function mutateParams(params: SFXParams): SFXParams {
  const jitter = (val: number, pct = 0.18, min = 0, max = Infinity) => {
    const factor = 1 + (Math.random() * 2 - 1) * pct;
    return Math.max(min, Math.min(max, val * factor));
  };

  const mutatedMelody = params.melodyNotes
    ? params.melodyNotes.map((n) => ({
        freq: Math.round(jitter(n.freq, 0.15, 60, 3000)),
        duration: parseFloat(jitter(n.duration, 0.12, 0.04, 0.6).toFixed(3)),
      }))
    : undefined;

  return {
    ...params,
    sourcePresetId: params.sourcePresetId || (PRESETS.some(p => p.id === params.id) ? params.id : undefined),
    id: `custom_${Date.now().toString(36)}`,
    name: `${params.name} (변형)`,
    category: 'custom',
    startFreq: Math.round(jitter(params.startFreq, 0.2, 40, 2400)),
    endFreq: Math.round(jitter(params.endFreq, 0.2, 40, 2400)),
    pitchSlideTime: parseFloat(jitter(params.pitchSlideTime, 0.18, 0.05, 1.2).toFixed(3)),
    attackTime: parseFloat(jitter(params.attackTime, 0.2, 0.002, 0.3).toFixed(3)),
    sustainTime: parseFloat(jitter(params.sustainTime, 0.2, 0.04, 0.6).toFixed(3)),
    decayTime: parseFloat(jitter(params.decayTime, 0.2, 0.1, 1.4).toFixed(3)),
    punch: parseFloat(jitter(params.punch, 0.25, 0, 1).toFixed(2)),
    vibratoDepth: params.vibratoDepth > 0 ? Math.round(jitter(params.vibratoDepth, 0.3, 0, 150)) : 0,
    arpPitch: params.hasArpeggio ? Math.round(jitter(params.arpPitch, 0.2, 60, 2800)) : 0,
    melodyNotes: mutatedMelody,
  };
}

/**
 * Generates a completely new random retro SFX with ample duration
 */
export function randomizeParams(): SFXParams {
  const waves: SFXParams['waveType'][] = ['square', 'sawtooth', 'triangle', 'noise', 'sine'];
  const waveType = waves[Math.floor(Math.random() * waves.length)];
  const isUpward = Math.random() > 0.5;

  const startFreq = Math.round(80 + Math.random() * 1200);
  const endFreq = isUpward
    ? Math.round(startFreq * (1.3 + Math.random() * 2.2))
    : Math.round(startFreq * (0.2 + Math.random() * 0.6));

  const hasArpeggio = Math.random() > 0.55;
  const arpPitch = hasArpeggio ? Math.round(startFreq * (1.25 + Math.random() * 1.4)) : 0;

  const hasVibrato = Math.random() > 0.6;
  const bitCrushOptions = [16, 12, 8, 4];
  const bitCrush = bitCrushOptions[Math.floor(Math.random() * bitCrushOptions.length)];

  return {
    id: `rand_${Date.now().toString(36)}`,
    name: '랜덤 8-BIT 사운드',
    category: 'custom',
    waveType,
    dutyCycle: 0.5,
    startFreq: Math.min(2600, startFreq),
    endFreq: Math.min(2600, Math.max(40, endFreq)),
    pitchSlideTime: parseFloat((0.15 + Math.random() * 0.5).toFixed(3)),
    slideCurve: Math.random() > 0.5 ? 'exponential' : 'linear',
    hasArpeggio,
    arpPitch: Math.min(2600, arpPitch),
    arpTime: parseFloat((0.06 + Math.random() * 0.15).toFixed(3)),
    attackTime: parseFloat((0.004 + Math.random() * 0.04).toFixed(3)),
    sustainTime: parseFloat((0.08 + Math.random() * 0.25).toFixed(3)),
    decayTime: parseFloat((0.25 + Math.random() * 0.6).toFixed(3)),
    sustainLevel: parseFloat((0.4 + Math.random() * 0.5).toFixed(2)),
    punch: parseFloat((Math.random() * 0.5).toFixed(2)),
    masterVolume: 0.7,
    vibratoDepth: hasVibrato ? Math.round(15 + Math.random() * 60) : 0,
    vibratoSpeed: hasVibrato ? Math.round(10 + Math.random() * 25) : 0,
    vibratoDelay: 0.06,
    filterType: Math.random() > 0.65 ? 'lowpass' : 'none',
    filterCutoff: Math.round(1200 + Math.random() * 5000),
    filterResonance: 2,
    bitCrush,
  };
}

