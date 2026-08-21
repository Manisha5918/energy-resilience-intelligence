/**
 * EnergyShield Digital Twin Data Layer
 * 
 * Represents India's complete crude oil supply chain topology:
 * Nodes (Suppliers, Corridors, Chokepoints, Ports, Refineries, Reserves)
 * and Edges (Maritime & Coastal Pipeline Flows).
 * 
 * Source Provenance:
 * - Refineries: PPAC / PSU OMC & Reliance Annual Statutory Reports
 * - SPR Underground Caverns: Indian Strategic Petroleum Reserves Limited (ISPRL)
 * - Trade Shares: Directorate General of Commercial Intelligence and Statistics (DGCIS)
 * - Port Terminals: Indian Ports Association & Deendayal / Mumbai / Kochi Port Trusts
 */

import { SIMULATED_SUPPLIER_PROFILES } from "@/lib/supplierData";
import { SIMULATED_SHIPPING_ROUTES, SIMULATED_CORRIDORS } from "@/lib/routeData";
import { SIMULATED_REFINERY_PROFILES } from "@/lib/riskData";
import { SIMULATED_SPR_SITES } from "@/lib/reserveData";

export const DIGITAL_TWIN_NODES = [
  // 1. GLOBAL CRUDE SUPPLIER ORIGINS
  {
    id: "node-russia",
    name: "Russian Federation (Baltic / Black Sea)",
    shortName: "Russia",
    type: "supplier",
    category: "GLOBAL_ORIGIN",
    country: "Russia",
    baseVolumeMbd: 1.58,
    sharePct: 33.8,
    color: "#ef4444",
    x: 60,
    y: 70,
    status: "active",
    baseRisk: 68,
    description: "Primary discounted Urals & ESPO supplier. Relies heavily on Red Sea transit & Cape diversion."
  },
  {
    id: "node-iraq",
    name: "Republic of Iraq (Basra Terminal)",
    shortName: "Iraq",
    type: "supplier",
    category: "GLOBAL_ORIGIN",
    country: "Iraq",
    baseVolumeMbd: 0.98,
    sharePct: 21.0,
    color: "#f97316",
    x: 170,
    y: 90,
    status: "active",
    baseRisk: 64,
    description: "Key heavy/sour crude supplier loading via northern Gulf Single Point Mooring (SPM) berths."
  },
  {
    id: "node-saudi",
    name: "Kingdom of Saudi Arabia (Ras Tanura & Yanbu)",
    shortName: "Saudi Arabia",
    type: "supplier",
    category: "GLOBAL_ORIGIN",
    country: "Saudi Arabia",
    baseVolumeMbd: 0.75,
    sharePct: 16.1,
    color: "#10b981",
    x: 140,
    y: 160,
    status: "active",
    baseRisk: 42,
    description: "Major term supplier with dual-coast flexibility (Ras Tanura on Gulf, Yanbu on Red Sea)."
  },
  {
    id: "node-uae",
    name: "United Arab Emirates (ADNOC / Fujairah)",
    shortName: "UAE",
    type: "supplier",
    category: "GLOBAL_ORIGIN",
    country: "UAE",
    baseVolumeMbd: 0.42,
    sharePct: 9.0,
    color: "#06b6d4",
    x: 210,
    y: 190,
    status: "active",
    baseRisk: 28,
    description: "Strategic light sour supplier. Habshan-Fujairah pipeline offers 100% Hormuz bypass."
  },
  {
    id: "node-usa",
    name: "United States (Gulf Coast / LOOP)",
    shortName: "USA",
    type: "supplier",
    category: "GLOBAL_ORIGIN",
    country: "USA",
    baseVolumeMbd: 0.38,
    sharePct: 8.1,
    color: "#3b82f6",
    x: 50,
    y: 280,
    status: "active",
    baseRisk: 18,
    description: "Sweet WTI Midland supplier routed via open Atlantic & Cape of Good Hope."
  },
  {
    id: "node-kuwait",
    name: "State of Kuwait (Mina Al Ahmadi)",
    shortName: "Kuwait",
    type: "supplier",
    category: "GLOBAL_ORIGIN",
    country: "Kuwait",
    baseVolumeMbd: 0.24,
    sharePct: 5.1,
    color: "#8b5cf6",
    x: 180,
    y: 130,
    status: "active",
    baseRisk: 52,
    description: "Consistent term supplier transiting Persian Gulf and Strait of Hormuz."
  },
  {
    id: "node-west-africa",
    name: "West Africa (Nigeria & Angola)",
    shortName: "West Africa",
    type: "supplier",
    category: "GLOBAL_ORIGIN",
    country: "Nigeria / Angola",
    baseVolumeMbd: 0.32,
    sharePct: 6.9,
    color: "#eab308",
    x: 90,
    y: 350,
    status: "active",
    baseRisk: 34,
    description: "Sweet crude grades (Bonny Light/Girassol) navigating Cape of Good Hope open ocean."
  },

  // 2. MARITIME CORRIDORS & CHOKEPOINTS
  {
    id: "node-corridor-hormuz",
    name: "Strait of Hormuz (Chokepoint)",
    shortName: "Strait of Hormuz",
    type: "chokepoint",
    category: "MARITIME_CORRIDOR",
    flowCapacityMbd: 3.5,
    baseVolumeMbd: 2.73,
    sharePct: 58.4,
    x: 320,
    y: 140,
    status: "active",
    baseRisk: 64,
    description: "Critical 39km-wide maritime chokepoint handling ~58% of India's baseline crude imports."
  },
  {
    id: "node-corridor-redsea",
    name: "Red Sea & Bab-el-Mandeb (Chokepoint)",
    shortName: "Red Sea / Mandeb",
    type: "chokepoint",
    category: "MARITIME_CORRIDOR",
    flowCapacityMbd: 2.0,
    baseVolumeMbd: 0.87,
    sharePct: 18.6,
    x: 270,
    y: 240,
    status: "active",
    baseRisk: 78,
    description: "Narrow chokepoint between Yemen & Djibouti vulnerable to drone & missile interdiction."
  },
  {
    id: "node-corridor-arabian-sea",
    name: "Arabian Sea Open Maritime Highway",
    shortName: "Arabian Sea",
    type: "corridor",
    category: "MARITIME_CORRIDOR",
    flowCapacityMbd: 5.0,
    baseVolumeMbd: 3.90,
    sharePct: 83.5,
    x: 430,
    y: 200,
    status: "active",
    baseRisk: 22,
    description: "Deepwater navigation corridor directly connecting Gulf & Middle East exports to West Coast India."
  },
  {
    id: "node-corridor-cape",
    name: "Cape of Good Hope Diversion Route",
    shortName: "Cape Route",
    type: "corridor",
    category: "MARITIME_CORRIDOR",
    flowCapacityMbd: 3.0,
    baseVolumeMbd: 0.70,
    sharePct: 15.0,
    x: 350,
    y: 360,
    status: "active",
    baseRisk: 15,
    description: "Long-haul bypass route avoiding Red Sea & Hormuz. Adds 14–18 days voyage latency."
  },

  // 3. STRATEGIC INDIAN RECEIVING PORTS
  {
    id: "node-port-sikka",
    name: "Sikka / Vadinar SPM Port Complex (Gujarat)",
    shortName: "Sikka / Vadinar Port",
    type: "port",
    category: "INDIAN_PORT",
    coast: "West Coast",
    handlingCapacityMbd: 2.20,
    currentIntakeMbd: 1.85,
    x: 580,
    y: 150,
    status: "active",
    baseRisk: 30,
    description: "India's highest throughput Single Point Mooring (SPM) complex feeding Jamnagar & Vadinar refineries."
  },
  {
    id: "node-port-mumbai",
    name: "Mumbai Port & Jawahar Dweep (Maharashtra)",
    shortName: "Mumbai Port",
    type: "port",
    category: "INDIAN_PORT",
    coast: "West Coast",
    handlingCapacityMbd: 0.80,
    currentIntakeMbd: 0.65,
    x: 600,
    y: 220,
    status: "active",
    baseRisk: 24,
    description: "Dedicated marine oil terminal supplying BPCL Mumbai & HPCL Mumbai coastal refineries."
  },
  {
    id: "node-port-kochi",
    name: "Kochi Port & SPM (Kerala)",
    shortName: "Kochi Port",
    type: "port",
    category: "INDIAN_PORT",
    coast: "Southwest Coast",
    handlingCapacityMbd: 0.45,
    currentIntakeMbd: 0.35,
    x: 630,
    y: 330,
    status: "active",
    baseRisk: 18,
    description: "Deepwater offshore mooring directly connected to BPCL Kochi refinery via submarine pipeline."
  },
  {
    id: "node-port-paradip",
    name: "Paradip Port SPM (Odisha)",
    shortName: "Paradip Port",
    type: "port",
    category: "INDIAN_PORT",
    coast: "East Coast",
    handlingCapacityMbd: 0.90,
    currentIntakeMbd: 0.72,
    x: 740,
    y: 200,
    status: "active",
    baseRisk: 22,
    description: "Strategic East Coast deepwater terminal feeding IOCL Paradip & the Paradip-Haldia pipeline."
  },
  {
    id: "node-port-vizag",
    name: "Visakhapatnam Port (Andhra Pradesh)",
    shortName: "Vizag Port",
    type: "port",
    category: "INDIAN_PORT",
    coast: "East Coast",
    handlingCapacityMbd: 0.55,
    currentIntakeMbd: 0.42,
    x: 720,
    y: 260,
    status: "active",
    baseRisk: 20,
    description: "Offshore berth feeding HPCL Visakh refinery and co-located with the Visakhapatnam SPR cavern."
  },

  // 4. STRATEGIC REFINERIES
  {
    id: "node-refinery-jamnagar",
    name: "Jamnagar Refinery Complex (Reliance Industries)",
    shortName: "Jamnagar (RIL)",
    type: "refinery",
    category: "DOMESTIC_REFINERY",
    capacityMbd: 1.40,
    throughputMbd: 1.36,
    x: 850,
    y: 100,
    status: "active",
    baseRisk: 38,
    connectedPort: "node-port-sikka",
    description: "World's largest refining complex with ultra-deep coking capability for heavy sour grades."
  },
  {
    id: "node-refinery-vadinar",
    name: "Vadinar Refinery (Nayara Energy)",
    shortName: "Vadinar (Nayara)",
    type: "refinery",
    category: "DOMESTIC_REFINERY",
    capacityMbd: 0.40,
    throughputMbd: 0.38,
    x: 850,
    y: 150,
    status: "active",
    baseRisk: 42,
    connectedPort: "node-port-sikka",
    description: "High-complexity coastal refinery optimized for Russian Urals and heavy Gulf crude."
  },
  {
    id: "node-refinery-panipat",
    name: "Panipat Refinery (IOCL - Haryana)",
    shortName: "Panipat (IOCL)",
    type: "refinery",
    category: "DOMESTIC_REFINERY",
    capacityMbd: 0.35,
    throughputMbd: 0.35,
    x: 850,
    y: 200,
    status: "active",
    baseRisk: 45,
    connectedPort: "node-port-sikka",
    description: "Inland strategic refinery supplied via 1,194 km Salaya-Mathura-Panipat crude pipeline."
  },
  {
    id: "node-refinery-kochi",
    name: "Kochi Refinery (BPCL)",
    shortName: "Kochi (BPCL)",
    type: "refinery",
    category: "DOMESTIC_REFINERY",
    capacityMbd: 0.31,
    throughputMbd: 0.30,
    x: 850,
    y: 250,
    status: "active",
    baseRisk: 26,
    connectedPort: "node-port-kochi",
    description: "South India coastal energy hub serving regional transport and jet fuel demand."
  },
  {
    id: "node-refinery-paradip",
    name: "Paradip Refinery (IOCL)",
    shortName: "Paradip (IOCL)",
    type: "refinery",
    category: "DOMESTIC_REFINERY",
    capacityMbd: 0.30,
    throughputMbd: 0.30,
    x: 850,
    y: 300,
    status: "active",
    baseRisk: 28,
    connectedPort: "node-port-paradip",
    description: "State-of-the-art coking refinery feeding Eastern India product distribution grid."
  },
  {
    id: "node-refinery-vizag",
    name: "Visakh Refinery (HPCL)",
    shortName: "Visakh (HPCL)",
    type: "refinery",
    category: "DOMESTIC_REFINERY",
    capacityMbd: 0.17,
    throughputMbd: 0.16,
    x: 850,
    y: 350,
    status: "active",
    baseRisk: 25,
    connectedPort: "node-port-vizag",
    description: "Directly linked to HPCL pipelines and emergency Vizag SPR cavern discharge line."
  },

  // 5. STRATEGIC PETROLEUM RESERVES (SPR)
  {
    id: "node-spr-vizag",
    name: "Visakhapatnam SPR (Andhra Pradesh)",
    shortName: "Vizag SPR",
    type: "reserve",
    category: "STRATEGIC_RESERVE",
    capacityMmT: 1.33,
    capacityDays: 2.4,
    x: 930,
    y: 360,
    status: "standby",
    baseRisk: 10,
    description: "Underground rock cavern holding 1.33 MMT crude directly connected to Visakh refinery."
  },
  {
    id: "node-spr-mangalore",
    name: "Mangalore SPR (Karnataka)",
    shortName: "Mangalore SPR",
    type: "reserve",
    category: "STRATEGIC_RESERVE",
    capacityMmT: 1.50,
    capacityDays: 2.7,
    x: 930,
    y: 260,
    status: "standby",
    baseRisk: 10,
    description: "Underground rock cavern with 1.50 MMT capacity connected to MRPL coastal refinery."
  },
  {
    id: "node-spr-padur",
    name: "Padur SPR (Karnataka)",
    shortName: "Padur SPR",
    type: "reserve",
    category: "STRATEGIC_RESERVE",
    capacityMmT: 2.50,
    capacityDays: 4.4,
    x: 930,
    y: 180,
    status: "standby",
    baseRisk: 10,
    description: "India's largest SPR cavern with 4 compartments holding 2.50 MMT strategic crude."
  }
];

