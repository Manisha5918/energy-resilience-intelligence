"use client";

import { useState } from "react";
import { ActivityIcon, AlertTriangleIcon, ShieldIcon, DatabaseIcon } from "@/components/ui/Icons";

export default function MacroeconomicImpact({ macroeconomicImpact, priceImpact, supplyImpact, durationDays }) {
  const [showAssumptions, setShowAssumptions] = useState(false);

  if (!macroeconomicImpact) return null;

  const { metrics, assumptions, sensitivityCurve, inputs, disclaimer } = macroeconomicImpact;

  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-6">
      
      {/* Header with Provenance Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Macroeconomic & Fiscal Exposure Model
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
              MODEL ASSUMPTION
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Quantifies downstream macroeconomic drag on Indian GDP growth, Current Account Deficit (CAD), and national import bill under sustained crude price shocks.
          </p>
        </div>

        <button
          onClick={() => setShowAssumptions(!showAssumptions)}
          className="text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 transition flex items-center gap-1.5 self-start sm:self-auto"
          aria-expanded={showAssumptions}
        >
          <DatabaseIcon className="w-3.5 h-3.5 text-slate-500" />
          {showAssumptions ? "Hide Model Assumptions" : "View Model Assumptions"}
        </button>
      </div>

      {/* Mandatory Regulatory & Model Disclaimer Banner */}
      <div className="rounded-xl p-3.5 bg-amber-50/80 border border-amber-200 flex items-start gap-3">
        <AlertTriangleIcon className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 space-y-0.5">
          <span className="font-bold tracking-wide uppercase font-mono text-[11px] block">
            MODEL ASSUMPTION — NOT AN OFFICIAL FORECAST (ILLUSTRATIVE MODEL OUTPUT)
          </span>
          <p className="text-amber-800/90 leading-relaxed">
            All GDP elasticity and CAD sensitivity outputs are computed using standardized rule-of-thumb elasticity multipliers. They represent illustrative decision-support estimates and do not constitute an official sovereign macroeconomic forecast.
          </p>
        </div>
      </div>

      {/* Primary Macro KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Additional Daily Import Bill */}
        <div className="rounded-xl p-4 bg-slate-50 border border-slate-200">
          <span className="text-xs font-mono text-slate-500 font-medium block">
            Daily Import Bill Surcharge
          </span>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-900">
              +${metrics.additionalDailyImportBillUsdM.toLocaleString()}M
            </span>
            <span className="text-xs font-mono text-slate-500">/ day</span>
          </div>
          <div className="mt-1 text-xs font-mono text-rose-700 font-semibold">
            ≈ +₹{metrics.additionalDailyImportBillInrCr.toLocaleString()} Cr / day
          </div>
          <span className="text-[10px] text-slate-500 block mt-2">
            Based on {inputs.dailyImportDemandMbd} MBD demand @ ₹{inputs.exchangeRate}/$
          </span>
        </div>

        {/* 2. Cumulative Disruption Bill */}
        <div className="rounded-xl p-4 bg-slate-50 border border-slate-200">
          <span className="text-xs font-mono text-slate-500 font-medium block">
            Cumulative Bill Impact ({durationDays} Days)
          </span>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-rose-700">
              +${metrics.cumulativeImportBillShockUsdB.toLocaleString()}B
            </span>
          </div>
          <div className="mt-1 text-xs font-mono text-rose-700 font-semibold">
            ≈ +₹{metrics.cumulativeImportBillShockInrCr.toLocaleString()} Cr total
          </div>
          <span className="text-[10px] text-slate-500 block mt-2">
            Direct foreign exchange outflow shock
          </span>
        </div>

        {/* 3. Estimated GDP Growth Drag */}
        <div className="rounded-xl p-4 bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-medium block">
              Estimated GDP Growth Drag
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
              MODEL ASSUMPTION
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-amber-700">
              -{metrics.gdpGrowthDragPct}%
            </span>
            <span className="text-xs font-mono text-slate-500">central</span>
          </div>
          
          {/* Explicit Uncertainty Bands */}
          {macroeconomicImpact.uncertaintyBands?.gdpGrowthDragPct && (
            <div className="p-2 bg-white rounded-lg border border-slate-200 text-[10px] font-mono space-y-0.5">
              <div className="flex justify-between text-slate-600">
                <span>Low Case:</span>
                <span className="font-bold text-slate-800">-{macroeconomicImpact.uncertaintyBands.gdpGrowthDragPct.lowCase}%</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Central Case:</span>
                <span className="font-bold text-amber-700">-{macroeconomicImpact.uncertaintyBands.gdpGrowthDragPct.centralCase}%</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>High Case:</span>
                <span className="font-bold text-rose-700">-{macroeconomicImpact.uncertaintyBands.gdpGrowthDragPct.highCase}%</span>
              </div>
            </div>
          )}

          <div className="text-[10px] font-mono text-slate-500">
            ≈ ₹{metrics.gdpFiscalLossInrCr.toLocaleString()} Cr output impact
          </div>
        </div>

        {/* 4. Estimated CAD Expansion */}
        <div className="rounded-xl p-4 bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-medium block">
              CAD Expansion Exposure
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
              MODEL ASSUMPTION
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-900">
              +${metrics.cadExpansionUsdB}B
            </span>
            <span className="text-xs font-mono text-slate-500">central</span>
          </div>

          {/* Explicit Uncertainty Bands */}
          {macroeconomicImpact.uncertaintyBands?.cadExpansionUsdB && (
            <div className="p-2 bg-white rounded-lg border border-slate-200 text-[10px] font-mono space-y-0.5">
              <div className="flex justify-between text-slate-600">
                <span>Low Case:</span>
                <span className="font-bold text-slate-800">+${macroeconomicImpact.uncertaintyBands.cadExpansionUsdB.lowCase}B</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Central Case:</span>
                <span className="font-bold text-slate-900">+${macroeconomicImpact.uncertaintyBands.cadExpansionUsdB.centralCase}B</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>High Case:</span>
                <span className="font-bold text-rose-700">+${macroeconomicImpact.uncertaintyBands.cadExpansionUsdB.highCase}B</span>
              </div>
            </div>
          )}

          <div className="text-[10px] font-mono text-slate-500">
            ≈ +{metrics.cadExpansionGdpPct}% of annualized GDP
          </div>
        </div>
      </div>

      {/* Interactive Price Sensitivity Curve */}
      <div className="rounded-xl p-4 bg-slate-50/50 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono uppercase font-bold text-slate-800 tracking-wider">
            Crude Price Shock Sensitivity Matrix ($0 to +$50/bbl)
          </h4>
          <span className="text-[11px] font-mono text-slate-500">
            {durationDays}-Day Disruption Window
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-700 font-mono">
                <th className="py-2.5 px-3 font-semibold">Crude Shock ($/bbl)</th>
                <th className="py-2.5 px-3 font-semibold">Daily Bill Delta ($M)</th>
                <th className="py-2.5 px-3 font-semibold">Cumulative Bill ($B)</th>
                <th className="py-2.5 px-3 font-semibold">GDP Drag (%)</th>
                <th className="py-2.5 px-3 font-semibold">CAD Expansion ($B)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              {sensitivityCurve.map((point) => {
                const isCurrent = Math.abs(point.priceIncreaseUsd - inputs.priceDeltaUsd) < 5;
                return (
                  <tr
                    key={point.priceIncreaseUsd}
                    className={`${isCurrent ? "bg-amber-50/80 font-bold text-amber-950" : "hover:bg-slate-50 text-slate-800"}`}
                  >
                    <td className="py-2 px-3 flex items-center gap-1.5">
                      {isCurrent && <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />}
                      +${point.priceIncreaseUsd} / bbl
                    </td>
                    <td className="py-2 px-3">+${point.dailyImportBillShockUsdM}M</td>
                    <td className="py-2 px-3">+${point.cumulativeImportBillShockUsdB}B</td>
                    <td className="py-2 px-3 text-amber-700">-{point.gdpGrowthDragPct}%</td>
                    <td className="py-2 px-3">+${point.cadExpansionUsdB}B</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Configurable Assumptions Expandable Drawer */}
      {showAssumptions && (
        <div className="rounded-xl p-4 bg-[#F4F9FD] text-[#16324F] border border-[#C7E3F7] space-y-3 animate-fadeIn shadow-xs">
          <div className="flex items-center justify-between border-b border-[#D5E5F1] pb-2">
            <span className="text-xs font-mono uppercase font-bold text-[#0284c7]">
              Active Macroeconomic Model Coefficients &amp; Registry Source
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] font-bold">
              CONFIGURABLE LAYER
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="space-y-1 bg-white p-3 rounded-lg border border-[#D5E5F1] shadow-2xs">
              <span className="text-[#58708A] text-[11px] font-semibold">GDP Elasticity:</span>
              <div className="text-sm font-bold text-[#16324F]">{assumptions.gdpElasticity.value}</div>
              <p className="text-[10px] text-[#58708A]">{assumptions.gdpElasticity.notes}</p>
              <div className="text-[9px] text-[#D97706] font-bold">Status: {assumptions.gdpElasticity.status}</div>
            </div>

            <div className="space-y-1 bg-white p-3 rounded-lg border border-[#D5E5F1] shadow-2xs">
              <span className="text-[#58708A] text-[11px] font-semibold">CAD Sensitivity:</span>
              <div className="text-sm font-bold text-[#16324F]">${assumptions.cadSensitivity.value}B / $1 shock</div>
              <p className="text-[10px] text-[#58708A]">{assumptions.cadSensitivity.notes}</p>
              <div className="text-[9px] text-[#D97706] font-bold">Status: {assumptions.cadSensitivity.status}</div>
            </div>

            <div className="space-y-1 bg-white p-3 rounded-lg border border-[#D5E5F1] shadow-2xs">
              <span className="text-[#58708A] text-[11px] font-semibold">Baseline Benchmark:</span>
              <div className="text-sm font-bold text-[#16324F]">GDP ${assumptions.baselineAnnualGdpUsd.value}B | ₹{assumptions.usdInrExchangeRate.value}/$</div>
              <p className="text-[10px] text-[#58708A]">Sourced from {assumptions.baselineAnnualGdpUsd.source}</p>
              <div className="text-[9px] text-emerald-700 font-bold">Status: {assumptions.baselineAnnualGdpUsd.status}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
