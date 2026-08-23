"use client";

import { useState } from "react";
import { getISPRLStructuredInventory, getISPRLOfficialRecords, getISPRLReconciliationReport } from "@/lib/officialData/isprlOfficialReader";
import { 
  DatabaseIcon, 
  ShieldIcon, 
  AlertTriangleIcon, 
  ActivityIcon, 
  CheckCircleIcon,
  InfoIcon
} from "@/components/ui/Icons";

export default function ISPRLOfficialRecordsViewer() {
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllRows, setShowAllRows] = useState(false);

  const structured = getISPRLStructuredInventory();
  const records = getISPRLOfficialRecords();
  const reconciliationFlags = getISPRLReconciliationReport();

  const filteredRecords = records.filter((r) => {
    const matchesCat = filterCategory === "ALL" || r.category === filterCategory;
    const matchesSearch = 
      r.parameter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.sourceNote && r.sourceNote.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const displayedRecords = showAllRows ? filteredRecords : filteredRecords.slice(0, 12);

  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              ISPRL Sovereign Reserve Ledger (Annual Report 2024-25 & Statutory Data)
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
              34 VERIFIED SOURCE RECORDS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Authoritative breakdown of underground cavern capacities, sovereign custody inventories, commercial leasing proportions, and Phase-II expansion projects.
          </p>
        </div>

        <div className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-semibold self-start sm:self-auto">
          Source: ISPRL Annual Report 2024-25
        </div>
      </div>

      {/* Verified Reconciliation by Classification Banner */}
      <div className="rounded-xl p-4 bg-emerald-50/90 border border-emerald-300 space-y-2.5">
        <div className="flex items-start gap-2.5">
          <CheckCircleIcon className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs w-full">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-emerald-950 uppercase font-mono tracking-wide">
                [CAPACITY RECONCILED BY CLASSIFICATION] ISPRL Phase-I Storage Alignment
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-900">
                100% RECONCILED
              </span>
            </div>
            <p className="text-emerald-900 leading-relaxed font-sans text-xs">
              <strong>Reconciliation Explanation:</strong> Capacity reconciles by classification: <strong>5.33 MMT</strong> total physical installed capacity comprises <strong>5.03 MMT</strong> sovereign strategic capacity plus <strong>0.30 MMT</strong> HPCL-leased commercial capacity at Visakhapatnam (Cavern B).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                <span className="text-slate-500 text-[10px] block uppercase">Total Physical Capacity</span>
                <span className="font-bold text-slate-900 text-sm">5.33 MMT</span>
                <span className="text-[10px] text-slate-500 block">Vizag 1.33 + Mangalore 1.50 + Padur 2.50</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                <span className="text-slate-500 text-[10px] block uppercase">Strategic Reserve Capacity</span>
                <span className="font-bold text-emerald-800 text-sm">5.03 MMT</span>
                <span className="text-[10px] text-slate-500 block">Cavern A (1.03) + Mangalore (1.50) + Padur (2.50)</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                <span className="text-slate-500 text-[10px] block uppercase">Commercial Leased Capacity</span>
                <span className="font-bold text-indigo-700 text-sm">0.30 MMT</span>
                <span className="text-[10px] text-slate-500 block">Visakhapatnam Cavern B (HPCL Lease)</span>
              </div>
            </div>
            <div className="p-2 bg-emerald-100/70 rounded-lg text-[11px] font-mono text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span><strong>System Formula:</strong> 5.03 MMT (Strategic) + 0.30 MMT (HPCL Leased) = 5.33 MMT (Physical Total)</span>
              <span><strong>Vizag Formula:</strong> 1.03 MMT (Cavern A) + 0.30 MMT (Cavern B) = 1.33 MMT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Custody & Commercial Leases Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        
        {/* GOI Crude Custody */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-500 font-medium block uppercase">GOI Crude Custody</span>
          <div className="text-xl font-bold text-slate-900">
            {Number(structured.custodyInventories.goiCrudeMetricTonnes).toLocaleString()} MT
          </div>
          <span className="text-[10px] text-slate-600 font-semibold block">
            ≈ {structured.custodyInventories.goiCrudeEstimatedBarrels} Million Barrels
          </span>
          <span className="text-[9px] text-slate-500 block pt-1">
            Audited as of 31 March 2025
          </span>
        </div>

        {/* ADNOC Crude Custody */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-500 font-medium block uppercase">ADNOC Custody Stored</span>
          <div className="text-xl font-bold text-slate-900">
            {Number(structured.custodyInventories.adnocCrudeMetricTonnes).toLocaleString()} MT
          </div>
          <span className="text-[10px] text-slate-600 font-semibold block">
            Mangalore: {structured.custodyInventories.adnocMangaloreStorageMillionBarrels} MBBL (50/50 Split)
          </span>
          <span className="text-[9px] text-slate-500 block pt-1">
            50% Strategic / 50% Commercial
          </span>
        </div>

        {/* HPCL Visakh Leased Cavern */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-500 font-medium block uppercase">HPCL Leased Cavern B</span>
          <div className="text-xl font-bold text-indigo-700">
            {structured.commercialLeases.hpclVisakhCavernB.capacityMMT} MMT ({structured.commercialLeases.hpclVisakhCavernB.capacityMillionBarrels} MBBL)
          </div>
          <span className="text-[10px] text-indigo-900 font-semibold block">
            Crude: {structured.commercialLeases.hpclVisakhCavernB.crudeType}
          </span>
          <span className="text-[9px] text-slate-500 block pt-1">
            Effective 19 Jan 2024 (Visakhapatnam)
          </span>
        </div>

        {/* Policy Commercial Proportions */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-500 font-medium block uppercase">Cabinet Storage Policy</span>
          <div className="text-xl font-bold text-emerald-700">
            {structured.policyProportions.strategicReserveMandatoryPercent}% Strategic
          </div>
          <span className="text-[10px] text-slate-600 font-semibold block">
            {structured.policyProportions.commercialLeasingMaxPercent}% Renting / {structured.policyProportions.salePurchaseMaxPercent}% Trading
          </span>
          <span className="text-[9px] text-slate-500 block pt-1">
            Sovereign crude sold: 1.298 MMT
          </span>
        </div>

      </div>

      {/* Phase-II Expansion Pipeline Preview */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider">
            Phase-II Strategic Storage Projects Under Development
          </h4>
          <span className="text-[10px] font-mono text-slate-500">ISPRL Expansion Slate</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 font-mono text-xs">
          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block">Padur Phase-II</span>
            <span className="text-emerald-700 font-bold">2.50 MMT SPR</span>
            <span className="text-[10px] text-slate-500 block">Target: Aug 2030</span>
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block">Chandikhol SPR</span>
            <span className="text-emerald-700 font-bold">4.00 MMT SPR</span>
            <span className="text-[10px] text-slate-500 block">Approved: ₹8,743 Cr</span>
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block">Mangalore Ext.</span>
            <span className="text-emerald-700 font-bold">1.75 MMT SPR</span>
            <span className="text-[10px] text-slate-500 block">154.9 Acres MSEZL Land</span>
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block">Bikaner Salt Cavern</span>
            <span className="text-emerald-700 font-bold">5.625 MMT SPR</span>
            <span className="text-[10px] text-slate-500 block">DFR Revision (Rajasthan)</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "ALL", label: "All (34)" },
            { id: "PHYSICAL_CAPACITY", label: "Capacities" },
            { id: "CRUDE_INVENTORY", label: "Inventories" },
            { id: "COMMERCIAL_LEASE", label: "Commercial Leases" },
            { id: "POLICY_PROPORTION", label: "Policy %" },
            { id: "EXPANSION_PROJECT", label: "Phase-II Expansion" }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilterCategory(btn.id)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition cursor-pointer min-h-[36px] ${
                filterCategory === btn.id
                  ? "bg-slate-900 text-white font-bold shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Filter parameters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-56"
        />
      </div>

      {/* Complete 34-Record Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs border-collapse font-mono">
          <thead>
            <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
              <th className="py-2.5 px-3 font-semibold">#</th>
              <th className="py-2.5 px-3 font-semibold">Parameter</th>
              <th className="py-2.5 px-3 font-semibold">Value</th>
              <th className="py-2.5 px-3 font-semibold">Unit</th>
              <th className="py-2.5 px-3 font-semibold">Source</th>
              <th className="py-2.5 px-3 font-semibold">Date</th>
              <th className="py-2.5 px-3 font-semibold">Status</th>
              <th className="py-2.5 px-3 font-semibold">Source Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-[11px]">
            {displayedRecords.map((r, idx) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-bold text-slate-500">{idx + 1}</td>
                <td className="py-2.5 px-3 font-bold text-slate-900">{r.parameter}</td>
                <td className="py-2.5 px-3 font-bold text-emerald-800">
                  {typeof r.value === "number" ? r.value.toLocaleString() : String(r.value)}
                </td>
                <td className="py-2.5 px-3 text-slate-600">{r.unit}</td>
                <td className="py-2.5 px-3 text-slate-700">{r.source}</td>
                <td className="py-2.5 px-3 text-slate-600">{r.date}</td>
                <td className="py-2.5 px-3">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {r.status}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-slate-600 text-[10px] max-w-xs">{r.sourceNote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination / Expand All Button */}
      {filteredRecords.length > 12 && (
        <div className="text-center pt-1">
          <button
            onClick={() => setShowAllRows(!showAllRows)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-bold transition cursor-pointer"
          >
            {showAllRows ? `Collapse (Show Top 12)` : `View All ${filteredRecords.length} Records ↓`}
          </button>
        </div>
      )}

    </div>
  );
}
