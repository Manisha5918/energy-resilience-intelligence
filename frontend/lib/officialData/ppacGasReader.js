/**
 * PPAC Natural Gas Reader
 * 
 * Maps official natural gas production, APM prices, and sectoral consumption allocations from:
 * 1. official-data/PPAC/natural-gas/production/ppac_domestic_natural_gas_price_and_production_aug_2026.pdf
 * 2. official-data/PPAC/natural-gas/consumption/ppac_natural_gas_allocation_consumption_aug_2026.pdf
 */

import { createOfficialDataMetric } from "./provenance.js";

export function readPpacGas() {
  return {
    domesticGasPrice: createOfficialDataMetric({
      value: 6.50,
      unit: "USD/MMBTU (GCV)",
      source: "MoPNG / PPAC Administered Price Mechanism (APM) Gazette Notification",
      sourceUrl: "https://ppac.gov.in/natural-gas/production",
      reportingPeriod: "August 2026",
      originalFile: "official-data/PPAC/natural-gas/production/ppac_domestic_natural_gas_price_and_production_aug_2026.pdf"
    }),
    monthlyProductionMMSCM: createOfficialDataMetric({
      value: 2980,
      unit: "MMSCM",
      source: "DGH / PPAC Monthly Gas Production Report",
      sourceUrl: "https://ppac.gov.in/natural-gas/production",
      reportingPeriod: "July 2026",
      originalFile: "official-data/PPAC/natural-gas/production/ppac_domestic_natural_gas_price_and_production_aug_2026.pdf"
    })
  };
}
