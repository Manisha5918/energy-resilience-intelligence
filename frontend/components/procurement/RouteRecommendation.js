"use client";

import { NavigationIcon, AnchorIcon } from "@/components/ui/Icons";
import { SIMULATED_SUPPLIER_PROFILES } from "@/lib/supplierData";

export default function RouteRecommendation({ strategy }) {
  const allocations = strategy?.allocations || [];

  return (
    <div className="rounded-2xl p-6 border border-[#C7E3F7] bg-white shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D5E5F1] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <NavigationIcon className="w-4 h-4 text-[#0284c7]" />
            <h3 className="text-sm font-bold text-[#16324F] font-heading tracking-wide">
              Maritime Routing &amp; Bypass Recommendations
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] font-bold">
              LOGISTICS DISPATCH
            </span>
          </div>
          <p className="text-xs text-[#58708A] mt-0.5 font-sans">
            Recommended navigation corridors bypassing high-risk chokepoints and optimizing delivery schedules.
          </p>
        </div>

        <div className="text-[10px] font-mono text-[#58708A] font-bold">
          AVG TRANSIT: <span className="text-[#0284c7]">{strategy.weightedTransitDays} DAYS</span>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {allocations.map((a) => {
          const supplierProfile = SIMULATED_SUPPLIER_PROFILES.find((s) => s.id === a.supplierId);
          const isLowRisk = a.routeRisk === "LOW";
          const isModRisk = a.routeRisk === "MODERATE";

          return (
            <div
              key={a.supplierId}
              className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] hover:border-sky-300 transition-all flex flex-col justify-between space-y-3 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#58708A] font-bold">{supplierProfile?.supplier || a.supplierId}</span>
                  <h4 className="text-xs font-bold font-mono text-[#16324F] mt-0.5">{a.route}</h4>
                </div>

                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border shrink-0 font-bold ${
                  isLowRisk
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : isModRisk
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-rose-50 text-rose-800 border-rose-200"
                }`}>
                  {a.routeRisk} RISK
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-white border border-[#D5E5F1] shadow-2xs">
                  <span className="text-[9px] text-[#58708A] uppercase block font-semibold">Transit Time</span>
                  <span className="text-[#16324F] font-bold">{a.transitDays} Days</span>
                </div>

                <div className="p-2 rounded-lg bg-white border border-[#D5E5F1] shadow-2xs">
                  <span className="text-[9px] text-[#58708A] uppercase block font-semibold">Freight Cost</span>
                  <span className="text-[#0284c7] font-bold">${a.costDetails.adjustedFreightUsd}/bbl</span>
                </div>

                <div className="p-2 rounded-lg bg-white border border-[#D5E5F1] shadow-2xs">
                  <span className="text-[9px] text-[#58708A] uppercase block font-semibold">War-Risk</span>
                  <span className="text-[#D97706] font-bold">${a.costDetails.warRiskSurchargeUsd}/bbl</span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-[#58708A] flex items-center justify-between pt-1.5 border-t border-[#D5E5F1]">
                <span>Route Type: <b className="text-[#16324F] font-bold">{a.routeType}</b></span>
                <span className="text-[#0284c7] font-bold">{a.sharePct}% Volume</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
