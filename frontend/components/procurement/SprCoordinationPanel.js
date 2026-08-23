"use client";

import { DatabaseIcon, ShieldIcon, InfoIcon } from "@/components/ui/Icons";

export default function SprCoordinationPanel({ strategy }) {
  const { targetSupplyGapMbd, totalAllocatedMbd, remainingGapMbd, sprDrawRecommendedMbd } = strategy;

  return (
    <div className="command-card rounded-xl p-5 border border-slate-200 bg-white shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-slate-900 font-heading tracking-wide">
              Strategic Petroleum Reserve (SPR) Joint Coordination
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
              BUFFER SYNCHRONIZATION
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Coordinates market procurement replacement volumes with domestic underground rock cavern drawdown rates.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-500 font-semibold">
          SPR DRAW: <span className="text-emerald-700 font-bold">{sprDrawRecommendedMbd} MBD</span>
        </div>
      </div>

      {/* 3 Step Balance Meter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">1. Total Required Deficit</span>
          <div className="text-xl font-bold text-rose-600">
            {targetSupplyGapMbd} <span className="text-xs text-slate-500 font-normal">MBD</span>
          </div>
          <p className="text-[10px] text-slate-600 font-sans">
            Target replacement requirement under active conditions.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">2. Procurement Replacement</span>
          <div className="text-xl font-bold text-sky-700">
            {totalAllocatedMbd} <span className="text-xs text-slate-500 font-normal">MBD</span>
          </div>
          <p className="text-[10px] text-slate-600 font-sans">
            Sourced via alternative suppliers & bypass routes.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">3. Remaining SPR Cavern Draw</span>
          <div className={`text-xl font-bold ${remainingGapMbd > 0 ? "text-amber-700" : "text-emerald-700"}`}>
            {sprDrawRecommendedMbd} <span className="text-xs text-slate-500 font-normal">MBD</span>
          </div>
          <p className="text-[10px] text-slate-600 font-sans">
            {remainingGapMbd > 0 ? "Controlled draw preserves SPR buffer." : "Zero SPR draw needed (100% market cover)."}
          </p>
        </div>
      </div>

      <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between pt-1">
        <span>* Maximum SPR underground cavern discharge capacity: 2.50 MBD across Vizag, Mangalore & Padur</span>
        <span>[DECISION-SUPPORT RECOMMENDATION]</span>
      </div>

    </div>
  );
}
