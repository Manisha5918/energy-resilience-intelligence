/**
 * EnergyShield Supply Chain Digital Twin Engine
 * 
 * Unifies Risk Intelligence (Phase 1), Disruption Scenarios (Phase 2),
 * Intelligence Signals (Phase 3), and Adaptive Procurement (Phase 4)
 * into a live, interactive topological graph simulation of India's crude supply network.
 */

import { DIGITAL_TWIN_NODES, DIGITAL_TWIN_EDGES } from "@/lib/digitalTwinData";
import { runScenario } from "@/lib/scenarioEngine";
import { getScenarioById, SIMULATED_SCENARIOS } from "@/lib/scenarioData";
import { calculateResilienceScore } from "@/lib/riskScoringEngine";
import { aggregateIntelligenceRisk } from "@/lib/intelligenceRiskAggregator";
import { generateProcurementPlan } from "@/lib/procurementEngine";

/**
 * Builds the complete digital twin network state for a given scenario & timeline
 */
export function buildNetworkState({
  scenarioId = "current-conditions",
  durationDays = 30,
  severity = "severe",
  timelineDay = 0
} = {}) {
  const isBaseline = scenarioId === "current-conditions";
  const scenarioResult = isBaseline 
    ? null 
    : runScenario({ scenarioId, durationDays, severity });
  
  const intelligenceRisk = aggregateIntelligenceRisk();
  const baselineResilience = calculateResilienceScore();

  // 1. Compute Dynamic Nodes State
  const nodes = DIGITAL_TWIN_NODES.map((node) => {
    let status = "NORMAL";
    let risk = node.baseRisk;
    let currentFlowMbd = node.baseVolumeMbd || node.currentIntakeMbd || node.throughputMbd || 0;
    let flowCapacityMbd = node.flowCapacityMbd || node.handlingCapacityMbd || node.capacityMbd || currentFlowMbd;
    let riskTier = "LOW";

    if (!isBaseline && scenarioResult) {
      // Check if Hormuz Disruption
      if (scenarioId === "hormuz-closure") {
        if (node.id === "node-corridor-hormuz") {
          status = "CRITICAL_BLOCKED";
          risk = 94;
          currentFlowMbd = Number((node.baseVolumeMbd * 0.10).toFixed(2)); // 90% blocked
        } else if (["node-iraq", "node-kuwait"].includes(node.id)) {
          status = "STRANDED";
          risk = 88;
          currentFlowMbd = Number((node.baseVolumeMbd * 0.15).toFixed(2));
        } else if (node.id === "node-saudi") {
          status = "DIVERTING";
          risk = 65;
          currentFlowMbd = Number((node.baseVolumeMbd * 0.60).toFixed(2));
        } else if (node.id === "node-uae") {
          status = "BYPASSING_FUJAIRAH";
          risk = 35;
          currentFlowMbd = Number((node.baseVolumeMbd * 1.30).toFixed(2)); // Surge through Fujairah
        } else if (["node-port-sikka", "node-refinery-jamnagar", "node-refinery-vadinar", "node-refinery-panipat"].includes(node.id)) {
          status = "FEEDSTOCK_DEFICIT";
          risk = Math.min(95, node.baseRisk + 35);
          currentFlowMbd = Number((currentFlowMbd * 0.58).toFixed(2));
        } else if (node.id.startsWith("node-spr-")) {
          status = "DISCHARGING";
          risk = 25;
        }
      }
      // Check if Red Sea Disruption
      else if (scenarioId === "redsea-escalation") {
        if (node.id === "node-corridor-redsea") {
          status = "CRITICAL_BLOCKED";
          risk = 92;
          currentFlowMbd = 0.05;
        } else if (node.id === "node-russia") {
          status = "DIVERTING_CAPE";
          risk = 78;
        } else if (node.id === "node-corridor-cape") {
          status = "HEAVY_CONGESTION";
          risk = 45;
          currentFlowMbd = 1.65; // Diverted volume surge
        }
      }
      // Check if Russian Supplier Loss
      else if (scenarioId === "supplier-loss-russia") {
        if (node.id === "node-russia") {
          status = "EMBARGO_SHUTDOWN";
          risk = 95;
          currentFlowMbd = 0.0;
        } else if (["node-refinery-vadinar", "node-refinery-jamnagar"].includes(node.id)) {
          status = "FEEDSTOCK_DEFICIT";
          risk = 82;
        }
      }
      // General multi-scenario elevation
      else {
        risk = Math.min(100, Math.round(node.baseRisk * (1 + ((scenarioResult.parameters?.supplyDisruptionPct || 0) / 100))));
        if (risk >= 75) status = "HIGH_STRESS";
      }
    }

    // Determine Risk Tier
    if (risk >= 80) riskTier = "CRITICAL";
    else if (risk >= 60) riskTier = "HIGH";
    else if (risk >= 40) riskTier = "MODERATE";
    else riskTier = "LOW";

    return {
      ...node,
      status,
      currentRisk: risk,
      riskTier,
      currentFlowMbd,
      flowCapacityMbd,
      utilizationPct: flowCapacityMbd > 0 ? Math.min(100, Math.round((currentFlowMbd / flowCapacityMbd) * 100)) : 0
    };
  });

  // 2. Compute Dynamic Edges State
  const edges = DIGITAL_TWIN_EDGES.map((edge) => {
    const fromNode = nodes.find((n) => n.id === edge.from);
    const toNode = nodes.find((n) => n.id === edge.to);
    
    let isDisrupted = false;
    let flowVolumeMbd = edge.volumeMbd;
    let edgeRisk = "LOW";

    if (fromNode?.riskTier === "CRITICAL" || toNode?.riskTier === "CRITICAL") {
      isDisrupted = true;
      edgeRisk = "CRITICAL";
      flowVolumeMbd = Number((edge.volumeMbd * 0.15).toFixed(2));
    } else if (fromNode?.riskTier === "HIGH" || toNode?.riskTier === "HIGH") {
      edgeRisk = "HIGH";
      flowVolumeMbd = Number((edge.volumeMbd * 0.65).toFixed(2));
    }

    return {
      ...edge,
      isDisrupted,
      edgeRisk,
      currentFlowMbd: flowVolumeMbd
    };
  });

  // 3. Compute Network-Level Aggregated Metrics
  const targetSupplyGapMbd = scenarioResult ? (scenarioResult.supplyImpact?.dailySupplyDeficitMbd || 0.0) : 0.0;
  const supplyAtRiskMbd = scenarioResult ? (scenarioResult.supplyImpact?.dailySupplyDeficitMbd || 0.42) : 0.42;
  const criticalNodesCount = nodes.filter((n) => n.riskTier === "CRITICAL").length;
  const criticalCorridorsCount = nodes.filter((n) => n.category === "MARITIME_CORRIDOR" && ["CRITICAL", "HIGH"].includes(n.riskTier)).length;
  const refineriesUnderPressureCount = nodes.filter((n) => n.type === "refinery" && ["CRITICAL", "HIGH"].includes(n.riskTier)).length;
  
  // Network Resilience Indicator
  let networkResilienceIndicator = baselineResilience.resilienceScore;
  if (!isBaseline && scenarioResult) {
    networkResilienceIndicator = scenarioResult.scenarioResilience?.resilienceScore ?? baselineResilience.resilienceScore;
  }

  // 4. Procurement Integration Recommendation (Phase 4)
  const procurementPlan = generateProcurementPlan({
    scenarioId,
    targetSupplyGapMbd: targetSupplyGapMbd > 0 ? targetSupplyGapMbd : 1.96,
    riskTolerance: "Medium",
    budgetPriority: "Balanced",
    planningHorizonDays: durationDays
  });

  // 5. Build Comprehensive Network Cascade Tree
  const cascadeSteps = [
    {
      step: 1,
      title: "Initiating Disruption Event",
      detail: isBaseline ? "Steady-State Operational Baseline" : (scenarioResult?.scenarioTemplate?.name || "Disruption Scenario"),
      status: isBaseline ? "NORMAL" : "DISRUPTED",
      severity: isBaseline ? "LOW" : (scenarioResult?.parameters?.severity || "Moderate")
    },
    {
      step: 2,
      title: "Corridor Chokepoint Impairment",
      detail: isBaseline 
        ? "All 4 shipping corridors operating with open navigation" 
        : `Primary chokepoints compromised. Throughput reduced by ${scenarioResult?.parameters?.supplyDisruptionPct || 0}%`,
      status: isBaseline ? "NORMAL" : "RESTRICTED",
      affectedCorridors: nodes.filter((n) => n.category === "MARITIME_CORRIDOR" && n.currentRisk >= 60).map((n) => n.shortName)
    },
    {
      step: 3,
      title: "Sovereign Supply Origin Contagion",
      detail: isBaseline
        ? "8 global suppliers delivering standard term contract quotas"
        : "Crude liftings stranded in Persian Gulf SPM anchorages",
      affectedSuppliers: nodes.filter((n) => n.type === "supplier" && n.currentRisk >= 60).map((n) => n.shortName)
    },
    {
      step: 4,
      title: "Indian Receiving Port Ingestion Deficit",
      detail: isBaseline 
        ? "West & East coast Single Point Moorings operating at 86% utilization"
        : "Sikka & Mumbai SPM discharge rates drop due to delayed VLCC tanker arrivals",
      affectedPorts: ["Sikka / Vadinar SPM", "Mumbai Port"]
    },
    {
      step: 5,
      title: "Domestic Refinery Throughput Exposure",
      detail: isBaseline
        ? "National refinery utilization at 104% design capacity"
        : `${refineriesUnderPressureCount} refineries drawing down onsite crude buffers to avoid secondary unit shutdown`,
      affectedRefineries: ["Jamnagar (RIL)", "Vadinar (Nayara)", "Panipat (IOCL)"]
    },
    {
      step: 6,
      title: "Strategic Petroleum Reserve (SPR) Cavern Injection",
      detail: isBaseline
        ? "8.1 days statutory nameplate cover standing in underground rock caverns"
        : `Coordinated emergency drawdown of ${procurementPlan.topRecommendation.sprDrawRecommendedMbd} MBD from Padur & Vizag`,
      sprCoverRemainingDays: isBaseline ? 8.1 : (scenarioResult?.reserveImpact?.scenarioSprDaysCover || 6.8)
    },
    {
      step: 7,
      title: "Adaptive Procurement & Route Dispatch",
      detail: `Orchestrating ${procurementPlan.topRecommendation.name} via Habshan-Fujairah pipeline & Cape route`,
      procurementScore: procurementPlan.topRecommendation.strategyScore
    }
  ];

  return {
    scenarioId,
    durationDays,
    severity,
    timelineDay,
    isBaseline,
    scenarioResult,
    intelligenceRisk,
    baselineResilience,
    networkResilienceIndicator,
    nodes,
    edges,
    metrics: {
      supplyAtRiskMbd,
      criticalNodesCount,
      criticalCorridorsCount,
      refineriesUnderPressureCount,
      sprPressureLevel: isBaseline ? "NOMINAL" : "ACTIVE DRAWDOWN",
      sprCoverDays: isBaseline ? 8.1 : (scenarioResult?.reserveImpact?.scenarioSprDaysCover || 6.8)
    },
    cascadeSteps,
    procurementPlan,
    topResponse: procurementPlan.topRecommendation
  };
}

