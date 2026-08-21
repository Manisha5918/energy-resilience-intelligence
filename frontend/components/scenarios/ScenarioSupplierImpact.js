"use client";

import { GlobeIcon, AlertTriangleIcon } from "@/components/ui/Icons";

export default function ScenarioSupplierImpact({ supplierImpacts }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Supplier Shift & Sovereign Exposure
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              PROCUREMENT DYNAMICS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Model-projected reallocation of crude liftings as refiners shift away from disrupted origin terminals.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          8 ORIGINS MODELLED
        </div>
      </div>

      {/* Supplier Impact Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead className="bg-slate-900/90 text-[10px] uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Supplier Country</th>
              <th className="py-2.5 px-2 text-center">Baseline Share</th>
              <th className="py-2.5 px-2 text-center">Scenario Share</th>
              <th className="py-2.5 px-2 text-center">Volume Delta</th>
              <th className="py-2.5 px-3 text-right">Shift Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-[#070b12]">
            {supplierImpacts.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: supplier.color }} />
                  <span>{supplier.supplier}</span>
                </td>
                <td className="py-2.5 px-2 text-center text-slate-400">
                  {supplier.baselineSharePct}%
                </td>
                <td className="py-2.5 px-2 text-center font-bold text-white">
                  {supplier.scenarioSharePct}%
                </td>
                <td className={`py-2.5 px-2 text-center font-bold ${
                  supplier.volumeDeltaMbd < 0
                    ? "text-rose-400"
                    : supplier.volumeDeltaMbd > 0
                    ? "text-emerald-400"
                    : "text-slate-400"
                }`}>
                  {supplier.volumeDeltaMbd > 0 ? `+${supplier.volumeDeltaMbd}` : supplier.volumeDeltaMbd} MBD
                </td>
                <td className="py-2.5 px-3 text-right">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border font-mono ${
                    supplier.shiftStatus.includes("Disrupted")
                      ? "bg-rose-950 text-rose-400 border-rose-800"
                      : supplier.shiftStatus.includes("Expanded")
                      ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                      : "bg-slate-800 text-slate-400 border-slate-700"
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
