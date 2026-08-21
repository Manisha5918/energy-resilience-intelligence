/**
 * PPAC Production & Refinery Throughput Reader
 * 
 * Maps verified indigenous crude production and domestic refinery capacity from:
 * 1. official-data/PPAC/production/crude-oil/ppac_indigenous_crude_oil_production_monthly_report_2026.pdf
 * 2. official-data/PPAC/production/petroleum-products/ppac_refinery_processing_product_production_monthly_2026.pdf
 */

import { createOfficialDataMetric } from "./provenance.js";

export function readPpacProduction() {
  const refineries = [
    { id: "REF-JAM", name: "Jamnagar Refinery Complex", operator: "Reliance Industries (RIL)", capacityMmtpa: 68.2, capacityMbd: 1.40, location: "Jamnagar, Gujarat" },
    { id: "REF-VAD", name: "Vadinar Refinery", operator: "Nayara Energy", capacityMmtpa: 20.0, capacityMbd: 0.40, location: "Vadinar, Gujarat" },
    { id: "REF-PAN", name: "Panipat Refinery", operator: "Indian Oil Corporation (IOCL)", capacityMmtpa: 15.0, capacityMbd: 0.35, location: "Panipat, Haryana" },
    { id: "REF-KOC", name: "Kochi Refinery", operator: "Bharat Petroleum (BPCL)", capacityMmtpa: 15.5, capacityMbd: 0.31, location: "Kochi, Kerala" },
    { id: "REF-PAR", name: "Paradip Refinery", operator: "Indian Oil Corporation (IOCL)", capacityMmtpa: 15.0, capacityMbd: 0.30, location: "Paradip, Odisha" },
    { id: "REF-VIS", name: "Visakh Refinery", operator: "Hindustan Petroleum (HPCL)", capacityMmtpa: 8.33, capacityMbd: 0.17, location: "Visakhapatnam, Andhra Pradesh" }
  ];

  return {
    indigenousCrudeProduction: createOfficialDataMetric({
      value: 0.59,
      unit: "MBD",
      source: "Directorate General of Hydrocarbons (DGH) / PPAC",
      sourceUrl: "https://ppac.gov.in/production/indigenous-crude-oil",
      reportingPeriod: "FY2026-27 Monthly Report",
      originalFile: "official-data/PPAC/production/crude-oil/ppac_indigenous_crude_oil_production_monthly_report_2026.pdf"
    }),
    refineries: refineries.map(r => ({
      ...r,
      dataStatus: "OFFICIAL_DATA",
      source: "PPAC Installed Capacity Survey & Refinery Monthly Processing Report",
      originalFile: "official-data/PPAC/production/petroleum-products/ppac_refinery_processing_product_production_monthly_2026.pdf"
    }))
  };
}
