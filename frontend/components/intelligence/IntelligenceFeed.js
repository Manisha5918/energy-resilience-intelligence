"use client";

import { useState } from "react";
import { FilterIcon, GlobeIcon, AlertTriangleIcon, InfoIcon, ShieldIcon } from "@/components/ui/Icons";

export default function IntelligenceFeed({ events, selectedEventId, onSelectEvent }) {
  const [filterType, setFilterType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((ev) => {
    const matchesType = filterType === "ALL" || ev.eventType === filterType;
    const matchesSearch = searchQuery === "" || 
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ev.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Live Ingested Intelligence Feed
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-800 text-purple-300">
              {filteredEvents.length} SIGNALS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Normalized geopolitical, naval, sanctions, and infrastructure threat stream.
          </p>
        </div>

        {/* Search & Event Type Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Search signals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-36 sm:w-44"
          />

          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            {["ALL", "geopolitical", "maritime", "sanctions", "infrastructure", "market"].map((t) => {
              const isSelected = filterType === t;
              return (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-2 py-1 rounded text-[11px] font-mono uppercase transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-slate-100 text-slate-950 font-bold shadow-sm"
                      : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {t === "ALL" ? "All" : t}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-2.5 max-h-[540px] overflow-y-auto pr-1">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded-lg">
            No intelligence signals matching current filter criteria.
          </div>
        ) : (
          filteredEvents.map((ev) => {
            const isSelected = ev.id === selectedEventId;
            const isCritical = ev.severity === "CRITICAL";
            const isHigh = ev.severity === "HIGH";
            const isMedium = ev.severity === "MEDIUM";

            const badgeColor = isCritical
              ? "bg-rose-950/80 text-rose-400 border-rose-800"
              : isHigh
              ? "bg-amber-950/80 text-amber-400 border-amber-800"
              : isMedium
              ? "bg-cyan-950/80 text-cyan-400 border-cyan-800"
              : "bg-slate-800 text-slate-300 border-slate-700";

            return (
              <div
                key={ev.id}
                onClick={() => onSelectEvent(ev.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#101726] border-cyan-500 shadow-md ring-1 ring-cyan-500/40"
                    : "bg-[#080d16] border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${badgeColor}`}>
                      {ev.severity}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {ev.eventType}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {ev.publishedAt?.slice(0, 10)}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-400">
                    CONFIDENCE: {ev.confidence} ({Math.round(ev.confidenceScore * 100)}%)
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-100 font-sans mt-2 leading-snug">
                  {ev.title}
                </h4>

                <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed line-clamp-2">
                  {ev.summary}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>Corridors:</span>
                    <span className="text-cyan-300 font-medium">
                      {ev.affectedCorridors?.join(", ") || "Global / Open Waters"}
                    </span>
                  </div>

                  <span className="text-slate-500">
                    Source: {ev.source?.split("/")[0]}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
