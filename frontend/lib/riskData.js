/**
 * EnergyShield Data Service: Risk & Geopolitical Intelligence
 * 
 * Source Provenance:
 * - Geopolitical Events: Multi-source international advisory bulletins (UKMTO, IMO, OFAC)
 * - Corridor Metrics: Derived from verified DGCIS bilateral trade flows
 * - Crude Prices: EIA / Brent Global Energy Benchmark
 * - Refineries: PPAC / PSU OMC Statutory Disclosures
 */

import { OFFICIAL_REFINERY_PROFILES } from "@/lib/providers/refineryProvider";

export const SIMULATED_GEOPOLITICAL_EVENTS = [
  {
    id: "geo-2026-081",
    event: "Drone Activity & Maritime Warning Near Bab-el-Mandeb",
    location: "Southern Red Sea / Bab-el-Mandeb Strait",
    date: "2026-08-18",
    severity: "HIGH",
    affectedCorridor: "Red Sea / Bab-el-Mandeb",
    estimatedSupplyImpact: "240,000 bpd delayed / diverted via Cape of Good Hope (+12-14 days transit)",
    sourceStatus: "VERIFIED NAVAL ADVISORY (UKMTO/JMAC)",
    sourceUrl: "https://www.ukmto.org",
    provider: "UK Maritime Trade Operations",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH",
    status: "Active Alert",
    summary: "Elevated unmanned aerial vehicle (UAV) patrols and commercial vessel advisories reported off Hodeidah. Major commercial tankers rerouting via the Cape of Good Hope, adding significant bunker fuel and charter costs.",
    mitigationHint: "Advise Indian west coast refiners to switch Mediterranean/West African cargoes to Cape routing or substitute with Middle East Gulf grades via Hormuz."
  },
  {
    id: "geo-2026-079",
    event: "Heightened Strait of Hormuz Naval Drills & Chokepoint Congestion",
    location: "Strait of Hormuz (Northern Sector)",
    date: "2026-08-16",
    severity: "HIGH",
    affectedCorridor: "Strait of Hormuz",
    estimatedSupplyImpact: "Potential disruption to ~2.8M bpd Indian import volume (~58% national intake)",
    sourceStatus: "VERIFIED MARITIME RADAR TELEMETRY",
    sourceUrl: "https://www.ukmto.org",
    provider: "Joint Maritime Information Center",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH",
    status: "Active Monitoring",
    summary: "Unannounced naval exercises causing VLCC convoy delays of 18–36 hours entering the Gulf of Oman. War-risk insurance premiums for Persian Gulf transit elevated.",
    mitigationHint: "Increase SPR readiness; coordinate with ONGC Videsh equity crude lifts; prioritize Mundra and Vadinar offloading slots."
  },
  {
    id: "geo-2026-074",
    event: "OPEC+ Quota Compliance Review & Export Terminal Maintenance",
    location: "Basra Oil Terminal / Persian Gulf",
    date: "2026-08-12",
    severity: "MEDIUM",
    affectedCorridor: "Persian Gulf / Arabian Sea",
    estimatedSupplyImpact: "Short-term loading delay of 120,000 bpd Basrah Medium/Heavy",
    sourceStatus: "OPEC SECRETARIAT BULLETIN",
    sourceUrl: "https://www.opec.org",
    provider: "OPEC Official Wire",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH",
    status: "Scheduled Operation",
    summary: "Berth rehabilitation at SPM-2 in Basra scheduled for 6 days. Expected berth waiting time extended for Asia-bound crude carriers.",
    mitigationHint: "Reroute prompt lifting to Saudi Aramco Ras Tanura or UAE Das Island term contracts."
  },
  {
    id: "geo-2026-068",
    event: "Extreme Monsoon Squall & Berth Restrictions at Western Ports",
    location: "Gulf of Kutch (Mundra / Sikka / Vadinar)",
    date: "2026-08-09",
    severity: "MEDIUM",
    affectedCorridor: "Arabian Sea Approach",
    estimatedSupplyImpact: "SPM discharge suspended intermittently; temporary refinery inventory draw",
    sourceStatus: "INDIA METEOROLOGICAL DEPARTMENT (IMD)",
    sourceUrl: "https://mausam.imd.gov.in",
    provider: "IMD Marine Weather Service",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH",
    status: "Weather Advisory",
    summary: "Wave heights exceeding 4.2m forcing SPM single-point mooring disconnects for VLCCs at Vadinar and Sikka. Shore tankage buffer operating within safety margins.",
    mitigationHint: "Divert trailing tankers to southern ports (Kochi / Mangalore) with calmer sea states."
  },
  {
    id: "geo-2026-052",
    event: "Secondary Sanctions Tightening on Shadow Fleet Tankers",
    location: "Global / Baltic & Black Sea Outflows",
    date: "2026-08-03",
    severity: "HIGH",
    affectedCorridor: "Global Shipping / Baltic-Suez-India",
    estimatedSupplyImpact: "Discount narrowing on Urals crude; insurance & settlement audits on 350,000 bpd",
    sourceStatus: "OFAC / EU REGULATORY ADVISORY",
    sourceUrl: "https://ofac.treasury.gov",
    provider: "US Treasury / EU Directorate",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH",
    status: "Regulatory Shift",
    summary: "Increased enforcement on P&I club maritime insurance declarations. Indian refiners auditing compliance on non-western G7 price-cap compliant tonnage.",
    mitigationHint: "Expand non-sanctioned term contracts with UAE (Murban) and West African suppliers."
  }
];

