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
    <div className="command-card rounded-xl p-5 border border-slate-800 bg-[#090e17] space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <ShieldIcon className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
            Zero-Fabrication Data Transparency & Missing Telemetry Audit
          </h3>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
            PROVENANCE POLICY
          </span>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          ZERO INVENTED NUMBERS
        </div>
      </div>

      {/* Policy Explanation */}
      <p className="text-xs text-slate-400 leading-relaxed font-sans">
        EnergyShield enforces strict factual integrity: unconfigured live feeds and non-public telemetry are explicitly identified as <span className="text-cyan-300 font-mono font-bold">N/A</span> or computed from <span className="text-emerald-300 font-mono font-bold">OFFICIAL STATUTORY DATASETS (PPAC, ISPRL, DGCIS)</span> rather than populated with fabricated estimates.
      </p>

      {/* Missing Items Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead className="bg-slate-900/90 text-[10px] uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-2 px-3">Telemetry Dimension</th>
              <th className="py-2 px-2">Provider Domain</th>
              <th className="py-2 px-3">Analytical Impact & Fallback Mechanism</th>
              <th className="py-2 px-2 text-right">Integrity Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-[#070b12]">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                <td className="py-2.5 px-3 font-semibold text-slate-100">
                  {item.field}
                </td>
                <td className="py-2.5 px-2 text-cyan-300">
                  {item.providerType}
                </td>
                <td className="py-2.5 px-3 text-[11px] text-slate-300 font-sans">
                  {item.impact}
                </td>
                <td className="py-2.5 px-2 text-right">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-800/50 font-bold">
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
