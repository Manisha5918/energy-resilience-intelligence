/**
 * EnergyShield Canonical Parameter Registry
 * 
 * Defines and classifies every constant, coefficient, limit, and input parameter
 * used across the EnergyShield computational architecture into 4 strict categories:
 * 
 * 1. OFFICIAL_DATA: Statutory, government, or regulatory facts published by official authorities.
 * 2. ENGINEERING_CONSTRAINT: Physical infrastructure limits (e.g. pump capacities, pipeline limits).
 * 3. MODEL_ASSUMPTION: Calibrated weights, policy ratios, and heuristic coefficients.
 * 4. SCENARIO_INPUT: Dynamic simulation parameters configured by user/analyst.
 */

import { OFFICIAL_NATIONAL_ENERGY_METRICS } from "./providers/energyProvider.js";
import { OFFICIAL_SPR_SITES, OFFICIAL_COMMERCIAL_STORAGE } from "./providers/reserveProvider.js";
import { OFFICIAL_SUPPLIER_PROFILES } from "./providers/supplierProvider.js";
import { OFFICIAL_REFINERY_PROFILES } from "./providers/refineryProvider.js";
import { RISK_WEIGHTS } from "./riskScoringEngine.js";
import { OPTIMIZATION_WEIGHTS } from "./procurementEngine.js";
import { SPR_ENGINEERING_CONSTRAINTS } from "./scenarioEngine.js";
import { BENCHMARK_FREIGHT_RATES } from "./landedCostEngine.js";
import { SCENARIO_PRESETS } from "./scenarioData.js";

// =============================================================================
// 1. OFFICIAL_DATA (Statutory Facts with Provenance)
// =============================================================================
export const OFFICIAL_DATA_REGISTRY = {
  nationalDailyConsumption: {
    key: "nationalDailyConsumption",
    name: "National Daily Crude Consumption",
    value: OFFICIAL_NATIONAL_ENERGY_METRICS.nationalDailyConsumptionMbd.value,
    unit: "MBD",
    category: "OFFICIAL_DATA",
    sourceAuthority: "Petroleum Planning & Analysis Cell (PPAC), MoPNG",
    sourceArtifact: "Monthly Snapshot on Petroleum & Natural Gas (FY2024-25)",
    effectiveDate: "2026-08-01",
    confidence: "HIGH"
  },
  domesticCrudeProduction: {
    key: "domesticCrudeProduction",
    name: "Domestic Crude Extraction",
    value: OFFICIAL_NATIONAL_ENERGY_METRICS.domesticCrudeProductionMbd.value,
    unit: "MBD",
    category: "OFFICIAL_DATA",
    sourceAuthority: "Directorate General of Hydrocarbons (DGH) / PPAC",
    sourceArtifact: "Annual Hydrocarbon Production & Royalty Disclosures",
    effectiveDate: "2026-08-01",
    confidence: "HIGH"
  },
  sprPhase1CapacityMmt: {
    key: "sprPhase1CapacityMmt",
    name: "Strategic Petroleum Reserve Phase-1 Capacity",
    value: 5.33,
    unit: "MMT",
    category: "OFFICIAL_DATA",
    sourceAuthority: "Indian Strategic Petroleum Reserves Limited (ISPRL)",
    sourceArtifact: "Ministry of Petroleum & Natural Gas Standing Committee Report No. 27",
    effectiveDate: "2026-08-01",
    confidence: "HIGH"
  },
  sprPhase1CapacityMbbl: {
    key: "sprPhase1CapacityMbbl",
    name: "Strategic Petroleum Reserve Phase-1 Barrels",
    value: 39.18,
    unit: "MBBL",
    category: "OFFICIAL_DATA",
    sourceAuthority: "ISPRL Statutory Conversions (1.33 + 1.50 + 2.50 MMT × 7.35 bbl/MT)",
    sourceArtifact: "ISPRL Technical Disclosures",
    effectiveDate: "2026-08-01",
    confidence: "HIGH"
  },
  commercialStorageMbbl: {
    key: "commercialStorageMbbl",
    name: "Commercial Industry Storage Buffer",
    value: OFFICIAL_COMMERCIAL_STORAGE.totalCommercialStorageMillionBarrels.value,
    unit: "MBBL",
    category: "OFFICIAL_DATA",
    sourceAuthority: "PPAC / Oil Marketing Companies (OMCs)",
    sourceArtifact: "National Tank Farm & Pipeline Stock Survey",
    effectiveDate: "2026-08-01",
    confidence: "HIGH"
  },
  supplierProfiles: {
    key: "supplierProfiles",
    name: "Bilateral Crude Supplier Shares",
    value: OFFICIAL_SUPPLIER_PROFILES,
    unit: "Array (Profiles & Shares)",
    category: "OFFICIAL_DATA",
    sourceAuthority: "Directorate General of Commercial Intelligence and Statistics (DGCIS)",
    sourceArtifact: "Foreign Trade Statistics (Crude Oil Imports FY2025-26)",
    effectiveDate: "2026-08-01",
    confidence: "HIGH"
  },
  refineryProfiles: {
    key: "refineryProfiles",
    name: "Coastal & Inland Refinery Capacities",
    value: OFFICIAL_REFINERY_PROFILES,
    unit: "Array (Nameplate MMTPA / MBD)",
    category: "OFFICIAL_DATA",
    sourceAuthority: "PPAC / Ministry of Petroleum & Natural Gas",
    sourceArtifact: "Indian Petroleum & Natural Gas Statistics (Capacity Disclosures)",
    effectiveDate: "2026-08-01",
    confidence: "HIGH"
  }
};

