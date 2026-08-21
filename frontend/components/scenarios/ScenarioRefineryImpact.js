"use client";

import { DatabaseIcon, ShieldIcon, AlertTriangleIcon } from "@/components/ui/Icons";

export default function ScenarioRefineryImpact({ refineryExposures }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Refinery Feedstock Exposure & Buffer Depletion
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              REFINERY RUN STRESS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Model-projected onsite tank farm inventory drawdown and feedstock supply security at key domestic refining nodes.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          6 REFINING CENTRES
        </div>
      </div>

      {/* Refinery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {refineryExposures.map((ref, idx) => {
          const isCritical = ref.scenarioRisk === "CRITICAL";
          const isHigh = ref.scenarioRisk === "HIGH";

          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#080d16] border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold font-mono text-slate-100">{ref.name}</h4>
                  <span className="text-[10px] text-slate-400 font-sans">{ref.location}</span>
                </div>

                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${
                  isCritical
                    ? "bg-rose-950 text-rose-400 border-rose-800 font-bold"
                    : isHigh
                    ? "bg-amber-950 text-amber-400 border-amber-800 font-bold"
                    : "bg-emerald-950 text-emerald-400 border-emerald-800"
                }`}>
                  {ref.scenarioRisk}
                </span>
              </div>

              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] text-slate-400 uppercase">Buffer Days Left:</span>
                <span className={`font-bold ${ref.bufferDaysRemaining < 5 ? "text-rose-400" : "text-amber-400"}`}>
                  {ref.bufferDaysRemaining} Days
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="text-[11px] text-slate-300 font-sans leading-snug">
                  {ref.vulnerabilityNote}
                </div>
                <div className="p-2 rounded bg-[#060a12] border border-cyan-900/40 text-[11px] text-cyan-300 font-sans leading-snug">
                  <span className="font-mono text-[9px] uppercase font-bold text-cyan-400 block mb-0.5">
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
