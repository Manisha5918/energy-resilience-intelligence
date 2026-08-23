"use client";

import { ZapIcon, InfoIcon } from "@/components/ui/Icons";
import { SIMULATED_SUPPLIER_PROFILES } from "@/lib/supplierData";

export default function LandedCostBreakdown({ strategy }) {
  const allocations = strategy?.allocations || [];

  return (
    <div className="command-card rounded-xl p-5 border border-slate-200 bg-white shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ZapIcon className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-semibold text-slate-900 font-heading tracking-wide">
              Landed Crude Cost Component Breakdown
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
              ITEMIZED FINANCIAL MODEL
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent cost build-up incorporating FOB benchmark, quality differentials, freight charter rates, and war-risk premiums.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-500 font-semibold">
          WEIGHTED AVERAGE: <span className="text-amber-700 font-bold">${strategy.weightedLandedCostUsd} / BBL</span>
        </div>
      </div>

      {/* Itemized Cost Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-xs font-mono text-slate-700">
          <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Origin / Grade</th>
              <th className="py-2.5 px-2 text-right">Base FOB</th>
              <th className="py-2.5 px-2 text-right">Quality Diff</th>
              <th className="py-2.5 px-2 text-right">Freight</th>
              <th className="py-2.5 px-2 text-right">War-Risk</th>
              <th className="py-2.5 px-2 text-right">Route Surch.</th>
              <th className="py-2.5 px-3 text-right">Net Landed $/bbl</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {allocations.map((a) => {
              const supplierProfile = SIMULATED_SUPPLIER_PROFILES.find((s) => s.id === a.supplierId);
              const c = a.costDetails;

              return (
                <tr key={a.supplierId} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: supplierProfile?.color || "#0284c7" }} />
                    <span>{supplierProfile?.supplier || a.supplierId}</span>
                  </td>

                  <td className="py-2.5 px-2 text-right text-slate-500">
                    ${c.basePriceUsd}
                  </td>

                  <td className={`py-2.5 px-2 text-right font-semibold ${
                    c.gradeAdjustmentUsd < 0 ? "text-emerald-700" : "text-amber-700"
                  }`}>
                    {c.gradeAdjustmentUsd > 0 ? `+$${c.gradeAdjustmentUsd}` : `$${c.gradeAdjustmentUsd}`}
                  </td>

                  <td className="py-2.5 px-2 text-right text-slate-700">
                    +${c.adjustedFreightUsd}
                  </td>

                  <td className="py-2.5 px-2 text-right text-amber-700 font-semibold">
                    +${c.warRiskSurchargeUsd}
                  </td>

                  <td className="py-2.5 px-2 text-right text-sky-700 font-semibold">
                    +${c.routePremiumUsd}
                  </td>

                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                    ${c.netLandedCostUsd}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-[10px] font-mono text-slate-500 pt-1 flex items-center justify-between">
        <span>* Base Brent benchmark: $84.65/bbl • Includes $0.85/bbl port handling</span>
        <span>[ILLUSTRATIVE PRICING MODEL]</span>
      </div>

    </div>
  );
}
