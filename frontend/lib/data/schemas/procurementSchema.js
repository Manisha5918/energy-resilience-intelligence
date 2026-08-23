/**
 * EnergyShield Data Schema: Refiner Profiles & Procurement Constraints
 * 
 * Defines Indian refinery crude slate requirements, nameplate capacities,
 * connected import terminals, and baseline allocation quotas for emergency directive generation.
 * 
 * Provenance:
 * - Refinery Capacities: OFFICIAL (PPAC Annual Industry Disclosures FY24-25)
 * - Allocation Formulas & Emergency Quotas: MODEL_ASSUMPTION / DECISION_SUPPORT
 */

export const REFINER_PROFILES_SCHEMA = [
  {
    id: "ref-jamnagar",
    name: "Reliance Jamnagar Complex",
    operator: "Reliance Industries Ltd (RIL)",
    location: "Jamnagar, Gujarat",
    capacityMBD: 1.37, // 68.2 MMTPA
    crudeCompatibility: ["Heavy Sour", "Medium Sour", "Light Sweet", "Ultra-Heavy"],
    primaryDischargePort: "Sikka / Jamnagar Marine Terminal",
    connectedPipelines: ["Jamnagar-Loni Pipeline", "Coastal SPM"],
    operationalFlexibility: "VERY_HIGH", // Complex Nelson Index ~21.1
    status: "OFFICIAL_CAPACITY",
    notes: "World's largest refining complex; can process almost any heavy/sour discounted crude grade."
  },
  {
    id: "ref-vadinar",
    name: "Nayara Vadinar Refinery",
    operator: "Nayara Energy",
    location: "Vadinar, Gujarat",
    capacityMBD: 0.40, // 20.0 MMTPA
    crudeCompatibility: ["Heavy Sour", "Medium Sour", "Urals Grade"],
    primaryDischargePort: "Vadinar Port SPM",
    connectedPipelines: ["Vadinar-Bina Pipeline"],
    operationalFlexibility: "HIGH",
    status: "OFFICIAL_CAPACITY",
    notes: "High complexity refinery designed for Russian Urals and Middle Eastern heavy crude."
  },
  {
    id: "ref-panipat",
    name: "IOCL Panipat Refinery",
    operator: "Indian Oil Corporation (IOCL)",
    location: "Panipat, Haryana",
    capacityMBD: 0.35, // 15.0 MMTPA (Expanding to 25 MMTPA)
    crudeCompatibility: ["Medium Sour", "Light Sweet", "Arab Heavy"],
    primaryDischargePort: "Vadinar / Mundra Port",
    connectedPipelines: ["Salaya-Mathura-Panipat Pipeline (SMPL)"],
    operationalFlexibility: "MEDIUM",
    status: "OFFICIAL_CAPACITY",
    notes: "Landlocked Northern India major refinery fed via Mundra/Vadinar cross-country crude pipeline."
  },
  {
    id: "ref-kochi",
    name: "BPCL Kochi Refinery",
    operator: "Bharat Petroleum (BPCL)",
    location: "Kochi, Kerala",
    capacityMBD: 0.31, // 15.5 MMTPA
    crudeCompatibility: ["Light Sweet", "Medium Sour", "West African"],
    primaryDischargePort: "Cochin Port Offshore SPM",
    connectedPipelines: ["Puthuvypeen SPM Pipeline"],
    operationalFlexibility: "HIGH",
    status: "OFFICIAL_CAPACITY",
    notes: "Direct coastal access via single point mooring; high flexibility for West African / US crudes."
  },
  {
    id: "ref-paradip",
    name: "IOCL Paradip Refinery",
    operator: "Indian Oil Corporation (IOCL)",
    location: "Paradip, Odisha",
    capacityMBD: 0.30, // 15.0 MMTPA
    crudeCompatibility: ["High TAN Heavy Sour", "Medium Sour", "Latin American"],
    primaryDischargePort: "Paradip Port Offshore SPM",
    connectedPipelines: ["Paradip-Haldia-Barauni Pipeline (PHBPL)"],
    operationalFlexibility: "VERY_HIGH",
    status: "OFFICIAL_CAPACITY",
    notes: "Configured for heavy high-acid crudes from Latin America and Middle East."
  },
  {
    id: "ref-visakh",
    name: "HPCL Visakh Refinery",
    operator: "Hindustan Petroleum (HPCL)",
    location: "Visakhapatnam, Andhra Pradesh",
    capacityMBD: 0.17, // 8.33 MMTPA (Modernized to 15 MMTPA)
    crudeCompatibility: ["Light Sweet", "Medium Sour", "Middle East Light"],
    primaryDischargePort: "Visakhapatnam Port Berth",
    connectedPipelines: ["Visakh-Vijayawada Pipeline", "ISPRL Vizag Cavern Direct Hookup"],
    operationalFlexibility: "MEDIUM",
    status: "OFFICIAL_CAPACITY",
    notes: "Directly connected to ISPRL Visakhapatnam strategic petroleum reserve cavern."
  }
];

