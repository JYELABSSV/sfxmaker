import React, { useEffect, useState } from 'react';
import {
  ShieldAlert,
  FileText,
  Lock,
  BookOpen,
  X,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Radio,
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { LEGAL_TRANSLATIONS } from '../i18n/legalTranslations';

interface TermsGuideModalProps {
  isOpen: boolean;
  initialTab?: 'terms' | 'privacy' | 'guide';
  onClose: () => void;
}

export const TermsGuideModal: React.FC<TermsGuideModalProps> = ({
  isOpen,
  initialTab = 'terms',
  onClose,
}) => {
  const { effectiveLanguage } = useTranslation();
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'guide'>(initialTab);

  // Sync tab when opened with a specific initial tab
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Close on ESC key and prevent body scroll when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = LEGAL_TRANSLATIONS[effectiveLanguage] || LEGAL_TRANSLATIONS.en;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0f0c24] border-4 border-[#352763] text-slate-100 shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_0_2px_#1e163b] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar with Arcade Styling */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b-2 border-[#2b1f50] bg-gradient-to-r from-[#171238] via-[#1f1747] to-[#171238] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs">
              ★
            </span>
            <div>
              <h2
                id="terms-modal-title"
                className="font-pixel text-[11px] sm:text-xs tracking-wider text-pink-200"
              >
                {content.modalTitle}
              </h2>
              <p className="font-silkscreen text-[9px] text-purple-300/70 hidden sm:block">
                JYE SOUNDS · 8-BIT SFX LAB OFFICIAL POLICY
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={content.closeBtn}
            className="pixel-toy-btn p-1.5 sm:p-2 rounded-xl bg-[#261c47] hover:bg-rose-950/80 border-2 border-[#433374] hover:border-rose-500 text-purple-200 hover:text-rose-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="flex border-b-2 border-[#261a49] bg-[#0c091d] px-2 sm:px-4 py-2 gap-1.5 sm:gap-2 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-silkscreen text-[11px] sm:text-xs transition-all cursor-pointer whitespace-nowrap border-2 ${
              activeTab === 'terms'
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-[0_3px_0_#78350f]'
                : 'bg-[#181335] text-purple-300 border-[#2f2257] hover:border-purple-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>{content.tabTerms}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-silkscreen text-[11px] sm:text-xs transition-all cursor-pointer whitespace-nowrap border-2 ${
              activeTab === 'privacy'
                ? 'bg-pink-500 text-white border-pink-400 font-bold shadow-[0_3px_0_#831843]'
                : 'bg-[#181335] text-purple-300 border-[#2f2257] hover:border-purple-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span>{content.tabPrivacy}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-silkscreen text-[11px] sm:text-xs transition-all cursor-pointer whitespace-nowrap border-2 ${
              activeTab === 'guide'
                ? 'bg-cyan-400 text-slate-950 border-cyan-300 font-bold shadow-[0_3px_0_#155e75]'
                : 'bg-[#181335] text-purple-300 border-[#2f2257] hover:border-purple-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>{content.tabGuide}</span>
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm text-purple-100 font-sans leading-relaxed">
          {/* TAB 1: Terms of Service & Strong Disclaimer */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              {/* Powerful Highlighted Disclaimer Box */}
              <div className="rounded-xl border-2 border-amber-400/80 bg-gradient-to-br from-amber-950/60 via-[#271b0e]/80 to-[#1b1433] p-4 sm:p-5 shadow-[0_4px_20px_rgba(245,158,11,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 opacity-10 pointer-events-none">
                  <ShieldAlert className="w-32 h-32 text-amber-400" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-pixel text-[9px] font-bold tracking-wider uppercase inline-flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 fill-current" />
                    {content.disclaimerBadge}
                  </span>
                </div>

                <h3 className="font-pixel text-xs sm:text-sm text-amber-300 tracking-wide mb-3 flex items-center gap-2">
                  <span>{content.disclaimerTitle}</span>
                </h3>

                {/* Exact requested disclaimer quotation */}
                <div className="p-3.5 sm:p-4 rounded-lg bg-black/40 border border-amber-400/40 text-amber-100/95 font-medium text-xs sm:text-[13px] leading-relaxed relative">
                  <div className="absolute -left-1 top-2 bottom-2 w-1 bg-amber-400 rounded-full" />
                  <p className="pl-2 font-sans font-semibold">"{content.disclaimerText}"</p>
                </div>

                <p className="mt-3 text-[11px] sm:text-xs text-amber-200/80 leading-normal font-sans">
                  {content.disclaimerNotice}
                </p>
              </div>

              {/* Terms of Service Header & Articles */}
              <div className="space-y-4">
                <div className="border-b border-[#2d2252] pb-2">
                  <h4 className="font-pixel text-xs text-pink-300">{content.termsTitle}</h4>
                  <p className="font-silkscreen text-[10px] text-purple-300/80 mt-1">
                    {content.termsSubtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  {content.termsArticles.map((article, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#14102e] border border-[#2b2052] space-y-1.5"
                    >
                      <h5 className="font-pixel text-[10px] sm:text-[11px] text-amber-300 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                        <span>{article.title}</span>
                      </h5>
                      <p className="text-xs text-purple-200/90 whitespace-pre-line leading-relaxed pl-5">
                        {article.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Privacy Policy */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              {/* Privacy Zero-Collection Trust Banner */}
              <div className="rounded-xl border-2 border-emerald-400/60 bg-gradient-to-br from-emerald-950/40 via-[#112423]/60 to-[#12102b] p-4 sm:p-5 shadow-[0_4px_16px_rgba(16,185,129,0.12)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-400 text-slate-950 font-pixel text-[9px] font-bold tracking-wider uppercase inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 fill-current" />
                    100% PRIVATE & CLIENT-SIDE
                  </span>
                </div>
                <h3 className="font-pixel text-xs sm:text-sm text-emerald-300 tracking-wide mb-1">
                  {content.privacyTitle}
                </h3>
                <p className="text-xs text-emerald-200/90 mt-1">{content.privacySubtitle}</p>
              </div>

              {/* Privacy Articles */}
              <div className="space-y-3.5">
                {content.privacyArticles.map((article, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#14102e] border border-[#2b2052] space-y-1.5"
                  >
                    <h5 className="font-pixel text-[10px] sm:text-[11px] text-emerald-300 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{article.title}</span>
                    </h5>
                    <p className="text-xs text-purple-200/90 whitespace-pre-line leading-relaxed pl-5">
                      {article.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Studio Guide */}
          {activeTab === 'guide' && (
            <div className="space-y-6">
              {/* Studio Guide Header Banner */}
              <div className="rounded-xl border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-950/40 via-[#102435]/60 to-[#130f2c] p-4 sm:p-5 shadow-[0_4px_16px_rgba(6,182,212,0.12)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-cyan-400 text-slate-950 font-pixel text-[9px] font-bold tracking-wider uppercase inline-flex items-center gap-1">
                    <Radio className="w-3 h-3" />
                    HOW TO PLAY & CREATE
                  </span>
                </div>
                <h3 className="font-pixel text-xs sm:text-sm text-cyan-300 tracking-wide mb-1">
                  {content.guideTitle}
                </h3>
                <p className="text-xs text-cyan-200/90 mt-1">{content.guideSubtitle}</p>
              </div>

              {/* Guide Articles / Steps */}
              <div className="space-y-3.5">
                {content.guideArticles.map((article, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#14102e] border border-[#2b2052] space-y-1.5"
                  >
                    <h5 className="font-pixel text-[10px] sm:text-[11px] text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>{article.title}</span>
                    </h5>
                    <p className="text-xs text-purple-200/90 whitespace-pre-line leading-relaxed pl-5">
                      {article.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t-2 border-[#261a49] bg-[#0c091d] shrink-0">
          <div className="flex items-center gap-2 text-[11px] font-silkscreen text-purple-400">
            <span>{content.officialSiteNote}</span>
            <a
              href="https://jyesounds.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-amber-200 inline-flex items-center gap-0.5 font-bold underline underline-offset-2 ml-1"
            >
              <span>Visit</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="pixel-toy-btn w-full sm:w-auto px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-slate-950 font-pixel text-[11px] font-bold tracking-wide border-2 border-amber-200 shadow-[0_3px_0_#78350f] cursor-pointer"
          >
            {content.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
