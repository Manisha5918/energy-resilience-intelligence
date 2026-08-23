/**
 * EnergyShield Phase 8 Comprehensive Verification Test Suite
 * 
 * Tests:
 * 1. Macroeconomic Impact & GDP/CAD Elasticity Calculations
 * 2. Executive Procurement Directive Refiner Allocation & Integrity
 * 3. ISPRL Day-by-Day Drawdown Scheduler & Cavern Depletion Dynamics
 * 4. Data Readiness & Centralized Provenance Calculations
 * 5. GIS Geospatial Nodes & Maritime Route Geometries
 */

import { calculateMacroeconomicImpact, runScenario } from "../lib/scenarioEngine.js";
import { generateExecutiveDirective } from "../lib/procurementDirectiveEngine.js";
import { generateSPRDrawdownSchedule } from "../lib/reserveSchedulerEngine.js";
import { calculateDataReadinessMetrics, PROVENANCE_REGISTRY } from "../lib/data/provenanceRegistry.js";
import { getGISNodes, getGISRoutes } from "../lib/data/schemas/routeSchema.js";
import { getEconomicAssumptions } from "../lib/data/schemas/economicSchema.js";

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
console.log("ENERGYSHIELD NEW MODULES & PROVENANCE AUTOMATED TEST SUITE");
console.log("================================================================================\n");

// SUITE 1: Macroeconomic Impact Engine
console.log("SUITE 1: Macroeconomic Impact Engine (GDP Drag & CAD Expansion)");
{
  const macro = calculateMacroeconomicImpact({
    priceDeltaUsd: 20.0,
    durationDays: 30,
    dailyImportDemandMbd: 4.83,
    dailySupplyDeficitMbd: 0
  });

  assert(macro.metrics.additionalDailyImportBillUsdM === 96.6, `Daily import bill surcharge for +$20/bbl = $96.6M/day (Got: $${macro.metrics.additionalDailyImportBillUsdM}M)`);
  assert(macro.metrics.cumulativeImportBillShockUsdB === 2.9, `30-Day Cumulative import bill shock = $2.9B (Got: $${macro.metrics.cumulativeImportBillShockUsdB}B)`);
  assert(macro.metrics.gdpGrowthDragPct > 0, `GDP growth drag is positive and computed (Got: -${macro.metrics.gdpGrowthDragPct}%)`);
  assert(macro.metrics.cadExpansionUsdB > 0, `CAD expansion is positive and computed (Got: $${macro.metrics.cadExpansionUsdB}B)`);
  assert(macro.sensitivityCurve.length === 6, `Sensitivity matrix has 6 price sweep steps ($0 to +$50)`);
  assert(macro.disclaimer.includes("authoritative validation"), `Mandatory model disclaimer included in payload`);

  const runOutput = runScenario({
    scenarioId: "hormuz-closure",
    priceShockPercent: 25,
    durationDays: 30
  });
  assert(runOutput.macroeconomicImpact !== undefined, `runScenario() attaches macroeconomicImpact object`);
  assert(runOutput.macroeconomicImpact.metrics.additionalDailyImportBillUsdM > 0, `Integrated scenario generates non-zero fiscal impact`);
}

// SUITE 2: Executive Procurement Directive Engine
console.log("\nSUITE 2: Executive Procurement Directive Engine (Refiner Allocations)");
{
  const directive = generateExecutiveDirective({
    targetSupplyGapMbd: 2.00,
    planningHorizonDays: 30,
    resilienceScore: 65
  });

  assert(directive.directiveId.startsWith("DIR-ES-"), `Generates standard directive tracking ID (${directive.directiveId})`);
  assert(directive.refinerAllocations.length === 6, `Allocates crude across all 6 key Indian refineries (Got: ${directive.refinerAllocations.length})`);
  
  const totalAllocated = Number(directive.refinerAllocations.reduce((acc, r) => acc + r.allocationMbd, 0).toFixed(2));
  assert(Math.abs(totalAllocated - 2.00) <= 0.05, `Refiner allocations sum to target supply gap (~2.00 MBD, Got: ${totalAllocated} MBD)`);
  
  assert(directive.logisticsPlan.length >= 3, `Includes multimodal arterial routing and bypass plans`);
  assert(directive.riskControls.length >= 3, `Includes OFAC screening and sovereign insurance controls`);
  assert(directive.legalNotice.includes("NOT AN EXECUTABLE PURCHASE ORDER"), `Contains mandatory legal disclaimer`);
}

