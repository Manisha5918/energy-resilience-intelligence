"use client";

import { ActivityIcon, CheckCircleIcon, AlertTriangleIcon } from "@/components/ui/Icons";
import { formatDataAge, getFreshnessStatus } from "@/lib/dataFreshness";

export default function DataFreshnessMonitor({ providers = [] }) {
  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Signal Freshness &amp; Latency Health
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              TIME SYNCHRONIZATION
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracks age decay across market benchmark rates, naval alerts, AIS chokepoint telemetry, and sanctions bulletins.
          </p>
        </div>

        <div className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-bold self-start sm:self-auto">
          ALL FEEDS WITHIN TTL
        </div>
      </div>

      {/* Freshness Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
        {providers.map((p, idx) => {
          const status = getFreshnessStatus(p.lastUpdated, p.type);
          const isFresh = status === "FRESH";

          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-slate-800">{p.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold ${
                  isFresh
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}>
                  {status}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block">Telemetry Age:</span>
                <div className="text-sm font-bold text-sky-800 mt-0.5">
                  {formatDataAge(p.lastUpdated)}
                </div>
              </div>

              <div className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-200 flex justify-between">
                <span>Ingested:</span>
                <span className="font-medium text-slate-700">{p.signalCount} Signals</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
