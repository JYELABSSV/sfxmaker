import React, { useState } from 'react';
import { SFXParams, ExportSettings } from '../types/sfx';
import { saveWav } from '../audio/saveWav';
import { sfxEngine } from '../audio/sfxEngine';
import { getSoundDuration } from '../audio/duration';
import { formatFileSize } from '../audio/wavEncoder';
import { Download, Check, Sparkles, ShieldAlert } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { LEGAL_TRANSLATIONS } from '../i18n/legalTranslations';

interface ExportPanelProps {
  params: SFXParams;
  onOpenTerms?: () => void;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ params, onOpenTerms }) => {
  const { t, effectiveLanguage } = useTranslation();
  const legal = LEGAL_TRANSLATIONS[effectiveLanguage] || LEGAL_TRANSLATIONS.en;
  const [settings, setSettings] = useState<ExportSettings>({
    sampleRate: 44100,
    bitDepth: 16,
    format: 'wav',
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Safe filename
  const defaultFilename = `retro_${params.name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '') || 'sfx'}`;
  const [customName, setCustomName] = useState('');

  const effectiveFilename = (customName.trim() || defaultFilename) + '.wav';

  const duration = getSoundDuration(params);
  const estimatedBytes = 44 + Math.ceil(duration * settings.sampleRate * (settings.bitDepth / 8));

  const handleDownloadWav = async () => {
    try {
      setExportError(null);
      setDownloadSuccess(false);
      setIsExporting(true);
      const { blob } = await sfxEngine.renderToWav(params, settings.sampleRate, settings.bitDepth);

      saveWav(blob, effectiveFilename);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to export WAV:', err);
      setExportError('WAV 저장을 요청하지 못했습니다. 다시 시도해 주세요. / Unable to export WAV. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="rounded-3xl border-4 border-[#2c2254] bg-[#141029]/95 p-5 pixel-toy-card space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b-2 border-[#261d4a]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce" />
          <h3 className="font-pixel text-xs text-emerald-300 tracking-wider">💾 {t.exportTitle}</h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-purple-300/80">
          <span>{t.exportSize}: <strong className="text-amber-300 font-bold">{formatFileSize(estimatedBytes)}</strong></span>
          <span>·</span>
          <span>{t.exportDuration}: <strong className="text-pink-300 font-bold">{duration.toFixed(2)}s</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        {/* Filename Input */}
        <div className="space-y-1.5">
          <label htmlFor="export-filename-retro" className="font-silkscreen text-xs text-purple-200">{t.exportFilename}</label>
          <div className="relative">
            <input
              id="export-filename-retro"
              type="text"
              value={customName}
              placeholder={defaultFilename}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0c091d] border-2 border-[#332763] rounded-2xl font-mono text-xs text-slate-200 placeholder:text-purple-400/40 focus:outline-none focus:border-pink-400 transition-colors"
            />
            <span className="absolute right-3.5 top-2.5 text-[10px] text-purple-400 font-mono">.wav</span>
          </div>
        </div>

        {/* Quality presets */}
        <div className="space-y-1.5">
          <label className="font-silkscreen text-xs text-purple-200">{t.exportQuality}</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSettings({ sampleRate: 44100, bitDepth: 16, format: 'wav' })}
              className={`pixel-toy-btn py-2 px-2 rounded-2xl border-2 font-silkscreen text-[11px] text-center cursor-pointer transition-colors ${
                settings.sampleRate === 44100
                  ? 'bg-gradient-to-r from-pink-500/25 to-purple-500/25 border-pink-400 text-pink-300'
                  : 'bg-[#0c091d] border-[#332763] text-purple-300 hover:text-white'
              }`}
            >
              {t.qualityHigh}
            </button>
            <button
              type="button"
              onClick={() => setSettings({ sampleRate: 22050, bitDepth: 8, format: 'wav' })}
              className={`pixel-toy-btn py-2 px-2 rounded-2xl border-2 font-silkscreen text-[11px] text-center cursor-pointer transition-colors ${
                settings.sampleRate === 22050
                  ? 'bg-gradient-to-r from-amber-500/25 to-yellow-500/25 border-amber-400 text-amber-300'
                  : 'bg-[#0c091d] border-[#332763] text-purple-300 hover:text-white'
              }`}
            >
              {t.qualityRetro}
            </button>
          </div>
        </div>

        {/* Big Download Button */}
        <div>
          <button
            type="button"
            onClick={handleDownloadWav}
            disabled={isExporting}
            className="pixel-toy-btn w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-bold text-xs font-pixel tracking-wider transition-all border-2 border-emerald-100 cursor-pointer disabled:opacity-50"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-950 stroke-[3]" />
                <span>{effectiveLanguage === 'ko' ? '저장 요청됨' : 'Save requested'} ♥</span>
              </>
            ) : isExporting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>{t.rendering}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>{t.downloadWav}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {exportError && <p role="alert" className="text-sm text-rose-300">{exportError}</p>}
      {/* Royalty-Free & Legal Disclaimer Quick Link */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#261d4a] text-[10px] font-silkscreen text-purple-300/80">
        <span className="flex items-center gap-1.5 text-emerald-300">
          <span className="text-amber-400">★</span>
          <span>100% Client-Side Web Audio Synth (WAV)</span>
        </span>
        {onOpenTerms && (
          <button
            type="button"
            onClick={onOpenTerms}
            className="flex items-center gap-1 text-amber-300 hover:text-pink-300 underline underline-offset-2 transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3 h-3 text-amber-400" />
            <span>{legal.tabTerms}</span>
          </button>
        )}
      </div>
    </div>
  );
};

