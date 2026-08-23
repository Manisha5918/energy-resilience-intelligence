"use client";

import { ZapIcon, InfoIcon } from "@/components/ui/Icons";
import { SIMULATED_SUPPLIER_PROFILES } from "@/lib/supplierData";

export default function LandedCostBreakdown({ strategy }) {
  const allocations = strategy?.allocations || [];

  return (
    <div className="rounded-2xl p-6 border border-[#C7E3F7] bg-white shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5E5F1] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ZapIcon className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm sm:text-base font-bold text-[#16324F] font-heading tracking-tight">
              Landed Crude Cost Component Breakdown
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] font-bold">
              ITEMIZED FINANCIAL MODEL
            </span>
          </div>
          <p className="text-xs text-[#58708A] mt-0.5 font-sans">
            Transparent cost build-up incorporating FOB benchmark, quality differentials, freight charter rates, and war-risk premiums.
          </p>
        </div>

        <div className="text-[10px] font-mono text-[#58708A] font-bold">
          WEIGHTED AVERAGE: <span className="text-[#D97706] font-bold">${strategy.weightedLandedCostUsd} / BBL</span>
        </div>
      </div>

      {/* Itemized Cost Table */}
      <div className="w-full overflow-x-auto rounded-xl border border-[#C7E3F7] shadow-2xs">
        <table className="w-full text-left text-xs font-mono text-[#16324F]">
          <thead className="bg-[#EEF7FF] text-[10px] uppercase text-[#16324F] font-bold border-b border-[#C7E3F7]">
            <tr>
              <th className="py-3 px-3.5">Origin / Grade</th>
              <th className="py-3 px-2 text-right">Base FOB</th>
              <th className="py-3 px-2 text-right">Quality Diff</th>
              <th className="py-3 px-2 text-right">Freight</th>
              <th className="py-3 px-2 text-right">War-Risk</th>
              <th className="py-3 px-2 text-right">Route Surch.</th>
              <th className="py-3 px-3.5 text-right">Net Landed $/bbl</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D5E5F1] bg-white">
            {allocations.map((a) => {
              const supplierProfile = SIMULATED_SUPPLIER_PROFILES.find((s) => s.id === a.supplierId);
              const c = a.costDetails;

              return (
                <tr key={a.supplierId} className="hover:bg-[#F4F9FD] transition-colors">
                  <td className="py-3 px-3.5 font-bold text-[#16324F] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: supplierProfile?.color || "#0284c7" }} />
                    <span>{supplierProfile?.supplier || a.supplierId}</span>
                  </td>

                  <td className="py-3 px-2 text-right text-[#58708A]">
                    ${c.basePriceUsd}
                  </td>

                  <td className={`py-3 px-2 text-right font-bold ${
                    c.gradeAdjustmentUsd < 0 ? "text-emerald-700" : "text-[#D97706]"
                  }`}>
                    {c.gradeAdjustmentUsd > 0 ? `+$${c.gradeAdjustmentUsd}` : `$${c.gradeAdjustmentUsd}`}
                  </td>

                  <td className="py-3 px-2 text-right text-[#16324F]">
                    +${c.adjustedFreightUsd}
                  </td>

                  <td className="py-3 px-2 text-right text-[#D97706] font-bold">
                    +${c.warRiskSurchargeUsd}
                  </td>

                  <td className="py-3 px-2 text-right text-[#0284c7] font-bold">
                    +${c.routePremiumUsd}
                  </td>

                  <td className="py-3 px-3.5 text-right font-bold text-[#16324F]">
                    ${c.netLandedCostUsd}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-[10px] font-mono text-[#58708A] pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <span>* Base Brent benchmark: $84.65/bbl • Includes $0.85/bbl port handling</span>
        <span className="font-bold text-[#D97706]">[ILLUSTRATIVE PRICING MODEL]</span>
      </div>

    </div>
  );
}
