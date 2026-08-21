/**
 * EnergyShield Data Normalizer
 * 
 * Normalizes multi-provider external and simulated telemetry (News, Shipping/AIS,
 * Sanctions, Markets) into a strict, unified intelligence schema.
 * 
 * Guaranteed Deterministic: Uses stable content-hashing for fallback IDs
 * without relying on Math.random() or non-deterministic clock offsets.
 * 
 * Schema:
 * {
 *   id,
 *   type, // 'news' | 'shipping' | 'sanctions' | 'market' | 'weather'
 *   title,
 *   description,
 *   source,
 *   sourceUrl,
 *   timestamp,
 *   location,
 *   affectedCorridor,
 *   affectedSuppliers,
 *   severity, // 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
 *   confidence, // 'LOW' | 'MEDIUM' | 'HIGH'
 *   confidenceScore, // 0.0 - 1.0
 *   dataStatus, // 'LIVE' | 'SIMULATED' | 'FALLBACK' | 'UNAVAILABLE'
 *   isSimulated,
 *   provider
 * }
 */

const CANONICAL_FALLBACK_TIMESTAMP = "2026-08-19T21:00:00Z";

/**
 * Deterministic string hash generator (FNV-1a 32-bit).
 * Produces a stable, repeatable base-36 hash from input fields.
 */
export function generateDeterministicSignalId(prefix, ...components) {
  const combined = components.filter(Boolean).join("|").toLowerCase().trim() || "unspecified";
  let hash = 0x811c9dc5;
  for (let i = 0; i < combined.length; i++) {
    hash ^= combined.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  const hex = (hash >>> 0).toString(36);
  return `${prefix}-${hex}`;
}

export function normalizeNewsSignal(raw = {}, isLive = false) {
  const fallbackId = generateDeterministicSignalId("news", raw.title, raw.source, raw.location);
  return {
    id: raw.id || fallbackId,
    type: "news",
    title: raw.title || "Unspecified News Advisory",
    description: raw.summary || raw.description || "No summary provided.",
    source: raw.source || "Global News Wire",
    sourceUrl: raw.url || raw.sourceUrl || null,
    timestamp: raw.publishedAt || raw.timestamp || CANONICAL_FALLBACK_TIMESTAMP,
    location: raw.location || "International Waters",
    affectedCorridor: raw.affectedCorridors || raw.affectedCorridor || [],
    affectedSuppliers: raw.affectedSuppliers || [],
    severity: raw.severity || "MEDIUM",
    confidence: raw.confidence || (isLive ? "HIGH" : "MEDIUM"),
    confidenceScore: raw.confidenceScore ?? (isLive ? 0.90 : 0.85),
    dataStatus: isLive ? "LIVE" : "SIMULATED",
    isSimulated: !isLive,
    provider: raw.provider || "News Ingestion Adapter",
    relevanceToIndia: raw.aiAnalysis?.relevanceToIndia || "General geopolitical intelligence signal."
  };
}

export function normalizeShippingSignal(raw = {}, isLive = false) {
  const fallbackId = generateDeterministicSignalId("ship", raw.title, raw.source, raw.location);
  return {
    id: raw.id || fallbackId,
    type: "shipping",
    title: raw.title || "Maritime Transit Telemetry",
    description: raw.summary || raw.description || "Vessel traffic and chokepoint telemetry.",
    source: raw.source || "Maritime AIS / UKMTO Feed",
    sourceUrl: raw.sourceUrl || null,
    timestamp: raw.publishedAt || raw.timestamp || CANONICAL_FALLBACK_TIMESTAMP,
    location: raw.location || "Maritime Corridor",
    affectedCorridor: raw.affectedCorridors || raw.affectedCorridor || [],
    affectedSuppliers: raw.affectedSuppliers || [],
    severity: raw.severity || "LOW",
    confidence: raw.confidence || "HIGH",
    confidenceScore: raw.confidenceScore ?? 0.92,
    dataStatus: isLive ? "LIVE" : "SIMULATED",
    isSimulated: !isLive,
    provider: raw.provider || "AIS Chokepoint Engine",
    vesselActivity: raw.vesselActivity || "Standard Transit Flow",
    trafficChangePct: raw.trafficChangePct || 0
  };
}

export function normalizeSanctionsSignal(raw = {}, isLive = false) {
  const fallbackId = generateDeterministicSignalId("sanc", raw.title, raw.source, raw.location);
  return {
    id: raw.id || fallbackId,
    type: "sanctions",
    title: raw.title || "Sanctions Regulatory Bulletin",
    description: raw.summary || raw.description || "International compliance advisory.",
    source: raw.source || "OFAC / EU Maritime Directorate",
    sourceUrl: raw.sourceUrl || null,
    timestamp: raw.publishedAt || raw.timestamp || CANONICAL_FALLBACK_TIMESTAMP,
    location: raw.location || "Global Regulatory",
    affectedCorridor: raw.affectedCorridors || raw.affectedCorridor || [],
    affectedSuppliers: raw.affectedSuppliers || ["russia"],
    severity: raw.severity || "HIGH",
    confidence: raw.confidence || "HIGH",
    confidenceScore: raw.confidenceScore ?? 0.88,
    dataStatus: isLive ? "LIVE" : "SIMULATED",
    isSimulated: !isLive,
    provider: raw.provider || "Sanctions Compliance Tracker",
    entity: raw.entity || "Maritime Insurers & Tanker Operators"
  };
}

export function normalizeMarketSignal(raw = {}, isLive = false) {
  const fallbackId = generateDeterministicSignalId("mkt", raw.title, raw.source, raw.location);
  return {
    id: raw.id || fallbackId,
    type: "market",
    title: raw.title || "Crude Benchmark & Freight Update",
    description: raw.summary || raw.description || "Energy pricing and tanker freight index telemetry.",
    source: raw.source || "OPEC / Benchmark Index Wire",
    sourceUrl: raw.sourceUrl || null,
    timestamp: raw.publishedAt || raw.timestamp || CANONICAL_FALLBACK_TIMESTAMP,
    location: raw.location || "Global Oil Exchanges",
    affectedCorridor: raw.affectedCorridors || raw.affectedCorridor || [],
    affectedSuppliers: raw.affectedSuppliers || [],
    severity: raw.severity || "MEDIUM",
    confidence: raw.confidence || "HIGH",
    confidenceScore: raw.confidenceScore ?? 0.95,
    dataStatus: isLive ? "LIVE" : "SIMULATED",
    isSimulated: !isLive,
    provider: raw.provider || "Energy Markets Engine",
    spotPriceUsd: raw.spotPriceUsd || 84.65,
    freightMultiplier: raw.freightMultiplier || 1.0
  };
}
