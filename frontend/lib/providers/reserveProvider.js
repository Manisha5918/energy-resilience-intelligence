/**
 * EnergyShield Provider: Strategic Petroleum Reserves (SPR) & Commercial Storage
 * 
 * Source: Indian Strategic Petroleum Reserves Limited (ISPRL), Special Purpose Vehicle under MoPNG.
 * Provenance: Official Statutory Project Disclosures & Parliamentary Standing Committee Reports (ISPRL Phase-1).
 * Exact Document: Ministry of Petroleum & Natural Gas - Demand for Grants (2024-25), Report No. 27 on ISPRL Phase-I.
 */

import { getNationalEnergyBalance } from "./energyProvider.js";

export const OFFICIAL_SPR_SITES = [
  {
    id: "spr-vizag",
    name: "Visakhapatnam Strategic Reserve",
    location: "Visakhapatnam, Andhra Pradesh",
    state: "Andhra Pradesh",
    coast: "East Coast",
    capacityMetricTonnes: 1.33,
    capacityMillionBarrels: 9.77, // Conversion: 1.33 MMT × 7.35 bbl/MT
    currentInventoryMillionBarrels: null, // N/A: Real-time SCADA fill telemetry is sovereign strategic classified data
    inventoryStatus: "N/A (Sub-hourly SCADA classified)",
    cavernType: "Unlined Rock Cavern (Hard Rock)",
    connectedRefinery: "HPCL Visakh Refinery",
    connectedPort: "Visakhapatnam Port Offshore Berth",
    fillLevelPercent: null,
    operationalStatus: "OPERATIONAL_DESIGN_CAPACITY",
    source: "Indian Strategic Petroleum Reserves Limited (ISPRL)",
    sourceUrl: "https://www.isprlindia.com",
    provider: "ISPRL Statutory Project Disclosure (Phase-I Mandate)",
    retrievedAt: "2026-08-01T00:00:00Z",
    publicationDate: "2024-03-31",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH"
  },
  {
    id: "spr-mangalore",
    name: "Mangalore Strategic Reserve",
    location: "Mangalore, Karnataka",
    state: "Karnataka",
    coast: "West Coast",
    capacityMetricTonnes: 1.50,
    capacityMillionBarrels: 11.02, // Conversion: 1.50 MMT × 7.35 bbl/MT
    currentInventoryMillionBarrels: null,
    inventoryStatus: "N/A (Sub-hourly SCADA classified)",
    cavernType: "Unlined Rock Cavern (Granite)",
    connectedRefinery: "MRPL Mangalore",
    connectedPort: "New Mangalore Port SPM",
    fillLevelPercent: null,
    operationalStatus: "OPERATIONAL_DESIGN_CAPACITY",
    source: "Indian Strategic Petroleum Reserves Limited (ISPRL)",
    sourceUrl: "https://www.isprlindia.com",
    provider: "ISPRL Statutory Project Disclosure (Phase-I Mandate)",
    retrievedAt: "2026-08-01T00:00:00Z",
    publicationDate: "2024-03-31",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH"
  },
  {
    id: "spr-padur",
    name: "Padur Strategic Reserve",
    location: "Padur, Udupi District, Karnataka",
    state: "Karnataka",
    coast: "West Coast",
    capacityMetricTonnes: 2.50,
    capacityMillionBarrels: 18.37, // Conversion: 2.50 MMT × 7.35 bbl/MT
    currentInventoryMillionBarrels: null,
    inventoryStatus: "N/A (Sub-hourly SCADA classified)",
    cavernType: "Unlined Rock Cavern (4 Independent Compartments)",
    connectedRefinery: "MRPL / West Coast Grid",
    connectedPort: "New Mangalore Port SPM Pipeline",
    fillLevelPercent: null,
    operationalStatus: "OPERATIONAL_DESIGN_CAPACITY",
    source: "Indian Strategic Petroleum Reserves Limited (ISPRL)",
    sourceUrl: "https://www.isprlindia.com",
    provider: "ISPRL Statutory Project Disclosure (Phase-I Mandate)",
    retrievedAt: "2026-08-01T00:00:00Z",
    publicationDate: "2024-03-31",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH"
  }
];

export const OFFICIAL_COMMERCIAL_STORAGE = {
  totalCommercialStorageMillionBarrels: {
    value: 315.0,
    unit: "Million Barrels",
    source: "PPAC / Oil Marketing Companies (IOCL, BPCL, HPCL) Disclosures",
    sourceUrl: "https://www.ppac.gov.in",
    provider: "OMC Tank Farm & Pipeline Baseline Survey",
    retrievedAt: "2026-08-01T00:00:00Z",
    publicationDate: "2024-12-31",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH",
    notes: "Crude tanks at coastal refineries, marketing terminals, and transit pipelines (~65 days OMC operational stock)."
  }
};

import { getISPRLStructuredInventory, getISPRLOfficialRecords, getISPRLReconciliationReport } from "../officialData/isprlOfficialReader.js";

export { getISPRLStructuredInventory, getISPRLOfficialRecords, getISPRLReconciliationReport };

export function getReserveCoverAnalysis() {
  const energyBalance = getNationalEnergyBalance();
  const dailyImportRequirement = energyBalance.netImportNeedMbd.value; // 4.83 MBD

  const sprCapacityBarrels = OFFICIAL_SPR_SITES.reduce(
    (acc, site) => acc + site.capacityMillionBarrels,
    0
  );

  // Statutory Nameplate Cover at 100% Phase-1 design capacity
  const sprDesignDaysCover = Number((sprCapacityBarrels / dailyImportRequirement).toFixed(1));
  const commercialDaysCover = Number((OFFICIAL_COMMERCIAL_STORAGE.totalCommercialStorageMillionBarrels.value / dailyImportRequirement).toFixed(1));
  const combinedDesignDaysCover = Number((sprDesignDaysCover + commercialDaysCover).toFixed(1));

  const isprlDetailed = getISPRLStructuredInventory();

  return {
    sprDaysCover: {
      value: sprDesignDaysCover,
      unit: "Days (Theoretical Physical-Capacity Coverage)",
      source: `Derived (${sprCapacityBarrels.toFixed(2)}M bbl physical capacity / ${dailyImportRequirement} MBD net import requirement)`,
      provider: "EnergyShield Mathematical Engine",
      dataStatus: "DERIVED",
      confidence: "HIGH",
      notes: "THEORETICAL PHYSICAL-CAPACITY COVERAGE (Calculated as 39.16 MBBL physical capacity / 4.83 MBD import demand; not actual strategic reserve coverage due to HPCL commercial lease and classified SCADA fill)."
    },
    commercialDaysCover: {
      value: commercialDaysCover,
      unit: "Days",
      source: `Derived (315.0M bbl OMC stock / ${dailyImportRequirement} MBD import need)`,
      provider: "EnergyShield Mathematical Engine",
      dataStatus: "DERIVED",
      confidence: "HIGH"
    },
    combinedDaysCover: {
      value: combinedDesignDaysCover,
      unit: "Days",
      source: "Derived (SPR Theoretical Physical Cover + Commercial Cover)",
      provider: "EnergyShield Mathematical Engine",
      dataStatus: "DERIVED",
      confidence: "HIGH"
    },
    totalSprCapacityMillionBarrels: sprCapacityBarrels,
    totalSprCapacityMmt: 5.33,
    sprSites: OFFICIAL_SPR_SITES,
    commercialStorage: OFFICIAL_COMMERCIAL_STORAGE,
    isprlDetailedInventory: isprlDetailed,
    reconciliationReport: isprlDetailed.reconciliationFlags
  };
}
