"use client";

import { NavigationIcon, AnchorIcon } from "@/components/ui/Icons";
import { SIMULATED_SUPPLIER_PROFILES } from "@/lib/supplierData";

export default function RouteRecommendation({ strategy }) {
  const allocations = strategy?.allocations || [];

  return (
    <div className="command-card rounded-xl p-5 border border-slate-200 bg-white shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <NavigationIcon className="w-4 h-4 text-sky-600" />
            <h3 className="text-sm font-semibold text-slate-900 font-heading tracking-wide">
              Maritime Routing & Bypass Recommendations
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              LOGISTICS DISPATCH
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Recommended navigation corridors bypassing high-risk chokepoints and optimizing delivery schedules.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-500 font-semibold">
          AVG TRANSIT: <span className="text-sky-700 font-bold">{strategy.weightedTransitDays} DAYS</span>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {allocations.map((a) => {
          const supplierProfile = SIMULATED_SUPPLIER_PROFILES.find((s) => s.id === a.supplierId);
          const isLowRisk = a.routeRisk === "LOW";
          const isModRisk = a.routeRisk === "MODERATE";

          return (
            <div
              key={a.supplierId}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[9px] font-mono uppercase text-slate-500 font-semibold">{supplierProfile?.supplier || a.supplierId}</span>
                  <h4 className="text-xs font-bold font-mono text-slate-900 mt-0.5">{a.route}</h4>
                </div>

                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 font-bold ${
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
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-[9px] text-slate-500 uppercase block font-medium">Transit Time</span>
                  <span className="text-slate-900 font-bold">{a.transitDays} Days</span>
                </div>

                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-[9px] text-slate-500 uppercase block font-medium">Freight Cost</span>
                  <span className="text-sky-700 font-bold">${a.costDetails.adjustedFreightUsd}/bbl</span>
                </div>

                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-[9px] text-slate-500 uppercase block font-medium">War-Risk</span>
                  <span className="text-amber-700 font-bold">${a.costDetails.warRiskSurchargeUsd}/bbl</span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200">
                <span>Route Type: <b className="text-slate-800 font-semibold">{a.routeType}</b></span>
                <span className="text-sky-700 font-semibold">{a.sharePct}% Volume</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
