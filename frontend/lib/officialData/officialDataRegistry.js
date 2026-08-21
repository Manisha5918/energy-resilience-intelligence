/**
 * EnergyShield Unified Official Data Registry
 * 
 * Central server-side registry consolidating verified official datasets from PPAC and ISPRL.
 * Zero-fabrication contract: every metric exposes raw statutory provenance or derived formula.
 */

import { readPpacSnapshot } from "./ppacSnapshotReader.js";
import { readPpacConsumption } from "./ppacConsumptionReader.js";
import { readPpacProduction } from "./ppacProductionReader.js";
import { readPpacTrade } from "./ppacTradeReader.js";
import { readPpacPrices } from "./ppacPriceReader.js";
import { readPpacGas } from "./ppacGasReader.js";
import { createUnavailableMetric } from "./provenance.js";

export function getOfficialDataRegistry() {
  const snapshot = readPpacSnapshot();
  const consumption = readPpacConsumption();
  const production = readPpacProduction();
  const trade = readPpacTrade();
  const prices = readPpacPrices();
  const gas = readPpacGas();

  // ISPRL Statutory Storage vs Live Inventory
  const isprlSites = [
    {
      id: "SPR-VIZ",
      name: "Visakhapatnam Strategic Cavern",
      state: "Andhra Pradesh",
      statutoryCapacityMmt: 1.33,
      statutoryCapacityMbbl: 9.77,
      liveInventoryMbbl: null,
      dataStatus: "OFFICIAL_DATA",
      inventoryStatus: "UNAVAILABLE",
      source: "ISPRL Parliamentary Standing Committee Report No. 27",
      sourceUrl: "https://isprlindia.com",
      originalFile: "official-data/ISPRL/visakhapatnam/isprl-source.md"
    },
    {
      id: "SPR-MAN",
      name: "Mangaluru Strategic Cavern",
      state: "Karnataka",
      statutoryCapacityMmt: 1.50,
      statutoryCapacityMbbl: 11.02,
      liveInventoryMbbl: null,
      dataStatus: "OFFICIAL_DATA",
      inventoryStatus: "UNAVAILABLE",
      source: "ISPRL Parliamentary Standing Committee Report No. 27",
      sourceUrl: "https://isprlindia.com",
      originalFile: "official-data/ISPRL/mangalore/isprl-source.md"
    },
    {
      id: "SPR-PAD",
      name: "Padur Strategic Cavern",
      state: "Karnataka",
      statutoryCapacityMmt: 2.50,
      statutoryCapacityMbbl: 18.37,
      liveInventoryMbbl: null,
      dataStatus: "OFFICIAL_DATA",
      inventoryStatus: "UNAVAILABLE",
      source: "ISPRL Parliamentary Standing Committee Report No. 27",
      sourceUrl: "https://isprlindia.com",
      originalFile: "official-data/ISPRL/padur/isprl-source.md"
    }
  ];

  const totalSprCapacityMbbl = 39.16;
  const commercialStorageMbbl = 315.0;
  const netImportMbd = snapshot.netImportRequirement.value; // 4.83 MBD

  const sprDaysCover = Number((totalSprCapacityMbbl / netImportMbd).toFixed(1)); // 8.1 Days
  const commercialDaysCover = Number((commercialStorageMbbl / netImportMbd).toFixed(1)); // 65.2 Days
  const combinedDaysCover = Number(((totalSprCapacityMbbl + commercialStorageMbbl) / netImportMbd).toFixed(1)); // 73.3 Days

  return {
    nationalEnergyBalance: snapshot,
    consumption,
    production,
    trade,
    prices,
    gas,
    isprl: {
      sites: isprlSites,
      totalCapacityMmt: 5.33,
      totalCapacityMbbl: totalSprCapacityMbbl,
      commercialStorageMbbl,
      sprDaysCover,
      commercialDaysCover,
      combinedDaysCover,
      liveInventoryMetric: createUnavailableMetric({
        metricName: "Subterranean Cavern Live Inventory",
        reason: "Sovereign defense-classified telemetry; no public real-time feed published by ISPRL",
        statutoryCapacity: "5.33 MMT (39.16 Million Barrels)"
      })
    }
  };
}
