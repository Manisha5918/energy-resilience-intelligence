"use client";

import { useState } from "react";
import IntelligenceHealthHeader from "@/components/intelligence/IntelligenceHealthHeader";
import IntelligenceFeed from "@/components/intelligence/IntelligenceFeed";
import EventDetailPanel from "@/components/intelligence/EventDetailPanel";
import CorridorSignalPanel from "@/components/intelligence/CorridorSignalPanel";
import SupplierSignalPanel from "@/components/intelligence/SupplierSignalPanel";
import RiskImpactPanel from "@/components/intelligence/RiskImpactPanel";
import SourceTraceabilityPanel from "@/components/intelligence/SourceTraceabilityPanel";
import { SIMULATED_INTELLIGENCE_EVENTS } from "@/lib/intelligenceData";
import { mapCorridorSignals } from "@/lib/corridorImpactEngine";
import { mapSupplierSignals } from "@/lib/supplierImpactEngine";
import { aggregateIntelligenceRisk } from "@/lib/intelligenceRiskAggregator";
import { GlobeIcon, ShieldIcon, ActivityIcon } from "@/components/ui/Icons";

export default function IntelligencePage() {
  const [events] = useState(SIMULATED_INTELLIGENCE_EVENTS);
  const [selectedEventId, setSelectedEventId] = useState(SIMULATED_INTELLIGENCE_EVENTS[0].id);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];
  const corridorSignals = mapCorridorSignals(events);
  const supplierSignals = mapSupplierSignals(events);
  const riskImpact = aggregateIntelligenceRisk(events);

  const highRiskCount = events.filter((e) => ["CRITICAL", "HIGH"].includes(e.severity)).length;
  const affectedCorridorsCount = corridorSignals.filter((c) => c.signalCount > 0).length;
  const affectedSuppliersCount = supplierSignals.filter((s) => s.signalCount > 0).length;

  const defaultProviders = [
    { name: "Geopolitical News Wire", isLive: false, status: "DEMO ADAPTER" },
    { name: "Maritime AIS & Chokepoints", isLive: false, status: "DEMO ADAPTER" },
    { name: "Sanctions & Compliance Tracker", isLive: false, status: "DEMO ADAPTER" },
    { name: "Crude Benchmark & Tanker Freight", isLive: false, status: "DEMO ADAPTER" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Executive Intelligence Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#170e24] via-[#0d121f] to-[#070a0f] border border-purple-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-700/60 text-purple-400">
            <GlobeIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
                AI Geopolitical & Logistics Intelligence Terminal
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300">
                SIGNAL INGESTION ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Continuous threat ingestion correlating naval alerts, sanctions, and market signals with India&apos;s crude supply chain.
            </p>
          </div>
        </div>

        {/* Safety & Honesty Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1 rounded-lg bg-amber-950/60 border border-amber-600/50 text-amber-300 font-mono text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-bold">DEMO MODE — SIMULATED INTELLIGENCE</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 font-mono text-[11px]">
            AI REASONING ENGINE • EXPLAINABLE SIGNALS
          </div>
        </div>
      </div>

      {/* 1. HEALTH & INGESTION TELEMETRY */}
      <section aria-label="Intelligence Health Telemetry">
        <IntelligenceHealthHeader
          totalEvents={events.length}
          highRiskCount={highRiskCount}
          affectedCorridorsCount={affectedCorridorsCount}
          affectedSuppliersCount={affectedSuppliersCount}
          status="SIMULATED"
        />
      </section>

      {/* 2. MAIN WORKSPACE: INTELLIGENCE FEED + AI EVENT DETAIL PANEL */}
      <section aria-label="Intelligence Workspace">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6">
            <IntelligenceFeed
              events={events}
              selectedEventId={selectedEventId}
              onSelectEvent={setSelectedEventId}
            />
          </div>

          <div className="lg:col-span-6">
            <EventDetailPanel event={selectedEvent} />
          </div>
        </div>
      </section>

      {/* 3. CORRIDOR & SUPPLIER RISK SIGNAL MATRICES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-6" aria-label="Corridor Signal Mapping">
          <CorridorSignalPanel corridorSignals={corridorSignals} />
        </section>

        <section className="lg:col-span-6" aria-label="Supplier Signal Mapping">
          <SupplierSignalPanel supplierSignals={supplierSignals} />
        </section>
      </div>

      {/* 4. DYNAMIC RISK IMPACT (BASELINE VS INTELLIGENCE-ADJUSTED RESILIENCE) */}
      <section aria-label="Dynamic Risk Scoring Impact">
        <RiskImpactPanel riskImpact={riskImpact} />
      </section>

      {/* 5. SOURCE TRACEABILITY & MULTI-PROVIDER ARCHITECTURE */}
      <section aria-label="Source Traceability & Providers">
        <SourceTraceabilityPanel providers={defaultProviders} />
      </section>

    </div>
  );
}
