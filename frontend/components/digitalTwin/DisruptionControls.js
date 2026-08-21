"use client";

import Link from "next/link";
import { SlidersIcon, RefreshCwIcon, ZapIcon, ShieldIcon } from "@/components/ui/Icons";
import { SIMULATED_SCENARIOS } from "@/lib/scenarioData";

export default function DisruptionControls({
  scenarioId,
  onSelectScenario,
  durationDays,
  onChangeDuration,
  severity,
  onChangeSeverity,
  timelineDay,
  onChangeTimelineDay,
  onReset
}) {
  return (
    <div className="command-card rounded-2xl p-5 border border-slate-800 space-y-4 bg-gradient-to-b from-[#0f1626] to-[#080d16]">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <SlidersIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Disruption Simulation & Timeline Console
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              CROSS-CORRIDOR INJECTION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Inject synthetic shocks to observe supply cascade dynamics, port chokepoints, and refinery feedstock starvation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
          >
            <RefreshCwIcon className="w-3.5 h-3.5" />
            <span>Reset Steady-State</span>
          </button>

          <Link
            href={`/procurement?scenario=${scenarioId}`}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <ShieldIcon className="w-3.5 h-3.5" />
            <span>Optimize Procurement Plan →</span>
          </Link>
        </div>
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* 1. Scenario Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
            Disruption Scenario
          </label>
          <select
            value={scenarioId}
            onChange={(e) => onSelectScenario(e.target.value)}
            className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="current-conditions">Baseline Operations (Steady-State)</option>
            {SIMULATED_SCENARIOS.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.name} ({sc.supplyDisruptionPercent}% Deficit)
              </option>
            ))}
          </select>
        </div>

        {/* 2. Duration Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
            Disruption Duration
          </label>
          <div className="grid grid-cols-4 gap-1">
            {[7, 15, 30, 60].map((d) => {
              const isSelected = Number(durationDays) === d;
              return (
                <button
                  key={d}
                  onClick={() => onChangeDuration(d)}
                  className={`py-2 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer text-center ${
                    isSelected
                      ? "bg-cyan-950 text-cyan-300 border border-cyan-600 font-bold"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {d}d
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Severity Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
            Impact Severity
          </label>
          <div className="grid grid-cols-3 gap-1">
            {["low", "moderate", "severe"].map((s) => {
              const isSelected = severity === s;
              return (
                <button
                  key={s}
                  onClick={() => onChangeSeverity(s)}
                  className={`py-2 rounded-lg text-xs font-mono font-medium uppercase transition-colors cursor-pointer text-center ${
                    isSelected
                      ? "bg-rose-950 text-rose-300 border border-rose-600 font-bold"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Timeline Scrubber (Day 0 to 60) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
            Timeline Progression: <b className="text-cyan-300">Day {timelineDay}</b>
          </label>
          <div className="grid grid-cols-5 gap-1">
            {[0, 7, 15, 30, 60].map((t) => {
              const isSelected = Number(timelineDay) === t;
              return (
                <button
                  key={t}
                  onClick={() => onChangeTimelineDay(t)}
                  className={`py-2 rounded-lg text-[10px] font-mono font-medium transition-colors cursor-pointer text-center ${
                    isSelected
                      ? "bg-slate-100 text-slate-950 font-bold shadow-sm"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  D{t}
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
