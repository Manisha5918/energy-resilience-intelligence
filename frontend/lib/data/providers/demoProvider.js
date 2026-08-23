/**
 * EnergyShield Data Provider: Demo & Simulated Provider
 * 
 * Provides mock, synthetic, and modeled inputs for platform stress-testing
 * and offline decision simulation.
 */

import { ECONOMIC_ASSUMPTIONS_SCHEMA, getEconomicAssumptions } from "../schemas/economicSchema.js";
import { RESERVE_ASSETS_SCHEMA, SPR_SYSTEM_CONSTRAINTS, getReserveAssets } from "../schemas/reserveSchema.js";
import { REFINER_PROFILES_SCHEMA, ALTERNATIVE_CRUDE_SOURCES_SCHEMA, getRefinerProfiles, getAlternativeCrudeSources } from "../schemas/procurementSchema.js";
import { GIS_INFRASTRUCTURE_NODES, GIS_MARITIME_AND_PIPELINE_ROUTES, getGISNodes, getGISRoutes } from "../schemas/routeSchema.js";

export const DemoDataProvider = {
  providerType: "DEMO_SIMULATED",
  isOfficial: false,

  getEconomicAssumptions,
  getReserveAssets,
  getSPRSystemConstraints: () => ({ ...SPR_SYSTEM_CONSTRAINTS }),
  getRefinerProfiles,
  getAlternativeCrudeSources,
  getGISNodes,
  getGISRoutes
};

export default DemoDataProvider;
