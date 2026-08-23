"use client";

import { ShieldIcon, ZapIcon, ActivityIcon } from "@/components/ui/Icons";

export default function TradeoffAnalysis({ strategies }) {
  const balanced = strategies.find((s) => s.type === "Balanced") || strategies[0];
  const maxResilience = strategies.find((s) => s.type === "Maximum Resilience") || strategies[1] || strategies[0];
  const costOptimized = strategies.find((s) => s.type === "Cost Optimized") || strategies[2] || strategies[0];

  return (
    <div className="rounded-2xl p-6 border border-[#C7E3F7] bg-white shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D5E5F1] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ZapIcon className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm sm:text-base font-bold text-[#16324F] font-heading tracking-tight">
              Strategic Trade-Off Frontier (Cost vs. Resilience)
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] font-bold">
              PARETO OPTIMALITY
            </span>
          </div>
          <p className="text-xs text-[#58708A] mt-0.5 font-sans">
            Explicitly illustrates the economic premium required to achieve chokepoint immunity vs legacy exposure.
          </p>
        </div>

        <div className="text-[10px] font-mono text-[#58708A] font-bold">
          3 STRATEGIC ARCHETYPES
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1. Cheapest Option */}
        <div className="p-4 rounded-xl bg-[#F4F9FD] border border-rose-200 flex flex-col justify-between space-y-3 shadow-2xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#58708A] font-bold">Cheapest Route</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200 font-bold">
                HIGH RISK
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono text-[#16324F] mt-1">
              {costOptimized.name.split(":")[1] || costOptimized.name}
            </h4>
            <div className="mt-2 text-2xl font-bold font-mono text-[#D97706]">
              ${costOptimized.weightedLandedCostUsd} <span className="text-xs text-[#58708A] font-normal">/ bbl</span>
            </div>
            <p className="text-[11px] text-[#58708A] font-sans mt-2 leading-relaxed">
              Maximizes discounted Russian Urals and Basrah Heavy barrels via legacy corridors at higher risk of secondary sanctions and chokepoint delays.
            </p>
          </div>

          <div className="pt-2.5 border-t border-[#D5E5F1] text-[10px] font-mono text-[#58708A] flex justify-between font-semibold">
            <span>Score: <b className="text-rose-700">{costOptimized.strategyScore}</b></span>
            <span>Hormuz Share: <b className="text-[#16324F]">{costOptimized.hormuzSharePct}%</b></span>
          </div>
        </div>

        {/* 2. Recommended Balanced Option */}
        <div className="p-4 rounded-xl bg-[#EFF8FF] border border-[#B9DDF5] shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#0B2540] font-bold">Recommended Standard</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD] font-bold">
                BALANCED RESILIENCE
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono text-[#16324F] mt-1">
              {balanced.name.split(":")[1] || balanced.name}
            </h4>
            <div className="mt-2 text-2xl font-bold font-mono text-[#0284c7]">
              ${balanced.weightedLandedCostUsd} <span className="text-xs text-[#58708A] font-normal">/ bbl</span>
            </div>
            <p className="text-[11px] text-[#16324F] font-sans mt-2 leading-relaxed">
              Optimum Pareto equilibrium: rebalances liftings to UAE Fujairah deepwater terminal, West Africa, and US Gulf while managing freight premiums.
            </p>
          </div>

          <div className="pt-2.5 border-t border-[#B9DDF5] text-[10px] font-mono text-[#58708A] flex justify-between font-semibold">
            <span>Score: <b className="text-[#0284c7]">{balanced.strategyScore}</b></span>
            <span>Hormuz Share: <b className="text-[#16324F]">{balanced.hormuzSharePct}%</b></span>
          </div>
        </div>

        {/* 3. Most Resilient Option */}
        <div className="p-4 rounded-xl bg-[#F4F9FD] border border-emerald-200 flex flex-col justify-between space-y-3 shadow-2xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold">Maximum Immunity</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
                LOW RISK
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono text-[#16324F] mt-1">
              {maxResilience.name.split(":")[1] || maxResilience.name}
            </h4>
            <div className="mt-2 text-2xl font-bold font-mono text-[#16324F]">
              ${maxResilience.weightedLandedCostUsd} <span className="text-xs text-[#58708A] font-normal">/ bbl</span>
            </div>
            <p className="text-[11px] text-[#58708A] font-sans mt-2 leading-relaxed">
              Eliminates Persian Gulf and Red Sea chokepoint transit entirely, sourcing 100% via open ocean routes with elevated transit lead-times.
            </p>
          </div>

          <div className="pt-2.5 border-t border-[#D5E5F1] text-[10px] font-mono text-[#58708A] flex justify-between font-semibold">
            <span>Score: <b className="text-emerald-700">{maxResilience.strategyScore}</b></span>
            <span>Hormuz Share: <b className="text-[#16324F]">{maxResilience.hormuzSharePct}%</b></span>
          </div>
        </div>

      </div>

    </div>
  );
}
