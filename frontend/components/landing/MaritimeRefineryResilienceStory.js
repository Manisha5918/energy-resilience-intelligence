"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon, NavigationIcon, DatabaseIcon, ShieldIcon, ActivityIcon } from "@/components/ui/Icons";

export default function MaritimeRefineryResilienceStory() {
  const cascadeFlow = [
    { step: "01", label: "MARITIME ROUTES", desc: "40-45% of national crude imports transit high-risk chokepoints." },
    { step: "02", label: "SUPPLY AVAILABILITY", desc: "Chokepoint blockades trigger immediate physical volume deficits." },
    { step: "03", label: "STRATEGIC RESERVES", desc: "ISPRL underground caverns buffer up to 8.1 days of standalone demand." },
    { step: "04", label: "REFINERY THROUGHPUT", desc: "Feedstock matching protects 256.8 MMTPA national refining output." },
    { step: "05", label: "MACRO EXPOSURE", desc: "Quantified GDP drag and current account deficit uncertainty bands." }
  ];

  return (
    <section 
      aria-label="Maritime Exposure to Refinery Resilience Story"
      className="p-6 sm:p-8 lg:p-10 rounded-3xl command-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column (50%): High-Resolution Maritime Petroleum Terminal Image */}
        <div className="lg:col-span-6 relative w-full h-[380px] sm:h-[440px] lg:h-[500px] rounded-[24px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl group">
          <Image
            src="/images/vlcc_berth_terminal.jpg"
            alt="Real-world crude oil tanker offloading at marine deepwater terminal berth with coastal pipeline infrastructure"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Scrim overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Top Label */}
          <div className="absolute top-3.5 left-3.5 pointer-events-none">
            <span className="text-[11px] font-mono text-white/90 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/15 shadow-sm">
              DEEPWATER SPM &amp; MARINE LOGISTICS
            </span>
          </div>

          {/* Bottom Glass Caption */}
          <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-white/15 shadow-lg space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 block">
              COASTAL OFFLOADING &amp; CRUDE INTAKE
            </span>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              Illustrative infrastructure visualization — connecting marine berths to national refinery pipeline networks.
            </p>
          </div>
        </div>

        {/* Right Column (50%): Narrative & Cascade Architecture */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-xs font-mono font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span>END-TO-END SUPPLY CHAIN CONTINUUM</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight leading-tight">
              From Maritime Exposure to Refinery Resilience
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
              Geopolitical shocks do not operate in isolation. A single maritime choke point alert triggers a multi-stage physical and financial propagation cascade across India&apos;s energy ecosystem:
            </p>
          </div>

          {/* Step-by-Step Cascade Steps */}
          <div className="space-y-2.5 font-mono text-xs">
            {cascadeFlow.map((item, idx) => (
              <div 
                key={item.step}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 flex items-start gap-3 shadow-2xs hover:border-sky-300 dark:hover:border-slate-700 transition-colors"
              >
                <span className="font-bold text-sky-600 dark:text-cyan-400 shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 dark:text-white text-xs block">
                    {item.label}
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA */}
          <div className="pt-2">
            <Link
              href="/routes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-mono text-xs font-bold transition shadow-xs"
            >
              <span>Inspect Maritime Corridors &amp; Delays</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
