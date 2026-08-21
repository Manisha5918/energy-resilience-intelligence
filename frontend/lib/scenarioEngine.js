/**
 * EnergyShield Scenario Simulation Engine
 * 
 * Computes deterministic, explainable impact projections across India's energy supply chain
 * for user-configured disruption parameters.
 * 
 * NOTE: All outputs are SIMULATED / ILLUSTRATIVE decision-support calculations.
 */

import { calculateResilienceScore } from "@/lib/riskScoringEngine";
import { SIMULATED_NATIONAL_ENERGY_METRICS, calculateTotalReserveCover } from "@/lib/reserveData";
import { SIMULATED_CORRIDOR_METRICS, SIMULATED_CRUDE_PRICES } from "@/lib/riskData";
import { SIMULATED_SUPPLIER_PROFILES } from "@/lib/supplierData";
import { getScenarioById } from "@/lib/scenarioData";

/**
 * Main simulation runner
 * @param {Object} params - User scenario parameters
 */
export function runScenario(params = {}) {
  const scenarioTemplate = getScenarioById(params.scenarioId || "hormuz-closure");

  const durationDays = Number(params.durationDays ?? scenarioTemplate.defaultDurationDays);
  const severity = params.severity || scenarioTemplate.defaultSeverity; // Low | Moderate | Severe
  const supplyDisruptionPct = Number(params.supplyDisruptionPercent ?? scenarioTemplate.supplyDisruptionPercent);
  const priceShockPct = Number(params.priceShockPercent ?? scenarioTemplate.priceShockPercent);
  const freightImpactPct = Number(params.freightImpactPercent ?? scenarioTemplate.freightImpactPercent);

  // Severity scaling factor (Low = 0.7x, Moderate = 1.0x, Severe = 1.35x)
  const severityMultiplier = severity === "Severe" ? 1.35 : severity === "Low" ? 0.7 : 1.0;

  // 1. Calculate Baseline vs Scenario Resilience Score
  const baselineResilience = calculateResilienceScore();

  // Compute modified factor inputs for the scenario
  const scenarioFactors = {
    geopolitical: Math.min(100, Math.round(baselineResilience.factors.geopolitical + (scenarioTemplate.geopoliticalFactorOffset * severityMultiplier))),
    logistics: Math.min(100, Math.round(baselineResilience.factors.logistics + (scenarioTemplate.logisticsFactorOffset * severityMultiplier * (freightImpactPct / 30)))),
    concentration: Math.min(100, Math.round(baselineResilience.factors.concentration + (scenarioTemplate.concentrationFactorOffset * severityMultiplier))),
    volatility: Math.min(100, Math.round(baselineResilience.factors.volatility + (scenarioTemplate.volatilityFactorOffset * (priceShockPct / 20)))),
    supplyGap: Math.min(100, Math.round(baselineResilience.factors.supplyGap + (scenarioTemplate.supplyGapFactorOffset * severityMultiplier * (supplyDisruptionPct / 35))))
  };

  const scenarioResilience = calculateResilienceScore(scenarioFactors);
  const scoreDelta = scenarioResilience.resilienceScore - baselineResilience.resilienceScore;
  const supplyRiskDelta = scenarioResilience.supplyRiskIndex - baselineResilience.supplyRiskIndex;

  // 2. Calculate Physical Supply Gap
  const dailyImportDemandMbd = SIMULATED_NATIONAL_ENERGY_METRICS.dailyNetImportRequirementMbd; // 4.67 MBD
  const dailySupplyDeficitMbd = Number((dailyImportDemandMbd * (supplyDisruptionPct / 100)).toFixed(2));
  const cumulativeSupplyDeficitMbbl = Number((dailySupplyDeficitMbd * durationDays).toFixed(2));

  // 3. Calculate Crude Price & Financial Exposure
  const baselineBrent = SIMULATED_CRUDE_PRICES.spotPriceUsd; // $84.65
  const scenarioBrent = Number((baselineBrent * (1 + priceShockPct / 100)).toFixed(2));
  const priceDeltaUsd = Number((scenarioBrent - baselineBrent).toFixed(2));
  const dailyImportCostBaselineUsdM = Number(((dailyImportDemandMbd * 1_000_000 * baselineBrent) / 1_000_000).toFixed(1));
  const dailyImportCostScenarioUsdM = Number((((dailyImportDemandMbd - dailySupplyDeficitMbd) * 1_000_000 * scenarioBrent) / 1_000_000).toFixed(1));
  const cumulativeExtraImportExposureUsdM = Number((Math.max(0, dailySupplyDeficitMbd * scenarioBrent * durationDays) + (dailyImportDemandMbd * priceDeltaUsd * durationDays * 0.4)).toFixed(0));

  // 4. Calculate Freight & Logistics Surcharge
  const freightMultiplier = Number((1 + freightImpactPct / 100).toFixed(2));

  // 5. Calculate Strategic Reserve (SPR) Pressure
  const baselineReserves = calculateTotalReserveCover();
  const sprTotalInventoryMbbl = baselineReserves.sprTotalBarrels; // ~33.4 MBBL
  const sprDrawdownRateMbd = Math.min(2.5, dailySupplyDeficitMbd * 0.75); // SPR discharge capacity limit ~2.5 MBD
  const sprDepletionMbbl = Number((sprDrawdownRateMbd * durationDays).toFixed(2));
  const remainingSprInventoryMbbl = Math.max(0, Number((sprTotalInventoryMbbl - sprDepletionMbbl).toFixed(2)));
  const scenarioSprDaysCover = Number((remainingSprInventoryMbbl / dailyImportDemandMbd).toFixed(1));

  let sprPressureLevel = "LOW";
  if (scenarioSprDaysCover < 3.0 || supplyDisruptionPct > 45) {
    sprPressureLevel = "CRITICAL";
  } else if (scenarioSprDaysCover < 6.0 || supplyDisruptionPct > 25) {
    sprPressureLevel = "HIGH";
  } else if (scenarioSprDaysCover < 8.5) {
    sprPressureLevel = "MODERATE";
  }

  // 6. Calculate Corridor Impacts
  const corridorImpacts = SIMULATED_CORRIDOR_METRICS.map((corridor) => {
    const isAffected = scenarioTemplate.affectedCorridors.includes(corridor.id);
    let scenarioRisk = corridor.riskScore;
    let extraTransitDays = 0;
    let throughputImpactMbd = 0;
    let availabilityStatus = "Normal Flow";

    if (isAffected) {
      scenarioRisk = Math.min(100, Math.round(corridor.riskScore + (25 * severityMultiplier)));
      throughputImpactMbd = Number((corridor.volumeMbd * (supplyDisruptionPct / 100)).toFixed(2));
      extraTransitDays = corridor.id === "hormuz" ? 4 : corridor.id === "redsea" ? 16 : 2;
      availabilityStatus = severity === "Severe" ? "Severely Restricted" : "Congested / Delayed";
    } else if (corridor.id === "cape_route" && scenarioTemplate.affectedCorridors.includes("redsea")) {
      // Cape becomes heavily utilized
      scenarioRisk = Math.min(100, corridor.riskScore + 15);
      extraTransitDays = 14;
      availabilityStatus = "Heavily Utilized Bypass";
    }

    return {
      ...corridor,
      scenarioRisk,
      scenarioRiskLevel: scenarioRisk >= 80 ? "CRITICAL" : scenarioRisk >= 60 ? "HIGH" : "MODERATE",
      throughputImpactMbd,
      extraTransitDays,
      availabilityStatus,
      scenarioFreightMultiplier: isAffected ? Number((corridor.freightIndex.split("x")[0] * freightMultiplier).toFixed(2)) : 1.0
    };
  });

  // 7. Calculate Supplier Shifts
  const supplierImpacts = SIMULATED_SUPPLIER_PROFILES.map((supplier) => {
    const isDisrupted = scenarioTemplate.affectedSuppliers.includes(supplier.id);
    const isBeneficiary = scenarioTemplate.affectedBeneficiaries?.includes(supplier.id) || (scenarioTemplate.id === "hormuz-closure" && ["russia", "usa", "west_africa"].includes(supplier.id));

    let scenarioSharePct = supplier.importSharePct;
    let scenarioVolumeMbd = supplier.volumeMbd;
    let shiftStatus = "Stable";

    if (isDisrupted) {
      const reductionFactor = severity === "Severe" ? 0.45 : severity === "Moderate" ? 0.70 : 0.85;
      scenarioSharePct = Number((supplier.importSharePct * reductionFactor).toFixed(1));
      scenarioVolumeMbd = Number((supplier.volumeMbd * reductionFactor).toFixed(2));
      shiftStatus = "Disrupted (-" + (supplier.importSharePct - scenarioSharePct).toFixed(1) + "%)";
    } else if (isBeneficiary) {
      const expansionFactor = severity === "Severe" ? 1.35 : 1.15;
      scenarioSharePct = Number((supplier.importSharePct * expansionFactor).toFixed(1));
      scenarioVolumeMbd = Number((supplier.volumeMbd * expansionFactor).toFixed(2));
      shiftStatus = "Expanded (+" + (scenarioSharePct - supplier.importSharePct).toFixed(1) + "%)";
    }

    return {
      id: supplier.id,
      supplier: supplier.supplier,
      color: supplier.color,
      baselineSharePct: supplier.importSharePct,
      scenarioSharePct,
      baselineVolumeMbd: supplier.volumeMbd,
      scenarioVolumeMbd,
      volumeDeltaMbd: Number((scenarioVolumeMbd - supplier.volumeMbd).toFixed(2)),
      shiftStatus,
      isDisrupted
    };
  });

  // 8. Calculate Refinery Exposures
  const refineryExposures = [
    {
      name: "Jamnagar Complex (RIL)",
      location: "Gujarat (West Coast)",
      baselineRisk: "HIGH",
      scenarioRisk: scenarioTemplate.affectedCorridors.includes("hormuz") ? "CRITICAL" : "HIGH",
      bufferDaysRemaining: Math.max(2, Number((14.5 - (durationDays * 0.45 * severityMultiplier)).toFixed(1))),
      vulnerabilityNote: "Vulnerable to western SPM discharge halts; pipeline feeds to domestic units throttled.",
      mitigationAction: "Reroute non-Hormuz cargoes from West Africa & Latin America to Sikka SPM."
    },
    {
      name: "Vadinar Refinery (Nayara)",
      location: "Gujarat (West Coast)",
      baselineRisk: "HIGH",
      scenarioRisk: scenarioTemplate.affectedCorridors.includes("hormuz") ? "CRITICAL" : "HIGH",
      bufferDaysRemaining: Math.max(1.5, Number((12.0 - (durationDays * 0.45 * severityMultiplier)).toFixed(1))),
      vulnerabilityNote: "Heavy reliance on Arabian Light/Heavy grades via Hormuz.",
      mitigationAction: "Prioritize coastal draw from Mangalore SPR caverns via intercoastal coastal barges."
    },
    {
      name: "Panipat Refinery (IOCL)",
      location: "Haryana (Northern Inland Grid)",
      baselineRisk: "HIGH",
      scenarioRisk: scenarioTemplate.affectedCorridors.includes("hormuz") ? "CRITICAL" : "HIGH",
      bufferDaysRemaining: Math.max(1.0, Number((9.2 - (durationDays * 0.55 * severityMultiplier)).toFixed(1))),
      vulnerabilityNote: "Inland pipeline buffer depletes rapidly without continuous coastal crude pumping.",
      mitigationAction: "Inject crude from Salaya buffer tank farm; prioritize high-octane domestic supplies."
    },
    {
      name: "Kochi Refinery (BPCL)",
      location: "Kerala (South-West Coast)",
      baselineRisk: "CRITICAL",
      scenarioRisk: scenarioTemplate.affectedCorridors.includes("redsea") ? "CRITICAL" : "HIGH",
      bufferDaysRemaining: Math.max(3, Number((11.4 - (durationDays * 0.35 * severityMultiplier)).toFixed(1))),
      vulnerabilityNote: "Exposed to delayed Red Sea / Suez tanker arrivals (+16 days voyage).",
      mitigationAction: "Draw direct pipeline feedstock from nearby Padur SPR cavern compartments."
    },
    {
      name: "Paradip Refinery (IOCL)",
      location: "Odisha (East Coast)",
      baselineRisk: "MODERATE",
      scenarioRisk: supplyDisruptionPct > 35 ? "HIGH" : "MODERATE",
      bufferDaysRemaining: Math.max(5, Number((16.8 - (durationDays * 0.30)).toFixed(1))),
      vulnerabilityNote: "Deepwater SPM capable of receiving Cape-rerouted VLCCs.",
      mitigationAction: "Maximize crude throughput to supply Eastern and Central domestic demand centres."
    },
    {
      name: "Visakh Refinery (HPCL)",
      location: "Andhra Pradesh (East Coast)",
      baselineRisk: "MODERATE",
      scenarioRisk: "MODERATE",
      bufferDaysRemaining: Math.max(8, Number((18.0 - (durationDays * 0.25)).toFixed(1))),
      vulnerabilityNote: "Directly linked to Visakhapatnam Underground Rock Cavern SPR.",
      mitigationAction: "Operate at 100% capacity with local cavern supply link."
    }
  ];

  // 9. Calculate Recovery Trajectory Curve (5 time steps)
  const recoveryDays = scenarioTemplate.recoveryDays || 30;
  const troughDay = durationDays;
  const fullRecoveryDay = durationDays + recoveryDays;

  const recoveryTrajectory = [
    {
      day: "Day 0 (Baseline)",
      dayNum: 0,
      resilienceScore: baselineResilience.resilienceScore,
      supplyGapMbd: 0,
      label: "Normal Operations"
    },
    {
      day: `Day ${Math.round(durationDays * 0.5)}`,
      dayNum: Math.round(durationDays * 0.5),
      resilienceScore: Math.round(baselineResilience.resilienceScore - (Math.abs(scoreDelta) * 0.7)),
      supplyGapMbd: Number((dailySupplyDeficitMbd * 0.75).toFixed(2)),
      label: "Disruption Escalation"
    },
    {
      day: `Day ${troughDay} (Peak Shock)`,
      dayNum: troughDay,
      resilienceScore: scenarioResilience.resilienceScore,
      supplyGapMbd: dailySupplyDeficitMbd,
      label: "Peak Deficit & SPR Draw"
    },
    {
      day: `Day ${Math.round(troughDay + (recoveryDays * 0.5))}`,
      dayNum: Math.round(troughDay + (recoveryDays * 0.5)),
      resilienceScore: Math.round(scenarioResilience.resilienceScore + (Math.abs(scoreDelta) * 0.55)),
      supplyGapMbd: Number((dailySupplyDeficitMbd * 0.35).toFixed(2)),
      label: "Alternative Procurement Active"
    },
    {
      day: `Day ${fullRecoveryDay} (Restored)`,
      dayNum: fullRecoveryDay,
      resilienceScore: Math.min(100, Math.round(baselineResilience.resilienceScore - 3)), // Slight lingering friction
      supplyGapMbd: 0,
      label: "Supply Grid Stabilized"
    }
  ];

  // 10. Generate Rule-Based Mitigation Recommendations
  const recommendations = generateMitigationRecommendations({
    scenarioTemplate,
    durationDays,
    severity,
    supplyDisruptionPct,
    priceShockPct,
    freightImpactPct,
    scenarioResilience,
    sprPressureLevel,
    dailySupplyDeficitMbd
  });

  return {
    scenarioTemplate,
    parameters: {
      durationDays,
      severity,
      supplyDisruptionPct,
      priceShockPct,
      freightImpactPct
    },
    baselineResilience,
    scenarioResilience,
    scoreDelta,
    supplyRiskDelta,
    supplyImpact: {
      dailyImportDemandMbd,
      dailySupplyDeficitMbd,
      cumulativeSupplyDeficitMbbl,
      disruptionPct: supplyDisruptionPct
    },
    priceImpact: {
      baselineBrentUsd: baselineBrent,
      scenarioBrentUsd: scenarioBrent,
      priceDeltaUsd,
      priceShockPct,
      dailyImportCostBaselineUsdM,
      dailyImportCostScenarioUsdM,
      cumulativeExtraImportExposureUsdM
    },
    freightImpact: {
      freightImpactPct,
      freightMultiplier
    },
    reserveImpact: {
      baselineSprDaysCover: baselineReserves.sprDaysCover,
      scenarioSprDaysCover,
      sprTotalInventoryMbbl,
      sprDrawdownRateMbd: Number(sprDrawdownRateMbd.toFixed(2)),
      sprDepletionMbbl,
      remainingSprInventoryMbbl,
      sprPressureLevel,
      totalCombinedCoverDays: baselineReserves.totalCombinedCoverDays
    },
    corridorImpacts,
    supplierImpacts,
    refineryExposures,
    recoveryTrajectory,
    recommendations
  };
}