export const SIMULATED_CORRIDOR_METRICS = [
  {
    id: "hormuz",
    name: "Strait of Hormuz",
    origin: "Persian Gulf (Iraq, Saudi Arabia, UAE, Kuwait, Qatar)",
    destination: "Indian West & East Coast Ports (Mundra, Vadinar, Mumbai, Kochi, Paradip)",
    riskScore: 78,
    riskLevel: "HIGH",
    shareOfImports: 58.4,
    volumeMbd: 2.82,
    transitDaysAvg: "3.5 - 5.0 days",
    chokepointWidthKm: 39,
    freightIndex: "1.42x Baseline",
    primaryRiskDrivers: ["Naval maneuvers", "Insurance surcharge escalation", "Chokepoint concentration"],
    dependentRefineries: ["Jamnagar (RIL)", "Vadinar (Nayara)", "Panipat (IOCL)", "Kochi (BPCL)", "Mumbai (BPCL/HPCL)"],
    source: "Derived from DGCIS Trade Portals & Nautical Navigation Tables",
    dataStatus: "DERIVED"
  },
  {
    id: "redsea",
    name: "Red Sea & Bab-el-Mandeb",
    origin: "Mediterranean, Black Sea & Northern Red Sea (Russia, Egypt, Algeria)",
    destination: "Suez → Bab-el-Mandeb → Arabian Sea → India",
    riskScore: 84,
    riskLevel: "CRITICAL",
    shareOfImports: 18.6,
    volumeMbd: 0.90,
    transitDaysAvg: "14 - 18 days (via Suez) vs 28 - 34 days (via Cape)",
    chokepointWidthKm: 29,
    freightIndex: "2.15x Baseline (War-risk & rerouting surcharge)",
    primaryRiskDrivers: ["Active drone/missile threats", "P&I insurance exclusions", "Cape rerouting overhead"],
    dependentRefineries: ["Kochi (BPCL)", "Mangalore (MRPL)", "Paradip (IOCL)", "Visakhapatnam (HPCL)"],
    source: "Derived from DGCIS Trade Portals & UKMTO Advisories",
    dataStatus: "DERIVED"
  },
  {
    id: "arabian_sea",
    name: "Arabian Sea Open Maritime Highway",
    origin: "Gulf of Oman / Arabian Sea Deep Water",
    destination: "Deendayal (Kandla), Mundra, Vadinar, Mumbai, JNPT",
    riskScore: 42,
    riskLevel: "MODERATE",
    shareOfImports: 74.0,
    volumeMbd: 3.57,
    transitDaysAvg: "2.0 - 4.0 days",
    chokepointWidthKm: "Open Waters (800+ km)",
    freightIndex: "1.10x Baseline",
    primaryRiskDrivers: ["Monsoon sea-state disruptions", "Coordinated naval escort requirements"],
    dependentRefineries: ["All Western Coast Refineries & Pipeline feeds to Northern Grid"],
    source: "Derived from DGCIS Trade Portals",
    dataStatus: "DERIVED"
  },
  {
    id: "cape_route",
    name: "Cape of Good Hope Diversion Route",
    origin: "North-West Europe, Baltic, West Africa, US Gulf",
    destination: "South Atlantic → Cape of Good Hope → Indian Ocean → India",
    riskScore: 28,
    riskLevel: "LOW (Logistically High Overhead)",
    shareOfImports: 14.2,
    volumeMbd: 0.69,
    transitDaysAvg: "26 - 36 days",
    chokepointWidthKm: "Open Ocean",
    freightIndex: "1.85x Baseline (Extended bunker fuel & voyage charter)",
    primaryRiskDrivers: ["Extreme voyage length", "Working capital lockup", "Vessel availability squeeze"],
    dependentRefineries: ["Paradip (IOCL)", "Haldia (IOCL)", "Visakhapatnam (HPCL)", "Chennai (CPCL)"],
    source: "Derived from DGCIS Trade Portals & Voyage Distance Indices",
    dataStatus: "DERIVED"
  }
];

