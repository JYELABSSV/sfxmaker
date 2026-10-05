import { getSoundDuration } from '../audio/duration';
import React from 'react';
import { SFXParams, WaveType } from '../types/sfx';
import { useTranslation } from '../i18n/LanguageContext';

interface SoundEditorProps {
  params: SFXParams;
  onChange: (newParams: SFXParams, shouldPreview?: boolean) => void;
}

export const SoundEditor: React.FC<SoundEditorProps> = ({ params, onChange }) => {
  const { t } = useTranslation();

  const update = (partial: Partial<SFXParams>, preview = true) => {
    onChange({ ...params, ...partial }, preview);
  };

  const waveOptions: { type: WaveType; label: string; icon: string; sub: string; color: string }[] = [
    { type: 'square', label: t.waveSquare, icon: '■', sub: t.waveSquareSub, color: 'text-amber-300' },
    { type: 'sawtooth', label: t.waveSaw, icon: '◿', sub: t.waveSawSub, color: 'text-rose-300' },
    { type: 'triangle', label: t.waveTri, icon: '▲', sub: t.waveTriSub, color: 'text-emerald-300' },
    { type: 'noise', label: t.waveNoise, icon: '▓', sub: t.waveNoiseSub, color: 'text-orange-300' },
    { type: 'sine', label: t.waveSine, icon: '∿', sub: t.waveSineSub, color: 'text-cyan-300' },
  ];

  const hasMelody = Boolean(params.melodyNotes && params.melodyNotes.length > 0);
  const melodyTotalTime = hasMelody
    ? params.melodyNotes!.reduce((sum, n) => sum + n.duration, 0)
    : 0;

  const totalLength = getSoundDuration(params).toFixed(2);

  // Shift whole melody pitch up/down
  const handleShiftMelodyPitch = (mult: number) => {
    if (!params.melodyNotes) return;
    const updatedNotes = params.melodyNotes.map((n) => ({
      ...n,
      freq: Math.max(40, Math.min(3500, Math.round(n.freq * mult))),
    }));
    update({ melodyNotes: updatedNotes });
  };

  // Scale melody tempo
  const handleScaleMelodySpeed = (speedMult: number) => {
    if (!params.melodyNotes) return;
    const updatedNotes = params.melodyNotes.map((n) => ({
      ...n,
      duration: Math.max(0.03, parseFloat((n.duration * speedMult).toFixed(3))),
    }));
    update({ melodyNotes: updatedNotes });
  };

  return (
    <div className="rounded-3xl border-4 border-[#2c2254] bg-[#141029]/95 p-6 pixel-toy-card space-y-6">
      {/* Header with Cute Dot Accents */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-[#261d4a]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce" />
          <h3 className="font-pixel text-xs text-amber-300 tracking-wider">🎛 {t.editorTitle}</h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-purple-300/80">
          <span>{t.totalLength}:</span>
          <strong className="px-2.5 py-0.5 rounded-lg bg-[#0c091d] border border-amber-400/40 text-amber-300 font-silkscreen shadow-sm">
            {totalLength}s
          </strong>
        </div>
      </div>

      {/* 1. Waveform Selection: Retro Pixel Candy Buttons */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-silkscreen text-purple-200 tracking-wide">{t.sectionWave}</span>
          <span className="font-mono text-[11px] text-pink-300 font-bold">{params.waveType.toUpperCase()} MODE</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {waveOptions.map((wave) => {
            const isSelected = params.waveType === wave.type;
            return (
              <button
                key={wave.type}
                type="button"
                onClick={() => update({ waveType: wave.type })}
                className={`pixel-toy-btn flex flex-col items-center justify-center p-3 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-500/25 to-pink-500/25 border-amber-300 text-amber-200 shadow-[0_4px_0_#b45309]'
                    : 'bg-[#0d0920] border-[#312560] text-purple-300 hover:border-pink-400 hover:text-white'
                }`}
              >
                <span className={`font-pixel text-lg mb-1 ${wave.color}`}>{wave.icon}</span>
                <span className="font-pixel text-[10px] tracking-wider">{wave.label}</span>
                <span className="text-[10px] text-purple-400/80 font-sans mt-0.5">{wave.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Tweakers: 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pitch & Slide OR Melody Sequencer */}
        <div className="rounded-2xl border-2 border-[#2b2154] bg-[#0c091d] p-4 space-y-3.5 shadow-inner">
          <div className="flex items-center justify-between pb-2 border-b border-[#211942]">
            <span className="font-silkscreen text-xs text-amber-300 font-bold">
              {hasMelody ? t.sectionMelody : t.sectionPitch}
            </span>
            <span className="font-mono text-[11px] text-purple-300/80 tabular-nums">
              {hasMelody ? `${params.melodyNotes!.length} notes` : `${params.startFreq}Hz → ${params.endFreq}Hz`}
            </span>
          </div>

          {hasMelody ? (
            /* Melodic Sound Controls (1-UP, Victory, etc.) */
            <div className="space-y-3">
              <div className="p-2.5 rounded-xl bg-[#141029] border border-purple-500/30 space-y-1.5">
                <div className="text-[11px] font-silkscreen text-purple-200">{t.sectionMelody}</div>
                <div className="flex flex-wrap gap-1.5">
                  {params.melodyNotes!.map((n, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg bg-[#0a0718] border border-pink-400/40 font-mono text-[10px] text-pink-300 shadow-sm"
                    >
                      {Math.round(n.freq)}Hz
                    </span>
                  ))}
                </div>
              </div>

              {/* Pitch Transpose Buttons */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-silkscreen text-purple-200">
                  <span>{t.shiftPitch}</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                  <button
                    type="button"
                    onClick={() => handleShiftMelodyPitch(0.89)}
                    className="pixel-toy-btn py-1.5 rounded-xl border border-[#312560] bg-[#141029] text-xs font-mono text-purple-300 hover:text-white"
                  >
                    -2 {t.pitchDown}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShiftMelodyPitch(0.94)}
                    className="pixel-toy-btn py-1.5 rounded-xl border border-[#312560] bg-[#141029] text-xs font-mono text-purple-300 hover:text-white"
                  >
                    -1 {t.pitchDown}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShiftMelodyPitch(1.06)}
                    className="pixel-toy-btn py-1.5 rounded-xl border border-[#312560] bg-[#141029] text-xs font-mono text-purple-300 hover:text-white"
                  >
                    +1 {t.pitchUp}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShiftMelodyPitch(1.12)}
                    className="pixel-toy-btn py-1.5 rounded-xl border border-[#312560] bg-[#141029] text-xs font-mono text-purple-300 hover:text-white"
                  >
                    +2 {t.pitchUp}
                  </button>
                </div>
              </div>

              {/* Speed / Tempo */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-silkscreen text-purple-200">
                  <span>{t.tempoScale}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleScaleMelodySpeed(1.2)}
                    className="pixel-toy-btn py-1.5 rounded-xl border border-[#312560] bg-[#141029] text-[11px] font-silkscreen text-purple-300 hover:text-white"
                  >
                    {t.tempoSlower} (0.8x)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScaleMelodySpeed(1.0)}
                    className="pixel-toy-btn py-1.5 rounded-xl border border-amber-400 bg-amber-500/20 text-[11px] font-silkscreen text-amber-300"
                  >
                    1.0x
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScaleMelodySpeed(0.85)}
                    className="pixel-toy-btn py-1.5 rounded-xl border border-[#312560] bg-[#141029] text-[11px] font-silkscreen text-purple-300 hover:text-white"
                  >
                    {t.tempoFaster} (1.2x)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Monophonic frequency slide controls */
            <div className="space-y-3.5">
              {/* Start Frequency */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <label htmlFor="start-freq" className="text-purple-200">{t.startFreq}</label>
                  <span className="text-amber-300 font-bold tabular-nums">{params.startFreq} Hz</span>
                </div>
                <input
                  id="start-freq"
                  type="range"
                  min="40"
                  max="2200"
                  step="10"
                  value={params.startFreq}
                  onChange={(e) => update({ startFreq: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* End Frequency */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <label htmlFor="end-freq" className="text-purple-200">{t.endFreq}</label>
                  <span className="text-amber-300 font-bold tabular-nums">{params.endFreq} Hz</span>
                </div>
                <input
                  id="end-freq"
                  type="range"
                  min="40"
                  max="2200"
                  step="10"
                  value={params.endFreq}
                  onChange={(e) => update({ endFreq: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Slide Time */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <label htmlFor="slide-time" className="text-purple-200">{t.pitchSlideTime}</label>
                  <span className="text-pink-300 font-bold tabular-nums">{params.pitchSlideTime.toFixed(2)}s</span>
                </div>
                <input
                  id="slide-time"
                  type="range"
                  min="0.05"
                  max="1.2"
                  step="0.02"
                  value={params.pitchSlideTime}
                  onChange={(e) => update({ pitchSlideTime: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Duration & Volume (Envelope) */}
        <div className="rounded-2xl border-2 border-[#2b2154] bg-[#0c091d] p-4 space-y-3.5 shadow-inner">
          <div className="flex items-center justify-between pb-2 border-b border-[#211942]">
            <span className="font-silkscreen text-xs text-pink-300 font-bold">{t.sectionEnvelope}</span>
            <span className="font-mono text-[11px] text-emerald-300 tabular-nums">
              {t.decayTime}: {params.decayTime.toFixed(2)}s
            </span>
          </div>

          {/* Main Sound Length / Decay Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor="decay-time" className="text-purple-200 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                {t.decayTime}
              </label>
              <span className="text-emerald-300 font-bold tabular-nums">{params.decayTime.toFixed(2)}s</span>
            </div>
            <input
              id="decay-time"
              type="range"
              min="0.1"
              max="1.5"
              step="0.02"
              value={params.decayTime}
              onChange={(e) => update({ decayTime: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Master Volume */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor="master-vol" className="text-purple-200">{t.masterVolume}</label>
              <span className="text-amber-300 font-bold tabular-nums">{Math.round(params.masterVolume * 100)}%</span>
            </div>
            <input
              id="master-vol"
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={params.masterVolume}
              onChange={(e) => update({ masterVolume: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Sustain & Punch */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-purple-300/80">{t.sustainTime}</span>
                <span className="text-purple-200 tabular-nums">{params.sustainTime.toFixed(2)}s</span>
              </div>
              <input
                type="range"
                min="0.02"
                max="0.6"
                step="0.02"
                value={params.sustainTime}
                onChange={(e) => update({ sustainTime: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-purple-300/80">{t.punch}</span>
                <span className="text-pink-300 tabular-nums">{Math.round(params.punch * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={params.punch}
                onChange={(e) => update({ punch: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Retro 8-Bit Crunch & Modulations */}
      <div className="rounded-2xl border-2 border-[#2b2154] bg-[#0c091d] p-4 space-y-3.5 shadow-inner">
        <div className="flex items-center justify-between pb-2 border-b border-[#211942]">
          <span className="font-silkscreen text-xs text-amber-300 font-bold">{t.sectionVintage}</span>
          <span className="font-mono text-[11px] text-purple-400/80">8-Bit Retro Chiptune Filter</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Bitcrush */}
          <div className="p-3 rounded-2xl bg-[#141029] border border-[#2b2154] space-y-2">
            <div className="flex justify-between text-xs font-silkscreen">
              <span className="text-purple-200">{t.bitCrush}</span>
              <span className="text-amber-300 font-mono text-[11px]">
                {params.bitCrush === 16 ? t.bitCrushOff : `${params.bitCrush} ${t.bitsUnit}`}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { bits: 16, label: 'Off' },
                { bits: 12, label: '12b' },
                { bits: 8, label: '8b' },
                { bits: 4, label: '4b' },
              ].map((opt) => (
                <button
                  key={opt.bits}
                  type="button"
                  onClick={() => update({ bitCrush: opt.bits })}
                  className={`pixel-toy-btn py-1.5 rounded-xl text-center font-pixel text-[9px] border transition-colors cursor-pointer ${
                    params.bitCrush === opt.bits
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 border-amber-200 font-bold shadow-[0_3px_0_#b45309]'
                      : 'bg-[#0d0920] text-purple-300 border-[#312560] hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vibrato */}
          <div className="p-3 rounded-2xl bg-[#141029] border border-[#2b2154] space-y-2">
            <div className="flex justify-between text-xs font-silkscreen">
              <span className="text-purple-200">{t.vibratoDepth}</span>
              <span className="text-cyan-300 font-mono text-[11px]">
                {params.vibratoDepth > 0 ? `${params.vibratoDepth}Hz` : 'OFF'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={params.vibratoDepth}
              onChange={(e) => update({ vibratoDepth: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Filter */}
          <div className="p-3 rounded-2xl bg-[#141029] border border-[#2b2154] space-y-2">
            <div className="flex justify-between text-xs font-silkscreen">
              <span className="text-purple-200">{t.filterType}</span>
              <span className="text-emerald-300 font-mono text-[11px]">
                {params.filterType === 'none' ? t.filterNone : `${params.filterCutoff}Hz`}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => update({ filterType: params.filterType === 'lowpass' ? 'none' : 'lowpass' })}
                className={`pixel-toy-btn flex-1 py-2 rounded-xl font-pixel text-[9px] border transition-colors cursor-pointer ${
                  params.filterType === 'lowpass'
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 border-emerald-200 font-bold shadow-[0_3px_0_#065f46]'
                    : 'bg-[#0d0920] text-purple-300 border-[#312560] hover:text-white'
                }`}
              >
                {params.filterType === 'lowpass' ? `${t.filterLowpass} ON` : `${t.filterLowpass} OFF`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

