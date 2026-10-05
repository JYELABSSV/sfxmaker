import { getSoundDuration } from '../audio/duration';
import React from 'react';
import { SFXParams } from '../types/sfx';
import { PRESETS } from '../audio/presets';
import { useTranslation } from '../i18n/LanguageContext';

interface PresetGridProps {
  currentParams: SFXParams;
  onSelectPreset: (preset: SFXParams) => void;
}

// Cute candy pastel arcade badges with playful retro icons
const PRESET_ICONS: Record<string, { icon: string; bg: string; border: string; text: string }> = {
  jump: { icon: '⬆', bg: 'bg-emerald-500/20', border: 'border-emerald-400', text: 'text-emerald-300' },
  coin: { icon: '★', bg: 'bg-amber-500/20', border: 'border-amber-400', text: 'text-amber-300' },
  laser: { icon: '⚡', bg: 'bg-cyan-500/20', border: 'border-cyan-400', text: 'text-cyan-300' },
  hit: { icon: '💥', bg: 'bg-rose-500/20', border: 'border-rose-400', text: 'text-rose-300' },
  explosion: { icon: '💣', bg: 'bg-orange-500/20', border: 'border-orange-400', text: 'text-orange-300' },
  powerup: { icon: '▲', bg: 'bg-purple-500/20', border: 'border-purple-400', text: 'text-purple-300' },
  one_up: { icon: '♥', bg: 'bg-pink-500/20', border: 'border-pink-400', text: 'text-pink-300' },
  game_over: { icon: '☠', bg: 'bg-red-500/20', border: 'border-red-400', text: 'text-red-300' },
  blip: { icon: '●', bg: 'bg-sky-500/20', border: 'border-sky-400', text: 'text-sky-300' },
  warp: { icon: '◎', bg: 'bg-indigo-500/20', border: 'border-indigo-400', text: 'text-indigo-300' },
  bounce: { icon: '∿', bg: 'bg-teal-500/20', border: 'border-teal-400', text: 'text-teal-300' },
  victory: { icon: '✦', bg: 'bg-yellow-500/20', border: 'border-yellow-400', text: 'text-yellow-300' },
  magic: { icon: '✨', bg: 'bg-fuchsia-500/20', border: 'border-fuchsia-400', text: 'text-fuchsia-300' },
  secret: { icon: '🗝', bg: 'bg-emerald-500/20', border: 'border-emerald-400', text: 'text-emerald-300' },
  dash: { icon: '⚡', bg: 'bg-cyan-500/20', border: 'border-cyan-400', text: 'text-cyan-300' },
  alert: { icon: '🚨', bg: 'bg-rose-500/20', border: 'border-rose-400', text: 'text-rose-300' },
  level_up: { icon: '👑', bg: 'bg-amber-500/20', border: 'border-amber-400', text: 'text-amber-300' },
  shield: { icon: '🛡', bg: 'bg-blue-500/20', border: 'border-blue-400', text: 'text-blue-300' },
};

export const PresetGrid: React.FC<PresetGridProps> = ({ currentParams, onSelectPreset }) => {
  const { t } = useTranslation();

  const getPresetLabel = (id: string, fallbackName: string) => {
    const key = `preset_${id}` as keyof typeof t;
    return (t[key] as string) || fallbackName;
  };

  return (
    <div className="rounded-3xl border-4 border-[#2c2254] bg-[#141029]/95 p-5 pixel-toy-card space-y-4">
      {/* Header with Cute Dot & Star Accents */}
      <div className="flex items-center justify-between text-xs pb-2 border-b-2 border-[#261d4a]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-ping" />
          <span className="font-pixel text-xs text-pink-300 tracking-wider">
            ★ {t.presetsTitle} ★
          </span>
        </div>
        <span className="font-silkscreen text-[11px] text-purple-300/80">
          {t.presetsDesc}
        </span>
      </div>

      {/* Cute Candy Cartridge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {PRESETS.map((preset) => {
          const isActive = currentParams.id === preset.id;
          const badge = PRESET_ICONS[preset.id] || {
            icon: '●',
            bg: 'bg-purple-950',
            border: 'border-purple-600',
            text: 'text-purple-300',
          };
          const localizedName = getPresetLabel(preset.id, preset.name);

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset({ ...preset, name: localizedName })}
              className={`pixel-toy-btn relative flex items-center gap-2.5 p-3 rounded-2xl border-3 text-left cursor-pointer transition-all ${
                isActive
                  ? 'bg-gradient-to-br from-pink-500/25 via-purple-500/20 to-amber-500/25 border-pink-400 text-pink-200 shadow-[0_4px_0_#9d174d]'
                  : 'bg-[#0f0c22]/90 border-[#281f4f] text-slate-300 hover:border-pink-500/60 hover:text-white'
              }`}
            >
              {/* Cute Candy Icon Badge */}
              <div
                className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center font-pixel text-xs shrink-0 shadow-sm transition-transform ${
                  isActive
                    ? 'bg-gradient-to-tr from-pink-400 to-amber-300 text-slate-950 border-pink-200 scale-110'
                    : `${badge.bg} ${badge.border} ${badge.text}`
                }`}
              >
                {badge.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="font-silkscreen text-xs font-bold truncate leading-tight tracking-wide">
                  {localizedName}
                </div>
                <div className="font-mono text-[10px] text-purple-400/90 truncate mt-0.5">
                  {preset.waveType.slice(0, 3).toUpperCase()} · {getSoundDuration(preset).toFixed(2)}s
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

