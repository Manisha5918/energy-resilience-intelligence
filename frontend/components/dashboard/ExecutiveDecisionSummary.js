"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldIcon, 
  AlertTriangleIcon, 
  CheckCircleIcon, 
  SlidersIcon, 
  InfoIcon, 
  ZapIcon, 
  ChevronDownIcon 
} from "@/components/ui/Icons";

export default function ExecutiveDecisionSummary({ 
  resilienceScore = 36, 
  supplyGapMbd = 0, 
  reserveDays = 8.1,
  onOpenExplainModal 
}) {
  const [isDriversExpanded, setIsDriversExpanded] = useState(false);
  const isCritical = resilienceScore < 20 || supplyGapMbd > 1.5;

  return (
    <section 
      aria-labelledby="executive-decision-heading" 
      className="rounded-2xl p-6 sm:p-8 border border-[#D5E5F1] bg-[#F8FBFE] shadow-xs space-y-6"
    >
      
      {/* 1. Header: Situation Headline + Severity Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D5E5F1] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono uppercase tracking-widest text-[#526B82] font-bold">
              ENERGYSHIELD — CURRENT SITUATION
            </span>
          </div>
          <h2 id="executive-decision-heading" className="text-2xl sm:text-3xl font-bold font-heading text-[#0B2540] flex items-center gap-3">
            {isCritical ? (
              <>
                <span className="inline-block w-3.5 h-3.5 rounded-full bg-rose-500 animate-pulse"></span>
                <span>CRITICAL ENERGY SUPPLY RISK</span>
              </>
            ) : (
              <>
                <span className="inline-block w-3.5 h-3.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span>ELEVATED CHOKEPOINT RISK — STABLE BASELINE</span>
              </>
            )}
          </h2>
          <p className="text-base text-[#526B82] font-sans leading-relaxed pt-1">
            {isCritical
              ? "India could face a significant crude supply shortfall under the active disruption scenario without coordinated supplier reallocation."
              : "India maintains steady-state refining throughput (5.42 MBD), but faces high structural vulnerability with 58.4% of imports exposed to the Strait of Hormuz."}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold ${
            isCritical 
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : "bg-amber-50 border-amber-200 text-amber-800"
          }`}>
            {isCritical ? "SEVERITY: CRITICAL" : "SEVERITY: ELEVATED"}
          </span>
        </div>
      </div>

      {/* 2. Three Core Decision Metric Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Metric 1: Resilience */}
        <div className="p-5 rounded-xl bg-[#F1F8FD] border border-[#D5E5F1] space-y-1.5 flex flex-col justify-between shadow-2xs">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#526B82] font-bold block">
              1. Overall Resilience
            </span>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-[#0B2540] mt-1 tabular-nums">
              {resilienceScore} <span className="text-sm font-normal text-[#526B82]">/ 100</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 pt-2 border-t border-[#D5E5F1]">
            <span className={`text-xs font-semibold ${resilienceScore < 20 ? "text-rose-700" : "text-amber-700"}`}>
              {resilienceScore < 20 ? "Critical Deficit ↓" : "Elevated Vulnerability ⚠"}
            </span>
          </div>
        </div>

        {/* Metric 2: Supply Gap */}
        <div className="p-5 rounded-xl bg-[#F1F8FD] border border-[#D5E5F1] space-y-1.5 flex flex-col justify-between shadow-2xs">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#526B82] font-bold block">
              2. Supply Gap Deficit
            </span>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-[#0B2540] mt-1 tabular-nums">
              {supplyGapMbd > 0 ? `-${supplyGapMbd}` : "0.0"} <span className="text-sm font-normal text-[#526B82]">MBD</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 pt-2 border-t border-[#D5E5F1]">
            <span className={`text-xs font-semibold ${supplyGapMbd > 0 ? "text-rose-700" : "text-emerald-700"}`}>
              {supplyGapMbd > 0 ? "Active Disruption Deficit" : "Normal Steady State Buffer"}
            </span>
          </div>
        </div>

        {/* Metric 3: Reserve Cover */}
        <div className="p-5 rounded-xl bg-[#F1F8FD] border border-[#D5E5F1] space-y-1.5 flex flex-col justify-between shadow-2xs">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#526B82] font-bold block">
              3. Strategic Reserve Cover
            </span>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-[#0B2540] mt-1 tabular-nums">
              {reserveDays} <span className="text-sm font-normal text-[#526B82]">Days</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 pt-2 border-t border-[#D5E5F1]">
            <span className="text-xs font-semibold text-emerald-700">
              5.33 MMT Tri-Cavern Buffer
            </span>
          </div>
        </div>

      </div>

      {/* 3. Expandable Key Risk Drivers */}
      <div className="border-t border-[#D5E5F1] pt-4">
        <button
          onClick={() => setIsDriversExpanded(!isDriversExpanded)}
          className="flex items-center justify-between w-full text-left py-1 text-xs font-mono font-bold text-[#0B2540] hover:text-[#0284c7] transition cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <InfoIcon className="w-4 h-4 text-sky-600" />
            <span>PRIMARY RESILIENCE RISK DRIVERS (5 AUDITED FACTORS)</span>
          </span>
          <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isDriversExpanded ? "rotate-180" : ""}`} />
        </button>

        {isDriversExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 pt-3 border-t border-[#D5E5F1] text-xs font-sans">
            <div className="p-3 bg-[#F1F8FD] rounded-xl border border-[#D5E5F1]">
              <strong className="text-[#0B2540] block font-mono text-[11px] uppercase">1. Chokepoint Vulnerability (30%)</strong>
              <p className="text-[#526B82] mt-0.5">58.4% of Indian crude transit relies on the Strait of Hormuz, presenting severe single-corridor exposure.</p>
            </div>
            <div className="p-3 bg-[#F1F8FD] rounded-xl border border-[#D5E5F1]">
              <strong className="text-[#0B2540] block font-mono text-[11px] uppercase">2. Supplier Concentration (20%)</strong>
              <p className="text-[#526B82] mt-0.5">HHI score of 2,063 points indicates moderately high import dependency on top 3 Middle East origin nations.</p>
            </div>
            <div className="p-3 bg-[#F1F8FD] rounded-xl border border-[#D5E5F1]">
              <strong className="text-[#0B2540] block font-mono text-[11px] uppercase">3. SPR Reserve Buffer (25%)</strong>
              <p className="text-[#526B82] mt-0.5">ISPRL Phase-I caverns (39.18 MBBL) provide 8.1 days of statutory net-import physical emergency cover.</p>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}
