"use client";

import { DatabaseIcon, AlertTriangleIcon, CheckCircleIcon } from "@/components/ui/Icons";

export default function ReserveImpact({ reserveImpact }) {
  const isCritical = reserveImpact.sprPressureLevel === "CRITICAL";
  const isHigh = reserveImpact.sprPressureLevel === "HIGH";

  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 space-y-5 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Strategic Petroleum Reserve (SPR) Drawdown Analysis
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
              STOCKPILE DEPLETION
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Model-projected underground rock cavern drawdown rates and emergency cover duration under disruption stress.
          </p>
        </div>

        <span className={`text-[10px] font-mono px-2.5 py-1 rounded font-bold border self-start sm:self-auto ${
          isCritical
            ? "bg-rose-50 text-rose-800 border-rose-200"
            : isHigh
            ? "bg-amber-50 text-amber-800 border-amber-200"
            : "bg-emerald-50 text-emerald-800 border-emerald-200"
        }`}>
          PRESSURE: {reserveImpact.sprPressureLevel}
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Baseline Cover</span>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {reserveImpact.baselineSprDaysCover} <span className="text-xs font-normal text-slate-500">Days</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">~33.4 MBBL inventory</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Scenario Cover Left</span>
          <div className={`text-xl font-bold mt-1 ${
            reserveImpact.scenarioSprDaysCover < 4 ? "text-rose-700" : "text-amber-700"
          }`}>
            {reserveImpact.scenarioSprDaysCover} <span className="text-xs font-normal text-slate-500">Days</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">{reserveImpact.remainingSprInventoryMbbl} MBBL remaining</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Drawdown Rate</span>
          <div className="text-xl font-bold text-rose-700 mt-1">
            {reserveImpact.sprDrawdownRateMbd} <span className="text-xs font-normal text-slate-500">MBD</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Max limit: 2.5 MBD</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Total Draw Volume</span>
          <div className="text-xl font-bold text-amber-700 mt-1">
            {reserveImpact.sprDepletionMbbl} <span className="text-xs font-normal text-slate-500">MBBL</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Over scenario horizon</span>
        </div>
      </div>

      {/* Visual Stockpile Fill Bar */}
      <div className="space-y-2 pt-1">
        <div className="flex justify-between text-xs font-mono text-slate-600">
          <span>Remaining Underground Cavern Inventory (Vizag, Mangalore, Padur)</span>
          <span className="text-emerald-700 font-bold">
            {((reserveImpact.remainingSprInventoryMbbl / 39.18) * 100).toFixed(1)}% Capacity
          </span>
        </div>
        <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              reserveImpact.scenarioSprDaysCover < 4
                ? "bg-rose-600"
                : reserveImpact.scenarioSprDaysCover < 7
                ? "bg-amber-600"
                : "bg-emerald-600"
            }`}
            style={{ width: `${Math.max(5, (reserveImpact.remainingSprInventoryMbbl / 39.18) * 100)}%` }}
          />
        </div>
      </div>

    </div>
  );
}
