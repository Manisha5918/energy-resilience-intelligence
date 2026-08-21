"use client";

import { DatabaseIcon, ShieldIcon, InfoIcon } from "@/components/ui/Icons";

export default function SprCoordinationPanel({ strategy }) {
  const { targetSupplyGapMbd, totalAllocatedMbd, remainingGapMbd, sprDrawRecommendedMbd } = strategy;

  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Strategic Petroleum Reserve (SPR) Joint Coordination
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300">
              BUFFER SYNCHRONIZATION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Coordinates market procurement replacement volumes with domestic underground rock cavern drawdown rates.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          SPR DRAW: <span className="text-emerald-400 font-bold">{sprDrawRecommendedMbd} MBD</span>
        </div>
      </div>

      {/* 3 Step Balance Meter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase block">1. Total Required Deficit</span>
          <div className="text-xl font-bold text-rose-400">
            {targetSupplyGapMbd} <span className="text-xs text-slate-400 font-normal">MBD</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans">
            Target replacement requirement under active conditions.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase block">2. Procurement Replacement</span>
          <div className="text-xl font-bold text-cyan-300">
            {totalAllocatedMbd} <span className="text-xs text-slate-400 font-normal">MBD</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans">
            Sourced via alternative suppliers & bypass routes.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase block">3. Remaining SPR Cavern Draw</span>
          <div className={`text-xl font-bold ${remainingGapMbd > 0 ? "text-amber-400" : "text-emerald-400"}`}>
            {sprDrawRecommendedMbd} <span className="text-xs text-slate-400 font-normal">MBD</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans">
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
