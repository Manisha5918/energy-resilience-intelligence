"use client";

import { NavigationIcon, AnchorIcon } from "@/components/ui/Icons";

export default function CorridorSignalPanel({ corridorSignals }) {
  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <NavigationIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Corridor Risk Signal Mapping
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              MARITIME TELEMETRY
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time correlation mapping incoming intelligence events to maritime transit chokepoints.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 self-start sm:self-auto font-semibold">
          4 CORRIDORS MONITORED
        </div>
      </div>

      {/* Grid of Corridors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {corridorSignals.map((corridor) => {
          const isCritical = corridor.highestSeverity === "CRITICAL" || corridor.adjustedRisk >= 80;
          const isHigh = corridor.highestSeverity === "HIGH" || corridor.adjustedRisk >= 65;

          return (
            <div
              key={corridor.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">{corridor.origin}</span>
                  <h4 className="text-sm font-bold font-heading text-slate-900 mt-0.5">{corridor.name}</h4>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border shrink-0 font-bold ${
                  isCritical
                    ? "bg-rose-50 text-rose-800 border-rose-200"
                    : isHigh
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}>
                  RISK: {corridor.adjustedRisk} / 100
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block">Signals</span>
                  <span className="text-slate-900 font-bold">{corridor.signalCount} Events</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Ingested</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block">Delta</span>
                  <span className={`font-bold ${corridor.riskChange > 0 ? "text-rose-700" : "text-slate-600"}`}>
                    {corridor.riskChange > 0 ? `+${corridor.riskChange}` : "0"} pts
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Base: {corridor.baselineRisk}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block">Confidence</span>
                  <span className="text-emerald-700 font-bold">{corridor.confidencePct}%</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Verified</span>
                </div>
              </div>

              {corridor.activeEvents.length > 0 && (
                <div className="text-xs font-sans text-slate-600 pt-2 border-t border-slate-200 truncate">
                  <span className="font-mono font-semibold text-slate-800">Latest: </span>
                  <span>{corridor.activeEvents[0].title}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
