"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldIcon, ActivityIcon, RefreshCwIcon, SunIcon, MoonIcon, MenuIcon, XIcon } from "@/components/ui/Icons";

const subscribe = (callback) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getThemeSnapshot = () => {
  return localStorage.getItem("energyshield-theme") || "light";
};

const getServerSnapshot = () => {
  return "light";
};

export default function Navbar({ onToggleMobileMenu, isMobileMenuOpen }) {
  const router = useRouter();
  const [simulatedTime, setSimulatedTime] = useState("2026-08-19 21:05:00 IST");
  
  // Hydration-safe external store subscription to localStorage
  const currentTheme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot);
  const isLightMode = currentTheme === "light";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("light-theme", isLightMode);
      document.documentElement.classList.toggle("dark", !isLightMode);
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    const nextTheme = isLightMode ? "dark" : "light";
    if (typeof window !== "undefined") {
      localStorage.setItem("energyshield-theme", nextTheme);
      window.dispatchEvent(new Event("storage"));
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSimulatedTime(
        now.toISOString().replace("T", " ").slice(0, 19) + " UTC"
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleResetSimulation = () => {
    if (typeof window !== "undefined") {
      if (window.confirm("Reset all scenario variables and simulation parameters to default baseline?")) {
        router.push("/");
        router.refresh();
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Mobile Hamburger & Brand Platform Identity */}
        <div className="flex items-center gap-3">
          {/* Mobile Drawer Toggle */}
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? (
              <XIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 border border-sky-200 text-sky-600 group-hover:border-sky-400 transition-colors shadow-xs">
              <ShieldIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-wider text-slate-900 font-heading">
                  ENERGY<span className="text-sky-600">SHIELD</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-bold">
                  DECISION-SUPPORT
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden lg:block">
                National Energy Supply Chain Resilience Intelligence Platform
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Data Status Banner & Hackathon Badge */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/data-center"
            title="Inspect Data Center & Provider Ingestion Health"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 text-xs font-mono transition-all cursor-pointer shadow-xs group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600"></span>
            </span>
            <span className="font-semibold tracking-wide group-hover:text-sky-950">DATA: OFFICIAL BASELINE</span>
            <span className="text-sky-300 hidden md:inline">|</span>
            <span className="text-sky-700 text-[11px] hidden md:inline group-hover:underline font-bold">AUDIT →</span>
          </Link>

          <span className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF8FF] border border-[#B9DDF5] text-[#0C2340] text-[11px] font-mono font-semibold">
            <span className="text-sky-600 font-bold">OOSC 4.0</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-700">Team TechSparkX</span>
          </span>
        </div>

        {/* Right: Operational Telemetry & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Simulated Time */}
          <div className="hidden xl:flex flex-col text-right font-mono">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Simulated Clock</span>
            <span className="text-xs text-slate-700 font-medium">{simulatedTime}</span>
          </div>

          {/* Engine Status Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-xs font-mono">
            <ActivityIcon className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span className="text-slate-500">ENGINE:</span>
            <span className="text-emerald-700 font-bold">READY</span>
          </div>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            title={isLightMode ? "Switch to Sovereign Dark Mode" : "Switch to Refined Light Mode"}
            aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
            suppressHydrationWarning
            className="flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer shadow-xs"
          >
            {isLightMode ? (
              <>
                <SunIcon className="w-4 h-4 text-amber-500" />
                <span className="hidden sm:inline" suppressHydrationWarning>Light</span>
              </>
            ) : (
              <>
                <MoonIcon className="w-4 h-4 text-sky-600" />
                <span className="hidden sm:inline" suppressHydrationWarning>Dark</span>
              </>
            )}
          </button>

          {/* Reset Action */}
          <button
            onClick={handleResetSimulation}
            title="Reset Simulation to Default Baseline"
            aria-label="Reset simulation state"
            className="flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCwIcon className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Reset</span>
          </button>

        </div>
      </div>
    </header>
  );
}
