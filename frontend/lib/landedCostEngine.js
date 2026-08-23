/**
 * EnergyShield Landed Cost Engine
 * 
 * Computes transparent, itemized landed crude cost per barrel ($/bbl)
 * across supplier and maritime route combinations.
 * 
 * Formula:
 * Landed Cost = Base Crude Spot Price
 *             + Freight Benchmark
 *             + War-Risk Insurance Surcharge
 *             + Route Latency / Bunker Surcharge
 *             + Port Handling & Demurrage Buffer
 * 
 * NOTE: All cost figures are SIMULATED / ILLUSTRATIVE decision-support calculations.
 */

import { SIMULATED_CRUDE_PRICES } from "./riskData.js";

export const BENCHMARK_FREIGHT_RATES = {
  "persian_gulf": 3.80,    // $/bbl VLCC Ras Tanura/Basra to West Coast
  "red_sea_suez": 5.40,    // $/bbl via Suez & Bab-el-Mandeb
  "cape_atlantic": 8.20,   // $/bbl Long-haul Cape route (US Gulf / West Africa / Baltic)
  "arabian_sea_direct": 2.90 // $/bbl Fujairah / Oman Gulf direct lift
};

/**
 * Calculate landed cost breakdown for a supplier + route pairing
 */
export function calculateLandedCost({
  supplierId,
  routeId,
  basePrice = SIMULATED_CRUDE_PRICES.spotPriceUsd,
  warRiskLevel = "MODERATE", // LOW | MODERATE | HIGH | CRITICAL
  freightMultiplier = 1.0,
  isDiscountedGrade = false
}) {
  let gradeAdjustment = 0; // $/bbl vs Brent benchmark
  if (supplierId === "russia") gradeAdjustment = -6.50; // Discounted Urals
  else if (supplierId === "iraq") gradeAdjustment = -2.80; // Basrah Heavy discount
  else if (supplierId === "saudi_arabia") gradeAdjustment = +0.75; // Arab Light official selling price
  else if (supplierId === "uae") gradeAdjustment = +1.10; // Murban premium
  else if (supplierId === "usa") gradeAdjustment = +0.20; // WTI Midland
  else if (supplierId === "west_africa") gradeAdjustment = +1.40; // Bonny Light sweet premium

  let baseFreight = BENCHMARK_FREIGHT_RATES.persian_gulf;
  if (routeId?.includes("cape") || supplierId === "usa" || supplierId === "west_africa") {
    baseFreight = BENCHMARK_FREIGHT_RATES.cape_atlantic;
  } else if (routeId?.includes("redsea")) {
    baseFreight = BENCHMARK_FREIGHT_RATES.red_sea_suez;
  } else if (supplierId === "uae") {
    baseFreight = BENCHMARK_FREIGHT_RATES.arabian_sea_direct;
  }

  const adjustedFreight = Number((baseFreight * freightMultiplier).toFixed(2));

  let warRiskSurcharge = 0.50;
  if (warRiskLevel === "CRITICAL") warRiskSurcharge = 4.20;
  else if (warRiskLevel === "HIGH") warRiskSurcharge = 2.60;
  else if (warRiskLevel === "MODERATE") warRiskSurcharge = 1.20;

  let routePremium = 0;
  if (routeId?.includes("cape")) routePremium = 2.40; // Extended voyage bunker cost
  else if (routeId?.includes("redsea") && warRiskLevel === "CRITICAL") routePremium = 3.10;

  const portHandling = 0.85;

  const rawLandedCost = basePrice + gradeAdjustment + adjustedFreight + warRiskSurcharge + routePremium + portHandling;
  const netLandedCostUsd = Number(rawLandedCost.toFixed(2));

  return {
    supplierId,
    routeId,
    basePriceUsd: basePrice,
    gradeAdjustmentUsd: gradeAdjustment,
    adjustedFreightUsd: adjustedFreight,
    warRiskSurchargeUsd: warRiskSurcharge,
    routePremiumUsd: routePremium,
    portHandlingUsd: portHandling,
    netLandedCostUsd,
    itemizedFormula: `$${basePrice} (Base) + $${gradeAdjustment} (Grade) + $${adjustedFreight} (Freight) + $${warRiskSurcharge} (War-Risk) + $${routePremium} (Route) + $${portHandling} (Port) = $${netLandedCostUsd}/bbl`
  };
}
