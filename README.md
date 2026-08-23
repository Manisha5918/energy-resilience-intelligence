# EnergyShield: Accuracy-First Petroleum Security Decision-Support Platform

> **National Energy Security Intelligence Platform for India**  
> EnergyShield integrates source-provenance tracking, strategic-reserve simulation, supply-disruption analysis, refinery allocation modelling, logistics scenarios, and macroeconomic impact analysis.
> 
> The platform explicitly distinguishes authoritative source data, derived calculations, conversion assumptions, model assumptions, simulated inputs, and pending-validation information.
> 
> **Current Status**: `Decision-support / Simulation-ready`. EnergyShield does not claim live SCADA, live AIS, refinery-control, sovereign operational, or autonomous procurement capability.

---

## 1. Problem Statement

India is the world's third-largest consumer of crude oil, consuming **5.42 Million Barrels per Day (MBD)** with an indigenous crude production rate of only **0.59 MBD**, resulting in an **89.1% import dependency**. 

Crucially, **over 58% of India's crude imports transit a single 39 km-wide maritime chokepoint: the Strait of Hormuz**. Regional flare-ups, naval blockades, drone strikes near Bab-el-Mandeb, or sanctions turbulence create immediate national vulnerabilities:
- Immediate physical feedstock shortages at western and northern refinery complexes (Jamnagar, Vadinar, Panipat, Kochi).
- Extreme spot crude price escalation and war-risk maritime insurance surcharges.
- Inability to evaluate supplier reallocation, pipeline bypass options (e.g., UAE Habshan-Fujairah), and Strategic Petroleum Reserve (ISPRL) drawdowns in real time.

**EnergyShield solves this challenge by providing an end-to-end Explainable AI & Operations Research decision-support cockpit.**

---

## 2. End-to-End Operational Pipeline

```
┌─────────────────┐
│     MONITOR     │ ──► Continuous ingestion of Maritime AIS, Geopolitical Wire,
└────────┬────────┘     Sanctions Bulletins, and Energy Market Spot Benchmarks.
         │
         ▼
┌─────────────────┐
│     ASSESS      │ ──► Transparent 5-Factor Risk Engine deriving National Resilience Score
└────────┬────────┘     (0-100) and Supply Risk Index.
         │
         ▼
┌─────────────────┐
│    SIMULATE     │ ──► Deterministic scenario engine modeling physical crude deficit (MBD),
└────────┬────────┘     Brent shock exposure, SPR days cover, and refinery pressure.
         │
         ▼
┌─────────────────┐
│    OPTIMIZE     │ ──► Multi-objective procurement optimizer generating ranked alternative
└────────┬────────┘     allocation strategies with itemized landed costs and HHI metrics.
         │
         ▼
┌─────────────────┐
│     RESPOND     │ ──► Topological Digital Twin grid triggering emergency SPR cavern off-take
└────────┬────────┘     and pipeline/Cape rerouting.
         │
         ▼
┌─────────────────┐
│     EXPLAIN     │ ──► Decision-maker explainability providing mathematical breakdowns,
└─────────────────┘     trade-off rationales, and full data provenance.
```

---

## 3. System Architecture & Component Hierarchy

```mermaid
graph TD
    subgraph DATA_LAYER [1. Verified Official & Baseline Data]
        D1[PPAC National Energy Balance]
        D2[DGCIS Bilateral Crude Trade]
        D3[ISPRL Statutory SPR Disclosures]
        D4[EIA Brent & Baltic Freight Benchmarks]
    end

    subgraph INTELLIGENCE_LAYER [2. Ingestion & Normalization]
        I1[Market Signal Adapter]
        I2[Maritime AIS Tracker]
        I3[Sanctions Compliance Engine]
        I4[Geopolitical News Normalizer]
    end

    subgraph ENGINE_LAYER [3. Core Domain Engines]
        E1[Risk Scoring Engine - 5 Factors]
        E2[Scenario Simulation Engine]
        E3[Adaptive Procurement Optimizer]
        E4[Landed Cost Calculator]
        E5[Digital Twin Topology Engine]
        E6[Reserve Buffer Calculator]
    end

    subgraph API_LAYER [4. Server-Side Route Handlers]
        A1[/api/risk]
        A2[/api/scenarios]
        A3[/api/procurement]
        A4[/api/reserves]
        A5[/api/digital-twin]
        A6[/api/health & /api/intelligence]
    end

    subgraph UI_LAYER [5. Executive User Interface]
        U1[Executive Command Dashboard]
        U2[Geopolitical Intelligence Wire]
        U3[Maritime Route Risk Center]
        U4[Scenario Simulation Studio]
        U5[Adaptive Procurement Workspace]
        U6[Supply Chain Digital Twin]
        U7[Strategic Reserves Analytics]
        U8[Data Provenance & Audit Registry]
    end

    DATA_LAYER --> ENGINE_LAYER
    INTELLIGENCE_LAYER --> ENGINE_LAYER
    ENGINE_LAYER --> API_LAYER
    API_LAYER --> UI_LAYER
```

