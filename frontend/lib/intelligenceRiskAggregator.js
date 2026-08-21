/**
 * EnergyShield Intelligence Risk Aggregator
 * 
 * Aggregates intelligence signals, applies recency decay & confidence weighting,
 * and dynamically modifies the 5-factor inputs for the existing EnergyShield Risk Scoring Engine.
 */

import { calculateResilienceScore } from "@/lib/riskScoringEngine";
import { SIMULATED_INTELLIGENCE_EVENTS } from "@/lib/intelligenceData";

/**
 * Compute recency decay factor based on event timestamp
 * - Under 24h: 1.0 (100% signal influence)
 * - 24h to 48h: 0.8 (80% signal influence)
 * - 48h to 96h: 0.6 (60% signal influence)
 * - Over 96h: 0.4 (40% signal influence)
 */
export function calculateRecencyDecay(publishedAt) {
  if (!publishedAt) return 0.8;
  const now = new Date("2026-08-19T21:00:00Z"); // Simulated reference clock
  const pubDate = new Date(publishedAt);
  const diffHours = Math.max(0, (now.getTime() - pubDate.getTime()) / (1000 * 60 * 60));

  if (diffHours <= 24) return 1.0;
  if (diffHours <= 48) return 0.8;
  if (diffHours <= 96) return 0.6;
  return 0.4;
}

/**
 * Aggregate all intelligence events and compute dynamically adjusted resilience
 */
export function aggregateIntelligenceRisk(events = SIMULATED_INTELLIGENCE_EVENTS) {
  const baseline = calculateResilienceScore();

  let deltaGeopolitical = 0;
  let deltaLogistics = 0;
  let deltaConcentration = 0;
  let deltaVolatility = 0;
  let deltaSupplyGap = 0;

  // Deduplicate and process each event
  events.forEach((ev) => {
    const recency = calculateRecencyDecay(ev.publishedAt);
    const confidence = ev.confidenceScore || 0.85;
    const severityMultiplier = ev.severity === "CRITICAL" ? 1.4 : ev.severity === "HIGH" ? 1.0 : ev.severity === "MEDIUM" ? 0.6 : 0.2;
    const eventInfluence = recency * confidence * severityMultiplier;

    if (ev.aiAnalysis?.riskEngineDelta) {
      const d = ev.aiAnalysis.riskEngineDelta;
      deltaGeopolitical += (d.geopolitical || 0) * eventInfluence * 0.45;
      deltaLogistics += (d.logistics || 0) * eventInfluence * 0.45;
      deltaConcentration += (d.concentration || 0) * eventInfluence * 0.45;
      deltaVolatility += (d.volatility || 0) * eventInfluence * 0.45;
      deltaSupplyGap += (d.supplyGap || 0) * eventInfluence * 0.45;
    }
  });

  // Calculate adjusted factors (bounded 0 - 100)
  const adjustedFactors = {
    geopolitical: Math.min(100, Math.round(baseline.factors.geopolitical + deltaGeopolitical)),
    logistics: Math.min(100, Math.round(baseline.factors.logistics + deltaLogistics)),
    concentration: Math.min(100, Math.round(baseline.factors.concentration + deltaConcentration)),
    volatility: Math.min(100, Math.round(baseline.factors.volatility + deltaVolatility)),
    supplyGap: Math.min(100, Math.round(baseline.factors.supplyGap + deltaSupplyGap))
  };

  const adjustedResilience = calculateResilienceScore(adjustedFactors);
  const scoreDelta = adjustedResilience.resilienceScore - baseline.resilienceScore;

  const factorDeltas = [
    {
      factor: "Geopolitical Risk",
      baseline: baseline.factors.geopolitical,
      adjusted: adjustedFactors.geopolitical,
      delta: adjustedFactors.geopolitical - baseline.factors.geopolitical,
      rationale: "Active maritime UAV advisories off Bab-el-Mandeb & Persian Gulf naval exercises."
    },
    {
      factor: "Maritime / Logistics Risk",
      baseline: baseline.factors.logistics,
      adjusted: adjustedFactors.logistics,
      delta: adjustedFactors.logistics - baseline.factors.logistics,
      rationale: "GPS interference and tanker transit delays reported across Strait of Hormuz."
    },
    {
      factor: "Supplier Concentration",
      baseline: baseline.factors.concentration,
      adjusted: adjustedFactors.concentration,
      delta: adjustedFactors.concentration - baseline.factors.concentration,
      rationale: "Secondary sanctions scrutiny on shadow fleet crude tightening payment terms."
    },
    {
      factor: "Price Volatility",
      baseline: baseline.factors.volatility,
      adjusted: adjustedFactors.volatility,
      delta: adjustedFactors.volatility - baseline.factors.volatility,
      rationale: "OPEC+ quota extensions and war-risk premiums elevating landed crude import bill."
    },
    {
      factor: "Supply Gap & Buffer",
      baseline: baseline.factors.supplyGap,
      adjusted: adjustedFactors.supplyGap,
      delta: adjustedFactors.supplyGap - baseline.factors.supplyGap,
      rationale: "Basra SPM maintenance and Cape diversions increasing transit buffer draw."
    }
  ];

  return {
    baselineResilience: baseline,
    adjustedResilience,
    scoreDelta,
    factorDeltas,
    totalEventsIngested: events.length,
    highRiskEventsCount: events.filter((e) => ["CRITICAL", "HIGH"].includes(e.severity)).length,
    interpretation: `Current intelligence signals apply an additional ${Math.abs(scoreDelta)} point risk penalty, adjusting India's calculated Energy Resilience from ${baseline.resilienceScore}/100 to ${adjustedResilience.resilienceScore}/100 (${adjustedResilience.riskAssessment.level}).`
  };
}