/**
 * Deterministic rule-based mitigation engine
 */
export function generateMitigationRecommendations({
  scenarioTemplate,
  durationDays,
  supplyDisruptionPct,
  priceShockPct,
  freightImpactPct,
  scenarioResilience,
  sprPressureLevel,
  dailySupplyDeficitMbd
}) {
  const list = [];

  // RULE 1: Strategic Petroleum Reserve Drawdown
  if (sprPressureLevel === "CRITICAL" || supplyDisruptionPct > 35) {
    list.push({
      id: "rec-spr-emergency",
      priority: "CRITICAL",
      action: "Execute Emergency SPR Cavern Drawdown Protocol",
      reason: `Simulated daily crude deficit of ${dailySupplyDeficitMbd} MBD exceeds commercial refinery buffer capacity over a ${durationDays}-day disruption horizon.`,
      expectedEffect: "Injects up to 2.5 MBD of unrefined crude into domestic coastal pipelines, preserving critical refinery runs at Jamnagar, Vadinar, and Kochi.",
      targetEntity: "ISPRL / Ministry of Petroleum & Natural Gas (MoPNG)"
    });
  } else if (sprPressureLevel === "HIGH" || supplyDisruptionPct > 20) {
    list.push({
      id: "rec-spr-controlled",
      priority: "HIGH",
      action: "Initiate Controlled Strategic Reserve Drawdown (Padur & Mangalore)",
      reason: "Moderate supply deficit threatens Western & Southern coastal refinery buffers.",
      expectedEffect: "Stabilizes feedstock for MRPL and BPCL Kochi refineries without exhausting national emergency stockpiles.",
      targetEntity: "ISPRL Operations"
    });
  }

  // RULE 2: Chokepoint Rerouting & Corridor Bypass
  if (scenarioTemplate.affectedCorridors.includes("hormuz")) {
    list.push({
      id: "rec-hormuz-bypass",
      priority: "CRITICAL",
      action: "Activate UAE Habshan-Fujairah Pipeline Bypass & Oman Gulf Lifts",
      reason: "Strait of Hormuz transit is restricted; loadings inside the Persian Gulf face extreme war-risk insurance surcharges.",
      expectedEffect: "Bypasses the 39km chokepoint completely by lifting Murban and Oman blend crude directly from Gulf of Oman deepwater terminals.",
      targetEntity: "PSU Refiners (IOCL, BPCL, HPCL) Procurement Desks"
    });
  }

  if (scenarioTemplate.affectedCorridors.includes("redsea") || freightImpactPct > 40) {
    list.push({
      id: "rec-cape-diversion",
      priority: "HIGH",
      action: "Pre-book Long-Haul VLCC Tonnage for Cape of Good Hope Routing",
      reason: "Red Sea / Bab-el-Mandeb closure adds 14–18 days to transit times, threatening vessel availability bottlenecks.",
      expectedEffect: "Prevents port-discharge gaps by securing chartered VLCC carriers on Atlantic/Baltic routes ahead of spot rate spikes.",
      targetEntity: "Shipping Corporation of India (SCI) & Logistics Desk"
    });
  }

  // RULE 3: Supplier Diversification
  if (supplyDisruptionPct > 20 || scenarioTemplate.affectedSuppliers.length > 0) {
    list.push({
      id: "rec-supplier-diversification",
      priority: "HIGH",
      action: "Expand Term Allocation with West African (Bonny/Forcados) & US Gulf Suppliers",
      reason: `Mitigates bilateral dependency and lowers Herfindahl-Hirschman concentration during Middle East and Red Sea turbulence.`,
      expectedEffect: "Provides ~450,000 bpd of low-sulfur sweet crude that navigates open ocean highways without chokepoint exposure.",
      targetEntity: "IOCL / RIL International Trading Units"
    });
  }

  // RULE 4: Price & Financial Hedging
  if (priceShockPct > 20) {
    list.push({
      id: "rec-financial-hedge",
      priority: "MEDIUM",
      action: "Implement Sovereign Brent-Dubai Crack Spread Collar Options",
      reason: `Simulated price spike (+${priceShockPct}%) increases national monthly landed crude import bill by over $1.2B.`,
      expectedEffect: "Caps landed import cost volatility for public sector refiners while maintaining upside participation.",
      targetEntity: "Refinery Treasury & Finance Departments"
    });
  }

  // RULE 5: Refinery Run Optimization
  list.push({
    id: "rec-refinery-slate",
    priority: "LOW",
    action: "Rebalance Refinery Crude Slate & Throttling Contingencies",
    reason: `Lowers reliance on sour Persian Gulf barrels by blending domestic onshore grades and maximizing distillate yields.`,
    expectedEffect: "Preserves high-value diesel and aviation turbine fuel (ATF) output during feedstock rationing.",
    targetEntity: "Center for High Technology (CHT) / Refineries Board"
  });

  // Sort by priority order: CRITICAL -> HIGH -> MEDIUM -> LOW
  const priorityRank = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
  return list.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
}
