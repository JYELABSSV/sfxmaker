import React, { useState } from 'react';
import { SoundHistoryItem, SFXParams } from '../types/sfx';
import { saveWav } from '../audio/saveWav';
import { sfxEngine } from '../audio/sfxEngine';
import { Play, Download, Star, Clock, Trash2, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface SoundHistoryProps {
  history: SoundHistoryItem[];
  onLoadParams: (params: SFXParams) => void;
  onToggleFavorite: (id: string) => void;
  onClearHistory: () => void;
}

export const SoundHistory: React.FC<SoundHistoryProps> = ({
  history,
  onLoadParams,
  onToggleFavorite,
  onClearHistory,
}) => {
  const { t } = useTranslation();
  const [exportError, setExportError] = useState<string | null>(null);

  const handleQuickDownload = async (item: SoundHistoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { blob } = await sfxEngine.renderToWav(item.params, 44100, 16);
      saveWav(blob, `sfx_${item.params.name.replace(/[^a-zA-Z0-9가-힣]/g, '_')}.wav`);
    } catch (err) {
      console.error('Failed to download from history:', err);
      setExportError('WAV 저장을 요청하지 못했습니다. 다시 시도해 주세요. / Unable to export WAV. Please try again.');
    }
  };

  const handlePlay = (params: SFXParams, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      sfxEngine.play(params);
    } catch (err) {
      console.error('Failed to play history sound:', err);
    }
  };

  if (history.length === 0) {
    return (
      <div className="rounded-3xl border-4 border-[#2c2254] bg-[#141029]/95 p-5 pixel-toy-card text-center">
        <Clock className="w-5 h-5 text-purple-400 mx-auto mb-2 animate-bounce" />
        <p className="font-silkscreen text-xs text-purple-300">{t.historyEmpty}</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border-4 border-[#2c2254] bg-[#141029]/95 p-5 pixel-toy-card space-y-4">
      {exportError && <p role="alert" className="text-sm text-rose-300">{exportError}</p>}
      <div className="flex items-center justify-between border-b-2 border-[#261d4a] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce" />
          <h3 className="font-pixel text-[11px] text-pink-300 tracking-wider">★ {t.historyTitle}</h3>
          <span className="font-mono text-purple-400 text-xs">({history.length})</span>
        </div>
        <button
          type="button"
          onClick={onClearHistory}
          className="flex items-center gap-1.5 font-silkscreen text-[11px] text-purple-300 hover:text-rose-400 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t.historyClear}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onLoadParams(item.params)}
            className="flex items-center justify-between p-2.5 rounded-2xl border-2 border-[#2b2154] bg-[#0c091d]/90 hover:border-pink-400/80 hover:bg-[#151030] transition-all cursor-pointer group shadow-sm"
          >
            <div className="min-w-0 flex-1 pr-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-100 truncate">{item.params.name}</span>
                {item.isFavorite && <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />}
              </div>
              <div className="text-[10px] text-purple-400/90 font-mono truncate mt-0.5">
                {item.params.waveType.toUpperCase()} · {item.params.startFreq}Hz → {item.params.endFreq}Hz
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                title="Play"
                onClick={(e) => handlePlay(item.params, e)}
                className="p-1.5 rounded-xl text-purple-300 hover:text-amber-300 hover:bg-[#201844] transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
              <button
                type="button"
                title="Favorite"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(item.id);
                }}
                className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                  item.isFavorite ? 'text-amber-300 hover:text-amber-200' : 'text-purple-400 hover:text-slate-200'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${item.isFavorite ? 'fill-amber-300' : ''}`} />
              </button>
              <button
                type="button"
                title="Download WAV"
                onClick={(e) => handleQuickDownload(item, e)}
                className="p-1.5 rounded-xl text-purple-300 hover:text-emerald-300 hover:bg-[#201844] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Load to Editor"
                onClick={() => onLoadParams(item.params)}
                className="p-1.5 rounded-xl text-purple-300 hover:text-pink-300 hover:bg-[#201844] transition-colors cursor-pointer"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

