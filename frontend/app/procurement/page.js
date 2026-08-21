"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProcurementControlPanel from "@/components/procurement/ProcurementControlPanel";
import TopProcurementRecommendation from "@/components/procurement/TopProcurementRecommendation";
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
import { generateProcurementPlan } from "@/lib/procurementEngine";
import { SIMULATED_SCENARIOS } from "@/lib/scenarioData";
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
        return Number((4.67 * (matchedSc.supplyDisruptionPercent / 100)).toFixed(2));
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
        setTargetSupplyGapMbd(Number((4.67 * (matchedSc.supplyDisruptionPercent / 100)).toFixed(2)));
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Executive Procurement Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1c2e] via-[#09121f] to-[#070a0f] border border-cyan-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-700/60 text-cyan-400">
            <ShieldIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
                Adaptive Procurement Orchestrator
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                DECISION-SUPPORT MODULE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Converts supply disruption signals into resilience-optimized supplier allocations and alternative maritime routing.
            </p>
          </div>
        </div>

        {/* Safety & Honesty Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1 rounded-lg bg-amber-950/60 border border-amber-600/50 text-amber-300 font-mono text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-bold">DEMO MODE — ILLUSTRATIVE DECISION SUPPORT</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 font-mono text-[11px]">
            HEURISTIC OPTIMIZATION • ADVISORY ONLY
          </div>
        </div>
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

      {/* 10. MODEL ASSUMPTIONS & DISCLAIMERS */}
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
