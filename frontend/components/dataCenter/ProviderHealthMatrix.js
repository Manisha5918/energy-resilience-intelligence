"use client";

import { ActivityIcon, CheckCircleIcon, ShieldIcon, AlertTriangleIcon } from "@/components/ui/Icons";
import { formatDataAge } from "@/lib/dataFreshness";

export default function ProviderHealthMatrix({ providers = [] }) {
  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              External Provider Health &amp; Authentication Matrix
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              SECURITY AUDIT
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluates server-side adapter connectivity, credential isolation, and automated fallback triggers.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 self-start sm:self-auto font-semibold">
          4 ADAPTERS RUNNING
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-100 text-[10px] uppercase text-slate-600 border-b border-slate-200">
            <tr>
              <th className="py-3 px-3.5">Provider Feed Name</th>
              <th className="py-3 px-2.5 text-center">Data Status</th>
              <th className="py-3 px-2.5 text-center">TTL Cache</th>
              <th className="py-3 px-2.5 text-center">Latency</th>
              <th className="py-3 px-2.5 text-center">Auth Method</th>
              <th className="py-3 px-3.5 text-right">Last Synchronized</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {providers.map((p, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3.5 font-semibold text-slate-900">
                  {p.name}
                </td>

                <td className="py-3 px-2.5 text-center">
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-bold ${
                    p.isLive
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-amber-50 text-amber-800 border-amber-200"
                  }`}>
                    {p.dataStatus}
                  </span>
                </td>

                <td className="py-3 px-2.5 text-center text-slate-600 font-mono">
                  {p.type === "news" ? "5 min" : p.type === "shipping" ? "2 min" : p.type === "market" ? "1 min" : "15 min"}
                </td>

                <td className="py-3 px-2.5 text-center text-sky-800 font-bold font-mono">
                  {p.latencyMs}ms
                </td>

                <td className="py-3 px-2.5 text-center text-slate-600 font-mono">
                  Server Env Var
                </td>

                <td className="py-3 px-3.5 text-right text-slate-700 font-mono">
                  {formatDataAge(p.lastUpdated)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
