"use client";

import { AlertTriangleIcon, InfoIcon, ShieldIcon } from "@/components/ui/Icons";

export default function ConflictingSignalsAlert() {
  return (
    <div className="rounded-2xl p-6 border border-[#C7E3F7] bg-white space-y-4 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C7E3F7] pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangleIcon className="w-5 h-5 text-amber-600" />
          <h3 className="text-sm sm:text-base font-bold text-[#16324F] font-mono tracking-tight">
            Automated Multi-Source Conflict Detection &amp; Reconciliation
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] font-bold">
            AUDIT INTEGRITY
          </span>
        </div>

        <div className="text-[11px] font-mono text-[#D97706] font-bold">
          CONFIDENCE PENALTY APPLIED
        </div>
      </div>

      {/* Discrepancy Case Card */}
      <div className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] space-y-3 text-xs font-mono shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#16324F]">
          <span className="font-bold text-sm text-[#16324F]">Case 2026-DISC-04: Hormuz Transit Velocity Discrepancy</span>
          <span className="text-[#D97706] text-xs font-bold">Confidence Adjusted: 95% → 78%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-[11px]">
          <div className="p-3.5 rounded-lg bg-white border border-[#D5E5F1] shadow-2xs">
            <span className="text-[#58708A] uppercase block text-[10px] font-bold">Source A: Satellite AIS Telemetry</span>
            <p className="text-[#16324F] font-sans mt-1 leading-relaxed">
              VLCC convoy speeds through northern separation scheme recorded at 8.2 knots (-32% vs 30-day moving average).
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-white border border-[#D5E5F1] shadow-2xs">
            <span className="text-[#58708A] uppercase block text-[10px] font-bold">Source B: Port Authority Clearance Wire</span>
            <p className="text-[#16324F] font-sans mt-1 leading-relaxed">
              Port dispatch logs report routine clearance schedules for Mina Al Ahmadi and Ras Tanura liftings.
            </p>
          </div>
        </div>

        <p className="text-xs text-[#16324F] font-sans leading-relaxed pt-1.5 border-t border-[#D5E5F1]">
          <strong className="text-[#D97706] font-mono font-bold">System Reconciliation: </strong>
          EnergyShield suppresses single-source certainty claims, elevates caution levels on the Strait of Hormuz corridor, and flags the incident for human risk officer review.
        </p>
      </div>

    </div>
  );
}
