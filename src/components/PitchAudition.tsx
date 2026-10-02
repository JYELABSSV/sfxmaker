import React from 'react';
import { SFXParams } from '../types/sfx';
import { sfxEngine } from '../audio/sfxEngine';
import { useTranslation } from '../i18n/LanguageContext';

interface PitchAuditionProps {
  params: SFXParams;
  onPlayTriggered: () => void;
}

const NOTES = [
  { note: 'C3', label: '-12', mult: 0.5, color: 'hover:border-rose-400 hover:text-rose-300' },
  { note: 'E3', label: '-8', mult: 0.63, color: 'hover:border-orange-400 hover:text-orange-300' },
  { note: 'G3', label: '-5', mult: 0.75, color: 'hover:border-amber-400 hover:text-amber-300' },
  { note: 'A3', label: '-3', mult: 0.84, color: 'hover:border-yellow-400 hover:text-yellow-300' },
  { note: 'C4', label: 'ORIGINAL', mult: 1.0, isBase: true, color: '' },
  { note: 'D4', label: '+2', mult: 1.12, color: 'hover:border-emerald-400 hover:text-emerald-300' },
  { note: 'E4', label: '+4', mult: 1.26, color: 'hover:border-teal-400 hover:text-teal-300' },
  { note: 'G4', label: '+7', mult: 1.50, color: 'hover:border-cyan-400 hover:text-cyan-300' },
  { note: 'A4', label: '+9', mult: 1.68, color: 'hover:border-purple-400 hover:text-purple-300' },
  { note: 'C5', label: '+12', mult: 2.0, color: 'hover:border-pink-400 hover:text-pink-300' },
];

export const PitchAudition: React.FC<PitchAuditionProps> = ({ params, onPlayTriggered }) => {
  const { t } = useTranslation();

  const handlePlayPitch = (mult: number) => {
    try {
      sfxEngine.play(params, mult);
      onPlayTriggered();
    } catch (err) {
      console.error('Pitch audition error:', err);
    }
  };

  return (
    <div className="rounded-3xl border-4 border-[#2c2254] bg-[#141029]/95 p-5 pixel-toy-card space-y-3">
      <div className="flex items-center justify-between text-xs pb-2 border-b-2 border-[#261d4a]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-bounce" />
          <span className="font-pixel text-[11px] text-yellow-300 tracking-wider">
            🎹 {t.auditionTitle}
          </span>
        </div>
        <span className="font-silkscreen text-[11px] text-purple-300/80">
          {t.auditionDesc}
        </span>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pt-1">
        {NOTES.map((n) => (
          <button
            key={n.note}
            type="button"
            onClick={() => handlePlayPitch(n.mult)}
            className={`pixel-toy-btn py-3 px-1 rounded-2xl border-2 text-center transition-all cursor-pointer ${
              n.isBase
                ? 'bg-gradient-to-t from-amber-400 to-yellow-300 text-slate-950 border-amber-100 font-bold shadow-[0_4px_0_#b45309] scale-105'
                : `bg-[#0d0920] border-[#312560] text-purple-200 ${n.color}`
            }`}
          >
            <div className="font-pixel text-[10px] tracking-tight">{n.note}</div>
            <div className={`text-[9px] font-mono mt-1 ${n.isBase ? 'text-slate-950 font-bold' : 'text-purple-400'}`}>
              {n.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
