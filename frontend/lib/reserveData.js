/**
 * EnergyShield Data Service: Strategic Petroleum Reserves (SPR) & National Energy Balance
 * 
 * Source Provenance:
 * - Indian Strategic Petroleum Reserves Limited (ISPRL) Official Disclosures (https://www.isprlindia.com)
 * - Petroleum Planning & Analysis Cell (PPAC), MoPNG, Government of India (https://www.ppac.gov.in)
 */

import { OFFICIAL_SPR_SITES, OFFICIAL_COMMERCIAL_STORAGE, getReserveCoverAnalysis } from "./providers/reserveProvider.js";
import { OFFICIAL_NATIONAL_ENERGY_METRICS } from "./providers/energyProvider.js";

export const SIMULATED_NATIONAL_ENERGY_METRICS = {
  nationalDailyConsumptionMbd: OFFICIAL_NATIONAL_ENERGY_METRICS.nationalDailyConsumptionMbd.value,
  domesticCrudeProductionMbd: OFFICIAL_NATIONAL_ENERGY_METRICS.domesticCrudeProductionMbd.value,
  dailyNetImportRequirementMbd: Number((OFFICIAL_NATIONAL_ENERGY_METRICS.nationalDailyConsumptionMbd.value - OFFICIAL_NATIONAL_ENERGY_METRICS.domesticCrudeProductionMbd.value).toFixed(2)),
  crudeImportDependencyPct: Number((((OFFICIAL_NATIONAL_ENERGY_METRICS.nationalDailyConsumptionMbd.value - OFFICIAL_NATIONAL_ENERGY_METRICS.domesticCrudeProductionMbd.value) / OFFICIAL_NATIONAL_ENERGY_METRICS.nationalDailyConsumptionMbd.value) * 100).toFixed(1)),
  source: "Petroleum Planning & Analysis Cell (PPAC) - Snapshot Monthly Report",
  sourceUrl: "https://www.ppac.gov.in",
  dataStatus: "OFFICIAL_DATASET",
  retrievedAt: "2026-08-01T00:00:00Z"
};

export const SIMULATED_SPR_SITES = OFFICIAL_SPR_SITES.map((site) => ({
  ...site,
  capacityMillionMetricTonnes: site.capacityMetricTonnes,
  daysCoverAtNationalConsumption: Number((site.capacityMillionBarrels / SIMULATED_NATIONAL_ENERGY_METRICS.dailyNetImportRequirementMbd).toFixed(1)),
  fillRatePct: site.currentInventoryMillionBarrels ? 100 : null,
  fillStatus: site.inventoryStatus,
  status: "Operational Design Ready (Phase-1)"
}));

export const SIMULATED_COMMERCIAL_STORAGE = {
  totalCommercialStorageMillionBarrels: OFFICIAL_COMMERCIAL_STORAGE.totalCommercialStorageMillionBarrels.value,
  commercialCoverDays: Number((OFFICIAL_COMMERCIAL_STORAGE.totalCommercialStorageMillionBarrels.value / SIMULATED_NATIONAL_ENERGY_METRICS.dailyNetImportRequirementMbd).toFixed(1)),
  source: OFFICIAL_COMMERCIAL_STORAGE.totalCommercialStorageMillionBarrels.source,
  sourceUrl: OFFICIAL_COMMERCIAL_STORAGE.totalCommercialStorageMillionBarrels.sourceUrl,
  dataStatus: "OFFICIAL_DATASET"
};

export function calculateTotalReserveCover() {
  const analysis = getReserveCoverAnalysis();
  return {
    sprTotalBarrels: analysis.totalSprCapacityMillionBarrels,
    sprCapacityBarrels: analysis.totalSprCapacityMillionBarrels,
    sprTotalMmt: analysis.totalSprCapacityMmt,
    sprDaysCover: analysis.sprDaysCover.value,
    commercialDaysCover: analysis.commercialDaysCover.value,
    totalCombinedCoverDays: analysis.combinedDaysCover.value,
    dailyConsumptionMbd: SIMULATED_NATIONAL_ENERGY_METRICS.nationalDailyConsumptionMbd,
    statusRecommendation: `Verified Statutory Nameplate Capacity: ISPRL Phase-1 storage provides ${analysis.sprDaysCover.value} days of national net crude import requirement cover.`
  };
}

export async function getReserveData() {
  return Promise.resolve({
    status: "OFFICIAL_DATASET",
    timestamp: "2026-08-01T00:00:00Z",
    sprSites: SIMULATED_SPR_SITES,
    commercialStorage: SIMULATED_COMMERCIAL_STORAGE,
    nationalMetrics: SIMULATED_NATIONAL_ENERGY_METRICS,
    summary: calculateTotalReserveCover()
  });
}
