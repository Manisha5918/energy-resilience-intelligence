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
      color: "border-rose-200 bg-rose-50/70 text-rose-900",
      pill: "bg-rose-100 text-rose-800"
    },
    {
      step: 2,
      title: "Corridor Strain",
      value: `${scenarioTemplate.affectedCorridors.length || 1} Corridors`,
      subtext: "Chokepoint Congestion",
      color: "border-amber-200 bg-amber-50/70 text-amber-900",
      pill: "bg-amber-100 text-amber-800"
    },
    {
      step: 3,
      title: "Supply Deficit",
      value: `-${supplyImpact.dailySupplyDeficitMbd} MBD`,
      subtext: `-${supplyImpact.disruptionPct}% Import Flow`,
      color: "border-rose-200 bg-rose-50/70 text-rose-900",
      pill: "bg-rose-100 text-rose-800"
    },
    {
      step: 4,
      title: "Logistics Surcharge",
      value: `${freightImpact.freightMultiplier}x Index`,
      subtext: `+${freightImpact.freightImpactPct}% Freight Cost`,
      color: "border-sky-200 bg-sky-50/70 text-sky-900",
      pill: "bg-sky-100 text-sky-800"
    },
    {
      step: 5,
      title: "Crude Price Shock",
      value: `$${priceImpact.scenarioBrentUsd}/bbl`,
      subtext: `+${priceImpact.priceShockPct}% Landed Spike`,
      color: "border-amber-200 bg-amber-50/70 text-amber-900",
      pill: "bg-amber-100 text-amber-800"
    },
    {
      step: 6,
      title: "Refinery Strain",
      value: "6 Units Exposed",
      subtext: "Run Cuts & Logistics Pivot",
      color: "border-purple-200 bg-purple-50/70 text-purple-900",
      pill: "bg-purple-100 text-purple-800"
    },
    {
      step: 7,
      title: "SPR Cavern Draw",
      value: `${reserveImpact.scenarioSprDaysCover}d Cover`,
      subtext: `${reserveImpact.sprPressureLevel} Drawdown Rate`,
      color: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
      pill: "bg-emerald-100 text-emerald-800"
    },
    {
      step: 8,
      title: "Resilience Score",
      value: `${scenarioResilience.resilienceScore}/100`,
      subtext: `${scenarioResilience.riskAssessment.level} Risk`,
      color: "border-rose-300 bg-rose-100 text-rose-950 font-bold",
      pill: "bg-rose-200 text-rose-900 font-bold"
    }
  ];

  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 space-y-5 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Disruption Transmission & Impact Cascade
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              CAUSE-AND-EFFECT PIPELINE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Deterministic sequence tracing how initial geopolitical and chokepoint friction propagates across national supply lines.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500 font-semibold">
          8-STAGE TRANSMISSION
        </div>
      </div>

      {/* Cascade Flow Line */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-1">
        {cascadeSteps.map((step) => (
          <div key={step.step} className="relative flex flex-col justify-between">
            <div className={`p-3 rounded-xl border ${step.color} flex flex-col justify-between h-full space-y-2 shadow-xs`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Step 0{step.step}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse"></span>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase font-bold text-slate-700">
                  {step.title}
                </div>
                <div className="text-sm font-bold font-mono mt-0.5 truncate text-slate-900">
                  {step.value}
                </div>
              </div>

              <div className="text-[10px] text-slate-600 font-mono pt-1.5 border-t border-slate-200/80 truncate">
                {step.subtext}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