// =============================================================================
// 2. ENGINEERING_CONSTRAINT (Physical Limits & Infrastructure Bounds)
// =============================================================================
export const ENGINEERING_CONSTRAINT_REGISTRY = {
  maxSprWithdrawalRate: {
    key: "maxSprWithdrawalRate",
    name: "Maximum Aggregate SPR Withdrawal Rate",
    value: SPR_ENGINEERING_CONSTRAINTS.MAX_WITHDRAWAL_RATE_MBD,
    unit: "MBD",
    category: "ENGINEERING_CONSTRAINT",
    description: "Physical aggregate pumping discharge capacity limit across Vizag, Mangalore, and Padur caverns.",
    engineeringAuthority: "ISPRL Phase-1 Technical Design & Cavern Pumping Specifications",
    limitingFactor: "Subsea pipeline throughput & cavern discharge booster pump nameplates"
  },
  spmDischargeCapacityWestCoast: {
    key: "spmDischargeCapacityWestCoast",
    name: "Western SPM Berthing & Offloading Limit",
    value: 2.10,
    unit: "MBD",
    category: "ENGINEERING_CONSTRAINT",
    description: "Combined single point mooring discharge rate for Sikka and Vadinar berths.",
    engineeringAuthority: "Gujarat Maritime Board / Deendayal Port Authority",
    limitingFactor: "SPM draft restrictions and subsea pipeline manifold capacity"
  },
  spmDischargeCapacityEastCoast: {
    key: "spmDischargeCapacityEastCoast",
    name: "Eastern SPM Berthing & Offloading Limit",
    value: 1.40,
    unit: "MBD",
    category: "ENGINEERING_CONSTRAINT",
    description: "Combined SPM discharge rate for Paradip and Visakhapatnam berths.",
    engineeringAuthority: "Paradip Port Authority / Visakhapatnam Port Authority",
    limitingFactor: "Offshore berth weather window and crude header pipeline diameter"
  }
};

