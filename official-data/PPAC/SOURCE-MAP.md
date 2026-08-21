# PPAC Official Data Source Map & Ingestion Specification

**Organization**: Petroleum Planning & Analysis Cell (PPAC), Ministry of Petroleum & Natural Gas (MoPNG), Government of India  
**Portal**: `https://www.ppac.gov.in`  
**Date of Audit**: August 2026  
**Status**: Official Data Ingestion Blueprint  

---

## 1. Objective & Policy

This document establishes the official data mapping for the Petroleum Planning & Analysis Cell (PPAC) data ingestion pipeline in EnergyShield.
- **1st-Party Authority**: All data mappings reference official statutory publications from `ppac.gov.in` and `mopng.gov.in`.
- **Zero-Fabrication**: Datasets must be ingested directly in their published formats with zero synthetic interpolation.
- **Temporal Honesty**: Historical and periodic monthly datasets are explicitly identified as `OFFICIAL_BASELINE` (never falsely labeled as real-time).

---

## 2. Comprehensive PPAC Dataset Source Mappings

### 1. `official-data/PPAC/consumption/products-wise/`
- **Folder / Dataset Name**: Product-wise Domestic Consumption of Petroleum Products
- **Exact Official Source Page**: `https://www.ppac.gov.in/consumption-product-wise.aspx` & `https://www.ppac.gov.in/industry-consumption-report.aspx`
- **Downloadable Data Available**: **Yes**
- **File Format Available**: **Excel (`.xlsx`) / PDF**
- **Date & Update Frequency**: **Monthly** (Provisional figures released monthly with a 15–20 day lag; historical series from FY2014-15 to FY2024-25 / FY2025-26)
- **Temporal Classification**: **Official Monthly Baseline / Historical Time Series**
- **Exact Fields / Columns Expected**:
  - `Year / Month` (e.g. `2024-25`, `April-March`, `Monthly Series`)
  - `LPG (Liquefied Petroleum Gas)` (TMT)
  - `MS (Motor Spirit / Petrol)` (TMT)
  - `HSD (High Speed Diesel)` (TMT)
  - `ATF (Aviation Turbine Fuel)` (TMT)
  - `SKO (Superior Kerosene Oil)` (TMT)
  - `Naphtha` (TMT)
  - `Bitumen` (TMT)
  - `Pet Coke / FO / LSHS / Others` (TMT)
  - `Total POL Consumption` (Thousand Metric Tonnes - TMT)
  - `Percentage Growth YoY` (%)
- **Last Verified Date**: August 2026
- **Automated Retrieval Possible**: **Semi-automated / Manual HTTP retrieval** (Direct PDF/XLSX download links provided on PPAC portal without CAPTCHA; requires scheduled scraper or manual download due to periodic filename hashing).
- **Limitations & Warnings**: Unit is Thousand Metric Tonnes (TMT). Must be converted to Million Barrels Per Day (MBD) using standard product density factor ($1\text{ TMT} \times 7.33 / \text{Days} / 1000$) for EnergyShield intake balance calculations.

---

### 2. `official-data/PPAC/consumption/state-wise/`
- **Folder / Dataset Name**: State-wise and Region-wise Sales/Consumption of Major Petroleum Products
- **Exact Official Source Page**: `https://www.ppac.gov.in/consumption-state-wise.aspx`
- **Downloadable Data Available**: **Yes**
- **File Format Available**: **Excel (`.xlsx`) / PDF**
- **Date & Update Frequency**: **Quarterly / Annual Consolidated**
- **Temporal Classification**: **Official Baseline / Historical**
- **Exact Fields / Columns Expected**:
  - `State / Union Territory Name` (All 28 States & 8 UTs)
  - `Geographical Region` (Northern, Western, Southern, Eastern, North-Eastern Zones)
  - `MS Consumption` (TMT)
  - `HSD Consumption` (TMT)
  - `LPG Domestic & Commercial Sales` (TMT)
  - `SKO PDS Allocation` (TMT)
  - `Total State Consumption` (TMT)
  - `Per Capita Consumption Indicator` (kg/capita)
- **Last Verified Date**: August 2026
- **Automated Retrieval Possible**: **Manual Download** (Annual/quarterly consolidated tables published as static Excel files).
- **Limitations & Warnings**: Excludes direct bulk off-take by institutional consumers (Defense, Indian Railways, Shipping) which are reported as separate national line items.

---

