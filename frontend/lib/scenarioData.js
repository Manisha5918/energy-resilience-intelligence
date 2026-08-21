/**
 * EnergyShield Scenario Data Service
 * 
 * Defines structured disruption scenario templates for national energy security modeling.
 * NOTE: All scenario metrics, probabilities, and default multipliers are SIMULATED / ILLUSTRATIVE DEMO DATA.
 */

export const SIMULATED_SCENARIOS = [
  {
    id: "hormuz-closure",
    name: "Strait of Hormuz Severe Disruption",
    category: "Maritime Chokepoint",
    description: "Military drills and heightened naval confrontations in the Strait of Hormuz restrict commercial tanker passage by 70%, stranding Persian Gulf crude liftings for Indian refiners.",
    badgeColor: "bg-amber-950 text-amber-400 border-amber-800",
    affectedCorridors: ["hormuz", "arabian_sea"],
    affectedSuppliers: ["iraq", "saudi_arabia", "uae", "kuwait"],
    beneficiarySuppliers: ["russia", "usa", "west_africa"],
    defaultDurationDays: 15,
    defaultSeverity: "Severe", // Low | Moderate | Severe
    severityScale: 75, // 0 - 100
    supplyDisruptionPercent: 42, // % of national crude imports disrupted
    priceShockPercent: 22, // % Brent crude price spike
    freightImpactPercent: 35, // % shipping & war-risk freight increase
    recoveryDays: 30,
    geopoliticalFactorOffset: +20,
    logisticsFactorOffset: +28,
    concentrationFactorOffset: +15,
    volatilityFactorOffset: +18,
    supplyGapFactorOffset: +45,
    scenarioNarrative: "Over 58% of India's crude imports pass through Hormuz. A 15-day disruption creates an immediate 1.96 MBD supply shortfall, severely stressing western port refineries (Jamnagar, Vadinar) and northern pipeline feeds (Panipat)."
  },
  {
    id: "redsea-escalation",
    name: "Red Sea & Bab-el-Mandeb Full Closure",
    category: "Maritime Chokepoint",
    description: "Escalating drone and anti-ship missile threats shut all commercial tanker transit through the Bab-el-Mandeb Strait, forcing all European, Mediterranean, and Russian Baltic cargoes to detour around the Cape of Good Hope.",
    badgeColor: "bg-rose-950 text-rose-400 border-rose-800",
    affectedCorridors: ["redsea"],
    affectedSuppliers: ["russia"],
    beneficiarySuppliers: ["saudi_arabia", "uae", "iraq"],
    defaultDurationDays: 30,
    defaultSeverity: "Moderate",
    severityScale: 60,
    supplyDisruptionPercent: 20,
    priceShockPercent: 12,
    freightImpactPercent: 55, // Massive voyage extension (+14-18 days)
    recoveryDays: 45,
    geopoliticalFactorOffset: +18,
    logisticsFactorOffset: +32,
    concentrationFactorOffset: +5,
    volatilityFactorOffset: +10,
    supplyGapFactorOffset: +20,
    scenarioNarrative: "Forces 100% of Suez-transiting crude onto the 32-day Cape of Good Hope route, raising voyage bunker costs, vessel charter day-rates, and delaying 0.93 MBD of Mediterranean and Russian flows."
  },
  {
    id: "supplier-loss-russia",
    name: "Major Supplier Embargo & Secondary Sanctions",
    category: "Geopolitical & Sanctions",
    description: "Strict international enforcement of maritime insurance sanctions on the shadow tanker fleet halts 60% of discounted Russian crude imports, requiring emergency substitution with spot cargoes.",
    badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
    affectedCorridors: ["redsea", "cape_route"],
    affectedSuppliers: ["russia"],
    beneficiarySuppliers: ["saudi_arabia", "uae", "usa", "west_africa"],
    defaultDurationDays: 60,
    defaultSeverity: "Severe",
    severityScale: 70,
    supplyDisruptionPercent: 25,
    priceShockPercent: 16,
    freightImpactPercent: 20,
    recoveryDays: 60,
    geopoliticalFactorOffset: +22,
    logisticsFactorOffset: +10,
    concentrationFactorOffset: +25,
    volatilityFactorOffset: +15,
    supplyGapFactorOffset: +30,
    scenarioNarrative: "Eliminates discounted Urals deliveries (~1.0 MBD). Refiners must pivot toward term contracts with Gulf NOCs and US Gulf Coast sweet crude, expanding India's landed import bill."
  },
  {
    id: "crude-price-shock",
    name: "Global Macro Crude Price Spike (+40%)",
    category: "Market Volatility",
    description: "Sudden OPEC+ production quotas coupled with strategic export curtailments trigger a rapid surge in Brent crude from $84/bbl to over $118/bbl.",
    badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
    affectedCorridors: [],
    affectedSuppliers: [],
    beneficiarySuppliers: [],
    defaultDurationDays: 30,
    defaultSeverity: "Moderate",
    severityScale: 50,
    supplyDisruptionPercent: 8,
    priceShockPercent: 40,
    freightImpactPercent: 15,
    recoveryDays: 45,
    geopoliticalFactorOffset: +12,
    logisticsFactorOffset: +5,
    concentrationFactorOffset: +8,
    volatilityFactorOffset: +35,
    supplyGapFactorOffset: +10,
    scenarioNarrative: "Physical supply flows remain mostly intact, but landed procurement cost rises by ~40%, severely stressing refinery margins and national foreign exchange reserves."
  },
  {
    id: "combined-crisis",
    name: "Combined Maritime & Supplier Simultaneous Crisis",
    category: "Compound Disruption",
    description: "Simultaneous Strait of Hormuz naval standoff, Bab-el-Mandeb closure, and tightening tanker sanctions create a severe multi-front national energy supply emergency.",
    badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
    affectedCorridors: ["hormuz", "redsea"],
    affectedSuppliers: ["iraq", "saudi_arabia", "russia", "kuwait"],
    beneficiarySuppliers: ["usa", "west_africa"],
    defaultDurationDays: 30,
    defaultSeverity: "Severe",
    severityScale: 90,
    supplyDisruptionPercent: 58,
    priceShockPercent: 38,
    freightImpactPercent: 65,
    recoveryDays: 75,
    geopoliticalFactorOffset: +30,
    logisticsFactorOffset: +35,
    concentrationFactorOffset: +28,
    volatilityFactorOffset: +30,
    supplyGapFactorOffset: +55,
    scenarioNarrative: "Compound catastrophe scenario. Over 2.7 MBD of crude imports halted or delayed. Triggers immediate national Strategic Petroleum Reserve (SPR) emergency drawdown and rationing contingencies."
  }
];

export function getScenarioData() {
  return SIMULATED_SCENARIOS;
}

export function getScenarioById(id) {
  return SIMULATED_SCENARIOS.find((s) => s.id === id) || SIMULATED_SCENARIOS[0];
}
