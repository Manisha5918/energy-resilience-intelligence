"use client";

import { ShieldIcon, ActivityIcon } from "@/components/ui/Icons";

export default function StrategyComparison({ strategies, selectedStrategyId, onSelectStrategy }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-200 bg-white shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-sky-600" />
            <h3 className="text-sm font-semibold text-slate-900 font-heading tracking-wide">
              Procurement Strategy Comparative Matrix
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              MULTI-STRATEGY TRADEOFFS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare multi-objective optimization strategies across supply replacement, landed cost, risk, and transit lead time.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-500 font-semibold">
          {strategies.length} STRATEGIES EVALUATED
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-xs font-mono text-slate-700">
          <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Strategy Package</th>
              <th className="py-2.5 px-2 text-center">Supply Replacement</th>
              <th className="py-2.5 px-2 text-center">Landed Cost</th>
              <th className="py-2.5 px-2 text-center">Risk Tier</th>
              <th className="py-2.5 px-2 text-center">Avg Transit</th>
              <th className="py-2.5 px-2 text-center">HHI Delta</th>
              <th className="py-2.5 px-3 text-right">Strategy Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {strategies.map((strat, idx) => {
              const isSelected = strat.id === selectedStrategyId;
              const isTop = idx === 0;

              return (
                <tr
                  key={strat.id}
                  onClick={() => onSelectStrategy(strat.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-sky-50 text-sky-950 font-medium"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      {isTop && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white shadow-xs">
                          TOP #1
                        </span>
                      )}
                      <span className="font-bold text-slate-900">{strat.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-sans block truncate max-w-xs mt-0.5">
                      {strat.tagline}
                    </span>
                  </td>

                  <td className="py-3 px-2 text-center">
                    <span className="font-bold text-slate-900">{strat.totalAllocatedMbd} MBD</span>
                    <span className="text-[9px] text-slate-500 block">({strat.fulfillmentPct}%)</span>
                  </td>

                  <td className="py-3 px-2 text-center">
                    <span className="font-bold text-amber-700">${strat.weightedLandedCostUsd}</span>
                    <span className="text-[9px] text-slate-500 block">/ bbl</span>
                  </td>

                  <td className="py-3 px-2 text-center">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold ${strat.riskBadgeClass}`}>
                      {strat.riskLevel}
                    </span>
                  </td>

                  <td className="py-3 px-2 text-center text-slate-700">
                    {strat.weightedTransitDays} Days
                  </td>

                  <td className="py-3 px-2 text-center text-emerald-700 font-bold">
                    -{strat.hhiImprovement} pts
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className="text-base font-bold text-sky-700 font-mono">
                      {strat.strategyScore}
                    </span>
                    <span className="text-[9px] text-slate-500">/100</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
