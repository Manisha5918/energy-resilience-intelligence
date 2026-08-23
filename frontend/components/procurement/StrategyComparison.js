"use client";

import { ShieldIcon, ActivityIcon } from "@/components/ui/Icons";

export default function StrategyComparison({ strategies, selectedStrategyId, onSelectStrategy }) {
  return (
    <div className="rounded-2xl p-6 border border-[#C7E3F7] bg-white shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5E5F1] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-[#0284c7]" />
            <h3 className="text-sm sm:text-base font-bold text-[#16324F] font-heading tracking-tight">
              Procurement Strategy Comparative Matrix
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] font-bold">
              MULTI-STRATEGY TRADEOFFS
            </span>
          </div>
          <p className="text-xs text-[#58708A] mt-0.5 font-sans">
            Compare multi-objective optimization strategies across supply replacement, landed cost, risk, and transit lead time.
          </p>
        </div>

        <div className="text-[10px] font-mono text-[#58708A] font-bold">
          {strategies.length} STRATEGIES EVALUATED
        </div>
      </div>

      {/* Comparison Table */}
      <div className="w-full overflow-x-auto rounded-xl border border-[#C7E3F7] shadow-2xs">
        <table className="w-full text-left text-xs font-mono text-[#16324F]">
          <thead className="bg-[#EEF7FF] text-[10px] uppercase text-[#16324F] font-bold border-b border-[#C7E3F7]">
            <tr>
              <th className="py-3 px-3.5">Strategy Package</th>
              <th className="py-3 px-2 text-center">Supply Replacement</th>
              <th className="py-3 px-2 text-center">Landed Cost</th>
              <th className="py-3 px-2 text-center">Risk Tier</th>
              <th className="py-3 px-2 text-center">Avg Transit</th>
              <th className="py-3 px-2 text-center">HHI Delta</th>
              <th className="py-3 px-3.5 text-right">Strategy Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D5E5F1] bg-white">
            {strategies.map((strat, idx) => {
              const isSelected = strat.id === selectedStrategyId;
              const isTop = idx === 0;

              return (
                <tr
                  key={strat.id}
                  onClick={() => onSelectStrategy(strat.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[#F0F8FF] text-[#0B2540] font-medium"
                      : "hover:bg-[#F8FBFE]"
                  }`}
                >
                  <td className="py-3.5 px-3.5">
                    <div className="flex items-center gap-2">
                      {isTop && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white shadow-2xs">
                          TOP #1
                        </span>
                      )}
                      <span className="font-bold text-[#16324F]">{strat.name}</span>
                    </div>
                    <span className="text-[10px] text-[#58708A] font-sans block truncate max-w-xs mt-0.5">
                      {strat.tagline}
                    </span>
                  </td>

                  <td className="py-3.5 px-2 text-center">
                    <span className="font-bold text-[#16324F]">{strat.totalAllocatedMbd} MBD</span>
                    <span className="text-[9px] text-[#58708A] block">({strat.fulfillmentPct}%)</span>
                  </td>

                  <td className="py-3.5 px-2 text-center">
                    <span className="font-bold text-[#D97706]">${strat.weightedLandedCostUsd}</span>
                    <span className="text-[9px] text-[#58708A] block">/ bbl</span>
                  </td>

                  <td className="py-3.5 px-2 text-center">
                    <span className={`text-[9px] px-2 py-0.5 rounded border font-bold ${strat.riskBadgeClass}`}>
                      {strat.riskLevel}
                    </span>
                  </td>

                  <td className="py-3.5 px-2 text-center text-[#16324F]">
                    {strat.weightedTransitDays} Days
                  </td>

                  <td className="py-3.5 px-2 text-center text-emerald-700 font-bold">
                    -{strat.hhiImprovement} pts
                  </td>

                  <td className="py-3.5 px-3.5 text-right">
                    <span className="text-base font-bold text-[#0284c7] font-mono">
                      {strat.strategyScore}
                    </span>
                    <span className="text-[10px] text-[#58708A]">/100</span>
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
