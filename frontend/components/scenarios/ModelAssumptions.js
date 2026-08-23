"use client";

import { InfoIcon, ShieldIcon } from "@/components/ui/Icons";

export default function ModelAssumptions({ parameters, scenarioTemplate }) {
  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 space-y-4 bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <InfoIcon className="w-5 h-5 text-sky-600" />
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
            Simulation Mathematical Model Assumptions & Traceability
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-semibold self-start sm:self-auto">
          SIMULATED / ILLUSTRATIVE ASSUMPTIONS
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Disruption Severity</span>
          <span className="text-slate-900 font-bold text-sm block mt-0.5">{parameters.severity}</span>
          <span className="text-[10px] text-slate-500 block">Scaling: {parameters.severity === "Severe" ? "1.35x" : parameters.severity === "Low" ? "0.7x" : "1.0x"}</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Duration Horizon</span>
          <span className="text-slate-900 font-bold text-sm block mt-0.5">{parameters.durationDays} Days</span>
          <span className="text-[10px] text-slate-500 block">Baseline import: 4.83 MBD</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Supply Flow Deficit</span>
          <span className="text-rose-700 font-bold text-sm block mt-0.5">{parameters.supplyDisruptionPct}%</span>
          <span className="text-[10px] text-slate-500 block">Linear import curtailment</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Brent Price Variance</span>
          <span className="text-amber-700 font-bold text-sm block mt-0.5">+{parameters.priceShockPct}%</span>
          <span className="text-[10px] text-slate-500 block">Base: $84.65/bbl</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Freight Cost Surge</span>
          <span className="text-sky-800 font-bold text-sm block mt-0.5">+{parameters.freightImpactPct}%</span>
          <span className="text-[10px] text-slate-500 block">War-risk & bunker premium</span>
        </div>
      </div>

      <div className="text-xs text-slate-600 font-sans leading-relaxed pt-1">
        <span className="font-semibold text-slate-900">Resilience Scoring Traceability: </span>
        The simulation applies deterministic penalty offsets to the baseline 5-factor model in <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-sky-800 text-xs border border-slate-200 font-semibold">lib/riskScoringEngine.js</code> (Geopolitical 30%, Logistics 25%, Concentration 20%, Volatility 15%, Supply Gap 10%). All calculations are reproducible and designed for modular replacement with live telemetry in future phases.
      </div>
    </div>
  );
}
