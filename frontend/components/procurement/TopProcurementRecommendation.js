"use client";

import { ShieldIcon, CheckCircleIcon, ActivityIcon, ZapIcon, InfoIcon } from "@/components/ui/Icons";

export default function TopProcurementRecommendation({ strategy }) {
  if (!strategy) return null;

  return (
    <div className="command-card rounded-2xl p-6 border border-cyan-500/40 bg-gradient-to-br from-[#0e172a] via-[#09101d] to-[#070b14] shadow-xl space-y-5">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500 text-cyan-300">
              OPTIMAL RANK #1 RECOMMENDATION
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${strategy.riskBadgeClass}`}>
              {strategy.riskLevel}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-mono text-white mt-1.5">
            {strategy.name}
          </h2>
          <p className="text-xs text-slate-300 font-sans mt-0.5">
            {strategy.tagline}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800 shrink-0">
          <div className="text-right font-mono">
            <span className="text-[9px] uppercase text-slate-400 block">Heuristic Strategy Score</span>
            <div className="text-2xl font-bold text-cyan-400">
              {strategy.strategyScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-700/60 text-cyan-400">
            <ShieldIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* KPI Core Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Supply Replacement</span>
          <div className="text-lg font-bold text-emerald-400 mt-0.5">
            {strategy.totalAllocatedMbd} <span className="text-xs text-slate-400 font-normal">MBD</span>
          </div>
          <span className="text-[9px] text-slate-500">{strategy.fulfillmentPct}% of required deficit</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Weighted Landed Cost</span>
          <div className="text-lg font-bold text-amber-300 mt-0.5">
            ${strategy.weightedLandedCostUsd} <span className="text-xs text-slate-400 font-normal">/ bbl</span>
          </div>
          <span className="text-[9px] text-slate-500">Freight & war-risk inclusive</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Average Voyage Transit</span>
          <div className="text-lg font-bold text-slate-200 mt-0.5">
            {strategy.weightedTransitDays} <span className="text-xs text-slate-400 font-normal">Days</span>
          </div>
          <span className="text-[9px] text-slate-500">Weighted delivery lead time</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Concentration (HHI)</span>
          <div className="text-lg font-bold text-cyan-300 mt-0.5">
            {strategy.strategyHhi} <span className="text-xs text-emerald-400 font-normal">(-{strategy.hhiImprovement})</span>
          </div>
          <span className="text-[9px] text-slate-500">Baseline HHI: 2,140</span>
        </div>
      </div>

      {/* Structured "WHY THIS STRATEGY?" Rationale Section */}
      <div className="p-4 rounded-xl bg-[#070e1a] border border-cyan-800/50 space-y-2.5">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
          <InfoIcon className="w-4 h-4" />
          <span>Why Did Strategy #1 Rank First? (Decision Rationale)</span>
        </div>

        <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
          {strategy.rationaleBullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-relaxed">
              <CheckCircleIcon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
