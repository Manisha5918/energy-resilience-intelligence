"use client";

import { ActivityIcon, ArrowRightIcon, AlertTriangleIcon, CheckCircleIcon, ShieldIcon } from "@/components/ui/Icons";

export default function NetworkCascade({ cascadeSteps }) {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4 bg-[#080d16]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              End-to-End Disruption Impact Cascade Chain
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              CROSS-LAYER PROPAGATION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Traces physical propagation from maritime chokepoint shocks through port berths, refineries, and strategic reserve triggers.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          7 CRITICAL STAGES
        </div>
      </div>

      {/* Vertical Stepper Chain */}
      <div className="space-y-3">
        {cascadeSteps.map((step) => {
          const isDisrupted = step.status === "DISRUPTED" || step.status === "RESTRICTED";

          return (
            <div
              key={step.step}
              className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDisrupted
                  ? "bg-[#140b10] border-rose-900/60"
                  : "bg-slate-900/60 border-slate-800/80"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                  isDisrupted ? "bg-rose-950 text-rose-400 border border-rose-700" : "bg-cyan-950 text-cyan-400 border border-cyan-700"
                }`}>
                  {step.step}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold font-mono text-slate-100">{step.title}</h4>
                    {isDisrupted && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold">
                        IMPACTED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 font-sans mt-0.5 leading-snug">
                    {step.detail}
                  </p>
                </div>
              </div>

              {/* Extra step tags */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-400 sm:text-right shrink-0">
                {step.affectedCorridors && (
                  <span className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Corridors: {step.affectedCorridors.join(", ")}
                  </span>
                )}
                {step.affectedSuppliers && (
                  <span className="text-amber-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Origins: {step.affectedSuppliers.join(", ")}
                  </span>
                )}
                {step.sprCoverRemainingDays && (
                  <span className="text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    SPR Cover: {step.sprCoverRemainingDays} Days
                  </span>
                )}
                {step.procurementScore && (
                  <span className="text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-bold">
                    Score: {step.procurementScore}/100
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
