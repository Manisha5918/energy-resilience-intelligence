"use client";

import { useState } from "react";
import { AlertTriangleIcon, GlobeIcon, CheckCircleIcon, InfoIcon } from "@/components/ui/Icons";
import { SIMULATED_SUPPLIER_PROFILES, calculateSupplierConcentration } from "@/lib/supplierData";

export default function SupplierConcentrationCard() {
  const [selectedSupplierId, setSelectedSupplierId] = useState("russia");
  const concentration = calculateSupplierConcentration(SIMULATED_SUPPLIER_PROFILES);

  const selectedSupplier = SIMULATED_SUPPLIER_PROFILES.find(
    (s) => s.id === selectedSupplierId
  ) || SIMULATED_SUPPLIER_PROFILES[0];

  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Supplier Dependency & Concentration Analysis
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              HHI: {concentration.hhiScore}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluates bilateral sovereign dependencies and Herfindahl-Hirschman concentration exposure across India&apos;s crude basket.
          </p>
        </div>

        {/* HHI Risk Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase text-slate-400">Concentration Tier:</span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
            concentration.concentrationRisk === "HIGH"
              ? "bg-amber-950 text-amber-400 border-amber-800"
              : "bg-emerald-950 text-emerald-400 border-emerald-800"
          }`}>
            {concentration.concentrationRisk} CONCENTRATION
          </span>
        </div>
      </div>

      {/* Warning Banner if High Concentration */}
      {concentration.concentrationWarning && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-950/30 border border-amber-700/50 text-amber-300 text-xs">
          <AlertTriangleIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold font-mono">CONCENTRATION ADVISORY: </span>
            {concentration.concentrationWarning}
          </div>
        </div>
      )}

      {/* Proportional Multi-Segment Stacked Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-mono text-slate-400">
          <span>National Import Volume Share Breakdown (4.67 MBD)</span>
          <span className="text-cyan-400">Top 3 Suppliers: {concentration.topThreeSharePct}%</span>
        </div>

        <div className="h-4 w-full flex rounded-md overflow-hidden bg-slate-800 border border-slate-700/60 p-0.5 gap-0.5">
          {SIMULATED_SUPPLIER_PROFILES.map((supplier) => (
            <div
              key={supplier.id}
              onClick={() => setSelectedSupplierId(supplier.id)}
              style={{ 
                width: `${supplier.importSharePct}%`,
                backgroundColor: supplier.color 
              }}
              title={`${supplier.supplier}: ${supplier.importSharePct}%`}
              className="h-full rounded-xs transition-opacity hover:opacity-80 cursor-pointer relative group"
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-1 text-[10px] font-mono text-slate-400">
          {SIMULATED_SUPPLIER_PROFILES.slice(0, 5).map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSupplierId(s.id)}
              className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                s.id === selectedSupplierId ? "text-cyan-300 font-bold" : "hover:text-slate-200"
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></span>
              <span>{s.supplier.split(" ")[0]} ({s.importSharePct}%)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Supplier Table & Selected Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2">
        
        {/* Table list */}
        <div className="lg:col-span-7 overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs font-mono text-slate-300">
            <thead className="bg-slate-900/90 text-[10px] uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2 px-3">Supplier Country</th>
                <th className="py-2 px-2 text-right">Share %</th>
                <th className="py-2 px-2 text-right">Volume (MBD)</th>
                <th className="py-2 px-2 text-center">Reliability</th>
                <th className="py-2 px-2 text-center">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-[#070b12]">
              {SIMULATED_SUPPLIER_PROFILES.map((supplier) => {
                const isSelected = supplier.id === selectedSupplierId;
                return (
                  <tr
                    key={supplier.id}
                    onClick={() => setSelectedSupplierId(supplier.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-cyan-950/40 text-cyan-200"
                        : "hover:bg-slate-800/30"
                    }`}
                  >
                    <td className="py-2.5 px-3 font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: supplier.color }} />
                      <span className="truncate">{supplier.supplier}</span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-bold">
                      {supplier.importSharePct}%
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-400">
                      {supplier.volumeMbd}
                    </td>
                    <td className="py-2.5 px-2 text-center text-emerald-400 font-semibold">
                      {supplier.reliabilityScore}%
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border ${
                        supplier.riskLevel === "HIGH"
                          ? "bg-rose-950 text-rose-400 border-rose-800"
                          : supplier.riskLevel === "MODERATE"
                          ? "bg-amber-950 text-amber-400 border-amber-800"
                          : "bg-emerald-950 text-emerald-400 border-emerald-800"
                      }`}>
                        {supplier.riskLevel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Supplier Intelligence Card */}
        <div className="lg:col-span-5 bg-[#090d16] rounded-lg border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400">Supplier Profile</span>
              <h4 className="text-sm font-bold text-slate-100 font-mono">
                {selectedSupplier.supplier}
              </h4>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400">
              {selectedSupplier.importSharePct}% of imports
            </span>
          </div>

          <div className="text-xs space-y-2">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Route Dependency:</span>
              <p className="text-slate-300 font-mono text-[11px] mt-0.5">
                {selectedSupplier.routeDependency}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Key Crude Grades:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedSupplier.primaryGrades.map((g, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 font-sans leading-relaxed">
              {selectedSupplier.notes}
            </div>

            <div className="p-2 rounded bg-[#070e17] border border-cyan-900/60 text-[11px] text-cyan-300 font-sans leading-relaxed">
              <span className="font-mono text-[10px] uppercase font-bold text-cyan-400 block mb-0.5">
                Diversification Action:
              </span>
              {selectedSupplier.diversificationRecommendation}
            </div>
          </div>

          <div className="text-[9px] font-mono text-slate-500 pt-1 text-right">
            ILLUSTRATIVE CONCENTRATION METRIC
          </div>
        </div>

      </div>

    </div>
  );
}
