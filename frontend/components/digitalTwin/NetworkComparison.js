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
      baseline: "4.83 MBD",
      disrupted: `${isBaseline ? "4.83" : (4.83 - metrics.supplyAtRiskMbd).toFixed(2)} MBD`,
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
      baseline: "8.1 Days",
      disrupted: `${metrics.sprCoverDays} Days`,
      delta: isBaseline ? "0.0 d" : `-${(8.1 - metrics.sprCoverDays).toFixed(1)} d`,
      isNegative: metrics.sprCoverDays < 8.1
    }
  ];

  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Baseline vs. Disrupted Network Telemetry
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              STATE AUDIT
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluates system-wide degradation when primary arterial corridors and sovereign suppliers are impaired.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 self-start sm:self-auto font-semibold">
          STATUS: <b className="text-sky-700">{isBaseline ? "STEADY-STATE" : "ACTIVE SHOCK"}</b>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-100 text-[10px] uppercase text-slate-600 border-b border-slate-200">
            <tr>
              <th className="py-3 px-3.5">Network Key Metric</th>
              <th className="py-3 px-2.5 text-center">Baseline State</th>
              <th className="py-3 px-2.5 text-center">Disrupted State</th>
              <th className="py-3 px-3.5 text-right">Net Impact (Delta)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {compRows.map((r, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3.5 font-semibold text-slate-900">{r.metric}</td>
                <td className="py-3 px-2.5 text-center text-slate-600 font-mono">{r.baseline}</td>
                <td className="py-3 px-2.5 text-center font-bold text-slate-900 font-mono">{r.disrupted}</td>
                <td className={`py-3 px-3.5 text-right font-bold font-mono ${
                  r.isNegative ? "text-rose-700" : "text-emerald-700"
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
