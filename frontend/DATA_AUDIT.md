# EnergyShield Data Integrity & Provenance Audit

**Audit Date**: August 2026  
**Scope**: Full Codebase Scan (`frontend/lib/`, `frontend/components/`, `frontend/app/`, `frontend/app/api/`)  
**Objective**: Identify all hardcoded factual/business data, categorize each value, and establish real official source provenance or derived computation rules.

---

## 1. Classification Categories

1. **`REAL_SOURCE_REQUIRED`**: Real-world factual/statistical data that must originate from official government or international data providers (e.g. PPAC, ISPRL, MoPNG, EIA, OPEC).
2. **`DERIVED_VALUE`**: Calculated mathematical values derived strictly from verified primary inputs (e.g. HHI concentration, weighted resilience score, days of reserve cover).
3. **`MODEL_CONFIGURATION`**: Mathematical formula weights, optimization hyperparameters, or calculation limits (e.g. factor weights $0.30, 0.25, 0.20, 0.15, 0.10$).
4. **`UI_CONFIGURATION`**: Component styling, layout grids, SVG coordinates, or navigation metadata.
5. **`USER_SCENARIO_ASSUMPTION`**: Hypothetical parameters chosen by the user in simulation tools (e.g. "Assume 40% Hormuz blockage for 30 days").
6. **`SIMULATED_VALUE`**: Legacy placeholder or guessed factual data to be eliminated or replaced by official datasets.

---

## 2. Complete Inventory of Discovered Values

### A. Reserve & National Energy Metrics (`lib/reserveData.js`)

| Variable / Field | Current Value | Nature | Required Official Source | Replacement Plan |
| :--- | :--- | :--- | :--- | :--- |
| `nationalDailyConsumptionMbd` | `5.42` | `REAL_SOURCE_REQUIRED` | PPAC (Petroleum Planning & Analysis Cell) Monthly Reports | Official dataset provider (`energyProvider.js`) with retrieval date |
| `domesticCrudeProductionMbd` | `0.59` | `REAL_SOURCE_REQUIRED` | MoPNG / PPAC Crude Production Bulletins | Official dataset provider (`energyProvider.js`) |
| `dailyNetImportRequirementMbd` | `4.83` | `DERIVED_VALUE` | Derived ($5.42 - 0.59 = 4.83$) | Computed dynamically from verified consumption & production |
| `importDependencyPercent` | `89.1%` | `DERIVED_VALUE` | Derived ($4.83 / 5.42 \times 100$) | Computed dynamically |
| `SIMULATED_SPR_SITES` capacities | `1.33 MMT (Vizag), 1.50 MMT (Mangalore), 2.50 MMT (Padur)` | `REAL_SOURCE_REQUIRED` | ISPRL (Indian Strategic Petroleum Reserves Limited) Official Disclosures | Sourced from verified ISPRL Phase-1 statutory disclosures |
| `currentInventoryMillionBarrels` | `9.7M, 11.0M, 18.3M` | `REAL_SOURCE_REQUIRED` | ISPRL / MoPNG Strategic Stock Reports | If real-time cavern telemetry is unavailable, marked as `OFFICIAL_DATASET (Phase-1 Design Baseline)` |
| `totalCommercialStorageMillionBarrels` | `315` | `REAL_SOURCE_REQUIRED` | Industry / PSU OMC Disclosures (~65 days) | Verified OMC storage survey baseline with provenance |
| `sprDaysCover` | `9.5 days` | `DERIVED_VALUE` | Derived ($\text{Total SPR Barrels} / \text{Daily Import Need}$) | Computed dynamically |

### B. Crude Supplier Shares & Volumes (`lib/supplierData.js`)

| Variable / Field | Current Value | Nature | Required Official Source | Replacement Plan |
| :--- | :--- | :--- | :--- | :--- |
| `Russia (Urals/ESPO)` | `1.58 MBD (33.8%)` | `REAL_SOURCE_REQUIRED` | DGCIS (Directorate General of Commercial Intelligence & Statistics) / MoPNG Trade Data | Official verified bilateral trade statistics provider (`supplierProvider.js`) |
| `Iraq (Basrah)` | `0.98 MBD (21.0%)` | `REAL_SOURCE_REQUIRED` | DGCIS Trade Statistics | Official verified bilateral trade statistics provider |
| `Saudi Arabia` | `0.75 MBD (16.1%)` | `REAL_SOURCE_REQUIRED` | DGCIS Trade Statistics | Official verified bilateral trade statistics provider |
| `UAE` | `0.42 MBD (9.0%)` | `REAL_SOURCE_REQUIRED` | DGCIS Trade Statistics | Official verified bilateral trade statistics provider |
| `USA` | `0.38 MBD (8.1%)` | `REAL_SOURCE_REQUIRED` | DGCIS Trade Statistics | Official verified bilateral trade statistics provider |
| `Kuwait` | `0.24 MBD (5.1%)` | `REAL_SOURCE_REQUIRED` | DGCIS Trade Statistics | Official verified bilateral trade statistics provider |
| `West Africa` | `0.32 MBD (6.9%)` | `REAL_SOURCE_REQUIRED` | DGCIS Trade Statistics | Official verified bilateral trade statistics provider |
| `HHI Supplier Concentration` | `2,140` | `DERIVED_VALUE` | Derived ($\sum (\text{sharePct})^2$) | Computed dynamically from verified supplier shares |

### C. Maritime Corridors & Shipping (`lib/riskData.js`, `lib/routeData.js`)

