"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ScenarioControlPanel from "@/components/scenarios/ScenarioControlPanel";
import ScenarioImpactDashboard from "@/components/scenarios/ScenarioImpactDashboard";
import BaselineComparison from "@/components/scenarios/BaselineComparison";
import MacroeconomicImpact from "@/components/scenarios/MacroeconomicImpact";
import ImpactCascade from "@/components/scenarios/ImpactCascade";
import ScenarioCorridorImpact from "@/components/scenarios/ScenarioCorridorImpact";
import ScenarioSupplierImpact from "@/components/scenarios/ScenarioSupplierImpact";
import ScenarioRefineryImpact from "@/components/scenarios/ScenarioRefineryImpact";
import ReserveImpact from "@/components/scenarios/ReserveImpact";
import RecoveryTrajectory from "@/components/scenarios/RecoveryTrajectory";
import MitigationRecommendations from "@/components/scenarios/MitigationRecommendations";
import ModelAssumptions from "@/components/scenarios/ModelAssumptions";
import VisualStorySection from "@/components/VisualStorySection";
import { runScenario } from "@/lib/scenarioEngine";
import { getScenarioById, SIMULATED_SCENARIOS } from "@/lib/scenarioData";
import { SlidersIcon, ShieldIcon, ActivityIcon } from "@/components/ui/Icons";

