/**
 * EnergyShield Data Service: Maritime Route Intelligence & Corridor Analysis
 * 
 * NOTE: All data structures contain SIMULATED / ILLUSTRATIVE routing information.
 */

export const SIMULATED_SHIPPING_ROUTES = [
  {
    id: "route-hormuz-west",
    name: "Persian Gulf → Strait of Hormuz → Indian West Coast",
    corridor: "Strait of Hormuz",
    origin: "Ras Tanura / Basra / Mina Al Ahmadi",
    destination: "Mundra / Vadinar / Sikka / Mumbai / JNPT",
    transitTimeDays: 4.2,
    freightCostMultiplier: 1.0, // Benchmark
    chokepointExposure: "CRITICAL (Single chokepoint width ~39km)",
    disruptionRiskScore: 78,
    riskLevel: "HIGH",
    volumeSharePct: 58.4,
    alternativeRoute: "Fujairah bypass pipeline (UAE) OR Cape of Good Hope long-haul (Atlantic imports)",
    status: "Congested / Naval Drills Reported",
    keyPorts: ["Mundra (Adani)", "Vadinar (Nayara/IOCL)", "Mumbai (BPCL/HPCL)"]
  },
  {
    id: "route-suez-redsea-india",
    name: "Baltic / Med → Suez → Red Sea (Bab-el-Mandeb) → India",
    corridor: "Red Sea / Bab-el-Mandeb",
    origin: "Primorsk / Novorossiysk / Sidi Kerir",
    destination: "Kochi / Mangalore / Vadinar / Paradip",
    transitTimeDays: 16.5,
    freightCostMultiplier: 2.15, // Elevated war-risk insurance + tanker premiums
    chokepointExposure: "SEVERE (Bab-el-Mandeb drone/missile threat zone)",
    disruptionRiskScore: 84,
    riskLevel: "CRITICAL",
    volumeSharePct: 18.6,
    alternativeRoute: "Cape of Good Hope Diversion (+16-18 days voyage, higher bunker fuel)",
    status: "Active Conflict Warning / Widespread Diversions",
    keyPorts: ["Kochi", "Mangalore", "Paradip", "Visakhapatnam"]
  },
  {
    id: "route-cape-diversion",
    name: "Atlantic / Baltic / US Gulf → Cape of Good Hope → Indian Ocean",
    corridor: "Cape of Good Hope",
    origin: "US Gulf Coast / West Africa (Bonny) / Baltic Diversion",
    destination: "Indian West & East Coast (All Ports)",
    transitTimeDays: 32.0,
    freightCostMultiplier: 1.85,
    chokepointExposure: "LOW (Open ocean passage)",
    disruptionRiskScore: 28,
    riskLevel: "LOW",
    volumeSharePct: 14.2,
    alternativeRoute: "Primary fallback during Red Sea or Suez closure",
    status: "Clear Weather / Logistically Strained due to Long Voyage Duration",
    keyPorts: ["Paradip", "Visakhapatnam", "Chennai", "Kochi"]
  },
  {
    id: "route-arabian-sea-intercoastal",
    name: "Arabian Sea Coastal Feeder & SPM Offloading",
    corridor: "Arabian Sea",
    origin: "Deepwater STS / Western Hubs",
    destination: "Deendayal / Okha / Sikka / Mangalore",
    transitTimeDays: 2.0,
    freightCostMultiplier: 1.10,
    chokepointExposure: "LOW (Domestic coastal waters)",
    disruptionRiskScore: 38,
    riskLevel: "MODERATE",
    volumeSharePct: 8.8,
    alternativeRoute: "Direct pipeline discharge or rail-bridge inland supply",
    status: "Seasonal Monsoon Swell Monitoring",
    keyPorts: ["Deendayal", "Okha", "Sikka"]
  }
];

export async function getRouteData() {
  return Promise.resolve({
    status: "SIMULATED_DEMO_DATA",
    timestamp: new Date().toISOString(),
    routes: SIMULATED_SHIPPING_ROUTES
  });
}
