"use client";

import { ShieldIcon, InfoIcon, ActivityIcon } from "@/components/ui/Icons";

export default function DecisionExplanation({ strategy }) {
  const scoreBreakdown = strategy?.scoreBreakdown || [];

  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4 bg-[#080d16]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldIcon className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
            Heuristic Decision Scoring & Point Contribution
          </h3>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
            TRANSPARENT OPTIMIZATION MATH
          </span>
        </div>

        <div className="text-[10px] font-mono text-cyan-400">
          TOTAL SCORE: <span className="font-bold">{strategy.strategyScore} / 100</span>
        </div>
      </div>

      {/* Formula Box */}
      <div className="p-3.5 rounded-lg bg-[#060a12] border border-cyan-900/50 text-xs font-mono text-cyan-300">
        <span className="text-[9px] uppercase font-bold text-cyan-400 block mb-1">
          Optimization Formulation:
        </span>
        <div className="text-slate-200 overflow-x-auto py-0.5">
          Score = ResilienceBenefit(35%) + Diversification(20%) + RouteReliability(15%) + SupplyFulfillment(15%) - CostPenalty(10%) - TransitPenalty(5%)
        </div>
      </div>

      {/* Point Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead className="bg-slate-900/90 text-[10px] uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Optimization Objective</th>
              <th className="py-2.5 px-2 text-center">Model Weight</th>
              <th className="py-2.5 px-2 text-center">Input Score (0-100)</th>
              <th className="py-2.5 px-3 text-right">Weighted Point Contribution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-[#070b12]">
            {scoreBreakdown.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-100">{row.factor}</td>
                <td className="py-2.5 px-2 text-center text-slate-400">{row.weight}</td>
                <td className="py-2.5 px-2 text-center text-slate-200 font-bold">{row.input}</td>
                <td className={`py-2.5 px-3 text-right font-bold ${
                  row.points >= 0 ? "text-cyan-400" : "text-rose-400"
                }`}>
                  {row.points > 0 ? `+${row.points}` : row.points} pts
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-[10px] font-mono text-slate-500 pt-1">
        * Every recommendation score is mathematically reproducible and traceable to operational metrics.
      </div>

    </div>
  );
}
