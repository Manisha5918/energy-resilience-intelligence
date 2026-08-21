"use client";

import { ZapIcon, InfoIcon } from "@/components/ui/Icons";
import { SIMULATED_SUPPLIER_PROFILES } from "@/lib/supplierData";

export default function LandedCostBreakdown({ strategy }) {
  const allocations = strategy?.allocations || [];

  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ZapIcon className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Landed Crude Cost Component Breakdown
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300">
              ITEMIZED FINANCIAL MODEL
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent cost build-up incorporating FOB benchmark, quality differentials, freight charter rates, and war-risk premiums.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          WEIGHTED AVERAGE: <span className="text-amber-400 font-bold">${strategy.weightedLandedCostUsd} / BBL</span>
        </div>
      </div>

      {/* Itemized Cost Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead className="bg-slate-900/90 text-[10px] uppercase text-slate-400 border-b border-slate-800">
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
          <tbody className="divide-y divide-slate-800/60 bg-[#070b12]">
            {allocations.map((a) => {
              const supplierProfile = SIMULATED_SUPPLIER_PROFILES.find((s) => s.id === a.supplierId);
              const c = a.costDetails;

              return (
                <tr key={a.supplierId} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: supplierProfile?.color || "#06b6d4" }} />
                    <span>{supplierProfile?.supplier || a.supplierId}</span>
                  </td>

                  <td className="py-2.5 px-2 text-right text-slate-400">
                    ${c.basePriceUsd}
                  </td>

                  <td className={`py-2.5 px-2 text-right font-semibold ${
                    c.gradeAdjustmentUsd < 0 ? "text-emerald-400" : "text-amber-400"
                  }`}>
                    {c.gradeAdjustmentUsd > 0 ? `+$${c.gradeAdjustmentUsd}` : `$${c.gradeAdjustmentUsd}`}
                  </td>

                  <td className="py-2.5 px-2 text-right text-slate-300">
                    +${c.adjustedFreightUsd}
                  </td>

                  <td className="py-2.5 px-2 text-right text-amber-400">
                    +${c.warRiskSurchargeUsd}
                  </td>

                  <td className="py-2.5 px-2 text-right text-cyan-400">
                    +${c.routePremiumUsd}
                  </td>

                  <td className="py-2.5 px-3 text-right font-bold text-white">
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
