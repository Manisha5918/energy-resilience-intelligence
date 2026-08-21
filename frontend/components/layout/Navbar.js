"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldIcon, ActivityIcon, RefreshCwIcon } from "@/components/ui/Icons";

export default function Navbar() {
  const [simulatedTime, setSimulatedTime] = useState("2026-08-19 21:05:00 IST");

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
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090d16]/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Platform Identity */}
        <div className="flex items-center gap-3.5">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 transition-colors shadow-sm">
              <ShieldIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg tracking-wider text-slate-100 font-mono">
                  ENERGY<span className="text-cyan-400">SHIELD</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-700/50 text-cyan-300">
                  v1.0-alpha
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                AI-Driven Energy Supply Chain Resilience • India Strategic Model
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Prominent Safety & Dynamic Data Status Banner */}
        <div className="flex items-center gap-2">
          <Link
            href="/data-center"
            title="Inspect Data Center & Provider Ingestion Health"
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-600/40 text-cyan-300 text-xs font-mono transition-all cursor-pointer shadow-sm group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-semibold tracking-wide group-hover:text-cyan-200">DATA: OFFICIAL BASELINE (4 DATASETS)</span>
            <span className="text-cyan-500/80 hidden md:inline">|</span>
            <span className="text-cyan-400/90 text-[11px] hidden md:inline group-hover:underline">DATA CENTER →</span>
          </Link>
        </div>

        {/* Right: Operational Telemetry & Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Simulated Time */}
          <div className="hidden lg:flex flex-col text-right font-mono">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Simulated Clock</span>
            <span className="text-xs text-slate-300 font-medium">{simulatedTime}</span>
          </div>

          {/* Engine Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-800 bg-slate-900/60 text-slate-300 text-xs font-mono">
            <ActivityIcon className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-slate-400">ENGINE:</span>
            <span className="text-emerald-400 font-medium">READY</span>
          </div>

          {/* Reset Action */}
          <button
            onClick={handleResetSimulation}
            title="Reset Simulation to Default Baseline"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-800/60 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
          >
            <RefreshCwIcon className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset State</span>
          </button>

        </div>
      </div>
    </header>
  );
}
