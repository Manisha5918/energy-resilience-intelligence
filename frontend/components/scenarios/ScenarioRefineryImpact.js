"use client";

import { DatabaseIcon, ShieldIcon, AlertTriangleIcon } from "@/components/ui/Icons";

export default function ScenarioRefineryImpact({ refineryExposures }) {
  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 space-y-5 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Refinery Feedstock Exposure & Buffer Depletion
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              REFINERY RUN STRESS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Model-projected onsite tank farm inventory drawdown and feedstock supply security at key domestic refining nodes.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500 font-semibold">
          6 REFINING CENTRES
        </div>
      </div>

      {/* Refinery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {refineryExposures.map((ref, idx) => {
          const isCritical = ref.scenarioRisk === "CRITICAL";
          const isHigh = ref.scenarioRisk === "HIGH";

          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold font-heading text-slate-900">{ref.name}</h4>
                  <span className="text-xs text-slate-500 font-sans">{ref.location}</span>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border shrink-0 ${
                  isCritical
                    ? "bg-rose-50 text-rose-800 border-rose-200"
                    : isHigh
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}>
                  {ref.scenarioRisk}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Buffer Days Left:</span>
                <span className={`font-bold text-sm ${ref.bufferDaysRemaining < 5 ? "text-rose-700" : "text-amber-700"}`}>
                  {ref.bufferDaysRemaining} Days
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="text-xs text-slate-700 font-sans leading-relaxed">
                  {ref.vulnerabilityNote}
                </div>
                <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-xs text-slate-800 font-sans leading-relaxed">
                  <span className="font-mono text-[10px] uppercase font-bold text-sky-900 block mb-0.5">
                    Mitigation:
                  </span>
                  {ref.mitigationAction}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
