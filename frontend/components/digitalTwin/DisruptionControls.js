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
    <div className="command-card rounded-2xl p-5 border border-slate-200 space-y-4 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <SlidersIcon className="w-4 h-4 text-sky-600" />
            <h3 className="text-sm font-semibold text-slate-900 font-heading tracking-wide">
              Disruption Simulation & Timeline Console
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              CROSS-CORRIDOR INJECTION
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Inject synthetic shocks to observe supply cascade dynamics, port chokepoints, and refinery feedstock starvation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-mono transition-colors cursor-pointer shadow-sm"
          >
            <RefreshCwIcon className="w-3.5 h-3.5" />
            <span>Reset Steady-State</span>
          </button>

          <Link
            href={`/procurement?scenario=${scenarioId}`}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer"
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
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Disruption Scenario
          </label>
          <select
            value={scenarioId}
            onChange={(e) => onSelectScenario(e.target.value)}
            className="w-full py-2 px-3 rounded-lg bg-slate-50 border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white cursor-pointer shadow-sm"
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
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Disruption Duration
          </label>
          <div className="grid grid-cols-4 gap-1">
            {[7, 15, 30, 60].map((d) => {
              const isSelected = Number(durationDays) === d;
              return (
                <button
                  key={d}
                  onClick={() => onChangeDuration(d)}
                  className={`py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer text-center ${
                    isSelected
                      ? "bg-sky-600 text-white border border-sky-600 font-bold shadow-sm"
                      : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
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
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Impact Severity
          </label>
          <div className="grid grid-cols-3 gap-1">
            {["low", "moderate", "severe"].map((s) => {
              const isSelected = severity === s;
              return (
                <button
                  key={s}
                  onClick={() => onChangeSeverity(s)}
                  className={`py-2 rounded-lg text-xs font-mono font-medium uppercase transition-all cursor-pointer text-center ${
                    isSelected
                      ? "bg-rose-600 text-white border border-rose-600 font-bold shadow-sm"
                      : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
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
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Timeline Progression: <b className="text-sky-700">Day {timelineDay}</b>
          </label>
          <div className="grid grid-cols-5 gap-1">
            {[0, 7, 15, 30, 60].map((t) => {
              const isSelected = Number(timelineDay) === t;
              return (
                <button
                  key={t}
                  onClick={() => onChangeTimelineDay(t)}
                  className={`py-2 rounded-lg text-[10px] font-mono font-medium transition-all cursor-pointer text-center ${
                    isSelected
                      ? "bg-slate-900 text-white font-bold shadow-sm"
                      : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
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