| Variable / Field | Current Value | Nature | Required Official Source | Replacement Plan |
| :--- | :--- | :--- | :--- | :--- |
| `Hormuz Import Share` | `58.4% (2.73 MBD)` | `DERIVED_VALUE` | Sum of Persian Gulf Supplier Shares (Iraq, Saudi Gulf, UAE Gulf, Kuwait) | Derived dynamically from supplier route mappings |
| `Red Sea / Suez Share` | `18.6% (0.87 MBD)` | `DERIVED_VALUE` | Russian Baltic & Mediterranean volumes | Derived dynamically from supplier route mappings |
| `Cape Route Share` | `15.0% (0.70 MBD)` | `DERIVED_VALUE` | Atlantic, US Gulf, & West Africa volumes | Derived dynamically |
| `Arabian Sea Open Volume` | `83.5% (3.90 MBD)` | `DERIVED_VALUE` | Aggregate offloading to Indian West Coast | Derived dynamically |
| Transit Times (Days) | `4.5d (Hormuz), 16.5d (Suez), 28d (Cape)` | `REAL_SOURCE_REQUIRED` | Standard nautical distance & average 13-knot tanker voyage calculations | Standard nautical route distance tables |

### D. Pricing Benchmarks & Freight (`lib/riskData.js`, `lib/landedCostEngine.js`)

| Variable / Field | Current Value | Nature | Required Official Source | Replacement Plan |
| :--- | :--- | :--- | :--- | :--- |
| `spotPriceUsd (Brent)` | `84.65` | `REAL_SOURCE_REQUIRED` | EIA / Refinitiv / OilPrice API / Live Market Feed | Fetched via `marketProvider.js`. If API key missing, marked `UNAVAILABLE` or `OFFICIAL BENCHMARK` with exact date |
| `BENCHMARK_FREIGHT_RATES` | `$3.80 - $8.20 / bbl` | `REAL_SOURCE_REQUIRED` | Baltic Exchange Dirty Tanker Index (TD3C, TD15, TD20) | Verified Baltic tanker benchmark index adapter |
| `Net Landed Cost $/bbl` | Calculated sum | `DERIVED_VALUE` | Formula ($\text{Base} + \text{Freight} + \text{Surcharge}$) | Computed dynamically by `landedCostEngine.js` |

### E. Risk Scoring Weights & Formula (`lib/riskScoringEngine.js`)

| Variable / Field | Current Value | Nature | Required Official Source | Replacement Plan |
| :--- | :--- | :--- | :--- | :--- |
| `RISK_WEIGHTS` | `{ geopolitical: 0.30, logistics: 0.25, concentration: 0.20, volatility: 0.15, supplyGap: 0.10 }` | `MODEL_CONFIGURATION` | None (Mathematical model weights) | Preserved as model configuration with transparent formula display |
| `Resilience Score` | `72 / 100` | `DERIVED_VALUE` | Derived ($100 - \sum (\text{Factor} \times \text{Weight})$) | Computed dynamically from normalized input factors |

### F. Disruption Scenarios (`lib/scenarioData.js`)

| Variable / Field | Current Value | Nature | Required Official Source | Replacement Plan |
| :--- | :--- | :--- | :--- | :--- |
| Scenario Presets (Hormuz 42%, Red Sea 60%, etc.) | Synthetic assumptions | `USER_SCENARIO_ASSUMPTION` | User-defined or model presets | Explicitly labelled `MODEL PRESET (HYPOTHETICAL STRESS TEST)` |

### G. Domestic Refineries & Ports (`lib/riskData.js`, `lib/digitalTwinData.js`)

| Variable / Field | Current Value | Nature | Required Official Source | Replacement Plan |
| :--- | :--- | :--- | :--- | :--- |
| Jamnagar Refinery Capacity | `1.40 MBD (68.2 MMTPA)` | `REAL_SOURCE_REQUIRED` | PPAC / Reliance Industries Annual Report Disclosures | Official corporate statutory disclosures with provenance |
| Vadinar Refinery Capacity | `0.40 MBD (20 MMTPA)` | `REAL_SOURCE_REQUIRED` | PPAC / Nayara Energy Disclosures | Official corporate statutory disclosures |
| Panipat Refinery Capacity | `0.35 MBD (15 MMTPA)` | `REAL_SOURCE_REQUIRED` | PPAC / IOCL Disclosures | Official corporate statutory disclosures |
| Kochi Refinery Capacity | `0.31 MBD (15.5 MMTPA)` | `REAL_SOURCE_REQUIRED` | PPAC / BPCL Disclosures | Official corporate statutory disclosures |
| Paradip Refinery Capacity | `0.30 MBD (15 MMTPA)` | `REAL_SOURCE_REQUIRED` | PPAC / IOCL Disclosures | Official corporate statutory disclosures |
| Visakh Refinery Capacity | `0.17 MBD (8.33 MMTPA)` | `REAL_SOURCE_REQUIRED` | PPAC / HPCL Disclosures | Official corporate statutory disclosures |

---

## 3. Data Integrity & Provenance Policy

1. **Zero Guessing**: Every factual data object contains `{ value, source, sourceUrl, provider, retrievedAt, dataStatus, confidence }`.
2. **Status Hierarchy**:
   * `LIVE`: Real-time external API response with valid timestamp.
   * `OFFICIAL_DATASET`: Authoritative statutory report (PPAC, ISPRL, DGCIS, EIA).
   * `USER_PROVIDED`: Uploaded or entered by the user.
   * `DERIVED`: Mathematically computed from verified inputs.
   * `UNAVAILABLE`: When verified data cannot be retrieved, display `N/A` with explanation.
3. **No Fake Real-Time**: If live AIS or pricing APIs are not configured, the UI explicitly displays `OFFICIAL DATASET (BASELINE)` or `DATA UNAVAILABLE`.
