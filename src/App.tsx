import { useState, useEffect, useCallback, useRef } from 'react';
import { SFXParams, SoundHistoryItem } from './types/sfx';
import { PRESETS, mutateParams, randomizeParams } from './audio/presets';
import { getSoundDuration } from './audio/duration';
import { sfxEngine } from './audio/sfxEngine';
import { Header } from './components/Header';
import { Visualizer } from './components/Visualizer';
import {
  MonitorSynthRobot,
  ConsoleDrummerRobot,
  ExportBassistRobot,
  FloatingBoomboxBot,
} from './components/MusicalRobotMascots';
import { ExportPanel } from './components/ExportPanel';
import { PresetGrid } from './components/PresetGrid';
import { WaveformGraphEditor } from './components/WaveformGraphEditor';
import { SoundEditor } from './components/SoundEditor';
import { PitchAudition } from './components/PitchAudition';
import { SoundHistory } from './components/SoundHistory';
import { TermsGuideModal } from './components/TermsGuideModal';
import { useTranslation } from './i18n/LanguageContext';
import { LEGAL_TRANSLATIONS } from './i18n/legalTranslations';
import {
  Play,
  Shuffle,
  Wand2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const { t, effectiveLanguage } = useTranslation();
  const legal = LEGAL_TRANSLATIONS[effectiveLanguage] || LEGAL_TRANSLATIONS.en;
  const [params, setParams] = useState<SFXParams>(PRESETS[0]);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'terms' | 'privacy' | 'guide'>('terms');

  const handleOpenLegalModal = (tab: 'terms' | 'privacy' | 'guide' = 'terms') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };
  const [history, setHistory] = useState<SoundHistoryItem[]>(() => [
    {
      id: 'init_jump',
      params: PRESETS[0],
      timestamp: Date.now(),
      isFavorite: true,
    },
    {
      id: 'init_coin',
      params: PRESETS[1],
      timestamp: Date.now() - 1000,
    },
    {
      id: 'init_laser',
      params: PRESETS[2],
      timestamp: Date.now() - 2000,
    },
  ]);

  const paramsRef = useRef(params);
  const playbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  useEffect(() => () => { if (playbackTimer.current) clearTimeout(playbackTimer.current); sfxEngine.stop(); }, []);
  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  // Dynamic localized name resolution for active sound
  const getLocalizedSoundName = useCallback((p: SFXParams) => {
    const key = `preset_${p.id}` as keyof typeof t;
    if (t[key]) {
      return t[key] as string;
    }
    if (p.id.startsWith('custom_')) {
      const basePreset = PRESETS.find((base) => base.id === p.sourcePresetId);
      if (basePreset) {
        const baseKey = `preset_${basePreset.id}` as keyof typeof t;
        const baseName = (t[baseKey] as string) || basePreset.name;
        return `${baseName} ${t.mutatedSuffix}`;
      }
      return `${p.name.replace(/\s*\(.*?\)\s*/g, '')} ${t.mutatedSuffix}`;
    }
    if (p.id.startsWith('rand_')) {
      return t.randomTitle;
    }
    return p.name;
  }, [t]);

  // Sound playback trigger
  const playSound = useCallback((soundToPlay?: SFXParams) => {
    const target = soundToPlay || paramsRef.current;
    if (playbackTimer.current) clearTimeout(playbackTimer.current);
    const durationSec = sfxEngine.play(target);
    if (!durationSec) { setIsPlaying(false); setPlaybackError('소리를 재생하지 못했습니다. 음소거 설정과 브라우저 오디오 지원을 확인하세요. / Unable to play audio. Check mute and browser support.'); return; }
    setPlaybackError(null);
    setIsPlaying(true);
    playbackTimer.current = setTimeout(() => setIsPlaying(false), (durationSec + 0.03) * 1000);
  }, []);

  // Preset selector
  const handleSelectPreset = (preset: SFXParams) => {
    setParams(preset);
    playSound(preset);
    addHistoryItem(preset);
  };

  // Param update from editor
  const handleParamsChange = (newParams: SFXParams, shouldPreview = true) => {
    setParams(newParams);
    if (shouldPreview) {
      playSound(newParams);
    }
  };

  // Add to history
  const addHistoryItem = (itemParams: SFXParams) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.params.id !== itemParams.id);
      return [
        {
          id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          params: itemParams,
          timestamp: Date.now(),
          isFavorite: prev.find(item => item.params.id === itemParams.id)?.isFavorite,
        },
        ...filtered,
      ].slice(0, 12);
    });
  };

  // Mutate (variant)
  const handleMutate = () => {
    const mutated = mutateParams(params);
    const localizedName = `${getLocalizedSoundName(params)} ${t.mutatedSuffix}`;
    const localizedParams = { ...mutated, name: localizedName };
    setParams(localizedParams);
    playSound(localizedParams);
    addHistoryItem(localizedParams);
  };

  // Surprise / Random
  const handleRandomize = () => {
    const randomized = randomizeParams();
    const localizedParams = { ...randomized, name: t.randomTitle };
    setParams(localizedParams);
    playSound(localizedParams);
    addHistoryItem(localizedParams);
  };

  // Reset to original preset
  const handleReset = () => {
    const original = PRESETS.find((p) => p.id === (params.sourcePresetId || params.id)) || PRESETS[0];
    setParams(original);
    playSound(original);
  };

  // Mute toggle
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sfxEngine.setMuted(nextMuted);
    if (nextMuted) setIsPlaying(false);
  };

  // Toggle favorite in history
  const handleToggleFavorite = (id: string) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
    );
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  // Global keyboard shortcuts (Space, M, R)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select' || activeTag === 'button' || activeTag === 'a' || isLegalModalOpen || (document.activeElement as HTMLElement | null)?.isContentEditable) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        playSound();
      } else if (e.key === 'm' || e.key === 'M') {
        handleMutate();
      } else if (e.key === 'r' || e.key === 'R') {
        handleRandomize();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playSound, handleMutate, handleRandomize, isLegalModalOpen]);

  const activeDuration = getSoundDuration(params).toFixed(2);

  const displayedName = getLocalizedSoundName(params);

  return (
    <div className="min-h-screen bg-cute-canvas text-slate-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white relative overflow-x-hidden">
      <Header
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onPlayCurrent={() => playSound()}
        onOpenTermsGuide={handleOpenLegalModal}
      />

      {/* Floating Free-Roaming Mascot Robot at the bottom right */}
      <FloatingBoomboxBot isPlaying={isPlaying} />

      {playbackError && <p role="alert" className="max-w-5xl mx-auto p-4 text-amber-200">{playbackError}</p>}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-6">
        {/* Top Retro Console: Monitor & Push Controls with Free-Standing Musical Robots */}
        <section id="monitor" className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch pt-3">
          {/* CRT Screen Display with Bit-Synth Robot perched on the bezel */}
          <div className="md:col-span-7 relative">
            <MonitorSynthRobot isPlaying={isPlaying} />
            <Visualizer
              isPlaying={isPlaying}
              presetName={displayedName}
              waveType={params.waveType}
              freq={params.startFreq}
            />
          </div>

          {/* Arcade Push Control Box with Drummer Robot on the corner */}
          <div className="md:col-span-5 relative rounded-3xl border-4 border-[#2c2254] bg-[#141029]/95 p-5 pixel-toy-card flex flex-col justify-between space-y-3">
            <ConsoleDrummerRobot isPlaying={isPlaying} />

            <div>
              <div className="flex items-center justify-between text-xs pb-2 border-b-2 border-[#261d4a]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                  <span className="font-pixel text-[10px] text-pink-300 font-bold">{t.activeSound}</span>
                </div>
                <span className="font-mono text-emerald-300 text-xs tabular-nums font-bold">
                  {activeDuration}s
                </span>
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <h2 className="font-silkscreen text-base font-bold text-slate-100 truncate">
                    {displayedName}
                  </h2>
                </div>
                <p className="text-[11px] font-mono text-purple-300/80 mt-1">
                  {params.startFreq}Hz → {params.endFreq}Hz · {params.waveType.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Chunky Arcade Candy Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => playSound()}
                className="pixel-toy-btn w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 hover:from-pink-400 hover:to-amber-300 text-slate-950 font-pixel text-xs font-bold tracking-wider cursor-pointer border-2 border-pink-200"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{t.playBtn}</span>
              </button>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={handleMutate}
                  title={t.mutateTooltip}
                  className="pixel-toy-btn flex items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl border-2 border-[#332763] bg-[#0d0920] hover:border-pink-400 text-purple-200 hover:text-white text-xs font-silkscreen cursor-pointer"
                >
                  <Wand2 className="w-3.5 h-3.5 text-pink-400" />
                  <span>{t.mutateBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRandomize}
                  title={t.randomTooltip}
                  className="pixel-toy-btn flex items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl border-2 border-[#332763] bg-[#0d0920] hover:border-cyan-400 text-purple-200 hover:text-white text-xs font-silkscreen cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.randomBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  title={t.resetTooltip}
                  className="pixel-toy-btn flex items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl border-2 border-[#332763] bg-[#0d0920] hover:border-amber-400 text-purple-400 hover:text-white text-xs font-silkscreen cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 상단 배치된 WAV 다운로드 패널 (With Bassist Robot freely jamming on top) */}
        <section id="export" className="relative pt-3">
          <ExportBassistRobot isPlaying={isPlaying} />
          <ExportPanel
            params={{ ...params, name: displayedName }}
            onOpenTerms={() => handleOpenLegalModal('terms')}
          />
        </section>

        {/* 1. Presets Soundboard */}
        <section id="presets">
          <PresetGrid currentParams={params} onSelectPreset={handleSelectPreset} />
        </section>

        {/* 2. Mini Piano Audition */}
        <section id="audition">
          <PitchAudition params={params} onPlayTriggered={() => setIsPlaying(true)} />
        </section>

        {/* 3. Interactive Waveform & Envelope Graph Studio */}
        <section id="graph">
          <WaveformGraphEditor
            params={params}
            onChange={handleParamsChange}
            isPlaying={isPlaying}
          />
        </section>

        {/* 4. Sound Tweaker Controls */}
        <section id="editor">
          <SoundEditor params={params} onChange={handleParamsChange} />
        </section>

        {/* 5. Sound Library / History */}
        <section id="library">
          <SoundHistory
            history={history}
            onLoadParams={(p) => {
              setParams(p);
              playSound(p);
            }}
            onToggleFavorite={handleToggleFavorite}
            onClearHistory={handleClearHistory}
          />
        </section>
      </main>

      {/* Retro Footnote with JYE SOUNDS and Privacy Policy & Terms Link */}
      <section className="max-w-5xl mx-auto px-4 py-6 text-sm text-purple-200 leading-relaxed" aria-label="Studio guide"><h1 className="text-lg font-bold">8-BIT SFX LAB · 브라우저 효과음 제작기</h1><p>프리셋을 선택하고 주파수·엔벨로프를 조절한 뒤 WAV로 저장하세요. 오디오 합성은 브라우저에서 처리됩니다. / Choose a preset, adjust pitch and envelope, then export a WAV. Audio is synthesized in your browser.</p><nav className="flex flex-wrap gap-4 mt-3"><a href="/guides/">이용 가이드 / Guide</a><a href="/privacy/">개인정보 / Privacy</a><a href="/terms/">약관 / Terms</a><a href="/license/">음원 이용조건 / License</a><a href="/contact/">문의 / Contact</a></nav></section>
      <footer className="border-t-4 border-[#241c42] bg-[#0e0b20] py-5 px-4 text-center font-silkscreen text-[11px] text-purple-400/80 shadow-[0_-4px_0_#070510]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 animate-spin" />
            <span>{t.footerDesc}</span>
            <span>·</span>
            <a
              href="https://www.jyesounds.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-amber-200 font-bold underline underline-offset-2 transition-colors whitespace-nowrap"
            >
              jyesounds.com
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleOpenLegalModal('terms')}
              className="text-purple-300 hover:text-pink-300 underline underline-offset-2 transition-colors cursor-pointer"
            >
              {t.privacyAndTerms}
            </button>
            <span className="text-purple-800">·</span>
            <button
              type="button"
              onClick={() => handleOpenLegalModal('guide')}
              className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2 transition-colors cursor-pointer"
            >
              {legal.tabGuide}
            </button>
            <span className="text-purple-800 hidden sm:inline">|</span>
            <span className="text-purple-400">{t.footerShortcuts}</span>
          </div>
        </div>
      </footer>

      {/* Terms of Service, Legal Disclaimer & Studio Guide Modal */}
      <TermsGuideModal
        isOpen={isLegalModalOpen}
        initialTab={legalModalTab}
        onClose={() => setIsLegalModalOpen(false)}
      />
    </div>
  );
}

