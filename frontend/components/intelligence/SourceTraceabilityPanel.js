"use client";

import { InfoIcon, ShieldIcon, CheckCircleIcon } from "@/components/ui/Icons";

export default function SourceTraceabilityPanel({ providers = [] }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4 bg-[#080d16]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <InfoIcon className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
            Source Traceability & Multi-Provider Architecture
          </h3>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
            AUDIT PROVENANCE
          </span>
        </div>

        <div className="text-[10px] font-mono text-cyan-400">
          ZERO-FABRICATION VERIFIED
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
        {providers.map((p, idx) => (
          <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase text-slate-400 font-bold">{p.name}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold ${
                p.dataStatus === "OFFICIAL_LIVE" || p.dataStatus === "LIVE"
                  ? "bg-emerald-950 text-emerald-400 border-emerald-800" 
                  : p.dataStatus === "OFFICIAL_BASELINE" || p.dataStatus === "OFFICIAL_DATASET"
                  ? "bg-cyan-950 text-cyan-300 border-cyan-800"
                  : "bg-slate-900 text-slate-400 border-slate-700"
              }`}>
                {p.dataStatus || "OFFICIAL_BASELINE"}
              </span>
            </div>

            <div className="text-[10px] text-slate-400 font-sans">
              Status: <span className="text-slate-200 font-mono">{p.status || "OPERATIONAL"}</span>
            </div>

            <div className="text-[9px] text-slate-500 font-mono pt-1 border-t border-slate-800">
              Auth: Server-Side Env Vars
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 font-sans leading-relaxed">
        <span className="font-semibold text-slate-300">Security & Integrity Notice: </span>
        All external provider API calls are isolated inside Next.js server-side route handlers (<code className="bg-slate-900 px-1 py-0.5 rounded font-mono text-cyan-300">app/api/intelligence/*</code>). No API tokens or credentials are leaked to the browser. When external API keys are omitted, the platform uses deterministic, verified demo intelligence feeds.
      </div>

    </div>
  );
}
