import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SFXParams } from '../types/sfx';
import { useTranslation } from '../i18n/LanguageContext';
import {
  Activity,
  Volume2,
  TrendingUp,
  Sparkles,
  PenTool,
  Move,
  Plus,
  Minus,
} from 'lucide-react';

interface WaveformGraphEditorProps {
  params: SFXParams;
  onChange: (newParams: SFXParams, shouldPreview?: boolean) => void;
  isPlaying: boolean;
}

type GraphTab = 'pitch' | 'envelope';
type EditMode = 'handles' | 'draw';

export const WaveformGraphEditor: React.FC<WaveformGraphEditorProps> = ({
  params,
  onChange,
  isPlaying,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<GraphTab>('pitch');
  const [editMode, setEditMode] = useState<EditMode>('handles');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Active dragging state
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPoints, setDrawnPoints] = useState<{ x: number; y: number }[]>([]);
  const [sweepProgress, setSweepProgress] = useState(0);

  // Keep latest params in ref for window event listeners
  const paramsRef = useRef(params);
  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  // Dimensions
  const W = 640;
  const H = 220;
  const padX = 48;
  const padY = 24;
  const plotW = W - padX * 2;
  const plotH = H - padY * 2;

  // Pitch boundaries
  const minFreq = 40;
  const maxFreq = 2600;

  // Convert Frequency to SVG Y (Musical Logarithmic scale)
  const freqToY = useCallback(
    (f: number) => {
      const clamped = Math.max(minFreq, Math.min(maxFreq, f));
      const norm = (Math.log(clamped) - Math.log(minFreq)) / (Math.log(maxFreq) - Math.log(minFreq));
      return padY + plotH * (1 - norm);
    },
    [plotH]
  );

  // Convert SVG Y to Frequency
  const yToFreq = useCallback(
    (y: number) => {
      const clampedY = Math.max(padY, Math.min(padY + plotH, y));
      const norm = 1 - (clampedY - padY) / plotH;
      const val = Math.exp(Math.log(minFreq) + norm * (Math.log(maxFreq) - Math.log(minFreq)));
      return Math.round(val);
    },
    [plotH]
  );

  // Total sound duration
  const totalSoundTime = Math.max(
    0.15,
    params.melodyNotes && params.melodyNotes.length > 0
      ? params.melodyNotes.reduce((sum, n) => sum + n.duration, 0) + params.decayTime
      : params.attackTime + params.sustainTime + params.decayTime
  );

  // Time to SVG X
  const timeToX = useCallback(
    (tSec: number) => {
      const norm = Math.max(0, Math.min(1, tSec / totalSoundTime));
      return padX + plotW * norm;
    },
    [plotW, totalSoundTime]
  );

  // SVG X to Time
  const xToTime = useCallback(
    (x: number) => {
      const clampedX = Math.max(padX, Math.min(padX + plotW, x));
      const norm = (clampedX - padX) / plotW;
      return norm * totalSoundTime;
    },
    [plotW, totalSoundTime]
  );

  // Helper to map client mouse/touch coordinates to SVG coordinates
  const getSvgCoords = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, []);

  // Global Window-level Pointer Dragging Listeners
  useEffect(() => {
    const handleWindowPointerMove = (e: PointerEvent) => {
      if (!svgRef.current) return;
      const { x, y } = getSvgCoords(e.clientX, e.clientY);
      const current = paramsRef.current;

      // 1. FREEHAND DRAWING MODE
      if (isDrawing) {
        setDrawnPoints((prev) => [...prev, { x, y }]);
        return;
      }

      // 2. PRECISION NODE DRAGGING MODE
      if (!draggingNode) return;

      if (activeTab === 'pitch') {
        if (draggingNode === 'start') {
          const newStartFreq = yToFreq(y);
          onChange({ ...current, startFreq: newStartFreq }, false);
        } else if (draggingNode === 'end') {
          const newEndFreq = yToFreq(y);
          const newSlideTime = Math.max(
            0.04,
            Math.min(totalSoundTime, parseFloat(xToTime(x).toFixed(2)))
          );
          onChange(
            {
              ...current,
              endFreq: newEndFreq,
              pitchSlideTime: newSlideTime,
            },
            false
          );
        } else if (draggingNode === 'mid') {
          const midFreq = yToFreq(y);
          const midTime = Math.max(
            0.02,
            Math.min(current.pitchSlideTime * 0.9, parseFloat(xToTime(x).toFixed(2)))
          );
          if (current.hasArpeggio) {
            onChange({ ...current, arpPitch: midFreq, arpTime: midTime }, false);
          } else {
            const avg = (current.startFreq + current.endFreq) / 2;
            const curve = midFreq > avg * 1.1 ? 'exponential' : 'linear';
            onChange({ ...current, slideCurve: curve }, false);
          }
        }
      } else {
        // Envelope Tab
        if (draggingNode === 'attack') {
          const newAttack = Math.max(0.003, Math.min(0.45, parseFloat(xToTime(x).toFixed(3))));
          const clampedY = Math.max(padY, Math.min(padY + plotH, y));
          const punchRatio = (padY + plotH - clampedY) / plotH;
          const newPunch = Math.max(0, Math.min(1, parseFloat(punchRatio.toFixed(2))));
          onChange({ ...current, attackTime: newAttack, punch: newPunch }, false);
        } else if (draggingNode === 'sustain') {
          const pointerTime = xToTime(x);
          const newSustain = Math.max(
            0.02,
            Math.min(0.8, parseFloat((pointerTime - current.attackTime).toFixed(2)))
          );
          const clampedY = Math.max(padY, Math.min(padY + plotH, y));
          const sustainLevel = Math.max(0.1, Math.min(1.0, (padY + plotH - clampedY) / plotH));
          onChange(
            {
              ...current,
              sustainTime: newSustain,
              sustainLevel: parseFloat(sustainLevel.toFixed(2)),
            },
            false
          );
        } else if (draggingNode === 'decay') {
          const pointerTime = xToTime(x);
          const tSustainEnd = current.attackTime + current.sustainTime;
          const newDecay = Math.max(
            0.08,
            Math.min(1.5, parseFloat((pointerTime - tSustainEnd).toFixed(2)))
          );
          onChange({ ...current, decayTime: newDecay }, false);
        }
      }
    };

    const handleWindowPointerUp = () => {
      if (isDrawing) {
        setIsDrawing(false);
        if (drawnPoints.length >= 2) {
          const firstPoint = drawnPoints[0];
          const lastPoint = drawnPoints[drawnPoints.length - 1];
          const startF = yToFreq(firstPoint.y);
          const endF = yToFreq(lastPoint.y);
          const slideDur = Math.max(
            0.06,
            Math.min(1.0, parseFloat(xToTime(lastPoint.x).toFixed(2)))
          );

          const midPoint = drawnPoints[Math.floor(drawnPoints.length / 2)];
          const midF = yToFreq(midPoint.y);
          const avgF = (startF + endF) / 2;
          const isExp = Math.abs(midF - avgF) > avgF * 0.15;

          const updated = {
            ...paramsRef.current,
            startFreq: startF,
            endFreq: endF,
            pitchSlideTime: slideDur,
            slideCurve: isExp ? ('exponential' as const) : ('linear' as const),
          };
          onChange(updated, true);
        }
        setDrawnPoints([]);
        return;
      }

      if (draggingNode) {
        setDraggingNode(null);
        onChange(paramsRef.current, true);
      }
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);
    };
  }, [
    draggingNode,
    isDrawing,
    drawnPoints,
    activeTab,
    getSvgCoords,
    onChange,
    plotH,
    totalSoundTime,
    xToTime,
    yToFreq,
  ]);

  // Click on Canvas background to instantly move the closest point
  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (draggingNode || isDrawing) return;
    const { x, y } = getSvgCoords(e.clientX, e.clientY);
    if (x < padX || x > padX + plotW || y < padY || y > padY + plotH) return;

    const current = paramsRef.current;
    if (activeTab === 'pitch') {
      const clickRatio = (x - padX) / plotW;
      const targetFreq = yToFreq(y);
      if (clickRatio < 0.35) {
        onChange({ ...current, startFreq: targetFreq }, true);
      } else if (clickRatio > 0.65) {
        onChange({ ...current, endFreq: targetFreq }, true);
      } else {
        if (current.hasArpeggio) {
          onChange({ ...current, arpPitch: targetFreq }, true);
        } else {
          onChange({ ...current, endFreq: targetFreq }, true);
        }
      }
    }
  };

  // Begin Drawing gesture on Canvas
  const handleCanvasPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (editMode === 'draw') {
      const { x, y } = getSvgCoords(e.clientX, e.clientY);
      setIsDrawing(true);
      setDrawnPoints([{ x, y }]);
    }
  };

  // Real-time Sound Playback Sweep Animation
  useEffect(() => {
    if (!isPlaying) {
      setSweepProgress(0);
      return;
    }
    const startTime = performance.now();
    let animId: number;

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / totalSoundTime);
      setSweepProgress(progress);
      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setSweepProgress(0);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, totalSoundTime]);

  // Quick Preset Handlers
  const applyCurvePreset = (preset: 'jump' | 'laser' | 'drop' | 'vibrato' | 'flat') => {
    if (preset === 'jump') {
      onChange(
        { ...params, startFreq: 150, endFreq: 750, pitchSlideTime: 0.3, slideCurve: 'exponential' },
        true
      );
    } else if (preset === 'laser') {
      onChange(
        { ...params, startFreq: 1600, endFreq: 120, pitchSlideTime: 0.22, slideCurve: 'exponential' },
        true
      );
    } else if (preset === 'drop') {
      onChange(
        { ...params, startFreq: 900, endFreq: 180, pitchSlideTime: 0.45, slideCurve: 'linear' },
        true
      );
    } else if (preset === 'vibrato') {
      onChange({ ...params, vibratoDepth: 45, vibratoSpeed: 20 }, true);
    } else if (preset === 'flat') {
      onChange(
        { ...params, endFreq: params.startFreq, pitchSlideTime: 0.2, slideCurve: 'linear' },
        true
      );
    }
  };

  const applyEnvelopePreset = (preset: 'punch' | 'bell' | 'swell' | 'staccato') => {
    if (preset === 'punch') {
      onChange(
        {
          ...params,
          attackTime: 0.003,
          sustainTime: 0.08,
          decayTime: 0.28,
          punch: 0.6,
          sustainLevel: 0.5,
        },
        true
      );
    } else if (preset === 'bell') {
      onChange(
        {
          ...params,
          attackTime: 0.005,
          sustainTime: 0.15,
          decayTime: 0.65,
          punch: 0.3,
          sustainLevel: 0.7,
        },
        true
      );
    } else if (preset === 'swell') {
      onChange(
        {
          ...params,
          attackTime: 0.25,
          sustainTime: 0.2,
          decayTime: 0.4,
          punch: 0.1,
          sustainLevel: 0.9,
        },
        true
      );
    } else if (preset === 'staccato') {
      onChange(
        {
          ...params,
          attackTime: 0.002,
          sustainTime: 0.04,
          decayTime: 0.12,
          punch: 0.4,
          sustainLevel: 0.3,
        },
        true
      );
    }
  };

  // Step button nudges
  const nudgeFreq = (target: 'start' | 'end', delta: number) => {
    if (target === 'start') {
      const next = Math.max(minFreq, Math.min(maxFreq, params.startFreq + delta));
      onChange({ ...params, startFreq: next }, true);
    } else {
      const next = Math.max(minFreq, Math.min(maxFreq, params.endFreq + delta));
      onChange({ ...params, endFreq: next }, true);
    }
  };

  const nudgeSlideTime = (delta: number) => {
    const next = Math.max(0.04, Math.min(1.2, parseFloat((params.pitchSlideTime + delta).toFixed(2))));
    onChange({ ...params, pitchSlideTime: next }, true);
  };

  // Paths Computation
  const pStartX = padX;
  const pStartY = freqToY(params.startFreq);
  const pEndX = timeToX(params.pitchSlideTime);
  const pEndY = freqToY(params.endFreq);

  let pitchPath = `M ${pStartX} ${pStartY}`;
  let midX = (pStartX + pEndX) / 2;
  let midY = (pStartY + pEndY) / 2;

  if (params.hasArpeggio && params.arpPitch > 0) {
    const arpX = timeToX(params.arpTime);
    const arpY = freqToY(params.arpPitch);
    pitchPath = `M ${pStartX} ${pStartY} L ${arpX} ${pStartY} L ${arpX} ${arpY} L ${pEndX} ${pEndY} L ${padX + plotW} ${pEndY}`;
    midX = arpX;
    midY = arpY;
  } else if (params.slideCurve === 'exponential') {
    pitchPath = `M ${pStartX} ${pStartY} Q ${pStartX + (pEndX - pStartX) * 0.2} ${pEndY} ${pEndX} ${pEndY} L ${padX + plotW} ${pEndY}`;
    midX = pStartX + (pEndX - pStartX) * 0.4;
    midY = freqToY(Math.sqrt(params.startFreq * params.endFreq));
  } else {
    pitchPath = `M ${pStartX} ${pStartY} L ${pEndX} ${pEndY} L ${padX + plotW} ${pEndY}`;
  }

  // Envelope Path
  const envAttackX = timeToX(params.attackTime);
  const envPeakY = padY + plotH * (1 - Math.min(1, 0.7 + params.punch * 0.3));
  const envSustainX = timeToX(params.attackTime + params.sustainTime);
  const envSustainY = padY + plotH * (1 - params.sustainLevel * 0.75);
  const envDecayX = timeToX(params.attackTime + params.sustainTime + params.decayTime);
  const envDecayY = padY + plotH;

  const envPath = `M ${padX} ${padY + plotH} L ${envAttackX} ${envPeakY} L ${envSustainX} ${envSustainY} L ${envDecayX} ${envDecayY}`;
  const envFillPath = `${envPath} L ${padX} ${padY + plotH} Z`;

  // Draw Path preview string
  const drawPathString =
    drawnPoints.length > 0
      ? `M ${drawnPoints[0].x} ${drawnPoints[0].y} ` +
        drawnPoints
          .slice(1)
          .map((p) => `L ${p.x} ${p.y}`)
          .join(' ')
      : '';

  return (
    <div
      ref={containerRef}
      className="rounded-3xl border-4 border-[#2c2254] bg-[#141029]/95 p-5 pixel-toy-card space-y-4"
    >
      {/* Header & Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-[#261d4a]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-pink-400 p-0.5 shadow-md flex items-center justify-center">
            <Activity className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-pixel text-xs text-pink-300 tracking-wider">
                📈 {t.graphTitle}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-400 text-pink-300 font-pixel text-[9px] animate-pulse">
                {t.graphBadge}
              </span>
            </div>
            <p className="font-silkscreen text-[11px] text-purple-300/80 mt-0.5">
              {editMode === 'draw' ? t.graphDescDraw : t.graphDescHandles}
            </p>
          </div>
        </div>

        {/* Tab & Mode Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher: Precision Handles vs Freehand Draw */}
          {activeTab === 'pitch' && (
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#0c091d] border-2 border-[#332763]">
              <button
                type="button"
                onClick={() => setEditMode('handles')}
                className={`pixel-toy-btn flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-silkscreen text-xs font-bold transition-all cursor-pointer ${
                  editMode === 'handles'
                    ? 'bg-amber-400 text-slate-950 border border-amber-200'
                    : 'text-purple-300 hover:text-white'
                }`}
                title={t.modeHandles}
              >
                <Move className="w-3.5 h-3.5" />
                <span>{t.modeHandles}</span>
              </button>
              <button
                type="button"
                onClick={() => setEditMode('draw')}
                className={`pixel-toy-btn flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-silkscreen text-xs font-bold transition-all cursor-pointer ${
                  editMode === 'draw'
                    ? 'bg-pink-500 text-white border border-pink-200'
                    : 'text-purple-300 hover:text-white'
                }`}
                title={t.modeDraw}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>{t.modeDraw}</span>
              </button>
            </div>
          )}

          {/* Graph Target Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0c091d] border-2 border-[#332763]">
            <button
              type="button"
              onClick={() => {
                setActiveTab('pitch');
                setEditMode('handles');
              }}
              className={`pixel-toy-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-silkscreen text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'pitch'
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 border border-cyan-200 shadow-sm'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t.tabPitch}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('envelope');
                setEditMode('handles');
              }}
              className={`pixel-toy-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-silkscreen text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'envelope'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white border border-pink-200 shadow-sm'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{t.tabEnvelope}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive SVG Canvas */}
      <div className="relative rounded-2xl border-2 border-[#362b66] bg-[#070514] p-2 overflow-hidden shadow-inner select-none touch-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          onClick={handleCanvasClick}
          onPointerDown={handleCanvasPointerDown}
          className={`w-full h-[230px] block ${
            editMode === 'draw' ? 'cursor-crosshair' : 'cursor-default'
          }`}
        >
          <defs>
            <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <linearGradient id="wavePitchGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>

            <linearGradient id="waveEnvGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f472b6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Coordinate Grid Lines */}
          {[0.25, 0.5, 0.75].map((ratio) => (
            <line
              key={`gh-${ratio}`}
              x1={padX}
              y1={padY + plotH * ratio}
              x2={padX + plotW}
              y2={padY + plotH * ratio}
              stroke="rgba(168, 85, 247, 0.15)"
              strokeDasharray="4 4"
            />
          ))}
          {[0.25, 0.5, 0.75].map((ratio) => (
            <line
              key={`gv-${ratio}`}
              x1={padX + plotW * ratio}
              y1={padY}
              x2={padX + plotW * ratio}
              y2={padY + plotH}
              stroke="rgba(168, 85, 247, 0.15)"
              strokeDasharray="4 4"
            />
          ))}

          {/* Frame Borders */}
          <rect
            x={padX}
            y={padY}
            width={plotW}
            height={plotH}
            fill="none"
            stroke="#271d4a"
            strokeWidth="1.5"
          />

          {/* Y Axis Reference Labels */}
          {activeTab === 'pitch' ? (
            <>
              <text x={padX - 8} y={padY + 10} fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">
                2600Hz
              </text>
              <text x={padX - 8} y={padY + plotH / 2 + 3} fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">
                320Hz
              </text>
              <text x={padX - 8} y={padY + plotH} fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">
                40Hz
              </text>
            </>
          ) : (
            <>
              <text x={padX - 8} y={padY + 10} fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">
                100%
              </text>
              <text x={padX - 8} y={padY + plotH / 2 + 3} fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">
                50%
              </text>
              <text x={padX - 8} y={padY + plotH} fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">
                0%
              </text>
            </>
          )}

          {/* X Axis Reference Labels */}
          <text x={padX} y={H - 6} fill="#94a3b8" fontSize="9" fontFamily="monospace">
            0.0s
          </text>
          <text x={padX + plotW / 2} y={H - 6} fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
            {(totalSoundTime / 2).toFixed(2)}s
          </text>
          <text x={padX + plotW} y={H - 6} fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">
            {totalSoundTime.toFixed(2)}s
          </text>

          {/* ACTIVE TAB 1: PITCH TRAJECTORY */}
          {activeTab === 'pitch' && (
            <>
              {/* Pitch Trajectory Path */}
              <path
                d={pitchPath}
                fill="none"
                stroke="url(#wavePitchGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#waveGlow)"
              />

              {/* Freehand Draw Stroke Preview */}
              {isDrawing && drawPathString && (
                <path
                  d={drawPathString}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />
              )}

              {/* Node 1: START FREQUENCY */}
              <g
                transform={`translate(${pStartX}, ${pStartY})`}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setDraggingNode('start');
                }}
                className="cursor-ns-resize group"
              >
                <circle r="26" fill="transparent" />
                <circle r="14" fill="#38bdf8" fillOpacity="0.3" className="animate-pulse" />
                <circle
                  r="8.5"
                  fill="#38bdf8"
                  stroke="#ffffff"
                  strokeWidth="3"
                  className={`transition-transform ${
                    draggingNode === 'start' ? 'scale-150' : 'group-hover:scale-125'
                  }`}
                />
                <text
                  x="14"
                  y="-12"
                  fill="#38bdf8"
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="bold"
                  className="pointer-events-none drop-shadow"
                >
                  {t.graphStart}: {params.startFreq}Hz
                </text>
              </g>

              {/* Node 2: MID SLIDE CURVE / ARPEGGIO */}
              <g
                transform={`translate(${midX}, ${midY})`}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setDraggingNode('mid');
                }}
                className="cursor-move group"
              >
                <circle r="26" fill="transparent" />
                <circle r="12" fill="#facc15" fillOpacity="0.3" />
                <circle
                  r="7.5"
                  fill="#facc15"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className={`transition-transform ${
                    draggingNode === 'mid' ? 'scale-150' : 'group-hover:scale-125'
                  }`}
                />
                <text
                  x="12"
                  y="16"
                  fill="#facc15"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  className="pointer-events-none drop-shadow"
                >
                  {params.hasArpeggio
                    ? `${t.graphArp}: ${params.arpPitch}Hz`
                    : `${t.graphCurve}: ${
                        params.slideCurve === 'exponential' ? t.graphCurveExp : t.graphCurveLinear
                      }`}
                </text>
              </g>

              {/* Node 3: END FREQUENCY & DURATION */}
              <g
                transform={`translate(${pEndX}, ${pEndY})`}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setDraggingNode('end');
                }}
                className="cursor-move group"
              >
                <circle r="26" fill="transparent" />
                <circle r="14" fill="#f43f5e" fillOpacity="0.3" className="animate-pulse" />
                <circle
                  r="8.5"
                  fill="#f43f5e"
                  stroke="#ffffff"
                  strokeWidth="3"
                  className={`transition-transform ${
                    draggingNode === 'end' ? 'scale-150' : 'group-hover:scale-125'
                  }`}
                />
                <text
                  x="14"
                  y="-12"
                  fill="#fb7185"
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="bold"
                  className="pointer-events-none drop-shadow"
                >
                  {t.graphEnd}: {params.endFreq}Hz ({params.pitchSlideTime.toFixed(2)}s)
                </text>
              </g>
            </>
          )}

          {/* ACTIVE TAB 2: ADSR VOLUME ENVELOPE */}
          {activeTab === 'envelope' && (
            <>
              {/* Shaded Area */}
              <path d={envFillPath} fill="url(#waveEnvGrad)" />
              {/* Envelope Line */}
              <path
                d={envPath}
                fill="none"
                stroke="#f472b6"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#waveGlow)"
              />

              {/* Node A: Attack Peak */}
              <g
                transform={`translate(${envAttackX}, ${envPeakY})`}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setDraggingNode('attack');
                }}
                className="cursor-move group"
              >
                <circle r="26" fill="transparent" />
                <circle r="13" fill="#34d399" fillOpacity="0.3" className="animate-pulse" />
                <circle
                  r="8"
                  fill="#34d399"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className={`transition-transform ${
                    draggingNode === 'attack' ? 'scale-150' : 'group-hover:scale-125'
                  }`}
                />
                <text
                  x="12"
                  y="-12"
                  fill="#34d399"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  className="pointer-events-none drop-shadow"
                >
                  {t.graphAttack}: {(params.attackTime * 1000).toFixed(0)}ms · {t.graphPunch}:{' '}
                  {Math.round(params.punch * 100)}%
                </text>
              </g>

              {/* Node B: Sustain Level & Time */}
              <g
                transform={`translate(${envSustainX}, ${envSustainY})`}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setDraggingNode('sustain');
                }}
                className="cursor-move group"
              >
                <circle r="26" fill="transparent" />
                <circle r="13" fill="#c084fc" fillOpacity="0.3" />
                <circle
                  r="8"
                  fill="#c084fc"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className={`transition-transform ${
                    draggingNode === 'sustain' ? 'scale-150' : 'group-hover:scale-125'
                  }`}
                />
                <text
                  x="12"
                  y="16"
                  fill="#c084fc"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  className="pointer-events-none drop-shadow"
                >
                  {t.graphSustain}: {(params.sustainTime * 1000).toFixed(0)}ms (
                  {Math.round(params.sustainLevel * 100)}%)
                </text>
              </g>

              {/* Node C: Decay / Release Tail */}
              <g
                transform={`translate(${envDecayX}, ${envDecayY})`}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setDraggingNode('decay');
                }}
                className="cursor-ew-resize group"
              >
                <circle r="26" fill="transparent" />
                <circle r="13" fill="#fb923c" fillOpacity="0.3" />
                <circle
                  r="8"
                  fill="#fb923c"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className={`transition-transform ${
                    draggingNode === 'decay' ? 'scale-150' : 'group-hover:scale-125'
                  }`}
                />
                <text
                  x="12"
                  y="-12"
                  fill="#fb923c"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  className="pointer-events-none drop-shadow"
                >
                  {t.graphDecay}: {(params.decayTime * 1000).toFixed(0)}ms
                </text>
              </g>
            </>
          )}

          {/* Real-time Playback Sweep Cursor */}
          {sweepProgress > 0 && (
            <line
              x1={padX + plotW * sweepProgress}
              y1={padY}
              x2={padX + plotW * sweepProgress}
              y2={padY + plotH}
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="3 3"
              filter="url(#waveGlow)"
            />
          )}
        </svg>

        {/* Scanlines Effect */}
        <div className="pointer-events-none absolute inset-0 scanlines opacity-40" />
      </div>

      {/* Tactile Control Buttons & Quick Shape Presets */}
      <div className="space-y-2 pt-1">
        {/* Row 1: Direct Stepper Buttons for Guaranteed Easy Adjustment */}
        {activeTab === 'pitch' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Start Freq Steppers */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#0c091d] border border-[#2b2254]">
              <span className="font-silkscreen text-[11px] text-cyan-300 font-bold">
                {t.graphStart}: {params.startFreq}Hz
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => nudgeFreq('start', -50)}
                  className="p-1 rounded-lg bg-[#181335] hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-400/40 cursor-pointer"
                  title="-50Hz"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => nudgeFreq('start', 50)}
                  className="p-1 rounded-lg bg-[#181335] hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-400/40 cursor-pointer"
                  title="+50Hz"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* End Freq Steppers */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#0c091d] border border-[#2b2254]">
              <span className="font-silkscreen text-[11px] text-rose-300 font-bold">
                {t.graphEnd}: {params.endFreq}Hz
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => nudgeFreq('end', -50)}
                  className="p-1 rounded-lg bg-[#181335] hover:bg-rose-500/20 text-rose-300 hover:text-white border border-rose-400/40 cursor-pointer"
                  title="-50Hz"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => nudgeFreq('end', 50)}
                  className="p-1 rounded-lg bg-[#181335] hover:bg-rose-500/20 text-rose-300 hover:text-white border border-rose-400/40 cursor-pointer"
                  title="+50Hz"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Slide Time Steppers */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#0c091d] border border-[#2b2254]">
              <span className="font-silkscreen text-[11px] text-amber-300 font-bold">
                {t.graphSlide}: {params.pitchSlideTime.toFixed(2)}s
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => nudgeSlideTime(-0.05)}
                  className="p-1 rounded-lg bg-[#181335] hover:bg-amber-500/20 text-amber-300 hover:text-white border border-amber-400/40 cursor-pointer"
                  title="-0.05s"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => nudgeSlideTime(0.05)}
                  className="p-1 rounded-lg bg-[#181335] hover:bg-amber-500/20 text-amber-300 hover:text-white border border-amber-400/40 cursor-pointer"
                  title="+0.05s"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#0c091d] border border-[#2b2254]">
              <span className="font-silkscreen text-[11px] text-emerald-300 font-bold">
                {t.graphAttack}: {(params.attackTime * 1000).toFixed(0)}ms
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    onChange(
                      { ...params, attackTime: Math.max(0.003, params.attackTime - 0.02) },
                      true
                    )
                  }
                  className="p-1 rounded-lg bg-[#181335] hover:bg-emerald-500/20 text-emerald-300 hover:text-white border border-emerald-400/40 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onChange(
                      { ...params, attackTime: Math.min(0.5, params.attackTime + 0.02) },
                      true
                    )
                  }
                  className="p-1 rounded-lg bg-[#181335] hover:bg-emerald-500/20 text-emerald-300 hover:text-white border border-emerald-400/40 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-[#0c091d] border border-[#2b2254]">
              <span className="font-silkscreen text-[11px] text-purple-300 font-bold">
                {t.graphSustain}: {(params.sustainTime * 1000).toFixed(0)}ms
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    onChange(
                      { ...params, sustainTime: Math.max(0.02, params.sustainTime - 0.04) },
                      true
                    )
                  }
                  className="p-1 rounded-lg bg-[#181335] hover:bg-purple-500/20 text-purple-300 hover:text-white border border-purple-400/40 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onChange(
                      { ...params, sustainTime: Math.min(0.8, params.sustainTime + 0.04) },
                      true
                    )
                  }
                  className="p-1 rounded-lg bg-[#181335] hover:bg-purple-500/20 text-purple-300 hover:text-white border border-purple-400/40 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-[#0c091d] border border-[#2b2254]">
              <span className="font-silkscreen text-[11px] text-orange-300 font-bold">
                {t.graphDecay}: {(params.decayTime * 1000).toFixed(0)}ms
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    onChange(
                      { ...params, decayTime: Math.max(0.08, params.decayTime - 0.05) },
                      true
                    )
                  }
                  className="p-1 rounded-lg bg-[#181335] hover:bg-orange-500/20 text-orange-300 hover:text-white border border-orange-400/40 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onChange(
                      { ...params, decayTime: Math.min(1.5, params.decayTime + 0.05) },
                      true
                    )
                  }
                  className="p-1 rounded-lg bg-[#181335] hover:bg-orange-500/20 text-orange-300 hover:text-white border border-orange-400/40 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Row 2: One-click Shape Presets */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <span className="font-silkscreen text-[11px] text-purple-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{t.graphShapePresets}</span>
            </span>

            {activeTab === 'pitch' ? (
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => applyCurvePreset('jump')}
                  className="pixel-toy-btn px-2.5 py-1 rounded-xl bg-[#0c091d] border border-cyan-400/50 text-cyan-300 hover:text-white font-silkscreen text-[10px] cursor-pointer"
                >
                  {t.presetShapeJump}
                </button>
                <button
                  type="button"
                  onClick={() => applyCurvePreset('laser')}
                  className="pixel-toy-btn px-2.5 py-1 rounded-xl bg-[#0c091d] border border-rose-400/50 text-rose-300 hover:text-white font-silkscreen text-[10px] cursor-pointer"
                >
                  {t.presetShapeLaser}
                </button>
                <button
                  type="button"
                  onClick={() => applyCurvePreset('drop')}
                  className="pixel-toy-btn px-2.5 py-1 rounded-xl bg-[#0c091d] border border-amber-400/50 text-amber-300 hover:text-white font-silkscreen text-[10px] cursor-pointer"
                >
                  {t.presetShapeDrop}
                </button>
                <button
                  type="button"
                  onClick={() => applyCurvePreset('vibrato')}
                  className="pixel-toy-btn px-2.5 py-1 rounded-xl bg-[#0c091d] border border-purple-400/50 text-purple-300 hover:text-white font-silkscreen text-[10px] cursor-pointer"
                >
                  {t.presetShapeShimmer}
                </button>
                <button
                  type="button"
                  onClick={() => applyCurvePreset('flat')}
                  className="pixel-toy-btn px-2.5 py-1 rounded-xl bg-[#0c091d] border border-slate-600 text-slate-300 hover:text-white font-silkscreen text-[10px] cursor-pointer"
                >
                  {t.presetShapeFlat}
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => applyEnvelopePreset('punch')}
                  className="pixel-toy-btn px-2.5 py-1 rounded-xl bg-[#0c091d] border border-emerald-400/50 text-emerald-300 hover:text-white font-silkscreen text-[10px] cursor-pointer"
                >
                  {t.presetShapePunch}
                </button>
                <button
                  type="button"
                  onClick={() => applyEnvelopePreset('bell')}
                  className="pixel-toy-btn px-2.5 py-1 rounded-xl bg-[#0c091d] border border-pink-400/50 text-pink-300 hover:text-white font-silkscreen text-[10px] cursor-pointer"
                >
                  {t.presetShapeBell}
                </button>
                <button
                  type="button"
                  onClick={() => applyEnvelopePreset('swell')}
                  className="pixel-toy-btn px-2.5 py-1 rounded-xl bg-[#0c091d] border border-purple-400/50 text-purple-300 hover:text-white font-silkscreen text-[10px] cursor-pointer"
                >
                  {t.presetShapeSwell}
                </button>
                <button
                  type="button"
                  onClick={() => applyEnvelopePreset('staccato')}
                  className="pixel-toy-btn px-2.5 py-1 rounded-xl bg-[#0c091d] border border-orange-400/50 text-orange-300 hover:text-white font-silkscreen text-[10px] cursor-pointer"
                >
                  {t.presetShapeStaccato}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
