"use client";

import { InfoIcon, ShieldIcon } from "@/components/ui/Icons";

export default function ProcurementModelAssumptions() {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-200 space-y-3.5 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <InfoIcon className="w-4 h-4 text-sky-600" />
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold">
            Procurement Optimization Assumptions & Decision-Support Disclaimers
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
          SIMULATED / ILLUSTRATIVE MODEL
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[9px] text-slate-500 uppercase font-semibold block">Base Crude Benchmark</span>
          <span className="text-slate-900 font-bold">$84.65 / bbl</span>
          <span className="text-[9px] text-slate-500 block">Brent spot reference</span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[9px] text-slate-500 uppercase font-semibold block">Freight Cost Baseline</span>
          <span className="text-slate-900 font-bold">$2.90 – $8.20 / bbl</span>
          <span className="text-[9px] text-slate-500 block">Corridor-specific indices</span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[9px] text-slate-500 uppercase font-semibold block">SPR Discharge Limit</span>
          <span className="text-slate-900 font-bold">2.50 MBD</span>
          <span className="text-[9px] text-slate-500 block">Tri-cavern drawdown ceiling</span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[9px] text-slate-500 uppercase font-semibold block">Decision Support Status</span>
          <span className="text-sky-700 font-bold">Advisory Only</span>
          <span className="text-[9px] text-slate-500 block">No automated trade execution</span>
        </div>
      </div>

      <div className="text-[11px] text-slate-600 font-sans leading-relaxed pt-1">
        <span className="font-semibold text-slate-900">Methodological Disclosure: </span>
        The Adaptive Procurement Orchestrator generates heuristic, multi-objective ranking to assist human procurement executives and risk committees. It does NOT execute automated purchase orders or claim real-time commercial contract guarantees.
      </div>
    </div>
  );
}
