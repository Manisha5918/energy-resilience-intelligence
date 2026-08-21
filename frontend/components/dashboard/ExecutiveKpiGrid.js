"use client";

import { 
  ShieldIcon, 
  ActivityIcon, 
  GlobeIcon, 
  AnchorIcon, 
  DatabaseIcon, 
  AlertTriangleIcon,
  ZapIcon,
  InfoIcon
} from "@/components/ui/Icons";
import { SIMULATED_NATIONAL_ENERGY_METRICS } from "@/lib/reserveData";
import { SIMULATED_CORRIDOR_METRICS } from "@/lib/riskData";

export default function ExecutiveKpiGrid({
  resilienceResult,
  onOpenExplainModal,
  crudePrices,
  reserveSummary
}) {
  const { resilienceScore, supplyRiskIndex, riskAssessment, factors } = resilienceResult;
  const hormuzCorridor = SIMULATED_CORRIDOR_METRICS.find((c) => c.id === "hormuz") || SIMULATED_CORRIDOR_METRICS[0];
  const freightMultiplier = hormuzCorridor.freightIndex.split(" ")[0] || "1.42x";

  // Circular gauge calculations (circumference for radius 36)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (resilienceScore / 100) * circumference;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. DOMINANT CARD: Energy Resilience Score with Circular Gauge */}
      <div 
        onClick={onOpenExplainModal}
        className="command-card rounded-xl p-5 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer relative overflow-hidden group shadow-lg bg-gradient-to-br from-[#0c1424] to-[#080d16] md:col-span-2 flex flex-col justify-between"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
                <ShieldIcon className="w-4 h-4 text-cyan-400" />
                OVERALL ENERGY RESILIENCE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Composite index calculating India&apos;s crude oil import security across geopolitical, shipping, and strategic reserve vectors.
            </p>
          </div>
          
          <button 
            type="button"
            className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900 px-2 py-1 rounded border border-cyan-700/60 transition-colors"
          >
            <InfoIcon className="w-3 h-3" />
            <span>Why {resilienceScore}?</span>
          </button>
        </div>

        <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-5">
            {/* SVG Circular Gauge */}
            <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 96 96">
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke={riskAssessment.accentColor}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-mono tracking-tight text-white">
                  {resilienceScore}
                </span>
                <span className="text-[9px] font-mono text-slate-400">/ 100</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${riskAssessment.badgeClass}`}>
                  {riskAssessment.level} RESILIENCE
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-1.5">
                {riskAssessment.description}
              </p>
              <div className="text-[10px] font-mono text-slate-500 mt-1">
                Click card to inspect transparent calculation formula →
              </div>
            </div>
          </div>
        </div>

        {/* Safety watermark */}
        <div className="text-[9px] font-mono text-slate-500 text-right mt-2">
          [SIMULATED MODEL OUTPUT]
        </div>
      </div>

      {/* 2. Supply Risk Score */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ActivityIcon className="w-3.5 h-3.5 text-amber-400" />
              Supply Risk Index
            </span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800">
              ELEVATED
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-100">{supplyRiskIndex}%</span>
            <span className="text-xs text-slate-400 font-mono">disruption exposure</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
            <div 
              className="bg-amber-500 h-1.5 rounded-full" 
              style={{ width: `${Math.min(100, supplyRiskIndex)}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
          Evaluated against {SIMULATED_NATIONAL_ENERGY_METRICS.dailyNetImportRequirementMbd} MBD daily net import demand.
          <div className="text-[9px] font-mono text-slate-500 mt-1">DERIVED CANONICAL METRIC</div>
        </div>
      </div>

      {/* 3. Geopolitical Risk Score */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <GlobeIcon className="w-3.5 h-3.5 text-rose-400" />
              Geopolitical Risk
            </span>
            <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800">
              HIGH ({factors.geopolitical}/100)
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-100">{factors.geopolitical}</span>
            <span className="text-xs text-rose-400 font-mono">+4.2% weekly drift</span>
          </div>
          <p className="text-xs text-slate-300 mt-2">
            Elevated threat in Bab-el-Mandeb & Hormuz naval exercises.
          </p>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-800/80 text-[9px] font-mono text-slate-500">
          5 ACTIVE SIMULATED THREAT VECTORS
        </div>
      </div>

      {/* 4. Maritime & Logistics Risk */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <AnchorIcon className="w-3.5 h-3.5 text-cyan-400" />
              Maritime Logistics
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800">
              {factors.logistics}/100
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-100">{freightMultiplier}</span>
            <span className="text-xs text-slate-400 font-mono">freight surcharge</span>
          </div>
          <p className="text-xs text-slate-300 mt-2">
            VLCC tanker transit delays averaging +1.8 days on Persian Gulf routes.
          </p>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-800/80 text-[9px] font-mono text-slate-500">
          ILLUSTRATIVE CHOKEPOINT METRIC
        </div>
      </div>

      {/* 5. Crude Price Volatility Indicator */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ZapIcon className="w-3.5 h-3.5 text-amber-400" />
              Brent Volatility
            </span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800">
              {crudePrices.volatilityStatus}
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-100">
              ${crudePrices.spotPriceUsd}
            </span>
            <span className="text-xs text-rose-400 font-mono font-semibold">
              +{crudePrices.dailyChangePct}%
            </span>
          </div>
          <div className="text-xs text-slate-300 mt-2">
            Indian Basket est. <span className="font-mono text-white font-medium">${crudePrices.indianBasketEstimatedUsd}/bbl</span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-800/80 text-[9px] font-mono text-slate-500">
          SIMULATED BENCHMARK FEED
        </div>
      </div>

      {/* 6. Strategic Reserve Status (SPR) */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <DatabaseIcon className="w-3.5 h-3.5 text-emerald-400" />
              Strategic Reserve (SPR)
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
              {reserveSummary.sprUtilizationPct}% FILL
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-100">
              {reserveSummary.sprDaysCover}
            </span>
            <span className="text-xs text-slate-400 font-mono">days SPR cover</span>
          </div>
          <div className="text-xs text-slate-300 mt-2">
            Total SPR + Commercial: <span className="font-mono text-emerald-300 font-semibold">{reserveSummary.totalCombinedCoverDays} days</span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-800/80 text-[9px] font-mono text-slate-500">
          STATUTORY ISPRL + OMC INVENTORY
        </div>
      </div>

      {/* 7. Import Dependency */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <AlertTriangleIcon className="w-3.5 h-3.5 text-rose-400" />
              Import Dependency
            </span>
            <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800">
              CRITICAL
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-100">
              {SIMULATED_NATIONAL_ENERGY_METRICS.crudeImportDependencyPct}%
            </span>
            <span className="text-xs text-slate-400 font-mono">of consumption</span>
          </div>
          <p className="text-xs text-slate-300 mt-2">
            Domestic production supplies ~{SIMULATED_NATIONAL_ENERGY_METRICS.domesticCrudeProductionMbd} MBD of total {SIMULATED_NATIONAL_ENERGY_METRICS.nationalDailyConsumptionMbd} MBD demand.
          </p>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-800/80 text-[9px] font-mono text-slate-500">
          PPAC OFFICIAL CANONICAL DATASET
        </div>
      </div>

      {/* 8. Critical Corridor Status */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <AnchorIcon className="w-3.5 h-3.5 text-amber-400" />
              Critical Corridor
            </span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800">
              {hormuzCorridor.name.toUpperCase().replace("STRAIT OF ", "")} {hormuzCorridor.shareOfImports}%
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-amber-400">{hormuzCorridor.volumeMbd}</span>
            <span className="text-xs text-slate-400 font-mono">MBD transiting</span>
          </div>
          <p className="text-xs text-slate-300 mt-2">
            Strait of Hormuz is India&apos;s primary single-point chokepoint risk.
          </p>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-800/80 text-[9px] font-mono text-slate-500">
          CHOKEPOINT CONCENTRATION
        </div>
      </div>

    </div>
  );
}