### 3. `official-data/PPAC/production/crude-oil/`
- **Folder / Dataset Name**: Indigenous Crude Oil & Condensate Production
- **Exact Official Source Page**: `https://www.ppac.gov.in/production-crude-oil.aspx` (Table 3: Production of Crude Oil & Condensate)
- **Downloadable Data Available**: **Yes**
- **File Format Available**: **Excel (`.xlsx`) / PDF**
- **Date & Update Frequency**: **Monthly** (Statutory monthly reporting cycle)
- **Temporal Classification**: **Official Latest Monthly Baseline / Time Series**
- **Exact Fields / Columns Expected**:
  - `Month / Year`
  - `ONGC Onshore Production` (TMT) (Gujarat, Assam, Tamil Nadu, Andhra Pradesh, Rajasthan)
  - `ONGC Offshore Production` (TMT) (Mumbai High, Western Offshore, Eastern Offshore KG Basin)
  - `Oil India Limited (OIL) Production` (TMT) (Assam, Arunachal Pradesh, Rajasthan)
  - `Private / Joint Venture (JV) Production` (TMT) (Cairn Vedanta Rajasthan, KG Basin D6, Cambay, etc.)
  - `Condensate Production` (TMT)
  - `Total Indigenous Crude Production` (TMT / MMT)
  - `Monthly Target vs Actual Achievement` (%)
- **Last Verified Date**: August 2026
- **Automated Retrieval Possible**: **Semi-automated / Manual Download**
- **Limitations & Warnings**: Reported in Metric Tonnes. Crucial primary input for national net import calculation ($5.42\text{ MBD consumption} - 0.59\text{ MBD domestic production} = 4.83\text{ MBD net import need}$).

---

### 4. `official-data/PPAC/production/petroleum-products/`
- **Folder / Dataset Name**: Refinery Crude Processing & Product Production by Refinery
- **Exact Official Source Page**: `https://www.ppac.gov.in/production-petroleum-products.aspx` (Table 2: Crude Oil Processed & Petroleum Products Produced)
- **Downloadable Data Available**: **Yes**
- **File Format Available**: **Excel (`.xlsx`) / PDF**
- **Date & Update Frequency**: **Monthly**
- **Temporal Classification**: **Official Latest Monthly Baseline**
- **Exact Fields / Columns Expected**:
  - `Refinery Name & Operating Company` (IOCL, BPCL, HPCL, CPCL, MRPL, NRL, RIL DTA, RIL SEZ, Nayara)
  - `Crude Oil Processed` (Indigenous vs Imported Crude in TMT)
  - `Refinery Capacity Utilization` (%)
  - `Gross Refinery Margin (GRM)` ($/bbl, when disclosed)
  - `Product Output Breakdown`:
    - Light Distillates: LPG, Mogas/Petrol, Naphtha (TMT)
    - Middle Distillates: Kerosene, ATF, HSD/Diesel, LDO (TMT)
    - Heavy Ends & Others: FO, LSHS, Bitumen, Petcoke, Lubes (TMT)
  - `Total Refinery Production` (TMT)
- **Last Verified Date**: August 2026
- **Automated Retrieval Possible**: **Semi-automated / Manual Download**
- **Limitations & Warnings**: Jamnagar SEZ export-oriented production must be distinguished from domestic tariff area (DTA) processing.

---

### 5. `official-data/PPAC/import-export/`
- **Folder / Dataset Name**: Monthly Import and Export of Crude Oil, Petroleum Products, and LNG
- **Exact Official Source Page**: `https://www.ppac.gov.in/import-export.aspx` (Table 4: Foreign Trade Statistics)
- **Downloadable Data Available**: **Yes**
- **File Format Available**: **Excel (`.xlsx`) / PDF**
- **Date & Update Frequency**: **Monthly**
- **Temporal Classification**: **Official Latest Monthly Baseline**
- **Exact Fields / Columns Expected**:
  - `Period / Month`
  - `Crude Oil Gross Imports` (Quantity in TMT and Value in Million USD / Crore INR)
  - `Crude Oil Import Dependency Rate` (% based on consumption)
  - `Petroleum Products Imports` (LPG, Fuel Oil, Naphtha, Others in TMT & USD M)
  - `LNG Imports` (Quantity in MMSCM / TMT & Value in USD M)
  - `Petroleum Products Exports` (HSD, MS, ATF, Naphtha in TMT & USD M)
  - `Net POL Import Bill` (Million USD & Crore INR)
