/**
 * EnergyShield Data Schema: Geospatial Nodes and Maritime Route Geometries
 * 
 * Defines global crude loading basins, critical maritime chokepoints, Indian discharge ports,
 * domestic pipeline networks, refineries, and strategic storage caverns.
 * 
 * Provenance Status:
 * - Port / Refinery / SPR Coordinates: PUBLIC_ESTIMATE / GEODETIC_BENCHMARK
 * - Chokepoints: PUBLIC_ESTIMATE
 * - Flow Capacities & Risk Metrics: SIMULATED / MODEL_ASSUMPTION
 */

export const GIS_INFRASTRUCTURE_NODES = [
  // 1. GLOBAL CRUDE BASINS / SUPPLIERS
  {
    id: "geo-ras-tanura",
    name: "Ras Tanura Terminal",
    country: "Saudi Arabia",
    type: "supplier",
    lat: 26.6433,
    lng: 50.1611,
    capacityMBD: 6.50,
    currentFlowMBD: 1.15,
    riskScore: 68,
    status: "ELEVATED",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Main loading port for Saudi Aramco crude into Persian Gulf."
  },
  {
    id: "geo-basra",
    name: "Basra Oil Terminal (ABOT)",
    country: "Iraq",
    type: "supplier",
    lat: 29.6800,
    lng: 48.8000,
    capacityMBD: 3.50,
    currentFlowMBD: 0.98,
    riskScore: 72,
    status: "ELEVATED",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Key offshore loading terminal for Basrah Heavy/Medium to Indian refiners."
  },
  {
    id: "geo-fujairah",
    name: "Fujairah Offshore Terminal",
    country: "United Arab Emirates",
    type: "supplier",
    lat: 25.1288,
    lng: 56.3265,
    capacityMBD: 2.00,
    currentFlowMBD: 0.65,
    riskScore: 35,
    status: "MODERATE",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Gulf of Oman terminal connecting Habshan-Fujairah pipeline (bypasses Hormuz)."
  },
  {
    id: "geo-primorsk",
    name: "Primorsk / Baltic Terminal",
    country: "Russia",
    type: "supplier",
    lat: 60.3667,
    lng: 28.6000,
    capacityMBD: 1.80,
    currentFlowMBD: 1.55,
    riskScore: 62,
    status: "ELEVATED",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Baltic port loading Urals crude for Indian refiners under OFAC price cap rules."
  },
  {
    id: "geo-houston",
    name: "US Gulf Coast / Houston",
    country: "United States",
    type: "supplier",
    lat: 29.7604,
    lng: -95.3698,
    capacityMBD: 4.50,
    currentFlowMBD: 0.22,
    riskScore: 12,
    status: "LOW",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "US WTI Midland loading terminal; strategic alternative bypassing all Middle East choke points."
  },
  {
    id: "geo-santos",
    name: "Santos Basin Terminal",
    country: "Brazil",
    type: "supplier",
    lat: -23.9608,
    lng: -46.3336,
    capacityMBD: 2.20,
    currentFlowMBD: 0.15,
    riskScore: 15,
    status: "LOW",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Deepwater pre-salt crude loading terminal; Atlantic corridor to Indian Ocean."
  },

  // 2. MARITIME CHOKEPOINTS
  {
    id: "geo-choke-hormuz",
    name: "Strait of Hormuz",
    type: "chokepoint",
    lat: 26.5667,
    lng: 56.2500,
    capacityMBD: 21.0,
    currentFlowMBD: 2.80, // Indian share
    riskScore: 92,
    status: "CRITICAL",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "39 km-wide chokepoint transiting >58% of India's crude imports."
  },
  {
    id: "geo-choke-bab",
    name: "Bab-el-Mandeb & Southern Red Sea",
    type: "chokepoint",
    lat: 12.5833,
    lng: 43.3333,
    capacityMBD: 6.20,
    currentFlowMBD: 0.85,
    riskScore: 84,
    status: "SEVERE",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Maritime chokepoint between Djibouti and Yemen; drone/missile threat corridor."
  },
  {
    id: "geo-choke-cape",
    name: "Cape of Good Hope Reroute",
    type: "chokepoint",
    lat: -34.3568,
    lng: 18.4740,
    capacityMBD: 15.0,
    currentFlowMBD: 0.90,
    riskScore: 20,
    status: "LOW",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Longer alternative maritime route (+12 to +16 days) avoiding Red Sea/Suez."
  },
  {
    id: "geo-choke-malacca",
    name: "Strait of Malacca",
    type: "chokepoint",
    lat: 1.4300,
    lng: 102.8900,
    capacityMBD: 16.0,
    currentFlowMBD: 0.40,
    riskScore: 38,
    status: "MODERATE",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Primary Far East & Southeast Asian maritime transit passage."
  },

  // 3. INDIAN DISCHARGE PORTS
  {
    id: "geo-port-vadinar",
    name: "Vadinar / Sikka Marine Terminal",
    country: "India",
    state: "Gujarat",
    type: "port",
    lat: 22.4500,
    lng: 69.7167,
    capacityMBD: 1.85,
    currentFlowMBD: 1.60,
    riskScore: 28,
    status: "STABLE",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Primary western crude discharge port servicing Jamnagar and Vadinar refineries."
  },
  {
    id: "geo-port-mundra",
    name: "Mundra Port SPM",
    country: "India",
    state: "Gujarat",
    type: "port",
    lat: 22.7500,
    lng: 69.7000,
    capacityMBD: 0.90,
    currentFlowMBD: 0.55,
    riskScore: 25,
    status: "STABLE",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Crude intake hub for Salaya-Mathura-Panipat cross-country pipeline."
  },
  {
    id: "geo-port-mumbai",
    name: "Mumbai Port / Jawahar Dweep",
    country: "India",
    state: "Maharashtra",
    type: "port",
    lat: 18.9500,
    lng: 72.8500,
    capacityMBD: 0.45,
    currentFlowMBD: 0.38,
    riskScore: 22,
    status: "STABLE",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Services BPCL and HPCL Mumbai refineries."
  },
  {
    id: "geo-port-kochi",
    name: "Cochin Port Offshore SPM",
    country: "India",
    state: "Kerala",
    type: "port",
    lat: 9.9667,
    lng: 76.2667,
    capacityMBD: 0.35,
    currentFlowMBD: 0.31,
    riskScore: 20,
    status: "STABLE",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Deep-water SPM handling VLCC crude carriers for BPCL Kochi Refinery."
  },
  {
    id: "geo-port-mangalore",
    name: "New Mangalore Port SPM",
    country: "India",
    state: "Karnataka",
    type: "port",
    lat: 12.9200,
    lng: 74.8200,
    capacityMBD: 0.40,
    currentFlowMBD: 0.35,
    riskScore: 22,
    status: "STABLE",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Discharge berth for MRPL and ISPRL Mangalore/Padur caverns."
  },
  {
    id: "geo-port-paradip",
    name: "Paradip Port Offshore SPM",
    country: "India",
    state: "Odisha",
    type: "port",
    lat: 20.2600,
    lng: 86.6700,
    capacityMBD: 0.55,
    currentFlowMBD: 0.45,
    riskScore: 24,
    status: "STABLE",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Main East Coast crude import terminal feeding IOCL Paradip and PHBPL pipeline."
  },
  {
    id: "geo-port-visakh",
    name: "Visakhapatnam Port Offshore Berth",
    country: "India",
    state: "Andhra Pradesh",
    type: "port",
    lat: 17.6868,
    lng: 83.2185,
    capacityMBD: 0.30,
    currentFlowMBD: 0.22,
    riskScore: 20,
    status: "STABLE",
    sourceStatus: "PUBLIC_ESTIMATE",
    notes: "Discharge facility connected to HPCL Visakh Refinery and ISPRL Vizag Cavern."
  },

  // 4. DOMESTIC REFINERIES
  {
    id: "geo-ref-jamnagar",
    name: "Jamnagar Refinery Complex (RIL)",
    type: "refinery",
    lat: 22.3500,
    lng: 69.8500,
    capacityMBD: 1.37,
    riskScore: 24,
    status: "OPERATIONAL",
    sourceStatus: "OFFICIAL",
    notes: "68.2 MMTPA export and domestic refinery complex."
  },
  {
    id: "geo-ref-vadinar",
    name: "Vadinar Refinery (Nayara)",
    type: "refinery",
    lat: 22.4200,
    lng: 69.7500,
    capacityMBD: 0.40,
    riskScore: 26,
    status: "OPERATIONAL",
    sourceStatus: "OFFICIAL",
    notes: "20 MMTPA complex processing heavy sour crude."
  },
  {
    id: "geo-ref-panipat",
    name: "Panipat Refinery (IOCL)",
    type: "refinery",
    lat: 29.3909,
    lng: 76.9635,
    capacityMBD: 0.35,
    riskScore: 22,
    status: "OPERATIONAL",
    sourceStatus: "OFFICIAL",
    notes: "15 MMTPA northern inland refinery connected via SMPL pipeline."
  },
  {
    id: "geo-ref-kochi",
    name: "Kochi Refinery (BPCL)",
    type: "refinery",
    lat: 9.9816,
    lng: 76.3533,
    capacityMBD: 0.31,
    riskScore: 18,
    status: "OPERATIONAL",
    sourceStatus: "OFFICIAL",
    notes: "15.5 MMTPA high-efficiency coastal refinery."
  },
  {
    id: "geo-ref-paradip",
    name: "Paradip Refinery (IOCL)",
    type: "refinery",
    lat: 20.3100,
    lng: 86.6000,
    capacityMBD: 0.30,
    riskScore: 20,
    status: "OPERATIONAL",
    sourceStatus: "OFFICIAL",
    notes: "15 MMTPA refinery on eastern coast."
  },
  {
    id: "geo-ref-visakh",
    name: "Visakh Refinery (HPCL)",
    type: "refinery",
    lat: 17.7000,
    lng: 83.2500,
    capacityMBD: 0.17,
    riskScore: 19,
    status: "OPERATIONAL",
    sourceStatus: "OFFICIAL",
    notes: "8.33 MMTPA modern coastal refinery."
  },

  // 5. STRATEGIC PETROLEUM RESERVES (ISPRL)
  {
    id: "geo-spr-vizag",
    name: "ISPRL Visakhapatnam Cavern",
    type: "reserve",
    lat: 17.7200,
    lng: 83.2800,
    capacityMillionBarrels: 9.77,
    riskScore: 15,
    status: "STANDBY_BUFFER",
    sourceStatus: "OFFICIAL_CAPACITY",
    notes: "1.33 MMT underground unlined rock cavern."
  },
  {
    id: "geo-spr-mangalore",
    name: "ISPRL Mangalore Cavern",
    type: "reserve",
    lat: 12.9800,
    lng: 74.8800,
    capacityMillionBarrels: 11.02,
    riskScore: 15,
    status: "STANDBY_BUFFER",
    sourceStatus: "OFFICIAL_CAPACITY",
    notes: "1.50 MMT underground unlined granite cavern."
  },
  {
    id: "geo-spr-padur",
    name: "ISPRL Padur Cavern",
    type: "reserve",
    lat: 13.2200,
    lng: 74.7800,
    capacityMillionBarrels: 18.37,
    riskScore: 15,
    status: "STANDBY_BUFFER",
    sourceStatus: "OFFICIAL_CAPACITY",
    notes: "2.50 MMT underground rock cavern near Udupi."
  }
];

