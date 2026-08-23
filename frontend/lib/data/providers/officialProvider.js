/**
 * EnergyShield Data Provider: Official & Validated Provider
 * 
 * Provides verified statutory data from PPAC, ISPRL, and DGCIS.
 * Falls back to explicitly flagged pending validation structures for classified/unreleased fields.
 */

import { getNationalEnergyBalance } from "../../providers/energyProvider.js";
import { OFFICIAL_SPR_SITES } from "../../providers/reserveProvider.js";
import { OFFICIAL_SUPPLIER_PROFILES } from "../../providers/supplierProvider.js";
import { OFFICIAL_REFINERY_PROFILES } from "../../providers/refineryProvider.js";
import { getEconomicAssumptions } from "../schemas/economicSchema.js";
import { getGISNodes, getGISRoutes } from "../schemas/routeSchema.js";

export const OfficialDataProvider = {
  providerType: "OFFICIAL_STATUTORY",
  isOfficial: true,

  getNationalEnergyBalance,
  getSPRSites: () => OFFICIAL_SPR_SITES,
  getSupplierProfiles: () => OFFICIAL_SUPPLIER_PROFILES,
  getRefineryProfiles: () => OFFICIAL_REFINERY_PROFILES,
  getEconomicAssumptions,
  getGISNodes,
  getGISRoutes
};

export default OfficialDataProvider;
