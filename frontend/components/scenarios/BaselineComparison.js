"use client";

import { ActivityIcon, ShieldIcon, CheckCircleIcon, AlertTriangleIcon } from "@/components/ui/Icons";

export default function BaselineComparison({ simulationResult }) {
  const { 
    baselineResilience, 
    scenarioResilience, 
    scoreDelta, 
    supplyRiskDelta, 
    reserveImpact,
    priceImpact 
  } = simulationResult;

  const comparisonRows = [
    {
      factor: "Overall Energy Resilience",
      baseline: `${baselineResilience.resilienceScore} / 100`,
      scenario: `${scenarioResilience.resilienceScore} / 100`,
      change: `${scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta} pts`,
      status: scoreDelta < -15 ? "Severe Drop" : scoreDelta < 0 ? "Degraded" : "Stable",
      isDeterioration: scoreDelta < 0
    },
    {
      factor: "Supply Risk Penalty",
      baseline: `${baselineResilience.supplyRiskIndex}%`,
      scenario: `${scenarioResilience.supplyRiskIndex}%`,
      change: `+${supplyRiskDelta.toFixed(1)}%`,
      status: "Increased Exposure",
      isDeterioration: true
    },
    {
      factor: "Geopolitical Risk Index",
      baseline: `${baselineResilience.factors.geopolitical} / 100`,
      scenario: `${scenarioResilience.factors.geopolitical} / 100`,
      change: `+${scenarioResilience.factors.geopolitical - baselineResilience.factors.geopolitical}`,
      status: "Escalated",
      isDeterioration: true
    },
    {
      factor: "Maritime / Logistics Risk",
      baseline: `${baselineResilience.factors.logistics} / 100`,
      scenario: `${scenarioResilience.factors.logistics} / 100`,
      change: `+${scenarioResilience.factors.logistics - baselineResilience.factors.logistics}`,
      status: "Chokepoint Strained",
      isDeterioration: true
    },
    {
      factor: "Supplier Concentration",
      baseline: `${baselineResilience.factors.concentration} / 100`,
      scenario: `${scenarioResilience.factors.concentration} / 100`,
      change: `+${scenarioResilience.factors.concentration - baselineResilience.factors.concentration}`,
      status: "Sovereign Squeeze",
      isDeterioration: true
    },
    {
      factor: "Brent Crude Benchmark",
      baseline: `$${priceImpact.baselineBrentUsd}/bbl`,
      scenario: `$${priceImpact.scenarioBrentUsd}/bbl`,
      change: `+$${priceImpact.priceDeltaUsd} (+${priceImpact.priceShockPct}%)`,
      status: "Price Shock",
      isDeterioration: true
    },
    {
      factor: "Strategic Reserve (SPR) Cover",
      baseline: `${reserveImpact.baselineSprDaysCover} Days`,
      scenario: `${reserveImpact.scenarioSprDaysCover} Days`,
      change: `-${(reserveImpact.baselineSprDaysCover - reserveImpact.scenarioSprDaysCover).toFixed(1)} Days`,
      status: `${reserveImpact.sprPressureLevel} Pressure`,
      isDeterioration: true
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
              Baseline vs. Disruption Scenario Resilience Matrix
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              DELTA AUDIT
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Comparative variance across core vulnerability factors comparing steady-state baseline to simulated disruption.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          DELTA: <span className="text-rose-400 font-bold">{scoreDelta} PTS</span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead className="bg-slate-900/90 text-[10px] uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Resilience / Risk Metric</th>
              <th className="py-2.5 px-3 text-center">Baseline State</th>
              <th className="py-2.5 px-3 text-center">Scenario State</th>
              <th className="py-2.5 px-3 text-center">Variance (Delta)</th>
              <th className="py-2.5 px-3 text-right">System Assessment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-[#070b12]">
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-100">
                  {row.factor}
                </td>
                <td className="py-2.5 px-3 text-center text-slate-300">
                  {row.baseline}
                </td>
                <td className="py-2.5 px-3 text-center font-bold text-white">
                  {row.scenario}
                </td>
                <td className={`py-2.5 px-3 text-center font-bold ${
                  row.isDeterioration ? "text-rose-400" : "text-emerald-400"
                }`}>
                  {row.change}
                </td>
                <td className="py-2.5 px-3 text-right">
                  <span className={`text-[9px] px-2 py-0.5 rounded border font-mono ${
                    row.status.includes("Severe") || row.status.includes("CRITICAL")
                      ? "bg-rose-950 text-rose-400 border-rose-800"
                      : "bg-amber-950 text-amber-400 border-amber-800"
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
