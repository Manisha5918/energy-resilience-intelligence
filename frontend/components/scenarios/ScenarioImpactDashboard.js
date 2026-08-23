"use client";

import { 
  ShieldIcon, 
  ActivityIcon, 
  ZapIcon, 
  AnchorIcon, 
  DatabaseIcon, 
  AlertTriangleIcon 
} from "@/components/ui/Icons";

export default function ScenarioImpactDashboard({ simulationResult }) {
  const { 
    scenarioResilience, 
    baselineResilience,
    scoreDelta, 
    supplyImpact, 
    priceImpact, 
    freightImpact, 
    reserveImpact 
  } = simulationResult;

  const { resilienceScore, riskAssessment } = scenarioResilience;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      
      {/* 1. SCENARIO RESILIENCE SCORE */}
      <div className="command-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1">
              <ShieldIcon className="w-4 h-4 text-rose-600" />
              Scenario Resilience
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
              resilienceScore < 20
                ? "bg-rose-50 text-rose-800 border-rose-200"
                : resilienceScore < 50
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
            }`}>
              {riskAssessment.level}
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-900">{resilienceScore}</span>
            <span className="text-xs font-mono text-slate-500">/ 100</span>
            <span className="text-xs font-mono font-bold text-rose-700 ml-auto bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta} pts
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${resilienceScore}%`,
                backgroundColor: resilienceScore < 20 ? "#dc2626" : resilienceScore < 50 ? "#d97706" : "#059669"
              }}
            />
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-200 text-xs font-mono text-slate-600 flex justify-between">
          <span>Baseline: {baselineResilience.resilienceScore}</span>
          <span className="text-rose-700 uppercase font-bold">Deteriorated</span>
        </div>
      </div>

      {/* 2. SUPPLY GAP */}
      <div className="command-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1">
              <ActivityIcon className="w-4 h-4 text-rose-600" />
              Daily Supply Gap
            </span>
            <span className="text-[10px] font-mono text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-bold">
              -{supplyImpact.disruptionPct}% FLOW
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-mono text-rose-600">
              -{supplyImpact.dailySupplyDeficitMbd}
            </span>
            <span className="text-xs text-slate-500 font-mono">MBD deficit</span>
          </div>

          <p className="text-xs text-slate-700 mt-1.5 font-mono">
            {supplyImpact.cumulativeSupplyDeficitMbbl} MBBL cumulative gap
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-200 text-xs font-mono text-slate-500">
          DEMAND: {supplyImpact.dailyImportDemandMbd} MBD
        </div>
      </div>

      {/* 3. CRUDE PRICE SHOCK */}
      <div className="command-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1">
              <ZapIcon className="w-4 h-4 text-amber-600" />
              Brent Crude Shock
            </span>
            <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
              +{priceImpact.priceShockPct}%
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-mono text-amber-700">
              ${priceImpact.scenarioBrentUsd}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ bbl</span>
          </div>

          <p className="text-xs text-slate-700 mt-1.5 font-mono">
            +${priceImpact.priceDeltaUsd}/bbl over baseline
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-200 text-xs font-mono text-slate-500">
          EXPOSURE: +${priceImpact.cumulativeExtraImportExposureUsdM}M
        </div>
      </div>

      {/* 4. FREIGHT SURCHARGE */}
      <div className="command-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1">
              <AnchorIcon className="w-4 h-4 text-sky-600" />
              Freight Multiplier
            </span>
            <span className="text-[10px] font-mono text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold">
              +{freightImpact.freightImpactPct}%
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-mono text-sky-700">
              {freightImpact.freightMultiplier}x
            </span>
            <span className="text-xs text-slate-500 font-mono">index</span>
          </div>

          <p className="text-xs text-slate-700 mt-1.5 font-mono">
            War-risk & rerouting overhead
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-200 text-xs font-mono text-slate-500">
          LOGISTICS FRICTION
        </div>
      </div>

      {/* 5. SPR PRESSURE */}
      <div className="command-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1">
              <DatabaseIcon className="w-4 h-4 text-emerald-600" />
              Reserve Pressure
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
              reserveImpact.sprPressureLevel === "CRITICAL"
                ? "bg-rose-50 text-rose-800 border-rose-200"
                : reserveImpact.sprPressureLevel === "HIGH"
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
            }`}>
              {reserveImpact.sprPressureLevel}
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-mono text-slate-900">
              {reserveImpact.scenarioSprDaysCover}
            </span>
            <span className="text-xs text-slate-500 font-mono">days cover left</span>
          </div>

          <p className="text-xs text-slate-700 mt-1.5 font-mono">
            Draw rate: {reserveImpact.sprDrawdownRateMbd} MBD
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-200 text-xs font-mono text-slate-500">
          BASELINE COVER: {reserveImpact.baselineSprDaysCover}d
        </div>
      </div>

    </div>
  );
}