- **Last Verified Date**: August 2026
- **Automated Retrieval Possible**: **Semi-automated / Manual Download**
- **Limitations & Warnings**: Provides national total volume and value. Country-level origin breakdown (Russia, Iraq, Saudi Arabia, UAE, USA) is sourced from DGCIS Customs bilateral trade records.

---

### 6. `official-data/PPAC/prices/indian-crude-basket/`
- **Folder / Dataset Name**: Daily & Historical Price of Indian Crude Basket (ICB)
- **Exact Official Source Page**: `https://www.ppac.gov.in/prices-crude-oil-indian-basket.aspx`
- **Downloadable Data Available**: **Yes**
- **File Format Available**: **Excel (`.xlsx`) / CSV / Daily Web Tables**
- **Date & Update Frequency**: **Daily (Published on working days)**
- **Temporal Classification**: **Official Daily Notified (1-day trade settlement lag)**
- **Exact Fields / Columns Expected**:
  - `Date` (DD-MM-YYYY)
  - `Indian Crude Basket Price in USD/bbl`
  - `Indian Crude Basket Price in INR/bbl`
  - `Exchange Rate (RBI Reference Rate INR/USD)`
  - `Sour Crude Component Price (Oman/Dubai Average in USD/bbl)`
  - `Sweet Crude Component Price (Dated Brent in USD/bbl)`
  - `Notified Ratio Weighting` (e.g. `75.62 : 24.38` sour-to-sweet)
- **Last Verified Date**: August 2026
- **Automated Retrieval Possible**: **Yes (Daily scriptable HTTP scrape / CSV download)**
- **Limitations & Warnings**: Represents the notified benchmark of refinery acquisitions; reflects preceding trading day settlement.

---

### 7. `official-data/PPAC/prices/petrol/`
- **Folder / Dataset Name**: Retail Selling Price (RSP) & Price Build-up of Motor Spirit (Petrol)
- **Exact Official Source Page**: `https://www.ppac.gov.in/prices-petroleum-products.aspx`
- **Downloadable Data Available**: **Yes**
- **File Format Available**: **Excel (`.xlsx`) / PDF**
- **Date & Update Frequency**: **Daily / Fortnightly (for detailed price build-up schedules)**
- **Temporal Classification**: **Official Latest**
- **Exact Fields / Columns Expected**:
  - `Date / Effective Period`
  - `Metro City` (Delhi, Mumbai, Kolkata, Chennai)
  - `Price Charged to Dealers (Ex-Refinery Gate Price + Freight)` (INR/Litre)
  - `Customs Duty & Central Excise Duty` (INR/Litre)
  - `Dealer Commission` (INR/Litre)
  - `State VAT / Surcharge` (INR/Litre)
  - `Final Retail Selling Price (RSP)` (INR/Litre)
- **Last Verified Date**: August 2026
- **Automated Retrieval Possible**: **Manual / Periodic Download**
- **Limitations & Warnings**: Price build-up updates reflect central duty notifications and OMCs' baseline revisions.

---

### 8. `official-data/PPAC/prices/diesel/`
- **Folder / Dataset Name**: Retail Selling Price (RSP) & Price Build-up of High Speed Diesel (HSD)
- **Exact Official Source Page**: `https://www.ppac.gov.in/prices-petroleum-products.aspx`
- **Downloadable Data Available**: **Yes**
- **File Format Available**: **Excel (`.xlsx`) / PDF**
- **Date & Update Frequency**: **Daily / Fortnightly**
- **Temporal Classification**: **Official Latest**
- **Exact Fields / Columns Expected**:
  - `Date / Effective Period`
  - `Metro City` (Delhi, Mumbai, Kolkata, Chennai)
  - `Price Charged to Dealers` (INR/Litre)
  - `Central Excise Duty & Road Cess` (INR/Litre)
  - `Dealer Commission` (INR/Litre)
  - `State VAT & Pollution Cess` (INR/Litre)
  - `Final Retail Selling Price (RSP)` (INR/Litre)
- **Last Verified Date**: August 2026
- **Automated Retrieval Possible**: **Manual / Periodic Download**
- **Limitations & Warnings**: Diesel accounts for ~38% of total domestic petroleum consumption in India.

---

