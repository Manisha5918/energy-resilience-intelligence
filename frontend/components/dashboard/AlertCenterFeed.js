"use client";

import { useState } from "react";
import { AlertTriangleIcon, FilterIcon, InfoIcon, ShieldIcon } from "@/components/ui/Icons";
import { SIMULATED_GEOPOLITICAL_EVENTS } from "@/lib/riskData";

export default function AlertCenterFeed() {
  const [filterSeverity, setFilterSeverity] = useState("ALL");
  const [expandedAlertId, setExpandedAlertId] = useState("geo-2026-081");

  const filteredEvents = SIMULATED_GEOPOLITICAL_EVENTS.filter((ev) => {
    if (filterSeverity === "ALL") return true;
    return ev.severity === filterSeverity;
  });

  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangleIcon className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Risk Alert Center & Threat Telemetry
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300">
              {filteredEvents.length} ACTIVE ALERTS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time simulated intelligence tracking chokepoint incidents, naval advisories, sanctions, and port disruptions.
          </p>
        </div>

        {/* Severity Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 mr-1">
            <FilterIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filter:</span>
          </div>
          {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map((sev) => {
            const isSelected = filterSeverity === sev;
            return (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-slate-100 text-slate-950 font-bold shadow-sm"
                    : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {sev}
              </button>
            );
          })}
        </div>
      </div>

      {/* Alert Feed Stream */}
      <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded-lg">
            No active alerts found matching severity filter: {filterSeverity}
          </div>
        ) : (
          filteredEvents.map((alert) => {
            const isExpanded = expandedAlertId === alert.id;
            const isCritical = alert.severity === "CRITICAL";
            const isHigh = alert.severity === "HIGH";
            const isMedium = alert.severity === "MEDIUM";

            const badgeColor = isCritical
              ? "bg-rose-950/80 text-rose-400 border-rose-800"
              : isHigh
              ? "bg-amber-950/80 text-amber-400 border-amber-800"
              : isMedium
              ? "bg-cyan-950/80 text-cyan-400 border-cyan-800"
              : "bg-slate-800 text-slate-300 border-slate-700";

            return (
              <div
                key={alert.id}
                onClick={() => setExpandedAlertId(isExpanded ? null : alert.id)}
                className={`rounded-xl p-4 border transition-all cursor-pointer ${
                  isExpanded
                    ? "bg-[#0b1220] border-cyan-700/60 shadow-md"
                    : "bg-[#080d16] border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{alert.date}</span>
                    <span className="text-[11px] font-mono text-cyan-400/90 font-medium">
                      [{alert.affectedCorridor}]
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-500">
                    {alert.sourceStatus}
                  </span>
                </div>

                <div className="mt-2 flex items-start justify-between gap-4">
                  <h4 className="text-sm font-medium text-slate-100 font-sans leading-snug">
                    {alert.event}
                  </h4>
                  <span className="text-xs text-cyan-400 font-mono shrink-0">
                    {isExpanded ? "Collapse ▲" : "Inspect ▼"}
                  </span>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-3.5 pt-3 border-t border-slate-800/80 space-y-2.5 text-xs font-sans">
                    <p className="text-slate-300 leading-relaxed">
                      {alert.summary}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px] pt-1">
                      <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                        <span className="text-slate-400 uppercase text-[9px] block">Location</span>
                        <span className="text-slate-200 font-medium">{alert.location}</span>
                      </div>
                      <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                        <span className="text-slate-400 uppercase text-[9px] block">Potential Supply Impact</span>
                        <span className="text-rose-300 font-medium">{alert.estimatedSupplyImpact}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded bg-[#070e17] border border-cyan-900/60 text-cyan-200 text-xs">
                      <span className="font-mono text-[10px] uppercase font-bold text-cyan-400 flex items-center gap-1.5 mb-1">
                        <ShieldIcon className="w-3.5 h-3.5" />
                        Recommended Mitigation Action
                      </span>
                      <p className="leading-relaxed text-slate-300">
                        {alert.mitigationHint}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 pt-1">
                      <span>CONFIDENCE RATING: {alert.confidence}</span>
                      <span>[SIMULATED THREAT INTELLIGENCE]</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