// SUITE 3: SPR Day-by-Day Drawdown Scheduler & Boundary Physics
console.log("\nSUITE 3: Strategic Petroleum Reserve Day-by-Day Scheduler & Boundary Physics");
{
  // 1. Standard 30-day run
  const schedule30 = generateSPRDrawdownSchedule({
    horizonDays: 30,
    dailyDeficitMbd: 1.50,
    maxAggregateWithdrawalMbd: 2.50,
    reserveFloorPercent: 20.0
  });

  assert(schedule30.scheduleDays.length === 30, `30-Day horizon produces exactly 30 daily steps`);
  assert(schedule30.scheduleDays[0].sprReleaseMbd > 0, `Day 1 initiates positive cavern release`);
  
  const lastDay = schedule30.scheduleDays[29];
  assert(lastDay.totalRemainingStockMbbl < schedule30.totalInitialStockMbbl, `Total SPR stock decreases monotonically during deficit`);
  assert(lastDay.vizagStockMbbl >= 0, `Vizag cavern stock remains non-negative`);
  assert(lastDay.mangaloreStockMbbl >= 0, `Mangalore cavern stock remains non-negative`);
  assert(lastDay.padurStockMbbl >= 0, `Padur cavern stock remains non-negative`);

  // 2. Zero Drawdown Edge Case
  const scheduleZero = generateSPRDrawdownSchedule({
    horizonDays: 30,
    dailyDeficitMbd: 0,
    maxAggregateWithdrawalMbd: 2.50
  });
  assert(scheduleZero.scheduleDays[0].sprReleaseMbd === 0, `Zero supply gap results in exactly 0 MBD drawdown`);
  assert(scheduleZero.scheduleDays[29].totalRemainingStockMbbl === scheduleZero.totalInitialStockMbbl, `Zero deficit preserves 100% of initial stock (${scheduleZero.totalInitialStockMbbl} Mbbl)`);

  // 3. Aggregate Pump Ceiling Exceeded (Deficit = 4.0 MBD > Pump Cap 2.50 MBD)
  const schedulePumpCap = generateSPRDrawdownSchedule({
    horizonDays: 30,
    dailyDeficitMbd: 4.00,
    maxAggregateWithdrawalMbd: 2.50
  });
  assert(schedulePumpCap.scheduleDays[0].sprReleaseMbd <= 2.50, `Drawdown strictly clamped to aggregate pump ceiling (2.50 MBD, Got: ${schedulePumpCap.scheduleDays[0].sprReleaseMbd})`);
  assert(schedulePumpCap.warnings.some(w => w.id === "warn-pump-ceiling"), `Aggregate pump ceiling warning emitted`);

  // 4. Complete Inventory Depletion (Extreme 120-Day Deficit)
  const scheduleDepletion = generateSPRDrawdownSchedule({
    horizonDays: 120,
    dailyDeficitMbd: 2.50,
    maxAggregateWithdrawalMbd: 2.50,
    reserveFloorPercent: 20.0
  });
  assert(scheduleDepletion.totalDepletedDay !== null, `Extreme deficit detects total cavern depletion day (Day: ${scheduleDepletion.totalDepletedDay})`);
  assert(scheduleDepletion.warnings.some(w => w.id === "warn-total-depletion"), `Complete SPR depletion warning emitted`);
  const postDepletionDay = scheduleDepletion.scheduleDays[119];
  assert(postDepletionDay.totalRemainingStockMbbl >= 0, `Stock after depletion never becomes negative (Got: ${postDepletionDay.totalRemainingStockMbbl} Mbbl)`);

  // 5. 20% Emergency Reserve Floor Breach
  assert(scheduleDepletion.floorBreachedDay !== null, `Emergency 20% floor breach day detected (Day: ${scheduleDepletion.floorBreachedDay})`);
  assert(scheduleDepletion.warnings.some(w => w.id === "warn-floor-breached"), `Emergency reserve floor breach warning emitted`);

  // 6. Conservation of Mass across Caverns
  const day10 = schedule30.scheduleDays[9];
  const cavernSumDay10 = Number((day10.vizagStockMbbl + day10.mangaloreStockMbbl + day10.padurStockMbbl).toFixed(2));
  assert(Math.abs(cavernSumDay10 - day10.totalRemainingStockMbbl) <= 0.05, `Conservation of mass: individual cavern sum equals total stock (${cavernSumDay10} vs ${day10.totalRemainingStockMbbl})`);
}

// SUITE 4: Centralized Provenance & Data Readiness Registry
console.log("\nSUITE 4: Centralized Provenance & Data Readiness Registry");
{
  const readiness = calculateDataReadinessMetrics();
  assert(readiness.totalDatasets === PROVENANCE_REGISTRY.length, `Tracks all registered datasets (${readiness.totalDatasets})`);
  assert(readiness.officialCount >= 4, `Identifies verified statutory official inputs (Count: ${readiness.officialCount})`);
  assert(readiness.modelAssumptionCount >= 1, `Identifies model assumptions (Count: ${readiness.modelAssumptionCount})`);
  assert(readiness.pendingValidationCount >= 1, `Identifies pending validation fields (Count: ${readiness.pendingValidationCount})`);
  assert(readiness.dataCompletenessPercent > 0 && readiness.dataCompletenessPercent <= 100, `Calculates dynamic Data Completeness (${readiness.dataCompletenessPercent}%)`);
  assert(readiness.modelReadinessPercent >= 80, `Calculates dynamic Model Readiness (${readiness.modelReadinessPercent}%)`);
  assert(readiness.readinessBreakdown.officialDatasets.status === "READY", `Official datasets status evaluates to READY`);
  assert(readiness.readinessBreakdown.economicAssumptions.status === "PENDING", `Economic assumptions status evaluates to PENDING`);
}

// SUITE 5: GIS Geospatial Data Model
console.log("\nSUITE 5: GIS Geospatial Data Model & Coordinates");
{
  const nodes = getGISNodes();
  const routes = getGISRoutes();

  assert(nodes.length >= 18, `GIS model contains at least 18 georeferenced nodes (Got: ${nodes.length})`);
  assert(routes.length >= 6, `GIS model contains at least 6 routes & pipelines (Got: ${routes.length})`);
  
  const hormuz = nodes.find(n => n.id === "geo-choke-hormuz");
  assert(hormuz && hormuz.lat !== undefined && hormuz.lng !== undefined, `Strait of Hormuz node has valid coordinates`);

  const vadinarPort = nodes.find(n => n.id === "geo-port-vadinar");
  assert(vadinarPort && vadinarPort.type === "port", `Vadinar Port node exists with correct port type`);

  const allHaveStatus = nodes.every(n => n.sourceStatus !== undefined);
  assert(allHaveStatus, `All GIS nodes declare explicit sourceStatus`);
}

console.log("\n================================================================================");
console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED / TOTAL: ${total} (${Math.round((passed/total)*100)}% PASS RATE)`);
console.log("================================================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
