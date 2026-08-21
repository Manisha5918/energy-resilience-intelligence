/**
 * EnergyShield Model Audit Log Engine
 * 
 * Immutable event logger tracking data ingestion, risk adjustments,
 * scenario executions, and procurement recommendations.
 * 
 * NOTE: Security hardened — NEVER stores API credentials or private keys.
 */

export const INITIAL_AUDIT_LOGS = [
  {
    id: "audit-001",
    timestamp: "2026-08-19T14:32:00Z",
    eventType: "SIGNAL_INGESTED",
    entity: "Strait of Hormuz (UKMTO)",
    previousValue: "Risk 64/100",
    newValue: "Risk 78/100",
    reason: "Naval electronic interference advisory normalized by data normalizer."
  },
  {
    id: "audit-002",
    timestamp: "2026-08-19T14:35:00Z",
    eventType: "RISK_SCORE_ADJUSTED",
    entity: "National Resilience Model",
    previousValue: "Resilience 72/100",
    newValue: "Resilience 65/100",
    reason: "Dynamic recency decay penalty applied from active naval and drone advisories."
  },
  {
    id: "audit-003",
    timestamp: "2026-08-19T15:10:00Z",
    eventType: "SCENARIO_SIMULATION_EXECUTED",
    entity: "Disruption Scenario Simulator",
    previousValue: "Steady-State Baseline",
    newValue: "Hormuz 30-Day Closure (42% Disruption)",
    reason: "Executive synthetic shock executed; calculated 1.96 MBD national supply deficit."
  },
  {
    id: "audit-004",
    timestamp: "2026-08-19T15:12:00Z",
    eventType: "PROCUREMENT_STRATEGY_GENERATED",
    entity: "Adaptive Procurement Orchestrator",
    previousValue: "Single Chokepoint Reliance (58.4% Hormuz)",
    newValue: "Strategy 1: Balanced Resilience (Fujairah & Cape Bypass)",
    reason: "Heuristic solver generated Pareto-optimal allocation with 88/100 decision score."
  },
  {
    id: "audit-005",
    timestamp: "2026-08-19T15:20:00Z",
    eventType: "PROVIDER_FALLBACK_TRIGGERED",
    entity: "Maritime AIS Adapter",
    previousValue: "Awaiting Live Socket",
    newValue: "DEMO_MODE_SIMULATED",
    reason: "External shipping key not supplied; gracefully engaged calibrated baseline telemetry."
  }
];

export function getAuditLogs() {
  return INITIAL_AUDIT_LOGS;
}
