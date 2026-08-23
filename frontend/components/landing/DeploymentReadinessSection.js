"use client";

import { ShieldIcon, CheckCircleIcon, ActivityIcon, AlertTriangleIcon } from "@/components/ui/Icons";

export default function DeploymentReadinessSection() {
  const tiers = [
    {
      title: "Crisis Simulation",
      status: "ACTIVE / VERIFIED",
      statusColor: "text-emerald-800 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/80 dark:border-emerald-800",
      description: "Deterministic sandbox modeling physical crude deficits, landed cost spikes, and macroeconomic GDP drag uncertainty bands.",
      capabilities: [
        "Hormuz & Red Sea Disruption Sweeps",
        "Tri-Cavern Drawdown Scheduling",
        "Refinery Feedstock Pressure Matrix",
        "Low / Central / High Uncertainty Bands"
      ],
      isPrimary: false
    },
    {
      title: "Decision Support",
      status: "ACTIVE / VERIFIED",
      statusColor: "text-emerald-800 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/80 dark:border-emerald-800",
      description: "Multi-objective linear cost optimizer matching replacement crude slates to individual refineries with HHI concentration trade-offs.",
      capabilities: [
        "Executive Procurement Directive Docket",
        "Refinery Crude Slate Matching",
        "HHI Concentration Trade-off Sorting",
        "JSON & PDF / Print Briefing Export"
      ],
      isPrimary: true
    },
    {
      title: "Enterprise Ingestion",
      status: "READY FOR ADAPTER",
      statusColor: "text-sky-800 bg-sky-50 border-sky-200 dark:text-sky-300 dark:bg-sky-950/80 dark:border-sky-800",
      description: "Standardized REST API schemas and ingestion pipelines ready to ingest live institutional PPAC and DGCIS data streams.",
      capabilities: [
        "Statutory JSON REST Endpoints",
        "Custom Ingestion Provider Interface",
        "Data Quality Evaluation Matrix",
        "Multi-Provider Health Evaluator"
      ],
      isPrimary: false
    },
    {
      title: "Autonomous Control",
      status: "RESTRICTED SAFEGUARD",
      statusColor: "text-rose-800 bg-rose-50 border-rose-200 dark:text-rose-300 dark:bg-rose-950/80 dark:border-rose-800",
      description: "Live autonomous purchase orders and subterranean SCADA valve controls are intentionally restricted pending sovereign institutional validation.",
      capabilities: [
        "Non-Executable Procurement Directive",
        "Assay & Metallurgy Pre-requisite Checks",
        "Defense-Classified SCADA Safeguard",
        "Human-in-the-Loop Governance Floor"
      ],
      isPrimary: false
    }
  ];

  return (
    <section className="space-y-6" aria-label="Platform Deployment Readiness">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-cyan-400 font-bold">
              DEPLOYMENT READINESS & BOUNDARIES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white mt-1">
            Platform Capabilities & Operational Scope
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-sans">
            Clear delineation between production-verified decision-support capabilities and restricted autonomous sovereign controls.
          </p>
        </div>

        <div className="text-xs font-mono text-sky-800 dark:text-cyan-400 bg-sky-50 dark:bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-sky-200 dark:border-cyan-800 self-start sm:self-auto shadow-2xs font-bold">
          STATUS: SIMULATION-READY
        </div>
      </div>

      {/* 4 Deployment Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        {tiers.map((t, idx) => (
          <div 
            key={idx}
            className={`p-6 rounded-2xl command-card border transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between space-y-4 ${
              t.isPrimary
                ? "bg-sky-50/50 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-sky-300 dark:border-cyan-700/80 shadow-sky-900/5"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
                  TIER 0{idx + 1}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${t.statusColor}`}>
                  {t.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-3 font-heading">
                {t.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans mt-2 leading-relaxed">
                {t.description}
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Scope & Safeguards:</span>
              <ul className="space-y-1.5 text-[11px] font-sans">
                {t.capabilities.map((cap, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                    <span className="text-sky-600 dark:text-cyan-400 mt-0.5">▪</span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
