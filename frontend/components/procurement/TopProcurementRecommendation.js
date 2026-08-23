"use client";

import { ShieldIcon, CheckCircleIcon, ActivityIcon, ZapIcon, InfoIcon } from "@/components/ui/Icons";

export default function TopProcurementRecommendation({ strategy }) {
  if (!strategy) return null;

  return (
    <div className="rounded-2xl p-6 sm:p-8 border border-[#C7E3F7] bg-white shadow-xs space-y-5">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D5E5F1] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1]">
              OPTIMAL RANK #1 RECOMMENDATION
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${strategy.riskBadgeClass}`}>
              {strategy.riskLevel}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-heading text-[#16324F] mt-1.5">
            {strategy.name}
          </h2>
          <p className="text-xs text-[#58708A] font-sans mt-0.5">
            {strategy.tagline}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#F4F9FD] p-3.5 rounded-xl border border-[#C7E3F7] shrink-0 shadow-2xs">
          <div className="text-right font-mono">
            <span className="text-[9px] uppercase text-[#58708A] font-bold block">Heuristic Strategy Score</span>
            <div className="text-2xl font-bold text-[#0284c7]">
              {strategy.strategyScore} <span className="text-xs font-normal text-[#58708A]">/ 100</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#EFF8FF] border border-[#B9DDF5] text-[#0284c7]">
            <ShieldIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* KPI Core Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] shadow-2xs">
          <span className="text-[10px] text-[#58708A] uppercase font-bold block">Supply Replacement</span>
          <div className="text-lg font-bold text-[#00C98D] mt-0.5">
            {strategy.totalAllocatedMbd} <span className="text-xs text-[#58708A] font-normal">MBD</span>
          </div>
          <span className="text-[9px] text-[#58708A]">{strategy.fulfillmentPct}% of required deficit</span>
        </div>

        <div className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] shadow-2xs">
          <span className="text-[10px] text-[#58708A] uppercase font-bold block">Weighted Landed Cost</span>
          <div className="text-lg font-bold text-[#D97706] mt-0.5">
            ${strategy.weightedLandedCostUsd} <span className="text-xs text-[#58708A] font-normal">/ bbl</span>
          </div>
          <span className="text-[9px] text-[#58708A]">Freight &amp; war-risk inclusive</span>
        </div>

        <div className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] shadow-2xs">
          <span className="text-[10px] text-[#58708A] uppercase font-bold block">Average Voyage Transit</span>
          <div className="text-lg font-bold text-[#16324F] mt-0.5">
            {strategy.weightedTransitDays} <span className="text-xs text-[#58708A] font-normal">Days</span>
          </div>
          <span className="text-[9px] text-[#58708A]">Weighted delivery lead time</span>
        </div>

        <div className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] shadow-2xs">
          <span className="text-[10px] text-[#58708A] uppercase font-bold block">Concentration (HHI)</span>
          <div className="text-lg font-bold text-[#0284c7] mt-0.5">
            {strategy.strategyHhi}{" "}
            <span className={`text-xs font-bold ${strategy.hhiImprovement >= 0 ? "text-emerald-700" : "text-amber-700"}`}>
              ({strategy.hhiImprovement >= 0 ? `-${strategy.hhiImprovement}` : `+${Math.abs(strategy.hhiImprovement)}`})
            </span>
          </div>
          <span className="text-[9px] text-[#58708A]">Baseline HHI: {strategy.baselineHhi || 2063}</span>
        </div>
      </div>

      {/* Structured "WHY THIS STRATEGY?" Rationale Section */}
      <div className="p-4 rounded-xl bg-[#EFF8FF] border border-[#B9DDF5] space-y-2.5 shadow-2xs">
        <div className="flex items-center gap-2 text-[#0B2540] font-mono text-xs font-bold uppercase">
          <InfoIcon className="w-4 h-4 text-[#0284c7]" />
          <span>Why Did Strategy #1 Rank First? (Decision Rationale)</span>
        </div>

        <ul className="space-y-1.5 text-xs text-[#16324F] font-sans">
          {strategy.rationaleBullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-relaxed">
              <CheckCircleIcon className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
