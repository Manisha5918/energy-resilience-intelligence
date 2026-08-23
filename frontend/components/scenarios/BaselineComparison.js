"use client";

import { useState } from "react";
import { ActivityIcon, ShieldIcon, CheckCircleIcon, AlertTriangleIcon, ChevronDownIcon } from "@/components/ui/Icons";

export default function BaselineComparison({ simulationResult }) {
  const [isFullTableOpen, setIsFullTableOpen] = useState(false);

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
    <div className="command-card rounded-2xl p-6 border border-slate-200 space-y-5 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Scenario Stress Variance & Delta Summary
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              DELTA AUDIT
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Comparative variance across core vulnerability factors comparing steady-state baseline to simulated disruption.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500 font-semibold">
          COMPOSITE DELTA: <span className="text-rose-600 font-bold">{scoreDelta} PTS</span>
        </div>
      </div>

      {/* LEVEL 1: High-Impact 3-Pillar Delta Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Delta 1: Resilience */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 font-semibold">Resilience Score</span>
            <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {scoreDelta} pts
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">
              {baselineResilience.resilienceScore}
            </span>
            <span className="text-sm font-mono text-slate-400">➔</span>
            <span className="text-3xl font-bold font-mono text-rose-600">
              {scenarioResilience.resilienceScore}
            </span>
            <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <span className="text-[11px] text-slate-600 font-sans block">
            Severe security deterioration under selected stress.
          </span>
        </div>

        {/* Delta 2: Supply Risk Index */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 font-semibold">Supply Risk Penalty</span>
            <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              +{supplyRiskDelta.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">
              {baselineResilience.supplyRiskIndex}%
            </span>
            <span className="text-sm font-mono text-slate-400">➔</span>
            <span className="text-3xl font-bold font-mono text-rose-600">
              {scenarioResilience.supplyRiskIndex}%
            </span>
          </div>
          <span className="text-[11px] text-slate-600 font-sans block">
            National import vulnerability surge.
          </span>
        </div>

        {/* Delta 3: SPR Reserve Cover */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 font-semibold">Reserve Cover</span>
            <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              -{(reserveImpact.baselineSprDaysCover - reserveImpact.scenarioSprDaysCover).toFixed(1)}d
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">
              {reserveImpact.baselineSprDaysCover}d
            </span>
            <span className="text-sm font-mono text-slate-400">➔</span>
            <span className="text-3xl font-bold font-mono text-rose-600">
              {reserveImpact.scenarioSprDaysCover}d
            </span>
          </div>
          <span className="text-[11px] text-slate-600 font-sans block">
            Accelerated cavern depletion at full substitution.
          </span>
        </div>

      </div>

      {/* LEVEL 2 & 3: Progressive Disclosure Trigger */}
      <div className="pt-2">
        <button
          onClick={() => setIsFullTableOpen(!isFullTableOpen)}
          className="touch-target w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-mono font-semibold text-slate-700 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <ShieldIcon className="w-4 h-4 text-sky-600" />
            <span>{isFullTableOpen ? "Hide Complete 7-Factor Comparison Matrix" : "View Full Comparison Matrix (7 Factors)"}</span>
          </span>
          <span className="flex items-center gap-1 text-slate-500 font-normal">
            <span>{isFullTableOpen ? "Collapse" : "Expand Table"}</span>
            <ChevronDownIcon className={`w-4 h-4 transition-transform ${isFullTableOpen ? "rotate-180" : ""}`} />
          </span>
        </button>

        {isFullTableOpen && (
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs font-mono text-slate-700">
              <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Vulnerability Dimension</th>
                  <th className="py-3 px-3 text-center">Baseline (Steady-State)</th>
                  <th className="py-3 px-3 text-center">Scenario Impact</th>
                  <th className="py-3 px-3 text-center">Net Variance</th>
                  <th className="py-3 px-4 text-right">System Assessment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${row.isDeterioration ? "bg-rose-500" : "bg-emerald-500"}`} />
                      <span>{row.factor}</span>
                    </td>
                    <td className="py-3 px-3 text-center text-slate-600">{row.baseline}</td>
                    <td className="py-3 px-3 text-center font-bold text-slate-900">{row.scenario}</td>
                    <td className="py-3 px-3 text-center font-bold text-rose-700">
                      {row.change}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-rose-50 text-rose-800 border border-rose-200">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
