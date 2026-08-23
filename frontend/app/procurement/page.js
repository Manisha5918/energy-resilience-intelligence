"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProcurementControlPanel from "@/components/procurement/ProcurementControlPanel";
import TopProcurementRecommendation from "@/components/procurement/TopProcurementRecommendation";
import ExecutiveProcurementDirective from "@/components/procurement/ExecutiveProcurementDirective";
import StrategyComparison from "@/components/procurement/StrategyComparison";
import SupplierAllocation from "@/components/procurement/SupplierAllocation";
import RouteRecommendation from "@/components/procurement/RouteRecommendation";
import LandedCostBreakdown from "@/components/procurement/LandedCostBreakdown";
import DiversificationAnalysis from "@/components/procurement/DiversificationAnalysis";
import RefineryCoveragePanel from "@/components/procurement/RefineryCoveragePanel";
import SprCoordinationPanel from "@/components/procurement/SprCoordinationPanel";
import TradeoffAnalysis from "@/components/procurement/TradeoffAnalysis";
import DecisionExplanation from "@/components/procurement/DecisionExplanation";
import ProcurementModelAssumptions from "@/components/procurement/ProcurementModelAssumptions";
import VisualStorySection from "@/components/VisualStorySection";
import { generateProcurementPlan } from "@/lib/procurementEngine";
import { SIMULATED_SCENARIOS } from "@/lib/scenarioData";
import { SIMULATED_NATIONAL_ENERGY_METRICS } from "@/lib/reserveData";
import { ShieldIcon, SlidersIcon, ActivityIcon } from "@/components/ui/Icons";

