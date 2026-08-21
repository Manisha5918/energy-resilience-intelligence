"use client";

import { NavigationIcon, AnchorIcon } from "@/components/ui/Icons";

export default function CorridorSignalPanel({ corridorSignals }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <NavigationIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Corridor Risk Signal Mapping
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              MARITIME TELEMETRY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time correlation mapping incoming intelligence events to maritime transit chokepoints.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          4 CORRIDORS MONITORED
        </div>
      </div>

      {/* Grid of Corridors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {corridorSignals.map((corridor) => {
          const isCritical = corridor.highestSeverity === "CRITICAL" || corridor.adjustedRisk >= 80;
          const isHigh = corridor.highestSeverity === "HIGH" || corridor.adjustedRisk >= 65;

          return (
            <div
              key={corridor.id}
              className="p-3.5 rounded-xl bg-[#080d16] border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[9px] font-mono uppercase text-slate-500">{corridor.origin}</span>
                  <h4 className="text-xs font-bold font-mono text-slate-100 mt-0.5">{corridor.name}</h4>
                </div>

                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${
                  isCritical
                    ? "bg-rose-950 text-rose-400 border-rose-800 font-bold"
                    : isHigh
                    ? "bg-amber-950 text-amber-400 border-amber-800 font-bold"
                    : "bg-emerald-950 text-emerald-400 border-emerald-800"
                }`}>
                  RISK: {corridor.adjustedRisk} / 100
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Active Signals</span>
                  <span className="text-slate-200 font-bold">{corridor.signalCount} Events</span>
                  <span className="text-[9px] text-slate-500 block">Ingested</span>
                </div>

                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Risk Change</span>
                  <span className={`font-bold ${corridor.riskChange > 0 ? "text-rose-400" : "text-slate-400"}`}>
                    {corridor.riskChange > 0 ? `+${corridor.riskChange}` : "0"} pts
                  </span>
                  <span className="text-[9px] text-slate-500 block">Baseline: {corridor.baselineRisk}</span>
                </div>

                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Confidence</span>
                  <span className="text-emerald-400 font-bold">{corridor.confidencePct}%</span>
                  <span className="text-[9px] text-slate-500 block">Multi-source</span>
                </div>
              </div>

              {corridor.activeEvents.length > 0 && (
                <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/60 truncate">
                  Latest: <span className="text-slate-300">{corridor.activeEvents[0].title}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