export const ALTERNATIVE_CRUDE_SOURCES_SCHEMA = [
  {
    id: "src-wti",
    name: "US WTI Midland (US Gulf Coast)",
    origin: "Houston / Corpus Christi, USA",
    route: "Atlantic -> Cape of Good Hope -> Indian Ocean",
    grade: "Light Sweet (API ~41°, Sulfur 0.2%)",
    transitDays: 32,
    baseFOB: 78.50,
    freightUSD: 5.20,
    insuranceUSD: 0.40,
    portDuesUSD: 0.85,
    riskLevel: "LOW",
    strategicAdvantage: "Zero Hormuz/Red Sea exposure, deep liquid spot market",
    sourceStatus: "PUBLIC_ESTIMATE"
  },
  {
    id: "src-brazil-lula",
    name: "Brazil Tupi / Lula (Santos Basin)",
    origin: "Angra dos Reis, Brazil",
    route: "South Atlantic -> Cape of Good Hope -> Arabian Sea",
    grade: "Medium Sweet (API ~29°, Sulfur 0.4%)",
    transitDays: 28,
    baseFOB: 79.20,
    freightUSD: 4.80,
    insuranceUSD: 0.45,
    portDuesUSD: 0.85,
    riskLevel: "LOW",
    strategicAdvantage: "Bypasses all volatile Middle East maritime chokepoints",
    sourceStatus: "PUBLIC_ESTIMATE"
  },
  {
    id: "src-murban-fujairah",
    name: "UAE Murban via Habshan-Fujairah Pipeline",
    origin: "Fujairah Terminal, UAE (Gulf of Oman)",
    route: "Gulf of Oman -> Arabian Sea -> Western Indian Ports",
    grade: "Light Sour (API ~40°, Sulfur 0.7%)",
    transitDays: 4,
    baseFOB: 82.00,
    freightUSD: 1.80,
    insuranceUSD: 0.60,
    portDuesUSD: 0.85,
    riskLevel: "MODERATE",
    strategicAdvantage: "1.5 MBD bypass pipeline totally avoids Strait of Hormuz transit",
    sourceStatus: "PUBLIC_ESTIMATE"
  },
  {
    id: "src-angola-nemba",
    name: "Angola Nemba / Girassol",
    origin: "Malongo Terminal, Angola",
    route: "South Atlantic -> Cape of Good Hope -> Indian Ocean",
    grade: "Medium Sweet (API ~31°, Sulfur 0.4%)",
    transitDays: 22,
    baseFOB: 80.50,
    freightUSD: 3.90,
    insuranceUSD: 0.50,
    portDuesUSD: 0.85,
    riskLevel: "LOW",
    strategicAdvantage: "High yield distillates, avoids Red Sea and Hormuz",
    sourceStatus: "PUBLIC_ESTIMATE"
  },
  {
    id: "src-saudi-yanbu",
    name: "Saudi Arab Light via East-West Pipeline (Yanbu)",
    origin: "Yanbu Port, Red Sea Coast, Saudi Arabia",
    route: "Red Sea -> Bab-el-Mandeb OR Northern Red Sea -> Arabian Sea",
    grade: "Medium Sour (API ~33°, Sulfur 1.8%)",
    transitDays: 7,
    baseFOB: 81.50,
    freightUSD: 2.40,
    insuranceUSD: 1.10,
    portDuesUSD: 0.85,
    riskLevel: "ELEVATED",
    strategicAdvantage: "5.0 MBD Petroline bypasses Hormuz, but subject to Red Sea / Bab-el-Mandeb risk",
    sourceStatus: "PUBLIC_ESTIMATE"
  }
];

export function getRefinerProfiles() {
  return REFINER_PROFILES_SCHEMA.map(r => ({ ...r }));
}

export function getAlternativeCrudeSources() {
  return ALTERNATIVE_CRUDE_SOURCES_SCHEMA.map(s => ({ ...s }));
}
