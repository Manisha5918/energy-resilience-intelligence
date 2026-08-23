"use client";

import { ActivityIcon, ArrowRightIcon, AlertTriangleIcon, CheckCircleIcon, ShieldIcon } from "@/components/ui/Icons";

export default function NetworkCascade({ cascadeSteps }) {
  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              End-to-End Disruption Impact Cascade Chain
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              CROSS-LAYER PROPAGATION
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Traces physical propagation from maritime chokepoint shocks through port berths, refineries, and strategic reserve triggers.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 self-start sm:self-auto font-semibold">
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
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDisrupted
                  ? "bg-rose-50/70 border-rose-200"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                  isDisrupted 
                    ? "bg-rose-100 text-rose-800 border border-rose-300" 
                    : "bg-sky-100 text-sky-800 border border-sky-300"
                }`}>
                  {step.step}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold font-heading text-slate-900">{step.title}</h4>
                    {isDisrupted && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200 font-bold">
                        IMPACTED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 font-sans mt-0.5 leading-snug">
                    {step.detail}
                  </p>
                </div>
              </div>

              {/* Extra step tags */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono sm:text-right shrink-0">
                {step.affectedCorridors && (
                  <span className="text-sky-900 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-medium">
                    Corridors: {step.affectedCorridors.join(", ")}
                  </span>
                )}
                {step.affectedSuppliers && (
                  <span className="text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-medium">
                    Origins: {step.affectedSuppliers.join(", ")}
                  </span>
                )}
                {step.sprCoverRemainingDays && (
                  <span className="text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                    SPR Cover: {step.sprCoverRemainingDays} Days
                  </span>
                )}
                {step.procurementScore && (
                  <span className="text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold">
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
