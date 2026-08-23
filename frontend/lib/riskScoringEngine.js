/**
 * EnergyShield Risk Scoring Engine
 * 
 * Transparent, explainable mathematical risk & resilience model for energy supply chains.
 * 
 * Formula:
 * Resilience Score = 100 - (
 *   Geopolitical × 0.30 +
 *   Logistics × 0.25 +
 *   Concentration × 0.20 +
 *   Volatility × 0.15 +
 *   Supply Gap × 0.10
 * )
 * 
 * Risk Level Thresholds:
 *   80 - 100 : Strong (Low Risk)
 *   60 - 79  : Moderate
 *   40 - 59  : High
 *   0  - 39  : Critical
 */

export const RISK_WEIGHTS = {
  geopolitical: {
    key: "geopolitical",
    label: "Geopolitical Risk",
    weight: 0.30,
    weightPct: 30,
    description: "Evaluates active maritime threats, diplomatic friction, sanctions scrutiny, and conflict proximity in primary production and transit regions."
  },
  logistics: {
    key: "logistics",
    label: "Maritime / Logistics Risk",
    weight: 0.25,
    weightPct: 25,
    description: "Reflects chokepoint congestion, vessel transit latency, insurance surcharges, and single-point-of-failure exposure (e.g. Strait of Hormuz, Bab-el-Mandeb)."
  },
  concentration: {
    key: "concentration",
    label: "Supplier Concentration",
    weight: 0.20,
    weightPct: 20,
    description: "Herfindahl-Hirschman index (HHI) concentration measuring over-reliance on top supplier nations (e.g. Russia, Iraq, Saudi Arabia)."
  },
  volatility: {
    key: "volatility",
    label: "Price Volatility",
    weight: 0.15,
    weightPct: 15,
    description: "Global crude benchmark variance (Brent/WTI vs Indian Basket landed cost spread) and futures volatility index."
  },
  supplyGap: {
    key: "supplyGap",
    label: "Supply Gap & Inventory Stress",
    weight: 0.10,
    weightPct: 10,
    description: "Shortfall between daily national refinery throughput requirements and reliable scheduled deliveries, factoring in SPR draw capacities."
  }
};

/**
 * Categorize score into standard Risk Level
 */
export function calculateRiskLevel(score) {
  if (score >= 80) {
    return {
      level: "STRONG",
      label: "Strong Resilience (Low Risk)",
      color: "emerald",
      badgeClass: "text-emerald-400 bg-emerald-950/60 border-emerald-800/80",
      accentColor: "#10b981",
      description: "Supply lines are well diversified and chokepoint risks remain within manageable operational thresholds."
    };
  }
  if (score >= 60) {
    return {
      level: "MODERATE",
      label: "Moderate Resilience (Elevated Caution)",
      color: "cyan",
      badgeClass: "text-cyan-400 bg-cyan-950/60 border-cyan-800/80",
      accentColor: "#06b6d4",
      description: "Supply flows are operational, but chokepoint sensitivity and supplier concentration require active contingency monitoring."
    };
  }
  if (score >= 40) {
    return {
      level: "HIGH",
      label: "High Risk (Vulnerable)",
      color: "amber",
      badgeClass: "text-amber-400 bg-amber-950/60 border-amber-800/80",
      accentColor: "#f59e0b",
      description: "Severe vulnerability detected in critical maritime corridors or high exposure to supplier disruptions. Strategic drawdown prep advised."
    };
  }
  return {
    level: "CRITICAL",
    label: "Critical Risk (Severe Disruption)",
    color: "red",
    badgeClass: "text-rose-400 bg-rose-950/60 border-rose-800/80",
    accentColor: "#f43f5e",
    description: "Immediate energy security hazard. Major supply corridor blockage or supplier embargo active. Initiate emergency procurement and SPR mobilization."
  };
}

/**
 * Calculate overall resilience score and factor breakdowns
 * @param {Object} inputs - Normalized scores (0-100) for each factor
 */
