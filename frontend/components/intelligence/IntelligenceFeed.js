"use client";

import { useState } from "react";
import { GlobeIcon, FilterIcon } from "@/components/ui/Icons";

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
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-5 h-5 text-purple-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Live Ingested Intelligence Feed
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 border border-purple-200 text-purple-800 font-bold">
              {filteredEvents.length} SIGNALS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
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
            className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-36 sm:w-44"
          />

          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            {["ALL", "geopolitical", "maritime", "sanctions", "infrastructure", "market"].map((t) => {
              const isSelected = filterType === t;
              return (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono uppercase transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-purple-700 text-white font-bold shadow-sm"
                      : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
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
      <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-300 rounded-xl bg-slate-50">
            No intelligence signals matching current filter criteria.
          </div>
        ) : (
          filteredEvents.map((ev) => {
            const isSelected = ev.id === selectedEventId;
            const isCritical = ev.severity === "CRITICAL";
            const isHigh = ev.severity === "HIGH";
            const isMedium = ev.severity === "MEDIUM";

            const badgeColor = isCritical
              ? "bg-rose-50 text-rose-800 border-rose-200"
              : isHigh
              ? "bg-amber-50 text-amber-800 border-amber-200"
              : isMedium
              ? "bg-sky-50 text-sky-800 border-sky-200"
              : "bg-slate-100 text-slate-700 border-slate-200";

            return (
              <div
                key={ev.id}
                onClick={() => onSelectEvent(ev.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-purple-50/60 border-purple-500 shadow-md ring-2 ring-purple-500/20"
                    : "bg-slate-50/70 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                      {ev.severity}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-semibold">
                      {ev.eventType}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {ev.publishedAt?.slice(0, 10)}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-emerald-700 font-bold">
                    CONFIDENCE: {ev.confidence} ({Math.round(ev.confidenceScore * 100)}%)
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 font-heading mt-2 leading-snug">
                  {ev.title}
                </h4>

                <p className="text-xs text-slate-600 font-sans mt-1.5 leading-relaxed line-clamp-2">
                  {ev.summary}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="font-semibold">Corridors:</span>
                    <span className="text-sky-800 font-medium">
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
