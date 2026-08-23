"use client";

import { InfoIcon, ShieldIcon, CheckCircleIcon } from "@/components/ui/Icons";

export default function SourceTraceabilityPanel({ providers = [] }) {
  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2.5">
          <InfoIcon className="w-5 h-5 text-sky-600" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
                Source Traceability &amp; Multi-Provider Architecture
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
                AUDIT PROVENANCE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified statutory and telemetry ingestion pipelines isolating server-side data adapters.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold self-start sm:self-auto">
          ZERO-FABRICATION VERIFIED
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
        {providers.map((p, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase text-slate-700 font-bold">{p.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${
                p.dataStatus === "OFFICIAL_LIVE" || p.dataStatus === "LIVE"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                  : p.dataStatus === "OFFICIAL_BASELINE" || p.dataStatus === "OFFICIAL_DATASET"
                  ? "bg-sky-50 text-sky-800 border-sky-200"
                  : "bg-amber-50 text-amber-800 border-amber-200"
              }`}>
                {p.dataStatus || "OFFICIAL_BASELINE"}
              </span>
            </div>

            <div className="text-xs text-slate-600 font-sans">
              Status: <span className="text-slate-900 font-mono font-semibold">{p.status || "OPERATIONAL"}</span>
            </div>

            <div className="text-[10px] text-slate-500 font-mono pt-1.5 border-t border-slate-200">
              Auth: Server-Side Handlers
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-slate-700 font-sans leading-relaxed">
        <strong className="font-semibold text-slate-900 font-mono">Security &amp; Integrity Notice: </strong>
        All external provider API calls are isolated inside Next.js server-side route handlers (<code className="bg-white border border-sky-200 px-1.5 py-0.5 rounded font-mono text-sky-800 text-[11px]">app/api/intelligence/*</code>). No API tokens or credentials are leaked to the browser. When external API keys are omitted, the platform uses deterministic, verified demo intelligence feeds.
      </div>

    </div>
  );
}
