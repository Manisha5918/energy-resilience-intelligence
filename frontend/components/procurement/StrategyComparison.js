"use client";

import { ShieldIcon, ActivityIcon } from "@/components/ui/Icons";

export default function StrategyComparison({ strategies, selectedStrategyId, onSelectStrategy }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Procurement Strategy Comparative Matrix
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              MULTI-STRATEGY TRADEOFFS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare multi-objective optimization strategies across supply replacement, landed cost, risk, and transit lead time.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          {strategies.length} STRATEGIES EVALUATED
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead className="bg-slate-900/90 text-[10px] uppercase text-slate-400 border-b border-slate-800">
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
          <tbody className="divide-y divide-slate-800/60 bg-[#070b12]">
            {strategies.map((strat, idx) => {
              const isSelected = strat.id === selectedStrategyId;
              const isTop = idx === 0;

              return (
                <tr
                  key={strat.id}
                  onClick={() => onSelectStrategy(strat.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-cyan-950/40 text-cyan-200"
                      : "hover:bg-slate-800/20"
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      {isTop && (
                        <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-amber-500 text-slate-950">
                          TOP #1
                        </span>
                      )}
                      <span className="font-bold text-slate-100">{strat.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-sans block truncate max-w-xs mt-0.5">
                      {strat.tagline}
                    </span>
                  </td>

                  <td className="py-3 px-2 text-center">
                    <span className="font-bold text-white">{strat.totalAllocatedMbd} MBD</span>
                    <span className="text-[9px] text-slate-500 block">({strat.fulfillmentPct}%)</span>
                  </td>

                  <td className="py-3 px-2 text-center">
                    <span className="font-bold text-amber-300">${strat.weightedLandedCostUsd}</span>
                    <span className="text-[9px] text-slate-500 block">/ bbl</span>
                  </td>

                  <td className="py-3 px-2 text-center">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold ${strat.riskBadgeClass}`}>
                      {strat.riskLevel}
                    </span>
                  </td>

                  <td className="py-3 px-2 text-center text-slate-300">
                    {strat.weightedTransitDays} Days
                  </td>

                  <td className="py-3 px-2 text-center text-emerald-400 font-bold">
                    -{strat.hhiImprovement} pts
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className="text-base font-bold text-cyan-400 font-mono">
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