export const DIGITAL_TWIN_EDGES = [
  // Russian flows
  { id: "e-rus-redsea", from: "node-russia", to: "node-corridor-redsea", volumeMbd: 0.93, flowType: "maritime_primary" },
  { id: "e-rus-cape", from: "node-russia", to: "node-corridor-cape", volumeMbd: 0.65, flowType: "maritime_diversion" },

  // Iraqi flows
  { id: "e-irq-hormuz", from: "node-iraq", to: "node-corridor-hormuz", volumeMbd: 0.98, flowType: "maritime_primary" },

  // Saudi flows
  { id: "e-sau-hormuz", from: "node-saudi", to: "node-corridor-hormuz", volumeMbd: 0.55, flowType: "maritime_primary" },
  { id: "e-sau-redsea", from: "node-saudi", to: "node-corridor-redsea", volumeMbd: 0.20, flowType: "pipeline_bypass" },

  // UAE flows
  { id: "e-uae-hormuz", from: "node-uae", to: "node-corridor-hormuz", volumeMbd: 0.22, flowType: "maritime_primary" },
  { id: "e-uae-arabian", from: "node-uae", to: "node-corridor-arabian-sea", volumeMbd: 0.20, flowType: "fujairah_bypass" },

  // Kuwait flows
  { id: "e-kwt-hormuz", from: "node-kuwait", to: "node-corridor-hormuz", volumeMbd: 0.24, flowType: "maritime_primary" },

  // US flows
  { id: "e-usa-cape", from: "node-usa", to: "node-corridor-cape", volumeMbd: 0.38, flowType: "maritime_primary" },

  // West Africa flows
  { id: "e-waf-cape", from: "node-west-africa", to: "node-corridor-cape", volumeMbd: 0.32, flowType: "maritime_primary" },

  // Chokepoint & Corridor convergence to Arabian Sea / Indian Waters
  { id: "e-hormuz-arabian", from: "node-corridor-hormuz", to: "node-corridor-arabian-sea", volumeMbd: 1.99, flowType: "chokepoint_egress" },
  { id: "e-redsea-arabian", from: "node-corridor-redsea", to: "node-corridor-arabian-sea", volumeMbd: 1.13, flowType: "chokepoint_egress" },
  { id: "e-cape-arabian", from: "node-corridor-cape", to: "node-corridor-arabian-sea", volumeMbd: 0.78, flowType: "open_ocean" },
  { id: "e-cape-eastcoast", from: "node-corridor-cape", to: "node-port-paradip", volumeMbd: 0.57, flowType: "open_ocean" },

  // Arabian Sea dispersal to West Coast Ports
  { id: "e-arabian-sikka", from: "node-corridor-arabian-sea", to: "node-port-sikka", volumeMbd: 2.15, flowType: "port_offloading" },
  { id: "e-arabian-mumbai", from: "node-corridor-arabian-sea", to: "node-port-mumbai", volumeMbd: 0.65, flowType: "port_offloading" },
  { id: "e-arabian-kochi", from: "node-corridor-arabian-sea", to: "node-port-kochi", volumeMbd: 0.35, flowType: "port_offloading" },
  { id: "e-arabian-vizag", from: "node-corridor-arabian-sea", to: "node-port-vizag", volumeMbd: 0.42, flowType: "coastal_transit" },

  // Port to Refinery Pipeline Feeders
  { id: "e-sikka-jamnagar", from: "node-port-sikka", to: "node-refinery-jamnagar", volumeMbd: 1.40, flowType: "pipeline_feed" },
  { id: "e-sikka-vadinar", from: "node-port-sikka", to: "node-refinery-vadinar", volumeMbd: 0.40, flowType: "pipeline_feed" },
  { id: "e-sikka-panipat", from: "node-port-sikka", to: "node-refinery-panipat", volumeMbd: 0.35, flowType: "cross_country_pipeline" },
  { id: "e-kochi-ref", from: "node-port-kochi", to: "node-refinery-kochi", volumeMbd: 0.31, flowType: "pipeline_feed" },
  { id: "e-paradip-ref", from: "node-port-paradip", to: "node-refinery-paradip", volumeMbd: 0.30, flowType: "pipeline_feed" },
  { id: "e-vizag-ref", from: "node-port-vizag", to: "node-refinery-vizag", volumeMbd: 0.17, flowType: "pipeline_feed" },

  // Refinery to SPR Links
  { id: "e-ref-padur", from: "node-refinery-jamnagar", to: "node-spr-padur", volumeMbd: 0.0, flowType: "spr_buffer" },
  { id: "e-ref-mangalore", from: "node-refinery-kochi", to: "node-spr-mangalore", volumeMbd: 0.0, flowType: "spr_buffer" },
  { id: "e-ref-vizag", from: "node-refinery-vizag", to: "node-spr-vizag", volumeMbd: 0.0, flowType: "spr_buffer" }
];
