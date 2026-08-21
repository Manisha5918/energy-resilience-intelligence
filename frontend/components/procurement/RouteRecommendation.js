"use client";

import { NavigationIcon, AnchorIcon } from "@/components/ui/Icons";
import { SIMULATED_SUPPLIER_PROFILES } from "@/lib/supplierData";

export default function RouteRecommendation({ strategy }) {
  const allocations = strategy?.allocations || [];

  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <NavigationIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Maritime Routing & Bypass Recommendations
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              LOGISTICS DISPATCH
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Recommended navigation corridors bypassing high-risk chokepoints and optimizing delivery schedules.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          AVG TRANSIT: <span className="text-cyan-400 font-bold">{strategy.weightedTransitDays} DAYS</span>
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
              className="p-3.5 rounded-xl bg-[#080d16] border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[9px] font-mono uppercase text-slate-500">{supplierProfile?.supplier || a.supplierId}</span>
                  <h4 className="text-xs font-bold font-mono text-slate-100 mt-0.5">{a.route}</h4>
                </div>

                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 font-bold ${
                  isLowRisk
                    ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                    : isModRisk
                    ? "bg-amber-950 text-amber-400 border-amber-800"
                    : "bg-rose-950 text-rose-400 border-rose-800"
                }`}>
                  {a.routeRisk} RISK
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Transit Time</span>
                  <span className="text-slate-200 font-bold">{a.transitDays} Days</span>
                </div>

                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Freight Cost</span>
                  <span className="text-cyan-300 font-bold">${a.costDetails.adjustedFreightUsd}/bbl</span>
                </div>

                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">War-Risk</span>
                  <span className="text-amber-300 font-bold">${a.costDetails.warRiskSurchargeUsd}/bbl</span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
                <span>Route Type: <b className="text-slate-200">{a.routeType}</b></span>
                <span className="text-cyan-400 font-semibold">{a.sharePct}% Volume</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
