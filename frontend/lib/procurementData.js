/**
 * EnergyShield Procurement Data Service
 * 
 * Defines supplier-route procurement options, spare export buffers,
 * and contract parameters for adaptive procurement modeling.
 * 
 * Source Provenance:
 * - Supplier Profiles: Directorate General of Commercial Intelligence and Statistics (DGCIS)
 * - Freight Tariffs: Baltic Dirty Tanker Index benchmarks
 * - Terminal Capacities: Official Port & Pipeline Disclosures (ADNOC Fujairah, Saudi Aramco Yanbu)
 * - Status: MODEL RECOMMENDATION / DECISION SUPPORT (Not an executable trade order)
 */

import { SIMULATED_SUPPLIER_PROFILES } from "./supplierData.js";
import { SIMULATED_SHIPPING_ROUTES } from "./routeData.js";

export const SIMULATED_PROCUREMENT_OPTIONS = [
  {
    supplierId: "saudi_arabia",
    supplier: "Kingdom of Saudi Arabia",
    primaryGrade: "Arab Light / Arab Medium",
    spareCapacityMbd: 1.20, // Available spare export buffer
    minContractVolumeMbd: 0.15,
    maxContractVolumeMbd: 0.85,
    primaryRoute: {
      routeId: "route-hormuz-west",
      name: "Ras Tanura → Strait of Hormuz → West Coast India",
      transitDays: 4.5,
      routeRisk: "HIGH",
      freightMultiplier: 1.0,
      corridor: "Strait of Hormuz"
    },
    alternativeRoute: {
      routeId: "route-yanbu-redsea",
      name: "Yanbu (East-West Pipeline Bypass) → Arabian Sea",
      transitDays: 6.2,
      routeRisk: "MODERATE",
      freightMultiplier: 1.25,
      corridor: "Red Sea / Arabian Sea"
    },
    reliabilityScore: 96,
    diversificationScore: 65,
    destinationFlexibility: "Excellent (Direct pipeline to Yanbu on Red Sea)"
  },
  {
    supplierId: "uae",
    supplier: "United Arab Emirates (ADNOC)",
    primaryGrade: "Murban / Das Blend",
    spareCapacityMbd: 0.80,
    minContractVolumeMbd: 0.10,
    maxContractVolumeMbd: 0.60,
    primaryRoute: {
      routeId: "route-fujairah-direct",
      name: "Fujairah (Habshan Pipeline Bypass) → Arabian Sea",
      transitDays: 3.2,
      routeRisk: "LOW",
      freightMultiplier: 0.95,
      corridor: "Arabian Sea (Bypasses Hormuz!)"
    },
    alternativeRoute: {
      routeId: "route-das-island",
      name: "Das Island → Strait of Hormuz",
      transitDays: 4.0,
      routeRisk: "HIGH",
      freightMultiplier: 1.0,
      corridor: "Strait of Hormuz"
    },
    reliabilityScore: 94,
    diversificationScore: 78,
    destinationFlexibility: "Strategic Superiority (Direct deepwater terminal outside Gulf)"
  },
  {
    supplierId: "russia",
    supplier: "Russian Federation",
    primaryGrade: "Urals / ESPO Blend",
    spareCapacityMbd: 0.95,
    minContractVolumeMbd: 0.20,
    maxContractVolumeMbd: 0.70,
    primaryRoute: {
      routeId: "route-suez-redsea-india",
      name: "Baltic / Black Sea → Suez → Red Sea → India",
      transitDays: 16.5,
      routeRisk: "CRITICAL",
      freightMultiplier: 1.80,
      corridor: "Red Sea / Bab-el-Mandeb"
    },
    alternativeRoute: {
      routeId: "route-cape-diversion",
      name: "Baltic / Primorsk → Cape of Good Hope → Indian Ocean",
      transitDays: 32.0,
      routeRisk: "LOW",
      freightMultiplier: 1.85,
      corridor: "Cape of Good Hope"
    },
    reliabilityScore: 78,
    diversificationScore: 50,
    destinationFlexibility: "Discounted pricing offset by secondary sanctions scrutiny"
  },
  {
    supplierId: "usa",
    supplier: "United States (Gulf Coast)",
    primaryGrade: "WTI Midland / Mars",
    spareCapacityMbd: 0.75,
    minContractVolumeMbd: 0.10,
    maxContractVolumeMbd: 0.50,
    primaryRoute: {
      routeId: "route-us-cape",
      name: "US Gulf Coast (LOOP) → Cape of Good Hope → India",
      transitDays: 28.0,
      routeRisk: "LOW",
      freightMultiplier: 1.45,
      corridor: "Cape of Good Hope"
    },
    alternativeRoute: {
      routeId: "route-us-suez",
      name: "US Gulf Coast → Atlantic → Suez → India",
      transitDays: 22.0,
      routeRisk: "HIGH",
      freightMultiplier: 1.65,
      corridor: "Red Sea / Bab-el-Mandeb"
    },
    reliabilityScore: 92,
    diversificationScore: 92,
    destinationFlexibility: "High sovereign stability; sweet crude blends well with sour grades"
  },
  {
    supplierId: "west_africa",
    supplier: "West Africa (Nigeria & Angola)",
    primaryGrade: "Bonny Light / Forcados / Girassol",
    spareCapacityMbd: 0.55,
    minContractVolumeMbd: 0.08,
    maxContractVolumeMbd: 0.40,
    primaryRoute: {
      routeId: "route-waf-cape",
      name: "Gulf of Guinea (Bonny) → Cape of Good Hope → India",
      transitDays: 18.5,
      routeRisk: "LOW",
      freightMultiplier: 1.20,
      corridor: "Cape of Good Hope (Open ocean)"
    },
    alternativeRoute: {
      routeId: "route-waf-direct",
      name: "Luanda → South Indian Ocean",
      transitDays: 20.0,
      routeRisk: "LOW",
      freightMultiplier: 1.25,
      corridor: "Indian Ocean"
    },
    reliabilityScore: 74,
    diversificationScore: 88,
    destinationFlexibility: "Bypasses all Middle Eastern chokepoints completely"
  },
  {
    supplierId: "iraq",
    supplier: "Republic of Iraq (SOMO)",
    primaryGrade: "Basrah Medium / Basrah Heavy",
    spareCapacityMbd: 0.65,
    minContractVolumeMbd: 0.15,
    maxContractVolumeMbd: 0.55,
    primaryRoute: {
      routeId: "route-hormuz-west",
      name: "Basra SPM → Strait of Hormuz → West Coast India",
      transitDays: 4.2,
      routeRisk: "HIGH",
      freightMultiplier: 1.0,
      corridor: "Strait of Hormuz"
    },
    alternativeRoute: {
      routeId: "route-ceyhan-med",
      name: "Kirkuk-Ceyhan Pipeline (Mediterranean) → Suez",
      transitDays: 18.0,
      routeRisk: "CRITICAL",
      freightMultiplier: 1.70,
      corridor: "Mediterranean / Red Sea"
    },
    reliabilityScore: 84,
    diversificationScore: 60,
    destinationFlexibility: "Economical sour crude feedstock for Indian PSU coastal coking units"
  }
];

export function getProcurementOptions() {
  return SIMULATED_PROCUREMENT_OPTIONS;
}
