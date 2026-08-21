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
    <div className="command-card rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-5 bg-gradient-to-b from-[#0e1626] to-[#090e18]">
      
      {/* Top Header & Preset Pills */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <SlidersIcon className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-semibold text-slate-100 font-mono tracking-wide">
              Disruption Simulation Console
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              INTERACTIVE SCENARIO CONTROLS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure stress parameters or select a calibrated geopolitical disruption archetype.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
          >
            <RefreshCwIcon className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>

          <button
            onClick={onRunSimulation}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <ZapIcon className="w-4 h-4" />
            <span>Run Simulation</span>
          </button>
        </div>
      </div>

      {/* Preset Scenario Selector Buttons */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
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
                    ? "bg-cyan-950/70 border-cyan-500 text-white shadow-sm ring-1 ring-cyan-500/50"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <span className="text-[9px] font-mono uppercase text-cyan-400 font-bold block">
                  {sc.category}
                </span>
                <span className="text-xs font-mono font-medium truncate block mt-1">
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
      <div className="p-3.5 rounded-xl bg-[#060a12] border border-cyan-900/40 text-xs text-slate-300 font-sans flex items-start gap-2.5">
        <InfoIcon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-mono font-semibold text-cyan-300 mr-1.5">
            {currentScenario.name}:
          </span>
          <span className="leading-relaxed text-slate-300">
            {currentScenario.description}
          </span>
        </div>
      </div>

      {/* Configuration Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-1">
        
        {/* 1. Severity Selector */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
            Severity Level
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {["Low", "Moderate", "Severe"].map((sev) => {
              const isSelected = severity === sev;
              return (
                <button
                  key={sev}
                  onClick={() => onChangeSeverity(sev)}
                  className={`py-2 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer text-center ${
                    isSelected
                      ? sev === "Severe"
                        ? "bg-rose-950 text-rose-300 border border-rose-600 font-bold"
                        : sev === "Moderate"
                        ? "bg-amber-950 text-amber-300 border border-amber-600 font-bold"
                        : "bg-cyan-950 text-cyan-300 border border-cyan-600 font-bold"
                      : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200"
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
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
            Duration Horizon
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
                      ? "bg-slate-100 text-slate-950 font-bold shadow-sm"
                      : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {d}d
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Supply Disruption Slider */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-slate-400">Supply Disruption</span>
            <span className="text-rose-400 font-bold">{supplyDisruptionPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="80"
            step="5"
            value={supplyDisruptionPercent}
            onChange={(e) => onChangeSupplyDisruption(Number(e.target.value))}
            className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-slate-500">
            <span>0%</span>
            <span>40%</span>
            <span>80%</span>
          </div>
        </div>

        {/* 4. Price Shock Slider */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-slate-400">Brent Price Shock</span>
            <span className="text-amber-400 font-bold">+{priceShockPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="60"
            step="2"
            value={priceShockPercent}
            onChange={(e) => onChangePriceShock(Number(e.target.value))}
            className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-slate-500">
            <span>+0%</span>
            <span>+30%</span>
            <span>+60%</span>
          </div>
        </div>

        {/* 5. Freight Surcharge Slider */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-slate-400">Freight Increase</span>
            <span className="text-cyan-400 font-bold">+{freightImpactPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={freightImpactPercent}
            onChange={(e) => onChangeFreightImpact(Number(e.target.value))}
            className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-slate-500">
            <span>+0%</span>
            <span>+50%</span>
            <span>+100%</span>
          </div>
        </div>

      </div>

    </div>
  );
}
