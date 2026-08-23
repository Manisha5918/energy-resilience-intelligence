"use client";

import { GlobeIcon, ShieldIcon, CheckCircleIcon } from "@/components/ui/Icons";

export default function DiversificationAnalysis({ strategy, baselineMetrics }) {
  return (
    <div className="rounded-2xl p-6 border border-[#C7E3F7] bg-white shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D5E5F1] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-4 h-4 text-[#0284c7]" />
            <h3 className="text-sm font-bold text-[#16324F] font-heading tracking-wide">
              Concentration &amp; Diversification Impact Analysis
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] font-bold">
              HHI AUDIT
            </span>
          </div>
          <p className="text-xs text-[#58708A] mt-0.5 font-sans">
            Measures structural reduction in sovereign supplier dependence and single-point maritime chokepoint exposure.
          </p>
        </div>

        <div className={`text-[10px] font-mono font-bold ${strategy.hhiImprovement >= 0 ? "text-emerald-700" : "text-amber-700"}`}>
          {strategy.hhiImprovement >= 0 
            ? `HHI REDUCTION: -${strategy.hhiImprovement} PTS` 
            : `HHI SHIFT: +${Math.abs(strategy.hhiImprovement)} PTS`}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        
        {/* HHI Score */}
        <div className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] space-y-1 shadow-2xs">
          <span className="text-[10px] text-[#58708A] uppercase font-bold block">Herfindahl-Hirschman Index</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#58708A] line-through">
              {baselineMetrics?.baselineHhi || strategy.baselineHhi || 2063}
            </span>
            <span className={`text-2xl font-bold ${strategy.hhiImprovement >= 0 ? "text-emerald-700" : "text-[#0284c7]"}`}>
              {strategy.strategyHhi}
            </span>
          </div>
          <p className="text-[10px] text-[#58708A] font-sans mt-1">
            {strategy.hhiImprovement >= 0 
              ? "Rebalances market power below high concentration thresholds." 
              : "Concentrated allocation across 5 secure bypass partners."}
          </p>
        </div>

        {/* Hormuz Chokepoint Exposure */}
        <div className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] space-y-1 shadow-2xs">
          <span className="text-[10px] text-[#58708A] uppercase font-bold block">Hormuz Volume Share</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#58708A] line-through">58.4%</span>
            <span className="text-2xl font-bold text-[#FF3D6E]">{strategy.hormuzSharePct.toFixed(1)}%</span>
          </div>
          <p className="text-[10px] text-[#58708A] font-sans mt-1">
            Reallocated to Habshan-Fujairah pipeline &amp; Atlantic routes.
          </p>
        </div>

        {/* Alternative Route Usage */}
        <div className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] space-y-1 shadow-2xs">
          <span className="text-[10px] text-[#58708A] uppercase font-bold block">Open Ocean Bypass Usage</span>
          <div className="text-2xl font-bold text-[#D97706]">
            {strategy.capeSharePct + strategy.fujairahSharePct}%
          </div>
          <p className="text-[10px] text-[#58708A] font-sans mt-1">
            Cape of Good Hope &amp; UAE direct deepwater terminal lifts.
          </p>
        </div>

      </div>

      <div className="p-4 rounded-xl bg-[#EFF8FF] border border-[#B9DDF5] text-xs text-[#16324F] font-sans leading-relaxed shadow-2xs">
        <span className="font-mono text-[10px] uppercase font-bold text-[#0B2540] block mb-1">
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
