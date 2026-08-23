"use client";

import { ShieldIcon, InfoIcon, ActivityIcon } from "@/components/ui/Icons";

export default function DecisionExplanation({ strategy }) {
  const scoreBreakdown = strategy?.scoreBreakdown || [];

  return (
    <div className="command-card rounded-xl p-5 border border-slate-200 bg-white shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <ShieldIcon className="w-4 h-4 text-sky-600" />
          <h3 className="text-sm font-semibold text-slate-900 font-heading tracking-wide">
            Heuristic Decision Scoring & Point Contribution
          </h3>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
            TRANSPARENT OPTIMIZATION MATH
          </span>
        </div>

        <div className="text-[10px] font-mono text-sky-800 font-semibold">
          TOTAL SCORE: <span className="font-bold">{strategy.strategyScore} / 100</span>
        </div>
      </div>

      {/* Formula Box */}
      <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 text-xs font-mono text-sky-950">
        <span className="text-[9px] uppercase font-bold text-sky-800 block mb-1">
          Optimization Formulation:
        </span>
        <div className="text-slate-800 overflow-x-auto py-0.5 font-medium">
          Score = ResilienceBenefit(35%) + Diversification(20%) + RouteReliability(15%) + SupplyFulfillment(15%) - CostPenalty(10%) - TransitPenalty(5%)
        </div>
      </div>

      {/* Point Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-xs font-mono text-slate-700">
          <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Optimization Objective</th>
              <th className="py-2.5 px-2 text-center">Model Weight</th>
              <th className="py-2.5 px-2 text-center">Input Score (0-100)</th>
              <th className="py-2.5 px-3 text-right">Weighted Point Contribution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {scoreBreakdown.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-900">{row.factor}</td>
                <td className="py-2.5 px-2 text-center text-slate-500">{row.weight}</td>
                <td className="py-2.5 px-2 text-center text-slate-900 font-bold">{row.input}</td>
                <td className={`py-2.5 px-3 text-right font-bold ${
                  row.points >= 0 ? "text-sky-700" : "text-rose-700"
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
