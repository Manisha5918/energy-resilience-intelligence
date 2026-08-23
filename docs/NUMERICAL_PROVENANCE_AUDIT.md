# EnergyShield Numerical Provenance Audit Ledger

This document audits every discrete numerical parameter in the EnergyShield repository, documenting its exact source, publication date, classification, unit, and validation status.

---

## 1. National Energy Balance Parameters

| Parameter | Value | Unit | Classification | Source Document / Authority | Publication Date | Verification Date | Validation Status / Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Domestic Consumption** | `5.42` | MBD | `OFFICIAL` | Petroleum Planning & Analysis Cell (PPAC) Monthly Report | July 2026 | 2026-08-22 | Verified statutory Indian domestic consumption snapshot. |
| **Indigenous Production** | `0.59` | MBD | `OFFICIAL` | PPAC / Ministry of Petroleum & Natural Gas (MoPNG) | July 2026 | 2026-08-22 | Verified onshore & offshore (ONGC, OIL) production. |
| **Net Import Need** | `4.83` | MBD | `DERIVED` | EnergyShield Mathematical Engine ($5.42 - 0.59$) | N/A | 2026-08-22 | Exact subtraction invariant verified in automated suite. |
| **Import Dependency** | `89.1` | % | `DERIVED` | EnergyShield Mathematical Engine ($\frac{4.83}{5.42} \times 100$) | N/A | 2026-08-22 | Dimensionless ratio computed to 1 decimal place. |

---

## 2. Strategic Petroleum Reserves (Phase-I Storage)

| Parameter | Value | Unit | Classification | Source Document / Authority | Publication Date | Verification Date | Validation Status / Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Total Physical Installed Capacity** | `5.33` | MMT | `OFFICIAL` | ISPRL Annual Report 2024-25 (Physical Caverns Sum) | 2025-03-31 | 2026-08-22 | Sum of Vizag (1.33), Mangalore (1.50), Padur (2.50). |
| **Sovereign Strategic Capacity** | `5.03` | MMT | `OFFICIAL` | ISPRL "About Us" / Parliamentary Standing Committee No. 27 | 2024-12-01 | 2026-08-22 | Sovereign strategic allocation (5.33 physical - 0.30 HPCL lease). |
| **Visakhapatnam Total Physical** | `1.33` | MMT | `OFFICIAL` | ISPRL Annual Report 2024-25 | 2025-03-31 | 2026-08-22 | Physical rock cavern capacity (Cavern A: 1.03 + Cavern B: 0.30). |
| **Visakhapatnam Cavern A** | `1.03` | MMT | `OFFICIAL` | ISPRL Cavern Disclosures | 2025-03-31 | 2026-08-22 | Sovereign strategic dedicated cavern. |
| **Visakhapatnam Cavern B (HPCL Lease)** | `0.30` | MMT | `OFFICIAL` | ISPRL Commercial Disclosures (Basrah Medium) | 2024-01-19 | 2026-08-22 | Commercial lease to HPCL for refinery integration. |
| **Mangalore Physical Capacity** | `1.50` | MMT | `OFFICIAL` | ISPRL Annual Report 2024-25 | 2025-03-31 | 2026-08-22 | Two 0.75 MMT compartments; MRPL 0.760 MMT lease pending. |
| **Padur Physical Capacity** | `2.50` | MMT | `OFFICIAL` | ISPRL Annual Report 2024-25 | 2025-03-31 | 2026-08-22 | Four 0.625 MMT underground compartments. |
| **Government of India Custody Stock** | `2,921,957.35` | MT | `OFFICIAL` | ISPRL Annual Report 2024-25 (Audited Balance Sheet) | 2025-03-31 | 2026-08-22 | Verbatim statutory custody inventory disclosure. |
| **ADNOC Custody Stock** | `421,420.04` | MT | `OFFICIAL` | ISPRL Annual Report 2024-25 (Mangalore SPR) | 2025-03-31 | 2026-08-22 | 5.8 Mbbl injected 2018; 50% strategic / 50% commercial agreement. |
| **Model Conversion Density** | `7.35` | bbl/MT | `MODEL_CONVERSION_ASSUMPTION` | Standard Petroleum Engineering Benchmark (~33° API) | Baseline | 2026-08-22 | Standard benchmark; not a universal crude constant. |
| **Theoretical Physical-Capacity Cover** | `8.1` | Days | `DERIVED` | EnergyShield Mathematical Engine ($\frac{39.18\text{ Mbbl}}{4.83\text{ MBD}}$) | N/A | 2026-08-22 | Theoretical upper ceiling; not live operational cover. |

