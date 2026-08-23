"use client";

import { useState } from "react";
import { generateExecutiveDirective } from "@/lib/procurementDirectiveEngine";
import { 
  ShieldIcon, 
  DownloadIcon, 
  ActivityIcon, 
  AlertTriangleIcon, 
  DatabaseIcon, 
  ExternalLinkIcon,
  ZapIcon
} from "@/components/ui/Icons";

export default function ExecutiveProcurementDirective({
  selectedStrategy,
  targetSupplyGapMbd,
  planningHorizonDays,
  resilienceScore
}) {
  const [showModal, setShowModal] = useState(false);
  const [directiveData, setDirectiveData] = useState(null);

  const handleGeneratePreview = () => {
    const data = generateExecutiveDirective({
      selectedStrategy,
      targetSupplyGapMbd,
      planningHorizonDays,
      resilienceScore: resilienceScore || 64
    });
    setDirectiveData(data);
    setShowModal(true);
  };

  const handleExportJSON = () => {
    const data = directiveData || generateExecutiveDirective({
      selectedStrategy,
      targetSupplyGapMbd,
      planningHorizonDays,
      resilienceScore: resilienceScore || 64
    });

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
    if (!directiveData) {
      const data = generateExecutiveDirective({
        selectedStrategy,
        targetSupplyGapMbd,
        planningHorizonDays,
        resilienceScore: resilienceScore || 64
      });
      setDirectiveData(data);
    }
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Header & Directive Action Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Executive Procurement Directive Generator
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-800 font-semibold">
              DECISION-SUPPORT DOCKET
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Synthesize ranked procurement optimization into an itemized, refiner-by-refiner crude allocation docket with logistics and compliance controls.
          </p>
        </div>

        {/* Action Button Group */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleGeneratePreview}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer min-h-[44px]"
            aria-label="Generate Executive Procurement Directive Preview"
          >
            <ZapIcon className="w-4 h-4" />
            <span>Generate Analytical Recommendation</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-semibold border border-slate-300 transition flex items-center gap-1.5 cursor-pointer min-h-[44px]"
            aria-label="Export Procurement Directive as JSON"
          >
            <DownloadIcon className="w-4 h-4 text-slate-600" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handlePrintOrPDF}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-semibold border border-slate-300 transition flex items-center gap-1.5 cursor-pointer min-h-[44px]"
            aria-label="Export Procurement Directive as PDF or Print"
          >
            <ExternalLinkIcon className="w-4 h-4 text-slate-600" />
            <span>Export PDF / Print</span>
          </button>
        </div>
      </div>

      {/* Mandatory Notice */}
      <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600 font-mono">
        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
          <AlertTriangleIcon className="w-4 h-4 text-amber-600" />
          MODEL-GENERATED DECISION SUPPORT — NOT AN EXECUTABLE PURCHASE ORDER
        </span>
        <span className="text-[10px] text-slate-500 hidden md:inline">
          Refinery allocations are indicative and subject to commercial MoPNG/PSU crude committee approvals.
        </span>
      </div>

      {/* Modal / Expanded Preview Sheet */}
      {showModal && directiveData && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="directive-modal-title"
        >
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-300 printable-directive">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-100 font-bold">
                    ENERGYSHIELD COCKPIT
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Ref: {directiveData.directiveId}
                  </span>
                </div>
                <h2 id="directive-modal-title" className="text-xl font-bold font-heading text-slate-900 mt-1">
                  National Strategic Crude Procurement Directive
                </h2>
                <p className="text-xs text-slate-500 font-mono">
                  Generated: {new Date(directiveData.generatedTimestamp).toLocaleString()} | Planning Window: {directiveData.executiveSummary.planningHorizonDays} Days
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintOrPDF}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono font-semibold hover:bg-indigo-100 transition flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLinkIcon className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-bold hover:bg-slate-200 transition cursor-pointer"
                  aria-label="Close Directive Preview Modal"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Prominent Legal Disclaimer & Operational Validation Notice Banner */}
            <div className="space-y-2">
              <div className="rounded-xl p-3 bg-amber-50 border border-amber-200 text-xs text-amber-900 font-mono font-bold flex items-center gap-2">
                <AlertTriangleIcon className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{directiveData.legalNotice}</span>
              </div>
              {directiveData.operationalValidationNotice && (
                <div className="rounded-xl p-2.5 bg-rose-50 border border-rose-200 text-[11px] text-rose-900 font-mono flex items-center gap-2">
                  <ShieldIcon className="w-4 h-4 text-rose-600 shrink-0" />
                  <span><strong>OPERATIONAL REFINERY SAFETY:</strong> {directiveData.operationalValidationNotice}</span>
                </div>
              )}
            </div>

            {/* A. EXECUTIVE SUMMARY */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-indigo-600" />
                A. Executive Summary & Strategy Formulation
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono">
                <div>
                  <span className="text-slate-500 text-[11px] block">Target Supply Gap:</span>
                  <span className="text-base font-bold text-slate-900">{directiveData.executiveSummary.targetSupplyGapMbd} MBD</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Weighted Landed Cost:</span>
                  <span className="text-base font-bold text-slate-900">${directiveData.executiveSummary.weightedLandedCostUsd}/bbl</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">HHI Concentration:</span>
                  <span className="text-base font-bold text-indigo-700">{directiveData.executiveSummary.herfindahlIndexHHI} pts</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Replacement Cover:</span>
                  <span className="text-base font-bold text-emerald-700">100% Fulfilled</span>
                </div>
              </div>
            </div>

            {/* B. REFINER ALLOCATION TABLE */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-indigo-600" />
                B. Refiner-by-Refiner Crude Sourcing Allocation Matrix
              </h4>
              
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <th className="py-2.5 px-3 font-semibold">Refinery Complex</th>
                      <th className="py-2.5 px-3 font-semibold">Recommended Source</th>
                      <th className="py-2.5 px-3 font-semibold">Crude Grade</th>
                      <th className="py-2.5 px-3 font-semibold">Allocation (MBD)</th>
                      <th className="py-2.5 px-3 font-semibold">Share %</th>
                      <th className="py-2.5 px-3 font-semibold">Landed Cost</th>
                      <th className="py-2.5 px-3 font-semibold">Transit</th>
                      <th className="py-2.5 px-3 font-semibold">Risk</th>
                      <th className="py-2.5 px-3 font-semibold">Strategic Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-[11px]">
                    {directiveData.refinerAllocations.map((r) => (
                      <tr key={r.refinerId} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">
                          {r.refinerName}
                          <span className="block text-[10px] text-slate-500 font-normal">{r.location}</span>
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-indigo-900">{r.recommendedSource}</td>
                        <td className="py-2.5 px-3 text-slate-600">{r.crudeGrade}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">{r.allocationMbd} MBD</td>
                        <td className="py-2.5 px-3">{r.allocationPct}%</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">${r.estimatedLandedCostUsd}</td>
                        <td className="py-2.5 px-3">{r.transitDays}d</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            r.riskLevel === "LOW" ? "bg-emerald-100 text-emerald-800" :
                            r.riskLevel === "MODERATE" ? "bg-amber-100 text-amber-800" :
                            "bg-rose-100 text-rose-800"
                          }`}>
                            {r.riskLevel}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 text-[10px] max-w-xs">{r.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* C. LOGISTICS & ROUTING PLAN */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-indigo-600" />
                C. Arterial Logistics & Chokepoint Avoidance Routing Plan
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                {directiveData.logisticsPlan.map((l, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{l.corridor}</span>
                      <span className="text-[10px] font-bold text-indigo-700">{l.assignedVolumeMbd} MBD</span>
                    </div>
                    <p className="text-[11px] text-slate-600">{l.chokepointAvoidance}</p>
                    <div className="text-[10px] text-slate-500">
                      Transit: <span className="font-bold text-slate-700">{l.transitRangeDays}</span> | Security: <span className="text-emerald-700 font-bold">{l.securityStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* D. RISK CONTROLS & SANCTIONS COMPLIANCE */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-indigo-600" />
                D. Risk Controls & Sovereign Sanctions Screening Protocols
              </h4>
              <div className="space-y-2 text-xs font-mono bg-slate-50 p-4 rounded-xl border border-slate-200">
                {directiveData.riskControls.map((ctrl, idx) => (
                  <div key={idx} className="border-b border-slate-200/80 last:border-0 pb-2 last:pb-0">
                    <span className="font-bold text-slate-900 block">{ctrl.category}: {ctrl.rule}</span>
                    <p className="text-[11px] text-slate-600 mt-0.5">{ctrl.protocol}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* E. DATA PROVENANCE */}
            <div className="text-[11px] font-mono text-slate-500 bg-slate-100 p-3 rounded-lg flex items-center justify-between border border-slate-200">
              <span>Provenance: {directiveData.dataProvenance.refineryCapacities} | Optimization: {directiveData.dataProvenance.optimizationEngine}</span>
              <span className="text-amber-700 font-bold">STATUS: {directiveData.dataProvenance.status}</span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
