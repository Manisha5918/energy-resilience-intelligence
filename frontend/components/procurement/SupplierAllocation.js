"use client";

import { GlobeIcon, ShieldIcon } from "@/components/ui/Icons";
import { SIMULATED_SUPPLIER_PROFILES } from "@/lib/supplierData";

export default function SupplierAllocation({ strategy }) {
  const allocations = strategy?.allocations || [];

  return (
    <div className="command-card rounded-xl p-5 border border-slate-200 bg-white shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-4 h-4 text-sky-600" />
            <h3 className="text-sm font-semibold text-slate-900 font-heading tracking-wide">
              Optimized Supplier Allocation Mix
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              {strategy.name.split(":")[0]}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Model-rebalanced allocation across sovereign crude producers to minimize single-country supply dependencies.
          </p>
        </div>

        <div className="text-[10px] font-mono text-sky-800">
          TOTAL: <span className="font-bold">{strategy.totalAllocatedMbd} MBD</span>
        </div>
      </div>

      {/* Proportional Multi-Segment Allocation Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-mono text-slate-600">
          <span className="font-medium">Replacement Volume Allocation Breakdown</span>
          <span className="text-emerald-700 font-bold">HHI: {strategy.strategyHhi} (-{strategy.hhiImprovement} improvement)</span>
        </div>

        <div className="h-4 w-full flex rounded-md overflow-hidden bg-slate-100 border border-slate-200 p-0.5 gap-0.5">
          {allocations.map((a) => {
            const supplierProfile = SIMULATED_SUPPLIER_PROFILES.find((s) => s.id === a.supplierId);
            return (
              <div
                key={a.supplierId}
                style={{ 
                  width: `${a.sharePct}%`,
                  backgroundColor: supplierProfile?.color || "#0284c7" 
                }}
                title={`${supplierProfile?.supplier || a.supplierId}: ${a.sharePct}% (${a.volumeMbd} MBD)`}
                className="h-full rounded-xs transition-opacity hover:opacity-80 relative"
              />
            );
          })}
        </div>
      </div>

      {/* Allocation Breakdown Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-xs font-mono text-slate-700">
          <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Supplier Origin</th>
              <th className="py-2.5 px-2 text-center">Allocated Share</th>
              <th className="py-2.5 px-2 text-center">Volume (MBD)</th>
              <th className="py-2.5 px-2 text-center">Landed Cost</th>
              <th className="py-2.5 px-3">Primary Routing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {allocations.map((a) => {
              const supplierProfile = SIMULATED_SUPPLIER_PROFILES.find((s) => s.id === a.supplierId);
              return (
                <tr key={a.supplierId} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900 flex items-center gap-2">
                    <span 
                      className="w-2 h-2 rounded-full shrink-0" 
                      style={{ backgroundColor: supplierProfile?.color || "#0284c7" }} 
                    />
                    <span>{supplierProfile?.supplier || a.supplierId}</span>
                  </td>

                  <td className="py-2.5 px-2 text-center font-bold text-slate-900">
                    {a.sharePct}%
                  </td>

                  <td className="py-2.5 px-2 text-center text-sky-700 font-bold">
                    {a.volumeMbd} MBD
                  </td>

                  <td className="py-2.5 px-2 text-center text-amber-700 font-bold">
                    ${a.costDetails.netLandedCostUsd}/bbl
                  </td>

                  <td className="py-2.5 px-3 text-[11px] text-slate-600 font-sans truncate max-w-xs">
                    {a.route}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
