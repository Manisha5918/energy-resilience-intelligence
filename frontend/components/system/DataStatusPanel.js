"use client";

import { ActivityIcon, GlobeIcon, ShieldIcon, CheckCircleIcon, AlertTriangleIcon } from "@/components/ui/Icons";
import { formatDataAge, getFreshnessStatus } from "@/lib/dataFreshness";

export default function DataStatusPanel({ providers = [], systemHealth }) {
  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Real-Time Ingestion &amp; Provider Status
            </h3>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${
              systemHealth?.statusClass || "bg-amber-50 text-amber-800 border-amber-200"
            }`}>
              {systemHealth?.badgeText || "DEMO MODE — SIMULATED DATA"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time multi-provider pipeline status, server-side caching latency, and data freshness telemetry.
          </p>
        </div>

        <div className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold self-start sm:self-auto">
          CACHE: <span className="font-bold">ACTIVE TTL</span>
        </div>
      </div>

      {/* 4 Provider Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
        {providers.map((p, idx) => {
          const freshness = getFreshnessStatus(p.lastUpdated, p.type);
          const isFresh = freshness === "FRESH";

          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-800 uppercase">{p.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold ${
                  p.isLive 
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}>
                  {p.dataStatus}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Latency:</span>
                  <span className="text-sky-800 font-bold">{p.latencyMs}ms</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Freshness:</span>
                  <span className={`font-bold ${isFresh ? "text-emerald-700" : "text-amber-700"}`}>
                    {freshness}
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-200 flex justify-between">
                <span>Updated:</span>
                <span className="font-medium text-slate-700">{formatDataAge(p.lastUpdated)}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
