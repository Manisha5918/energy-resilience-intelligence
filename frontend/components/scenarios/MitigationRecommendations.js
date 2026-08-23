"use client";

import { ShieldIcon, AlertTriangleIcon, CheckCircleIcon, ZapIcon } from "@/components/ui/Icons";

export default function MitigationRecommendations({ recommendations }) {
  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 space-y-5 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Adaptive Procurement & Mitigation Strategy
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              ACTION ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Rule-generated actionable interventions prioritized to arrest resilience deterioration and stabilize national feedstock.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500 font-semibold">
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
            ? "bg-rose-50 text-rose-800 border-rose-200 font-bold"
            : isHigh
            ? "bg-amber-50 text-amber-800 border-amber-200 font-bold"
            : isMedium
            ? "bg-sky-50 text-sky-800 border-sky-200 font-bold"
            : "bg-slate-100 text-slate-700 border-slate-200";

          return (
            <div
              key={rec.id}
              className={`p-4 rounded-xl border transition-all ${
                isCritical
                  ? "bg-rose-50/40 border-rose-200"
                  : isHigh
                  ? "bg-amber-50/40 border-amber-200"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                    {rec.priority} PRIORITY
                  </span>
                  <span className="text-xs font-mono text-slate-700 font-semibold">
                    [{rec.targetEntity}]
                  </span>
                </div>

                <span className="text-[10px] font-mono text-slate-500 font-medium">
                  SIMULATION MITIGATION PROTOCOL
                </span>
              </div>

              <div className="mt-3">
                <h4 className="text-sm font-bold text-slate-900 font-sans leading-snug">
                  {rec.action}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2.5 text-xs font-sans">
                  <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold block mb-0.5">
                      Trigger Rationale:
                    </span>
                    <p className="text-slate-700 leading-relaxed text-xs">
                      {rec.reason}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-sky-50 border border-sky-200">
                    <span className="text-[10px] font-mono text-sky-900 uppercase font-bold block mb-0.5">
                      Expected Resilience Effect:
                    </span>
                    <p className="text-slate-800 leading-relaxed text-xs">
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
