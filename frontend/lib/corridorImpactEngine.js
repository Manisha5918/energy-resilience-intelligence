/**
 * EnergyShield Corridor Impact Mapping Engine
 * 
 * Maps active intelligence events to maritime shipping corridors
 * and computes dynamic corridor risk changes.
 */

import { SIMULATED_CORRIDOR_METRICS } from "./riskData.js";
import { SIMULATED_INTELLIGENCE_EVENTS } from "./intelligenceData.js";

export function mapCorridorSignals(events = SIMULATED_INTELLIGENCE_EVENTS) {
  return SIMULATED_CORRIDOR_METRICS.map((corridor) => {
    // Find all events impacting this corridor
    const matchedEvents = events.filter((e) => e.affectedCorridors?.includes(corridor.id));

    let riskChange = 0;
    let highestSeverity = "LOW";
    let totalConfidenceScore = 0;

    matchedEvents.forEach((ev) => {
      const weight = ev.severity === "CRITICAL" ? 18 : ev.severity === "HIGH" ? 12 : ev.severity === "MEDIUM" ? 6 : 2;
      riskChange += weight * (ev.confidenceScore || 0.85);

      if (ev.severity === "CRITICAL") highestSeverity = "CRITICAL";
      else if (ev.severity === "HIGH" && highestSeverity !== "CRITICAL") highestSeverity = "HIGH";
      else if (ev.severity === "MEDIUM" && !["CRITICAL", "HIGH"].includes(highestSeverity)) highestSeverity = "MEDIUM";

      totalConfidenceScore += ev.confidenceScore || 0.85;
    });

    const roundedRiskChange = Math.round(riskChange);
    const adjustedRisk = Math.min(100, corridor.riskScore + roundedRiskChange);
    const avgConfidencePct = matchedEvents.length > 0 
      ? Math.round((totalConfidenceScore / matchedEvents.length) * 100)
      : 85;

    return {
      id: corridor.id,
      name: corridor.name,
      origin: corridor.origin,
      baselineRisk: corridor.riskScore,
      adjustedRisk,
      riskChange: roundedRiskChange,
      signalCount: matchedEvents.length,
      highestSeverity,
      confidencePct: avgConfidencePct,
      shareOfImports: corridor.shareOfImports,
      volumeMbd: corridor.volumeMbd,
      activeEvents: matchedEvents.map((e) => ({
        id: e.id,
        title: e.title,
        severity: e.severity
      }))
    };
  });
}
