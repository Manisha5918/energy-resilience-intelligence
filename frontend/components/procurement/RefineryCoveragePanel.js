"use client";

import { DatabaseIcon, CheckCircleIcon, AlertTriangleIcon } from "@/components/ui/Icons";

export default function RefineryCoveragePanel({ refineryCoverage }) {
  return (
    <div className="rounded-2xl p-6 border border-[#C7E3F7] bg-white shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D5E5F1] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-4 h-4 text-[#0284c7]" />
            <h3 className="text-sm font-bold text-[#16324F] font-heading tracking-wide">
              Refinery Feedstock Protection &amp; Terminal Routing
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] font-bold">
              TERMINAL INTEGRATION
            </span>
          </div>
          <p className="text-xs text-[#58708A] mt-0.5 font-sans">
            Evaluates individual refinery crude intake coverage based on designated port offloading and pipeline linkages.
          </p>
        </div>

        <div className="text-[10px] font-mono text-[#58708A] font-bold">
          6 REFINERIES SECURED
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {refineryCoverage.map((ref, idx) => {
          const isOptimal = ref.status === "OPTIMAL" || ref.status === "SECURED";

          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] hover:border-sky-300 transition-all flex flex-col justify-between space-y-2.5 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold font-mono text-[#16324F]">{ref.name}</h4>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border font-bold ${
                  isOptimal
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}>
                  {ref.status}
                </span>
              </div>

              <div className="flex items-baseline justify-between text-xs font-mono">
                <span className="text-[10px] text-[#58708A] uppercase font-bold">Coverage Level:</span>
                <span className="text-[#00C98D] font-bold">{ref.coveragePct}%</span>
              </div>

              <p className="text-[11px] text-[#58708A] font-sans leading-snug">
                {ref.note}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
