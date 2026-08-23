"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldIcon, ActivityIcon, NavigationIcon, ChevronRightIcon, InfoIcon } from "@/components/ui/Icons";

export default function VisualStorySection({
  eyebrow = "STRATEGIC ENERGY INFRASTRUCTURE",
  title = "Connecting physical supply, strategic reserves and geopolitical exposure.",
  description = "Synchronizing 256.8 MMTPA national refining throughput, 39.18 MBBL physical strategic storage capacity, and deepwater marine offloading infrastructure into a single resilience architecture.",
  image = "/images/refinery_infrastructure.jpg",
  imageAlt = "Illustrative aerial photograph of petroleum infrastructure in India",
  caption = "Illustrative infrastructure visualization — not live facility telemetry.",
  rightMicroLabel = "ENERGYSHIELD NARRATIVE INTELLIGENCE",
  theme = "cyan", // cyan, emerald, amber, rose, purple
  position = "left", // left, right, center
  overlayStats = [],
  flowSteps = [],
  safetyBadge,
  cta,
  height = "min-h-[480px] sm:min-h-[520px] lg:min-h-[560px]",
  showRouteOverlay = false
}) {
  // Theme badge styling
  const themeColors = {
    cyan: {
      eyebrow: "text-cyan-400",
      badge: "bg-cyan-950/85 text-cyan-300 border-cyan-600/70",
      accent: "text-cyan-400",
      cardAccent: "text-cyan-300"
    },
    emerald: {
      eyebrow: "text-emerald-400",
      badge: "bg-emerald-950/85 text-emerald-300 border-emerald-600/70",
      accent: "text-emerald-400",
      cardAccent: "text-emerald-300"
    },
    amber: {
      eyebrow: "text-amber-400",
      badge: "bg-amber-950/85 text-amber-300 border-amber-600/70",
      accent: "text-amber-400",
      cardAccent: "text-amber-300"
    },
    rose: {
      eyebrow: "text-rose-400",
      badge: "bg-rose-950/85 text-rose-300 border-rose-600/70",
      accent: "text-rose-400",
      cardAccent: "text-rose-300"
    },
    purple: {
      eyebrow: "text-purple-400",
      badge: "bg-purple-950/85 text-purple-300 border-purple-600/70",
      accent: "text-purple-400",
      cardAccent: "text-purple-300"
    }
  };

  const currentTheme = themeColors[theme] || themeColors.cyan;

  return (
    <section 
      className={`relative w-full max-w-[1600px] mx-auto rounded-3xl overflow-hidden border border-slate-800/90 shadow-2xl ${height} flex flex-col justify-between my-8 sm:my-10`}
      aria-label={title}
    >
      {/* Background Image Layer with Subtle Scale Transition */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden bg-slate-950">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={false}
          loading="lazy"
          className="object-cover object-center transform scale-100 lg:hover:scale-102 transition-transform duration-1000 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1600px"
        />

        {/* Cinematic Multi-Stop Navy Gradient Overlay (85% on left -> 35-50% on right) */}
        <div 
          className="absolute inset-0 z-1 pointer-events-none"
          style={{
            background: position === "right"
              ? "linear-gradient(to left, rgba(7, 17, 31, 0.90) 0%, rgba(7, 17, 31, 0.78) 45%, rgba(7, 17, 31, 0.48) 80%, rgba(7, 17, 31, 0.35) 100%)"
              : position === "center"
              ? "radial-gradient(ellipse at center, rgba(7, 17, 31, 0.85) 0%, rgba(7, 17, 31, 0.92) 70%, rgba(7, 17, 31, 0.98) 100%)"
              : "linear-gradient(to right, rgba(7, 17, 31, 0.88) 0%, rgba(7, 17, 31, 0.78) 45%, rgba(7, 17, 31, 0.48) 80%, rgba(7, 17, 31, 0.35) 100%)"
          }}
        />

        {/* Bottom edge grounding gradient */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07111f] via-[#07111f]/75 to-transparent z-1 pointer-events-none" />

        {/* Subtle decorative route line overlay for maritime scenes */}
        {showRouteOverlay && (
          <svg className="absolute inset-0 w-full h-full z-1 opacity-40 pointer-events-none" preserveAspectRatio="none">
            <path
              d="M 50,280 Q 300,120 600,200 T 1200,160 T 1600,240"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray="8,6"
              className="animate-pulse"
            />
            <path
              d="M 50,320 Q 400,220 800,280 T 1500,200"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeDasharray="6,6"
              opacity="0.6"
            />
          </svg>
        )}
      </div>

      {/* Content Container (Positioned Safely in Left Scrim) */}
      <div className={`relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col justify-between h-full ${
        position === "right" ? "sm:items-end sm:text-right" : position === "center" ? "items-center text-center" : "items-start text-left"
      }`}>
        
        {/* Top Eyebrow & Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className={`text-xs sm:text-sm font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-md border ${currentTheme.badge}`}>
            {eyebrow}
          </span>

          {safetyBadge && (
            <span className={`text-[10px] sm:text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-md border ${
              safetyBadge.variant === "danger"
                ? "bg-rose-950/90 text-rose-300 border-rose-700/80"
                : safetyBadge.variant === "warning"
                ? "bg-amber-950/90 text-amber-300 border-amber-700/80"
                : "bg-sky-950/90 text-sky-300 border-sky-700/80"
            }`}>
              {safetyBadge.text}
            </span>
          )}
        </div>

        {/* Main Title & Description & Integrated Glass KPI Cards */}
        <div className="my-6 max-w-3xl space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight leading-[1.15] drop-shadow-md">
            {title}
          </h2>

          {description && (
            <p className="text-base sm:text-lg text-slate-200 font-sans leading-relaxed drop-shadow-sm max-w-2xl">
              {description}
            </p>
          )}

          {/* Optional Visual Flow Stepper */}
          {flowSteps && flowSteps.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
              {flowSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-900/85 border border-slate-700/80 text-cyan-300 font-bold shadow-sm backdrop-blur-md">
                    {step}
                  </span>
                  {idx < flowSteps.length - 1 && (
                    <span className="text-slate-400 font-bold">→</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Integrated Compact Glass KPI Cards */}
          {overlayStats && overlayStats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
              {overlayStats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/70 shadow-lg flex flex-col justify-between space-y-1 hover:border-slate-600 transition-colors"
                >
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-400 font-bold tracking-wider block">
                    {stat.label}
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1 tracking-tight">
                    {stat.value}
                  </div>
                  {stat.subtext && (
                    <span className="text-xs font-mono text-cyan-400 font-semibold block mt-0.5">
                      {stat.subtext}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Optional CTA */}
          {cta && (
            <div className="pt-3">
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg hover:shadow-cyan-500/25 cursor-pointer min-h-[44px]"
              >
                <span>{cta.label}</span>
                <ChevronRightIcon className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Disclaimers & Captions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-slate-300">
            <InfoIcon className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{caption}</span>
          </div>

          <span className="text-slate-400 text-[11px] uppercase font-bold tracking-wider self-start sm:self-auto">
            {rightMicroLabel}
          </span>
        </div>

      </div>
    </section>
  );
}