// =============================================================================
// 3. MODEL_ASSUMPTION (Calibrated Weights, Policy Ratios & Scoring Rules)
// =============================================================================
export const MODEL_ASSUMPTION_REGISTRY = {
  riskScoringWeights: {
    key: "riskScoringWeights",
    name: "Five-Factor Energy Resilience Model Weights",
    value: RISK_WEIGHTS,
    unit: "Weight Distribution (Sum = 1.0)",
    category: "MODEL_ASSUMPTION",
    description: "Linear additive risk model: Geopolitical (30%), Logistics (25%), Concentration (20%), Volatility (15%), Supply Gap (10%).",
    calibratedBy: "EnergyShield Strategic Risk Advisory Framework",
    rationale: "Geopolitical and logistics chokepoints constitute 55% of total vulnerability for maritime-dependent crude imports."
  },
  procurementOptimizationWeights: {
    key: "procurementOptimizationWeights",
    name: "Procurement Multi-Attribute Scoring Weights",
    value: OPTIMIZATION_WEIGHTS,
    unit: "Weight Distribution (Sum = 1.0)",
    category: "MODEL_ASSUMPTION",
    description: "Strategy evaluation: Resilience (35%), Diversification (20%), Reliability (15%), Fulfillment (15%), Cost Penalty (-10%), Transit Penalty (-5%).",
    calibratedBy: "EnergyShield Sourcing Optimization Model",
    rationale: "Prioritizes energy security and chokepoint elimination during crisis while penalizing severe cost spikes."
  },
  sprPolicyDrawdownRatio: {
    key: "sprPolicyDrawdownRatio",
    name: "Strategic Reserve Drawdown Policy Ratio",
    value: SPR_ENGINEERING_CONSTRAINTS.POLICY_DRAWDOWN_RATIO,
    unit: "Ratio (0.75 / 75%)",
    category: "MODEL_ASSUMPTION",
    description: "Policy coefficient capping SPR discharge to 75% of daily supply deficit to preserve reserve cover longevity.",
    calibratedBy: "National Emergency Energy Response Policy Guidelines",
    rationale: "Prevents complete exhaustion of sovereign reserves during extended supply disruptions."
  },
  benchmarkFreightRates: {
    key: "benchmarkFreightRates",
    name: "Benchmark Route Freight Rates",
    value: BENCHMARK_FREIGHT_RATES,
    unit: "$/bbl",
    category: "MODEL_ASSUMPTION",
    description: "Baseline VLCC spot freight rates: Persian Gulf ($3.80), Red Sea ($5.40), Cape ($8.20), Direct Arabian Sea ($2.90).",
    calibratedBy: "Baltic Dirty Tanker Index (BDTI) Reference Baseline",
    rationale: "Represents representative round-trip charter rates to Indian West/East coast refineries."
  },
  sprPressureThresholds: {
    key: "sprPressureThresholds",
    name: "Strategic Reserve Pressure Level Thresholds",
    value: {
      critical: SPR_ENGINEERING_CONSTRAINTS.CRITICAL_DAYS_COVER_THRESHOLD,
      high: SPR_ENGINEERING_CONSTRAINTS.HIGH_PRESSURE_DAYS_COVER_THRESHOLD,
      moderate: SPR_ENGINEERING_CONSTRAINTS.MODERATE_PRESSURE_DAYS_COVER_THRESHOLD
    },
    unit: "Days of Cover",
    category: "MODEL_ASSUMPTION",
    description: "Remaining days cover thresholds: Critical (<3d), High (<6d), Moderate (<8.5d).",
    calibratedBy: "ISPRL Operational Emergency Protocols",
    rationale: "Triggers sovereign procurement overrides and commercial stock mobilization."
  }
};

// =============================================================================
// 4. SCENARIO_INPUT (Dynamic Simulation Parameters Configured by User/Preset)
// =============================================================================
export const SCENARIO_INPUT_REGISTRY = {
  scenarioPresets: {
    key: "scenarioPresets",
    name: "Pre-Configured Disruption Scenario Templates",
    value: SCENARIO_PRESETS,
    unit: "Array of Preset Templates",
    category: "SCENARIO_INPUT",
    description: "Baseline scenario templates covering Hormuz closure, Red Sea escalation, Russian export embargo, Price shock, and Combined multi-vector disruption.",
    configurableParameters: [
      "supplyDisruptionPercent (0 - 100%)",
      "durationDays (1 - 180 days)",
      "priceShockPercent (-50% to +200%)",
      "freightImpactPercent (-50% to +300%)",
      "severity (Low | Moderate | Severe)"
    ]
  }
};

/**
 * Helper to retrieve parameter metadata and audit status
 */
export function getParameterAuditRegistry() {
  return {
    officialData: OFFICIAL_DATA_REGISTRY,
    engineeringConstraints: ENGINEERING_CONSTRAINT_REGISTRY,
    modelAssumptions: MODEL_ASSUMPTION_REGISTRY,
    scenarioInputs: SCENARIO_INPUT_REGISTRY,
    totalRegisteredParameters: 
      Object.keys(OFFICIAL_DATA_REGISTRY).length +
      Object.keys(ENGINEERING_CONSTRAINT_REGISTRY).length +
      Object.keys(MODEL_ASSUMPTION_REGISTRY).length +
      Object.keys(SCENARIO_INPUT_REGISTRY).length
  };
}
