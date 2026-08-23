"use client";

import { DatabaseIcon, ShieldIcon, InfoIcon } from "@/components/ui/Icons";

export default function SprCoordinationPanel({ strategy }) {
  const { targetSupplyGapMbd, totalAllocatedMbd, remainingGapMbd, sprDrawRecommendedMbd } = strategy;

  return (
    <div className="rounded-2xl p-6 border border-[#C7E3F7] bg-white shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D5E5F1] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-[#16324F] font-heading tracking-wide">
              Strategic Petroleum Reserve (SPR) Joint Coordination
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
              BUFFER SYNCHRONIZATION
            </span>
          </div>
          <p className="text-xs text-[#58708A] mt-0.5 font-sans">
            Coordinates market procurement replacement volumes with domestic underground rock cavern drawdown rates.
          </p>
        </div>

        <div className="text-[10px] font-mono text-[#58708A] font-bold">
          SPR DRAW: <span className="text-emerald-700 font-bold">{sprDrawRecommendedMbd} MBD</span>
        </div>
      </div>

      {/* 3 Step Balance Meter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] space-y-1 shadow-2xs">
          <span className="text-[10px] text-[#58708A] uppercase font-bold block">1. Total Required Deficit</span>
          <div className="text-xl font-bold text-[#FF3D6E]">
            {targetSupplyGapMbd} <span className="text-xs text-[#58708A] font-normal">MBD</span>
          </div>
          <p className="text-[10px] text-[#58708A] font-sans">
            Target replacement requirement under active conditions.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] space-y-1 shadow-2xs">
          <span className="text-[10px] text-[#58708A] uppercase font-bold block">2. Procurement Replacement</span>
          <div className="text-xl font-bold text-[#0284c7]">
            {totalAllocatedMbd} <span className="text-xs text-[#58708A] font-normal">MBD</span>
          </div>
          <p className="text-[10px] text-[#58708A] font-sans">
            Sourced via alternative suppliers &amp; bypass routes.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] space-y-1 shadow-2xs">
          <span className="text-[10px] text-[#58708A] uppercase font-bold block">3. Remaining SPR Cavern Draw</span>
          <div className={`text-xl font-bold ${remainingGapMbd > 0 ? "text-[#D97706]" : "text-[#00C98D]"}`}>
            {sprDrawRecommendedMbd} <span className="text-xs text-[#58708A] font-normal">MBD</span>
          </div>
          <p className="text-[10px] text-[#58708A] font-sans">
            {remainingGapMbd > 0 ? "Controlled draw preserves SPR buffer." : "Zero SPR draw needed (100% market cover)."}
          </p>
        </div>
      </div>

      <div className="text-[10px] font-mono text-[#58708A] flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1">
        <span>* Maximum SPR underground cavern discharge capacity: 2.50 MBD across Vizag, Mangalore &amp; Padur</span>
        <span className="font-bold text-[#0284c7]">[DECISION-SUPPORT RECOMMENDATION]</span>
      </div>

    </div>
  );
}
