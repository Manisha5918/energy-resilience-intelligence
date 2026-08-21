"use client";

import { InfoIcon, ShieldIcon } from "@/components/ui/Icons";

export default function DigitalTwinModelAssumptions() {
  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-3.5 bg-[#080d16]">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <InfoIcon className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
            Supply Chain Digital Twin Assumptions & Network Disclaimers
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800 text-amber-300">
          SIMULATED TOPOLOGICAL TWIN
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-[9px] text-slate-500 uppercase block">Topological Nodes</span>
          <span className="text-slate-200 font-bold">25 Network Entities</span>
          <span className="text-[9px] text-slate-500 block">Origins, ports & plants</span>
        </div>

        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-[9px] text-slate-500 uppercase block">Maritime Artery Edges</span>
          <span className="text-slate-200 font-bold">18 Directed Pipelines/Routes</span>
          <span className="text-[9px] text-slate-500 block">Flow volume weighted</span>
        </div>

        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-[9px] text-slate-500 uppercase block">Phase Integrations</span>
          <span className="text-emerald-400 font-bold">Phases 1, 2, 3, 4</span>
          <span className="text-[9px] text-slate-500 block">Full stack telemetry</span>
        </div>

        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-[9px] text-slate-500 uppercase block">Operational Nature</span>
          <span className="text-cyan-400 font-bold">Decision Support</span>
          <span className="text-[9px] text-slate-500 block">Advisory simulation only</span>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1">
        <span className="font-semibold text-slate-300">Network Disclosure: </span>
        The EnergyShield Supply Chain Digital Twin is a synthetic, high-fidelity topological model designed for strategic risk analysis and national energy security exercises. It visualizes arterial dependency, chokepoint vulnerabilities, and recommended response pathways without accessing restricted operational telemetry.
      </div>
    </div>
  );
}
