"use client";

import { GlobeIcon, ShieldIcon } from "@/components/ui/Icons";

export default function SupplierSignalPanel({ supplierSignals }) {
  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Supplier Sovereign Risk Signals
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              SUPPLIER TELEMETRY
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time correlation mapping incoming intelligence events to India&apos;s crude suppliers.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 self-start sm:self-auto font-semibold">
          8 ORIGINS EVALUATED
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-100 text-[10px] uppercase text-slate-600 border-b border-slate-200">
            <tr>
              <th className="py-3 px-3.5">Supplier Country</th>
              <th className="py-3 px-2.5 text-center">Import Share</th>
              <th className="py-3 px-2.5 text-center">Active Signals</th>
              <th className="py-3 px-2.5 text-center">Vulnerability Index</th>
              <th className="py-3 px-3.5 text-right">Signal Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {supplierSignals.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3.5 font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: supplier.color }} />
                  <span>{supplier.supplier}</span>
                </td>
                <td className="py-3 px-2.5 text-center text-slate-700 font-mono font-medium">
                  {supplier.importSharePct}%
                </td>
                <td className="py-3 px-2.5 text-center font-bold text-sky-700 font-mono">
                  {supplier.signalCount} Events
                </td>
                <td className="py-3 px-2.5 text-center font-mono">
                  <span className={`font-bold ${
                    supplier.adjustedVulnerability >= 75
                      ? "text-rose-700"
                      : supplier.adjustedVulnerability >= 55
                      ? "text-amber-700"
                      : "text-emerald-700"
                  }`}>
                    {supplier.adjustedVulnerability} / 100
                  </span>
                  {supplier.riskChange > 0 && (
                    <span className="text-[11px] text-rose-600 ml-1 font-semibold">(+{supplier.riskChange})</span>
                  )}
                </td>
                <td className="py-3 px-3.5 text-right text-emerald-700 font-bold font-mono">
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
