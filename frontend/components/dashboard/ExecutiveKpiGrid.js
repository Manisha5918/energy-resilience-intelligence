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

  // Circular gauge calculations (circumference for radius 38)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (resilienceScore / 100) * circumference;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. DOMINANT CARD: Energy Resilience Score with Circular Gauge */}
      <div 
        onClick={onOpenExplainModal}
        className="rounded-2xl p-6 border border-[#C7E3F7] hover:border-sky-400 transition-all cursor-pointer relative overflow-hidden group shadow-xs bg-white md:col-span-2 flex flex-col justify-between"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#16324F] font-bold flex items-center gap-1.5">
                <ShieldIcon className="w-4 h-4 text-[#0284c7]" />
                OVERALL ENERGY RESILIENCE
              </span>
            </div>
            <p className="text-xs text-[#58708A] mt-1 max-w-md font-sans">
              Composite index calculating India&apos;s crude oil import security across geopolitical, shipping, and strategic reserve vectors.
            </p>
          </div>
          
          <button 
            type="button"
            className="flex items-center gap-1 text-xs font-mono text-[#0B2540] bg-[#EFF8FF] hover:bg-[#E0F2FE] px-3 py-1.5 rounded-xl border border-[#B9DDF5] transition-colors font-bold shadow-2xs cursor-pointer"
          >
            <InfoIcon className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Why {resilienceScore}?</span>
          </button>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#D5E5F1]">
          <div className="flex items-center gap-5">
            {/* SVG Circular Gauge */}
            <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
              <svg 
                className="w-full h-full -rotate-90 transform" 
                viewBox="0 0 96 96"
                role="img"
                aria-label={`Energy Resilience Score: ${resilienceScore} out of 100`}
              >
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke={resilienceScore < 20 ? "#dc2626" : resilienceScore < 50 ? "#d97706" : "#059669"}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="kpi-gauge-circle"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-mono tracking-tight text-[#16324F] tabular-nums">
                  {resilienceScore}
                </span>
                <span className="text-[10px] font-mono text-[#58708A] font-semibold">/ 100</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-md border ${
                  resilienceScore < 20 
                    ? "bg-rose-50 text-rose-800 border-rose-200" 
                    : resilienceScore < 50 
                    ? "bg-amber-50 text-amber-800 border-amber-200" 
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}>
                  {riskAssessment.level} RESILIENCE
                </span>
              </div>
              <p className="text-xs text-[#16324F] font-medium mt-2 leading-relaxed font-sans">
                {riskAssessment.description}
              </p>
              <div className="text-[11px] font-mono text-[#0284c7] font-bold mt-1">
                Click card to inspect transparent calculation formula →
              </div>
            </div>
          </div>
        </div>

        {/* Safety watermark */}
        <div className="text-[10px] font-mono text-[#58708A] text-right mt-2 font-medium">
          [SIMULATED MODEL OUTPUT]
        </div>
      </div>

      {/* 2. Supply Risk Score */}
      <div className="rounded-2xl p-5 border border-[#C7E3F7] bg-[#F4F9FD] shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#58708A] font-bold flex items-center gap-1.5">
              <ActivityIcon className="w-4 h-4 text-amber-600" />
              Supply Risk Index
            </span>
            <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-bold">
              ELEVATED
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#16324F] tabular-nums">{supplyRiskIndex}%</span>
            <span className="text-xs text-[#58708A] font-mono font-medium">disruption exposure</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
            <div 
              className="bg-amber-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, supplyRiskIndex)}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-[#D5E5F1] text-xs text-[#58708A] font-sans">
          Evaluated against {SIMULATED_NATIONAL_ENERGY_METRICS.dailyNetImportRequirementMbd} MBD daily net import demand.
          <div className="text-[10px] font-mono text-[#58708A] font-bold mt-1">DERIVED CANONICAL METRIC</div>
        </div>
      </div>

      {/* 3. Geopolitical Risk Score */}
      <div className="rounded-2xl p-5 border border-[#C7E3F7] bg-[#F4F9FD] shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#58708A] font-bold flex items-center gap-1.5">
              <GlobeIcon className="w-4 h-4 text-rose-600" />
              Geopolitical Risk
            </span>
            <span className="text-xs font-mono text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 font-bold">
              HIGH ({factors.geopolitical}/100)
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#16324F] tabular-nums">{factors.geopolitical}</span>
            <span className="text-xs text-rose-700 font-mono font-bold">+4.2% weekly drift</span>
          </div>
          <p className="text-xs text-[#58708A] mt-2 font-sans">
            Elevated threat in Bab-el-Mandeb &amp; Hormuz naval exercises.
          </p>
        </div>
        <div className="mt-3 pt-3 border-t border-[#D5E5F1] text-[10px] font-mono text-[#58708A] font-bold">
          5 ACTIVE SIMULATED THREAT VECTORS
        </div>
      </div>

      {/* 4. Maritime & Logistics Risk */}
      <div className="rounded-2xl p-5 border border-[#C7E3F7] bg-[#F4F9FD] shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#58708A] font-bold flex items-center gap-1.5">
              <AnchorIcon className="w-4 h-4 text-sky-600" />
              Maritime Logistics
            </span>
            <span className="text-xs font-mono text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200 font-bold">
              {factors.logistics}/100
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#16324F] tabular-nums">{freightMultiplier}</span>
            <span className="text-xs text-[#58708A] font-mono font-medium">freight surcharge</span>
          </div>
          <p className="text-xs text-[#58708A] mt-2 font-sans">
            VLCC tanker transit delays averaging +1.8 days on Persian Gulf routes.
          </p>
        </div>
        <div className="mt-3 pt-3 border-t border-[#D5E5F1] text-[10px] font-mono text-[#58708A] font-bold">
          ILLUSTRATIVE CHOKEPOINT METRIC
        </div>
      </div>

      {/* 5. Crude Price Volatility Indicator */}
      <div className="rounded-2xl p-5 border border-[#C7E3F7] bg-[#F4F9FD] shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#58708A] font-bold flex items-center gap-1.5">
              <ZapIcon className="w-4 h-4 text-amber-600" />
              Brent Volatility
            </span>
            <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-bold">
              {crudePrices.volatilityStatus}
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#16324F] tabular-nums">
              ${crudePrices.spotPriceUsd}
            </span>
            <span className="text-xs text-rose-700 font-mono font-bold">
              +{crudePrices.dailyChangePct}%
            </span>
          </div>
          <div className="text-xs text-[#58708A] mt-2 font-sans">
            Indian Basket est. <span className="font-mono text-[#16324F] font-bold">${crudePrices.indianBasketEstimatedUsd}/bbl</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-[#D5E5F1] text-[10px] font-mono text-[#58708A] font-bold">
          SIMULATED BENCHMARK FEED
        </div>
      </div>

      {/* 6. Strategic Reserve Status (SPR) */}
      <div className="rounded-2xl p-5 border border-[#C7E3F7] bg-[#F4F9FD] shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#58708A] font-bold flex items-center gap-1.5">
              <DatabaseIcon className="w-4 h-4 text-emerald-600" />
              Strategic Reserve (SPR)
            </span>
            <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-bold">
              {reserveSummary.sprUtilizationPct}% FILL
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#16324F] tabular-nums">
              {reserveSummary.sprDaysCover}
            </span>
            <span className="text-xs text-[#58708A] font-mono font-medium">days SPR cover</span>
          </div>
          <div className="text-xs text-[#58708A] mt-2 font-sans">
            Total SPR + Commercial: <span className="font-mono text-emerald-700 font-bold">{reserveSummary.totalCombinedCoverDays} days</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-[#D5E5F1] text-[10px] font-mono text-[#58708A] font-bold">
          STATUTORY ISPRL + OMC INVENTORY
        </div>
      </div>

      {/* 7. Import Dependency */}
      <div className="rounded-2xl p-5 border border-[#C7E3F7] bg-[#F4F9FD] shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#58708A] font-bold flex items-center gap-1.5">
              <AlertTriangleIcon className="w-4 h-4 text-rose-600" />
              Import Dependency
            </span>
            <span className="text-xs font-mono text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 font-bold">
              CRITICAL
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#16324F] tabular-nums">
              {SIMULATED_NATIONAL_ENERGY_METRICS.crudeImportDependencyPct}%
            </span>
            <span className="text-xs text-[#58708A] font-mono font-medium">of consumption</span>
          </div>
          <p className="text-xs text-[#58708A] mt-2 font-sans">
            Domestic production supplies ~{SIMULATED_NATIONAL_ENERGY_METRICS.domesticCrudeProductionMbd} MBD of total {SIMULATED_NATIONAL_ENERGY_METRICS.nationalDailyConsumptionMbd} MBD demand.
          </p>
        </div>
        <div className="mt-3 pt-3 border-t border-[#D5E5F1] text-[10px] font-mono text-[#58708A] font-bold">
          PPAC OFFICIAL CANONICAL DATASET
        </div>
      </div>

      {/* 8. Critical Corridor Status */}
      <div className="rounded-2xl p-5 border border-[#C7E3F7] bg-[#F4F9FD] shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#58708A] font-bold flex items-center gap-1.5">
              <AnchorIcon className="w-4 h-4 text-amber-600" />
              Critical Corridor
            </span>
            <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-bold">
              {hormuzCorridor.name.toUpperCase().replace("STRAIT OF ", "")} {hormuzCorridor.shareOfImports}%
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#16324F] tabular-nums">{hormuzCorridor.volumeMbd}</span>
            <span className="text-xs text-[#58708A] font-mono font-medium">MBD transiting</span>
          </div>
          <p className="text-xs text-[#58708A] mt-2 font-sans">
            Strait of Hormuz is India&apos;s primary single-point chokepoint risk.
          </p>
        </div>
        <div className="mt-3 pt-3 border-t border-[#D5E5F1] text-[10px] font-mono text-[#58708A] font-bold">
          CHOKEPOINT CONCENTRATION
        </div>
      </div>

    </div>
  );
}
