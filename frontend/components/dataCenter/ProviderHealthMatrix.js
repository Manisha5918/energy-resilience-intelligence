"use client";

import { ActivityIcon, CheckCircleIcon, ShieldIcon, AlertTriangleIcon } from "@/components/ui/Icons";
import { formatDataAge } from "@/lib/dataFreshness";

export default function ProviderHealthMatrix({ providers = [] }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              External Provider Health & Authentication Matrix
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              SECURITY AUDIT
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluates server-side adapter connectivity, credential isolation, and automated fallback triggers.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          4 ADAPTERS RUNNING
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead className="bg-slate-900/90 text-[10px] uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Provider Feed Name</th>
              <th className="py-2.5 px-2 text-center">Data Status</th>
              <th className="py-2.5 px-2 text-center">TTL Cache</th>
              <th className="py-2.5 px-2 text-center">Latency</th>
              <th className="py-2.5 px-2 text-center">Auth Method</th>
              <th className="py-2.5 px-3 text-right">Last Synchronized</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-[#070b12]">
            {providers.map((p, idx) => (
              <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-100">
                  {p.name}
                </td>

                <td className="py-2.5 px-2 text-center">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold ${
                    p.isLive
                      ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                      : "bg-amber-950 text-amber-400 border-amber-800"
                  }`}>
                    {p.dataStatus}
                  </span>
                </td>

                <td className="py-2.5 px-2 text-center text-slate-400">
                  {p.type === "news" ? "5 min" : p.type === "shipping" ? "2 min" : p.type === "market" ? "1 min" : "15 min"}
                </td>

                <td className="py-2.5 px-2 text-center text-cyan-300 font-bold">
                  {p.latencyMs}ms
                </td>

                <td className="py-2.5 px-2 text-center text-slate-400">
                  Server Env Var
                </td>

                <td className="py-2.5 px-3 text-right text-slate-300">
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
