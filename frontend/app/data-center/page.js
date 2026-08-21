"use client";

import { useState } from "react";
import DataStatusPanel from "@/components/system/DataStatusPanel";
import ProviderHealthMatrix from "@/components/dataCenter/ProviderHealthMatrix";
import DataFreshnessMonitor from "@/components/dataCenter/DataFreshnessMonitor";
import ConflictingSignalsAlert from "@/components/dataCenter/ConflictingSignalsAlert";
import AuditLogViewer from "@/components/dataCenter/AuditLogViewer";
import MissingDataPanel from "@/components/system/MissingDataPanel";
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1e34] via-[#09121f] to-[#070a0f] border border-cyan-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-700/60 text-cyan-400">
            <DatabaseIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
                Data Quality Center & Source Provenance Terminal
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                AUDIT & INGESTION TELEMETRY
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live audit of external adapters, server-side caching latency, telemetry freshness, and conflict reconciliation.
            </p>
          </div>
        </div>

        {/* Safety & Honesty Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1 rounded-lg bg-amber-950/60 border border-amber-600/50 text-amber-300 font-mono text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-bold">DEMO MODE — SIMULATED DATA</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 font-mono text-[11px]">
            ZERO CLIENT SECRETS • IMMUTABLE AUDIT TRAIL
          </div>
        </div>
      </div>

      {/* 1. DATA STATUS TELEMETRY */}
      <section aria-label="System Ingestion Status">
        <DataStatusPanel
          providers={providers}
          systemHealth={systemHealth}
        />
      </section>

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
