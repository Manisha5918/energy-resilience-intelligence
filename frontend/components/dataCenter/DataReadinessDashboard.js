"use client";

import { calculateDataReadinessMetrics } from "@/lib/data/provenanceRegistry";
import { 
  DatabaseIcon, 
  ShieldIcon, 
  CheckCircleIcon, 
  AlertTriangleIcon, 
  ActivityIcon,
  ZapIcon 
} from "@/components/ui/Icons";

export default function DataReadinessDashboard() {
  const readiness = calculateDataReadinessMetrics();
  const { 
    totalDatasets, 
    officialCount, 
    publicEstimateCount, 
    modelAssumptionCount, 
    simulatedCount, 
    pendingValidationCount,
    dataCompletenessPercent, 
    modelReadinessPercent, 
    readinessBreakdown,
    registry 
  } = readiness;

  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Centralized Data Readiness & Provenance Audit
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
              AUTHORITATIVE PROVENANCE LEDGER
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time audit of statutory official datasets, public market estimates, mathematical model assumptions, and pending validation fields.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold border border-slate-200">
            {totalDatasets} Datasets Tracked
          </span>
        </div>
      </div>

      {/* Primary Readiness Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-mono">
        
        {/* 1. Data Completeness */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-500 font-medium block uppercase">Data Completeness</span>
          <div className="text-2xl font-bold text-slate-900">{dataCompletenessPercent}%</div>
          <span className="text-[10px] text-slate-500 block">
            {officialCount + publicEstimateCount} of {totalDatasets} datasets verified
          </span>
        </div>

        {/* 2. Model Readiness */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-500 font-medium block uppercase">Model Readiness</span>
          <div className="text-2xl font-bold text-emerald-700">{modelReadinessPercent}%</div>
          <span className="text-[10px] text-slate-500 block">
            Full simulation capability active
          </span>
        </div>

        {/* 3. Official Inputs */}
        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
          <span className="text-[11px] text-emerald-800 font-medium block uppercase">Official Inputs</span>
          <div className="text-2xl font-bold text-emerald-800">{officialCount}</div>
          <span className="text-[10px] text-emerald-700 block">
            PPAC, DGCIS, ISPRL Capacity
          </span>
        </div>

        {/* 4. Model Assumptions */}
        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
          <span className="text-[11px] text-amber-800 font-medium block uppercase">Assumptions</span>
          <div className="text-2xl font-bold text-amber-800">{modelAssumptionCount}</div>
          <span className="text-[10px] text-amber-700 block">
            GDP & CAD Elasticity
          </span>
        </div>

        {/* 5. Pending Validation */}
        <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] text-sky-800 font-medium block uppercase">Pending Validation</span>
          <div className="text-2xl font-bold text-sky-800">{pendingValidationCount}</div>
          <span className="text-[10px] text-sky-700 block">
            Classified SCADA Telemetry
          </span>
        </div>
      </div>

      {/* Category Readiness Check Matrix */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider flex items-center gap-1.5">
          <ActivityIcon className="w-4 h-4 text-slate-700" />
          Subsystem Data Readiness Status
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          
          {/* Official Datasets */}
          <div className="p-3.5 rounded-xl border bg-slate-50 border-slate-200 flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 block">{readinessBreakdown.officialDatasets.label}</span>
              <span className="text-[10px] text-slate-500">{readinessBreakdown.officialDatasets.count} statutory sources verified</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
              [{readinessBreakdown.officialDatasets.status}]
            </span>
          </div>

          {/* Economic Assumptions */}
          <div className="p-3.5 rounded-xl border bg-slate-50 border-slate-200 flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 block">{readinessBreakdown.economicAssumptions.label}</span>
              <span className="text-[10px] text-slate-500">{readinessBreakdown.economicAssumptions.notes}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] border border-amber-300">
              [{readinessBreakdown.economicAssumptions.status}]
            </span>
          </div>

          {/* SPR Inventory */}
          <div className="p-3.5 rounded-xl border bg-slate-50 border-slate-200 flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 block">{readinessBreakdown.sprInventory.label}</span>
              <span className="text-[10px] text-slate-500">{readinessBreakdown.sprInventory.notes}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold text-[10px] border border-sky-300">
              [{readinessBreakdown.sprInventory.status}]
            </span>
          </div>

          {/* Port Coordinates */}
          <div className="p-3.5 rounded-xl border bg-slate-50 border-slate-200 flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 block">{readinessBreakdown.portCoordinates.label}</span>
              <span className="text-[10px] text-slate-500">{readinessBreakdown.portCoordinates.notes}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
              [{readinessBreakdown.portCoordinates.status}]
            </span>
          </div>

          {/* Route Geometry */}
          <div className="p-3.5 rounded-xl border bg-slate-50 border-slate-200 flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 block">{readinessBreakdown.routeGeometry.label}</span>
              <span className="text-[10px] text-slate-500">{readinessBreakdown.routeGeometry.notes}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
              [{readinessBreakdown.routeGeometry.status}]
            </span>
          </div>

          {/* Procurement Constraints */}
          <div className="p-3.5 rounded-xl border bg-slate-50 border-slate-200 flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 block">{readinessBreakdown.procurementConstraints.label}</span>
              <span className="text-[10px] text-slate-500">{readinessBreakdown.procurementConstraints.notes}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
              [{readinessBreakdown.procurementConstraints.status}]
            </span>
          </div>

        </div>
      </div>

      {/* Detailed Provenance Inventory Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider">
            Dataset Provenance Ledger & Confidence Scoring
          </h4>
          <span className="text-[11px] font-mono text-slate-500">
            Immutable Audit Trail
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="py-2.5 px-3 font-semibold">Dataset Name</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Authoritative Source</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold">Confidence</th>
                <th className="py-2.5 px-3 font-semibold">Validation Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {registry.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{item.name}</td>
                  <td className="py-2.5 px-3 text-slate-600">{item.category}</td>
                  <td className="py-2.5 px-3 text-slate-700">{item.source}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === "OFFICIAL" ? "bg-emerald-100 text-emerald-800 border border-emerald-300" :
                      item.status === "PUBLIC_ESTIMATE" ? "bg-cyan-100 text-cyan-800 border border-cyan-300" :
                      item.status === "MODEL_ASSUMPTION" ? "bg-amber-100 text-amber-800 border border-amber-300" :
                      item.status === "SIMULATED" ? "bg-purple-100 text-purple-800 border border-purple-300" :
                      "bg-sky-100 text-sky-800 border border-sky-300"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`font-bold ${
                      item.confidence === "HIGH" ? "text-emerald-700" :
                      item.confidence === "MEDIUM" ? "text-amber-700" :
                      "text-slate-500"
                    }`}>
                      {item.confidence}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 text-[10px] max-w-xs">{item.validationNotes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
