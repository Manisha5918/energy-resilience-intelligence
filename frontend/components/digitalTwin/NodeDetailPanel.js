"use client";

import Link from "next/link";
import { ShieldIcon, NavigationIcon, AlertTriangleIcon, CheckCircleIcon } from "@/components/ui/Icons";
import { calculateAlternativePaths } from "@/lib/digitalTwinEngine";

export default function NodeDetailPanel({ node, scenarioId }) {
  if (!node) {
    return (
      <div className="rounded-2xl p-8 border border-[#D5E5F1] bg-[#F8FBFE] shadow-sm text-center text-[#526B84] font-mono text-xs">
        Click any node on the Digital Twin graph to inspect infrastructure telemetry and bypass routing.
      </div>
    );
  }

  const alternativePaths = calculateAlternativePaths(node.id);
  const isCritical = node.riskTier === "CRITICAL";
  const isHigh = node.riskTier === "HIGH";

  return (
    <div className="rounded-2xl p-5 sm:p-6 border border-[#D5E5F1] space-y-4 bg-[#F8FBFE] shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5E5F1] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
              isCritical
                ? "bg-rose-50 text-rose-800 border-rose-200"
                : isHigh
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-sky-50 text-sky-800 border-sky-200"
            }`}>
              {node.riskTier} RISK ({node.currentRisk}/100)
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#EDF5FB] text-[#45627D] border border-[#D5E4F0]">
              {node.type}
            </span>
          </div>

          <h3 className="text-base font-bold font-heading text-[#10233F] mt-2">
            {node.name}
          </h3>
        </div>

        <div className="text-[10px] font-mono text-[#526B84]">
          STATUS: <span className="text-sky-700 font-bold">{node.status}</span>
        </div>
      </div>

      {/* Core Flow & Operational KPIs */}
      <div className="grid grid-cols-3 gap-2.5 text-xs font-mono">
        <div className="p-3 rounded-xl bg-[#F4F9FD] border border-[#D5E5F1] shadow-2xs hover:bg-[#EEF7FD] transition-colors">
          <span className="text-[9px] text-[#7189A1] uppercase block font-semibold">Active Throughput</span>
          <div className="text-base font-bold text-sky-700 mt-0.5">
            {node.currentFlowMbd || 0} <span className="text-xs text-[#7189A1] font-normal">MBD</span>
          </div>
          <span className="text-[9px] text-[#526B84]">Flow volume</span>
        </div>

        <div className="p-3 rounded-xl bg-[#F4F9FD] border border-[#D5E5F1] shadow-2xs hover:bg-[#EEF7FD] transition-colors">
          <span className="text-[9px] text-[#7189A1] uppercase block font-semibold">Total Capacity</span>
          <div className="text-base font-bold text-[#10233F] mt-0.5">
            {node.flowCapacityMbd || node.capacityMmT || "--"} <span className="text-xs text-[#7189A1] font-normal">{node.capacityMmT ? "MMT" : "MBD"}</span>
          </div>
          <span className="text-[9px] text-[#526B84]">Nominal limit</span>
        </div>

        <div className="p-3 rounded-xl bg-[#F4F9FD] border border-[#D5E5F1] shadow-2xs hover:bg-[#EEF7FD] transition-colors">
          <span className="text-[9px] text-[#7189A1] uppercase block font-semibold">Utilization</span>
          <div className="text-base font-bold text-emerald-700 mt-0.5">
            {node.utilizationPct || 85}%
          </div>
          <span className="text-[9px] text-[#526B84]">Operating rate</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-[#526B84] font-sans leading-relaxed">
        {node.description}
      </p>

      {/* Alternative Paths & Bypass Routing */}
      {alternativePaths.length > 0 && (
        <div className="p-3.5 rounded-xl bg-[#EDF5FB] border border-[#D5E4F0] space-y-2">
          <div className="flex items-center justify-between text-[#0B3C61] font-mono text-xs font-bold uppercase">
            <span className="flex items-center gap-1.5">
              <NavigationIcon className="w-3.5 h-3.5 text-sky-600" />
              <span>Available Network Bypass Paths</span>
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white border border-[#D5E4F0] text-[#0B3C61] font-normal">
              {alternativePaths.length} ALTERNATIVES
            </span>
          </div>

          <div className="space-y-2">
            {alternativePaths.map((alt, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-white border border-[#D5E5F1] text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                <div>
                  <h5 className="font-bold text-[#10233F]">{alt.name}</h5>
                  <div className="text-[10px] text-[#526B84] mt-0.5">
                    Mode: {alt.mode} • Extra Transit: +{alt.additionalDays} Days
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-[#7189A1] block">Cost Delta</span>
                    <span className="text-amber-700 font-bold font-mono text-xs">+${alt.freightCostDeltaUsd}/bbl</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    {alt.bypassCapacityMbd} MBD
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Link to Scenario Disruption Simulator */}
      <div className="pt-2 flex justify-end">
        <Link
          href={`/scenarios?node=${node.id}`}
          className="text-xs font-mono text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1 cursor-pointer"
        >
          <span>Run Custom Disruption on this Node →</span>
        </Link>
      </div>

    </div>
  );
}
