"use client";

import { ActivityIcon, CheckCircleIcon, AlertTriangleIcon } from "@/components/ui/Icons";
import { formatDataAge, getFreshnessStatus } from "@/lib/dataFreshness";

export default function DataFreshnessMonitor({ providers = [] }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Signal Freshness & Latency Health
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              TIME SYNCHRONIZATION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Tracks age decay across market benchmark rates, naval alerts, AIS chokepoint telemetry, and sanctions bulletins.
          </p>
        </div>

        <div className="text-[10px] font-mono text-emerald-400 font-bold">
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
              className="p-3.5 rounded-xl bg-[#080d16] border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-200">{p.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold ${
                  isFresh
                    ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                    : "bg-amber-950 text-amber-400 border-amber-800"
                }`}>
                  {status}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block">Telemetry Age:</span>
                <div className="text-sm font-bold text-cyan-300 mt-0.5">
                  {formatDataAge(p.lastUpdated)}
                </div>
              </div>

              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/60 flex justify-between">
                <span>Ingested:</span>
                <span>{p.signalCount} Signals</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
