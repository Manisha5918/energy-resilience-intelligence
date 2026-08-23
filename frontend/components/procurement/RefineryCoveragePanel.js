"use client";

import { DatabaseIcon, CheckCircleIcon, AlertTriangleIcon } from "@/components/ui/Icons";

export default function RefineryCoveragePanel({ refineryCoverage }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-200 bg-white shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-4 h-4 text-sky-600" />
            <h3 className="text-sm font-semibold text-slate-900 font-heading tracking-wide">
              Refinery Feedstock Protection & Terminal Routing
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              TERMINAL INTEGRATION
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluates individual refinery crude intake coverage based on designated port offloading and pipeline linkages.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-500 font-semibold">
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
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold font-mono text-slate-900">{ref.name}</h4>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border font-bold ${
                  isOptimal
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}>
                  {ref.status}
                </span>
              </div>

              <div className="flex items-baseline justify-between text-xs font-mono">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Coverage Level:</span>
                <span className="text-emerald-700 font-bold">{ref.coveragePct}%</span>
              </div>

              <p className="text-[11px] text-slate-600 font-sans leading-snug">
                {ref.note}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
