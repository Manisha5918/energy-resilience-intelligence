"use client";

import { ActivityIcon, GlobeIcon, ShieldIcon, CheckCircleIcon, AlertTriangleIcon } from "@/components/ui/Icons";
import { formatDataAge, getFreshnessStatus } from "@/lib/dataFreshness";

export default function DataStatusPanel({ providers = [], systemHealth }) {
  return (
    <div className="command-card rounded-2xl p-5 border border-slate-800 space-y-4 bg-gradient-to-r from-[#0c1424] via-[#09101d] to-[#060a12]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Real-Time Ingestion & Provider Status
            </h3>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${
              systemHealth?.statusClass || "bg-amber-950/80 text-amber-300 border-amber-800"
            }`}>
              {systemHealth?.badgeText || "DEMO MODE — SIMULATED DATA"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time multi-provider pipeline status, server-side caching latency, and data freshness telemetry.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          CACHE: <span className="text-emerald-400 font-bold">ACTIVE TTL</span>
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
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-200 uppercase">{p.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold ${
                  p.isLive 
                    ? "bg-emerald-950 text-emerald-400 border-emerald-800" 
                    : "bg-amber-950 text-amber-400 border-amber-800"
                }`}>
                  {p.dataStatus}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Latency:</span>
                  <span className="text-cyan-300 font-bold">{p.latencyMs}ms</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Freshness:</span>
                  <span className={`font-bold ${isFresh ? "text-emerald-400" : "text-amber-400"}`}>
                    {freshness}
                  </span>
                </div>
              </div>

              <div className="text-[9px] text-slate-500 pt-1 border-t border-slate-800/80 flex justify-between">
                <span>Updated:</span>
                <span>{formatDataAge(p.lastUpdated)}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
