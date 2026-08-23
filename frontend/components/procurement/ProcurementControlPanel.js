"use client";

import { SlidersIcon, RefreshCwIcon, ZapIcon, InfoIcon, ShieldIcon } from "@/components/ui/Icons";
import { SIMULATED_SCENARIOS } from "@/lib/scenarioData";

export default function ProcurementControlPanel({
  selectedScenarioId,
  onSelectScenario,
  targetSupplyGapMbd,
  onChangeSupplyGap,
  riskTolerance,
  onChangeRiskTolerance,
  budgetPriority,
  onChangeBudgetPriority,
  planningHorizonDays,
  onChangePlanningHorizon,
  onRunAnalysis,
  onReset
}) {
  return (
    <div className="command-card rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-5 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-5 h-5 text-sky-600" />
            <h2 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Adaptive Procurement Optimization Console
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              HEURISTIC DECISION ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Rebalances sovereign crude liftings and maritime routes to maximize national resilience against active supply shocks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-mono transition-colors cursor-pointer shadow-sm"
          >
            <RefreshCwIcon className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>

          <button
            onClick={onRunAnalysis}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <ZapIcon className="w-4 h-4" />
            <span>Run Optimization</span>
          </button>
        </div>
      </div>

      {/* Configuration Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* 1. Scenario Context Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Scenario Ingestion Context
          </label>
          <select
            value={selectedScenarioId}
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

        {/* 2. Supply Replacement Gap Target */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-slate-600 font-medium">Target Supply Gap</span>
            <span className="text-rose-600 font-bold">{targetSupplyGapMbd} MBD</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.5"
            step="0.1"
            value={targetSupplyGapMbd}
            onChange={(e) => onChangeSupplyGap(Number(e.target.value))}
            className="w-full accent-rose-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-slate-400">
            <span>0.5 MBD</span>
            <span>2.0 MBD</span>
            <span>3.5 MBD</span>
          </div>
        </div>

        {/* 3. Risk Tolerance Tier */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Risk Tolerance
          </label>
          <div className="grid grid-cols-3 gap-1">
            {["Low", "Medium", "High"].map((r) => {
              const isSelected = riskTolerance === r;
              return (
                <button
                  key={r}
                  onClick={() => onChangeRiskTolerance(r)}
                  className={`py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer text-center ${
                    isSelected
                      ? "bg-sky-600 text-white border border-sky-600 font-bold shadow-sm"
                      : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Budget & Cost Priority */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Optimization Priority
          </label>
          <div className="grid grid-cols-3 gap-1">
            {["Cost", "Balanced", "Resilience"].map((b) => {
              const isSelected = budgetPriority === b;
              return (
                <button
                  key={b}
                  onClick={() => onChangeBudgetPriority(b)}
                  className={`py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer text-center ${
                    isSelected
                      ? "bg-slate-900 text-white font-bold shadow-sm"
                      : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {b}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Planning Horizon */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Planning Horizon
          </label>
          <div className="grid grid-cols-4 gap-1">
            {[7, 15, 30, 60].map((d) => {
              const isSelected = Number(planningHorizonDays) === d;
              return (
                <button
                  key={d}
                  onClick={() => onChangePlanningHorizon(d)}
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

      </div>

    </div>
  );
}
