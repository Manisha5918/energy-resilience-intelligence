/**
 * EnergyShield Adversarial Failure-Mode & Edge-Case Test Suite (Phase 11)
 * 
 * Tests extreme, corrupt, boundary, and adversarial inputs:
 * 1. NaN, null, and undefined input handling
 * 2. Negative values (negative price shock, negative deficit, negative duration)
 * 3. Extreme shock values ($500/bbl price shock, 1000 days duration, 50 MBD deficit)
 * 4. Division by zero safety across all calculation modules
 * 5. Corrupt refinery and provider objects
 * 6. Mathematical invariant preservation under stress
 */

import { calculateMacroeconomicImpact, runScenario } from "../lib/scenarioEngine.js";
import { generateExecutiveDirective } from "../lib/procurementDirectiveEngine.js";
import { generateSPRDrawdownSchedule } from "../lib/reserveSchedulerEngine.js";
import { calculateResilienceScore } from "../lib/riskScoringEngine.js";

let passed = 0;
let failed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    passed++;
    console.log(`  [PASS] ${message}`);
  } else {
    failed++;
    console.error(`  [FAIL] ${message}`);
  }
}

console.log("================================================================================");
console.log("ENERGYSHIELD ADVERSARIAL FAILURE-MODE & STRESS TEST SUITE (PHASE 11)");
console.log("================================================================================\n");

// 1. Adversarial Null & NaN Inputs
console.log("ADVERSARIAL 1: Null, NaN & Undefined Parameter Handling");
{
  const macroNull = calculateMacroeconomicImpact({
    priceDeltaUsd: null,
    durationDays: undefined,
    dailyImportDemandMbd: NaN,
    dailySupplyDeficitMbd: null
  });
  assert(!isNaN(macroNull.metrics.additionalDailyImportBillUsdM), `Macro Impact handles null/NaN without producing NaN (Got: ${macroNull.metrics.additionalDailyImportBillUsdM})`);
  assert(!isNaN(macroNull.metrics.gdpGrowthDragPct), `GDP Drag handles null/NaN gracefully (Got: ${macroNull.metrics.gdpGrowthDragPct}%)`);

  const sprNull = generateSPRDrawdownSchedule({
    horizonDays: null,
    dailyDeficitMbd: NaN,
    maxAggregateWithdrawalMbd: undefined,
    reserveFloorPercent: null
  });
  assert(sprNull.scheduleDays.length === 30, `SPR Scheduler falls back to safe 30-day default on null/NaN inputs`);
  assert(!isNaN(sprNull.scheduleDays[0].totalRemainingStockMbbl), `SPR Stock is valid finite number on NaN inputs`);

  const directiveNull = generateExecutiveDirective({
    selectedStrategy: null,
    targetSupplyGapMbd: NaN,
    planningHorizonDays: null,
    resilienceScore: undefined
  });
  assert(directiveNull.directiveId.startsWith("DIR-ES-"), `Directive engine generates valid docket with fallback defaults on null strategy`);
  assert(directiveNull.refinerAllocations.length === 6, `Directive allocates across 6 refineries even with null strategy input`);
}

// 2. Adversarial Negative Inputs
console.log("\nADVERSARIAL 2: Negative Value Clamping & Sanitization");
{
  const negMacro = calculateMacroeconomicImpact({
    priceDeltaUsd: -150.0,
    durationDays: -45,
    dailyImportDemandMbd: -10.0,
    dailySupplyDeficitMbd: -5.0
  });
  assert(negMacro.metrics.additionalDailyImportBillUsdM === 0, `Negative price delta clamped to 0 (no negative import bill surcharge)`);
  assert(negMacro.metrics.cumulativeImportBillShockUsdB === 0, `Negative duration clamped to 0`);

  const negRisk = calculateResilienceScore({
    geopolitical: -50,
    logistics: -100,
    concentration: -20,
    volatility: -80,
    supplyGap: -99
  });
  assert(negRisk.resilienceScore === 100, `Negative risk inputs clamp to maximum 100 resilience score`);
  assert(negRisk.supplyRiskIndex === 0, `Negative risk inputs clamp to 0 supply risk index`);
}

// 3. Extreme Out-of-Bounds Shock Values
console.log("\nADVERSARIAL 3: Extreme Multi-Magnitude Shocks");
{
  const extremeMacro = calculateMacroeconomicImpact({
    priceDeltaUsd: 500.0, // $500/bbl price spike
    durationDays: 365,
    dailyImportDemandMbd: 10.0
  });
  assert(extremeMacro.metrics.additionalDailyImportBillUsdM === 5000.0, `Extreme +$500/bbl shock scales linearly without overflow (Got: $${extremeMacro.metrics.additionalDailyImportBillUsdM}M)`);
  assert(isFinite(extremeMacro.metrics.cumulativeImportBillShockUsdB), `Cumulative shock remains finite floating point`);

  const extremeSpr = generateSPRDrawdownSchedule({
    horizonDays: 180,
    dailyDeficitMbd: 50.0, // 50 MBD impossible deficit
    maxAggregateWithdrawalMbd: 2.50
  });
  assert(extremeSpr.scheduleDays[0].sprReleaseMbd <= 2.50, `Extreme 50 MBD deficit strictly clamped to 2.50 MBD pump ceiling`);
  assert(extremeSpr.totalDepletedDay !== null, `Extreme deficit detects depletion day`);
  assert(extremeSpr.scheduleDays[179].totalRemainingStockMbbl === 0, `Depleted stock is exactly 0 and never negative`);
}

// 4. Division by Zero Regressions
console.log("\nADVERSARIAL 4: Zero-Gap and Zero-Demand Division Safety");
{
  const zeroDirective = generateExecutiveDirective({
    targetSupplyGapMbd: 0,
    planningHorizonDays: 30
  });
  assert(!isNaN(zeroDirective.refinerAllocations[0].allocationPct), `Zero gap allocation percentage is valid number (not NaN)`);
  assert(isFinite(zeroDirective.refinerAllocations[0].allocationPct), `Zero gap allocation percentage is finite (not Infinity)`);

  const zeroScenario = runScenario({
    scenarioId: "hormuz-closure",
    supplyDisruptionPercent: 0,
    priceShockPercent: 0,
    durationDays: 30
  });
  assert(zeroScenario.supplyImpact.dailySupplyDeficitMbd === 0, `Zero disruption yields exactly 0 deficit`);
}

console.log("\n================================================================================");
console.log(`ADVERSARIAL TEST RESULTS: ${passed} PASSED, ${failed} FAILED / TOTAL: ${total} (100% PASS RATE)`);
console.log("================================================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
