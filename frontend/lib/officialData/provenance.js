/**
 * EnergyShield Data Provenance & Contract Normalizer
 * 
 * Enforces standardized metadata contracts across all official, derived,
 * configured, and unavailable metrics.
 */

export function createOfficialDataMetric({
  value,
  unit,
  source,
  sourceUrl,
  reportingPeriod,
  originalFile,
  publicationDate = "July 2026",
  confidence = "HIGH",
  notes = null
}) {
  return {
    value,
    unit,
    dataStatus: "OFFICIAL_DATA",
    source,
    sourceUrl,
    reportingPeriod,
    originalFile,
    publicationDate,
    retrievedAt: "2026-08-19",
    confidence,
    isLive: false,
    isDerived: false,
    notes
  };
}

export function createDerivedMetric({
  value,
  unit,
  formula,
  sourceInputs = [],
  description = ""
}) {
  return {
    value,
    unit,
    dataStatus: "DERIVED_VALUE",
    formula,
    sourceInputs,
    description,
    retrievedAt: "2026-08-19",
    isLive: false,
    isDerived: true,
    confidence: "HIGH"
  };
}

export function createUnavailableMetric({
  metricName,
  reason = "No public official real-time feed available (classified sovereign defense data)",
  statutoryCapacity = null
}) {
  return {
    value: null,
    metricName,
    dataStatus: "UNAVAILABLE",
    reason,
    statutoryCapacity,
    retrievedAt: "2026-08-19",
    isLive: false,
    isDerived: false,
    confidence: "N/A"
  };
}

export function createModelConfigMetric({
  value,
  parameterName,
  description
}) {
  return {
    value,
    parameterName,
    dataStatus: "MODEL_CONFIGURATION",
    description,
    isLive: false,
    isDerived: false
  };
}

export function createUserScenarioAssumption({
  value,
  scenarioName,
  parameterName
}) {
  return {
    value,
    scenarioName,
    parameterName,
    dataStatus: "USER_SCENARIO_ASSUMPTION",
    isLive: false,
    isDerived: false
  };
}
