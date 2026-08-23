/**
 * EnergyShield Data Schema: Macroeconomic Assumptions
 * 
 * Defines macroeconomic parameters, elasticity coefficients, and baseline metrics
 * for assessing GDP drag, Current Account Deficit (CAD) expansion, and import bill shocks.
 * 
 * Provenance Status: MODEL_ASSUMPTION / PENDING_VALIDATION
 * Note: These coefficients are illustrative decision-support parameters and require official empirical validation.
 */

export const ECONOMIC_ASSUMPTIONS_SCHEMA = {
  // Baseline National Macroeconomic Indicators (India FY24-25 estimates)
  baselineAnnualGdpUsd: {
    value: 3940, // Billion USD (~$3.94 Trillion)
    unit: "Billion USD",
    source: "Union Budget & RBI Economic Survey (Baseline Benchmark)",
    sourceUrl: "https://www.rbi.org.in",
    retrievedAt: "2026-08-01T00:00:00Z",
    status: "PUBLIC_ESTIMATE",
    confidence: "MEDIUM",
    notes: "Nominal GDP benchmark for calculating percentage drag on annualized growth."
  },
  usdInrExchangeRate: {
    value: 84.50, // INR per USD
    unit: "INR / USD",
    source: "RBI Reference Rate (Baseline Parameter)",
    sourceUrl: "https://www.rbi.org.in",
    retrievedAt: "2026-08-01T00:00:00Z",
    status: "PUBLIC_ESTIMATE",
    confidence: "HIGH",
    notes: "Used to convert dollar import bills into domestic currency fiscal impact (₹ Crore)."
  },

  // Model Elasticity & Sensitivity Coefficients (Configurable)
  gdpElasticity: {
    // Standard rule-of-thumb: +$10/bbl crude increase sustained over a year ≈ -0.5% drag on GDP growth
    value: 0.050, // 0.05% GDP growth drag per $1/bbl sustained increase per annualized fraction
    unit: "% GDP drag per $1/bbl sustained shock",
    source: "Illustrative Macroeconomic Rule of Thumb (Reserve Bank of India Working Paper reference model)",
    sourceUrl: null,
    retrievedAt: "2026-08-01T00:00:00Z",
    status: "MODEL_ASSUMPTION",
    confidence: "LOW",
    notes: "Illustrative model output — coefficient requires authoritative empirical validation from MoF/RBI."
  },
  cadSensitivity: {
    // Standard rule-of-thumb: +$10/bbl crude price increase expands Current Account Deficit by ~$15 Billion (or ~0.38% of GDP)
    value: 1.50, // Billion USD CAD expansion per $1/bbl crude increase per year
    unit: "Billion USD CAD expansion per $1/bbl crude increase per year",
    source: "Illustrative External Sector Sensitivity Model",
    sourceUrl: null,
    retrievedAt: "2026-08-01T00:00:00Z",
    status: "MODEL_ASSUMPTION",
    confidence: "LOW",
    notes: "Illustrative model output — coefficient requires authoritative validation from Ministry of Finance."
  },
  inflationSensitivity: {
    // +$10/bbl crude shock ≈ +0.40% to +0.50% headline WPI/CPI pass-through
    value: 0.045, // 0.045% CPI inflation impulse per $1/bbl
    unit: "% CPI inflation per $1/bbl price shock",
    source: "Illustrative Macro Sensitivity Assumption",
    sourceUrl: null,
    retrievedAt: "2026-08-01T00:00:00Z",
    status: "MODEL_ASSUMPTION",
    confidence: "LOW",
    notes: "Illustrative model assumption for downstream inflationary pressure."
  }
};

/**
 * Returns the current active economic assumptions object
 */
export function getEconomicAssumptions() {
  return {
    ...ECONOMIC_ASSUMPTIONS_SCHEMA,
    meta: {
      source: "MODEL_ASSUMPTION",
      lastUpdated: "2026-08-22T00:00:00Z",
      disclaimer: "Illustrative model output — coefficient requires authoritative validation."
    }
  };
}
