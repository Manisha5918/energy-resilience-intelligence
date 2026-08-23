"use client";

import { useState } from "react";
import Link from "next/link";
import { runScenario } from "@/lib/scenarioEngine";
import { SlidersIcon, ShieldIcon, ActivityIcon, AlertTriangleIcon, ChevronRightIcon } from "@/components/ui/Icons";

export default function ScenarioCascadeShowcase() {
  const [selectedDisruptionPct, setSelectedDisruptionPct] = useState(42);
  const [durationDays, setDurationDays] = useState(15);

  const simulation = runScenario({
    scenarioId: "hormuz-closure",
    supplyDisruptionPercent: selectedDisruptionPct,
    durationDays: durationDays
  });

  const { supplyImpact, reserveImpact, priceImpact, macroeconomicImpact, scenarioResilience, scoreDelta } = simulation;

  return (
    <section className="space-y-6" aria-label="Scenario Cascade Showcase">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-bold">
              END-TO-END CRISIS CASCADE SIMULATION
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white mt-1">
            Dynamic Disruption Propagation Engine
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-sans">
            See how a single chokepoint event cascades downstream through physical deficit, cavern withdrawal, landed cost inflation, and macroeconomic GDP growth drag.
          </p>
        </div>

        <Link
          href="/scenarios"
          className="px-4 py-2 min-h-[40px] rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-mono text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
        >
          <span>Open Full Simulator</span>
          <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </div>

      {/* Interactive Scenario Control Sliders */}
      <div className="p-5 rounded-2xl command-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono grid grid-cols-1 sm:grid-cols-2 gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-slate-600 dark:text-slate-400 font-semibold uppercase">1. Hormuz Disruption Severity:</span>
            <span className="text-sm font-bold text-rose-600 dark:text-rose-400 tabular-nums">{selectedDisruptionPct}% of Hormuz Flow</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={selectedDisruptionPct}
            onChange={(e) => setSelectedDisruptionPct(parseInt(e.target.value))}
            className="w-full accent-rose-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg transition-all"
            aria-label="Hormuz Disruption Percentage Slider"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Minor (10%)</span>
            <span>Severe (50%)</span>
            <span>Full Blockade (100%)</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-slate-600 dark:text-slate-400 font-semibold uppercase">2. Disruption Window Duration:</span>
            <span className="text-sm font-bold text-sky-700 dark:text-sky-400 tabular-nums">{durationDays} Days</span>
          </div>
          <input
            type="range"
            min="7"
            max="60"
            step="1"
            value={durationDays}
            onChange={(e) => setDurationDays(parseInt(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg transition-all"
            aria-label="Disruption Window Duration Slider"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>7 Days (Tactical)</span>
            <span>30 Days (Operational)</span>
            <span>60 Days (Strategic)</span>
          </div>
        </div>
      </div>

      {/* 6-Stage Visual Cascade Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 font-mono">
        
        {/* Step 1: Disruption */}
        <div className="p-4 rounded-xl command-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative space-y-2 shadow-xs hover:border-rose-300 transition-all">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase">
            <span className="font-bold">Stage 1</span>
            <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-800 font-bold border border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800/60">CHOKEPOINT</span>
          </div>
          <span className="text-xs text-slate-700 dark:text-slate-300 font-bold block">Disruption Shock</span>
          <div className="text-xl font-bold text-rose-600 dark:text-rose-400 tabular-nums">
            -{selectedDisruptionPct}%
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight">
            Hormuz Corridor transit offline
          </span>
        </div>

        {/* Step 2: Supply Gap */}
        <div className="p-4 rounded-xl command-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative space-y-2 shadow-xs hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase">
            <span className="font-bold">Stage 2</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800/60">DERIVED</span>
          </div>
          <span className="text-xs text-slate-700 dark:text-slate-300 font-bold block">Physical Supply Deficit</span>
          <div className="text-xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
            {supplyImpact.dailySupplyDeficitMbd} MBD
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight">
            {supplyImpact.cumulativeSupplyDeficitMbbl} MBBL cumulative shortfall
          </span>
        </div>

        {/* Step 3: Reserve Draw */}
        <div className="p-4 rounded-xl command-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative space-y-2 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase">
            <span className="font-bold">Stage 3</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800/60">ISPRL PUMP</span>
          </div>
          <span className="text-xs text-slate-700 dark:text-slate-300 font-bold block">Cavern Off-Take</span>
          <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
            {reserveImpact.estimatedDailyDrawdownMbd} MBD
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight">
            {reserveImpact.scenarioSprDaysCover} days remaining capacity
          </span>
        </div>

        {/* Step 4: Landed Price Impact */}
        <div className="p-4 rounded-xl command-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative space-y-2 shadow-xs hover:border-purple-300 transition-all">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase">
            <span className="font-bold">Stage 4</span>
            <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-800 font-bold border border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800/60">WAR-RISK</span>
          </div>
          <span className="text-xs text-slate-700 dark:text-slate-300 font-bold block">Landed Cost Shock</span>
          <div className="text-xl font-bold text-purple-700 dark:text-purple-400 tabular-nums">
            +${priceImpact.brentShockDeltaUsd}/bbl
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight">
            ${priceImpact.projectedBrentSpotUsd}/bbl Brent benchmark
          </span>
        </div>

        {/* Step 5: Macroeconomic Drag */}
        <div className="p-4 rounded-xl command-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative space-y-2 shadow-xs hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase">
            <span className="font-bold">Stage 5</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800/60">MODEL</span>
          </div>
          <span className="text-xs text-slate-700 dark:text-slate-300 font-bold block">GDP Growth Drag</span>
          <div className="text-xl font-bold text-amber-600 dark:text-amber-300 tabular-nums">
            -{macroeconomicImpact.metrics.gdpGrowthDragPct}%
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight">
            +${macroeconomicImpact.metrics.cadExpansionUsdB}B CAD expansion
          </span>
        </div>

        {/* Step 6: Resilience Score */}
        <div className="p-4 rounded-xl command-card bg-white dark:bg-slate-900 border border-sky-300 dark:border-cyan-800/70 relative space-y-2 shadow-xs hover:border-sky-500 transition-all">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase">
            <span className="font-bold">Stage 6</span>
            <span className="px-1.5 py-0.5 rounded bg-sky-50 text-sky-800 font-bold border border-sky-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800/60">COCKPIT</span>
          </div>
          <span className="text-xs text-sky-800 dark:text-cyan-400 font-bold block">Resilience Score</span>
          <div className="text-xl font-bold text-slate-900 dark:text-white flex items-baseline gap-1 tabular-nums">
            <span>{scenarioResilience.resilienceScore}</span>
            <span className="text-xs text-slate-500">/ 100</span>
          </div>
          <span className="text-[10px] text-rose-600 dark:text-rose-400 block leading-tight font-semibold">
            {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta} pts degradation
          </span>
        </div>

      </div>

    </section>
  );
}
