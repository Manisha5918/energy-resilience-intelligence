/**
 * EnergyShield Data Schema: Strategic Petroleum Reserve Assets
 * 
 * Defines statutory cavern capacities, baseline engineering discharge limits,
 * and current inventory fill levels.
 * 
 * Provenance Status:
 * - Reported Total Strategic Capacity: 5.03 MMT (OFFICIAL - ISPRL About Us)
 * - Cavern Capacities Sum: 5.33 MMT (OFFICIAL - ISPRL Annual Report 2024-25 / Demand for Grants Report No. 27)
 * - Reconciliation Note: Visakhapatnam consists of Cavern A (1.03 MMT strategic) + Cavern B (0.30 MMT HPCL leased).
 * - Discharge Pump Limits: MODEL_ASSUMPTION (Heuristic engineering rating — verify with ISPRL)
 * - Real-time SCADA Inventory: PENDING_VALIDATION / SIMULATED (Strategic sovereign classified)
 */

export const CRUDE_DENSITY_CONVERSION_ASSUMPTION = {
  value: 7.35,
  unit: "bbl/MT",
  classification: "MODEL_CONVERSION_ASSUMPTION",
  description: "Benchmark conversion based on assumed crude density (~33° API Indian basket average)",
  applicability: "Scenario-level conversion; not crude-grade specific",
  note: "Crude-specific density/API conversion required for operational-grade volumetric calculations."
};

export const RESERVE_ASSETS_SCHEMA = [
  {
    id: "spr-vizag",
    name: "Visakhapatnam",
    fullName: "Visakhapatnam Strategic Reserve",
    state: "Andhra Pradesh",
    coast: "East Coast",
    capacityMMT: 1.33,
    cavernA_CapacityMMT: 1.03, // Strategic portion
    cavernB_HpclLeasedMMT: 0.30, // HPCL leased portion
    capacityMillionBarrels: 9.78, // 1.33 MMT * 7.35 bbl/MT = 9.7755 -> 9.78 MBBL
    currentFillMillionBarrels: 8.30,
    currentFillPercent: 85.0,
    maxWithdrawalMBD: 0.65, // Model assumption heuristic pump rating
    dischargeMethod: "Cavern Submersible Pumps to HPCL Pipeline",
    connectedRefinery: "HPCL Visakh Refinery (0.17 MBD)",
    sourceStatus: "SIMULATED",
    fillStatus: "PENDING_VALIDATION / SCENARIO_ONLY",
    capacityStatus: "OFFICIAL",
    withdrawalLimitStatus: "MODEL_ASSUMPTION",
    notes: "Capacity verified via ISPRL. Current fill level is simulated scenario pending official SCADA disclosure."
  },
  {
    id: "spr-mangalore",
    name: "Mangalore",
    fullName: "Mangalore Strategic Reserve",
    state: "Karnataka",
    coast: "West Coast",
    capacityMMT: 1.50,
    cavernA_CapacityMMT: 0.75,
    cavernB_CapacityMMT: 0.75,
    mrplLeasedMMT: 0.76, // Agreement signed 06-Jan-2025
    capacityMillionBarrels: 11.03, // 1.50 MMT * 7.35 bbl/MT = 11.025 -> 11.03 MBBL
    currentFillMillionBarrels: 9.35,
    currentFillPercent: 84.8,
    maxWithdrawalMBD: 0.75,
    dischargeMethod: "Gravity Feed & High-Pressure Booster Pumps to MRPL & SPM",
    connectedRefinery: "MRPL Mangalore (0.30 MBD)",
    sourceStatus: "SIMULATED",
    fillStatus: "PENDING_VALIDATION / SCENARIO_ONLY",
    capacityStatus: "OFFICIAL",
    withdrawalLimitStatus: "MODEL_ASSUMPTION",
    notes: "Capacity verified via ISPRL. Real-time telemetry is classified national strategic inventory."
  },
  {
    id: "spr-padur",
    name: "Padur",
    fullName: "Padur Strategic Reserve",
    state: "Karnataka",
    coast: "West Coast",
    capacityMMT: 2.50,
    numberOfCaverns: 4,
    capacityPerCavernMMT: 0.625,
    capacityMillionBarrels: 18.37, // 2.50 MMT * 7.35 bbl/MT = 18.375 -> 18.37 MBBL (sum: 9.78 + 11.03 + 18.37 = 39.18 MBBL)
    currentFillMillionBarrels: 15.60,
    currentFillPercent: 84.9,
    maxWithdrawalMBD: 1.10,
    dischargeMethod: "Multi-Bay Pipeline to Mangalore SPM & MRPL",
    connectedRefinery: "MRPL & Coastal Pipeline Network",
    sourceStatus: "SIMULATED",
    fillStatus: "PENDING_VALIDATION / SCENARIO_ONLY",
    capacityStatus: "OFFICIAL",
    withdrawalLimitStatus: "MODEL_ASSUMPTION",
    notes: "Capacity verified via ISPRL Phase-I (4 x 0.625 MMT). Fill telemetry is modeled assumption."
  }
];

export const SPR_SYSTEM_CONSTRAINTS = {
  totalReportedStrategicCapacityMMT: 5.03, // Sourced from ISPRL About Us
  totalCavernCapacityMMT: 5.33, // Sum of 1.33 + 1.50 + 2.50 MMT
  totalCapacityMillionBarrels: 39.18, // 5.33 MMT * 7.35 bbl/MT = 39.1755 -> 39.18 MBBL
  totalSimulatedStockMillionBarrels: 33.25,
  maxAggregateWithdrawalMBD: 2.50, // MODEL_ASSUMPTION: Aggregate pump ceiling
  emergencyReserveFloorPercent: 20.0, // Minimum reserve floor (20% threshold)
  emergencyReserveFloorDays: 3.0,
  refillLeadTimeDays: 45,
  reconciliationNote: "Reported total strategic capacity is 5.03 MMT. Sum of cavern physical capacities is 5.33 MMT (Vizag 1.33 + Mangalore 1.50 + Padur 2.50). The 0.30 MMT delta represents HPCL leased commercial capacity in Visakhapatnam Cavern B."
};

export function getReserveAssets() {
  return RESERVE_ASSETS_SCHEMA.map(asset => ({ ...asset }));
}
