"use client";

import { GlobeIcon, ShieldIcon } from "@/components/ui/Icons";

export default function SupplierSignalPanel({ supplierSignals }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Supplier Sovereign Risk Signals
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              SUPPLIER TELEMETRY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time correlation mapping incoming intelligence events to India&apos;s crude suppliers.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          8 ORIGINS EVALUATED
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead className="bg-slate-900/90 text-[10px] uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Supplier Country</th>
              <th className="py-2.5 px-2 text-center">Import Share</th>
              <th className="py-2.5 px-2 text-center">Active Signals</th>
              <th className="py-2.5 px-2 text-center">Vulnerability Index</th>
              <th className="py-2.5 px-3 text-right">Signal Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-[#070b12]">
            {supplierSignals.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: supplier.color }} />
                  <span>{supplier.supplier}</span>
                </td>
                <td className="py-2.5 px-2 text-center text-slate-300">
                  {supplier.importSharePct}%
                </td>
                <td className="py-2.5 px-2 text-center font-bold text-cyan-400">
                  {supplier.signalCount} Events
                </td>
                <td className="py-2.5 px-2 text-center">
                  <span className={`font-bold ${
                    supplier.adjustedVulnerability >= 75
                      ? "text-rose-400"
                      : supplier.adjustedVulnerability >= 55
                      ? "text-amber-400"
                      : "text-emerald-400"
                  }`}>
                    {supplier.adjustedVulnerability} / 100
                  </span>
                  {supplier.riskChange > 0 && (
                    <span className="text-[10px] text-rose-400 ml-1">(+{supplier.riskChange})</span>
                  )}
                </td>
                <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">
                  {supplier.confidencePct}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