---

## 4. Official Data Provenance & Classification Standard

EnergyShield adheres to strict auditability rules. Every metric is categorized:

| Category | Definition | Example in EnergyShield |
| :--- | :--- | :--- |
| `OFFICIAL` | Statutory government numbers directly verified against official publications. | Consumption: **5.42 MBD** (PPAC Snapshot), Production: **0.59 MBD** (PPAC/DGH), Physical Installed SPR: **5.33 MMT / 39.18 MBBL** (ISPRL Phase-1). |
| `DERIVED` | Pure mathematical functions of verified statutory inputs. | Net Import Need: **4.83 MBD**, Import Dependency: **89.1%**, Baseline Theoretical SPR Cover: **8.1 Days**, Baseline HHI: **2,063 Points**. |
| `MODEL_CONVERSION_ASSUMPTION` | Standard industry benchmark density multiplier. | **7.35 bbl/MT** (~33° API Indian crude basket benchmark; not a universal constant). |
| `MODEL_ASSUMPTION` | Calibrated parameters for simulation and decision support. | GDP elasticity **0.050%**, CAD sensitivity **$1.50B**, Aggregate Pump Ceiling **2.50 MBD**. |
| `SIMULATED` | Synthetic baseline vectors for situational visualization. | AIS vessel positions, Cape reroute delays, Model Scenarios. |
| `PENDING_VALIDATION` | Unmetered or classified sovereign feeds. | Real-time subterranean rock cavern SCADA fill (modeled under configurable scenario levels). |

---

## 5. Domain Engines & Mathematical Models

### 5.1. Risk Scoring Engine (`riskScoringEngine.js`)
Transparent linear weighted penalty model evaluating national energy resilience:

$$\text{Resilience Score} = 100 - \left( \sum_{i=1}^5 w_i \times F_i \right)$$

| Factor ($F_i$) | Weight ($w_i$) | Baseline Input | Weighted Penalty | Description |
| :--- | :---: | :---: | :---: | :--- |
| **Geopolitical Risk** | 30% | 72 | 21.60 | Naval tensions in Persian Gulf & Bab-el-Mandeb |
| **Logistics & Maritime Risk** | 25% | 64 | 16.00 | Single-point-of-failure chokepoint transit (Hormuz) |
| **Supplier Concentration (HHI)** | 20% | 60 | 12.00 | Over-reliance on Top 3 suppliers (70.9% share) |
| **Crude Price Volatility** | 15% | 68 | 10.20 | Landed import bill variance vs Brent benchmark |
| **Supply Gap & Buffer Stress** | 10% | 40 | 4.00 | Ratio of daily deficit to accessible buffer stock |
| **Total Baseline Penalty** | **100%** | — | **63.80** | **Baseline Resilience Score: 36 / 100 (CRITICAL)** |

---

### 5.2. Adaptive Procurement Engine (`procurementEngine.js`)
When a disruption occurs, the orchestrator evaluates replacement volumes across 3 distinct strategy packages:

1. **Strategy 1: Balanced Resilience (Recommended)**
   - **40% Chokepoint Bypass**: Lifts Murban via UAE Habshan-Fujairah direct deepwater terminal and Yanbu Red Sea bypass.
   - **37% Open Ocean Long-Haul**: Expands US Gulf Coast (LOOP) and West African sweet crude (Bonny Light).
   - **Concentration Trade-off**: Reallocates volume across 5 secure suppliers, shifting HHI from baseline **2,063** to **2,298 (+235 points)** to achieve 100% Hormuz avoidance.
2. **Strategy 2: Maximum Resilience & Chokepoint Immunity**
   - 100% open-ocean and deepwater bypass routing; zero Persian Gulf entry.
3. **Strategy 3: Cost-Optimized Value Flow**
   - Maximizes discounted Urals and Basrah Heavy barrels at higher geopolitical route risk.

---

### 5.3. Strategic Petroleum Reserves Model (`reserveProvider.js`)
- **Phase-1 Statutory Caverns**:
  - Visakhapatnam, AP: 1.33 MMT (9.78 MBBL)
  - Mangalore, KA: 1.50 MMT (11.03 MBBL)
  - Padur, KA: 2.50 MMT (18.37 MBBL)
  - **Total Statutory SPR Physical Installed Capacity**: **5.33 MMT (39.18 MBBL) = 8.1 Days Theoretical Net Import Cover**
