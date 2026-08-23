"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { generateExecutiveDirective } from "@/lib/procurementDirectiveEngine";
import { 
  ShieldIcon, 
  DownloadIcon, 
  ActivityIcon, 
  AlertTriangleIcon, 
  DatabaseIcon, 
  ExternalLinkIcon,
  ZapIcon,
  CheckCircleIcon,
  ChevronDownIcon
} from "@/components/ui/Icons";

export default function ExecutiveProcurementDirective({
  selectedStrategy,
  targetSupplyGapMbd,
  planningHorizonDays,
  resilienceScore
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const reportContainerRef = useRef(null);

  // Directly derive directive data in render cycle (Pure computation with useMemo)
  const directiveData = useMemo(() => {
    return generateExecutiveDirective({
      selectedStrategy,
      targetSupplyGapMbd,
      planningHorizonDays,
      resilienceScore: resilienceScore || 64
    });
  }, [selectedStrategy, targetSupplyGapMbd, planningHorizonDays, resilienceScore]);

  // Robust container resize observer to ensure parent layouts adapt smoothly
  useEffect(() => {
    if (!reportContainerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target) {
          entry.target.style.height = "auto";
        }
      }
    });
    resizeObserver.observe(reportContainerRef.current);
    return () => resizeObserver.disconnect();
  }, [isExpanded]);

  const handleExportJSON = () => {
    const data = directiveData;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `EnergyShield-Directive-${data.directiveId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrintOrPDF = () => {
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div 
      ref={reportContainerRef}
      className="w-full rounded-2xl p-6 sm:p-8 border border-[#C7E3F7] bg-white shadow-xs space-y-6 transition-all duration-200"
    >
      {/* Header & Directive Action Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#D5E5F1] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-5 h-5 text-[#0284c7]" />
            <h3 className="text-base sm:text-lg font-bold text-[#16324F] tracking-tight">
              Executive Procurement Directive Docket &amp; Allocation Report
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] font-bold">
              {directiveData.directiveId}
            </span>
          </div>
          <p className="text-xs text-[#58708A] mt-1 font-sans max-w-2xl">
            Synthesized optimization model providing an itemized, refiner-by-refiner crude allocation docket, chokepoint bypass routing, and compliance screening protocols.
          </p>
        </div>

        {/* Action Button Group */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3.5 py-2 rounded-xl bg-[#EFF8FF] hover:bg-[#E0F2FE] text-[#0B2540] font-mono text-xs font-bold border border-[#B9DDF5] transition flex items-center gap-1.5 cursor-pointer shadow-2xs min-h-[40px]"
            aria-label="Toggle Full Inline Report"
          >
            <span>{isExpanded ? "Collapse View" : "Expand Full Report"}</span>
            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F4F9FD] text-[#16324F] font-mono text-xs font-semibold border border-[#C7E3F7] transition flex items-center gap-1.5 cursor-pointer shadow-2xs min-h-[40px]"
            aria-label="Export Procurement Directive as JSON"
          >
            <DownloadIcon className="w-4 h-4 text-[#0284c7]" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handlePrintOrPDF}
            className="px-3.5 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-mono text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm min-h-[40px]"
            aria-label="Export Procurement Directive as PDF or Print"
          >
            <ExternalLinkIcon className="w-4 h-4 text-white" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Mandatory Non-Executable Safety Banner */}
      <div className="rounded-xl p-4 bg-[#FFFBEB] border border-[#FDE68A] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#92400E] font-mono">
        <span className="font-bold flex items-center gap-2">
          <AlertTriangleIcon className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>{directiveData.legalNotice}</span>
        </span>
        <span className="text-[10px] text-[#B45309] font-sans font-medium">
          Assays &amp; SPM drafts must be verified prior to commercial execution.
        </span>
      </div>

      {/* Full Inline Report Document */}
      {isExpanded && (
        <div className="w-full space-y-6 pt-2 animate-fadeIn">
          
          {/* A. EXECUTIVE STRATEGY FORMULATION */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-[#16324F] tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded bg-[#0284c7]" />
              A. Executive Summary &amp; Strategy Formulation
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F4F9FD] p-4 rounded-xl border border-[#C7E3F7] text-xs font-mono">
              <div>
                <span className="text-[#58708A] text-[11px] block font-semibold">Target Supply Gap:</span>
                <span className="text-base font-bold text-[#FF3D6E]">{directiveData.executiveSummary.targetSupplyGapMbd} MBD</span>
              </div>
              <div>
                <span className="text-[#58708A] text-[11px] block font-semibold">Weighted Landed Cost:</span>
                <span className="text-base font-bold text-[#16324F]">${directiveData.executiveSummary.weightedLandedCostUsd}/bbl</span>
              </div>
              <div>
                <span className="text-[#58708A] text-[11px] block font-semibold">HHI Concentration:</span>
                <span className="text-base font-bold text-[#0284c7]">{directiveData.executiveSummary.herfindahlIndexHHI} pts</span>
              </div>
              <div>
                <span className="text-[#58708A] text-[11px] block font-semibold">Replacement Cover:</span>
                <span className="text-base font-bold text-[#00C98D]">100% Fulfilled</span>
              </div>
            </div>
          </div>

          {/* B. REFINER-BY-REFINER ALLOCATION MATRIX */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-[#16324F] tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded bg-[#0284c7]" />
              B. Refiner-by-Refiner Crude Sourcing Allocation Matrix
            </h4>
            
            <div className="w-full overflow-x-auto rounded-xl border border-[#C7E3F7] shadow-2xs">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="bg-[#EEF7FF] text-[#16324F] border-b border-[#C7E3F7]">
                    <th className="py-3 px-3.5 font-bold">Refinery Complex</th>
                    <th className="py-3 px-3.5 font-bold">Recommended Source</th>
                    <th className="py-3 px-3.5 font-bold">Crude Grade</th>
                    <th className="py-3 px-3.5 font-bold">Allocation (MBD)</th>
                    <th className="py-3 px-3.5 font-bold">Share %</th>
                    <th className="py-3 px-3.5 font-bold">Landed Cost</th>
                    <th className="py-3 px-3.5 font-bold">Transit</th>
                    <th className="py-3 px-3.5 font-bold">Risk</th>
                    <th className="py-3 px-3.5 font-bold">Strategic Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D5E5F1] text-[11px]">
                  {directiveData.refinerAllocations.map((r) => (
                    <tr key={r.refinerId} className="hover:bg-[#F4F9FD] transition-colors">
                      <td className="py-3 px-3.5 font-bold text-[#16324F]">
                        {r.refinerName}
                        <span className="block text-[10px] text-[#58708A] font-normal">{r.location}</span>
                      </td>
                      <td className="py-3 px-3.5 font-bold text-[#0284c7]">{r.recommendedSource}</td>
                      <td className="py-3 px-3.5 text-[#58708A]">{r.crudeGrade}</td>
                      <td className="py-3 px-3.5 font-bold text-[#16324F]">{r.allocationMbd} MBD</td>
                      <td className="py-3 px-3.5 text-[#16324F] font-semibold">{r.allocationPct}%</td>
                      <td className="py-3 px-3.5 font-bold text-[#16324F]">${r.estimatedLandedCostUsd}</td>
                      <td className="py-3 px-3.5 text-[#58708A]">{r.transitDays}d</td>
                      <td className="py-3 px-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          r.riskLevel === "LOW" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" :
                          r.riskLevel === "MODERATE" ? "bg-amber-50 text-amber-800 border border-amber-200" :
                          "bg-rose-50 text-rose-800 border border-rose-200"
                        }`}>
                          {r.riskLevel}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-[#58708A] text-[10px] max-w-xs leading-relaxed font-sans">{r.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* C. ARTERIAL LOGISTICS & CHOKEPOINT AVOIDANCE ROUTING */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-[#16324F] tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded bg-[#0284c7]" />
              C. Arterial Logistics &amp; Chokepoint Avoidance Routing Plan
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              {directiveData.logisticsPlan.map((l, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#16324F]">{l.corridor}</span>
                    <span className="text-[10px] font-bold text-[#0284c7] bg-[#E0F2FE] px-2 py-0.5 rounded">{l.assignedVolumeMbd} MBD</span>
                  </div>
                  <p className="text-[11px] text-[#58708A] font-sans leading-relaxed">{l.chokepointAvoidance}</p>
                  <div className="text-[10px] text-[#58708A] pt-1 border-t border-[#D5E5F1]">
                    Transit: <span className="font-bold text-[#16324F]">{l.transitRangeDays}</span> | Security: <span className="text-emerald-700 font-bold">{l.securityStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* D. RISK CONTROLS & SANCTIONS COMPLIANCE */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-[#16324F] tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded bg-[#0284c7]" />
              D. Risk Controls &amp; Sovereign Sanctions Screening Protocols
            </h4>
            <div className="space-y-3 text-xs font-mono bg-[#F4F9FD] p-4 rounded-xl border border-[#C7E3F7]">
              {directiveData.riskControls.map((ctrl, idx) => (
                <div key={idx} className="border-b border-[#D5E5F1] last:border-0 pb-2.5 last:pb-0">
                  <span className="font-bold text-[#16324F] block">{ctrl.category}: {ctrl.rule}</span>
                  <p className="text-[11px] text-[#58708A] font-sans mt-0.5 leading-relaxed">{ctrl.protocol}</p>
                </div>
              ))}
            </div>
          </div>

          {/* E. DATA PROVENANCE FOOTER */}
          <div className="text-[11px] font-mono text-[#58708A] bg-[#EEF7FF] p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-[#C7E3F7]">
            <span>Provenance: {directiveData.dataProvenance.refineryCapacities} | Optimization: {directiveData.dataProvenance.optimizationEngine}</span>
            <span className="text-[#D97706] font-bold">STATUS: {directiveData.dataProvenance.status}</span>
          </div>

        </div>
      )}
    </div>
  );
}
