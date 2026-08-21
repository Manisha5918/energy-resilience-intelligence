"use client";

import { ActivityIcon, InfoIcon } from "@/components/ui/Icons";

export default function RecoveryTrajectory({ recoveryTrajectory, baselineScore }) {
  // SVG coordinates calculation
  // ViewBox: 600 x 220
  const width = 600;
  const height = 200;
  const paddingX = 50;
  const paddingY = 30;

  const points = recoveryTrajectory.map((pt, idx) => {
    const x = paddingX + (idx / (recoveryTrajectory.length - 1)) * (width - 2 * paddingX);
    // Score 0-100 mapped to (height - paddingY) down to paddingY
    const y = (height - paddingY) - (pt.resilienceScore / 100) * (height - 2 * paddingY);
    return { ...pt, x, y };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, "");

  // Baseline reference horizontal line Y
  const baselineY = (height - paddingY) - (baselineScore / 100) * (height - 2 * paddingY);

  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Resilience Deterioration & Recovery Trajectory
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              TIME-SERIES SIMULATION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Model-projected progression from initial disruption shock to stabilization via alternative procurement & SPR injection.
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-0.5 bg-slate-500 inline-block border-b border-dashed border-slate-400"></span>
            <span>Baseline ({baselineScore})</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <span className="w-2.5 h-1 bg-cyan-400 inline-block rounded-full"></span>
            <span>Scenario Curve</span>
          </div>
        </div>
      </div>

      {/* SVG Time-Series Chart */}
      <div className="bg-[#070b14] rounded-xl border border-slate-800 p-3 relative overflow-hidden select-none">
        
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[260px]">
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[20, 40, 60, 80, 100].map((score) => {
            const y = (height - paddingY) - (score / 100) * (height - 2 * paddingY);
            return (
              <g key={score}>
                <line x1={paddingX - 10} y1={y} x2={width - paddingX + 10} y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />
                <text x={paddingX - 15} y={y + 3} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">{score}</text>
              </g>
            );
          })}

          {/* Baseline Reference Dashed Line */}
          <line
            x1={paddingX - 5}
            y1={baselineY}
            x2={width - paddingX + 5}
            y2={baselineY}
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="6,4"
            opacity="0.6"
          />

          {/* Fill under trajectory curve */}
          <path
            d={`${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`}
            fill="url(#curveGradient)"
          />

          {/* Trajectory Stroke Path */}
          <path
            d={pathD}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Data Points & Labels */}
          {points.map((pt, idx) => (
            <g key={idx}>
              <circle cx={pt.x} cy={pt.y} r="5" fill="#070b14" stroke="#06b6d4" strokeWidth="2.5" />
              <circle cx={pt.x} cy={pt.y} r="2" fill="#38bdf8" />
              
              {/* Score Value above node */}
              <text
                x={pt.x}
                y={pt.y - 10}
                fill={pt.resilienceScore < 50 ? "#f43f5e" : pt.resilienceScore < 70 ? "#f59e0b" : "#38bdf8"}
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="monospace"
              >
                {pt.resilienceScore}
              </text>

              {/* Day label below axis */}
              <text
                x={pt.x}
                y={height - 8}
                fill="#cbd5e1"
                fontSize="8.5"
                textAnchor="middle"
                fontFamily="monospace"
              >
                {pt.day.split(" ")[0]} {pt.day.split(" ")[1] || ""}
              </text>
            </g>
          ))}
        </svg>

      </div>

      {/* Trajectory Milestone Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1 text-xs font-mono">
        {recoveryTrajectory.map((step, idx) => (
          <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-[9px] text-cyan-400 font-bold uppercase block">{step.day}</span>
            <div className="text-xs font-bold text-slate-100">{step.label}</div>
            <div className="text-[10px] text-slate-400 flex justify-between pt-0.5">
              <span>Resilience: <b className="text-white">{step.resilienceScore}</b></span>
              {step.supplyGapMbd > 0 && <span className="text-rose-400">-{step.supplyGapMbd}MBD</span>}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
