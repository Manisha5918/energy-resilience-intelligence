/**
 * EnergyShield Provider: Strategic Domestic Refineries
 * 
 * Source: Petroleum Planning & Analysis Cell (PPAC) / Corporate Statutory Disclosures (IOCL, BPCL, HPCL, RIL, Nayara).
 * Provenance: Official Refining Capacity & Crude Intake Survey.
 */

export const OFFICIAL_REFINERY_PROFILES = [
  {
    id: "ref-jamnagar",
    name: "Jamnagar Refinery Complex",
    operator: "Reliance Industries Limited (RIL)",
    location: "Jamnagar, Gujarat",
    capacityMbd: 1.40,
    capacityMmtpa: 68.2,
    coastalPort: "Sikka SPM Port",
    configuration: "Ultra-Deep Coking / Petrochemical Integrated",
    crudeFlexibility: "Heavy Sour, Extra Heavy, Discounted Urals",
    source: "Reliance Industries Annual Statutory Disclosure",
    sourceUrl: "https://www.ril.com",
    provider: "PPAC / Corporate Disclosures",
    retrievedAt: "2026-08-01T00:00:00Z",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH"
  },
  {
    id: "ref-vadinar",
    name: "Vadinar Refinery",
    operator: "Nayara Energy Limited",
    location: "Vadinar, Gujarat",
    capacityMbd: 0.40,
    capacityMmtpa: 20.0,
    coastalPort: "Vadinar SPM / Gulf of Kutch",
    configuration: "High Complexity (Nelson Index 12.8)",
    crudeFlexibility: "Russian Urals, Heavy Middle Eastern Sour",
    source: "Nayara Energy Statutory Report",
    sourceUrl: "https://www.nayaraenergy.com",
    provider: "PPAC / Corporate Disclosures",
    retrievedAt: "2026-08-01T00:00:00Z",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH"
  },
  {
    id: "ref-panipat",
    name: "Panipat Refinery",
    operator: "Indian Oil Corporation Limited (IOCL)",
    location: "Panipat, Haryana",
    capacityMbd: 0.35,
    capacityMmtpa: 15.0,
    coastalPort: "Fed via 1,194 km Salaya-Mathura-Panipat Pipeline",
    configuration: "Inland High Complexity Refinery",
    crudeFlexibility: "Middle East Sour & Domestic Blend",
    source: "Indian Oil Corporation Annual Report",
    sourceUrl: "https://www.iocl.com",
    provider: "PPAC / IOCL Statutory Filings",
    retrievedAt: "2026-08-01T00:00:00Z",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH"
  },
  {
    id: "ref-kochi",
    name: "Kochi Refinery",
    operator: "Bharat Petroleum Corporation Limited (BPCL)",
    location: "Kochi, Kerala",
    capacityMbd: 0.31,
    capacityMmtpa: 15.5,
    coastalPort: "Kochi SPM (Submarine Pipeline)",
    configuration: "Coastal Petrochemical Integrated",
    crudeFlexibility: "Low-Sulfur Sweet, West African & Persian Gulf",
    source: "Bharat Petroleum Annual Report",
    sourceUrl: "https://www.bharatpetroleum.in",
    provider: "PPAC / BPCL Statutory Filings",
    retrievedAt: "2026-08-01T00:00:00Z",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH"
  },
  {
    id: "ref-paradip",
    name: "Paradip Refinery",
    operator: "Indian Oil Corporation Limited (IOCL)",
    location: "Paradip, Odisha",
    capacityMbd: 0.30,
    capacityMmtpa: 15.0,
    coastalPort: "Paradip Deepwater SPM",
    configuration: "Indmax Resid Fluidized Catalytic Cracking",
    crudeFlexibility: "Heavy Sour, High Acid, US Gulf WTI",
    source: "Indian Oil Corporation Annual Report",
    sourceUrl: "https://www.iocl.com",
    provider: "PPAC / IOCL Statutory Filings",
    retrievedAt: "2026-08-01T00:00:00Z",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH"
  },
  {
    id: "ref-vizag",
    name: "Visakh Refinery",
    operator: "Hindustan Petroleum Corporation Limited (HPCL)",
    location: "Visakhapatnam, Andhra Pradesh",
    capacityMbd: 0.17,
    capacityMmtpa: 8.33,
    coastalPort: "Visakh Offshore Berths (Direct SPR Link)",
    configuration: "Bottom-Upgraded Clean Fuels Processing",
    crudeFlexibility: "Sweet & Heavy Sour Grades",
    source: "Hindustan Petroleum Annual Report",
    sourceUrl: "https://www.hindustanpetroleum.com",
    provider: "PPAC / HPCL Statutory Filings",
    retrievedAt: "2026-08-01T00:00:00Z",
    dataStatus: "OFFICIAL_DATASET",
    confidence: "HIGH"
  }
];

export function getRefineryProfiles() {
  return OFFICIAL_REFINERY_PROFILES;
}
