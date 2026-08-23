"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DigitalTwinMap from "@/components/digitalTwin/DigitalTwinMap";
import DigitalTwinGISMap from "@/components/digitalTwin/DigitalTwinGISMap";
import NodeDetailPanel from "@/components/digitalTwin/NodeDetailPanel";
import NetworkHealthPanel from "@/components/digitalTwin/NetworkHealthPanel";
import DisruptionControls from "@/components/digitalTwin/DisruptionControls";
import NetworkCascade from "@/components/digitalTwin/NetworkCascade";
import NetworkComparison from "@/components/digitalTwin/NetworkComparison";
import RecommendedResponse from "@/components/digitalTwin/RecommendedResponse";
import DigitalTwinModelAssumptions from "@/components/digitalTwin/DigitalTwinModelAssumptions";
import { buildNetworkState } from "@/lib/digitalTwinEngine";
import { ShieldIcon, ActivityIcon, SlidersIcon, GlobeIcon } from "@/components/ui/Icons";

function DigitalTwinWorkspace() {
  const searchParams = useSearchParams();
  const scenarioFromQuery = searchParams.get("scenario");

  const [activeView, setActiveView] = useState("TOPOLOGY"); // TOPOLOGY | GEOSPATIAL
  const [scenarioId, setScenarioId] = useState(() => {
    return scenarioFromQuery || "current-conditions";
  });
  const [durationDays, setDurationDays] = useState(30);
  const [severity, setSeverity] = useState("severe");
  const [timelineDay, setTimelineDay] = useState(0);
  const [selectedNodeId, setSelectedNodeId] = useState("node-corridor-hormuz");
  const [filterType, setFilterType] = useState("ALL");

  // Compute complete topological digital twin network state
  const networkState = buildNetworkState({
    scenarioId,
    durationDays,
    severity,
    timelineDay
  });

  const selectedNode = networkState.nodes.find((n) => n.id === selectedNodeId) || networkState.nodes[0];

  const handleReset = () => {
    setScenarioId("current-conditions");
    setDurationDays(30);
    setSeverity("severe");
    setTimelineDay(0);
    setSelectedNodeId("node-corridor-hormuz");
    setFilterType("ALL");
  };

  return (
    <div className="space-y-6">
      
      {/* Executive Digital Twin Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700">
            <ActivityIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
                Supply Chain Digital Twin & Network Simulator
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
                TOPOLOGICAL TWIN LIVE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Interactive physical topology connecting global crude origins, maritime chokepoints, Indian coastal ports, refineries, and strategic reserves.
            </p>
          </div>
        </div>

        {/* Safety & Honesty Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="font-semibold">DEMO MODE — SIMULATED NETWORK</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[11px] font-medium">
            SYNTHETIC GRAPH • 25 NODES • 18 EDGES
          </div>
        </div>
      </div>

      {/* 1. NETWORK HEALTH & RESILIENCE PANEL */}
      <section aria-label="Network Health Overview">
        <NetworkHealthPanel
          networkResilienceIndicator={networkState.networkResilienceIndicator}
          baselineScore={networkState.baselineResilience.resilienceScore}
          metrics={networkState.metrics}
          isBaseline={networkState.isBaseline}
        />
      </section>

      {/* 2. DISRUPTION SIMULATION CONTROLS */}
      <section aria-label="Disruption Simulator Controls">
        <DisruptionControls
          scenarioId={scenarioId}
          onSelectScenario={setScenarioId}
          durationDays={durationDays}
          onChangeDuration={setDurationDays}
          severity={severity}
          onChangeSeverity={setSeverity}
          timelineDay={timelineDay}
          onChangeTimelineDay={setTimelineDay}
          onReset={handleReset}
        />
      </section>

      {/* View Switcher Controls */}
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView("TOPOLOGY")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 cursor-pointer min-h-[44px] ${
              activeView === "TOPOLOGY"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
            aria-label="Switch to Topological Network View"
          >
            <ActivityIcon className="w-4 h-4 text-cyan-400" />
            <span>[TOPOLOGICAL GRAPH]</span>
          </button>

          <button
            onClick={() => setActiveView("GEOSPATIAL")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 cursor-pointer min-h-[44px] ${
              activeView === "GEOSPATIAL"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
            aria-label="Switch to Geospatial GIS Map View"
          >
            <GlobeIcon className="w-4 h-4 text-emerald-400" />
            <span>[GEOSPATIAL MAP]</span>
          </button>
        </div>

        <span className="text-xs font-mono text-slate-500 hidden sm:inline">
          Active Mode: <strong className="text-slate-800 font-bold">{activeView === "TOPOLOGY" ? "Physical Network Topology" : "Georeferenced Maritime AIS & Coastal Terminals"}</strong>
        </span>
      </div>

      {/* 3. INTERACTIVE NETWORK GRAPH & NODE INSPECTION */}
      {activeView === "TOPOLOGY" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <DigitalTwinMap
              nodes={networkState.nodes}
              edges={networkState.edges}
              selectedNodeId={selectedNodeId}
              onSelectNode={setSelectedNodeId}
              filterType={filterType}
              onChangeFilterType={setFilterType}
            />
          </div>

          <div className="lg:col-span-4">
            <NodeDetailPanel
              node={selectedNode}
              scenarioId={scenarioId}
            />
          </div>
        </div>
      ) : (
        <section aria-label="Geospatial GIS Digital Twin Map">
          <DigitalTwinGISMap
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
          />
        </section>
      )}

      {/* 4. RECOMMENDED PROCUREMENT & BYPASS RESPONSE */}
      <section aria-label="Recommended Procurement Response">
        <RecommendedResponse
          topResponse={networkState.topResponse}
          scenarioId={scenarioId}
          metrics={networkState.metrics}
        />
      </section>

      {/* 5. MULTI-LAYER IMPACT CASCADE CHAIN */}
      <section aria-label="Disruption Impact Cascade">
        <NetworkCascade cascadeSteps={networkState.cascadeSteps} />
      </section>

      {/* 6. BASELINE VS DISRUPTED MATRIX */}
      <section aria-label="Network State Comparison">
        <NetworkComparison
          isBaseline={networkState.isBaseline}
          baselineScore={networkState.baselineResilience.resilienceScore}
          networkResilienceIndicator={networkState.networkResilienceIndicator}
          metrics={networkState.metrics}
          scenarioResult={networkState.scenarioResult}
        />
      </section>

      {/* 7. DECISION RESPONSE PIPELINE TRANSITIONS */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0d1c2e] via-[#09121f] to-[#070a0f] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
            <ShieldIcon className="w-4 h-4" />
            <span>Digital Twin Response Actions</span>
          </div>
          <p className="text-xs text-slate-300 font-sans mt-1">
            Convert topological cascade analysis into alternative crude sourcing or emergency reserve drawdown.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href={`/procurement?scenario=${scenarioId}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <ShieldIcon className="w-4 h-4" />
            <span>Optimize Procurement Plan →</span>
          </Link>
          <Link
            href="/reserves"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 font-mono text-xs font-bold transition-all cursor-pointer"
          >
            <ActivityIcon className="w-4 h-4" />
            <span>Inspect Strategic Reserves →</span>
          </Link>
        </div>
      </div>

      {/* 8. DIGITAL TWIN MODEL ASSUMPTIONS */}
      <section aria-label="Digital Twin Model Assumptions">
        <DigitalTwinModelAssumptions />
      </section>

    </div>
  );
}

export default function DigitalTwinPage() {
  return (
    <Suspense fallback={
      <div className="flex h-64 items-center justify-center font-mono text-cyan-400 text-xs">
        <div className="flex items-center gap-2">
          <ActivityIcon className="w-4 h-4 animate-spin" />
          <span>LOADING SUPPLY CHAIN DIGITAL TWIN...</span>
        </div>
      </div>
    }>
      <DigitalTwinWorkspace />
    </Suspense>
  );
}
