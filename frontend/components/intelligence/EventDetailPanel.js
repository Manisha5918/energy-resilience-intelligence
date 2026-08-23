"use client";

import Link from "next/link";
import { ShieldIcon, SlidersIcon } from "@/components/ui/Icons";

export default function EventDetailPanel({ event }) {
  if (!event) {
    return (
      <div className="command-card rounded-2xl p-8 border border-slate-200 bg-white text-center text-slate-500 font-mono text-xs">
        Select an intelligence signal from the feed to inspect detailed AI analysis and impact pathways.
      </div>
    );
  }

  const isCritical = event.severity === "CRITICAL";
  const isHigh = event.severity === "HIGH";

  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
              isCritical
                ? "bg-rose-50 text-rose-800 border-rose-200"
                : isHigh
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-sky-50 text-sky-800 border-sky-200"
            }`}>
              {event.severity} SEVERITY
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
              {event.eventType}
            </span>
          </div>
          <h3 className="text-base font-bold font-heading text-slate-900 mt-2 leading-snug">
            {event.title}
          </h3>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 self-start sm:self-auto font-semibold">
          STATUS: <span className="text-sky-700 font-bold">{event.status}</span>
        </div>
      </div>

      {/* AI Grounded Explanation: Why This Matters to India */}
      <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sky-900 font-mono text-xs font-bold uppercase">
            <ShieldIcon className="w-4 h-4 text-sky-700" />
            <span>AI Supply Chain Relevance Engine</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 border border-sky-300 text-sky-900 font-bold">
            STRUCTURED REASONING
          </span>
        </div>

        <p className="text-xs text-slate-800 font-sans leading-relaxed">
          {event.aiAnalysis?.relevanceToIndia}
        </p>

        <div className="pt-2 border-t border-sky-200 text-xs text-sky-950 font-mono flex items-start gap-1.5">
          <span className="text-sky-800 font-bold shrink-0">RECOMMENDED ACTION:</span>
          <span className="text-slate-800 font-sans">{event.aiAnalysis?.recommendedAction}</span>
        </div>
      </div>

      {/* Tri-Vector Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 space-y-1">
          <span className="text-[10px] text-rose-700 uppercase block font-bold">Supply Impact</span>
          <p className="text-rose-950 text-xs font-sans font-semibold leading-snug">
            {event.estimatedSupplyImpact}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-200 space-y-1">
          <span className="text-[10px] text-sky-700 uppercase block font-bold">Logistics Impact</span>
          <p className="text-sky-950 text-xs font-sans font-semibold leading-snug">
            {event.logisticsImpact}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
          <span className="text-[10px] text-amber-700 uppercase block font-bold">Market / Landed Price</span>
          <p className="text-amber-950 text-xs font-sans font-semibold leading-snug">
            {event.marketImpact}
          </p>
        </div>
      </div>

      {/* Metadata & Source Traceability Details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono p-3.5 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <span className="text-slate-500 uppercase block text-[10px]">Location</span>
          <span className="text-slate-900 font-semibold truncate block mt-0.5">{event.location}</span>
        </div>
        <div>
          <span className="text-slate-500 uppercase block text-[10px]">Confidence</span>
          <span className="text-emerald-700 font-bold block mt-0.5">
            {event.confidence} ({Math.round(event.confidenceScore * 100)}%)
          </span>
        </div>
        <div>
          <span className="text-slate-500 uppercase block text-[10px]">Published</span>
          <span className="text-slate-800 font-medium block mt-0.5">{event.publishedAt?.slice(0, 16).replace("T", " ")}</span>
        </div>
        <div>
          <span className="text-slate-500 uppercase block text-[10px]">Source Provider</span>
          <span className="text-slate-800 font-medium truncate block mt-0.5">{event.source}</span>
        </div>
      </div>

      {/* Scenario Simulation Hook */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-200">
        <div className="text-xs text-slate-600 font-sans">
          <span className="font-mono font-semibold text-slate-800">Confidence Rationale: </span>
          <span>{event.confidenceRationale}</span>
        </div>

        <Link
          href={`/scenarios?scenario=${event.scenarioPresetId || "hormuz-closure"}`}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold transition-all shrink-0 cursor-pointer shadow-sm"
        >
          <SlidersIcon className="w-4 h-4" />
          <span>Simulate in Scenario Engine →</span>
        </Link>
      </div>

    </div>
  );
}
