"use client";

import { useState } from "react";
import { ActivityIcon, ShieldIcon, CheckCircleIcon, AlertTriangleIcon } from "@/components/ui/Icons";
import { getAuditLogs } from "@/lib/auditLog";

export default function AuditLogViewer() {
  const [logs] = useState(getAuditLogs());
  const [filterType, setFilterType] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredLogs = logs.filter((l) => {
    const matchesFilter = filterType === "ALL" || l.eventType === filterType;
    const matchesSearch = search === "" || 
      l.entity.toLowerCase().includes(search.toLowerCase()) || 
      l.reason.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Immutable Model Audit Trail
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              AUDIT LOG
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Full provenance log recording signal ingestion, dynamic scoring updates, scenario runs, and procurement outputs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Search audit trail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 w-36 sm:w-44"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="ALL">All Event Types</option>
            <option value="SIGNAL_INGESTED">Signal Ingested</option>
            <option value="RISK_SCORE_ADJUSTED">Risk Adjusted</option>
            <option value="SCENARIO_SIMULATION_EXECUTED">Scenario Executed</option>
            <option value="PROCUREMENT_STRATEGY_GENERATED">Procurement Strategy</option>
            <option value="PROVIDER_FALLBACK_TRIGGERED">Provider Fallback</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-100 text-[10px] uppercase text-slate-600 border-b border-slate-200">
            <tr>
              <th className="py-3 px-3.5">Timestamp (UTC)</th>
              <th className="py-3 px-2.5">Event Classification</th>
              <th className="py-3 px-2.5">Target Entity</th>
              <th className="py-3 px-2.5">State Transition (Prev → New)</th>
              <th className="py-3 px-3.5">Reason / Trigger Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filteredLogs.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3.5 text-slate-600 text-[11px]">
                  {l.timestamp.replace("T", " ").replace("Z", "")}
                </td>

                <td className="py-3 px-2.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-bold">
                    {l.eventType}
                  </span>
                </td>

                <td className="py-3 px-2.5 font-bold text-slate-900 font-mono">
                  {l.entity}
                </td>

                <td className="py-3 px-2.5 text-[11px] font-mono">
                  <span className="text-slate-400 line-through mr-1">{l.previousValue}</span>
                  <span className="text-emerald-700 font-bold">→ {l.newValue}</span>
                </td>

                <td className="py-3 px-3.5 text-xs text-slate-700 font-sans leading-relaxed">
                  {l.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
