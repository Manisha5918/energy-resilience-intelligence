"use client";

import { AlertTriangleIcon, InfoIcon, ShieldIcon } from "@/components/ui/Icons";

export default function ConflictingSignalsAlert() {
  return (
    <div className="command-card rounded-xl p-5 border border-amber-800/60 bg-gradient-to-r from-[#171008] via-[#0e0d14] to-[#070a10] space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangleIcon className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-amber-200 font-mono tracking-wide">
            Automated Multi-Source Conflict Detection & Reconciliation
          </h3>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/90 border border-amber-700 text-amber-300">
            AUDIT INTEGRITY
          </span>
        </div>

        <div className="text-[10px] font-mono text-amber-400">
          CONFIDENCE PENALTY APPLIED
        </div>
      </div>

      {/* Discrepancy Card */}
      <div className="p-3.5 rounded-lg bg-slate-900/80 border border-amber-800/40 space-y-2 text-xs font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-300">
          <span className="font-bold text-white">Case 2026-DISC-04: Hormuz Transit Velocity Discrepancy</span>
          <span className="text-amber-400 text-[10px]">Confidence Adjusted: 95% → 78%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-[11px]">
          <div className="p-2.5 rounded bg-[#0b101d] border border-slate-800">
            <span className="text-slate-500 uppercase block text-[9px] font-bold">Source A: Satellite AIS Telemetry</span>
            <p className="text-slate-200 font-sans mt-0.5">
              VLCC convoy speeds through northern separation scheme recorded at 8.2 knots (-32% vs 30-day moving average).
            </p>
          </div>

          <div className="p-2.5 rounded bg-[#0b101d] border border-slate-800">
            <span className="text-slate-500 uppercase block text-[9px] font-bold">Source B: Port Authority Clearance Wire</span>
            <p className="text-slate-200 font-sans mt-0.5">
              Port dispatch logs report routine clearance schedules for Mina Al Ahmadi and Ras Tanura liftings.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1">
          <b className="text-amber-300">System Reconciliation: </b>
          EnergyShield suppresses single-source certainty claims, elevates caution levels on the Strait of Hormuz corridor, and flags the incident for human risk officer review.
        </p>
      </div>

    </div>
  );
}
