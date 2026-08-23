"use client";

import { NavigationIcon, AnchorIcon, AlertTriangleIcon } from "@/components/ui/Icons";

export default function ScenarioCorridorImpact({ corridorImpacts }) {
  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 space-y-5 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <NavigationIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Maritime Corridor Stress & Vulnerability
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              CHOKEPOINT TELEMETRY
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Scenario impact on tanker transit latencies, freight surcharges, and corridor throughput.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500 font-semibold">
          4 CORRIDORS ANALYZED
        </div>
      </div>

      {/* Corridor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {corridorImpacts.map((corridor) => {
          const isCritical = corridor.scenarioRiskLevel === "CRITICAL";
          const isHigh = corridor.scenarioRiskLevel === "HIGH";

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

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border shrink-0 ${
                  isCritical
                    ? "bg-rose-50 text-rose-800 border-rose-200"
                    : isHigh
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}>
                  RISK: {corridor.scenarioRisk} / 100 ({corridor.scenarioRiskLevel})
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Throughput</span>
                  <span className="text-slate-900 font-bold text-sm block mt-0.5">{corridor.volumeMbd} MBD</span>
                  <span className="text-[10px] text-rose-700 font-semibold block">
                    {corridor.throughputImpactMbd > 0 ? `-${corridor.throughputImpactMbd} MBD` : "Normal"}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Transit Delay</span>
                  <span className="text-slate-900 font-bold text-sm block mt-0.5">+{corridor.extraTransitDays} Days</span>
                  <span className="text-[10px] text-slate-500 block">Latency</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Freight Cost</span>
                  <span className="text-sky-800 font-bold text-sm block mt-0.5">{corridor.scenarioFreightMultiplier}x</span>
                  <span className="text-[10px] text-slate-500 block">Multiplier</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs flex items-center justify-between shadow-xs">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Availability Status:</span>
                <span className="text-xs font-mono text-sky-800 font-bold">{corridor.availabilityStatus}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
