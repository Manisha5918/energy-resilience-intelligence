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
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Immutable Model Audit Trail
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              AUDIT LOG
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Full provenance log recording signal ingestion, dynamic scoring updates, scenario runs, and procurement outputs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Search audit trail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-36 sm:w-44"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
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
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead className="bg-slate-900/90 text-[10px] uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Timestamp (UTC)</th>
              <th className="py-2.5 px-2">Event Classification</th>
              <th className="py-2.5 px-2">Target Entity</th>
              <th className="py-2.5 px-2">State Transition (Prev → New)</th>
              <th className="py-2.5 px-3">Reason / Trigger Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-[#070b12]">
            {filteredLogs.map((l) => (
              <tr key={l.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                  {l.timestamp.replace("T", " ").replace("Z", "")}
                </td>

                <td className="py-2.5 px-2">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-bold">
                    {l.eventType}
                  </span>
                </td>

                <td className="py-2.5 px-2 font-bold text-slate-100">
                  {l.entity}
                </td>

                <td className="py-2.5 px-2 text-[11px]">
                  <span className="text-slate-400 line-through mr-1">{l.previousValue}</span>
                  <span className="text-emerald-400 font-bold">→ {l.newValue}</span>
                </td>

                <td className="py-2.5 px-3 text-[11px] text-slate-300 font-sans">
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
