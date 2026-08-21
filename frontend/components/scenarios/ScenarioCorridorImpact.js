"use client";

import { NavigationIcon, AnchorIcon, AlertTriangleIcon } from "@/components/ui/Icons";

export default function ScenarioCorridorImpact({ corridorImpacts }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <NavigationIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Maritime Corridor Stress & Vulnerability
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              CHOKEPOINT TELEMETRY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Scenario impact on tanker transit latencies, freight surcharges, and corridor throughput.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          4 CORRIDORS ANALYZED
        </div>
      </div>

      {/* Corridor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {corridorImpacts.map((corridor) => {
          const isCritical = corridor.scenarioRiskLevel === "CRITICAL";
          const isHigh = corridor.scenarioRiskLevel === "HIGH";

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
                  RISK: {corridor.scenarioRisk} / 100 ({corridor.scenarioRiskLevel})
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Throughput</span>
                  <span className="text-slate-200 font-bold">{corridor.volumeMbd} MBD</span>
                  <span className="text-[9px] text-rose-400 block">
                    {corridor.throughputImpactMbd > 0 ? `-${corridor.throughputImpactMbd} MBD` : "Normal"}
                  </span>
                </div>

                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Transit Latency</span>
                  <span className="text-slate-200 font-bold">+{corridor.extraTransitDays} Days</span>
                  <span className="text-[9px] text-slate-500 block">Delay</span>
                </div>

                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Freight Cost</span>
                  <span className="text-cyan-400 font-bold">{corridor.scenarioFreightMultiplier}x</span>
                  <span className="text-[9px] text-slate-500 block">Index</span>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900/40 border border-slate-800/80 text-xs flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Availability Status:</span>
                <span className="text-[11px] font-mono text-cyan-300 font-semibold">{corridor.availabilityStatus}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
