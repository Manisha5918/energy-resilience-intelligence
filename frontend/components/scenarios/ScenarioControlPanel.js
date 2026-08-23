"use client";

import { SlidersIcon, RefreshCwIcon, ZapIcon, InfoIcon } from "@/components/ui/Icons";
import { SIMULATED_SCENARIOS } from "@/lib/scenarioData";

export default function ScenarioControlPanel({
  selectedScenarioId,
  onSelectScenario,
  durationDays,
  onChangeDuration,
  severity,
  onChangeSeverity,
  supplyDisruptionPercent,
  onChangeSupplyDisruption,
  priceShockPercent,
  onChangePriceShock,
  freightImpactPercent,
  onChangeFreightImpact,
  onRunSimulation,
  onReset
}) {
  const currentScenario = SIMULATED_SCENARIOS.find((s) => s.id === selectedScenarioId) || SIMULATED_SCENARIOS[0];

  return (
    <div className="command-card rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-5 bg-white shadow-sm">
      
      {/* Top Header & Preset Pills */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <SlidersIcon className="w-5 h-5 text-sky-600" />
            <h2 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Disruption Simulation Console
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              INTERACTIVE SCENARIO CONTROLS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure stress parameters or select a calibrated geopolitical disruption archetype.
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
            onClick={onRunSimulation}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <ZapIcon className="w-4 h-4" />
            <span>Run Simulation</span>
          </button>
        </div>
      </div>

      {/* Preset Scenario Selector Buttons */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
          Preset Disruption Scenarios
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {SIMULATED_SCENARIOS.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => onSelectScenario(sc.id)}
                className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-sky-50 border-sky-400 text-sky-950 shadow-xs ring-1 ring-sky-300 font-semibold"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span className="text-[9px] font-mono uppercase text-sky-700 font-bold block">
                  {sc.category}
                </span>
                <span className="text-xs font-mono font-medium truncate block mt-1 text-slate-900">
                  {sc.name.split(" ")[0]} {sc.name.split(" ")[1]}
                </span>
                <span className="text-[10px] text-slate-500 font-mono mt-1">
                  ~{sc.supplyDisruptionPercent}% Deficit
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scenario Description Banner */}
      <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-slate-700 font-sans flex items-start gap-2.5">
        <InfoIcon className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-mono font-semibold text-sky-900 mr-1.5">
            {currentScenario.name}:
          </span>
          <span className="leading-relaxed text-slate-700">
            {currentScenario.description}
          </span>
        </div>
      </div>

      {/* Configuration Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-1">
        
        {/* 1. Severity Selector */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Severity Level
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {["Low", "Moderate", "Severe"].map((sev) => {
              const isSelected = severity === sev;
              return (
                <button
                  key={sev}
                  onClick={() => onChangeSeverity(sev)}
                  className={`py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer text-center ${
                    isSelected
                      ? sev === "Severe"
                        ? "bg-rose-600 text-white border border-rose-600 font-bold shadow-sm"
                        : sev === "Moderate"
                        ? "bg-amber-600 text-white border border-amber-600 font-bold shadow-sm"
                        : "bg-sky-600 text-white border border-sky-600 font-bold shadow-sm"
                      : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {sev}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Duration Selector */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Duration Horizon
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
                      ? "bg-slate-900 text-white font-bold shadow-sm"
                      : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {d}d
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Supply Disruption Slider */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-slate-600 font-medium">Supply Disruption</span>
            <span className="text-rose-600 font-bold">{supplyDisruptionPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="80"
            step="5"
            value={supplyDisruptionPercent}
            onChange={(e) => onChangeSupplyDisruption(Number(e.target.value))}
            className="w-full accent-rose-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-slate-400">
            <span>0%</span>
            <span>40%</span>
            <span>80%</span>
          </div>
        </div>

        {/* 4. Price Shock Slider */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-slate-600 font-medium">Brent Price Shock</span>
            <span className="text-amber-700 font-bold">+{priceShockPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="60"
            step="2"
            value={priceShockPercent}
            onChange={(e) => onChangePriceShock(Number(e.target.value))}
            className="w-full accent-amber-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-slate-400">
            <span>+0%</span>
            <span>+30%</span>
            <span>+60%</span>
          </div>
        </div>

        {/* 5. Freight Surcharge Slider */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-slate-600 font-medium">Freight Increase</span>
            <span className="text-sky-700 font-bold">+{freightImpactPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={freightImpactPercent}
            onChange={(e) => onChangeFreightImpact(Number(e.target.value))}
            className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-slate-400">
            <span>+0%</span>
            <span>+50%</span>
            <span>+100%</span>
          </div>
        </div>

      </div>

    </div>
  );
}
