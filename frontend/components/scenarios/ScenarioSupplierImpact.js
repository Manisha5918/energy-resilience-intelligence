"use client";

import { GlobeIcon, AlertTriangleIcon } from "@/components/ui/Icons";

export default function ScenarioSupplierImpact({ supplierImpacts }) {
  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 space-y-5 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Supplier Shift & Sovereign Exposure
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              PROCUREMENT DYNAMICS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Model-projected reallocation of crude liftings as refiners shift away from disrupted origin terminals.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500 font-semibold">
          8 ORIGINS MODELLED
        </div>
      </div>

      {/* Supplier Impact Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
        <table className="w-full text-left text-xs font-mono text-slate-700">
          <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Supplier Country</th>
              <th className="py-3 px-3 text-center">Baseline Share</th>
              <th className="py-3 px-3 text-center">Scenario Share</th>
              <th className="py-3 px-3 text-center">Volume Delta</th>
              <th className="py-3 px-4 text-right">Shift Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {supplierImpacts.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: supplier.color }} />
                  <span>{supplier.supplier}</span>
                </td>
                <td className="py-3 px-3 text-center text-slate-500 font-medium">
                  {supplier.baselineSharePct}%
                </td>
                <td className="py-3 px-3 text-center font-bold text-slate-900">
                  {supplier.scenarioSharePct}%
                </td>
                <td className={`py-3 px-3 text-center font-bold ${
                  supplier.volumeDeltaMbd < 0
                    ? "text-rose-700"
                    : supplier.volumeDeltaMbd > 0
                    ? "text-emerald-700"
                    : "text-slate-500"
                }`}>
                  {supplier.volumeDeltaMbd > 0 ? `+${supplier.volumeDeltaMbd}` : supplier.volumeDeltaMbd} MBD
                </td>
                <td className="py-3 px-4 text-right">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold border font-mono ${
                    supplier.shiftStatus.includes("Disrupted")
                      ? "bg-rose-50 text-rose-800 border-rose-200"
                      : supplier.shiftStatus.includes("Expanded")
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}>
                    {supplier.shiftStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
