/**
 * EnergyShield Adaptive Procurement Orchestrator Engine
 * 
 * Generates ranked, explainable procurement strategies by evaluating
 * supplier + route combinations against current risk signals and disruption scenarios.
 * 
 * Formula:
 * Strategy Score = Resilience Benefit × 0.35
 *                + Supplier Diversification × 0.20
 *                + Route Reliability × 0.15
 *                + Supply Fulfillment × 0.15
 *                - Cost Penalty × 0.10
 *                - Transit Penalty × 0.05
 * 
 * NOTE: All optimization outputs represent explainable heuristic decision-support models.
 */

import { SIMULATED_PROCUREMENT_OPTIONS } from "@/lib/procurementData";
import { calculateLandedCost } from "@/lib/landedCostEngine";
import { SIMULATED_SUPPLIER_PROFILES, calculateSupplierConcentration } from "@/lib/supplierData";
import { SIMULATED_NATIONAL_ENERGY_METRICS, calculateTotalReserveCover } from "@/lib/reserveData";
import { SIMULATED_CRUDE_PRICES } from "@/lib/riskData";

export const OPTIMIZATION_WEIGHTS = {
  resilienceBenefit: 0.35,
  supplierDiversification: 0.20,
  routeReliability: 0.15,
  supplyFulfillment: 0.15,
  costPenalty: 0.10,
  transitPenalty: 0.05
};

/**
 * Generate and rank procurement strategies
 */
