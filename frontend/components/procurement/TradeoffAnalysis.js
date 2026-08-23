"use client";

import { ShieldIcon, ZapIcon, ActivityIcon } from "@/components/ui/Icons";

export default function TradeoffAnalysis({ strategies }) {
  const balanced = strategies.find((s) => s.type === "Balanced") || strategies[0];
  const maxResilience = strategies.find((s) => s.type === "Maximum Resilience") || strategies[1] || strategies[0];
  const costOptimized = strategies.find((s) => s.type === "Cost Optimized") || strategies[2] || strategies[0];

  return (
    <div className="command-card rounded-xl p-5 border border-slate-200 bg-white shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ZapIcon className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-semibold text-slate-900 font-heading tracking-wide">
              Strategic Trade-Off Frontier (Cost vs. Resilience)
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
              PARETO OPTIMALITY
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Explicitly illustrates the economic premium required to achieve chokepoint immunity vs legacy exposure.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-500 font-semibold">
          3 STRATEGIC ARCHETYPES
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1. Cheapest Option */}
        <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-slate-600 font-bold">Cheapest Route</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200 font-bold">
                HIGH RISK
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono text-slate-900 mt-1">
              {costOptimized.name.split(":")[1] || costOptimized.name}
            </h4>
            <div className="mt-2 text-2xl font-bold font-mono text-amber-700">
              ${costOptimized.weightedLandedCostUsd} <span className="text-xs text-slate-500 font-normal">/ bbl</span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans mt-2 leading-relaxed">
              Maximizes discounted Russian Urals and Basrah Heavy barrels via legacy corridors at higher risk of secondary sanctions and chokepoint delays.
            </p>
          </div>

          <div className="pt-2 border-t border-rose-200/80 text-[10px] font-mono text-slate-600 flex justify-between">
            <span>Score: <b className="text-rose-700">{costOptimized.strategyScore}</b></span>
            <span>Hormuz Share: <b>{costOptimized.hormuzSharePct}%</b></span>
          </div>
        </div>

        {/* 2. Recommended Balanced Option */}
        <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-300 shadow-sm ring-1 ring-sky-300/60 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-sky-800 font-bold">Recommended Standard</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-300 font-bold">
                BALANCED RESILIENCE
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono text-slate-900 mt-1">
              {balanced.name.split(":")[1] || balanced.name}
            </h4>
            <div className="mt-2 text-2xl font-bold font-mono text-sky-700">
              ${balanced.weightedLandedCostUsd} <span className="text-xs text-slate-500 font-normal">/ bbl</span>
            </div>
            <p className="text-[11px] text-slate-700 font-sans mt-2 leading-relaxed">
              Optimum Pareto equilibrium: rebalances liftings to UAE Fujairah deepwater terminal, West Africa, and US Gulf while managing freight premiums.
            </p>
          </div>

          <div className="pt-2 border-t border-sky-200 text-[10px] font-mono text-slate-600 flex justify-between">
            <span>Score: <b className="text-sky-700">{balanced.strategyScore}</b></span>
            <span>Hormuz Share: <b>{balanced.hormuzSharePct}%</b></span>
          </div>
        </div>

        {/* 3. Most Resilient Option */}
        <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold">Maximum Immunity</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
                LOW RISK
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono text-slate-900 mt-1">
              {maxResilience.name.split(":")[1] || maxResilience.name}
            </h4>
            <div className="mt-2 text-2xl font-bold font-mono text-emerald-700">
              ${maxResilience.weightedLandedCostUsd} <span className="text-xs text-slate-500 font-normal">/ bbl</span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans mt-2 leading-relaxed">
              100% bypass of Hormuz and Red Sea via Atlantic open ocean and Fujairah pipeline. Incurs higher bunker charter cost for guaranteed security.
            </p>
          </div>

          <div className="pt-2 border-t border-emerald-200/80 text-[10px] font-mono text-slate-600 flex justify-between">
            <span>Score: <b className="text-emerald-700">{maxResilience.strategyScore}</b></span>
            <span>Hormuz Share: <b>0%</b></span>
          </div>
        </div>

      </div>

    </div>
  );
}
