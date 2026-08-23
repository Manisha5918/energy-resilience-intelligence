"use client";

import Link from "next/link";
import { ShieldIcon, NavigationIcon, CheckCircleIcon, ZapIcon } from "@/components/ui/Icons";

export default function RecommendedResponse({ topResponse, scenarioId, metrics }) {
  if (!topResponse) return null;

  return (
    <div className="rounded-2xl p-6 border border-[#D5E5F1] bg-[#F8FBFE] shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D5E5F1] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-sky-100 border border-sky-300 text-sky-800">
              PHASE 4 ADAPTIVE PROCUREMENT RESPONSE
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${topResponse.riskBadgeClass}`}>
              {topResponse.riskLevel}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold font-heading text-[#10233F] mt-1">
            {topResponse.name}
          </h3>
        </div>

        <Link
          href={`/procurement?scenario=${scenarioId}`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-mono text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <ZapIcon className="w-4 h-4" />
          <span>Launch Full Procurement Orchestrator →</span>
        </Link>
      </div>

      {/* Tri-Vector Response Layout: Crisp Light Blue-White Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs font-mono">
        
        {/* 1. Threat & Deficit Context */}
        <div className="p-3.5 rounded-xl bg-[#F4F9FD] border border-[#D5E5F1] space-y-1.5 shadow-2xs hover:bg-[#EEF7FD] transition-colors">
          <span className="text-[10px] text-[#7189A1] uppercase block font-bold">1. Active Supply Threat</span>
          <div className="text-base font-bold text-rose-600">
            {metrics.supplyAtRiskMbd} MBD Shortfall
          </div>
          <p className="text-[11px] text-[#526B84] font-sans leading-snug">
            Identified at primary chokepoints. Requires immediate replacement sourcing.
          </p>
        </div>

        {/* 2. Sourcing & Route Solution */}
        <div className="p-3.5 rounded-xl bg-[#F4F9FD] border border-[#D5E5F1] space-y-1.5 shadow-2xs hover:bg-[#EEF7FD] transition-colors">
          <span className="text-[10px] text-[#7189A1] uppercase block font-bold">2. Recommended Bypass Flow</span>
          <div className="text-base font-bold text-sky-600">
            {topResponse.totalAllocatedMbd} MBD Reallocated
          </div>
          <p className="text-[11px] text-[#526B84] font-sans leading-snug">
            Via UAE Fujairah deepwater terminal, Saudi Yanbu pipeline, and Atlantic routes.
          </p>
        </div>

        {/* 3. Financial & SPR Buffer Impact */}
        <div className="p-3.5 rounded-xl bg-[#F4F9FD] border border-[#D5E5F1] space-y-1.5 shadow-2xs hover:bg-[#EEF7FD] transition-colors">
          <span className="text-[10px] text-[#7189A1] uppercase block font-bold">3. Financial & Buffer Cost</span>
          <div className="text-base font-bold text-amber-700">
            ${topResponse.weightedLandedCostUsd} / bbl
          </div>
          <p className="text-[11px] text-[#526B84] font-sans leading-snug">
            {topResponse.sprDrawRecommendedMbd > 0 
              ? `Requires ${topResponse.sprDrawRecommendedMbd} MBD SPR cavern support.` 
              : "100% market cover; zero SPR cavern drawdown needed."}
          </p>
        </div>

      </div>

    </div>
  );
}
