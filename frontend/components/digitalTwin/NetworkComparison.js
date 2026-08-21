"use client";

import { ActivityIcon, ShieldIcon } from "@/components/ui/Icons";

export default function NetworkComparison({
  isBaseline,
  baselineScore,
  networkResilienceIndicator,
  metrics,
  scenarioResult
}) {
  const compRows = [
    {
      metric: "Network Resilience Indicator",
      baseline: `${baselineScore} / 100`,
      disrupted: `${networkResilienceIndicator} / 100`,
      delta: `${networkResilienceIndicator - baselineScore} pts`,
      isNegative: networkResilienceIndicator < baselineScore
    },
    {
      metric: "Daily National Crude Supply Flow",
      baseline: "4.67 MBD",
      disrupted: `${isBaseline ? "4.67" : (4.67 - metrics.supplyAtRiskMbd).toFixed(2)} MBD`,
      delta: isBaseline ? "0.0 MBD" : `-${metrics.supplyAtRiskMbd} MBD`,
      isNegative: !isBaseline && metrics.supplyAtRiskMbd > 0
    },
    {
      metric: "Strait of Hormuz Risk Index",
      baseline: "64 / 100",
      disrupted: isBaseline ? "64 / 100" : "94 / 100",
      delta: isBaseline ? "0 pts" : "+30 pts",
      isNegative: !isBaseline
    },
    {
      metric: "Refineries Under Feedstock Pressure",
      baseline: "0 of 6",
      disrupted: `${metrics.refineriesUnderPressureCount} of 6`,
      delta: isBaseline ? "0" : `+${metrics.refineriesUnderPressureCount}`,
      isNegative: metrics.refineriesUnderPressureCount > 0
    },
    {
      metric: "Strategic Petroleum Reserve (SPR) Cover",
      baseline: "9.5 Days",
      disrupted: `${metrics.sprCoverDays} Days`,
      delta: isBaseline ? "0.0 d" : `-${(9.5 - metrics.sprCoverDays).toFixed(1)} d`,
      isNegative: metrics.sprCoverDays < 9.5
    }
  ];

  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Baseline vs. Disrupted Network Telemetry
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              STATE AUDIT
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluates system-wide degradation when primary arterial corridors and sovereign suppliers are impaired.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          STATUS: <b className="text-cyan-400">{isBaseline ? "STEADY-STATE" : "ACTIVE SHOCK"}</b>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead className="bg-slate-900/90 text-[10px] uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Network Key Metric</th>
              <th className="py-2.5 px-2 text-center">Baseline State</th>
              <th className="py-2.5 px-2 text-center">Disrupted State</th>
              <th className="py-2.5 px-3 text-right">Net Impact (Delta)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-[#070b12]">
            {compRows.map((r, idx) => (
              <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-100">{r.metric}</td>
                <td className="py-2.5 px-2 text-center text-slate-400">{r.baseline}</td>
                <td className="py-2.5 px-2 text-center font-bold text-white">{r.disrupted}</td>
                <td className={`py-2.5 px-3 text-right font-bold ${
                  r.isNegative ? "text-rose-400" : "text-emerald-400"
                }`}>
                  {r.delta}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
