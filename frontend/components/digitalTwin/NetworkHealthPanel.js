"use client";

import { ShieldIcon, AlertTriangleIcon, ActivityIcon, DatabaseIcon } from "@/components/ui/Icons";

export default function NetworkHealthPanel({
  networkResilienceIndicator,
  baselineScore,
  metrics,
  isBaseline
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      
      {/* 1. Network Resilience Indicator */}
      <div className="rounded-xl p-4 border border-[#D5E5F1] bg-[#F8FBFE] shadow-2xs hover:bg-[#EEF7FD] transition-colors flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-[#7189A1] font-semibold flex items-center gap-1.5">
            <ShieldIcon className="w-3.5 h-3.5 text-sky-600" />
            Network Resilience
          </span>
          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border font-bold ${
            networkResilienceIndicator >= 65
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}>
            {networkResilienceIndicator >= 65 ? "SECURED" : "IMPAIRED"}
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className={`text-3xl font-bold font-mono ${networkResilienceIndicator < 60 ? "text-rose-600" : "text-[#10233F]"}`}>
            {networkResilienceIndicator}
          </span>
          <span className="text-xs text-[#7189A1] font-mono">/ 100</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-[#526B84]">
          Baseline Score: {baselineScore} / 100
        </div>
      </div>

      {/* 2. Supply Flow At Risk */}
      <div className="rounded-xl p-4 border border-[#D5E5F1] bg-[#F8FBFE] shadow-2xs hover:bg-[#EEF7FD] transition-colors flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-[#7189A1] font-semibold flex items-center gap-1.5">
            <AlertTriangleIcon className="w-3.5 h-3.5 text-rose-600" />
            Supply at Risk
          </span>
          <span className="text-[9px] font-mono text-rose-800 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 font-bold">
            DEFICIT
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-rose-600">{metrics.supplyAtRiskMbd}</span>
          <span className="text-xs text-[#7189A1] font-mono">MBD</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-[#526B84]">
          {isBaseline ? "Normal buffer variance" : "Active chokepoint shortfall"}
        </div>
      </div>

      {/* 3. Compromised Nodes & Chokepoints */}
      <div className="rounded-xl p-4 border border-[#D5E5F1] bg-[#F8FBFE] shadow-2xs hover:bg-[#EEF7FD] transition-colors flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-[#7189A1] font-semibold flex items-center gap-1.5">
            <ActivityIcon className="w-3.5 h-3.5 text-amber-600" />
            Critical Nodes
          </span>
          <span className="text-[9px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-bold">
            {metrics.criticalCorridorsCount} CORRIDORS
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-amber-700">{metrics.criticalNodesCount}</span>
          <span className="text-xs text-[#7189A1] font-mono">nodes impacted</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-[#526B84]">
          Chokepoints, suppliers &amp; ports
        </div>
      </div>

      {/* 4. Refineries Under Pressure */}
      <div className="rounded-xl p-4 border border-[#D5E5F1] bg-[#F8FBFE] shadow-2xs hover:bg-[#EEF7FD] transition-colors flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-[#7189A1] font-semibold flex items-center gap-1.5">
            <DatabaseIcon className="w-3.5 h-3.5 text-sky-600" />
            Refinery Exposure
          </span>
          <span className="text-[9px] font-mono text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200 font-bold">
            6 MONITORED
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-sky-700">{metrics.refineriesUnderPressureCount}</span>
          <span className="text-xs text-[#7189A1] font-mono">refineries strained</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-[#526B84]">
          Jamnagar, Vadinar, Panipat, Kochi
        </div>
      </div>

      {/* 5. Strategic Petroleum Reserve Cover */}
      <div className="rounded-xl p-4 border border-[#D5E5F1] bg-[#F8FBFE] shadow-2xs hover:bg-[#EEF7FD] transition-colors flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-[#7189A1] font-semibold flex items-center gap-1.5">
            <DatabaseIcon className="w-3.5 h-3.5 text-emerald-600" />
            SPR Emergency Cover
          </span>
          <span className="text-[9px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">
            {metrics.sprPressureLevel}
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-emerald-700">{metrics.sprCoverDays}</span>
          <span className="text-xs text-[#7189A1] font-mono">Days</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-[#526B84]">
          5.33 MMT tri-cavern buffer
        </div>
      </div>

    </div>
  );
}