- **Commercial OMC Tank Stock**: **315.0 MBBL = 65.2 Days Cover**
- **Combined Modeled Strategic Buffer**: **73.3 Days Total Cover**

---

### 5.4. Supply Chain Digital Twin (`digitalTwinEngine.js`)
Topological graph modeling:
- **Global Origin Nodes**: Russia, Iraq, Saudi Arabia, UAE, USA, West Africa.
- **Corridors & Chokepoints**: Strait of Hormuz, Bab-el-Mandeb, Cape Route, Arabian Sea.
- **Port Terminals**: Sikka SPM, Vadinar SPM, Mundra, Mumbai, Kochi SPM, Paradip SPM, Vizag.
- **Domestic Refineries**: Jamnagar (RIL), Vadinar (Nayara), Panipat (IOCL), Kochi (BPCL), Paradip (IOCL), Visakh (HPCL).
- **Cavern Reserves**: ISPRL Vizag, ISPRL Mangalore, ISPRL Padur.

---

## 6. Server-Side REST API Contracts

All endpoints return uniform JSON envelopes with explicit data provenance headers:

```
GET/POST /api/risk            ── Calculate resilience score, weights, and explainability
GET/POST /api/scenarios       ── Execute simulation scenarios and list template registry
GET/POST /api/procurement     ── Generate multi-objective procurement re-routing plans
GET      /api/reserves        ── Retrieve statutory SPR capacities and buffer metrics
GET/POST /api/digital-twin    ── Construct network graph state and disruption cascades
GET      /api/health          ── Ingestion subsystem health matrix and provider statuses
GET      /api/intelligence/*  ── Feeds for Market, News, Sanctions, and Shipping AIS
```

---

## 7. Step-by-Step Hackathon Demo Script

Follow this sequence for an end-to-end demonstration:

1. **Executive Command Dashboard (`/`)**:
   - Inspect baseline resilience score (**36 / 100 - CRITICAL**).
   - Review national import dependency (**89.1%**, 4.83 MBD net import need).
   - Click **"Formula & Explainability"** to view mathematical weight contributions.
2. **Disruption Scenarios Studio (`/scenarios`)**:
   - Select **"Strait of Hormuz Severe Disruption"**.
   - Review 15-day disruption impact: **2.03 MBD physical deficit**, remaining SPR cover drops to **5.0 days**.
   - Click **"Optimize Procurement Response"** to hand off the deficit into the optimizer.
3. **Adaptive Procurement Workspace (`/procurement`)**:
   - Inspect **Strategy 1: Balanced Resilience**.
   - Review why the algorithm recommended this strategy: 100% gap fulfillment, $91.70/bbl landed cost, +235 pt HHI trade-off to achieve complete Hormuz bypass.
4. **Supply Chain Digital Twin (`/digital-twin`)**:
   - Toggle between **"Current Baseline"** and **"Hormuz Disruption"**.
   - Observe real-time color transitions: Hormuz corridor shifts from Green to Red; Fujairah and Cape bypass flows turn active.
5. **Strategic Reserves Analytics (`/reserves`)**:
   - Verify ISPRL Phase-1 statutory caverns (Vizag, Mangalore, Padur).
   - Note defense classification banner for real-time SCADA telemetry.
6. **Data Quality & Provenance Center (`/data-center`)**:
   - View the complete audit ledger tracing all formulas and statutory sources.

---

## 8. Verification & Test Suite

EnergyShield features a comprehensive automated validation harness:

```bash
# 1. Official Data Provenance Verification (21 tests)
node frontend/scripts/validate-provenance.js

# 2. Statutory Datasets Audit (47 tests)
node frontend/scripts/validate-official-data.js

# 3. Domain Engine Regression Suite (52 tests)
node frontend/scripts/test-backend-suite.js

# 4. Server-Side API Contract & Integration Tests (56 tests)
node frontend/scripts/test-api-contracts.js

# 5. Production Lint & Next.js Build
cd frontend && npm run lint && npm run build
```

**Total Automated Assertions: 176 / 176 Passing (100% Pass Rate)**

---

## 9. Current Limitations & Production Roadmap

- **External Live API Keys**: In demo mode without API credentials, external providers serve structured, calibrated baselines tagged `SIMULATED`. Supplying `NEWS_API_KEY` or `MARKET_API_KEY` in `.env.local` enables live polling.
- **SCADA Fill Telemetry**: Real-time cavern fill levels are classified by national defense protocol; modeled using statutory nameplate capacities.
- **Optimization Heuristics**: Optimization operates on multi-factor linear programming formulations; future work includes mixed-integer stochastic optimization with real-time tanker charter books.

---

## 10. Local Setup & Execution

```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
