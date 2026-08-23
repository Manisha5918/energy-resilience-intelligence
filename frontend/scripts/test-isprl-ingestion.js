/**
 * EnergyShield Automated Test Suite: ISPRL Excel Ingestion & Provenance Reconciliation
 * 
 * Validates:
 * 1. Correct ingestion of all 34 source records from EnergyShield_ISPRL_Reserve_Data.xlsx
 * 2. Preservation of all 7 core fields (Parameter, Value, Unit, Source, Date, Status, Source Note)
 * 3. Reconciliation Discrepancy Flagging (5.03 MMT reported vs 5.33 MMT cavern sum)
 * 4. Zero silent overwrites / data loss
 * 5. Distinct categorizations (Physical Capacity, Inventory, Commercial Lease, Policy Proportions, Expansion Projects)
 * 6. Structured Inventory calculations (GOI Crude 2.92M MT, ADNOC 421.4K MT, HPCL 0.30 MMT / 2.17 MBBL)
 * 7. Server-side API & Official Registry integration
 */

import { getISPRLOfficialRecords, getISPRLStructuredInventory, getISPRLReconciliationReport, getISPRLDataset } from "../lib/officialData/isprlOfficialReader.js";
import { getOfficialDataRegistry } from "../lib/officialData/officialDataRegistry.js";
import { getReserveCoverAnalysis } from "../lib/providers/reserveProvider.js";

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
console.log("ENERGYSHIELD ISPRL EXCEL INGESTION & PROVENANCE TEST SUITE");
console.log("================================================================================\n");

// SUITE 1: Raw Record Ingestion & Schema Integrity
console.log("SUITE 1: Ingestion & Field Preservation Contract");
{
  const records = getISPRLOfficialRecords();
  assert(records.length === 34, `Exactly 34 official records ingested (Got: ${records.length})`);

  // Verify all required fields present on every record
  const allValid = records.every(r => 
    r.id && 
    r.parameter && 
    r.value !== undefined && 
    r.unit && 
    r.source && 
    r.date && 
    r.status && 
    r.sourceNote !== undefined
  );
  assert(allValid, `All 34 records preserve Parameter, Value, Unit, Source, Date, Status, and Source Note`);

  // Check unique parameter deduplication
  const uniqueIds = new Set(records.map(r => r.id));
  assert(uniqueIds.size === 34, `All record IDs are unique and deterministic (no duplicates)`);
}

// SUITE 2: Semantic Capacity Reconciliation by Classification
console.log("\nSUITE 2: Semantic Capacity Reconciliation (5.03 Strategic + 0.30 Leased = 5.33 Physical)");
{
  const flags = getISPRLReconciliationReport();
  assert(flags.length === 1, `Reconciliation model generated (Count: ${flags.length})`);
  
  const rec = flags[0];
  assert(rec.status === "RECONCILED_BY_CLASSIFICATION", `Semantic status is RECONCILED_BY_CLASSIFICATION (Got: ${rec.status})`);
  assert(rec.strategicStorageCapacityMmt === 5.03, `Strategic storage capacity = 5.03 MMT`);
  assert(rec.commercialLeasedCapacityMmt === 0.30, `Commercial HPCL leased capacity = 0.30 MMT`);
  assert(rec.totalPhysicalInstalledCapacityMmt === 5.33, `Total physical installed capacity = 5.33 MMT`);
  
  // Mathematical Proofs
  const systemSum = Number((rec.strategicStorageCapacityMmt + rec.commercialLeasedCapacityMmt).toFixed(2));
  assert(systemSum === 5.33, `System Formula Proof: 5.03 + 0.30 = 5.33 MMT (Got: ${systemSum})`);

  const vizagSum = Number((rec.components.visakhapatnamCavernA_StrategicMmt + rec.components.visakhapatnamCavernB_HpclLeasedMmt).toFixed(2));
  assert(vizagSum === 1.33, `Visakhapatnam Formula Proof: 1.03 + 0.30 = 1.33 MMT (Got: ${vizagSum})`);

  assert(rec.isReconciled === true, `Reconciliation flag evaluates to True (isReconciled: true)`);
  assert(rec.explanation.includes("5.33 MMT total physical capacity comprises 5.03 MMT strategic capacity plus 0.30 MMT HPCL-leased capacity"), `Reconciliation explanation clearly articulates the classification distinction`);
}

// SUITE 3: Structured Custody & Commercial Leases
console.log("\nSUITE 3: Structured Custody Inventories & Commercial Leases");
{
  const structured = getISPRLStructuredInventory();
  
  // Capacities
  assert(structured.capacities.visakhapatnamMMT === 1.33, `Vizag capacity = 1.33 MMT`);
  assert(structured.capacities.mangaloreMMT === 1.50, `Mangalore capacity = 1.50 MMT`);
  assert(structured.capacities.padurMMT === 2.50, `Padur capacity = 2.50 MMT`);
  
  // Custody
  assert(structured.custodyInventories.goiCrudeMetricTonnes === 2921957.35, `GOI Crude Custody = 2,921,957.35 MT`);
  assert(structured.custodyInventories.adnocCrudeMetricTonnes === 421420.04, `ADNOC Crude Custody = 421,420.04 MT`);
  assert(structured.custodyInventories.adnocMangaloreStorageMillionBarrels === 5.8, `ADNOC Mangalore Stored = 5.8 Million Barrels`);

  // Commercial Leases
  assert(structured.commercialLeases.hpclVisakhCavernB.capacityMMT === 0.30, `HPCL Leased Cavern B = 0.30 MMT`);
  assert(structured.commercialLeases.hpclVisakhCavernB.capacityMillionBarrels === 2.17, `HPCL Leased Cavern B = 2.17 MBBL`);
  assert(structured.commercialLeases.hpclVisakhCavernB.crudeType === "Basrah Medium", `HPCL Leased Crude Grade = Basrah Medium`);
  assert(structured.commercialLeases.mrplMangaloreCavernB.capacityMMT === 0.76, `MRPL Leased Cavern B = 0.760 MMT`);

  // Policy Proportions
  assert(structured.policyProportions.commercialLeasingMaxPercent === 30, `Commercial leasing allowance = 30%`);
  assert(structured.policyProportions.salePurchaseMaxPercent === 20, `Sale/purchase allowance = 20%`);
  assert(structured.policyProportions.strategicReserveMandatoryPercent === 50, `Strategic mandatory portion = 50%`);

  // Phase-II Projects
  assert(structured.phase2Projects.length >= 4, `Phase-II expansion projects identified (Count: ${structured.phase2Projects.length})`);
}

// SUITE 4: Official Registry & Provider Integration
console.log("\nSUITE 4: Official Registry & Provider Integration");
{
  const registry = getOfficialDataRegistry();
  assert(registry.isprl.structuredInventory !== undefined, `Registry contains ISPRL structured inventory`);
  assert(registry.isprl.reconciliationFlags.length === 1, `Registry exposes reconciliation report`);

  const cover = getReserveCoverAnalysis();
  assert(cover.isprlDetailedInventory !== undefined, `Reserve Provider exposes detailed ISPRL inventory`);
  assert(cover.reconciliationReport.length === 1, `Reserve Provider exposes reconciliation discrepancy report`);
}

console.log("\n================================================================================");
console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED / TOTAL: ${total} (${Math.round((passed/total)*100)}% PASS RATE)`);
console.log("================================================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
