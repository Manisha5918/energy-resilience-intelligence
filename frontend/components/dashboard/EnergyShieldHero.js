"use client";

import Link from "next/link";
import { ActivityIcon, SlidersIcon, ChevronRightIcon } from "@/components/ui/Icons";
import StrategicInfrastructureCarousel from "@/components/dashboard/StrategicInfrastructureCarousel";

export default function EnergyShieldHero({ onExploreClick }) {
  return (
    <div className="relative w-full rounded-[22px] sm:rounded-[28px] overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#f8fafc] to-[#f0f7fd] border border-[#D8EAF5] shadow-xl p-5 sm:p-7 lg:p-8 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
        
        {/* Left Column (58% width on desktop): Value Proposition & Statutory Snapshot */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5 z-10">
          
          {/* Sovereign Security Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#EFF8FF] border border-[#B9DDF5] text-[#0C2340] text-[11px] sm:text-xs font-mono font-medium shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009FD4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#009FD4]"></span>
            </span>
            <span className="tracking-wide uppercase font-bold text-[#0C2340]">National Energy Security Platform</span>
            <span className="text-[#96C2E2]">•</span>
            <span className="text-[#007EA7] font-bold">India Strategic Model</span>
          </div>

          {/* Main Display Headline (Fluid clamp scaling from 28px on mobile to 54px on desktop with tight 1.08 line-height) */}
          <h1 className="text-[clamp(1.75rem,2.8vw,3.35rem)] font-bold tracking-tight text-[#0C2340] leading-[1.08] font-heading">
            AI-Driven Crude Supply Chain Resilience &amp; Decision-Support
          </h1>

          {/* High-Legibility Technical Narrative (16–18px readable text) */}
          <p className="text-sm sm:text-base lg:text-[17px] text-[#45627D] leading-relaxed font-body max-w-xl">
            India consumes <strong className="text-[#0C2340] font-semibold">5.42 MBD</strong> of crude oil with an <strong className="text-rose-600 font-semibold">89.1% import dependency</strong>. EnergyShield provides continuous explainable risk scoring, deterministic disruption simulation, and multi-objective procurement rerouting to safeguard national supply.
          </p>

          {/* Statutory Sovereign Snapshot Metric Cards */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-0.5">
            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-[#D8EAF5] shadow-2xs">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#5A7894] block font-bold">Consumption</span>
              <span className="text-base sm:text-xl lg:text-2xl font-bold font-mono text-[#0C2340] tabular-nums block mt-0.5">5.42 <span className="text-[10px] sm:text-xs text-[#5A7894] font-normal">MBD</span></span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-[#D8EAF5] shadow-2xs">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#5A7894] block font-bold">Hormuz Transit</span>
              <span className="text-base sm:text-xl lg:text-2xl font-bold font-mono text-rose-600 tabular-nums block mt-0.5">&gt;58.4%</span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-[#D8EAF5] shadow-2xs">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#5A7894] block font-bold">SPR Cover</span>
              <span className="text-base sm:text-xl lg:text-2xl font-bold font-mono text-emerald-700 tabular-nums block mt-0.5">8.1 <span className="text-[10px] sm:text-xs text-[#5A7894] font-normal">Days</span></span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1.5">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 min-h-[42px] sm:min-h-[44px] rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer font-sans"
            >
              <ActivityIcon className="w-4 h-4" />
              <span>Explore Command Cockpit</span>
              <ChevronRightIcon className="w-4 h-4 ml-0.5" />
            </button>

            <Link
              href="/scenarios"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 min-h-[42px] sm:min-h-[44px] rounded-xl bg-white hover:bg-[#EEF7FD] border border-[#D8EAF5] text-[#0C2340] text-xs sm:text-sm font-semibold transition-all shadow-xs hover:-translate-y-0.5"
            >
              <SlidersIcon className="w-4 h-4 text-sky-600" />
              <span>Simulate Disruption Shock</span>
            </Link>
          </div>

        </div>

        {/* Right Column (42% width): Strategic Infrastructure Automatic Multi-Image Carousel */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">
          <StrategicInfrastructureCarousel />
        </div>

      </div>
    </div>
  );
}
