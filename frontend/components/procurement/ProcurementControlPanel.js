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
    <div className="rounded-2xl p-6 sm:p-8 border border-[#C7E3F7] space-y-5 bg-white shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#D5E5F1] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-5 h-5 text-[#0284c7]" />
            <h2 className="text-base sm:text-lg font-bold text-[#16324F] font-heading tracking-tight">
              Adaptive Procurement Optimization Console
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] font-bold">
              HEURISTIC DECISION ENGINE
            </span>
          </div>
          <p className="text-xs text-[#58708A] mt-1 font-sans">
            Rebalances sovereign crude liftings and maritime routes to maximize national resilience against active supply shocks.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>LIVE REACTIVE OPTIMIZATION</span>
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#C7E3F7] bg-white hover:bg-[#F4F9FD] text-[#16324F] text-xs font-mono transition-colors cursor-pointer shadow-2xs font-semibold"
          >
            <RefreshCwIcon className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* Configuration Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* 1. Scenario Context Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#58708A] font-bold block">
            Scenario Ingestion Context
          </label>
          <select
            value={selectedScenarioId}
            onChange={(e) => onSelectScenario(e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] text-xs font-mono text-[#16324F] font-semibold focus:outline-none focus:border-[#0284c7] focus:bg-white cursor-pointer shadow-2xs"
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
        <div className="space-y-1.5 p-3 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] shadow-2xs">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-[#58708A] font-semibold">Target Supply Gap</span>
            <span className="text-[#FF3D6E] font-bold">{targetSupplyGapMbd} MBD</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.5"
            step="0.1"
            value={targetSupplyGapMbd}
            onChange={(e) => onChangeSupplyGap(Number(e.target.value))}
            className="w-full accent-[#FF3D6E] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-[#58708A]">
            <span>0.5 MBD</span>
            <span>2.0 MBD</span>
            <span>3.5 MBD</span>
          </div>
        </div>

        {/* 3. Risk Tolerance Tier */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#58708A] font-bold block">
            Risk Tolerance
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {["Low", "Medium", "High"].map((r) => {
              const isSelected = riskTolerance === r;
              return (
                <button
                  key={r}
                  onClick={() => onChangeRiskTolerance(r)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer text-center ${
                    isSelected
                      ? "bg-[#0284c7] text-white border border-[#0284c7] shadow-xs"
                      : "bg-[#F4F9FD] border border-[#C7E3F7] text-[#16324F] hover:bg-[#EEF7FF]"
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
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#58708A] font-bold block">
            Optimization Priority
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {["Cost", "Balanced", "Resilience"].map((b) => {
              const isSelected = budgetPriority === b;
              return (
                <button
                  key={b}
                  onClick={() => onChangeBudgetPriority(b)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer text-center ${
                    isSelected
                      ? "bg-[#0B2540] text-white border border-[#0B2540] shadow-xs"
                      : "bg-[#F4F9FD] border border-[#C7E3F7] text-[#16324F] hover:bg-[#EEF7FF]"
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
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#58708A] font-bold block">
            Planning Horizon
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {[7, 15, 30, 60].map((d) => {
              const isSelected = Number(planningHorizonDays) === d;
              return (
                <button
                  key={d}
                  onClick={() => onChangePlanningHorizon(d)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer text-center ${
                    isSelected
                      ? "bg-[#0284c7] text-white border border-[#0284c7] shadow-xs"
                      : "bg-[#F4F9FD] border border-[#C7E3F7] text-[#16324F] hover:bg-[#EEF7FF]"
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
