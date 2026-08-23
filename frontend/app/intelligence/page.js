"use client";

import { useState } from "react";
import IntelligenceHealthHeader from "@/components/intelligence/IntelligenceHealthHeader";
import IntelligenceFeed from "@/components/intelligence/IntelligenceFeed";
import EventDetailPanel from "@/components/intelligence/EventDetailPanel";
import CorridorSignalPanel from "@/components/intelligence/CorridorSignalPanel";
import SupplierSignalPanel from "@/components/intelligence/SupplierSignalPanel";
import RiskImpactPanel from "@/components/intelligence/RiskImpactPanel";
import SourceTraceabilityPanel from "@/components/intelligence/SourceTraceabilityPanel";
import VisualStorySection from "@/components/VisualStorySection";
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-700">
            <GlobeIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
                AI Geopolitical &amp; Logistics Intelligence Terminal
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 border border-purple-200 text-purple-800 font-bold">
                SIGNAL INGESTION ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Continuous threat ingestion correlating naval alerts, sanctions, and market signals with India&apos;s crude supply chain.
            </p>
          </div>
        </div>

        {/* Safety & Honesty Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
            <span>DEMO MODE — SIMULATED INTELLIGENCE</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-semibold">
            EXPLAINABLE SIGNALS
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

      {/* CINEMATIC VISUAL STORY BREAK: MARITIME ENERGY SECURITY */}
      <VisualStorySection
        eyebrow="MARITIME SUPPLY CORRIDORS"
        title="Hormuz • Red Sea • Arabian Sea • Cape Route"
        description="Continuous monitoring of vessel traffic density and maritime threat corridors across India's primary hydrocarbon supply routes."
        image="/images/maritime_chokepoint.png"
        imageAlt="Cinematic aerial view of crude oil tankers transiting a maritime chokepoint"
        caption="Illustrative maritime visualization. Vessel positions and AIS telemetry remain simulated unless connected to an authorized live provider."
        theme="cyan"
        position="left"
        showRouteOverlay={true}
        flowSteps={["Strait of Hormuz (42%)", "Bab-el-Mandeb", "Cape Diversion (+14d)", "Vadinar & Sikka SPMs"]}
      />

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