export const GIS_MARITIME_AND_PIPELINE_ROUTES = [
  {
    id: "route-persian-to-vadinar",
    name: "Persian Gulf to Gujarat Ports (Vadinar/Sikka)",
    originId: "geo-ras-tanura",
    destinationId: "geo-port-vadinar",
    type: "maritime",
    transitDays: 4,
    flowMBD: 2.10,
    riskScore: 88,
    status: "HIGH_RISK",
    coordinates: [
      [26.6433, 50.1611],
      [26.5667, 56.2500], // Hormuz
      [24.5000, 59.0000],
      [23.0000, 65.0000],
      [22.4500, 69.7167]  // Vadinar
    ],
    sourceStatus: "SIMULATED"
  },
  {
    id: "route-fujairah-to-vadinar",
    name: "Habshan-Fujairah Bypass to Gujarat Ports",
    originId: "geo-fujairah",
    destinationId: "geo-port-vadinar",
    type: "maritime",
    transitDays: 3,
    flowMBD: 0.65,
    riskScore: 32,
    status: "STABLE_BYPASS",
    coordinates: [
      [25.1288, 56.3265], // Fujairah (outside Hormuz)
      [24.0000, 60.0000],
      [22.8000, 65.5000],
      [22.4500, 69.7167]
    ],
    sourceStatus: "SIMULATED"
  },
  {
    id: "route-redsea-to-kochi",
    name: "Red Sea / Yanbu to Kochi Port",
    originId: "geo-basra",
    destinationId: "geo-port-kochi",
    type: "maritime",
    transitDays: 7,
    flowMBD: 0.50,
    riskScore: 78,
    status: "ELEVATED_RISK",
    coordinates: [
      [24.0000, 38.0000], // Red Sea
      [12.5833, 43.3333], // Bab-el-Mandeb
      [11.5000, 51.0000],
      [10.5000, 65.0000],
      [9.9667, 76.2667]   // Kochi
    ],
    sourceStatus: "SIMULATED"
  },
  {
    id: "route-cape-wti-to-vadinar",
    name: "US WTI Atlantic-Cape Route to Vadinar",
    originId: "geo-houston",
    destinationId: "geo-port-vadinar",
    type: "maritime",
    transitDays: 32,
    flowMBD: 0.22,
    riskScore: 18,
    status: "RESILIENT_SECURE",
    coordinates: [
      [29.7604, -95.3698],
      [15.0000, -45.0000],
      [-10.0000, -20.0000],
      [-34.3568, 18.4740], // Cape of Good Hope
      [-20.0000, 55.0000],
      [10.0000, 65.0000],
      [22.4500, 69.7167]
    ],
    sourceStatus: "SIMULATED"
  },
  {
    id: "route-pipeline-smpl",
    name: "Salaya-Mathura-Panipat Pipeline (SMPL)",
    originId: "geo-port-mundra",
    destinationId: "geo-ref-panipat",
    type: "pipeline",
    transitDays: 1,
    flowMBD: 0.35,
    riskScore: 15,
    status: "OPERATIONAL",
    coordinates: [
      [22.7500, 69.7000],
      [25.0000, 72.0000],
      [27.4924, 77.6737],
      [29.3909, 76.9635]
    ],
    sourceStatus: "PUBLIC_ESTIMATE"
  },
  {
    id: "route-pipeline-vizag-spr",
    name: "ISPRL Vizag Cavern to HPCL Visakh Hookup",
    originId: "geo-spr-vizag",
    destinationId: "geo-ref-visakh",
    type: "pipeline",
    transitDays: 0.1,
    flowMBD: 0.17,
    riskScore: 10,
    status: "DIRECT_HOOKUP",
    coordinates: [
      [17.7200, 83.2800],
      [17.7000, 83.2500]
    ],
    sourceStatus: "OFFICIAL"
  }
];

export function getGISNodes() {
  return GIS_INFRASTRUCTURE_NODES.map(n => ({ ...n }));
}

export function getGISRoutes() {
  return GIS_MARITIME_AND_PIPELINE_ROUTES.map(r => ({ ...r }));
}
