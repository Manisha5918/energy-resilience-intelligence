"use client";

import Link from "next/link";
import { ShieldIcon, NavigationIcon, AlertTriangleIcon, CheckCircleIcon, ExternalLink } from "@/components/ui/Icons";
import { calculateAlternativePaths } from "@/lib/digitalTwinEngine";

export default function NodeDetailPanel({ node, scenarioId }) {
  if (!node) {
    return (
      <div className="command-card rounded-2xl p-8 border border-slate-800 text-center text-slate-500 font-mono text-xs">
        Click any node on the Digital Twin graph to inspect infrastructure telemetry and bypass routing.
      </div>
    );
  }

  const alternativePaths = calculateAlternativePaths(node.id);
  const isCritical = node.riskTier === "CRITICAL";
  const isHigh = node.riskTier === "HIGH";

  return (
    <div className="command-card rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4 bg-gradient-to-br from-[#0c1424] via-[#080d16] to-[#04070c]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
              isCritical
                ? "bg-rose-950 text-rose-400 border-rose-800"
                : isHigh
                ? "bg-amber-950 text-amber-400 border-amber-800"
                : "bg-cyan-950 text-cyan-400 border-cyan-800"
            }`}>
              {node.riskTier} RISK ({node.currentRisk}/100)
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {node.type}
            </span>
          </div>

          <h3 className="text-base font-bold font-mono text-white mt-2">
            {node.name}
          </h3>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          STATUS: <span className="text-cyan-400 font-bold">{node.status}</span>
        </div>
      </div>

      {/* Core Flow & Operational KPIs */}
      <div className="grid grid-cols-3 gap-2.5 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[9px] text-slate-500 uppercase block">Active Throughput</span>
          <div className="text-base font-bold text-cyan-300 mt-0.5">
            {node.currentFlowMbd || 0} <span className="text-xs text-slate-400 font-normal">MBD</span>
          </div>
          <span className="text-[9px] text-slate-500">Flow volume</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[9px] text-slate-500 uppercase block">Total Capacity</span>
          <div className="text-base font-bold text-slate-200 mt-0.5">
            {node.flowCapacityMbd || node.capacityMmT || "--"} <span className="text-xs text-slate-400 font-normal">{node.capacityMmT ? "MMT" : "MBD"}</span>
          </div>
          <span className="text-[9px] text-slate-500">Nominal limit</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[9px] text-slate-500 uppercase block">Utilization</span>
          <div className="text-base font-bold text-emerald-400 mt-0.5">
            {node.utilizationPct || 85}%
          </div>
          <span className="text-[9px] text-slate-500">Operating rate</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-300 font-sans leading-relaxed">
        {node.description}
      </p>

      {/* Alternative Paths & Bypass Routing */}
      {alternativePaths.length > 0 && (
        <div className="p-3.5 rounded-xl bg-[#060a12] border border-cyan-900/40 space-y-2">
          <div className="flex items-center justify-between text-cyan-400 font-mono text-xs font-bold uppercase">
            <span className="flex items-center gap-1.5">
              <NavigationIcon className="w-3.5 h-3.5" />
              <span>Available Network Bypass Paths</span>
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-normal">
              {alternativePaths.length} ALTERNATIVES
            </span>
          </div>

          <div className="space-y-2">
            {alternativePaths.map((alt, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h5 className="font-bold text-slate-100">{alt.name}</h5>
                  <span className="text-[10px] text-slate-400 font-sans block">{alt.corridor}</span>
                </div>

                <div className="flex items-center gap-3 text-[10px]">
                  <span className="text-slate-300">Transit: <b className="text-cyan-300">{alt.transitDeltaDays > 0 ? `+${alt.transitDeltaDays}d` : `${alt.transitDeltaDays}d`}</b></span>
                  <span className="text-slate-300">Capacity: <b className="text-emerald-400">{alt.capacityMbd} MBD</b></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Footer linking to Scenario Simulator / Procurement */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-[11px] font-mono">
        <span className="text-slate-500">Topology Layer: {node.category}</span>

        <Link
          href={`/procurement?scenario=${scenarioId}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-sm cursor-pointer"
        >
          <ShieldIcon className="w-3.5 h-3.5" />
          <span>Optimize Route in Procurement →</span>
        </Link>
      </div>

    </div>
  );
}
