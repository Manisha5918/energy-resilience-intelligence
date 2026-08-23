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
    <div className="command-card rounded-2xl p-6 border border-slate-200 space-y-5 bg-white shadow-sm">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangleIcon className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Risk Alert Center & Threat Telemetry
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
              {filteredEvents.length} ACTIVE ALERTS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time simulated intelligence tracking chokepoint incidents, naval advisories, sanctions, and port disruptions.
          </p>
        </div>

        {/* Severity Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <div className="flex items-center gap-1 text-xs font-mono text-slate-500 mr-1 font-semibold">
            <FilterIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filter:</span>
          </div>
          {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map((sev) => {
            const isSelected = filterSeverity === sev;
            return (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white font-bold shadow-sm"
                    : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {sev}
              </button>
            );
          })}
        </div>
      </div>

      {/* Alert Feed Stream */}
      <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-200 rounded-xl">
            No active alerts found matching severity filter: {filterSeverity}
          </div>
        ) : (
          filteredEvents.map((alert) => {
            const isExpanded = expandedAlertId === alert.id;
            const isCritical = alert.severity === "CRITICAL";
            const isHigh = alert.severity === "HIGH";
            const isMedium = alert.severity === "MEDIUM";

            const badgeColor = isCritical
              ? "bg-rose-50 text-rose-800 border-rose-200"
              : isHigh
              ? "bg-amber-50 text-amber-800 border-amber-200"
              : isMedium
              ? "bg-sky-50 text-sky-800 border-sky-200"
              : "bg-slate-100 text-slate-700 border-slate-200";

            return (
              <div
                key={alert.id}
                onClick={() => setExpandedAlertId(isExpanded ? null : alert.id)}
                className={`rounded-xl p-4 border transition-all cursor-pointer ${
                  isExpanded
                    ? "bg-sky-50/50 border-sky-300 shadow-sm"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-medium">{alert.date}</span>
                    <span className="text-xs font-mono text-sky-800 font-bold">
                      [{alert.affectedCorridor}]
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 font-medium">
                    {alert.sourceStatus}
                  </span>
                </div>

                <div className="mt-2 flex items-start justify-between gap-4">
                  <h4 className="text-sm font-semibold text-slate-900 font-sans leading-snug">
                    {alert.event}
                  </h4>
                  <span className="text-xs text-sky-700 font-mono font-bold shrink-0">
                    {isExpanded ? "Collapse ▲" : "Inspect ▼"}
                  </span>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-3.5 pt-3 border-t border-slate-200 space-y-3 text-xs font-sans">
                    <p className="text-slate-700 leading-relaxed">
                      {alert.summary}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs pt-1">
                      <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                        <span className="text-slate-500 uppercase text-[10px] block font-semibold">Location</span>
                        <span className="text-slate-900 font-bold">{alert.location}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                        <span className="text-slate-500 uppercase text-[10px] block font-semibold">Potential Supply Impact</span>
                        <span className="text-rose-700 font-bold">{alert.estimatedSupplyImpact}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-sky-50 border border-sky-200 text-slate-800 text-xs">
                      <span className="font-mono text-[10px] uppercase font-bold text-sky-900 flex items-center gap-1.5 mb-1">
                        <ShieldIcon className="w-3.5 h-3.5 text-sky-600" />
                        Recommended Mitigation Action
                      </span>
                      <p className="leading-relaxed text-slate-700 font-sans">
                        {alert.mitigationHint}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1 font-medium">
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
