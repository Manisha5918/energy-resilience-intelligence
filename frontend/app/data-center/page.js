"use client";

import { useState } from "react";
import DataReadinessDashboard from "@/components/dataCenter/DataReadinessDashboard";
import DataStatusPanel from "@/components/system/DataStatusPanel";
import ProviderHealthMatrix from "@/components/dataCenter/ProviderHealthMatrix";
import DataFreshnessMonitor from "@/components/dataCenter/DataFreshnessMonitor";
import ConflictingSignalsAlert from "@/components/dataCenter/ConflictingSignalsAlert";
import AuditLogViewer from "@/components/dataCenter/AuditLogViewer";
import MissingDataPanel from "@/components/system/MissingDataPanel";
import VisualStorySection from "@/components/VisualStorySection";
import DataProvenancePipeline from "@/components/landing/DataProvenancePipeline";
import { DatabaseIcon, ShieldIcon, ActivityIcon, CheckCircleIcon } from "@/components/ui/Icons";

const DEFAULT_PROVIDERS = [
  {
    name: "Geopolitical News Wire",
    type: "news",
    isLive: false,
    status: "healthy",
    dataStatus: "OFFICIAL_BASELINE",
    latencyMs: 12,
    lastUpdated: "2026-08-19T21:35:00Z",
    signalCount: 6
  },
  {
    name: "Maritime AIS & Chokepoints",
    type: "shipping",
    isLive: false,
    status: "healthy",
    dataStatus: "OFFICIAL_BASELINE",
    latencyMs: 15,
    lastUpdated: "2026-08-19T21:28:00Z",
    signalCount: 4
  },
  {
    name: "Sanctions & Compliance Tracker",
    type: "sanctions",
    isLive: false,
    status: "healthy",
    dataStatus: "OFFICIAL_BASELINE",
    latencyMs: 8,
    lastUpdated: "2026-08-19T20:55:00Z",
    signalCount: 3
  },
  {
    name: "Crude Benchmark & Freight Index",
    type: "market",
    isLive: false,
    status: "healthy",
    dataStatus: "OFFICIAL_BASELINE",
    latencyMs: 10,
    lastUpdated: "2026-08-19T21:38:00Z",
    signalCount: 5
  }
];

const SYSTEM_HEALTH = {
  overallStatus: "OFFICIAL_BASELINE",
  badgeText: "OFFICIAL BASELINE — ZERO FABRICATION",
  statusClass: "bg-cyan-950/80 text-cyan-300 border-cyan-800"
};

export default function DataCenterPage() {
  const [providers] = useState(DEFAULT_PROVIDERS);
  const [systemHealth] = useState(SYSTEM_HEALTH);

  return (
    <div className="space-y-6">
      
      {/* Executive Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-700">
            <DatabaseIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
                Data Quality Center &amp; Source Provenance Terminal
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-bold">
                AUDIT &amp; INGESTION TELEMETRY
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Live audit of external adapters, server-side caching latency, telemetry freshness, and conflict reconciliation.
            </p>
          </div>
        </div>

        {/* Safety & Honesty Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
            <span>DEMO MODE — SIMULATED DATA</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-semibold">
            IMMUTABLE AUDIT TRAIL
          </div>
        </div>
      </div>

      {/* 0. DATA READINESS & PROVENANCE AUDIT */}
      <section aria-label="Data Readiness & Provenance Dashboard">
        <DataReadinessDashboard />
      </section>

      {/* 1. DATA STATUS TELEMETRY */}
      <section aria-label="System Ingestion Status">
        <DataStatusPanel
          providers={providers}
          systemHealth={systemHealth}
        />
      </section>

      {/* CINEMATIC VISUAL STORY BREAK: ENERGY DATA INTELLIGENCE */}
      <VisualStorySection
        eyebrow="FROM SOURCE TO DECISION"
        title="Every analytical output is connected to a provenance category."
        description="Statutory baseline datasets, physical cavern conservation laws, calibrated model assumptions, and pending-validation telemetry are explicitly bounded across all endpoints."
        image="/images/refinery_infrastructure.jpg"
        imageAlt="Illustrative energy data intelligence and physical infrastructure network"
        caption="Illustrative energy data intelligence architecture — bound to statutory citations and deterministic formulas."
        theme="cyan"
        position="left"
        flowSteps={["OFFICIAL", "DERIVED", "MODEL ASSUMPTION", "SIMULATED", "PENDING VALIDATION"]}
      />

      {/* DATA PROVENANCE PIPELINE */}
      <DataProvenancePipeline />

      {/* 2. PROVIDER HEALTH & AUTHENTICATION MATRIX */}
      <section aria-label="Provider Health Matrix">
        <ProviderHealthMatrix providers={providers} />
      </section>

      {/* 3. DATA FRESHNESS & LATENCY MONITOR */}
      <section aria-label="Data Freshness Monitor">
        <DataFreshnessMonitor providers={providers} />
      </section>

      {/* 4. CONFLICT DETECTION & RECONCILIATION */}
      <section aria-label="Conflict Detection">
        <ConflictingSignalsAlert />
      </section>

      {/* 5. ZERO-FABRICATION & MISSING DATA AUDIT */}
      <section aria-label="Missing Data Audit">
        <MissingDataPanel />
      </section>

      {/* 6. IMMUTABLE AUDIT LOG VIEWER */}
      <section aria-label="Model Audit Trail">
        <AuditLogViewer />
      </section>

    </div>
  );
}