export function calculateResilienceScore(inputs = {}) {
  // Default illustrative baseline values for Phase 1
  const factors = {
    geopolitical: Math.min(100, Math.max(0, inputs.geopolitical ?? 72)), // High tension
    logistics: Math.min(100, Math.max(0, inputs.logistics ?? 64)),      // Chokepoint congestion
    concentration: Math.min(100, Math.max(0, inputs.concentration ?? 60)), // High top-3 share
    volatility: Math.min(100, Math.max(0, inputs.volatility ?? 68)),    // Elevated Brent volatility
    supplyGap: Math.min(100, Math.max(0, inputs.supplyGap ?? 40))       // Minor buffer strain
  };

  const contributions = {
    geopolitical: factors.geopolitical * RISK_WEIGHTS.geopolitical.weight,
    logistics: factors.logistics * RISK_WEIGHTS.logistics.weight,
    concentration: factors.concentration * RISK_WEIGHTS.concentration.weight,
    volatility: factors.volatility * RISK_WEIGHTS.volatility.weight,
    supplyGap: factors.supplyGap * RISK_WEIGHTS.supplyGap.weight
  };

  const totalWeightedRiskPenalty = Object.values(contributions).reduce((a, b) => a + b, 0);
  const rawScore = 100 - totalWeightedRiskPenalty;
  const resilienceScore = Math.max(0, Math.min(100, Math.round(rawScore * 10) / 10));
  const roundedResilience = Math.round(resilienceScore);
  const riskAssessment = calculateRiskLevel(roundedResilience);

  // Overall Supply Risk Index is the complementary risk penalty (0 - 100)
  const supplyRiskIndex = Math.round(totalWeightedRiskPenalty * 10) / 10;

  return {
    resilienceScore: roundedResilience,
    preciseResilienceScore: resilienceScore,
    supplyRiskIndex,
    riskAssessment,
    factors,
    contributions: {
      geopolitical: Number(contributions.geopolitical.toFixed(2)),
      logistics: Number(contributions.logistics.toFixed(2)),
      concentration: Number(contributions.concentration.toFixed(2)),
      volatility: Number(contributions.volatility.toFixed(2)),
      supplyGap: Number(contributions.supplyGap.toFixed(2))
    },
    totalWeightedRiskPenalty: Number(totalWeightedRiskPenalty.toFixed(2))
  };
}

/**
 * Generate comprehensive explainability details for executive inspection
 */
export function generateRiskExplanation(resilienceResult = calculateResilienceScore()) {
  const { factors, contributions, resilienceScore, supplyRiskIndex, riskAssessment } = resilienceResult;

  const factorExplanations = [
    {
      key: "geopolitical",
      label: RISK_WEIGHTS.geopolitical.label,
      inputValue: factors.geopolitical,
      weightPct: RISK_WEIGHTS.geopolitical.weightPct,
      contribution: contributions.geopolitical,
      severity: factors.geopolitical >= 70 ? "High Impact" : factors.geopolitical >= 45 ? "Moderate Impact" : "Low Impact",
      rationale: "Active maritime warnings off Bab-el-Mandeb and Persian Gulf chokepoint naval drills elevate overall vulnerability."
    },
    {
      key: "logistics",
      label: RISK_WEIGHTS.logistics.label,
      inputValue: factors.logistics,
      weightPct: RISK_WEIGHTS.logistics.weightPct,
      contribution: contributions.logistics,
      severity: factors.logistics >= 70 ? "High Impact" : factors.logistics >= 45 ? "Moderate Impact" : "Low Impact",
      rationale: "Over 58% of national crude flows transit the single 39km-wide Strait of Hormuz chokepoint, with high war-risk insurance premiums."
    },
    {
      key: "concentration",
      label: RISK_WEIGHTS.concentration.label,
      inputValue: factors.concentration,
      weightPct: RISK_WEIGHTS.concentration.weightPct,
      contribution: contributions.concentration,
      severity: factors.concentration >= 70 ? "High Impact" : factors.concentration >= 45 ? "Moderate Impact" : "Low Impact",
      rationale: "Top three crude suppliers (Russia, Iraq, Saudi Arabia) represent over 70% of total imported volume."
    },
    {
      key: "volatility",
      label: RISK_WEIGHTS.volatility.label,
      inputValue: factors.volatility,
      weightPct: RISK_WEIGHTS.volatility.weightPct,
      contribution: contributions.volatility,
      severity: factors.volatility >= 70 ? "High Impact" : factors.volatility >= 45 ? "Moderate Impact" : "Low Impact",
      rationale: "Brent crude fluctuations ($84.65/bbl) and landed freight surcharges create import bill volatility."
    },
    {
      key: "supplyGap",
      label: RISK_WEIGHTS.supplyGap.label,
      inputValue: factors.supplyGap,
      weightPct: RISK_WEIGHTS.supplyGap.weightPct,
      contribution: contributions.supplyGap,
      severity: factors.supplyGap >= 70 ? "High Impact" : factors.supplyGap >= 45 ? "Moderate Impact" : "Low Impact",
      rationale: "ISPRL SPR nameplate cover (8.1 days) combined with commercial refinery buffer storage (~65 days) provides an operational cushion."
    }
  ];

  return {
    formula: "Resilience Score = 100 - (Geopolitical × 0.30 + Logistics × 0.25 + Concentration × 0.20 + Volatility × 0.15 + Supply Gap × 0.10)",
    resilienceScore,
    supplyRiskIndex,
    riskAssessment,
    factorExplanations,
    interpretation: `The calculated Resilience Score is ${resilienceScore}/100 (${riskAssessment.level}). The system applies a total weighted risk deduction of ${supplyRiskIndex} points from the 100-point theoretical maximum.`
  };
}
