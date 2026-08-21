"use client";

import { ShieldIcon, AlertTriangleIcon, CheckCircleIcon, ZapIcon } from "@/components/ui/Icons";

export default function MitigationRecommendations({ recommendations }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Adaptive Procurement & Mitigation Strategy
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              ACTION ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Rule-generated actionable interventions prioritized to arrest resilience deterioration and stabilize national feedstock.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          {recommendations.length} PRIORITIZED ACTIONS
        </div>
      </div>

      {/* Recommendations Feed */}
      <div className="space-y-3">
        {recommendations.map((rec) => {
          const isCritical = rec.priority === "CRITICAL";
          const isHigh = rec.priority === "HIGH";
          const isMedium = rec.priority === "MEDIUM";

          const badgeColor = isCritical
            ? "bg-rose-950/80 text-rose-400 border-rose-800"
            : isHigh
            ? "bg-amber-950/80 text-amber-400 border-amber-800"
            : isMedium
            ? "bg-cyan-950/80 text-cyan-400 border-cyan-800"
            : "bg-slate-800 text-slate-300 border-slate-700";

          return (
            <div
              key={rec.id}
              className={`p-4 rounded-xl border transition-all ${
                isCritical
                  ? "bg-[#110d18] border-rose-900/60"
                  : isHigh
                  ? "bg-[#111116] border-amber-900/50"
                  : "bg-[#080d16] border-slate-800/90"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                    {rec.priority} PRIORITY
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-medium">
                    [{rec.targetEntity}]
                  </span>
                </div>

                <span className="text-[10px] font-mono text-slate-500">
                  SIMULATION MITIGATION PROTOCOL
                </span>
              </div>

              <div className="mt-2.5">
                <h4 className="text-sm font-bold text-slate-100 font-sans leading-snug">
                  {rec.action}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-xs font-sans">
                  <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block mb-0.5">
                      Trigger Rationale:
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {rec.reason}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#060a12] border border-cyan-900/50">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold block mb-0.5">
                      Expected Resilience Effect:
                    </span>
                    <p className="text-slate-200 leading-relaxed text-[11px]">
                      {rec.expectedEffect}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
