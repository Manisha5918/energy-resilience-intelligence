"use client";

import { GlobeIcon, ShieldIcon } from "@/components/ui/Icons";
import { SIMULATED_SUPPLIER_PROFILES } from "@/lib/supplierData";

export default function SupplierAllocation({ strategy }) {
  const allocations = strategy?.allocations || [];

  return (
    <div className="rounded-2xl p-6 border border-[#C7E3F7] bg-white shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D5E5F1] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-4 h-4 text-[#0284c7]" />
            <h3 className="text-sm font-bold text-[#16324F] font-heading tracking-wide">
              Optimized Supplier Allocation Mix
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] font-bold">
              {strategy.name.split(":")[0]}
            </span>
          </div>
          <p className="text-xs text-[#58708A] mt-0.5 font-sans">
            Model-rebalanced allocation across sovereign crude producers to minimize single-country supply dependencies.
          </p>
        </div>

        <div className="text-[10px] font-mono text-[#0B2540] font-bold">
          TOTAL: <span className="text-[#0284c7]">{strategy.totalAllocatedMbd} MBD</span>
        </div>
      </div>

      {/* Proportional Multi-Segment Allocation Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-mono text-[#16324F]">
          <span className="font-semibold text-[#58708A]">Replacement Volume Allocation Breakdown</span>
          <span className="text-emerald-700 font-bold">HHI: {strategy.strategyHhi} (-{strategy.hhiImprovement} improvement)</span>
        </div>

        <div className="h-4 w-full flex rounded-md overflow-hidden bg-[#F4F9FD] border border-[#C7E3F7] p-0.5 gap-0.5">
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
      <div className="w-full overflow-x-auto rounded-xl border border-[#C7E3F7] shadow-2xs">
        <table className="w-full text-left text-xs font-mono text-[#16324F]">
          <thead className="bg-[#EEF7FF] text-[10px] uppercase text-[#16324F] font-bold border-b border-[#C7E3F7]">
            <tr>
              <th className="py-3 px-3.5">Supplier Origin</th>
              <th className="py-3 px-2 text-center">Allocated Share</th>
              <th className="py-3 px-2 text-center">Volume (MBD)</th>
              <th className="py-3 px-2 text-center">Landed Cost</th>
              <th className="py-3 px-3.5">Primary Routing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D5E5F1] bg-white">
            {allocations.map((a) => {
              const supplierProfile = SIMULATED_SUPPLIER_PROFILES.find((s) => s.id === a.supplierId);
              return (
                <tr key={a.supplierId} className="hover:bg-[#F4F9FD] transition-colors">
                  <td className="py-3 px-3.5 font-bold text-[#16324F] flex items-center gap-2">
                    <span 
                      className="w-2 h-2 rounded-full shrink-0" 
                      style={{ backgroundColor: supplierProfile?.color || "#0284c7" }} 
                    />
                    <span>{supplierProfile?.supplier || a.supplierId}</span>
                  </td>

                  <td className="py-3 px-2 text-center font-bold text-[#16324F]">
                    {a.sharePct}%
                  </td>

                  <td className="py-3 px-2 text-center text-[#0284c7] font-bold">
                    {a.volumeMbd} MBD
                  </td>

                  <td className="py-3 px-2 text-center text-[#D97706] font-bold">
                    ${a.costDetails.netLandedCostUsd}/bbl
                  </td>

                  <td className="py-3 px-3.5 text-[11px] text-[#58708A] font-sans truncate max-w-xs">
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