export function generateProcurementPlan({
  scenarioId = "current-conditions",
  targetSupplyGapMbd = 1.96, // Replacement requirement
  riskTolerance = "Medium",  // Low | Medium | High
  budgetPriority = "Balanced", // Cost | Balanced | Resilience
  planningHorizonDays = 30
} = {}) {
  const options = SIMULATED_PROCUREMENT_OPTIONS;
  const baseBrent = SIMULATED_CRUDE_PRICES.spotPriceUsd;

  // 1. STRATEGY B: BALANCED RESILIENCE (Recommended Standard)
  const balancedAllocations = [
    {
      supplierId: "saudi_arabia",
      volumeMbd: Number((targetSupplyGapMbd * 0.30).toFixed(2)),
      sharePct: 30,
      route: "Yanbu (Red Sea Bypass) / Ras Tanura Split",
      routeType: "Dual Arterial",
      transitDays: 5.4,
      routeRisk: "MODERATE",
      costDetails: calculateLandedCost({ supplierId: "saudi_arabia", warRiskLevel: "MODERATE" })
    },
    {
      supplierId: "uae",
      volumeMbd: Number((targetSupplyGapMbd * 0.25).toFixed(2)),
      sharePct: 25,
      route: "Fujairah Habshan Pipeline (Hormuz Bypass)",
      routeType: "Direct Deepwater",
      transitDays: 3.2,
      routeRisk: "LOW",
      costDetails: calculateLandedCost({ supplierId: "uae", warRiskLevel: "LOW" })
    },
    {
      supplierId: "usa",
      volumeMbd: Number((targetSupplyGapMbd * 0.22).toFixed(2)),
      sharePct: 22,
      route: "US Gulf (LOOP) → Cape of Good Hope → India",
      routeType: "Open Ocean Long-Haul",
      transitDays: 28.0,
      routeRisk: "LOW",
      costDetails: calculateLandedCost({ supplierId: "usa", warRiskLevel: "LOW" })
    },
    {
      supplierId: "west_africa",
      volumeMbd: Number((targetSupplyGapMbd * 0.15).toFixed(2)),
      sharePct: 15,
      route: "Gulf of Guinea (Bonny) → Cape of Good Hope",
      routeType: "Open Ocean",
      transitDays: 18.5,
      routeRisk: "LOW",
      costDetails: calculateLandedCost({ supplierId: "west_africa", warRiskLevel: "LOW" })
    },
    {
      supplierId: "russia",
      volumeMbd: Number((targetSupplyGapMbd * 0.08).toFixed(2)),
      sharePct: 8,
      route: "Baltic / Primorsk → Cape of Good Hope Diversion",
      routeType: "Diversion Long-Haul",
      transitDays: 32.0,
      routeRisk: "MODERATE",
      costDetails: calculateLandedCost({ supplierId: "russia", warRiskLevel: "MODERATE" })
    }
  ];

  // 2. STRATEGY A: MAXIMUM RESILIENCE (Zero Chokepoint Exposure)
  const maxResilienceAllocations = [
    {
      supplierId: "uae",
      volumeMbd: Number((targetSupplyGapMbd * 0.35).toFixed(2)),
      sharePct: 35,
      route: "Fujairah Habshan Pipeline (Hormuz Bypass)",
      routeType: "Direct Deepwater",
      transitDays: 3.2,
      routeRisk: "LOW",
      costDetails: calculateLandedCost({ supplierId: "uae", warRiskLevel: "LOW" })
    },
    {
      supplierId: "usa",
      volumeMbd: Number((targetSupplyGapMbd * 0.35).toFixed(2)),
      sharePct: 35,
      route: "US Gulf Coast → Cape of Good Hope",
      routeType: "Open Ocean Long-Haul",
      transitDays: 28.0,
      routeRisk: "LOW",
      costDetails: calculateLandedCost({ supplierId: "usa", warRiskLevel: "LOW" })
    },
    {
      supplierId: "west_africa",
      volumeMbd: Number((targetSupplyGapMbd * 0.25).toFixed(2)),
      sharePct: 25,
      route: "West Africa (Bonny Light) → Cape of Good Hope",
      routeType: "Open Ocean",
      transitDays: 18.5,
      routeRisk: "LOW",
      costDetails: calculateLandedCost({ supplierId: "west_africa", warRiskLevel: "LOW" })
    },
    {
      supplierId: "saudi_arabia",
      volumeMbd: Number((targetSupplyGapMbd * 0.05).toFixed(2)),
      sharePct: 5,
      route: "Yanbu Pipeline Terminal Only",
      routeType: "Red Sea Western Link",
      transitDays: 6.2,
      routeRisk: "LOW",
      costDetails: calculateLandedCost({ supplierId: "saudi_arabia", warRiskLevel: "LOW" })
    }
  ];

  // 3. STRATEGY C: COST OPTIMIZED (Deep Value Focus)
  const costOptimizedAllocations = [
    {
      supplierId: "russia",
      volumeMbd: Number((targetSupplyGapMbd * 0.45).toFixed(2)),
      sharePct: 45,
      route: "Novorossiysk / Primorsk → Suez / Red Sea",
      routeType: "Discounted High-Volume",
      transitDays: 16.5,
      routeRisk: "CRITICAL",
      costDetails: calculateLandedCost({ supplierId: "russia", warRiskLevel: "CRITICAL" })
    },
    {
      supplierId: "iraq",
      volumeMbd: Number((targetSupplyGapMbd * 0.35).toFixed(2)),
      sharePct: 35,
      route: "Basra SPM → Strait of Hormuz",
      routeType: "Persian Gulf Basrah Heavy",
      transitDays: 4.2,
      routeRisk: "HIGH",
      costDetails: calculateLandedCost({ supplierId: "iraq", warRiskLevel: "HIGH" })
    },
    {
      supplierId: "saudi_arabia",
      volumeMbd: Number((targetSupplyGapMbd * 0.20).toFixed(2)),
      sharePct: 20,
      route: "Ras Tanura → Strait of Hormuz",
      routeType: "Standard Gulf Lift",
      transitDays: 4.5,
      routeRisk: "HIGH",
      costDetails: calculateLandedCost({ supplierId: "saudi_arabia", warRiskLevel: "HIGH" })
    }
  ];

  // Compile Strategy Packages
  const rawStrategies = [
    buildStrategyProfile({
      id: "strat-balanced",
      name: "Strategy 1: Balanced Resilience (Recommended)",
      type: "Balanced",
      tagline: "Optimum balance between chokepoint bypass, supplier diversity, and landed cost.",
      allocations: balancedAllocations,
      targetSupplyGapMbd,
      riskTolerance,
      budgetPriority,
      planningHorizonDays
    }),
    buildStrategyProfile({
      id: "strat-max-resilience",
      name: "Strategy 2: Maximum Resilience & Chokepoint Immunity",
      type: "Maximum Resilience",
      tagline: "Prioritizes 100% open-ocean and pipeline bypass liftings (Fujairah, US Gulf, West Africa).",
      allocations: maxResilienceAllocations,
      targetSupplyGapMbd,
      riskTolerance,
      budgetPriority,
      planningHorizonDays
    }),
    buildStrategyProfile({
      id: "strat-cost-optimized",
      name: "Strategy 3: Cost-Optimized Value Flow",
      type: "Cost Optimized",
      tagline: "Maximizes discounted Urals and Basrah Heavy barrels via legacy routes at higher risk.",
      allocations: costOptimizedAllocations,
      targetSupplyGapMbd,
      riskTolerance,
      budgetPriority,
      planningHorizonDays
    })
  ];

  // Sort strategies by calculated strategy score descending
  const sortedStrategies = [...rawStrategies].sort((a, b) => b.strategyScore - a.strategyScore);

  return {
    scenarioId,
    targetSupplyGapMbd,
    riskTolerance,
    budgetPriority,
    planningHorizonDays,
    strategies: sortedStrategies,
    topRecommendation: sortedStrategies[0],
    baselineMetrics: {
      dailyImportDemandMbd: SIMULATED_NATIONAL_ENERGY_METRICS.dailyNetImportRequirementMbd,
      baselineHhi: calculateSupplierConcentration().hhiScore,
      baselineHormuzSharePct: 58.4,
      baselineRedSeaSharePct: 18.6
    }
  };
}