function ScenarioWorkspace() {
  const searchParams = useSearchParams();
  const scenarioFromQuery = searchParams.get("scenario");

  const initialScenario = (scenarioFromQuery && getScenarioById(scenarioFromQuery)) || SIMULATED_SCENARIOS[0];

  const [selectedScenarioId, setSelectedScenarioId] = useState(initialScenario.id);
  const [durationDays, setDurationDays] = useState(initialScenario.defaultDurationDays);
  const [severity, setSeverity] = useState(initialScenario.defaultSeverity);
  const [supplyDisruptionPercent, setSupplyDisruptionPercent] = useState(initialScenario.supplyDisruptionPercent);
  const [priceShockPercent, setPriceShockPercent] = useState(initialScenario.priceShockPercent);
  const [freightImpactPercent, setFreightImpactPercent] = useState(initialScenario.freightImpactPercent);

  // Compute live simulation results
  const simulationResult = runScenario({
    scenarioId: selectedScenarioId,
    durationDays,
    severity,
    supplyDisruptionPercent,
    priceShockPercent,
    freightImpactPercent
  });

  // Handler when selecting a preset scenario
  const handleSelectScenario = (scenarioId) => {
    const sc = getScenarioById(scenarioId);
    setSelectedScenarioId(sc.id);
    setDurationDays(sc.defaultDurationDays);
    setSeverity(sc.defaultSeverity);
    setSupplyDisruptionPercent(sc.supplyDisruptionPercent);
    setPriceShockPercent(sc.priceShockPercent);
    setFreightImpactPercent(sc.freightImpactPercent);
  };

  // Reset to default baseline
  const handleReset = () => {
    handleSelectScenario("hormuz-closure");
  };

  // Re-run simulation trigger
  const handleRunSimulation = () => {
    // State is already reactive, but button provides explicit user confirmation
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700">
            <SlidersIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
                Disruption Scenario Simulator
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
                DECISION-SUPPORT ENGINE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Simulate maritime chokepoint blockages, supplier embargos, price shocks, and evaluate strategic resilience response.
            </p>
          </div>
        </div>

        {/* Safety & Honesty Badges + Procurement Action */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="font-semibold">DEMO MODE — SIMULATED DATA</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[11px] font-medium">
            MODELLED SCENARIO • NOT A LIVE FORECAST
          </div>
          <Link
            href={`/procurement?scenario=${selectedScenarioId}`}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <ShieldIcon className="w-3.5 h-3.5" />
            <span>Optimize Procurement Plan →</span>
          </Link>
        </div>
      </div>

      {/* 1. SCENARIO CONTROL PANEL */}
      <section aria-label="Scenario Control Panel">
        <ScenarioControlPanel
          selectedScenarioId={selectedScenarioId}
          onSelectScenario={handleSelectScenario}
          durationDays={durationDays}
          onChangeDuration={setDurationDays}
          severity={severity}
          onChangeSeverity={setSeverity}
          supplyDisruptionPercent={supplyDisruptionPercent}
          onChangeSupplyDisruption={setSupplyDisruptionPercent}
          priceShockPercent={priceShockPercent}
          onChangePriceShock={setPriceShockPercent}
          freightImpactPercent={freightImpactPercent}
          onChangeFreightImpact={setFreightImpactPercent}
          onRunSimulation={handleRunSimulation}
          onReset={handleReset}
        />
      </section>

      {/* 2. SCENARIO IMPACT DASHBOARD (KPI Shock Cards) */}
      <section aria-label="Scenario Impact KPIs">
        <ScenarioImpactDashboard simulationResult={simulationResult} />
      </section>

      {/* 3. BASELINE VS SCENARIO COMPARISON */}
      <section aria-label="Baseline vs Scenario Resilience Matrix">
        <BaselineComparison simulationResult={simulationResult} />
      </section>

      {/* 3b. MACROECONOMIC & FISCAL IMPACT */}
      <section aria-label="Macroeconomic Impact & GDP Drag">
        <MacroeconomicImpact
          macroeconomicImpact={simulationResult.macroeconomicImpact}
          priceImpact={simulationResult.priceImpact}
          supplyImpact={simulationResult.supplyImpact}
          durationDays={durationDays}
        />
      </section>

      {/* CINEMATIC VISUAL STORY BREAK: SUPPLY DISRUPTION CASCADE */}
      <VisualStorySection
        eyebrow="SUPPLY DISRUPTION CASCADE"
        title="FROM CHOKEPOINT TO NATIONAL IMPACT"
        description="Model the propagation of a supply disruption across maritime logistics, reserves, refining and macroeconomic exposure."
        image="/images/coastal_crude_storage.jpg"
        imageAlt="Cinematic aerial photograph of crude storage tanks and coastal logistics terminal"
        caption="Illustrative scenario transmission flow — computed deterministically from verified elasticity models."
        theme="amber"
        position="left"
        flowSteps={["MARITIME DISRUPTION", "SUPPLY GAP", "RESERVE DRAW", "REFINERY IMPACT", "MACRO IMPACT"]}
      />

      {/* 4. IMPACT CASCADE TRANSMISSION */}
      <section aria-label="Impact Cascade Pipeline">
        <ImpactCascade simulationResult={simulationResult} />
      </section>

      {/* 5. CORRIDOR & SUPPLIER IMPACT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-6" aria-label="Maritime Corridor Impact">
          <ScenarioCorridorImpact corridorImpacts={simulationResult.corridorImpacts} />
        </section>

        <section className="lg:col-span-6" aria-label="Supplier Shift Dynamics">
          <ScenarioSupplierImpact supplierImpacts={simulationResult.supplierImpacts} />
        </section>
      </div>

      {/* 6. REFINERY EXPOSURE & SPR DRAWDOWN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-6" aria-label="Refinery Feedstock Exposure">
          <ScenarioRefineryImpact refineryExposures={simulationResult.refineryExposures} />
        </section>

        <section className="lg:col-span-6" aria-label="Strategic Reserve Drawdown">
          <ReserveImpact reserveImpact={simulationResult.reserveImpact} />
        </section>
      </div>

      {/* 7. RECOVERY TRAJECTORY TIME-SERIES */}
      <section aria-label="Recovery Trajectory Curve">
        <RecoveryTrajectory
          recoveryTrajectory={simulationResult.recoveryTrajectory}
          baselineScore={simulationResult.baselineResilience.resilienceScore}
        />
      </section>

      {/* 8. ADAPTIVE PROCUREMENT & MITIGATION RECOMMENDATIONS */}
      <section aria-label="Mitigation Recommendations">
        <MitigationRecommendations recommendations={simulationResult.recommendations} />
      </section>

      {/* 9. MODEL ASSUMPTIONS & EXPLAINABILITY */}
      <section aria-label="Mathematical Model Assumptions">
        <ModelAssumptions
          parameters={simulationResult.parameters}
          scenarioTemplate={simulationResult.scenarioTemplate}
        />
      </section>

    </div>
  );
}

export default function ScenariosPage() {
  return (
    <Suspense fallback={
      <div className="p-8 text-center text-xs font-mono text-slate-500">
        Loading scenario simulation workspace...
      </div>
    }>
      <ScenarioWorkspace />
    </Suspense>
  );
}