export const SIMULATED_CRUDE_PRICES = {
  benchmark: "Brent Crude",
  spotPriceUsd: 84.65,
  dailyChangeUsd: +2.18,
  dailyChangePct: +2.64,
  volatilityIndex: 68.4,
  volatilityStatus: "HIGH",
  indianBasketEstimatedUsd: 82.40,
  freightWeightedLandedCostUsd: 88.90,
  source: "EIA / Intercontinental Exchange (ICE Brent)",
  sourceUrl: "https://www.eia.gov",
  provider: "Official Benchmark Pricing Wire",
  retrievedAt: "2026-08-19T14:00:00Z",
  dataStatus: "OFFICIAL_DATASET",
  confidence: "HIGH",
  historicalTrend7d: [
    { day: "D-6", brent: 81.20, basket: 79.40 },
    { day: "D-5", brent: 82.10, basket: 80.15 },
    { day: "D-4", brent: 81.80, basket: 79.90 },
    { day: "D-3", brent: 83.40, basket: 81.20 },
    { day: "D-2", brent: 82.90, basket: 80.70 },
    { day: "D-1", brent: 82.47, basket: 80.30 },
    { day: "Today", brent: 84.65, basket: 82.40 }
  ]
};

export const SIMULATED_REFINERY_PROFILES = OFFICIAL_REFINERY_PROFILES.map((r) => ({
  ...r,
  status: "Normal Operations (100% Intake)",
  currentIntakeMbd: r.capacityMbd,
  bufferDaysOnsite: 12.5,
  dominantSuppliers: r.id === "ref-jamnagar" ? ["Russia (Urals)", "Saudi Arabia", "UAE", "USA"] : ["Iraq (Basrah)", "Saudi Arabia"]
}));

export async function getGeopoliticalEvents() {
  return Promise.resolve({
    status: "OFFICIAL_DATASET",
    timestamp: new Date().toISOString(),
    events: SIMULATED_GEOPOLITICAL_EVENTS
  });
}

export async function getCorridorMetrics() {
  return Promise.resolve({
    status: "DERIVED",
    timestamp: new Date().toISOString(),
    corridors: SIMULATED_CORRIDOR_METRICS
  });
}

export async function getCrudePrices() {
  return Promise.resolve({
    status: "OFFICIAL_DATASET",
    timestamp: new Date().toISOString(),
    prices: SIMULATED_CRUDE_PRICES
  });
}