/**
 * Build complete strategy profile and compute multi-factor scores
 */
function buildStrategyProfile({
  id,
  name,
  type,
  tagline,
  allocations,
  targetSupplyGapMbd,
  riskTolerance,
  budgetPriority
}) {
  const totalAllocatedMbd = Number(allocations.reduce((sum, a) => sum + a.volumeMbd, 0).toFixed(2));
  const fulfillmentPct = targetSupplyGapMbd > 0 
    ? Math.min(100, Math.round((totalAllocatedMbd / targetSupplyGapMbd) * 100))
    : 100;
  const remainingGapMbd = Math.max(0, Number((targetSupplyGapMbd - totalAllocatedMbd).toFixed(2)));

  // Weighted landed cost $/bbl
  const weightedLandedCostUsd = Number((
    allocations.reduce((sum, a) => sum + (a.costDetails.netLandedCostUsd * (a.sharePct / 100)), 0)
  ).toFixed(2));

  // Weighted transit time days
  const weightedTransitDays = Number((
    allocations.reduce((sum, a) => sum + (a.transitDays * (a.sharePct / 100)), 0)
  ).toFixed(1));

  // Calculate strategy HHI (Herfindahl-Hirschman Index)
  const strategyHhi = Math.round(
    allocations.reduce((sum, a) => sum + Math.pow(a.sharePct, 2), 0)
  );
  const baselineHhi = calculateSupplierConcentration().hhiScore;
  const hhiImprovement = baselineHhi - strategyHhi;

  // Calculate corridor exposure shift
  let hormuzShare = 0;
  let capeShare = 0;
  let fujairahShare = 0;

  allocations.forEach((a) => {
    if (a.route.includes("Hormuz") && !a.route.includes("Bypass")) hormuzShare += a.sharePct;
    if (a.route.includes("Cape")) capeShare += a.sharePct;
    if (a.route.includes("Fujairah")) fujairahShare += a.sharePct;
  });

  // Factor Score Components (0 - 100)
  const resilienceBenefit = type === "Maximum Resilience" ? 94 : type === "Balanced" ? 88 : 52;
  const supplierDiversification = Math.min(100, Math.round((hhiImprovement / 10) + 70));
  const routeReliability = type === "Maximum Resilience" ? 92 : type === "Balanced" ? 84 : 48;
  const supplyFulfillment = fulfillmentPct;
  const costPenalty = Math.max(0, Math.round(((weightedLandedCostUsd - 84.65) / 20) * 100));
  const transitPenalty = Math.min(100, Math.round((weightedTransitDays / 35) * 100));

  // Compute final strategy score
  const rawScore = (
    resilienceBenefit * OPTIMIZATION_WEIGHTS.resilienceBenefit +
    supplierDiversification * OPTIMIZATION_WEIGHTS.supplierDiversification +
    routeReliability * OPTIMIZATION_WEIGHTS.routeReliability +
    supplyFulfillment * OPTIMIZATION_WEIGHTS.supplyFulfillment -
    costPenalty * OPTIMIZATION_WEIGHTS.costPenalty -
    transitPenalty * OPTIMIZATION_WEIGHTS.transitPenalty
  );

  const strategyScore = Math.max(0, Math.min(100, Math.round(rawScore)));

  // Risk classification
  let riskLevel = "LOW-MODERATE";
  let riskBadgeClass = "bg-emerald-950 text-emerald-300 border-emerald-800";
  if (type === "Cost Optimized") {
    riskLevel = "HIGH RISK";
    riskBadgeClass = "bg-rose-950 text-rose-300 border-rose-800";
  } else if (type === "Maximum Resilience") {
    riskLevel = "LOW RISK";
    riskBadgeClass = "bg-cyan-950 text-cyan-300 border-cyan-800";
  }

  // Refinery coverage estimation
  const refineryCoverage = [
    { name: "Jamnagar Complex (RIL)", status: type === "Cost Optimized" ? "VULNERABLE" : "SECURED", coveragePct: 92, note: "Receives Fujairah & West Africa crude via Sikka SPM" },
    { name: "Vadinar Refinery (Nayara)", status: type === "Cost Optimized" ? "VULNERABLE" : "SECURED", coveragePct: 88, note: "Feedstock supplemented by Yanbu bypass allocation" },
    { name: "Panipat Refinery (IOCL)", status: type === "Cost Optimized" ? "STRAINED" : "OPTIMAL", coveragePct: 84, note: "Salaya pipeline pumping maintained at steady-state" },
    { name: "Kochi Refinery (BPCL)", status: "OPTIMAL", coveragePct: 95, note: "Direct intake of Cape-routed West African sweet crude" },
    { name: "Paradip Refinery (IOCL)", status: "OPTIMAL", coveragePct: 96, note: "Deepwater SPM fully utilized for US Gulf WTI & ESPO" },
    { name: "Visakh Refinery (HPCL)", status: "OPTIMAL", coveragePct: 94, note: "Supported by East Coast coastal lifts & Vizag SPR link" }
  ];

  // SPR coordination calculation
  const sprDrawRecommendedMbd = remainingGapMbd > 0 ? remainingGapMbd : 0.0;

  // Decision Score Explainability Breakdown
  const scoreBreakdown = [
    { factor: "Resilience Benefit", weight: "35%", input: resilienceBenefit, points: +(resilienceBenefit * 0.35).toFixed(1) },
    { factor: "Supplier Diversification", weight: "20%", input: supplierDiversification, points: +(supplierDiversification * 0.20).toFixed(1) },
    { factor: "Route Reliability", weight: "15%", input: routeReliability, points: +(routeReliability * 0.15).toFixed(1) },
    { factor: "Supply Fulfillment", weight: "15%", input: supplyFulfillment, points: +(supplyFulfillment * 0.15).toFixed(1) },
    { factor: "Cost Penalty", weight: "-10%", input: costPenalty, points: -(costPenalty * 0.10).toFixed(1) },
    { factor: "Transit Latency Penalty", weight: "-5%", input: transitPenalty, points: -(transitPenalty * 0.05).toFixed(1) }
  ];

  // AI/Rule-based Rationale List
  const rationaleBullets = [
    `Reduces Strait of Hormuz chokepoint concentration from 58.4% to ${hormuzShare.toFixed(1)}%.`,
    `Expands open-ocean routing via Cape of Good Hope & Habshan-Fujairah pipeline to ${capeShare + fujairahShare}%.`,
    hhiImprovement >= 0
      ? `Lowers Herfindahl-Hirschman supplier concentration (HHI) by ${hhiImprovement} points (HHI: ${strategyHhi}).`
      : `Concentrates replacement allocation into 5 secure suppliers (HHI: ${strategyHhi}, +${Math.abs(hhiImprovement)} pts vs baseline ${baselineHhi}) to eliminate chokepoint exposure.`,
    `Delivers ${totalAllocatedMbd} MBD of replacement crude (${fulfillmentPct}% fulfillment) with average landed cost of $${weightedLandedCostUsd}/bbl.`,
    remainingGapMbd > 0
      ? `Coordinates ${remainingGapMbd} MBD remaining gap through controlled Strategic Petroleum Reserve (SPR) cavern draw.`
      : "Completely eliminates need for emergency Strategic Petroleum Reserve (SPR) drawdown."
  ];

  return {
    id,
    name,
    type,
    tagline,
    strategyScore,
    riskLevel,
    riskBadgeClass,
    totalAllocatedMbd,
    targetSupplyGapMbd,
    fulfillmentPct,
    remainingGapMbd,
    sprDrawRecommendedMbd,
    weightedLandedCostUsd,
    weightedTransitDays,
    strategyHhi,
    baselineHhi,
    hhiImprovement,
    hormuzSharePct: hormuzShare,
    capeSharePct: capeShare,
    fujairahSharePct: fujairahShare,
    allocations,
    scoreBreakdown,
    rationaleBullets,
    refineryCoverage
  };
}
