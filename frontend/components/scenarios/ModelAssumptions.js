"use client";

import { InfoIcon, ShieldIcon } from "@/components/ui/Icons";

export default function ModelAssumptions({ parameters, scenarioTemplate }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-3.5 bg-[#080d16]">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <InfoIcon className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
            Simulation Mathematical Model Assumptions & Traceability
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800 text-amber-300">
          SIMULATED / ILLUSTRATIVE ASSUMPTIONS
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs font-mono">
        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-[9px] text-slate-500 uppercase block">Disruption Severity</span>
          <span className="text-slate-200 font-bold">{parameters.severity}</span>
          <span className="text-[9px] text-slate-500 block">Scaling: {parameters.severity === "Severe" ? "1.35x" : parameters.severity === "Low" ? "0.7x" : "1.0x"}</span>
        </div>

        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-[9px] text-slate-500 uppercase block">Duration Horizon</span>
          <span className="text-slate-200 font-bold">{parameters.durationDays} Days</span>
          <span className="text-[9px] text-slate-500 block">Baseline demand: 4.67 MBD</span>
        </div>

        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-[9px] text-slate-500 uppercase block">Supply Flow Deficit</span>
          <span className="text-rose-400 font-bold">{parameters.supplyDisruptionPct}%</span>
          <span className="text-[9px] text-slate-500 block">Linear import curtailment</span>
        </div>

        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-[9px] text-slate-500 uppercase block">Brent Price Variance</span>
          <span className="text-amber-400 font-bold">+{parameters.priceShockPct}%</span>
          <span className="text-[9px] text-slate-500 block">Base: $84.65/bbl</span>
        </div>

        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-[9px] text-slate-500 uppercase block">Freight Cost Surge</span>
          <span className="text-cyan-400 font-bold">+{parameters.freightImpactPct}%</span>
          <span className="text-[9px] text-slate-500 block">War-risk & bunker premium</span>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1">
        <span className="font-semibold text-slate-300">Resilience Scoring Traceability: </span>
        The simulation applies deterministic penalty offsets to the baseline 5-factor model in <code className="bg-slate-900 px-1 py-0.5 rounded font-mono text-cyan-300">lib/riskScoringEngine.js</code> (Geopolitical 30%, Logistics 25%, Concentration 20%, Volatility 15%, Supply Gap 10%). All calculations are reproducible and designed for modular replacement with live telemetry in future phases.
      </div>
    </div>
  );
}
