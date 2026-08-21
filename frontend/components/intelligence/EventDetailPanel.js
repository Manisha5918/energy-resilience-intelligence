"use client";

import Link from "next/link";
import { ShieldIcon, AlertTriangleIcon, ActivityIcon, SlidersIcon, InfoIcon, ExternalLink } from "@/components/ui/Icons";

export default function EventDetailPanel({ event }) {
  if (!event) {
    return (
      <div className="command-card rounded-xl p-8 border border-slate-800 text-center text-slate-500 font-mono text-xs">
        Select an intelligence signal from the feed to inspect detailed AI analysis and impact pathways.
      </div>
    );
  }

  const isCritical = event.severity === "CRITICAL";
  const isHigh = event.severity === "HIGH";

  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4 bg-gradient-to-b from-[#0e1422] to-[#080d16]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
              isCritical
                ? "bg-rose-950 text-rose-400 border-rose-800"
                : isHigh
                ? "bg-amber-950 text-amber-400 border-amber-800"
                : "bg-cyan-950 text-cyan-400 border-cyan-800"
            }`}>
              {event.severity} SEVERITY
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {event.eventType}
            </span>
          </div>
          <h3 className="text-sm font-bold font-sans text-slate-100 mt-2 leading-snug">
            {event.title}
          </h3>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          STATUS: <span className="text-cyan-400 font-bold">{event.status}</span>
        </div>
      </div>

      {/* AI Grounded Explanation: Why This Matters to India */}
      <div className="p-4 rounded-xl bg-[#091220] border border-cyan-700/60 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
            <ShieldIcon className="w-4 h-4" />
            <span>AI Supply Chain Relevance Engine</span>
          </div>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
            STRUCTURED REASONING
          </span>
        </div>

        <p className="text-xs text-slate-200 font-sans leading-relaxed">
          {event.aiAnalysis?.relevanceToIndia}
        </p>

        <div className="pt-1.5 border-t border-cyan-900/40 text-[11px] text-cyan-300/90 font-mono flex items-start gap-1.5">
          <span className="text-cyan-400 font-bold shrink-0">RECOMMENDED ACTION:</span>
          <span>{event.aiAnalysis?.recommendedAction}</span>
        </div>
      </div>

      {/* Tri-Vector Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
        <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 space-y-1">
          <span className="text-[9px] text-slate-500 uppercase block font-semibold">Supply Impact</span>
          <p className="text-rose-300 text-[11px] font-sans leading-snug">
            {event.estimatedSupplyImpact}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 space-y-1">
          <span className="text-[9px] text-slate-500 uppercase block font-semibold">Logistics Impact</span>
          <p className="text-cyan-300 text-[11px] font-sans leading-snug">
            {event.logisticsImpact}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 space-y-1">
          <span className="text-[9px] text-slate-500 uppercase block font-semibold">Market / Landed Price</span>
          <p className="text-amber-300 text-[11px] font-sans leading-snug">
            {event.marketImpact}
          </p>
        </div>
      </div>

      {/* Metadata & Source Traceability Details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono p-3 rounded-lg bg-[#070b14] border border-slate-800">
        <div>
          <span className="text-slate-500 uppercase block">Location</span>
          <span className="text-slate-300 truncate block mt-0.5">{event.location}</span>
        </div>
        <div>
          <span className="text-slate-500 uppercase block">Confidence</span>
          <span className="text-emerald-400 font-bold block mt-0.5">
            {event.confidence} ({Math.round(event.confidenceScore * 100)}%)
          </span>
        </div>
        <div>
          <span className="text-slate-500 uppercase block">Published</span>
          <span className="text-slate-300 block mt-0.5">{event.publishedAt?.slice(0, 16).replace("T", " ")}</span>
        </div>
        <div>
          <span className="text-slate-500 uppercase block">Source Provider</span>
          <span className="text-slate-300 truncate block mt-0.5">{event.source}</span>
        </div>
      </div>

      {/* Phase 2 Scenario Simulation Hook */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800">
        <div className="text-[11px] text-slate-400 font-mono">
          <span>Confidence Rationale: </span>
          <span className="text-slate-300">{event.confidenceRationale}</span>
        </div>

        <Link
          href={`/scenarios`}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shrink-0 cursor-pointer shadow-md"
        >
          <SlidersIcon className="w-3.5 h-3.5" />
          <span>Simulate Disruption in Scenario Engine →</span>
        </Link>
      </div>

    </div>
  );
}
