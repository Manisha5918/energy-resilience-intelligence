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
    <div className="command-card rounded-2xl p-6 border border-slate-200 space-y-5 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Supplier Dependency & Concentration Analysis
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              HHI: {concentration.hhiScore}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluates bilateral sovereign dependencies and Herfindahl-Hirschman concentration exposure across India&apos;s crude basket.
          </p>
        </div>

        {/* HHI Risk Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase text-slate-500 font-semibold">Concentration Tier:</span>
          <span className={`text-xs font-mono px-2.5 py-1 rounded-lg font-bold border ${
            concentration.concentrationRisk === "HIGH"
              ? "bg-amber-50 text-amber-800 border-amber-200"
              : "bg-emerald-50 text-emerald-800 border-emerald-200"
          }`}>
            {concentration.concentrationRisk} CONCENTRATION
          </span>
        </div>
      </div>

      {/* Warning Banner if High Concentration */}
      {concentration.concentrationWarning && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
          <AlertTriangleIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed font-sans">
            <span className="font-bold font-mono">CONCENTRATION ADVISORY: </span>
            {concentration.concentrationWarning}
          </div>
        </div>
      )}

      {/* Proportional Multi-Segment Stacked Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-slate-600 font-medium">
          <span>National Import Volume Share Breakdown (4.83 MBD Net Import Need)</span>
          <span className="text-sky-700 font-bold">Top 3 Suppliers: {concentration.topThreeSharePct}%</span>
        </div>

        <div className="h-5 w-full flex rounded-lg overflow-hidden bg-slate-100 border border-slate-200 p-0.5 gap-0.5">
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

        <div className="flex flex-wrap gap-3 pt-1 text-xs font-mono text-slate-600">
          {SIMULATED_SUPPLIER_PROFILES.slice(0, 5).map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSupplierId(s.id)}
              className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                s.id === selectedSupplierId ? "text-sky-800 font-bold" : "hover:text-slate-900"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></span>
              <span>{s.supplier.split(" ")[0]} ({s.importSharePct}%)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Supplier Table & Selected Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2">
        
        {/* Table list */}
        <div className="lg:col-span-7 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs font-mono text-slate-700">
            <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Supplier Country</th>
                <th className="py-2.5 px-2 text-right">Share %</th>
                <th className="py-2.5 px-2 text-right">Volume (MBD)</th>
                <th className="py-2.5 px-2 text-center">Reliability</th>
                <th className="py-2.5 px-2 text-center">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {SIMULATED_SUPPLIER_PROFILES.map((supplier) => {
                const isSelected = supplier.id === selectedSupplierId;
                return (
                  <tr
                    key={supplier.id}
                    onClick={() => setSelectedSupplierId(supplier.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-sky-50 text-sky-900 font-bold"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="py-2.5 px-3 font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: supplier.color }} />
                      <span className="truncate text-slate-900">{supplier.supplier}</span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-900">
                      {supplier.importSharePct}%
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-600">
                      {supplier.volumeMbd}
                    </td>
                    <td className="py-2.5 px-2 text-center text-emerald-700 font-semibold">
                      {supplier.reliabilityScore}%
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                        supplier.riskLevel === "HIGH"
                          ? "bg-rose-50 text-rose-800 border-rose-200"
                          : supplier.riskLevel === "MODERATE"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-emerald-50 text-emerald-800 border-emerald-200"
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
        <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Supplier Profile</span>
              <h4 className="text-sm font-bold text-slate-900 font-heading">
                {selectedSupplier.supplier}
              </h4>
            </div>
            <span className="text-xs font-mono font-bold text-sky-800">
              {selectedSupplier.importSharePct}% of imports
            </span>
          </div>

          <div className="text-xs space-y-2.5">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Route Dependency:</span>
              <p className="text-slate-800 font-mono text-xs mt-0.5">
                {selectedSupplier.routeDependency}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Key Crude Grades:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedSupplier.primaryGrades.map((g, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 font-sans leading-relaxed">
              {selectedSupplier.notes}
            </div>

            <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-xs text-slate-800 font-sans leading-relaxed">
              <span className="font-mono text-[10px] uppercase font-bold text-sky-900 block mb-0.5">
                Diversification Action:
              </span>
              {selectedSupplier.diversificationRecommendation}
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400 pt-1 text-right font-medium">
            ILLUSTRATIVE CONCENTRATION METRIC
          </div>
        </div>

      </div>

    </div>
  );
}
