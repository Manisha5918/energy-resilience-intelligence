/**
 * EnergyShield Supplier Impact Mapping Engine
 * 
 * Maps active intelligence events to sovereign supplier profiles
 * and computes dynamic supplier exposure deltas.
 */

import { SIMULATED_SUPPLIER_PROFILES } from "./supplierData.js";
import { SIMULATED_INTELLIGENCE_EVENTS } from "./intelligenceData.js";

export function mapSupplierSignals(events = SIMULATED_INTELLIGENCE_EVENTS) {
  return SIMULATED_SUPPLIER_PROFILES.map((supplier) => {
    // Find all events impacting this supplier
    const matchedEvents = events.filter((e) => e.affectedSuppliers?.includes(supplier.id));

    let riskChange = 0;
    let highestSeverity = "LOW";
    let totalConfidence = 0;

    matchedEvents.forEach((ev) => {
      const weight = ev.severity === "CRITICAL" ? 14 : ev.severity === "HIGH" ? 10 : ev.severity === "MEDIUM" ? 5 : 1;
      riskChange += weight * (ev.confidenceScore || 0.85);

      if (ev.severity === "CRITICAL") highestSeverity = "CRITICAL";
      else if (ev.severity === "HIGH" && highestSeverity !== "CRITICAL") highestSeverity = "HIGH";
      else if (ev.severity === "MEDIUM" && !["CRITICAL", "HIGH"].includes(highestSeverity)) highestSeverity = "MEDIUM";

      totalConfidence += ev.confidenceScore || 0.85;
    });

    const roundedRiskChange = Math.round(riskChange);
    const adjustedVulnerability = Math.min(100, supplier.vulnerabilityScore + roundedRiskChange);
    const avgConfidencePct = matchedEvents.length > 0 
      ? Math.round((totalConfidence / matchedEvents.length) * 100)
      : 88;

    return {
      id: supplier.id,
      supplier: supplier.supplier,
      color: supplier.color,
      importSharePct: supplier.importSharePct,
      volumeMbd: supplier.volumeMbd,
      baselineVulnerability: supplier.vulnerabilityScore,
      adjustedVulnerability,
      riskChange: roundedRiskChange,
      signalCount: matchedEvents.length,
      highestSeverity,
      confidencePct: avgConfidencePct,
      routeDependency: supplier.routeDependency,
      activeEvents: matchedEvents.map((e) => ({
        id: e.id,
        title: e.title,
        severity: e.severity
      }))
    };
  });
}
