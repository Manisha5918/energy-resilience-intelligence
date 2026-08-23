"use client";

import Link from "next/link";
import { DatabaseIcon, CheckCircleIcon, ShieldIcon, ChevronRightIcon, ActivityIcon } from "@/components/ui/Icons";

export default function DataProvenancePipeline() {
  const pipelineStages = [
    {
      step: "01",
      name: "Source Identification",
      badge: "STATUTORY CITATION",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
      description: "Direct ingestion of PPAC Monthly Snapshots, DGCIS Kolkata customs returns, and ISPRL Annual Report audited ledgers.",
      tag: "OFFICIAL"
    },
    {
      step: "02",
      name: "Schema Ingestion",
      badge: "STRICT VALIDATION",
      badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800",
      description: "Ingests raw spreadsheets into standardized JSON objects with verbatim numerical values, units, and source notes.",
      tag: "NO INFERRED VALUES"
    },
    {
      step: "03",
      name: "Classification & Reconciliation",
      badge: "SEMANTIC RIGOR",
      badgeColor: "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
      description: "Reconciles 5.03 MMT strategic storage + 0.30 MMT HPCL lease into 5.33 MMT physical capacity without merging definitions.",
      tag: "100% RECONCILED"
    },
    {
      step: "04",
      name: "Mathematical Derivation",
      badge: "DETERMINISTIC MATH",
      badgeColor: "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
      description: "Computes 4.83 MBD net import need, 89.1% dependency, 8.1 days theoretical physical cover, and 2,063 HHI points.",
      tag: "DERIVED"
    },
    {
      step: "05",
      name: "Sensitivity & Bounds",
      badge: "UNCERTAINTY BANDS",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
      description: "Exposes Low, Central, and High elasticity bands for GDP drag and CAD impact to prevent false single-number certainty.",
      tag: "MODEL ASSUMPTION"
    },
    {
      step: "06",
      name: "Decision-Support Cockpit",
      badge: "GOVERNANCE SAFEGUARD",
      badgeColor: "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
      description: "Presents ranked procurement and drawdown recommendations with explicit non-executable operational disclaimers.",
      tag: "NON-EXECUTABLE"
    }
  ];

  return (
    <section className="space-y-6" aria-label="Data Provenance Pipeline">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-purple-700 dark:text-purple-400 font-bold">
              ACCURACY-FIRST DATA GOVERNANCE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white mt-1">
            Data Provenance & Traceability Pipeline
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-sans">
            From parliamentary filings to executive briefings — every single number is bound to an audited origin, mathematical proof, and operational safety boundary.
          </p>
        </div>

        <Link
          href="/data-center"
          className="px-4 py-2 min-h-[40px] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-mono text-xs font-semibold transition flex items-center gap-1.5 self-start sm:self-auto border border-slate-300 dark:border-slate-700 shadow-xs"
        >
          <span>Open Full Data Center</span>
          <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </div>

      {/* 6-Stage Provenance Pipeline Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
        {pipelineStages.map((stg) => (
          <div 
            key={stg.step}
            className="p-5 rounded-2xl command-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-500/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  STAGE {stg.step}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${stg.badgeColor}`}>
                  {stg.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 font-heading tracking-tight">
                {stg.name}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans mt-1.5 leading-relaxed">
                {stg.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px]">
              <span className="text-slate-500 font-semibold">Classification:</span>
              <span className="font-bold text-sky-700 dark:text-cyan-400">{stg.tag}</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
