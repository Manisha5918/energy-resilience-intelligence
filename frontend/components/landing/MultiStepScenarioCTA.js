"use client";

import Link from "next/link";
import { SlidersIcon, ShieldIcon, ActivityIcon, ChevronRightIcon } from "@/components/ui/Icons";

export default function MultiStepScenarioCTA() {
  const steps = [
    {
      num: "01",
      title: "Select Threat Event",
      desc: "Hormuz blockade, Red Sea shipping attacks, or Russian sanctions expansion."
    },
    {
      num: "02",
      title: "Set Disruption Parameters",
      desc: "Tune physical deficit %, disruption horizon (7–60d), and crude price shock ($/bbl)."
    },
    {
      num: "03",
      title: "Simulate Downstream Cascade",
      desc: "Evaluate cavern off-take rates, refinery feedstock shortfalls, and GDP growth drag."
    },
    {
      num: "04",
      title: "Review Procurement Directives",
      desc: "Synthesize ranked alternative crude allocations and export executive briefing dockets."
    }
  ];

  return (
    <section className="p-8 sm:p-12 rounded-3xl command-card bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-[#07111F] border border-sky-200 dark:border-cyan-800/60 shadow-lg space-y-8" aria-label="Scenario Call to Action">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-cyan-950 border border-sky-200 dark:border-cyan-800 text-sky-800 dark:text-cyan-300 font-mono text-xs font-bold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-cyan-400 animate-pulse" />
          <span>INTERACTIVE CRISIS SANDBOX</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
          Stress-Test India&apos;s National Energy Resilience
        </h2>
        
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
          See the system. Stress the system. Understand the consequences. Model multi-cavern ISPRL off-takes and alternative ocean routing within seconds.
        </p>
      </div>

      {/* 4 Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        {steps.map((s) => (
          <div 
            key={s.num}
            className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 relative shadow-2xs hover:border-sky-300 dark:hover:border-slate-700 transition-all"
          >
            <span className="text-xs font-bold text-sky-600 dark:text-cyan-400">STEP {s.num}</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
              {s.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 font-mono text-xs">
        <Link
          href="/scenarios"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold transition shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer min-h-[44px]"
        >
          <SlidersIcon className="w-4 h-4" />
          <span>Launch Scenario Engine ➔</span>
        </Link>

        <Link
          href="/intelligence"
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-semibold transition border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 cursor-pointer min-h-[44px] shadow-xs"
        >
          <ActivityIcon className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
          <span>Inspect Live Intelligence Feeds</span>
        </Link>
      </div>

    </section>
  );
}