function ProcurementWorkspace() {
  const searchParams = useSearchParams();
  const scenarioFromQuery = searchParams.get("scenario");

  const [selectedScenarioId, setSelectedScenarioId] = useState(() => {
    return scenarioFromQuery || "current-conditions";
  });

  const [targetSupplyGapMbd, setTargetSupplyGapMbd] = useState(() => {
    if (scenarioFromQuery) {
      const matchedSc = SIMULATED_SCENARIOS.find((s) => s.id === scenarioFromQuery);
      if (matchedSc) {
        return Number((SIMULATED_NATIONAL_ENERGY_METRICS.dailyNetImportRequirementMbd * (matchedSc.supplyDisruptionPercent / 100)).toFixed(2));
      }
    }
    return 1.96;
  });

  const [riskTolerance, setRiskTolerance] = useState("Medium");
  const [budgetPriority, setBudgetPriority] = useState("Balanced");
  const [planningHorizonDays, setPlanningHorizonDays] = useState(30);

  // Compute live procurement optimization results
  const plan = generateProcurementPlan({
    scenarioId: selectedScenarioId,
    targetSupplyGapMbd,
    riskTolerance,
    budgetPriority,
    planningHorizonDays
  });

  const [selectedStrategyId, setSelectedStrategyId] = useState("strat-balanced");
  const activeStrategy = plan.strategies.find((s) => s.id === selectedStrategyId) || plan.topRecommendation;

  const handleReset = () => {
    setSelectedScenarioId("current-conditions");
    setTargetSupplyGapMbd(1.96);
    setRiskTolerance("Medium");
    setBudgetPriority("Balanced");
    setPlanningHorizonDays(30);
    setSelectedStrategyId("strat-balanced");
  };

  const handleSelectScenario = (scId) => {
    setSelectedScenarioId(scId);
    if (scId === "current-conditions") {
      setTargetSupplyGapMbd(1.96);
    } else {
      const matchedSc = SIMULATED_SCENARIOS.find((s) => s.id === scId);
      if (matchedSc) {
        setTargetSupplyGapMbd(Number((SIMULATED_NATIONAL_ENERGY_METRICS.dailyNetImportRequirementMbd * (matchedSc.supplyDisruptionPercent / 100)).toFixed(2)));
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Executive Procurement Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700">
            <ShieldIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
                Adaptive Procurement Orchestrator
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
                DECISION-SUPPORT MODULE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Converts supply disruption signals into resilience-optimized supplier allocations and alternative maritime routing.
            </p>
          </div>
        </div>

        {/* Safety & Honesty Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 font-mono text-xs flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
            <span className="font-bold">🔴 NON-EXECUTABLE DECISION SUPPORT</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[11px] font-medium">
            ANALYTICAL MODEL • ADVISORY ONLY
          </div>
        </div>
      </div>

      {/* Mandatory Non-Executable Decision Support Banner */}
      <div className="rounded-xl p-4 bg-rose-50/90 border border-rose-200 text-rose-950 font-mono space-y-1.5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xs uppercase tracking-wide text-rose-900">
            🔴 OPERATIONAL REFINERY & LEGAL SAFEGUARD
          </span>
        </div>
        <p className="text-xs leading-relaxed text-rose-900 font-sans">
          Recommendations are analytical only. No purchase order, contract, trading instruction, or procurement transaction can be executed from EnergyShield. Operational use requires human institutional approval, crude assay validation, refinery-unit metallurgical compatibility validation, legal/commercial checks, and authorized government procurement systems.
        </p>
      </div>

      {/* 1. PROCUREMENT CONTROL PANEL */}
      <section aria-label="Procurement Control Panel">
        <ProcurementControlPanel
          selectedScenarioId={selectedScenarioId}
          onSelectScenario={handleSelectScenario}
          targetSupplyGapMbd={targetSupplyGapMbd}
          onChangeSupplyGap={setTargetSupplyGapMbd}
          riskTolerance={riskTolerance}
          onChangeRiskTolerance={setRiskTolerance}
          budgetPriority={budgetPriority}
          onChangeBudgetPriority={setBudgetPriority}
          planningHorizonDays={planningHorizonDays}
          onChangePlanningHorizon={setPlanningHorizonDays}
          onRunAnalysis={() => {}}
          onReset={handleReset}
        />
      </section>

      {/* 2. TOP RECOMMENDATION (Strategy #1 Highlights & Explainability) */}
      <section aria-label="Top Procurement Recommendation">
        <TopProcurementRecommendation strategy={plan.topRecommendation} />
      </section>

      {/* 2b. EXECUTIVE PROCUREMENT DIRECTIVE DOCKET */}
      <section aria-label="Executive Procurement Directive Docket">
        <ExecutiveProcurementDirective
          selectedStrategy={activeStrategy}
          targetSupplyGapMbd={targetSupplyGapMbd}
          planningHorizonDays={planningHorizonDays}
          resilienceScore={plan.topRecommendation?.resilienceScore}
        />
      </section>

      {/* CINEMATIC VISUAL STORY BREAK: REFINERY & CRUDE COMPATIBILITY */}
      <VisualStorySection
        eyebrow="CRUDE → REFINERY COMPATIBILITY"
        title="Analytical matching requires assay-level and unit-level validation."
        description="Every alternate crude parcel allocated across Indian refiners must undergo strict assay distillation matching, sulfur tolerance verification, and port SPM draft compatibility."
        image="/images/vlcc_berth_terminal.jpg"
        imageAlt="Illustrative high-quality petroleum infrastructure and VLCC tanker berthed at marine crude offloading terminal"
        caption="Illustrative marine terminal offloading visualization. Procurement strategies are decision-support recommendations only."
        theme="cyan"
        position="left"
        safetyBadge={{ text: "NON-EXECUTABLE DECISION SUPPORT", variant: "danger" }}
        overlayStats={[
          { label: "Assay Categories", value: "Light / Sour / Heavy", subtext: "Strict Metallurgy" },
          { label: "West Coast SPMs", value: "Vadinar / Sikka / Mundra", subtext: "VLCC Draft Depth" },
          { label: "East Coast Hubs", value: "Paradip / Vizag", subtext: "Pipeline Feeder" }
        ]}
      />

      {/* 3. STRATEGY COMPARISON MATRIX */}
      <section aria-label="Strategy Comparison Matrix">
        <StrategyComparison
          strategies={plan.strategies}
          selectedStrategyId={selectedStrategyId}
          onSelectStrategy={setSelectedStrategyId}
        />
      </section>

      {/* 4. SUPPLIER ALLOCATION & ROUTE PLAN FOR ACTIVE STRATEGY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-6" aria-label="Supplier Allocation">
          <SupplierAllocation strategy={activeStrategy} />
        </section>

        <section className="lg:col-span-6" aria-label="Route Recommendation">
          <RouteRecommendation strategy={activeStrategy} />
        </section>
      </div>

      {/* 5. ITEMIZED LANDED COST MODEL */}
      <section aria-label="Landed Cost Breakdown">
        <LandedCostBreakdown strategy={activeStrategy} />
      </section>

      {/* 6. DIVERSIFICATION & REFINERY COVERAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-6" aria-label="Diversification Analysis">
          <DiversificationAnalysis
            strategy={activeStrategy}
            baselineMetrics={plan.baselineMetrics}
          />
        </section>

        <section className="lg:col-span-6" aria-label="Refinery Coverage">
          <RefineryCoveragePanel refineryCoverage={activeStrategy.refineryCoverage} />
        </section>
      </div>

      {/* 7. SPR RESERVE COORDINATION */}
      <section aria-label="Strategic Reserve Coordination">
        <SprCoordinationPanel strategy={activeStrategy} />
      </section>

      {/* 8. TRADEOFF ANALYSIS (Cheapest vs Resilient vs Balanced) */}
      <section aria-label="Strategic Tradeoff Analysis">
        <TradeoffAnalysis strategies={plan.strategies} />
      </section>

      {/* 9. TRANSPARENT DECISION EXPLANATION */}
      <section aria-label="Decision Explanation Math">
        <DecisionExplanation strategy={activeStrategy} />
      </section>

      {/* 10. DECISION EXECUTION PIPELINE ACTIONS */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0d1e34] via-[#09121f] to-[#070a0f] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
            <ShieldIcon className="w-4 h-4" />
            <span>Next Steps in Operational Response Pipeline</span>
          </div>
          <p className="text-xs text-slate-300 font-sans mt-1">
            Propagate re-routing through physical topology or activate emergency reserve drawdown bridge.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href={`/digital-twin?scenario=${selectedScenarioId}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 font-mono text-xs font-bold transition-all cursor-pointer"
          >
            <ActivityIcon className="w-4 h-4" />
            <span>View Digital Twin Topology →</span>
          </Link>
          <Link
            href="/reserves"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <ShieldIcon className="w-4 h-4" />
            <span>Inspect Reserve Drawdown Bridge →</span>
          </Link>
        </div>
      </div>

      {/* 11. MODEL ASSUMPTIONS & DISCLAIMERS */}
      <section aria-label="Procurement Model Assumptions">
        <ProcurementModelAssumptions />
      </section>

    </div>
  );
}

export default function ProcurementPage() {
  return (
    <Suspense fallback={
      <div className="flex h-64 items-center justify-center font-mono text-cyan-400 text-xs">
        <div className="flex items-center gap-2">
          <ActivityIcon className="w-4 h-4 animate-spin" />
          <span>LOADING PROCUREMENT ORCHESTRATOR...</span>
        </div>
      </div>
    }>
      <ProcurementWorkspace />
    </Suspense>
  );
}
