"use client";

import { ShieldIcon, InfoIcon, ActivityIcon } from "@/components/ui/Icons";

export default function DecisionExplanation({ strategy }) {
  const scoreBreakdown = strategy?.scoreBreakdown || [];

  return (
    <div className="rounded-2xl p-6 border border-[#C7E3F7] bg-white shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5E5F1] pb-3">
        <div className="flex items-center gap-2">
          <ShieldIcon className="w-4 h-4 text-[#0284c7]" />
          <h3 className="text-sm sm:text-base font-bold text-[#16324F] font-heading tracking-tight">
            Heuristic Decision Scoring &amp; Point Contribution
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] font-bold">
            TRANSPARENT OPTIMIZATION MATH
          </span>
        </div>

        <div className="text-[10px] font-mono text-[#0B2540] font-bold">
          TOTAL SCORE: <span className="text-[#0284c7] font-bold">{strategy.strategyScore} / 100</span>
        </div>
      </div>

      {/* Formula Box */}
      <div className="p-4 rounded-xl bg-[#EFF8FF] border border-[#B9DDF5] text-xs font-mono text-[#0B2540] shadow-2xs">
        <span className="text-[10px] uppercase font-bold text-[#0284c7] block mb-1">
          Optimization Formulation:
        </span>
        <div className="text-[#16324F] overflow-x-auto py-0.5 font-semibold">
          Score = ResilienceBenefit(35%) + Diversification(20%) + RouteReliability(15%) + SupplyFulfillment(15%) - CostPenalty(10%) - TransitPenalty(5%)
        </div>
      </div>

      {/* Point Table */}
      <div className="w-full overflow-x-auto rounded-xl border border-[#C7E3F7] shadow-2xs">
        <table className="w-full text-left text-xs font-mono text-[#16324F]">
          <thead className="bg-[#EEF7FF] text-[10px] uppercase text-[#16324F] font-bold border-b border-[#C7E3F7]">
            <tr>
              <th className="py-3 px-3.5">Optimization Objective</th>
              <th className="py-3 px-2 text-center">Model Weight</th>
              <th className="py-3 px-2 text-center">Input Score (0-100)</th>
              <th className="py-3 px-3.5 text-right">Weighted Point Contribution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D5E5F1] bg-white">
            {scoreBreakdown.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#F4F9FD] transition-colors">
                <td className="py-3 px-3.5 font-bold text-[#16324F]">{row.factor}</td>
                <td className="py-3 px-2 text-center text-[#58708A]">{row.weight}</td>
                <td className="py-3 px-2 text-center text-[#16324F] font-bold">{row.input}</td>
                <td className={`py-3 px-3.5 text-right font-bold ${
                  row.points >= 0 ? "text-[#0284c7]" : "text-rose-700"
                }`}>
                  {row.points > 0 ? `+${row.points}` : row.points} pts
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-[10px] font-mono text-[#58708A] pt-1">
        * Every recommendation score is mathematically reproducible and traceable to operational metrics.
      </div>

    </div>
  );
}
