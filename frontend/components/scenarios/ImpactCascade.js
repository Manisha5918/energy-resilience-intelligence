"use client";

import { ActivityIcon, ChevronRightIcon, ShieldIcon } from "@/components/ui/Icons";

export default function ImpactCascade({ simulationResult }) {
  const { 
    scenarioTemplate, 
    supplyImpact, 
    priceImpact, 
    freightImpact, 
    reserveImpact, 
    scenarioResilience 
  } = simulationResult;

  const cascadeSteps = [
    {
      step: 1,
      title: "Disruption Trigger",
      value: scenarioTemplate.name.split(" ")[0] + " Crisis",
      subtext: `${simulationResult.parameters.durationDays}d Horizon • ${simulationResult.parameters.severity}`,
      color: "border-rose-600 bg-rose-950/40 text-rose-300"
    },
    {
      step: 2,
      title: "Corridor Strain",
      value: `${scenarioTemplate.affectedCorridors.length || 1} Corridors`,
      subtext: "Chokepoint Congestion",
      color: "border-amber-600 bg-amber-950/40 text-amber-300"
    },
    {
      step: 3,
      title: "Supply Deficit",
      value: `-${supplyImpact.dailySupplyDeficitMbd} MBD`,
      subtext: `-${supplyImpact.disruptionPct}% Import Flow`,
      color: "border-rose-600 bg-rose-950/40 text-rose-400"
    },
    {
      step: 4,
      title: "Logistics Surcharge",
      value: `${freightImpact.freightMultiplier}x Index`,
      subtext: `+${freightImpact.freightImpactPct}% Freight Cost`,
      color: "border-cyan-600 bg-cyan-950/40 text-cyan-300"
    },
    {
      step: 5,
      title: "Crude Price Shock",
      value: `$${priceImpact.scenarioBrentUsd}/bbl`,
      subtext: `+${priceImpact.priceShockPct}% Landed Spike`,
      color: "border-amber-600 bg-amber-950/40 text-amber-300"
    },
    {
      step: 6,
      title: "Refinery Buffer Strain",
      value: "6 Units Exposed",
      subtext: "Run Cuts & Logistics Pivot",
      color: "border-purple-600 bg-purple-950/40 text-purple-300"
    },
    {
      step: 7,
      title: "SPR Cavern Draw",
      value: `${reserveImpact.scenarioSprDaysCover} Days Cover`,
      subtext: `${reserveImpact.sprPressureLevel} Drawdown Rate`,
      color: "border-emerald-600 bg-emerald-950/40 text-emerald-300"
    },
    {
      step: 8,
      title: "Resilience Score",
      value: `${scenarioResilience.resilienceScore}/100`,
      subtext: `${scenarioResilience.riskAssessment.level} Risk`,
      color: "border-rose-500 bg-rose-950/60 text-white"
    }
  ];

  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Disruption Transmission & Impact Cascade
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              CAUSE-AND-EFFECT PIPELINE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Deterministic sequence tracing how initial geopolitical and chokepoint friction propagates across national supply lines.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-500">
          8-STAGE TRANSMISSION
        </div>
      </div>

      {/* Cascade Flow Line */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-1">
        {cascadeSteps.map((step, idx) => (
          <div key={step.step} className="relative flex flex-col justify-between">
            <div className={`p-3 rounded-xl border ${step.color} flex flex-col justify-between h-full space-y-2 shadow-sm`}>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase text-slate-400">Step 0{step.step}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-75"></span>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase font-semibold text-slate-300">
                  {step.title}
                </div>
                <div className="text-xs font-bold font-mono mt-0.5 truncate">
                  {step.value}
                </div>
              </div>

              <div className="text-[9px] text-slate-400 font-mono pt-1 border-t border-slate-700/50 truncate">
                {step.subtext}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
