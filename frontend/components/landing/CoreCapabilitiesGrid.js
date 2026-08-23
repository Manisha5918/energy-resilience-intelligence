"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  DatabaseIcon, 
  SlidersIcon, 
  ActivityIcon, 
  GlobeIcon, 
  ShieldIcon, 
  CheckCircleIcon,
  ChevronRightIcon,
  RefreshCwIcon
} from "@/components/ui/Icons";

export default function CoreCapabilitiesGrid() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const capabilities = [
    {
      id: "reserves",
      title: "Strategic Petroleum Reserves",
      badge: "ISPRL OFFICIAL",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
      icon: DatabaseIcon,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/60 dark:border-emerald-800",
      description: "Models statutory Phase-I underground rock cavern capacities (5.33 MMT / 39.18 MBBL) across Visakhapatnam, Mangalore, and Padur.",
      keyMetric: "5.33 MMT / 39.18 MBBL",
      keyMetricLabel: "Total Physical Installed Capacity",
      href: "/reserves",
      routeLabel: "Explore SPR Cockpit",
      methodology: {
        classification: "OFFICIAL + DERIVED",
        source: "ISPRL Annual Report 2024-25 & Parliamentary Standing Committee Report No. 27",
        mathProof: "5.03 MMT Strategic + 0.30 MMT HPCL Commercial Lease = 5.33 MMT Physical Capacity (39.18 MBBL at 7.35 bbl/MT benchmark).",
        safeguard: "Unmetered real-time SCADA is classified; modeled under scenario fill levels."
      }
    },
    {
      id: "scenarios",
      title: "Disruption Scenario Engine",
      badge: "DETERMINISTIC SIMULATION",
      badgeColor: "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
      icon: SlidersIcon,
      iconColor: "text-sky-600 bg-sky-50 border-sky-200 dark:text-sky-400 dark:bg-sky-950/60 dark:border-sky-800",
      description: "Simulates Hormuz blockades, Red Sea drone threats, and sanctions escalations with cascading refinery feedstock and landed cost impacts.",
      keyMetric: "0 – 100% Shock Sweep",
      keyMetricLabel: "Multi-Variable Disruption Variance",
      href: "/scenarios",
      routeLabel: "Launch Scenario Engine",
      methodology: {
        classification: "MODEL_ASSUMPTION / SIMULATED",
        source: "EnergyShield Macro & Dynamic Balance Engine",
        mathProof: "Daily Deficit = Net Import Need (4.83 MBD) * Disruption %. Cumulative Bill = Deficit * Price Shock * Duration.",
        safeguard: "Exposes Low, Central, and High uncertainty bands for GDP drag and CAD impact."
      }
    },
    {
      id: "digital-twin",
      title: "Topological Supply Chain Twin",
      badge: "26 GIS NODES",
      badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800",
      icon: ActivityIcon,
      iconColor: "text-cyan-600 bg-cyan-50 border-cyan-200 dark:text-cyan-400 dark:bg-cyan-950/60 dark:border-cyan-800",
      description: "Interactive network graph capturing crude origins, maritime choke points, Indian crude import ports, refineries, and cavern pipelines.",
      keyMetric: "6 Maritime Corridors",
      keyMetricLabel: "Chokepoints & Bypass Pipelines",
      href: "/digital-twin",
      routeLabel: "Open Digital Twin",
      methodology: {
        classification: "SIMULATED_TOPOLOGY",
        source: "Ministry of Ports, Shipping & Waterways / PPAC Logistics Map",
        mathProof: "Network resilience scoring evaluates graph vertex connectivity, path redundancies, and single-point failure bottlenecks.",
        safeguard: "SIMULATED AIS — Honest label; no live satellite vessel telemetry claimed."
      }
    },
    {
      id: "intelligence",
      title: "Geopolitical Risk Intelligence",
      badge: "MULTI-FEED INGESTION",
      badgeColor: "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
      icon: GlobeIcon,
      iconColor: "text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950/60 dark:border-purple-800",
      description: "Synthesizes geopolitical news wires, sanctions bulletins, shipping alerts, and spot market benchmarks into actionable corridor risk indices.",
      keyMetric: "4 Intelligence Streams",
      keyMetricLabel: "Dynamic Threat Ingestion Matrix",
      href: "/intelligence",
      routeLabel: "Inspect Intelligence Feeds",
      methodology: {
        classification: "SIMULATED_INTELLIGENCE",
        source: "EnergyShield NLP Rule Engine & Benchmark Index",
        mathProof: "Calculates 0-100 corridor disruption probability from threat severity, entity relevance, and chokepoint transit weighting.",
        safeguard: "Feed status explicitly tagged as SIMULATED baseline."
      }
    },
    {
      id: "procurement",
      title: "Adaptive Procurement Orchestrator",
      badge: "NON-EXECUTABLE",
      badgeColor: "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
      icon: ShieldIcon,
      iconColor: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/60 dark:border-rose-800",
      description: "Ranks contingency crude sourcing (WTI Midland, Brazil Lula, Saudi Yanbu, UAE Habshan) with refiner assay matching and landed cost sorting.",
      keyMetric: "6 PSU & Private Refiners",
      keyMetricLabel: "Optimal Feedstock Allocation",
      href: "/procurement",
      routeLabel: "View Procurement Directives",
      methodology: {
        classification: "DECISION_SUPPORT / NON_EXECUTABLE",
        source: "PPAC Statutory Refinery Disclosures & Landed Cost Engine",
        mathProof: "Multi-objective linear cost minimization subject to refinery nameplate limits and HHI concentration penalties.",
        safeguard: "NON-EXECUTABLE — Unit-level assay and metallurgy validation required."
      }
    },
    {
      id: "data-center",
      title: "Data Provenance & Quality Center",
      badge: "75 AUDITED PARAMETERS",
      badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800",
      icon: CheckCircleIcon,
      iconColor: "text-indigo-600 bg-indigo-50 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-950/60 dark:border-indigo-800",
      description: "Comprehensive audit ledger maintaining citations, publication dates, mathematical derivations, and verification logs for every single number.",
      keyMetric: "100% Provenance Coverage",
      keyMetricLabel: "Zero Unsourced Numbers",
      href: "/data-center",
      routeLabel: "Inspect Data Center",
      methodology: {
        classification: "OFFICIAL_PROVENANCE_LEDGER",
        source: "PPAC, ISPRL, DGCIS, and MoPNG Statutory Disclosures",
        mathProof: "Line-by-line verification in docs/NUMERICAL_PROVENANCE_AUDIT.md and docs/SOURCE_VERIFICATION_REPORT.md.",
        safeguard: "Downgrades unverified data; prevents false '100% real-world' claims."
      }
    }
  ];

  return (
    <section className="space-y-6" aria-label="Core Capabilities Grid">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-cyan-400 font-bold">
              PLATFORM DOMAINS & ARCHITECTURE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white mt-1">
            Six Core Resilience Capabilities
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-sans">
            Modular, mathematically verified engines addressing India&apos;s crude supply vulnerability from early threat detection to strategic reserve release.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
          <span>Tip: Click </span>
          <span className="text-sky-600 dark:text-cyan-400 font-semibold">&quot;Methodology &amp; Proof&quot;</span>
          <span> to inspect math &amp; provenance</span>
        </div>
      </div>

      {/* 3D Flip Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          const isFlipped = !!flippedCards[cap.id];

          return (
            <div 
              key={cap.id}
              className="perspective-1000 min-h-[350px] w-full"
            >
              <div 
                className={`flip-card-inner rounded-2xl transition-transform duration-500 w-full h-full relative ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                
                {/* FRONT FACE (Unified Elevated Command Card) */}
                <div className="backface-hidden absolute inset-0 rounded-2xl p-6 command-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-500/50 shadow-sm hover:shadow-xl flex flex-col justify-between transition-all duration-300">
                  <div>
                    {/* Card Top Pill & Icon */}
                    <div className="flex items-start justify-between gap-3">
                      <div className={`p-2.5 rounded-xl border ${cap.iconColor} shadow-xs`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${cap.badgeColor}`}>
                        {cap.badge}
                      </span>
                    </div>

                    {/* Card Title & Description */}
                    <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mt-4 tracking-tight">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-sans">
                      {cap.description}
                    </p>
                  </div>

                  {/* Bottom Stats & Flip Trigger */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 font-mono">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-semibold">
                        {cap.keyMetricLabel}
                      </span>
                      <span className="text-sm font-bold text-sky-700 dark:text-cyan-300 mt-0.5 block tabular-nums">
                        {cap.keyMetric}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        onClick={() => toggleFlip(cap.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleFlip(cap.id);
                          }
                        }}
                        className="text-xs font-mono text-sky-600 hover:text-sky-800 dark:text-cyan-400 dark:hover:text-cyan-300 font-semibold flex items-center gap-1.5 cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-sky-500 rounded px-1 min-h-[36px]"
                        aria-label={`View methodology for ${cap.title}`}
                      >
                        <RefreshCwIcon className="w-3.5 h-3.5" />
                        <span>Methodology &amp; Proof ➔</span>
                      </button>

                      <Link
                        href={cap.href}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-semibold transition flex items-center gap-1 shadow-xs min-h-[36px]"
                      >
                        <span>Open</span>
                        <ChevronRightIcon className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>

                {/* BACK FACE (Sleek Mathematical Blueprint Face) */}
                <div className="rotate-y-180 backface-hidden absolute inset-0 rounded-2xl p-6 bg-slate-900 dark:bg-slate-950 text-white border border-sky-600/50 shadow-2xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                          Methodology &amp; Math Proof
                        </span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                        {cap.methodology.classification}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">Statutory Source:</span>
                        <p className="text-slate-200 mt-0.5 text-[11px] leading-relaxed">{cap.methodology.source}</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px]">
                        <span className="text-[10px] text-cyan-300 block font-semibold uppercase">Math Derivation:</span>
                        <p className="text-cyan-100 font-mono mt-0.5 leading-snug">{cap.methodology.mathProof}</p>
                      </div>

                      <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-900/60 text-[11px]">
                        <span className="text-[10px] text-rose-300 block font-semibold uppercase">Governance Guardrail:</span>
                        <p className="text-rose-200 font-sans text-[11px] mt-0.5 leading-tight">{cap.methodology.safeguard}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => toggleFlip(cap.id)}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer transition min-h-[36px]"
                    >
                      <span>➔ Return to Overview</span>
                    </button>

                    <Link
                      href={cap.href}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold transition flex items-center gap-1 shadow-sm min-h-[36px]"
                    >
                      <span>Explore</span>
                      <ChevronRightIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
