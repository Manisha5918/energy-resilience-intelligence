"use client";

import { DatabaseIcon, CheckCircleIcon, AlertTriangleIcon } from "@/components/ui/Icons";

export default function RefineryCoveragePanel({ refineryCoverage }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Refinery Feedstock Protection & Terminal Routing
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              TERMINAL INTEGRATION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluates individual refinery crude intake coverage based on designated port offloading and pipeline linkages.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          6 REFINERIES SECURED
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {refineryCoverage.map((ref, idx) => {
          const isOptimal = ref.status === "OPTIMAL" || ref.status === "SECURED";

          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#080d16] border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold font-mono text-slate-100">{ref.name}</h4>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border font-bold ${
                  isOptimal
                    ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                    : "bg-amber-950 text-amber-400 border-amber-800"
                }`}>
                  {ref.status}
                </span>
              </div>

              <div className="flex items-baseline justify-between text-xs font-mono">
                <span className="text-[10px] text-slate-500 uppercase">Coverage Level:</span>
                <span className="text-emerald-400 font-bold">{ref.coveragePct}%</span>
              </div>

              <p className="text-[11px] text-slate-300 font-sans leading-snug">
                {ref.note}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
