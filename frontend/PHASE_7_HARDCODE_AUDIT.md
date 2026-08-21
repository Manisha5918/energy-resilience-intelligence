# EnergyShield Phase 7: Hardcoded Factual Values Audit

**Audit Date**: August 2026  
**Auditor**: Antigravity AI Systems Engine  
**Objective**: Identify all factual numerical values and map them directly to ingested official files in `official-data/PPAC/` and verified statutory disclosures.

---

## 1. Codebase Factual Value Audit Matrix

| File | Current Value / Metric | Current Source / Classification | Required Ingested Official Source | Action |
| :--- | :--- | :--- | :--- | :--- |
| **`lib/providers/energyProvider.js`** | `5.42 MBD` (National Consumption) | `OFFICIAL_DATASET` (PPAC Snapshot Table 1) | `official-data/PPAC/ready-reckoner/ppac_snapshot_of_india_oil_and_gas_data_july_2026.pdf` | Connect to `ppacSnapshotReader.js` |
| **`lib/providers/energyProvider.js`** | `0.59 MBD` (Domestic Crude Production) | `OFFICIAL_DATASET` (DGH / PPAC Table 3) | `official-data/PPAC/production/crude-oil/ppac_indigenous_crude_oil_production_monthly_report_2026.pdf` | Connect to `ppacProductionReader.js` |
| **`lib/providers/energyProvider.js`** | `4.83 MBD` (Net Import Need) | `DERIVED` ($5.42 - 0.59$) | Mathematical derivation from official inputs | Derive via `ppacSnapshotReader.js` |
| **`lib/providers/energyProvider.js`** | `89.1%` (Import Dependency Rate) | `DERIVED` ($(4.83 / 5.42) \times 100$) | Mathematical derivation from official inputs | Derive via `ppacSnapshotReader.js` |
| **`lib/providers/reserveProvider.js`** | `1.33 MMT / 9.77M bbl` (Vizag Cavern) | `OFFICIAL_DATASET` (ISPRL Phase-1 Report) | `official-data/ISPRL/visakhapatnam/isprl-source.md` | Preserve statutory design capacity |
| **`lib/providers/reserveProvider.js`** | `1.50 MMT / 11.02M bbl` (Mangalore Cavern) | `OFFICIAL_DATASET` (ISPRL Phase-1 Report) | `official-data/ISPRL/mangalore/isprl-source.md` | Preserve statutory design capacity |
| **`lib/providers/reserveProvider.js`** | `2.50 MMT / 18.37M bbl` (Padur Cavern) | `OFFICIAL_DATASET` (ISPRL Phase-1 Report) | `official-data/ISPRL/padur/isprl-source.md` | Preserve statutory design capacity |
| **`lib/providers/reserveProvider.js`** | `null` (Subsea Real-Time SCADA Inventory) | `UNAVAILABLE` (Classified defense data) | `official-data/ISPRL/live-inventory/` | Explicitly preserve `null / UNAVAILABLE` |
| **`lib/providers/reserveProvider.js`** | `8.1 Days` (SPR Cover) | `DERIVED` ($39.16\text{M} / 4.83\text{ MBD}$) | Mathematical derivation from official capacity & balance | Derive dynamically in reader |
| **`lib/providers/reserveProvider.js`** | `65.2 Days` (Commercial OMC Cover) | `DERIVED` ($315.0\text{M} / 4.83\text{ MBD}$) | Mathematical derivation from OMC storage survey | Derive dynamically in reader |
| **`lib/providers/supplierProvider.js`** | Bilateral Trade Shares (Russia 33.8%, Iraq 21.0%, Saudi 16.1%, UAE 9.0%, USA 8.1%, Kuwait 5.1%, WAF 6.9%) | `OFFICIAL_DATASET` (DGCIS HS Code `27090000`) | `official-data/DGCIS/` customs records & PPAC Trade | Connect to `ppacTradeReader.js` |
| **`lib/providers/supplierProvider.js`** | `2,063 Points` (HHI Concentration) | `DERIVED` ($\sum s_i^2$) | Mathematical derivation from DGCIS shares | Derive dynamically in reader |
| **`lib/providers/refineryProvider.js`** | Refinery Capacities (Jamnagar 1.40, Vadinar 0.40, Panipat 0.35, Kochi 0.31, Paradip 0.30, Visakh 0.17 MBD) | `OFFICIAL_DATASET` (PPAC Installed Capacity) | `official-data/PPAC/production/petroleum-products/` | Connect to `ppacProductionReader.js` |
| **`lib/providers/marketProvider.js`** | `$84.65 / bbl` (Benchmark Brent Baseline) | `OFFICIAL_DATASET` (EIA / ICE Dated Benchmark) | `official-data/PPAC/prices/indian-crude-basket/` | Connect to `ppacPriceReader.js` |
| **`lib/riskData.js`** | 5-Factor Risk Component Weights ($0.30, 0.25, 0.20, 0.15, 0.10$) | `MODEL_CONFIGURATION` | Algorithmic configuration parameter | Retain as explicit `MODEL_CONFIGURATION` |
| **`lib/scenarioEngine.js`** | Disruption severity, duration sliders | `USER_SCENARIO_ASSUMPTION` | Synthetic analyst stress-test parameter | Retain as explicit `USER_SCENARIO_ASSUMPTION` |

---

## 2. Distinction of Value Types

- **`OFFICIAL_DATA`**: Raw primary factual metrics loaded directly from verified statutory files in `official-data/`.
- **`DERIVED_VALUE`**: Calculated values with explicit mathematical formulas referencing official inputs.
- **`MODEL_CONFIGURATION`**: Formula weights, score thresholds, and optimization penalty parameters.
- **`USER_SCENARIO_ASSUMPTION`**: Simulation slider values and hypothetical stress tests.
- **`UNAVAILABLE`**: Unmetered or defense-classified metrics (e.g. real-time subsea cavern inventory).
