import React, { useState, useRef, useEffect } from 'react';
import { useTranslation, LANGUAGES } from '../i18n/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, effectiveLanguage, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const currentLangInfo = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const effectiveLangInfo = LANGUAGES.find((l) => l.code === effectiveLanguage) || LANGUAGES[1];

  return (
    <div ref={containerRef} className="relative z-50">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="언어 선택 (Language)"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-300 hover:text-white font-silkscreen text-xs cursor-pointer transition-colors"
      >
        <span className="text-sm">{language === 'auto' ? '🌐' : currentLangInfo.flag}</span>
        <span className="hidden md:inline font-mono text-[11px] font-bold text-amber-300">
          {language === 'auto' ? `Auto (${effectiveLangInfo.flag})` : currentLangInfo.name.split(' ')[0]}
        </span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-52 max-h-80 overflow-y-auto rounded-xl border-2 border-slate-700 bg-slate-900/98 backdrop-blur-md p-1.5 shadow-2xl pixel-shadow-sm space-y-0.5">
          <div className="px-2 py-1 text-[10px] font-pixel text-amber-400/80 border-b border-slate-800 mb-1">
            SELECT LANGUAGE
          </div>

          {LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs font-silkscreen transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{lang.flag}</span>
                  <span className="truncate">{lang.name}</span>
                </div>
                {isSelected && <span className="font-pixel text-[9px] text-amber-400">●</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
