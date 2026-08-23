"use client";

import { InfoIcon, ShieldIcon } from "@/components/ui/Icons";

export default function ProcurementModelAssumptions() {
  return (
    <div className="rounded-2xl p-6 border border-[#C7E3F7] space-y-4 bg-white shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5E5F1] pb-3">
        <div className="flex items-center gap-2">
          <InfoIcon className="w-4 h-4 text-[#0284c7]" />
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#16324F] font-bold">
            Procurement Optimization Assumptions &amp; Decision-Support Disclaimers
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] font-bold">
          SIMULATED / ILLUSTRATIVE MODEL
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] shadow-2xs">
          <span className="text-[9px] text-[#58708A] uppercase font-bold block">Base Crude Benchmark</span>
          <span className="text-[#16324F] font-bold">$84.65 / bbl</span>
          <span className="text-[9px] text-[#58708A] block font-sans">Brent spot reference</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] shadow-2xs">
          <span className="text-[9px] text-[#58708A] uppercase font-bold block">Freight Cost Baseline</span>
          <span className="text-[#16324F] font-bold">$2.90 – $8.20 / bbl</span>
          <span className="text-[9px] text-[#58708A] block font-sans">Corridor-specific indices</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] shadow-2xs">
          <span className="text-[9px] text-[#58708A] uppercase font-bold block">SPR Discharge Limit</span>
          <span className="text-[#16324F] font-bold">2.50 MBD</span>
          <span className="text-[9px] text-[#58708A] block font-sans">Tri-cavern drawdown ceiling</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] shadow-2xs">
          <span className="text-[9px] text-[#58708A] uppercase font-bold block">Decision Support Status</span>
          <span className="text-[#0284c7] font-bold">Advisory Only</span>
          <span className="text-[9px] text-[#58708A] block font-sans">No automated trade execution</span>
        </div>
      </div>

      <div className="text-[11px] text-[#58708A] font-sans leading-relaxed pt-1">
        <strong className="text-[#16324F]">Methodological Disclosure: </strong>
        The Adaptive Procurement Orchestrator generates heuristic, multi-objective ranking to assist human procurement executives and risk committees. It does NOT execute automated purchase orders or claim real-time commercial contract guarantees.
      </div>
    </div>
  );
}
