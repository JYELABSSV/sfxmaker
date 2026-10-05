import React from 'react';
import { Volume2, VolumeX, Play, ExternalLink, ShieldAlert } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { LEGAL_TRANSLATIONS } from '../i18n/legalTranslations';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onPlayCurrent: () => void;
  onOpenTermsGuide?: (tab?: 'terms' | 'privacy' | 'guide') => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  onToggleMute,
  onPlayCurrent,
  onOpenTermsGuide,
}) => {
  const { t, effectiveLanguage } = useTranslation();
  const legal = LEGAL_TRANSLATIONS[effectiveLanguage] || LEGAL_TRANSLATIONS.en;

  return (
    <header className="border-b-4 border-[#241c42] bg-[#0e0b20]/95 backdrop-blur-md sticky top-0 z-50 px-4 lg:px-8 py-3 shadow-[0_4px_0_#070510]">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Wordmark */}
        <div className="flex items-center gap-3">
          {/* Official JYE SOUNDS Link Button with Cute Golden Star Badge */}
          <a
            href="https://www.jyesounds.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit JYE SOUNDS Official Website"
            className="pixel-toy-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 border-2 border-amber-200 text-slate-950 font-pixel text-[11px] font-bold tracking-wider hover:from-yellow-300 hover:to-amber-300 transition-all cursor-pointer group"
          >
            <span className="text-rose-600 animate-pulse text-xs">★</span>
            <span>JYE SOUNDS</span>
            <ExternalLink className="w-3 h-3 text-slate-900 group-hover:scale-110 transition-transform" />
          </a>

          <div className="h-5 w-px bg-purple-900/60 hidden sm:block" />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs tracking-wider text-pink-200">
                {t.appTitle}
              </span>
              <span className="text-[10px] text-pink-400 animate-bounce">♥</span>
            </div>
            <p className="hidden md:block font-silkscreen text-[9px] text-purple-300/80">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Action Controls & Language Selector */}
        <div className="flex items-center gap-2">
          {/* Terms & Guide Modal Button */}
          {onOpenTermsGuide && (
            <button
              type="button"
              onClick={() => onOpenTermsGuide('terms')}
              title={legal.headerButton}
              className="pixel-toy-btn flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#1b1535] border-2 border-[#3d3170] hover:border-amber-400 text-purple-200 hover:text-amber-300 font-pixel text-[10px] tracking-wide transition-all cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">{legal.headerButton}</span>
            </button>
          )}

          {/* Language Selector Dropdown with Flags */}
          <LanguageSelector />

          {/* Mute button with cute pastel button styling */}
          <button
            type="button"
            onClick={onToggleMute}
            title={isMuted ? t.unmute : t.mute}
            className={`pixel-toy-btn p-2 rounded-xl border-2 text-xs transition-colors cursor-pointer ${
              isMuted
                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                : 'bg-[#1b1535] border-[#362b66] text-purple-200 hover:text-white hover:border-purple-400'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Play Spacebar button styled like a chunky arcade candy button */}
          <button
            type="button"
            onClick={onPlayCurrent}
            className="pixel-toy-btn flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 hover:from-pink-400 hover:to-amber-300 text-slate-950 font-pixel text-[10px] tracking-wide cursor-pointer whitespace-nowrap border-2 border-pink-200 font-bold"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>PLAY [SPACE]</span>
          </button>
        </div>
      </div>
    </header>
  );
};

