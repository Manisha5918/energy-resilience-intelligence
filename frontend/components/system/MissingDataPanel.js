"use client";

import { AlertTriangleIcon, InfoIcon, ShieldIcon, CheckCircleIcon } from "@/components/ui/Icons";

export default function MissingDataPanel({ missingFields = [] }) {
  const defaultMissing = [
    {
      field: "Real-Time Subsurface Cavern Metering",
      providerType: "SPR Caverns (ISPRL)",
      impact: "Reserve cover calculated using official Phase-1 design baselines (5.33 MMT) rather than sub-hourly SCADA telemetry.",
      status: "OFFICIAL_DATASET_FALLBACK"
    },
    {
      field: "Live Satellite Radar AIS Convoy Feeds",
      providerType: "Maritime Tracking",
      impact: "Chokepoint transit delays derived from verified naval advisories (UKMTO/JMAC) and statutory DGCIS trade shares.",
      status: "ADVISORY_DERIVED_FALLBACK"
    },
    {
      field: "Refinery Subsea Pipeline Metering",
      providerType: "Domestic Refineries (PPAC)",
      impact: "Refinery crude intake uses official design capacity baselines (PPAC / PSU OMC filings).",
      status: "OFFICIAL_DATASET_FALLBACK"
    }
  ];

  const items = missingFields.length > 0 ? missingFields : defaultMissing;

  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <ShieldIcon className="w-5 h-5 text-sky-600" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
                Zero-Fabrication Data Transparency &amp; Missing Telemetry Audit
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
                PROVENANCE POLICY
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Strict factual boundaries identifying unmetered sovereign telemetry.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold self-start sm:self-auto">
          ZERO INVENTED NUMBERS
        </div>
      </div>

      {/* Policy Explanation */}
      <p className="text-xs text-slate-700 leading-relaxed font-sans">
        EnergyShield enforces strict factual integrity: unconfigured live feeds and non-public telemetry are explicitly identified as <span className="text-sky-800 font-mono font-bold">N/A</span> or computed from <span className="text-emerald-800 font-mono font-bold">OFFICIAL STATUTORY DATASETS (PPAC, ISPRL, DGCIS)</span> rather than populated with fabricated estimates.
      </p>

      {/* Missing Items Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-100 text-[10px] uppercase text-slate-600 border-b border-slate-200">
            <tr>
              <th className="py-3 px-3.5">Telemetry Dimension</th>
              <th className="py-3 px-2.5">Provider Domain</th>
              <th className="py-3 px-3.5">Analytical Impact &amp; Fallback Mechanism</th>
              <th className="py-3 px-2.5 text-right">Integrity Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3.5 font-semibold text-slate-900">
                  {item.field}
                </td>
                <td className="py-3 px-2.5 text-sky-800 font-medium">
                  {item.providerType}
                </td>
                <td className="py-3 px-3.5 text-xs text-slate-700 font-sans leading-relaxed">
                  {item.impact}
                </td>
                <td className="py-3 px-2.5 text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
