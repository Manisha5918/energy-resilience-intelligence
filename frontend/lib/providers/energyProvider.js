/**
 * EnergyShield Provider: National Energy Statistics
 * 
 * Source: Petroleum Planning & Analysis Cell (PPAC), Ministry of Petroleum & Natural Gas (MoPNG), Government of India.
 * Exact Document: PPAC "Snapshot of India's Oil & Gas Sector" (Monthly Snapshot, Table 1 & Table 3, FY2024-25 / FY2025-26).
 * Provenance: Official Monthly Hydrocarbon Reports.
 */

import { readPpacSnapshot } from "../officialData/ppacSnapshotReader.js";

const snapshot = readPpacSnapshot();

export const OFFICIAL_NATIONAL_ENERGY_METRICS = {
  nationalDailyConsumptionMbd: {
    ...snapshot.consumption,
    metricTonnesPerAnnum: 233.3,
    provider: "PPAC Monthly Report (Table 1: Domestic Petroleum Consumption)"
  },
  domesticCrudeProductionMbd: {
    ...snapshot.domesticProduction,
    metricTonnesPerAnnum: 29.4,
    provider: "DGH / PPAC Monthly Production Report (Table 3: Indigenous Crude Production)"
  }
};

/**
 * Compute derived energy balance from verified official inputs
 */
export function getNationalEnergyBalance() {
  const snapshotData = readPpacSnapshot();

  return {
    consumptionMbd: snapshotData.consumption,
    productionMbd: snapshotData.domesticProduction,
    netImportNeedMbd: snapshotData.netImportRequirement,
    importDependencyPercent: snapshotData.importDependency
  };
}
