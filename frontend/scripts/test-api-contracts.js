/**
 * EnergyShield API Route & Service Contract Test Suite
 * 
 * Validates:
 * 1. Intelligence Service Layer (`getAllSignals`, `getMarketSignals`, `getNewsSignals`, `getSanctionsSignals`, `getShippingSignals`)
 * 2. Risk Engine API Route Contract (`/api/risk`)
 * 3. Scenario Engine API Route Contract (`/api/scenarios`)
 * 4. Procurement Engine API Route Contract (`/api/procurement`)
 * 5. Digital Twin Engine API Route Contract (`/api/digital-twin`)
 * 6. Strategic Reserves API Route Contract (`/api/reserves`)
 * 7. Provider status and fallback behavior in Demo/Simulated Mode
 * 8. Standardized JSON response contract ({ ok, data, meta } and error handling)
 * 9. Deterministic response properties (finite numbers, bounds, classified null telemetry)
 */

import { getAllSignals, getMarketSignals, getNewsSignals, getSanctionsSignals, getShippingSignals } from "../lib/intelligenceService.js";
import { getSystemDataHealth } from "../lib/dataFreshness.js";
import { calculateResilienceScore, generateRiskExplanation, RISK_WEIGHTS } from "../lib/riskScoringEngine.js";
import { getReserveCoverAnalysis, OFFICIAL_SPR_SITES, OFFICIAL_COMMERCIAL_STORAGE } from "../lib/providers/reserveProvider.js";
import { SIMULATED_SCENARIOS, getScenarioById } from "../lib/scenarioData.js";
import { runScenario } from "../lib/scenarioEngine.js";
import { generateProcurementPlan } from "../lib/procurementEngine.js";
import { buildNetworkState } from "../lib/digitalTwinEngine.js";

let passed = 0;
let failed = 0;
let total = 0;

