/**
 * EnergyShield Executive Procurement Directive Engine
 * 
 * Generates an actionable, refiner-by-refiner crude allocation directive
 * based on selected strategic procurement plans, refinery crude slate compatibility,
 * and coastal/pipeline logistics constraints.
 * 
 * PROVENANCE & LEGAL DISCLAIMER:
 * MODEL-GENERATED DECISION SUPPORT — NOT AN EXECUTABLE PURCHASE ORDER.
 * All quotas and allocations are simulated decision-support recommendations.
 */

import { getRefinerProfiles, getAlternativeCrudeSources } from "./data/schemas/procurementSchema.js";
import { calculateLandedCost } from "./landedCostEngine.js";

/**
 * Generates a complete Executive Procurement Directive
 * 
 * @param {Object} params
 * @param {Object} params.selectedStrategy - Active strategy from procurement optimizer
 * @param {number} params.targetSupplyGapMbd - Deficit volume to cover (MBD)
 * @param {number} params.planningHorizonDays - Planning window (Days)
 * @param {number} [params.resilienceScore] - Platform resilience score
 */
export function generateExecutiveDirective({
  selectedStrategy = null,
  targetSupplyGapMbd = 1.96,
  planningHorizonDays = 30,
  resilienceScore = 64
} = {}) {
  const refiners = getRefinerProfiles();
  const alternativeSources = getAlternativeCrudeSources();
  const safeGap = Math.max(0.1, Number(targetSupplyGapMbd) || 1.96);

  // Strategy metadata
  const strategyName = selectedStrategy?.name || "Dynamic Multi-Basin Diversification Plan";
  const strategyId = selectedStrategy?.id || "strat-balanced";
  const weightedLandedCost = selectedStrategy?.weightedLandedCostUsd || 88.40;
  const hhiScore = selectedStrategy?.hhiScore || 1840;

  // Compute proportional refiner quotas based on nameplate capacities & slate matching
  // Total representative capacity of key refiners ≈ 2.90 MBD
  const totalRefinerCap = refiners.reduce((acc, r) => acc + r.capacityMBD, 0);

  // Source assignment matching
  const refinerAllocations = refiners.map((refiner) => {
    // Allocation proportion based on refinery capacity relative to group
    const capacityShare = refiner.capacityMBD / totalRefinerCap;
    const allocationMbd = Number((safeGap * capacityShare).toFixed(2));
    const allocationPct = Number(((allocationMbd / safeGap) * 100).toFixed(1));

    // Determine optimal alternative crude source based on refinery flexibility
    let assignedSource = alternativeSources[0]; // Default WTI
    let reason = "Standard light sweet alternative with zero Hormuz risk.";

    if (refiner.id === "ref-jamnagar") {
      // Jamnagar: Super-high complexity -> Brazil Lula or heavy sour discount
      assignedSource = alternativeSources.find(s => s.id === "src-brazil-lula") || alternativeSources[1];
      reason = "High Nelson Complexity Index (21.1) optimized for medium-heavy Atlantic basin discount.";
    } else if (refiner.id === "ref-vadinar") {
      // Vadinar: High sour appetite -> Saudi Yanbu via Red Sea or Murban Fujairah
      assignedSource = alternativeSources.find(s => s.id === "src-murban-fujairah") || alternativeSources[2];
      reason = "Utilizes Habshan-Fujairah 1.5 MBD bypass pipeline; rapid 4-day voyage to Vadinar SPM.";
    } else if (refiner.id === "ref-kochi") {
      // Kochi: Deepwater SPM -> West Africa / Angola Nemba
      assignedSource = alternativeSources.find(s => s.id === "src-angola-nemba") || alternativeSources[3];
      reason = "Direct coastal access via offshore SPM; high middle-distillate yield with open Atlantic voyage.";
    } else if (refiner.id === "ref-paradip") {
      // Paradip: High TAN capability -> Brazil Lula / Latin America
      assignedSource = alternativeSources.find(s => s.id === "src-brazil-lula") || alternativeSources[1];
      reason = "High acid crude processing unit; balances East Coast domestic demand.";
    } else if (refiner.id === "ref-panipat") {
      // Panipat: Landlocked, fed via SMPL pipeline -> US WTI Midland
      assignedSource = alternativeSources.find(s => s.id === "src-wti") || alternativeSources[0];
      reason = "Light sweet crude maximizes pipeline flow efficiency through Salaya-Mathura-Panipat line.";
    } else if (refiner.id === "ref-visakh") {
      // Visakh: Linked to SPR cavern -> UAE Murban Fujairah
      assignedSource = alternativeSources.find(s => s.id === "src-murban-fujairah") || alternativeSources[2];
      reason = "Fast delivery replenishes coastal refinery stock and buffers Vizag rock cavern pipeline link.";
    }

    const landedCost = Number((assignedSource.baseFOB + assignedSource.freightUSD + assignedSource.insuranceUSD + assignedSource.portDuesUSD).toFixed(2));

    return {
      refinerId: refiner.id,
      refinerName: refiner.name,
      operator: refiner.operator,
      location: refiner.location,
      nameplateCapacityMBD: refiner.capacityMBD,
      crudeCompatibility: refiner.crudeCompatibility.join(", "),
      primaryDischargePort: refiner.primaryDischargePort,
      recommendedSource: assignedSource.name,
      crudeGrade: assignedSource.grade,
      allocationMbd,
      allocationPct,
      estimatedLandedCostUsd: landedCost,
      transitDays: assignedSource.transitDays,
      riskLevel: assignedSource.riskLevel,
      routeDescription: assignedSource.route,
      reason,
      sourceStatus: assignedSource.sourceStatus
    };
  });

  // Routing and Logistics Summary
  const logisticsPlan = [
    {
      corridor: "Cape of Good Hope Atlantic Highway",
      assignedVolumeMbd: Number((safeGap * 0.52).toFixed(2)),
      transitRangeDays: "28 - 34 Days",
      riskLevel: "LOW",
      securityStatus: "SECURE_OPEN_OCEAN",
      chokepointAvoidance: "100% bypass of Strait of Hormuz and Bab-el-Mandeb.",
      bunkeringHubs: ["Durban / Port Elizabeth", "Port Louis (Mauritius)"]
    },
    {
      corridor: "Gulf of Oman Habshan-Fujairah Bypass",
      assignedVolumeMbd: Number((safeGap * 0.32).toFixed(2)),
      transitRangeDays: "3 - 5 Days",
      riskLevel: "MODERATE",
      securityStatus: "PIPELINE_TERMINAL_CLEAR",
      chokepointAvoidance: "Bypasses Strait of Hormuz via 1.5 MBD UAE onshore pipeline.",
      bunkeringHubs: ["Fujairah Marine Anchorage"]
    },
    {
      corridor: "Red Sea East-West Petroline (Yanbu)",
      assignedVolumeMbd: Number((safeGap * 0.16).toFixed(2)),
      transitRangeDays: "6 - 8 Days",
      riskLevel: "ELEVATED",
      securityStatus: "ACTIVE_CONVOY_ESCORT",
      chokepointAvoidance: "Bypasses Hormuz via 5.0 MBD Petroline; requires Bab-el-Mandeb surveillance.",
      bunkeringHubs: ["Jeddah / Yanbu Port"]
    }
  ];

  // Risk Controls & Sanctions Compliance
  const riskControls = [
    {
      category: "Sanctions Compliance & OFAC Screening",
      rule: "G7 / OFAC Price Cap ($60/bbl threshold) & Tier-1 Western Maritime Insurance Validation",
      protocol: "Mandatory AIS voyage continuous verification (no dark fleet ship-to-ship transfers within 100nm of Persian Gulf)."
    },
    {
      category: "War-Risk Insurance Mitigation",
      rule: "Pre-negotiated sovereign reinsurance pool for Indian-flagged VLCC tonnage via SCI",
      protocol: "Cap war-risk surcharges under 0.85% hull-and-machinery value through bilateral sovereign reinsurance backstop."
    },
    {
      category: "Currency & Payment Settlement Hedging",
      rule: "Multi-currency settlement protocol (INR / AED / USD)",
      protocol: "Utilize bilateral INR-Dirham Local Currency Settlement (LCS) mechanism for UAE Habshan deliveries to eliminate FX liquidity frictions."
    }
  ];

  const generatedTimestamp = new Date().toISOString();
  const directiveId = `DIR-ES-${Math.floor(100000 + Math.random() * 900000)}`;

  return {
    directiveId,
    generatedTimestamp,
    classification: "OFFICIAL DECISION-SUPPORT BRIEF — UNCLASSIFIED",
    legalNotice: "MODEL-GENERATED DECISION SUPPORT — NOT AN EXECUTABLE PURCHASE ORDER",
    operationalValidationNotice: "COMPATIBILITY NOT SUFFICIENTLY VALIDATED FOR OPERATIONAL PROCUREMENT DECISION (Requires unit-level refinery assay and metallurgy validation).",
    executiveSummary: {
      strategyId,
      strategyName,
      targetSupplyGapMbd: safeGap,
      planningHorizonDays,
      resilienceScore,
      weightedLandedCostUsd: weightedLandedCost,
      herfindahlIndexHHI: hhiScore,
      totalVolumeAllocatedMbd: Number(refinerAllocations.reduce((acc, r) => acc + r.allocationMbd, 0).toFixed(2)),
      coverageRatioPct: 100.0
    },
    refinerAllocations,
    logisticsPlan,
    riskControls,
    dataProvenance: {
      refineryCapacities: "PPAC Statutory Industry Disclosures (FY24-25)",
      spotFOBBenchmarks: "EIA / S&P Global Platts Official Index (Model Benchmark)",
      optimizationEngine: "EnergyShield Multi-Objective Landed Cost & Resilience Linear Sorter v2.4",
      status: "MODEL_ASSUMPTION"
    }
  };
}