/**
 * Calculates alternative route options when a node is disrupted
 */
export function calculateAlternativePaths(nodeId) {
  if (nodeId === "node-corridor-hormuz") {
    return [
      {
        name: "Habshan-Fujairah Pipeline Bypass (UAE)",
        corridor: "Arabian Sea Direct Deepwater",
        transitDeltaDays: -1.3,
        freightMultiplier: 0.95,
        risk: "LOW",
        capacityMbd: 1.80,
        costImpactPct: -2.5,
        resilienceImpact: "HIGH"
      },
      {
        name: "Petroline East-West Pipeline (Yanbu, Saudi Arabia)",
        corridor: "Red Sea Western Link",
        transitDeltaDays: +1.7,
        freightMultiplier: 1.25,
        risk: "MODERATE",
        capacityMbd: 1.50,
        costImpactPct: +4.0,
        resilienceImpact: "HIGH"
      },
      {
        name: "Cape of Good Hope Long-Haul Diversion",
        corridor: "Atlantic & South Indian Ocean",
        transitDeltaDays: +16.0,
        freightMultiplier: 1.85,
        risk: "LOW",
        capacityMbd: 3.00,
        costImpactPct: +12.5,
        resilienceImpact: "VERY HIGH"
      }
    ];
  }

  if (nodeId === "node-corridor-redsea") {
    return [
      {
        name: "Cape of Good Hope Open Ocean Rerouting",
        corridor: "South Africa / Cape Route",
        transitDeltaDays: +14.5,
        freightMultiplier: 1.80,
        risk: "LOW",
        capacityMbd: 3.50,
        costImpactPct: +14.0,
        resilienceImpact: "VERY HIGH"
      }
    ];
  }

  return [
    {
      name: "Strategic Reserve (SPR) Cavern Offtake",
      corridor: "Domestic Coastal Underground Caverns",
      transitDeltaDays: 0,
      freightMultiplier: 0.1,
      risk: "LOW",
      capacityMbd: 2.50,
      costImpactPct: 0,
      resilienceImpact: "IMMEDIATE"
    }
  ];
}