---

## 3. Refinery Nameplate Capacities

| Refinery Complex | Capacity (MMTPA) | Capacity (MBD) | Classification | Source Document / Authority | Publication Date | Verification Date |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Reliance Jamnagar Complex** | `68.20` | `1.37` | `OFFICIAL` | MoPNG / PPAC Refinery Map | 2025 | 2026-08-22 |
| **Nayara Energy Vadinar** | `20.00` | `0.40` | `OFFICIAL` | MoPNG / PPAC Refinery Map | 2025 | 2026-08-22 |
| **IOCL Panipat Refinery** | `15.00` | `0.35` | `OFFICIAL` | MoPNG / PPAC Refinery Map | 2025 | 2026-08-22 |
| **BPCL Kochi Refinery** | `15.50` | `0.31` | `OFFICIAL` | MoPNG / PPAC Refinery Map | 2025 | 2026-08-22 |
| **IOCL Paradip Refinery** | `15.00` | `0.30` | `OFFICIAL` | MoPNG / PPAC Refinery Map | 2025 | 2026-08-22 |
| **HPCL Visakh Refinery** | `8.33` | `0.17` | `OFFICIAL` | MoPNG / PPAC Refinery Map | 2025 | 2026-08-22 |

---

## 4. Macroeconomic & Decision-Support Model Assumptions

| Parameter | Value | Unit | Classification | Source / Reference Basis | Validation Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GDP Elasticity (Central)** | `0.050` | % per $1/bbl | `MODEL_ASSUMPTION` | RBI Working Paper Reference Heuristic | `UNVALIDATED_EMPIRICAL_COEFFICIENT` |
| **GDP Elasticity (Low Case)** | `0.025` | % per $1/bbl | `MODEL_ASSUMPTION` | Sensitivity Sweep Lower Bound | `MODEL_SCENARIO_BOUND` |
| **GDP Elasticity (High Case)** | `0.080` | % per $1/bbl | `MODEL_ASSUMPTION` | Severe Stagflation Shock Upper Bound | `MODEL_SCENARIO_BOUND` |
| **CAD Sensitivity (Central)** | `1.50` | $B per $1/bbl/yr | `MODEL_ASSUMPTION` | External Sector Economic Survey Reference | `UNVALIDATED_EMPIRICAL_COEFFICIENT` |
| **CAD Sensitivity (Low Case)** | `1.00` | $B per $1/bbl/yr | `MODEL_ASSUMPTION` | Sensitivity Sweep Lower Bound | `MODEL_SCENARIO_BOUND` |
| **CAD Sensitivity (High Case)** | `2.20` | $B per $1/bbl/yr | `MODEL_ASSUMPTION` | High Elasticity Surcharge Bound | `MODEL_SCENARIO_BOUND` |
| **USD / INR Exchange Rate** | `84.50` | INR / USD | `PUBLIC_ESTIMATE` | RBI Reference Benchmark Baseline | `BASELINE_FINANCIAL_METRIC` |
| **Nominal GDP Baseline** | `3,940` | Billion USD | `PUBLIC_ESTIMATE` | Union Budget / IMF WEO India FY25 | `BASELINE_ECONOMIC_METRIC` |
| **Aggregate Cavern Pump Ceiling** | `2.50` | MBD | `MODEL_ASSUMPTION` | Heuristic Engineering Assumption | `PENDING_VALIDATION_WITH_ISPRL` |
| **Emergency Buffer Floor** | `20.0` | % | `MODEL_ASSUMPTION` | Sovereign Buffer Policy Floor | `MODEL_POLICY_PARAMETER` |