### 9. `official-data/PPAC/natural-gas/production/`
- **Folder / Dataset Name**: Gross & Net Natural Gas Production
- **Exact Official Source Page**: `https://www.ppac.gov.in/natural-gas-production.aspx`
- **Downloadable Data Available**: **Yes**
- **File Format Available**: **Excel (`.xlsx`) / PDF**
- **Date & Update Frequency**: **Monthly**
- **Temporal Classification**: **Official Latest Monthly Baseline**
- **Exact Fields / Columns Expected**:
  - `Month / Year`
  - `ONGC Gas Production` (Offshore & Onshore in MMSCM)
  - `OIL Gas Production` (MMSCM)
  - `Private / JV Gas Production` (KG Basin D6, Coal Bed Methane in MMSCM)
  - `Gross Natural Gas Production` (Million Metric Standard Cubic Metres - MMSCM)
  - `Internal Consumption for Extraction / Flared Gas` (MMSCM)
  - `Net Gas Available for Sale` (MMSCM / BCM)
- **Last Verified Date**: August 2026
- **Automated Retrieval Possible**: **Semi-automated / Manual Download**
- **Limitations & Warnings**: Measured in MMSCM ($1\text{ BCM} = 1000\text{ MMSCM}$).

---

### 10. `official-data/PPAC/natural-gas/consumption/`
- **Folder / Dataset Name**: Sectoral Natural Gas Consumption & LNG Regasification
- **Exact Official Source Page**: `https://www.ppac.gov.in/natural-gas-consumption.aspx`
- **Downloadable Data Available**: **Yes**
- **File Format Available**: **Excel (`.xlsx`) / PDF**
- **Date & Update Frequency**: **Monthly / Annual**
- **Temporal Classification**: **Official Latest Monthly Baseline**
- **Exact Fields / Columns Expected**:
  - `Period / Month`
  - `Sectoral Offtake`:
    - Fertilizer Plants (MMSCM / % share)
    - City Gas Distribution (CGD - CNG/PNG) (MMSCM / % share)
    - Power Generation Units (MMSCM / % share)
    - Refineries & Petrochemical Feedstock (MMSCM / % share)
    - Internal Pipeline Fuel & Others (MMSCM / % share)
  - `Domestic Gas Sourced` (MMSCM)
  - `Imported Re-gasified LNG (RLNG)` (MMSCM)
  - `Total Natural Gas Consumption` (MMSCM)
- **Last Verified Date**: August 2026
- **Automated Retrieval Possible**: **Manual / Periodic Download**
- **Limitations & Warnings**: Segregates Administered Price Mechanism (APM) gas and market-priced RLNG.

---

## 3. Indian Strategic Petroleum Reserves Limited (ISPRL) Source Specification

### Key Principle: Storage Capacity vs. Actual Live Inventory

| Dimension | Visakhapatnam Cavern | Mangaluru Cavern | Padur Cavern | Total ISPRL Phase-1 | Classification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Statutory Design Capacity (MMT)** | 1.33 MMT | 1.50 MMT | 2.50 MMT | **5.33 MMT** | `OFFICIAL_BASELINE` (Statutory) |
| **Statutory Design Capacity (Barrels)** | 9.77 Million Barrels | 11.02 Million Barrels | 18.37 Million Barrels | **39.16 Million Barrels** | `OFFICIAL_BASELINE` (Derived) |
| **Commissioned Status** | Operational (Phase-1) | Operational (Phase-1) | Operational (Phase-1) | **Commissioned / Operational** | `OFFICIAL_BASELINE` |
| **Subsea SCADA Real-Time Inventory** | **CLASSIFIED / NOT PUBLIC** | **CLASSIFIED / NOT PUBLIC** | **CLASSIFIED / NOT PUBLIC** | **UNAVAILABLE / N/A** | `UNAVAILABLE` |

- **Official Source**: Indian Strategic Petroleum Reserves Limited (ISPRL), Special Purpose Vehicle under MoPNG (`https://www.isprlindia.com`).
- **Exact Statutory Documents**:
  - ISPRL Statutory Project Disclosures (Phase-I Storage Project at Visakhapatnam, Mangalore, and Padur).
  - Parliamentary Standing Committee on Petroleum and Natural Gas, Demand for Grants Report No. 27 on Strategic Crude Oil Reserves.
- **Critical Policy Directive**:
  - **Do NOT claim ISPRL capacity is live inventory.**
  - Real-time subterranean inventory levels are classified defense security information not exposed on any public streaming endpoint.
  - In EnergyShield UI and engines, live fill telemetry must display `N/A (Real-time telemetry classified/unavailable)`, with national reserve cover calculated strictly against verified statutory nameplate design capacity ($8.1\text{ Days}$) and commercial OMC storage ($65.2\text{ Days}$).
