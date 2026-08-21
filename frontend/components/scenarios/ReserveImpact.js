"use client";

import { DatabaseIcon, AlertTriangleIcon, CheckCircleIcon } from "@/components/ui/Icons";

export default function ReserveImpact({ reserveImpact }) {
  const isCritical = reserveImpact.sprPressureLevel === "CRITICAL";
  const isHigh = reserveImpact.sprPressureLevel === "HIGH";

  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Strategic Petroleum Reserve (SPR) Drawdown Analysis
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300">
              STOCKPILE DEPLETION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Model-projected underground rock cavern drawdown rates and emergency cover duration under disruption stress.
          </p>
        </div>

        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
          isCritical
            ? "bg-rose-950 text-rose-400 border-rose-800"
            : isHigh
            ? "bg-amber-950 text-amber-400 border-amber-800"
            : "bg-emerald-950 text-emerald-400 border-emerald-800"
        }`}>
          PRESSURE: {reserveImpact.sprPressureLevel}
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-lg bg-[#080d16] border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Baseline Cover</span>
          <div className="text-xl font-bold text-slate-300 mt-0.5">
            {reserveImpact.baselineSprDaysCover} <span className="text-xs font-normal text-slate-500">Days</span>
          </div>
          <span className="text-[9px] text-slate-500">~33.4 MBBL inventory</span>
        </div>

        <div className="p-3 rounded-lg bg-[#080d16] border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Scenario Cover Left</span>
          <div className={`text-xl font-bold mt-0.5 ${
            reserveImpact.scenarioSprDaysCover < 4 ? "text-rose-400" : "text-amber-400"
          }`}>
            {reserveImpact.scenarioSprDaysCover} <span className="text-xs font-normal text-slate-500">Days</span>
          </div>
          <span className="text-[9px] text-slate-500">{reserveImpact.remainingSprInventoryMbbl} MBBL remaining</span>
        </div>

        <div className="p-3 rounded-lg bg-[#080d16] border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Drawdown Rate</span>
          <div className="text-xl font-bold text-rose-400 mt-0.5">
            {reserveImpact.sprDrawdownRateMbd} <span className="text-xs font-normal text-slate-500">MBD</span>
          </div>
          <span className="text-[9px] text-slate-500">Max limit: 2.5 MBD</span>
        </div>

        <div className="p-3 rounded-lg bg-[#080d16] border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Total Draw Volume</span>
          <div className="text-xl font-bold text-amber-400 mt-0.5">
            {reserveImpact.sprDepletionMbbl} <span className="text-xs font-normal text-slate-500">MBBL</span>
          </div>
          <span className="text-[9px] text-slate-500">Over scenario horizon</span>
        </div>
      </div>

      {/* Visual Stockpile Fill Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="flex justify-between text-[11px] font-mono text-slate-400">
          <span>Remaining Underground Cavern Inventory (Vizag, Mangalore, Padur)</span>
          <span className="text-emerald-400 font-bold">
            {((reserveImpact.remainingSprInventoryMbbl / 39.16) * 100).toFixed(1)}% Capacity
          </span>
        </div>
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/80">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              reserveImpact.scenarioSprDaysCover < 4
                ? "bg-rose-500"
                : reserveImpact.scenarioSprDaysCover < 7
                ? "bg-amber-500"
                : "bg-emerald-500"
            }`}
            style={{ width: `${Math.max(5, (reserveImpact.remainingSprInventoryMbbl / 39.16) * 100)}%` }}
          />
        </div>
      </div>

    </div>
  );
}
