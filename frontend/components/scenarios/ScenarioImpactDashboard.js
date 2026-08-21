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
      <div className="command-card rounded-xl p-4 border border-rose-500/30 bg-gradient-to-br from-[#180e14] to-[#0c0f17] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <ShieldIcon className="w-3.5 h-3.5 text-rose-400" />
              Scenario Resilience
            </span>
            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold border ${riskAssessment.badgeClass}`}>
              {riskAssessment.level}
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white">{resilienceScore}</span>
            <span className="text-xs font-mono text-slate-400">/ 100</span>
            <span className="text-xs font-mono font-bold text-rose-400 ml-auto">
              {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta} pts
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
            <div 
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ 
                width: `${resilienceScore}%`,
                backgroundColor: riskAssessment.accentColor 
              }}
            />
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex justify-between">
          <span>Baseline: {baselineResilience.resilienceScore}</span>
          <span className="text-rose-400 uppercase font-semibold">Deteriorated</span>
        </div>
      </div>

      {/* 2. SUPPLY GAP */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <ActivityIcon className="w-3.5 h-3.5 text-rose-400" />
              Daily Supply Gap
            </span>
            <span className="text-[9px] font-mono text-rose-400 bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800">
              -{supplyImpact.disruptionPct}% FLOW
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-mono text-rose-400">
              -{supplyImpact.dailySupplyDeficitMbd}
            </span>
            <span className="text-xs text-slate-400 font-mono">MBD deficit</span>
          </div>

          <p className="text-xs text-slate-300 mt-1.5 font-mono">
            {supplyImpact.cumulativeSupplyDeficitMbbl} MBBL cumulative gap
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
          DEMAND: {supplyImpact.dailyImportDemandMbd} MBD
        </div>
      </div>

      {/* 3. CRUDE PRICE SHOCK */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <ZapIcon className="w-3.5 h-3.5 text-amber-400" />
              Brent Crude Shock
            </span>
            <span className="text-[9px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800">
              +{priceImpact.priceShockPct}%
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-mono text-amber-300">
              ${priceImpact.scenarioBrentUsd}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ bbl</span>
          </div>

          <p className="text-xs text-slate-300 mt-1.5 font-mono">
            +${priceImpact.priceDeltaUsd}/bbl over baseline
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
          EXPOSURE: +${priceImpact.cumulativeExtraImportExposureUsdM}M
        </div>
      </div>

      {/* 4. FREIGHT SURCHARGE */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <AnchorIcon className="w-3.5 h-3.5 text-cyan-400" />
              Freight Multiplier
            </span>
            <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800">
              +{freightImpact.freightImpactPct}%
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-mono text-cyan-300">
              {freightImpact.freightMultiplier}x
            </span>
            <span className="text-xs text-slate-400 font-mono">index</span>
          </div>

          <p className="text-xs text-slate-300 mt-1.5 font-mono">
            War-risk & rerouting overhead
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
          LOGISTICS FRICTION
        </div>
      </div>

      {/* 5. SPR PRESSURE */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <DatabaseIcon className="w-3.5 h-3.5 text-emerald-400" />
              Reserve Pressure
            </span>
            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold border ${
              reserveImpact.sprPressureLevel === "CRITICAL"
                ? "bg-rose-950 text-rose-400 border-rose-800"
                : reserveImpact.sprPressureLevel === "HIGH"
                ? "bg-amber-950 text-amber-400 border-amber-800"
                : "bg-emerald-950 text-emerald-400 border-emerald-800"
            }`}>
              {reserveImpact.sprPressureLevel}
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-mono text-slate-100">
              {reserveImpact.scenarioSprDaysCover}
            </span>
            <span className="text-xs text-slate-400 font-mono">days cover left</span>
          </div>

          <p className="text-xs text-slate-300 mt-1.5 font-mono">
            Draw rate: {reserveImpact.sprDrawdownRateMbd} MBD
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
          BASELINE COVER: {reserveImpact.baselineSprDaysCover}d
        </div>
      </div>

    </div>
  );
}
