/**
 * PPAC Price Benchmark Reader
 * 
 * Maps official Indian Crude Basket (ICB) and retail selling price benchmarks from:
 * 1. official-data/PPAC/prices/indian-crude-basket/ppac_indian_crude_basket_ratio_notification_july_2026.pdf
 * 2. official-data/PPAC/prices/petrol/ppac_daily_price_petrol_metro_july_2026.pdf
 * 3. official-data/PPAC/prices/diesel/ppac_daily_price_diesel_metro_july_2026.pdf
 */

import { createOfficialDataMetric } from "./provenance.js";

export function readPpacPrices() {
  return {
    indianCrudeBasket: createOfficialDataMetric({
      value: 84.65,
      unit: "USD/bbl",
      source: "Petroleum Planning & Analysis Cell (PPAC)",
      sourceUrl: "https://ppac.gov.in/prices/international-prices-of-crude-oil",
      reportingPeriod: "July/August 2026 Effective Benchmark",
      originalFile: "official-data/PPAC/prices/indian-crude-basket/ppac_indian_crude_basket_ratio_notification_july_2026.pdf",
      notes: "Official weighted benchmark based on 75.62% Sour (Oman/Dubai) and 24.38% Sweet (Brent)"
    }),
    petrolRspDelhi: createOfficialDataMetric({
      value: 94.72,
      unit: "INR/Litre",
      source: "PPAC Daily Price Notification (IOCL Outlet Delhi)",
      sourceUrl: "https://ppac.gov.in/prices/international-prices-of-petrol",
      reportingPeriod: "July 2026",
      originalFile: "official-data/PPAC/prices/petrol/ppac_daily_price_petrol_metro_july_2026.pdf"
    }),
    dieselRspDelhi: createOfficialDataMetric({
      value: 87.62,
      unit: "INR/Litre",
      source: "PPAC Daily Price Notification (IOCL Outlet Delhi)",
      sourceUrl: "https://ppac.gov.in/prices/international-prices-of-petrol",
      reportingPeriod: "July 2026",
      originalFile: "official-data/PPAC/prices/diesel/ppac_daily_price_diesel_metro_july_2026.pdf"
    })
  };
}
