"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { 
  ShieldIcon, 
  GlobeIcon, 
  SlidersIcon, 
  DatabaseIcon, 
  ActivityIcon, 
  ChevronRightIcon,
  CheckCircleIcon 
} from "@/components/ui/Icons";

export default function ProductModuleCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const slides = [
    {
      id: "dashboard",
      title: "Executive Cockpit & Situational Resilience",
      route: "/",
      badge: "NATIONAL COCKPIT",
      badgeColor: "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
      description: "Real-time executive briefing aggregating 5-factor resilience score (36/100), net import dependency (89.1%), and immediate crisis recommendations.",
      highlights: ["3 Hero Indicators", "Corridor Threat Map", "Supplier HHI Concentration", "Refinery Feedstock Exposure"],
      actionLabel: "Explore Dashboard"
    },
    {
      id: "intelligence",
      title: "Geopolitical Intelligence & Chokepoint Alerts",
      route: "/intelligence",
      badge: "MULTI-FEED INGESTION",
      badgeColor: "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
      description: "Automated NLP classification of news wires, maritime shipping bulletins, and OFAC sanctions with India-specific vulnerability mapping.",
      highlights: ["News Threat NLP Classifier", "Maritime AIS Anomaly Detection", "OFAC Sanctions Tracker", "Spot Price Benchmarks"],
      actionLabel: "Inspect Intelligence"
    },
    {
      id: "scenarios",
      title: "Crisis Simulation & Macroeconomic Drag",
      route: "/scenarios",
      badge: "STRESS TESTER",
      badgeColor: "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
      description: "Multi-variable disruption sandbox evaluating supply deficit (MBD), ISPRL drawdown, landed price spikes, and GDP growth drag uncertainty bands.",
      highlights: ["Hormuz Blockade Preset", "Bab-el-Mandeb Red Sea Shock", "Low/Central/High GDP Drag", "Refinery Vulnerability Matrix"],
      actionLabel: "Launch Simulator"
    },
    {
      id: "reserves",
      title: "Strategic Petroleum Reserves (ISPRL)",
      route: "/reserves",
      badge: "34 AUDITED RECORDS",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
      description: "Day-by-day tri-cavern drawdown scheduler (Vizag, Mangalore, Padur) with pump limits, 20% emergency floor alarms, and audited sovereign ledger.",
      highlights: ["5.33 MMT Physical Capacity", "5.03 MMT Sovereign Strategic", "0.30 MMT HPCL Leased", "8.1 Days Theoretical Cover"],
      actionLabel: "Inspect Reserves"
    },
    {
      id: "digital-twin",
      title: "Topological Network Digital Twin",
      route: "/digital-twin",
      badge: "26 GIS NODES",
      badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800",
      icon: ActivityIcon,
      description: "Interactive supply network visualizing crude origins, maritime sea lanes, Indian port SPMs, refineries, and interconnecting pipelines.",
      highlights: ["Interactive GIS Map", "Topological Stress-Tester", "Corridor Delay Multipliers", "Network Resilience Score"],
      actionLabel: "View Digital Twin"
    },
    {
      id: "procurement",
      title: "Adaptive Multi-Sourcing Directives",
      route: "/procurement",
      badge: "NON-EXECUTABLE",
      badgeColor: "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
      description: "Multi-objective linear cost optimizer matching replacement crude slates to individual PSU and private refineries with HHI concentration trade-offs.",
      highlights: ["Ranked Strategy Packages", "Executive Directive Docket", "Refiner Allocation Quotas", "JSON & PDF/Print Export"],
      actionLabel: "Review Directives"
    },
    {
      id: "data-center",
      title: "Data Provenance & Registry Center",
      route: "/data-center",
      badge: "VERIFIED CITATIONS",
      badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800",
      description: "Audited repository maintaining transparent data citations, publication dates, mathematical identities, and operational readiness classifications.",
      highlights: ["75 Audited Parameters", "ISPRL Audited Ledger", "Reproducible Derivations", "Zero Inferred Values"],
      actionLabel: "Open Data Center"
    }
  ];

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-advance every 6s unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  };

  // Touch swipe navigation for mobile
  const handleTouchStart = (e) => {
    if (e.targetTouches && e.targetTouches[0]) {
      touchStartX.current = e.targetTouches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    if (e.changedTouches && e.changedTouches[0]) {
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (delta < -50) nextSlide();
      if (delta > 50) prevSlide();
    }
    touchStartX.current = null;
  };

  const current = slides[activeSlide];

  return (
    <section 
      className="space-y-6 focus:outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      aria-label="Interactive Product Module Carousel"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-cyan-400 font-bold">
              SEVEN INTEGRATED DOMAINS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white mt-1">
            Platform Module Showcase
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-sans">
            Explore EnergyShield&apos;s modular applications spanning situational intelligence, dynamic simulation, asset coordination, and governance.
          </p>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
          <button
            onClick={prevSlide}
            className="p-2 min-h-[38px] min-w-[38px] rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition cursor-pointer flex items-center justify-center shadow-xs"
            aria-label="Previous Slide"
          >
            ◀
          </button>
          <span className="text-slate-600 dark:text-slate-400 px-2 font-bold tabular-nums">
            {activeSlide + 1} / {totalSlides}
          </span>
          <button
            onClick={nextSlide}
            className="p-2 min-h-[38px] min-w-[38px] rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition cursor-pointer flex items-center justify-center shadow-xs"
            aria-label="Next Slide"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Main Slide Card (Adaptive Elevated Command Card) */}
      <div className="p-6 sm:p-8 rounded-3xl command-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        
        {/* Slide Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-sky-50 dark:bg-cyan-950 border border-sky-200 dark:border-cyan-800 text-sky-800 dark:text-cyan-300">
              MODULE 0{activeSlide + 1}
            </span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${current.badgeColor}`}>
              {current.badge}
            </span>
          </div>

          <Link
            href={current.route || "/"}
            className="px-4 py-2 min-h-[40px] rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-mono text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
          >
            <span>{current.actionLabel}</span>
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Slide Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
              {current.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
            {current.highlights.map((hl, idx) => (
              <div 
                key={idx}
                className="p-3 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300 shadow-2xs"
              >
                <CheckCircleIcon className="w-4 h-4 text-emerald-600 dark:text-cyan-400 shrink-0" />
                <span className="text-[11px] font-medium leading-snug">{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Selector Indicators */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeSlide 
                  ? "w-8 bg-sky-600 dark:bg-cyan-400" 
                  : "w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300"
              }`}
              aria-label={`Jump to slide ${idx + 1}: ${s.title}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
