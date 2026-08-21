/**
 * EnergyShield Intelligence Data Service
 * 
 * Defines normalized geopolitical, maritime, sanctions, and market intelligence objects.
 * NOTE: In Phase 3, all data objects default to SIMULATED / ILLUSTRATIVE DEMO INTELLIGENCE
 * unless external API providers are configured via server-side environment variables.
 */

export const SIMULATED_INTELLIGENCE_EVENTS = [
  {
    id: "intel-2026-001",
    title: "Naval Confrontation & Electronic Interference Reported in Northern Hormuz",
    summary: "Commercial VLCC tankers report GPS spoofing and aggressive naval patrol maneuvers in the northern sector of the Strait of Hormuz. War-risk underwriters issued an advisory warning of elevated transit delays for Gulf-loading vessels.",
    source: "UK Maritime Trade Operations (UKMTO) / Joint Maritime Advisory (Simulated)",
    sourceType: "Naval Advisory",
    publishedAt: "2026-08-19T14:30:00Z",
    retrievedAt: "2026-08-19T15:00:00Z",
    location: "Strait of Hormuz (26.56° N, 56.25° E)",
    countries: ["Iran", "Oman", "UAE"],
    eventType: "maritime", // geopolitical | maritime | sanctions | market | weather | infrastructure
    severity: "HIGH", // CRITICAL | HIGH | MEDIUM | LOW
    confidence: "HIGH", // HIGH | MEDIUM | LOW
    confidenceScore: 0.92,
    confidenceRationale: "Corroborated by 3 independent simulated AIS tracking anomalies and official maritime advisory.",
    affectedCorridors: ["hormuz", "arabian_sea"],
    affectedSuppliers: ["iraq", "saudi_arabia", "uae", "kuwait"],
    estimatedSupplyImpact: "~1.4 MBD Indian import volume delayed by 24–48 hours",
    marketImpact: "Brent crude futures +$2.15/bbl; Persian Gulf war-risk insurance premiums +35 bps",
    logisticsImpact: "VLCC convoy speeds reduced by 30%; average waiting time at Ras Tanura / Basra +1.5 days",
    status: "Active Signal",
    scenarioPresetId: "hormuz-closure",
    aiAnalysis: {
      relevanceToIndia: "Over 58% of India's crude imports transit the 39km-wide Strait of Hormuz. Any naval friction immediately jeopardizes baseline deliveries to western refining hubs (Jamnagar, Vadinar, Panipat).",
      recommendedAction: "Advise Indian refiners to maximize Fujairah pipeline liftings and prepare contingency SPR draw protocols.",
      riskEngineDelta: {
        geopolitical: +14,
        logistics: +18,
        volatility: +8,
        supplyGap: +10
      }
    }
  },
  {
    id: "intel-2026-002",
    title: "Unmanned Aerial Attack on Commercial Product Tanker off Hodeidah",
    summary: "A Liberia-flagged commercial tanker carrying refined products was targeted by two one-way attack UAVs 45 nautical miles southwest of Hodeidah. No casualties reported, but major shipping alliances announced immediate diversions via the Cape of Good Hope.",
    source: "Ambrey Maritime Security / BIMCO Alert (Simulated)",
    sourceType: "Security Feed",
    publishedAt: "2026-08-19T11:15:00Z",
    retrievedAt: "2026-08-19T12:00:00Z",
    location: "Southern Red Sea / Bab-el-Mandeb (14.20° N, 42.80° E)",
    countries: ["Yemen", "Saudi Arabia", "Eritrea"],
    eventType: "geopolitical",
    severity: "CRITICAL",
    confidence: "HIGH",
    confidenceScore: 0.95,
    confidenceRationale: "Confirmed direct incident with visual battle-damage assessment and immediate fleet re-routing confirmation.",
    affectedCorridors: ["redsea"],
    affectedSuppliers: ["russia"],
    estimatedSupplyImpact: "0.93 MBD of Mediterranean and Baltic crude shipments diverted via Cape route (+14–18 days latency)",
    marketImpact: "Global clean tanker freight rates surged +28%; bunker fuel consumption expanded by 40%",
    logisticsImpact: "100% of non-coalition commercial tanker tonnage rerouting around southern tip of Africa",
    status: "Active Threat",
    scenarioPresetId: "redsea-escalation",
    aiAnalysis: {
      relevanceToIndia: "Directly affects crude shipments originating from Russia (Novorossiysk / Primorsk) and Mediterranean ports heading to Kochi, Mangalore, and Paradip refineries.",
      recommendedAction: "Pre-contract long-haul VLCC charters on the Cape of Good Hope route and swap prompt Mediterranean barrels with West African grades.",
      riskEngineDelta: {
        geopolitical: +18,
        logistics: +22,
        volatility: +12,
        supplyGap: +14
      }
    }
  },
  {
    id: "intel-2026-003",
    title: "Treasury & G7 Issue Strict Secondary Sanctions Advisory on Shadow Fleet Insurers",
    summary: "US Office of Foreign Assets Control (OFAC) and EU maritime authorities published an expanded enforcement advisory requiring verification of Western P&I club tier-1 marine insurance on crude shipments originating from Baltic and Black Sea terminals.",
    source: "US Treasury / EU Maritime Directorate Bulletin (Simulated)",
    sourceType: "Regulatory Advisory",
    publishedAt: "2026-08-18T18:00:00Z",
    retrievedAt: "2026-08-19T08:30:00Z",
    location: "Global / Baltic & Black Sea Ports",
    countries: ["USA", "EU", "Russia", "India"],
    eventType: "sanctions",
    severity: "HIGH",
    confidence: "HIGH",
    confidenceScore: 0.88,
    confidenceRationale: "Official government policy release with verified implementation guidelines.",
    affectedCorridors: ["redsea", "cape_route"],
    affectedSuppliers: ["russia"],
    estimatedSupplyImpact: "Discount on Russian Urals narrows by $4.50/bbl; 320,000 bpd facing settlement audits",
    marketImpact: "Indian refiner landed crude import bill projected to rise by +$240M/month",
    logisticsImpact: "Increased port compliance audits and documentation wait times at Mundra and Vadinar SPMs",
    status: "Regulatory Implementation",
    scenarioPresetId: "supplier-loss-russia",
    aiAnalysis: {
      relevanceToIndia: "Russia represents ~34% of India's crude intake. Narrowing price discounts and payment compliance friction erode refining margins and force bilateral currency settlement adjustments.",
      recommendedAction: "Diversify term contracts with UAE (Murban) and US Gulf suppliers to insulate against secondary sanctions penalties.",
      riskEngineDelta: {
        geopolitical: +12,
        concentration: +16,
        volatility: +10,
        supplyGap: +8
      }
    }
  },
  {
    id: "intel-2026-004",
    title: "Basra Oil Terminal Berth Rehabilitation Extends Asia-Bound Tanker Demurrage",
    summary: "Scheduled rehabilitation work on Single Point Mooring Berth-2 (SPM-2) at Basra Oil Terminal has been extended by 8 days due to compressor repairs, resulting in a queue of 18 VLCCs in the northern Gulf.",
    source: "Middle East Energy Dispatch & Port Terminal Log (Simulated)",
    sourceType: "Infrastructure Feed",
    publishedAt: "2026-08-18T09:40:00Z",
    retrievedAt: "2026-08-19T10:15:00Z",
    location: "Basra Terminal (29.68° N, 48.81° E)",
    countries: ["Iraq"],
    eventType: "infrastructure",
    severity: "MEDIUM",
    confidence: "MEDIUM",
    confidenceScore: 0.78,
    confidenceRationale: "Single terminal operational bulletin; verified by port tanker anchorage cluster data.",
    affectedCorridors: ["hormuz"],
    affectedSuppliers: ["iraq"],
    estimatedSupplyImpact: "180,000 bpd delayed delivery to IOCL Paradip and BPCL Mumbai",
    marketImpact: "Demurrage charges accumulating at $45,000/day per chartered VLCC",
    logisticsImpact: "Port waiting time increased from standard 24 hours to 96 hours",
    status: "Scheduled Maintenance",
    scenarioPresetId: "hormuz-closure",
    aiAnalysis: {
      relevanceToIndia: "Iraq is India's second largest crude supplier (~21% import share). Demurrage delays compress refinery operating buffers.",
      recommendedAction: "Request advance lifting slots from Saudi Aramco Ras Tanura to compensate for Basrah Heavy delays.",
      riskEngineDelta: {
        logistics: +8,
        supplyGap: +6,
        volatility: +4
      }
    }
  },
  {
    id: "intel-2026-005",
    title: "OPEC+ Extraordinary Committee Signals Unexpected 400k bpd Voluntary Cut Extension",
    summary: "Delegates at the OPEC+ Joint Ministerial Monitoring Committee (JMMC) indicated that core Gulf producers plan to extend voluntary output reductions through Q4, citing macro economic resilience and inventory drawdowns.",
    source: "OPEC Secretariat Press Release / Reuters Energy (Simulated)",
    sourceType: "Market Wire",
    publishedAt: "2026-08-17T16:00:00Z",
    retrievedAt: "2026-08-18T07:00:00Z",
    location: "Vienna / Global Oil Markets",
    countries: ["Saudi Arabia", "Russia", "UAE", "Kuwait", "Iraq"],
    eventType: "market",
    severity: "MEDIUM",
    confidence: "HIGH",
    confidenceScore: 0.90,
    confidenceRationale: "Multiple official ministerial statements corroborating production quota alignment.",
    affectedCorridors: [],
    affectedSuppliers: ["saudi_arabia", "uae", "kuwait", "iraq"],
    estimatedSupplyImpact: "Tightens global prompt sour crude availability by ~400,000 bpd",
    marketImpact: "Brent benchmark futures rose +$3.40/bbl to $88.05/bbl; prompt backwardation widened",
    logisticsImpact: "Minimal physical transit impact; higher working capital lockup on term cargoes",
    status: "Policy Enacted",
    scenarioPresetId: "crude-price-shock",
    aiAnalysis: {
      relevanceToIndia: "Expands India's national oil import bill by an estimated $380M per quarter and increases landed refining costs across all PSUs.",
      recommendedAction: "Hedge Q4 distillate cracks and evaluate spot West African / US WTI Midland arbitrage economics.",
      riskEngineDelta: {
        volatility: +15,
        concentration: +6,
        supplyGap: +5
      }
    }
  },
  {
    id: "intel-2026-006",
    title: "Monsoon Low Pressure Depression Forms over East-Central Arabian Sea",
    summary: "India Meteorological Department (IMD) issued a squally weather alert with gale-force winds (55–65 km/h) and wave heights exceeding 4.5 meters in the Arabian Sea approach to Gulf of Kutch and Mumbai High.",
    source: "India Meteorological Department (IMD) Maritime Weather (Simulated)",
    sourceType: "Weather Alert",
    publishedAt: "2026-08-17T06:30:00Z",
    retrievedAt: "2026-08-17T08:00:00Z",
    location: "Arabian Sea (18.5° N, 68.0° E)",
    countries: ["India"],
    eventType: "weather",
    severity: "LOW",
    confidence: "HIGH",
    confidenceScore: 0.96,
    confidenceRationale: "Satellite radar data and official meteorological agency advisory.",
    affectedCorridors: ["arabian_sea"],
    affectedSuppliers: [],
    estimatedSupplyImpact: "Temporary SPM discharge suspension at Mundra, Vadinar, and Sikka (12–24h)",
    marketImpact: "Negligible price impact; minor demurrage",
    logisticsImpact: "Tankers instructed to stand off in deep water until sea states moderate",
    status: "Active Weather Warning",
    scenarioPresetId: "hormuz-closure",
    aiAnalysis: {
      relevanceToIndia: "Local coastal offloading constraint. Refineries rely on onsite 12-day crude buffers while weather clears.",
      recommendedAction: "Monitor SPM mooring tension sensors and maintain steady pipeline discharge from onshore buffer tanks.",
      riskEngineDelta: {
        logistics: +4,
        supplyGap: +2
      }
    }
  }
];

export function getIntelligenceEvents() {
  return SIMULATED_INTELLIGENCE_EVENTS;
}

export function getIntelligenceEventById(id) {
  return SIMULATED_INTELLIGENCE_EVENTS.find((e) => e.id === id) || SIMULATED_INTELLIGENCE_EVENTS[0];
}
