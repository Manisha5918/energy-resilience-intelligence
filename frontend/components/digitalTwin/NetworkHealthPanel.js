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
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
            <ShieldIcon className="w-3.5 h-3.5 text-cyan-400" />
            Network Resilience
          </span>
          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
            networkResilienceIndicator >= 65
              ? "bg-emerald-950 text-emerald-300 border-emerald-800"
              : "bg-rose-950 text-rose-300 border-rose-800 font-bold"
          }`}>
            {networkResilienceIndicator >= 65 ? "SECURED" : "IMPAIRED"}
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className={`text-3xl font-bold font-mono ${networkResilienceIndicator < 60 ? "text-rose-400" : "text-white"}`}>
            {networkResilienceIndicator}
          </span>
          <span className="text-xs text-slate-400 font-mono">/ 100</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-slate-500">
          Baseline Score: {baselineScore} / 100
        </div>
      </div>

      {/* 2. Supply Flow At Risk */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
            <AlertTriangleIcon className="w-3.5 h-3.5 text-rose-400" />
            Supply at Risk
          </span>
          <span className="text-[9px] font-mono text-rose-400 bg-rose-950/80 px-1.5 py-0.5 rounded border border-rose-800">
            DEFICIT
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-rose-400">{metrics.supplyAtRiskMbd}</span>
          <span className="text-xs text-slate-400 font-mono">MBD</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-slate-500">
          {isBaseline ? "Normal buffer variance" : "Active chokepoint shortfall"}
        </div>
      </div>

      {/* 3. Compromised Nodes & Chokepoints */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
            <ActivityIcon className="w-3.5 h-3.5 text-amber-400" />
            Critical Nodes
          </span>
          <span className="text-[9px] font-mono text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800">
            {metrics.criticalCorridorsCount} CORRIDORS
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-amber-300">{metrics.criticalNodesCount}</span>
          <span className="text-xs text-slate-400 font-mono">nodes impacted</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-slate-500">
          Chokepoints, suppliers & ports
        </div>
      </div>

      {/* 4. Refineries Under Pressure */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
            <DatabaseIcon className="w-3.5 h-3.5 text-cyan-400" />
            Refinery Exposure
          </span>
          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800">
            6 MONITORED
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-cyan-300">{metrics.refineriesUnderPressureCount}</span>
          <span className="text-xs text-slate-400 font-mono">refineries strained</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-slate-500">
          Jamnagar, Vadinar, Panipat, Kochi
        </div>
      </div>

      {/* 5. Strategic Petroleum Reserve Cover */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
            <DatabaseIcon className="w-3.5 h-3.5 text-emerald-400" />
            SPR Emergency Cover
          </span>
          <span className="text-[9px] font-mono text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
            {metrics.sprPressureLevel}
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-emerald-400">{metrics.sprCoverDays}</span>
          <span className="text-xs text-slate-400 font-mono">Days</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-slate-500">
          5.33 MMT tri-cavern buffer
        </div>
      </div>

    </div>
  );
}
