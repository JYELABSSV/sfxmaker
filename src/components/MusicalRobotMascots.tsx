import React, { useState, useEffect } from 'react';
import { sfxEngine } from '../audio/sfxEngine';
import { PRESETS } from '../audio/presets';
import { useTranslation } from '../i18n/LanguageContext';

// Cute playful speech bubbles
const SPEECH_LINES = [
  'BEEP BOOP! ♪',
  'CHIPTUNE! ♫',
  '1-UP! ♥',
  'SUPER JAM! ★',
  'GROOVY! ♬',
  'PEW PEW! 👾',
];

/**
 * 1. Bit-Synth: Cute keyboardist perched on the CRT Monitor
 */
export const MonitorSynthRobot: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  const { t } = useTranslation();
  const [bubble, setBubble] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const p = PRESETS.find((x) => x.id === 'one_up') || PRESETS[0];
    sfxEngine.play(p);
    setBubble('BEEP BEEP! ♥');
    setTimeout(() => setBubble(null), 1800);
  };

  return (
    <div
      onClick={handleClick}
      title={t.synthMascot}
      className="absolute -top-11 right-8 z-30 flex flex-col items-center cursor-pointer select-none group"
    >
      {/* Cute Speech Bubble */}
      {bubble && (
        <div className="absolute -top-8 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-pixel text-[9px] shadow-[0_3px_0_#9f1239] animate-bounce whitespace-nowrap z-40 border border-pink-200">
          {bubble}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-500 rotate-45" />
        </div>
      )}

      {/* Floating Sparkles & Heart during playback */}
      {isPlaying && (
        <div className="absolute -top-6 inset-x-0 flex justify-between pointer-events-none">
          <span className="text-pink-400 font-pixel text-xs animate-bounce">♥</span>
          <span className="text-amber-300 font-pixel text-xs animate-bounce delay-100">♪</span>
        </div>
      )}

      {/* Cute Robot Body */}
      <div
        className={`flex flex-col items-center transition-transform ${
          isPlaying ? 'animate-[bounce_0.4s_infinite]' : 'group-hover:-translate-y-1'
        }`}
      >
        {/* Antenna with Heart/Star Tip */}
        <div className="w-1 h-3 bg-amber-400 flex flex-col items-center">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              isPlaying
                ? 'bg-pink-400 scale-125 shadow-[0_0_8px_#f472b6]'
                : 'bg-amber-300 group-hover:bg-pink-300'
            } transition-all`}
          />
        </div>

        {/* Cute Head with Pastel Headphones & Blushing Cheeks */}
        <div className="relative flex items-center justify-center">
          {/* Headphone Ears */}
          <div className="absolute -left-2 w-2 h-4 rounded-full bg-pink-500 border border-pink-300 shadow-sm" />
          <div className="absolute -right-2 w-2 h-4 rounded-full bg-pink-500 border border-pink-300 shadow-sm" />

          {/* Face Screen */}
          <div className="w-9 h-7 rounded-lg bg-slate-900 border-2 border-amber-300 p-1 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
            {/* Cute Happy Eyes */}
            <div className="flex gap-2 items-center">
              {isPlaying ? (
                <>
                  <span className="text-[10px] text-pink-300 font-bold leading-none">^</span>
                  <span className="text-[10px] text-pink-300 font-bold leading-none">^</span>
                </>
              ) : (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_4px_#67e8f9]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_4px_#67e8f9]" />
                </>
              )}
            </div>

            {/* Pink Blushing Cheeks */}
            <div className="flex justify-between w-full px-0.5 -mt-0.5">
              <div className="w-1.5 h-1 bg-pink-400/90 rounded-full" />
              <div className="w-1.5 h-1 bg-pink-400/90 rounded-full" />
            </div>
          </div>
        </div>

        {/* Cute Pastel Piano Keys */}
        <div className="w-11 h-3.5 rounded bg-slate-950 border border-amber-300 flex items-center justify-around px-1 shadow-md -mt-0.5">
          <div className="w-1.5 h-2.5 bg-pink-100 rounded-2xs" />
          <div className="w-1 h-1.5 bg-slate-900 rounded-2xs" />
          <div className="w-1.5 h-2.5 bg-amber-100 rounded-2xs" />
          <div className="w-1 h-1.5 bg-slate-900 rounded-2xs" />
          <div className="w-1.5 h-2.5 bg-cyan-100 rounded-2xs" />
        </div>
      </div>
    </div>
  );
};

/**
 * 2. Beep-Drummer: Energetic drummer with bear-ear antennas
 */
export const ConsoleDrummerRobot: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  const { t } = useTranslation();
  const [bubble, setBubble] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const p = PRESETS.find((x) => x.id === 'hit') || PRESETS[3];
    sfxEngine.play(p);
    setBubble('BOOM! 🥁');
    setTimeout(() => setBubble(null), 1800);
  };

  return (
    <div
      onClick={handleClick}
      title={t.drumMascot}
      className="absolute -top-12 right-6 z-30 flex flex-col items-center cursor-pointer select-none group"
    >
      {/* Speech Bubble */}
      {bubble && (
        <div className="absolute -top-8 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-pixel text-[9px] shadow-[0_3px_0_#9f1239] animate-bounce whitespace-nowrap z-40 border border-rose-200">
          {bubble}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-rose-500 rotate-45" />
        </div>
      )}

      {/* Floating Note */}
      {isPlaying && (
        <span className="absolute -top-6 right-0 text-amber-300 font-pixel text-xs animate-bounce pointer-events-none">
          ★
        </span>
      )}

      {/* Cute Drummer Figure */}
      <div
        className={`flex flex-col items-center transition-transform ${
          isPlaying ? 'animate-[bounce_0.32s_infinite]' : 'group-hover:-translate-y-1'
        }`}
      >
        {/* Cute Round Ears */}
        <div className="flex gap-4 -mb-1 z-0">
          <div className="w-2.5 h-2 rounded-t-full bg-rose-400 border border-rose-300" />
          <div className="w-2.5 h-2 rounded-t-full bg-rose-400 border border-rose-300" />
        </div>

        {/* Head Box */}
        <div className="w-8 h-6 rounded-lg bg-slate-900 border-2 border-rose-400 p-0.5 flex flex-col items-center justify-center z-10">
          <div className="flex gap-2 items-center">
            {isPlaying ? (
              <>
                <span className="text-[10px] text-rose-300 font-bold leading-none">&gt;</span>
                <span className="text-[10px] text-rose-300 font-bold leading-none">&lt;</span>
              </>
            ) : (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-rose-300 shadow-[0_0_4px_#fda4af]" />
                <div className="w-1.5 h-1.5 rounded-full bg-rose-300 shadow-[0_0_4px_#fda4af]" />
              </>
            )}
          </div>
          {/* Cute Blushing Cheeks */}
          <div className="flex justify-between w-full px-1">
            <div className="w-1 h-1 bg-pink-400 rounded-full" />
            <div className="w-1 h-1 bg-pink-400 rounded-full" />
          </div>
        </div>

        {/* Cute Drum Sticks */}
        <div className="flex gap-3 -my-0.5 z-20">
          <div
            className={`w-1 h-3.5 bg-amber-200 rounded-xs origin-top transition-transform ${
              isPlaying ? 'rotate-[-40deg]' : 'rotate-[-12deg]'
            }`}
          />
          <div
            className={`w-1 h-3.5 bg-amber-200 rounded-xs origin-top transition-transform ${
              isPlaying ? 'rotate-[40deg]' : 'rotate-[12deg]'
            }`}
          />
        </div>

        {/* Dual Snare Drums */}
        <div className="flex gap-1.5">
          <div className="w-4 h-3.5 rounded bg-rose-950 border-2 border-rose-400 flex items-center justify-center shadow-sm">
            <div className="w-2 h-1.5 bg-amber-300/80 rounded-2xs" />
          </div>
          <div className="w-4 h-3.5 rounded bg-rose-950 border-2 border-rose-400 flex items-center justify-center shadow-sm">
            <div className="w-2 h-1.5 bg-amber-300/80 rounded-2xs" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. Wave-Bassist: Cool & cute bassist with cyber visor
 */
export const ExportBassistRobot: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  const { t } = useTranslation();
  const [bubble, setBubble] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const p = PRESETS.find((x) => x.id === 'jump') || PRESETS[0];
    sfxEngine.play(p, 0.7);
    setBubble('SLAP BASS! 🎸');
    setTimeout(() => setBubble(null), 1800);
  };

  return (
    <div
      onClick={handleClick}
      title={t.bassMascot}
      className="absolute -top-12 right-8 z-30 flex flex-col items-center cursor-pointer select-none group"
    >
      {/* Speech Bubble */}
      {bubble && (
        <div className="absolute -top-8 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-pixel text-[9px] shadow-[0_3px_0_#065f46] animate-bounce whitespace-nowrap z-40 border border-emerald-200 font-bold">
          {bubble}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-400 rotate-45" />
        </div>
      )}

      {/* Floating Note */}
      {isPlaying && (
        <span className="absolute -top-6 left-0 text-emerald-300 font-pixel text-xs animate-bounce pointer-events-none">
          ♬
        </span>
      )}

      {/* Robot Figure */}
      <div
        className={`flex flex-col items-center transition-transform ${
          isPlaying ? 'animate-[bounce_0.42s_infinite]' : 'group-hover:-translate-y-1'
        }`}
      >
        {/* Head with Visor and Blushing Cheeks */}
        <div className="w-8 h-6 rounded-lg bg-slate-900 border-2 border-emerald-400 flex flex-col items-center justify-center p-0.5">
          <div
            className={`w-6 h-2 rounded-xs flex items-center justify-center transition-all ${
              isPlaying ? 'bg-emerald-300 shadow-[0_0_8px_#34d399]' : 'bg-emerald-400/90'
            }`}
          >
            <div className="w-full h-0.5 bg-emerald-950/40" />
          </div>
          <div className="flex justify-between w-full px-1 mt-0.5">
            <div className="w-1 h-0.5 bg-pink-400 rounded-full" />
            <div className="w-1 h-0.5 bg-pink-400 rounded-full" />
          </div>
        </div>

        {/* Body with Bass Guitar */}
        <div className="relative w-8 h-5 rounded bg-slate-950 border border-slate-700 flex items-center justify-center mt-0.5">
          {/* Cute 8-bit Bass Guitar */}
          <div className="absolute -left-2.5 -top-0.5 w-11 h-3.5 flex items-center pointer-events-none">
            <div className="w-3 h-3 rounded bg-emerald-400 border border-emerald-200 rotate-12" />
            <div className="w-5 h-1.5 bg-amber-300 rounded-full -ml-1" />
            <div className="w-1.5 h-2 bg-emerald-300 rounded-2xs" />
          </div>
        </div>

        {/* Dancing Feet Tapping */}
        <div className="flex gap-2 mt-0.5">
          <div
            className={`w-2 h-1.5 rounded-2xs bg-slate-700 border border-emerald-400/60 ${
              isPlaying ? 'translate-y-[-1px]' : ''
            }`}
          />
          <div
            className={`w-2 h-1.5 rounded-2xs bg-slate-700 border border-emerald-400/60 ${
              isPlaying ? 'translate-y-[1px]' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * 4. Roaming / Floating Boom-Bot: Ultra cute Tamagotchi companion
 */
export const FloatingBoomboxBot: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  const { t } = useTranslation();
  const [bubble, setBubble] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // Periodically show cute speech bubbles
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.5) {
        const randomLine = SPEECH_LINES[Math.floor(Math.random() * SPEECH_LINES.length)];
        setBubble(randomLine);
        setTimeout(() => setBubble(null), 2500);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    const p = PRESETS.find((x) => x.id === 'coin') || PRESETS[1];
    sfxEngine.play(p);
    setIsSpinning(true);
    setBubble('★ SUPER 8-BIT! ♥');
    setTimeout(() => {
      setIsSpinning(false);
      setBubble(null), 2000;
    }, 2000);
  };

  return (
    <aside
      aria-label="8-bit Mascot Robot"
      onClick={handleClick}
      title={t.boomboxMascot}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center cursor-pointer select-none group"
    >
      {/* Cute Speech Bubble */}
      {bubble && (
        <div className="absolute -top-10 px-3 py-1 rounded-full bg-slate-900 border-2 border-pink-400 text-pink-300 font-pixel text-[10px] shadow-[0_4px_0_#831843] animate-bounce whitespace-nowrap z-50">
          {bubble}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-b-2 border-r-2 border-pink-400 rotate-45" />
        </div>
      )}

      {/* Floating Notes during sound */}
      {isPlaying && (
        <div className="absolute -top-7 inset-x-0 flex justify-around pointer-events-none">
          <span className="text-pink-400 font-pixel text-xs animate-bounce">♥</span>
          <span className="text-cyan-300 font-pixel text-xs animate-bounce delay-150">♪</span>
        </div>
      )}

      {/* Floating Body */}
      <div
        className={`flex flex-col items-center transition-all ${
          isSpinning
            ? 'rotate-[360deg] duration-700'
            : isPlaying
            ? 'animate-[bounce_0.38s_infinite]'
            : 'animate-cute-bounce'
        }`}
      >
        {/* Tiny Propeller */}
        <div className="w-1 h-3 bg-pink-400 flex flex-col items-center">
          <div
            className={`w-4 h-1.5 bg-pink-300 rounded-full shadow-sm ${
              isPlaying ? 'animate-spin' : ''
            }`}
          />
        </div>

        {/* Boombox Main Chassis (Tamagotchi Style) */}
        <div className="w-14 h-11 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-3 border-pink-400 flex items-center justify-between px-2 shadow-[0_5px_0_#4c0519] group-hover:border-pink-300 transition-colors">
          {/* Left Speaker Eye */}
          <div
            className={`w-3.5 h-3.5 rounded-full border border-pink-400 flex items-center justify-center transition-transform ${
              isPlaying ? 'bg-pink-400 scale-125 shadow-[0_0_8px_#f472b6]' : 'bg-slate-900'
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
          </div>

          {/* Tamagotchi Smiling Screen */}
          <div className="flex flex-col items-center justify-center py-0.5">
            <span className="font-pixel text-[9px] text-amber-300 leading-none">
              {isPlaying ? '^ ‿ ^' : '● ‿ ●'}
            </span>
            <div className="flex gap-2 mt-0.5">
              <span className="w-1 h-0.5 bg-pink-400 rounded-full" />
              <span className="w-1 h-0.5 bg-pink-400 rounded-full" />
            </div>
          </div>

          {/* Right Speaker Eye */}
          <div
            className={`w-3.5 h-3.5 rounded-full border border-pink-400 flex items-center justify-center transition-transform ${
              isPlaying ? 'bg-pink-400 scale-125 shadow-[0_0_8px_#f472b6]' : 'bg-slate-900'
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
          </div>
        </div>

        {/* Little Jet Hover Exhaust */}
        <div className="flex gap-4 -mt-0.5">
          <div
            className={`w-2 h-2 rounded-full ${
              isPlaying ? 'bg-pink-400 animate-ping' : 'bg-cyan-400'
            }`}
          />
          <div
            className={`w-2 h-2 rounded-full ${
              isPlaying ? 'bg-pink-400 animate-ping' : 'bg-cyan-400'
            }`}
          />
        </div>
      </div>
      <span className="font-pixel text-[8px] text-pink-300 mt-1 font-bold tracking-wider group-hover:text-pink-200">
        BOOM-BOT ♥
      </span>
    </aside>
  );
};
