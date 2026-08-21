/**
 * PPAC Snapshot Data Reader
 * 
 * Maps statutory macro energy metrics from the official PPAC Snapshot:
 * official-data/PPAC/ready-reckoner/ppac_snapshot_of_india_oil_and_gas_data_july_2026.pdf
 */

import { createOfficialDataMetric, createDerivedMetric } from "./provenance.js";

export function readPpacSnapshot() {
  const consumptionMetric = createOfficialDataMetric({
    value: 5.42,
    unit: "MBD",
    source: "Petroleum Planning & Analysis Cell (PPAC)",
    sourceUrl: "https://ppac.gov.in",
    reportingPeriod: "July 2026 (Monthly Snapshot Table 1)",
    originalFile: "official-data/PPAC/ready-reckoner/ppac_snapshot_of_india_oil_and_gas_data_july_2026.pdf",
    notes: "Total national domestic consumption of petroleum products (POL)"
  });

  const productionMetric = createOfficialDataMetric({
    value: 0.59,
    unit: "MBD",
    source: "Directorate General of Hydrocarbons (DGH) / PPAC",
    sourceUrl: "https://ppac.gov.in/production/indigenous-crude-oil",
    reportingPeriod: "July 2026 (Monthly Snapshot Table 3)",
    originalFile: "official-data/PPAC/production/crude-oil/ppac_indigenous_crude_oil_production_monthly_report_2026.pdf",
    notes: "Total indigenous crude oil and condensate extraction rate"
  });

  const netImportMbd = Number((consumptionMetric.value - productionMetric.value).toFixed(2));
  const importDepPercent = Number(((netImportMbd / consumptionMetric.value) * 100).toFixed(1));

  const netImportMetric = createDerivedMetric({
    value: netImportMbd,
    unit: "MBD",
    formula: "consumptionMbd (5.42) - domesticProductionMbd (0.59)",
    sourceInputs: [
      "PPAC Snapshot Table 1 (Consumption)",
      "PPAC Snapshot Table 3 (Indigenous Production)"
    ],
    description: "Net crude import requirement necessary to sustain domestic demand"
  });

  const importDependencyMetric = createDerivedMetric({
    value: importDepPercent,
    unit: "%",
    formula: "(netImportRequirementMbd / consumptionMbd) * 100",
    sourceInputs: [
      "Derived Net Import Need (4.83 MBD)",
      "PPAC Snapshot Table 1 Consumption (5.42 MBD)"
    ],
    description: "National import dependency ratio on foreign crude oil supplies"
  });

  return {
    consumption: consumptionMetric,
    domesticProduction: productionMetric,
    netImportRequirement: netImportMetric,
    importDependency: importDependencyMetric
  };
}
