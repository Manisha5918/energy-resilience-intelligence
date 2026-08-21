/**
 * EnergyShield Data Freshness & Provider Health Monitor
 * 
 * Computes telemetry age, freshness classifications, and overall system ingestion health.
 */

export function getDataAgeMinutes(timestamp) {
  if (!timestamp) return 999;
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = Math.max(0, now.getTime() - date.getTime());
  return Math.round(diffMs / (1000 * 60));
}

export function formatDataAge(timestamp) {
  if (!timestamp) return "Unknown";
  const mins = getDataAgeMinutes(timestamp);
  if (mins < 1) return "Just now (< 1 min ago)";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.round(hours / 24);
  return `${days} days ago`;
}

export function getFreshnessStatus(timestamp, providerType = "news") {
  if (!timestamp) return "UNAVAILABLE";
  const mins = getDataAgeMinutes(timestamp);

  switch (providerType) {
    case "market":
      if (mins <= 5) return "FRESH";
      if (mins <= 30) return "AGING";
      return "STALE";

    case "shipping":
      if (mins <= 20) return "FRESH";
      if (mins <= 60) return "AGING";
      return "STALE";

    case "news":
      if (mins <= 15) return "FRESH";
      if (mins <= 90) return "AGING";
      return "STALE";

    case "sanctions":
      if (mins <= 1440) return "FRESH"; // 24 hours
      if (mins <= 4320) return "AGING"; // 72 hours
      return "STALE";

    default:
      if (mins <= 30) return "FRESH";
      if (mins <= 120) return "AGING";
      return "STALE";
  }
}

export function getSystemDataHealth(providers = []) {
  const liveCount = providers.filter((p) => p.isLive).length;
  const simulatedCount = providers.filter((p) => !p.isLive).length;
  const total = providers.length;

  let overallStatus = "SIMULATED";
  if (liveCount === total && total > 0) overallStatus = "LIVE";
  else if (liveCount > 0) overallStatus = "MIXED";

  return {
    overallStatus,
    liveCount,
    simulatedCount,
    totalProviders: total,
    badgeText: overallStatus === "LIVE" 
      ? "LIVE DATA CONNECTED" 
      : overallStatus === "MIXED" 
      ? `MIXED (${liveCount} LIVE, ${simulatedCount} SIMULATED)` 
      : "DEMO MODE — SIMULATED DATA",
    statusClass: overallStatus === "LIVE"
      ? "bg-emerald-950 text-emerald-300 border-emerald-800"
      : overallStatus === "MIXED"
      ? "bg-cyan-950 text-cyan-300 border-cyan-800"
      : "bg-amber-950/80 text-amber-300 border-amber-800"
  };
}
