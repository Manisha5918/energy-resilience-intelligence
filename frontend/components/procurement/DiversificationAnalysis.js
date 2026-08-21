"use client";

import { GlobeIcon, ShieldIcon, CheckCircleIcon } from "@/components/ui/Icons";

export default function DiversificationAnalysis({ strategy, baselineMetrics }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Concentration & Diversification Impact Analysis
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              HHI AUDIT
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Measures structural reduction in sovereign supplier dependence and single-point maritime chokepoint exposure.
          </p>
        </div>

        <div className={`text-[10px] font-mono font-bold ${strategy.hhiImprovement >= 0 ? "text-emerald-400" : "text-amber-400"}`}>
          {strategy.hhiImprovement >= 0 
            ? `HHI REDUCTION: -${strategy.hhiImprovement} PTS` 
            : `HHI SHIFT: +${Math.abs(strategy.hhiImprovement)} PTS`}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        
        {/* HHI Score */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase block">Herfindahl-Hirschman Index</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-400 line-through">
              {baselineMetrics?.baselineHhi || strategy.baselineHhi || 2063}
            </span>
            <span className={`text-2xl font-bold ${strategy.hhiImprovement >= 0 ? "text-emerald-400" : "text-cyan-300"}`}>
              {strategy.strategyHhi}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans mt-1">
            {strategy.hhiImprovement >= 0 
              ? "Rebalances market power below high concentration thresholds." 
              : "Concentrated allocation across 5 secure bypass partners."}
          </p>
        </div>

        {/* Hormuz Chokepoint Exposure */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase block">Hormuz Volume Share</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-400 line-through">58.4%</span>
            <span className="text-2xl font-bold text-cyan-300">{strategy.hormuzSharePct.toFixed(1)}%</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans mt-1">
            Reallocated to Habshan-Fujairah pipeline & Atlantic routes.
          </p>
        </div>

        {/* Alternative Route Usage */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase block">Open Ocean Bypass Usage</span>
          <div className="text-2xl font-bold text-amber-300">
            {strategy.capeSharePct + strategy.fujairahSharePct}%
          </div>
          <p className="text-[10px] text-slate-400 font-sans mt-1">
            Cape of Good Hope & UAE direct deepwater terminal lifts.
          </p>
        </div>

      </div>

      <div className="p-3.5 rounded-lg bg-[#060a12] border border-cyan-900/40 text-xs text-slate-300 font-sans leading-relaxed">
        <span className="font-mono text-[10px] uppercase font-bold text-cyan-400 block mb-1">
          Diversification Rationale:
        </span>
        {strategy.hhiImprovement >= 0 ? (
          <>Lowering the Herfindahl-Hirschman Index from {baselineMetrics?.baselineHhi || strategy.baselineHhi || 2063} to {strategy.strategyHhi} ensures that an embargo or maritime closure by any single major producer cannot disrupt more than 30% of India&apos;s daily refining throughput.</>
        ) : (
          <>Concentrating replacement crude among 5 partner origins shifts the Herfindahl-Hirschman Index from {baselineMetrics?.baselineHhi || strategy.baselineHhi || 2063} to {strategy.strategyHhi} (+{Math.abs(strategy.hhiImprovement)} pts) in order to achieve 100% chokepoint bypass via the Habshan-Fujairah pipeline and Cape of Good Hope open ocean highways.</>
        )}
      </div>

    </div>
  );
}
