import React, { useEffect, useRef, useState } from 'react';
import { sfxEngine } from '../audio/sfxEngine';
import { Activity, BarChart2 } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface VisualizerProps {
  isPlaying: boolean;
  presetName: string;
  waveType: string;
  freq: number;
}

export const Visualizer: React.FC<VisualizerProps> = ({ presetName, waveType, freq }) => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<'oscilloscope' | 'spectrum'>('oscilloscope');
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;
    const analyser = sfxEngine.getAnalyser();
    const bufferLength = analyser ? analyser.frequencyBinCount : 256;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      if (!isRunning) return;

      const width = canvas.width;
      const height = canvas.height;

      // Dark CRT canvas background with soft grid lines
      ctx.fillStyle = '#080614';
      ctx.fillRect(0, 0, width, height);

      // Subtle CRT retro grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
      for (let x = 0; x < width; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 22) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (analyser) {
        if (mode === 'oscilloscope') {
          analyser.getByteTimeDomainData(dataArray);
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#38bdf8';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#38bdf8';
          ctx.beginPath();

          const sliceWidth = width / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * height) / 2;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }

          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          analyser.getByteFrequencyData(dataArray);
          const barCount = 40;
          const barWidth = width / barCount - 2;
          let x = 3;

          for (let i = 0; i < barCount; i++) {
            const rawVal = dataArray[i * 2] || 0;
            const barHeight = (rawVal / 255) * (height - 16);

            // Cute candy gradient bars
            const grad = ctx.createLinearGradient(0, height - barHeight, 0, height);
            grad.addColorStop(0, '#f472b6');
            grad.addColorStop(0.5, '#fbbf24');
            grad.addColorStop(1, '#34d399');

            ctx.fillStyle = grad;
            ctx.fillRect(x, height - barHeight - 4, barWidth, barHeight);

            // Little pixel cap on top of each bar
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x, height - barHeight - 6, barWidth, 2);

            x += barWidth + 2;
          }
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [mode]);

  return (
    <div className="relative rounded-3xl border-4 border-[#2c2254] bg-[#141029]/95 p-4 pixel-toy-card">
      {/* Cute Corner Screws */}
      <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-[#3d306b] border border-[#5a4891] shadow-inner" />
      <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#3d306b] border border-[#5a4891] shadow-inner" />
      <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-[#3d306b] border border-[#5a4891] shadow-inner" />
      <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-[#3d306b] border border-[#5a4891] shadow-inner" />

      {/* Screen Header Bar */}
      <div className="flex items-center justify-between pb-2 text-xs border-b border-[#291f4d] mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse border border-pink-200" />
          <span className="font-pixel text-[10px] text-pink-300 tracking-wider">CH-1 MON</span>
          <span className="text-purple-600">·</span>
          <span className="font-silkscreen text-xs text-amber-300 font-bold truncate max-w-[200px]">
            {presetName}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span className="px-2 py-0.5 rounded-lg bg-[#0c091d] border border-purple-500/40 text-cyan-300 text-[10px] font-pixel shadow-sm">
            {waveType.toUpperCase()}
          </span>
          <span className="text-amber-300 tabular-nums font-mono text-xs">{freq}Hz</span>
          
          <div className="flex items-center gap-1 ml-1 bg-[#0c091d] p-1 rounded-xl border border-purple-500/30">
            <button
              type="button"
              onClick={() => setMode('oscilloscope')}
              title={t.modeOscilloscope}
              className={`p-1 rounded-lg cursor-pointer transition-colors ${
                mode === 'oscilloscope' ? 'bg-cyan-500/25 text-cyan-300' : 'text-purple-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setMode('spectrum')}
              title={t.modeSpectrum}
              className={`p-1 rounded-lg cursor-pointer transition-colors ${
                mode === 'spectrum' ? 'bg-pink-500/25 text-pink-300' : 'text-purple-400 hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* CRT Display Frame */}
      <div className="relative rounded-2xl border-2 border-purple-900/60 bg-[#080614] overflow-hidden scanlines shadow-inner">
        <canvas
          ref={canvasRef}
          width={640}
          height={115}
          className="w-full h-[105px] block"
        />
        {/* Subtle cute pastel screen glare */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-pink-400/5 to-cyan-400/10" />
      </div>
    </div>
  );
};
