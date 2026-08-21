"use client";

import { ShieldIcon, ZapIcon, ActivityIcon } from "@/components/ui/Icons";

export default function TradeoffAnalysis({ strategies }) {
  const balanced = strategies.find((s) => s.type === "Balanced") || strategies[0];
  const maxResilience = strategies.find((s) => s.type === "Maximum Resilience") || strategies[1] || strategies[0];
  const costOptimized = strategies.find((s) => s.type === "Cost Optimized") || strategies[2] || strategies[0];

  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ZapIcon className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Strategic Trade-Off Frontier (Cost vs. Resilience)
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300">
              PARETO OPTIMALITY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Explicitly illustrates the economic premium required to achieve chokepoint immunity vs legacy exposure.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          3 STRATEGIC ARCHETYPES
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1. Cheapest Option */}
        <div className="p-4 rounded-xl bg-[#120a0d] border border-rose-900/60 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Cheapest Route</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                HIGH RISK
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono text-slate-100 mt-1">
              {costOptimized.name.split(":")[1] || costOptimized.name}
            </h4>
            <div className="mt-2 text-2xl font-bold font-mono text-amber-300">
              ${costOptimized.weightedLandedCostUsd} <span className="text-xs text-slate-400 font-normal">/ bbl</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans mt-2 leading-relaxed">
              Maximizes discounted Russian Urals and Basrah Heavy barrels via legacy corridors at higher risk of secondary sanctions and chokepoint delays.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex justify-between">
            <span>Score: <b className="text-rose-400">{costOptimized.strategyScore}</b></span>
            <span>Hormuz Share: <b>{costOptimized.hormuzSharePct}%</b></span>
          </div>
        </div>

        {/* 2. Recommended Balanced Option */}
        <div className="p-4 rounded-xl bg-[#091522] border border-cyan-500 shadow-md ring-1 ring-cyan-500/40 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Recommended Standard</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
                BALANCED RESILIENCE
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono text-white mt-1">
              {balanced.name.split(":")[1] || balanced.name}
            </h4>
            <div className="mt-2 text-2xl font-bold font-mono text-cyan-300">
              ${balanced.weightedLandedCostUsd} <span className="text-xs text-slate-400 font-normal">/ bbl</span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans mt-2 leading-relaxed">
              Optimum Pareto equilibrium: rebalances liftings to UAE Fujairah deepwater terminal, West Africa, and US Gulf while managing freight premiums.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex justify-between">
            <span>Score: <b className="text-cyan-400">{balanced.strategyScore}</b></span>
            <span>Hormuz Share: <b>{balanced.hormuzSharePct}%</b></span>
          </div>
        </div>

        {/* 3. Most Resilient Option */}
        <div className="p-4 rounded-xl bg-[#07131a] border border-emerald-900/60 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Maximum Immunity</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                LOW RISK
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono text-slate-100 mt-1">
              {maxResilience.name.split(":")[1] || maxResilience.name}
            </h4>
            <div className="mt-2 text-2xl font-bold font-mono text-emerald-300">
              ${maxResilience.weightedLandedCostUsd} <span className="text-xs text-slate-400 font-normal">/ bbl</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans mt-2 leading-relaxed">
              100% bypass of Hormuz and Red Sea via Atlantic open ocean and Fujairah pipeline. Incurs higher bunker charter cost for guaranteed security.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex justify-between">
            <span>Score: <b className="text-emerald-400">{maxResilience.strategyScore}</b></span>
            <span>Hormuz Share: <b>0%</b></span>
          </div>
        </div>

      </div>

    </div>
  );
}
