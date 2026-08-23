"use client";

import { ShieldIcon, CheckCircleIcon, ActivityIcon, ZapIcon, InfoIcon } from "@/components/ui/Icons";

export default function TopProcurementRecommendation({ strategy }) {
  if (!strategy) return null;

  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800">
              OPTIMAL RANK #1 RECOMMENDATION
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${strategy.riskBadgeClass}`}>
              {strategy.riskLevel}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mt-1.5">
            {strategy.name}
          </h2>
          <p className="text-xs text-slate-600 font-sans mt-0.5">
            {strategy.tagline}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-sky-50/80 p-3 rounded-xl border border-sky-200 shrink-0">
          <div className="text-right font-mono">
            <span className="text-[9px] uppercase text-slate-500 font-semibold block">Heuristic Strategy Score</span>
            <div className="text-2xl font-bold text-sky-700">
              {strategy.strategyScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-sky-100 border border-sky-300 text-sky-700">
            <ShieldIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* KPI Core Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Supply Replacement</span>
          <div className="text-lg font-bold text-emerald-700 mt-0.5">
            {strategy.totalAllocatedMbd} <span className="text-xs text-slate-500 font-normal">MBD</span>
          </div>
          <span className="text-[9px] text-slate-500">{strategy.fulfillmentPct}% of required deficit</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Weighted Landed Cost</span>
          <div className="text-lg font-bold text-amber-700 mt-0.5">
            ${strategy.weightedLandedCostUsd} <span className="text-xs text-slate-500 font-normal">/ bbl</span>
          </div>
          <span className="text-[9px] text-slate-500">Freight & war-risk inclusive</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Average Voyage Transit</span>
          <div className="text-lg font-bold text-slate-900 mt-0.5">
            {strategy.weightedTransitDays} <span className="text-xs text-slate-500 font-normal">Days</span>
          </div>
          <span className="text-[9px] text-slate-500">Weighted delivery lead time</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Concentration (HHI)</span>
          <div className="text-lg font-bold text-sky-800 mt-0.5">
            {strategy.strategyHhi}{" "}
            <span className={`text-xs font-semibold ${strategy.hhiImprovement >= 0 ? "text-emerald-700" : "text-amber-700"}`}>
              ({strategy.hhiImprovement >= 0 ? `-${strategy.hhiImprovement}` : `+${Math.abs(strategy.hhiImprovement)}`})
            </span>
          </div>
          <span className="text-[9px] text-slate-500">Baseline HHI: {strategy.baselineHhi || 2063}</span>
        </div>
      </div>

      {/* Structured "WHY THIS STRATEGY?" Rationale Section */}
      <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-2.5">
        <div className="flex items-center gap-2 text-sky-900 font-mono text-xs font-bold uppercase">
          <InfoIcon className="w-4 h-4 text-sky-700" />
          <span>Why Did Strategy #1 Rank First? (Decision Rationale)</span>
        </div>

        <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
          {strategy.rationaleBullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-relaxed">
              <CheckCircleIcon className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
