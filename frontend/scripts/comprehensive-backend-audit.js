/**
 * Comprehensive Backend Engine & Integrity Audit Script
 */

import { getOfficialDataRegistry } from "../lib/officialData/officialDataRegistry.js";
import { readPpacSnapshot } from "../lib/officialData/ppacSnapshotReader.js";
import { readPpacTrade } from "../lib/officialData/ppacTradeReader.js";
import { readPpacPrices } from "../lib/officialData/ppacPriceReader.js";
import { readPpacProduction } from "../lib/officialData/ppacProductionReader.js";
import { readPpacConsumption } from "../lib/officialData/ppacConsumptionReader.js";
import { readPpacGas } from "../lib/officialData/ppacGasReader.js";
import { calculateResilienceScore, calculateRiskLevel } from "../lib/riskScoringEngine.js";
import { calculateLandedCost } from "../lib/landedCostEngine.js";
import { calculateRecencyDecay } from "../lib/intelligenceRiskAggregator.js";
import { deterministicEventAnalysis } from "../lib/aiIntelligenceEngine.js";
import { getDataAgeMinutes, getFreshnessStatus, getSystemDataHealth } from "../lib/dataFreshness.js";
import { getNationalEnergyBalance, OFFICIAL_NATIONAL_ENERGY_METRICS } from "../lib/providers/energyProvider.js";
import { getReserveCoverAnalysis, OFFICIAL_SPR_SITES, OFFICIAL_COMMERCIAL_STORAGE } from "../lib/providers/reserveProvider.js";
import { calculateSupplierConcentration, OFFICIAL_SUPPLIER_PROFILES } from "../lib/providers/supplierProvider.js";
import { getRefineryProfiles, OFFICIAL_REFINERY_PROFILES } from "../lib/providers/refineryProvider.js";

console.log("=== COMPREHENSIVE BACKEND AUDIT SUITE ===");

// Test 1: Risk Engine Bounds and Edge Cases
console.log("\n--- Risk Engine Verification ---");
const baselineRisk = calculateResilienceScore();
console.log("Baseline Resilience Score:", baselineRisk.resilienceScore, "(Expected: 36)");
console.log("Baseline Supply Risk Index:", baselineRisk.supplyRiskIndex, "(Expected: 63.8)");

// Edge case: All zeros
const zeroRisk = calculateResilienceScore({ geopolitical: 0, logistics: 0, concentration: 0, volatility: 0, supplyGap: 0 });
console.log("Zero Risk Inputs Score:", zeroRisk.resilienceScore, "(Expected: 100, Supply Risk: 0)");

// Edge case: All 100s
const maxRisk = calculateResilienceScore({ geopolitical: 100, logistics: 100, concentration: 100, volatility: 100, supplyGap: 100 });
console.log("Max Risk Inputs Score:", maxRisk.resilienceScore, "(Expected: 0, Supply Risk: 100)");

// Edge case: Negative inputs
const negRisk = calculateResilienceScore({ geopolitical: -50, logistics: -20, concentration: -10, volatility: -5, supplyGap: -100 });
console.log("Negative Risk Inputs Clamped Score:", negRisk.resilienceScore, "(Expected: 100)");

// Edge case: Over 100 inputs
const overRisk = calculateResilienceScore({ geopolitical: 200, logistics: 150, concentration: 120, volatility: 110, supplyGap: 300 });
console.log("Over-range Risk Inputs Clamped Score:", overRisk.resilienceScore, "(Expected: 0)");

// Test 2: Landed Cost Engine
console.log("\n--- Landed Cost Engine Verification ---");
const saudiCost = calculateLandedCost({ supplierId: "saudi_arabia", warRiskLevel: "MODERATE" });
console.log("Saudi Arabia Landed Cost:", saudiCost.netLandedCostUsd, "(Expected: 91.25)");

const uaeCost = calculateLandedCost({ supplierId: "uae", warRiskLevel: "LOW" });
console.log("UAE Landed Cost:", uaeCost.netLandedCostUsd, "(Expected: 90.00)");

const usaCost = calculateLandedCost({ supplierId: "usa", warRiskLevel: "LOW" });
console.log("USA Landed Cost:", usaCost.netLandedCostUsd, "(Expected: 94.40)");

const westAfricaCost = calculateLandedCost({ supplierId: "west_africa", warRiskLevel: "LOW" });
console.log("West Africa Landed Cost:", westAfricaCost.netLandedCostUsd, "(Expected: 95.60)");

const russiaCost = calculateLandedCost({ supplierId: "russia", warRiskLevel: "MODERATE" });
console.log("Russia Landed Cost:", russiaCost.netLandedCostUsd, "(Expected: 84.00)");

const weightedCost = (0.30 * 91.25) + (0.25 * 90.00) + (0.22 * 94.40) + (0.15 * 95.60) + (0.08 * 84.00);
console.log("Weighted Landed Cost for Strategy 1:", Number(weightedCost.toFixed(2)), "(Expected: 91.70)");

// Test 3: HHI Recalculation
console.log("\n--- HHI Math Audit ---");
const strat1Hhi = Math.pow(30, 2) + Math.pow(25, 2) + Math.pow(22, 2) + Math.pow(15, 2) + Math.pow(8, 2);
console.log("Strategy 1 (30, 25, 22, 15, 8) HHI:", strat1Hhi, "(Expected: 2298)");

const baseHhi = Math.pow(33.8, 2) + Math.pow(21.0, 2) + Math.pow(16.1, 2) + Math.pow(9.0, 2) + Math.pow(8.1, 2) + Math.pow(5.1, 2) + Math.pow(6.9, 2);
console.log("Baseline DGCIS (33.8, 21.0, 16.1, 9.0, 8.1, 5.1, 6.9) HHI:", Math.round(baseHhi), "(Expected: 2063)");
console.log("HHI Variance:", Math.round(baseHhi) - strat1Hhi, "(Concentration increased by +235 points from baseline)");

// Test 4: Macro Energy Balance Math
console.log("\n--- National Energy Balance Math ---");
const snapshot = readPpacSnapshot();
console.log("PPAC Snapshot Domestic Consumption:", snapshot.consumption.value, "MBD (5.42)");
console.log("PPAC Snapshot Indigenous Production:", snapshot.domesticProduction.value, "MBD (0.59)");
console.log("Derived Net Import Requirement:", snapshot.netImportRequirement.value, "MBD (4.83)");
console.log("Derived Import Dependency:", snapshot.importDependency.value, "% (89.1%)");

// Test 5: Strategic Reserve Cover
console.log("\n--- ISPRL Reserve Cover Math ---");
const sprAnalysis = getReserveCoverAnalysis();
console.log("Total ISPRL Barrels:", sprAnalysis.totalSprCapacityMillionBarrels, "MBBL (39.16)");
console.log("SPR Cover Duration:", sprAnalysis.sprDaysCover.value, "Days (8.1)");
console.log("Commercial Storage Cover:", sprAnalysis.commercialDaysCover.value, "Days (65.2)");
console.log("Combined Buffer Cover:", sprAnalysis.combinedDaysCover.value, "Days (73.3)");

console.log("\n=== AUDIT SUITE EXECUTION COMPLETE ===");