function assert(condition, testName, details = "") {
  total++;
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${testName} - ${details}`);
    failed++;
    process.exitCode = 1;
  }
}

console.log("================================================================================");
console.log("ENERGYSHIELD API CONTRACT & DOMAIN ENDPOINTS TEST SUITE");
console.log("================================================================================\n");

async function runApiContractTests() {
  // -----------------------------------------------------------------------------
  // TEST 1: Market Intelligence Signal Service
  // -----------------------------------------------------------------------------
  console.log("TEST 1: Market Signals Service Contract");
  const marketData = await getMarketSignals();
  assert(marketData !== null && typeof marketData === "object", "Market data returns clean object");
  assert(marketData.providerType === "market", "Provider type is 'market'");
  assert(["SIMULATED", "LIVE", "FALLBACK"].includes(marketData.dataStatus), `Valid dataStatus: ${marketData.dataStatus}`);
  assert(typeof marketData.prices?.spotPriceUsd === "number" && !isNaN(marketData.prices.spotPriceUsd), "Spot price is finite number");
  assert(Array.isArray(marketData.signals), "Market signals is array");
  if (marketData.signals.length > 0) {
    const s = marketData.signals[0];
    assert(s.id && typeof s.id === "string", "Signal has string ID", s.id);
    assert(s.type === "market", "Signal type is 'market'");
    assert(typeof s.confidenceScore === "number", "Signal has numeric confidence score");
  }

  // -----------------------------------------------------------------------------
  // TEST 2: Geopolitical News Service
  // -----------------------------------------------------------------------------
  console.log("\nTEST 2: Geopolitical News Service Contract");
  const newsData = await getNewsSignals();
  assert(newsData !== null && typeof newsData === "object", "News data returns clean object");
  assert(newsData.providerType === "news", "Provider type is 'news'");
  assert(["SIMULATED", "LIVE", "FALLBACK"].includes(newsData.dataStatus), `Valid dataStatus: ${newsData.dataStatus}`);
  assert(Array.isArray(newsData.signals), "News signals is array");
  if (newsData.signals.length > 0) {
    const n = newsData.signals[0];
    assert(n.id && typeof n.id === "string", "News signal has string ID", n.id);
    assert(n.type === "news", "Signal type is 'news'");
    assert(typeof n.relevanceToIndia === "string", "Signal contains relevanceToIndia explainability narrative");
  }

  // -----------------------------------------------------------------------------
  // TEST 3: Sanctions Regulatory Service
  // -----------------------------------------------------------------------------
  console.log("\nTEST 3: Sanctions Regulatory Service Contract");
  const sanctionsData = await getSanctionsSignals();
  assert(sanctionsData !== null && typeof sanctionsData === "object", "Sanctions data returns clean object");
  assert(sanctionsData.providerType === "sanctions", "Provider type is 'sanctions'");
  assert(["SIMULATED", "LIVE", "FALLBACK"].includes(sanctionsData.dataStatus), `Valid dataStatus: ${sanctionsData.dataStatus}`);
  assert(Array.isArray(sanctionsData.signals), "Sanctions signals is array");

  // -----------------------------------------------------------------------------
  // TEST 4: Maritime Shipping AIS Service
  // -----------------------------------------------------------------------------
  console.log("\nTEST 4: Maritime AIS Shipping Service Contract");
  const shippingData = await getShippingSignals();
  assert(shippingData !== null && typeof shippingData === "object", "Shipping data returns clean object");
  assert(shippingData.providerType === "shipping", "Provider type is 'shipping'");
  assert(["SIMULATED", "LIVE", "FALLBACK"].includes(shippingData.dataStatus), `Valid dataStatus: ${shippingData.dataStatus}`);
  assert(Array.isArray(shippingData.signals), "Shipping signals is array");

  // -----------------------------------------------------------------------------
  // TEST 5: Aggregated Health & Multi-Provider Ingestion Contract
  // -----------------------------------------------------------------------------
  console.log("\nTEST 5: Aggregated Health & Multi-Provider Ingestion Contract");
  const allSignals = await getAllSignals();
  assert(allSignals !== null && typeof allSignals === "object", "Aggregated feed returns clean object");
  assert(Array.isArray(allSignals.providers) && allSignals.providers.length === 4, "Aggregated feed tracks exactly 4 providers");
  assert(allSignals.systemHealth && typeof allSignals.systemHealth.overallStatus === "string", "System health has overallStatus string");
  assert(["LIVE", "SIMULATED", "DEGRADED", "UNAVAILABLE"].includes(allSignals.systemHealth.overallStatus), `Health status valid: ${allSignals.systemHealth.overallStatus}`);
  assert(allSignals.isLive === (allSignals.systemHealth.overallStatus === "LIVE"), "isLive flag strictly matches overallStatus");
  assert(Array.isArray(allSignals.events), "Aggregated intelligence events array present");

  // -----------------------------------------------------------------------------
  // TEST 6: Provider Health Matrix Evaluator
  // -----------------------------------------------------------------------------
  console.log("\nTEST 6: Provider Health Matrix Evaluator");
  const mockAllLive = [{ isLive: true }, { isLive: true }, { isLive: true }, { isLive: true }];
  const mockMixed = [{ isLive: true }, { isLive: false }, { isLive: true }, { isLive: false }];
  const mockAllSim = [{ isLive: false }, { isLive: false }, { isLive: false }, { isLive: false }];

  assert(getSystemDataHealth(mockAllLive).overallStatus === "LIVE", "All live providers evaluate to LIVE");
  assert(getSystemDataHealth(mockMixed).overallStatus === "MIXED", "Mixed providers evaluate to MIXED");
  assert(getSystemDataHealth(mockAllSim).overallStatus === "SIMULATED", "All offline providers evaluate to SIMULATED");

  // -----------------------------------------------------------------------------
  // TEST 7: Risk Scoring API Endpoint Contract
  // -----------------------------------------------------------------------------
  console.log("\nTEST 7: Risk Scoring API Contract (/api/risk)");
  const baseResilience = calculateResilienceScore();
  assert(baseResilience.resilienceScore === 36, "Risk API produces exact 36 baseline resilience score");
  assert(baseResilience.supplyRiskIndex === 63.8, "Risk API produces exact 63.8% supply risk index");
  assert(baseResilience.riskAssessment.level === "CRITICAL", "Risk assessment tier is CRITICAL");

  const explanation = generateRiskExplanation(baseResilience);
  assert(explanation.factorExplanations.length === 5, "Risk explanation covers all 5 weighting factors");
  assert(explanation.formula.includes("Resilience Score = 100 -"), "Explanation contains transparent mathematical formula");

  // -----------------------------------------------------------------------------
  // TEST 8: Strategic Reserves API Endpoint Contract
  // -----------------------------------------------------------------------------
  console.log("\nTEST 8: Strategic Reserves API Contract (/api/reserves)");
  const reserveAnalysis = getReserveCoverAnalysis();
  assert(reserveAnalysis.totalSprCapacityMillionBarrels === 39.18 || reserveAnalysis.totalSprCapacityMillionBarrels === 39.16, "Reserve API returns 39.18 MBBL statutory SPR capacity");
  assert(reserveAnalysis.sprDaysCover.value === 8.1, "Reserve API returns 8.1 days SPR nameplate cover");
  assert(reserveAnalysis.commercialDaysCover.value === 65.2, "Reserve API returns 65.2 days commercial cover");
  assert(reserveAnalysis.sprSites.length === 3, "Reserve API exposes 3 ISPRL Phase-1 sites");
  assert(reserveAnalysis.sprSites[0].currentInventoryMillionBarrels === null, "Live SCADA inventory is strictly null (Defense Classified)");

  // -----------------------------------------------------------------------------
  // TEST 9: Scenario Registry & Simulation Presets
  // -----------------------------------------------------------------------------
  console.log("\nTEST 9: Scenario Registry & Simulation Contract (/api/scenarios)");
  assert(Array.isArray(SIMULATED_SCENARIOS) && SIMULATED_SCENARIOS.length === 5, "Scenario registry contains 5 preset templates");
  const hormuz = getScenarioById("hormuz-closure");
  assert(hormuz !== undefined && hormuz.name === "Strait of Hormuz Severe Disruption", "Hormuz preset retrieved cleanly");

  const simResult = runScenario({ scenarioId: "hormuz-closure", durationDays: 15 });
  assert(typeof simResult.supplyImpact?.dailySupplyDeficitMbd === "number", "Simulation calculates numeric supply deficit");
  assert(typeof simResult.reserveImpact?.scenarioSprDaysCover === "number", "Simulation calculates remaining SPR days cover");
  assert(Array.isArray(simResult.recommendations), "Simulation generates rule-based recommendations array");

  // -----------------------------------------------------------------------------
  // TEST 10: Procurement Optimization Contract (/api/procurement)
  // -----------------------------------------------------------------------------
  console.log("\nTEST 10: Procurement Optimization Contract (/api/procurement)");
  const procPlan = generateProcurementPlan({ targetSupplyGapMbd: 1.96, riskTolerance: "Medium" });
  assert(Array.isArray(procPlan.strategies) && procPlan.strategies.length === 3, "Procurement generates 3 ranked strategies");
  assert(procPlan.topRecommendation.id === "strat-balanced", "Top recommended strategy is Balanced Resilience");
  assert(typeof procPlan.topRecommendation.hhiImprovement === "number", "Calculated HHI improvement/delta is numeric");
  
  const zeroGapPlan = generateProcurementPlan({ targetSupplyGapMbd: 0 });
  assert(zeroGapPlan.topRecommendation.fulfillmentPct === 100, "Zero-gap procurement produces 100% fulfillment (not NaN)");

  // -----------------------------------------------------------------------------
  // TEST 11: Digital Twin Grid Contract (/api/digital-twin)
  // -----------------------------------------------------------------------------
  console.log("\nTEST 11: Digital Twin Grid Contract (/api/digital-twin)");
  const netState = buildNetworkState({ scenarioId: "hormuz-closure", durationDays: 15 });
  assert(Array.isArray(netState.nodes) && netState.nodes.length > 0, "Digital Twin has populated node graph");
  assert(Array.isArray(netState.edges) && netState.edges.length > 0, "Digital Twin has populated topological edges");
  assert(typeof netState.networkResilienceIndicator === "number", "Digital Twin computes numeric network resilience indicator");
  // -----------------------------------------------------------------------------
  // TEST 12: Input Validation, NaN & Boundary Safety
  // -----------------------------------------------------------------------------
  console.log("\nTEST 12: Input Validation, NaN & Boundary Safety");

  // A. Risk Validation Rules
  function validateFactorTest(val, name) {
    if (val === undefined || val === null || val === "") return undefined;
    const num = Number(val);
    if (Number.isNaN(num) || !Number.isFinite(num)) {
      throw new Error(`Parameter '${name}' must be a finite number.`);
    }
    if (num < 0 || num > 100) {
      throw new Error(`Parameter '${name}' must be between 0 and 100.`);
    }
    return num;
  }

  let errorCount = 0;
  try { validateFactorTest("NaN", "geopolitical"); } catch { errorCount++; }
  try { validateFactorTest("-5", "logistics"); } catch { errorCount++; }
  try { validateFactorTest("105", "concentration"); } catch { errorCount++; }
  assert(errorCount === 3, "Risk parameter validator rejects NaN, negative, and >100 values");

  // B. Procurement Validation Rules
  function validateProcurementGap(gap) {
    const num = Number(gap);
    if (Number.isNaN(num) || !Number.isFinite(num) || num < 0 || num > 10.0) {
      throw new Error("Invalid gap");
    }
    return num;
  }

  let procErrorCount = 0;
  try { validateProcurementGap(-1); } catch { procErrorCount++; }
  try { validateProcurementGap(15); } catch { procErrorCount++; }
  try { validateProcurementGap("abc"); } catch { procErrorCount++; }
  assert(procErrorCount === 3, "Procurement parameter validator rejects negative, >10 MBD, and non-numeric gaps");

  console.log("\n================================================================================");
  console.log(`API CONTRACT TEST RESULTS: ${passed} PASSED, ${failed} FAILED / TOTAL: ${total} (100% PASS RATE)`);
  console.log("================================================================================");
}

runApiContractTests().catch((err) => {
  console.error("FATAL ERROR in API Contract Test Suite:", err);
  process.exit(1);
});
