/**
 * EnergyShield Master Test Suite Runner
 * Executes all 8 automated test suites and tallies overall pass counts and rates.
 */

import { execSync } from "child_process";

const testSuites = [
  { name: "Accuracy-First Hardening & Rules 1-11", file: "scripts/test-accuracy-hardening.js" },
  { name: "Phase 14 Independent Mathematical Cross-Check", file: "scripts/test-independent-crosscheck.js" },
  { name: "Phase 11 Adversarial Failure-Modes & Stress", file: "scripts/test-adversarial-failure-modes.js" },
  { name: "ISPRL Ingestion & Classification Proofs", file: "scripts/test-isprl-ingestion.js" },
  { name: "Phase 8 Modules & Boundary Physics", file: "scripts/test-phase8-modules.js" },
  { name: "Core Backend Architecture", file: "scripts/test-backend-suite.js" },
  { name: "Input-Output Reactivity & Sensitivity", file: "scripts/test-input-output-reactivity.js" },
  { name: "API Contracts & Domain Endpoints", file: "scripts/test-api-contracts.js" }
];

console.log("================================================================================");
console.log("ENERGYSHIELD MASTER AUTOMATED TEST RUNNER (ALL SUITES)");
console.log("================================================================================\n");

let allPassed = true;
let totalPassedCount = 0;
let totalFailedCount = 0;

for (const suite of testSuites) {
  try {
    console.log(`\n>>> RUNNING: ${suite.name} (${suite.file})`);
    const output = execSync(`node ${suite.file}`, { encoding: "utf-8" });
    console.log(output);
    console.log(`[PASS] ${suite.name} passed.`);
  } catch (err) {
    allPassed = false;
    console.error(`\n[FAIL] Suite failed: ${suite.name}`);
    console.error(err.stdout || err.message);
  }
}

console.log("================================================================================");
if (allPassed) {
  console.log("MASTER TEST SUITE SUMMARY: ALL 8 TEST SUITES COMPLETED WITH 100% PASS RATE!");
} else {
  console.log("MASTER TEST SUITE SUMMARY: ONE OR MORE SUITES FAILED.");
  process.exit(1);
}
console.log("================================================================================\n");
