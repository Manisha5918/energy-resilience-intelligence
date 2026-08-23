"use client";

import { InfoIcon, ShieldIcon } from "@/components/ui/Icons";

export default function DigitalTwinModelAssumptions() {
  return (
    <div className="rounded-2xl p-5 border border-[#D5E5F1] bg-[#F8FBFE] shadow-sm space-y-3.5">
      <div className="flex items-center justify-between border-b border-[#D5E5F1] pb-2.5">
        <div className="flex items-center gap-2">
          <InfoIcon className="w-4 h-4 text-sky-600" />
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#10233F] font-bold">
            Supply Chain Digital Twin Assumptions &amp; Network Disclaimers
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
          SIMULATED TOPOLOGICAL TWIN
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
        <div className="p-3 rounded-xl bg-[#F4F9FD] border border-[#D5E5F1] shadow-2xs hover:bg-[#EEF7FD] transition-colors">
          <span className="text-[9px] text-[#7189A1] uppercase block font-bold">Topological Nodes</span>
          <span className="text-[#10233F] font-bold block text-sm">25 Entities</span>
          <span className="text-[9px] text-[#526B84] block">Origins, ports &amp; plants</span>
        </div>

        <div className="p-3 rounded-xl bg-[#F4F9FD] border border-[#D5E5F1] shadow-2xs hover:bg-[#EEF7FD] transition-colors">
          <span className="text-[9px] text-[#7189A1] uppercase block font-bold">Maritime Artery Edges</span>
          <span className="text-[#10233F] font-bold block text-sm">18 Routes</span>
          <span className="text-[9px] text-[#526B84] block">Flow volume weighted</span>
        </div>

        <div className="p-3 rounded-xl bg-[#F4F9FD] border border-[#D5E5F1] shadow-2xs hover:bg-[#EEF7FD] transition-colors">
          <span className="text-[9px] text-[#7189A1] uppercase block font-bold">Phase Iterations</span>
          <span className="text-emerald-700 font-bold block text-sm">Phases 1–4</span>
          <span className="text-[9px] text-[#526B84] block">Full stack telemetry</span>
        </div>

        <div className="p-3 rounded-xl bg-[#F4F9FD] border border-[#D5E5F1] shadow-2xs hover:bg-[#EEF7FD] transition-colors">
          <span className="text-[9px] text-[#7189A1] uppercase block font-bold">Primary Engine</span>
          <span className="text-sky-700 font-bold block text-sm">Decision Support</span>
          <span className="text-[9px] text-[#526B84] block">Advisory simulation only</span>
        </div>
      </div>

      <div className="text-[11px] text-[#526B84] font-sans leading-relaxed pt-1">
        <strong className="font-semibold text-[#10233F]">Network Disclosure: </strong>
        The EnergyShield Supply Chain Digital Twin is a synthetic, high-fidelity topological model designed for strategic risk analysis and national energy security exercises. It visualizes arterial dependency, chokepoint vulnerabilities, and recommended response pathways without accessing restricted operational telemetry.
      </div>
    </div>
  );
}
