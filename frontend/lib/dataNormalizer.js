/**
 * EnergyShield Data Normalizer
 * 
 * Normalizes multi-provider external and simulated telemetry (News, Shipping/AIS,
 * Sanctions, Markets) into a strict, unified intelligence schema.
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

export function normalizeNewsSignal(raw, isLive = false) {
  return {
    id: raw.id || `news-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    type: "news",
    title: raw.title || "Unspecified News Advisory",
    description: raw.summary || raw.description || "No summary provided.",
    source: raw.source || "Global News Wire",
    sourceUrl: raw.url || raw.sourceUrl || null,
    timestamp: raw.publishedAt || raw.timestamp || new Date().toISOString(),
    location: raw.location || "International Waters",
    affectedCorridor: raw.affectedCorridors || raw.affectedCorridor || [],
    affectedSuppliers: raw.affectedSuppliers || [],
    severity: raw.severity || "MEDIUM",
    confidence: raw.confidence || (isLive ? "HIGH" : "MEDIUM"),
    confidenceScore: raw.confidenceScore || (isLive ? 0.90 : 0.85),
    dataStatus: isLive ? "LIVE" : "SIMULATED",
    isSimulated: !isLive,
    provider: raw.provider || "News Ingestion Adapter",
    relevanceToIndia: raw.aiAnalysis?.relevanceToIndia || "General geopolitical intelligence signal."
  };
}

export function normalizeShippingSignal(raw, isLive = false) {
  return {
    id: raw.id || `ship-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    type: "shipping",
    title: raw.title || "Maritime Transit Telemetry",
    description: raw.summary || raw.description || "Vessel traffic and chokepoint telemetry.",
    source: raw.source || "Maritime AIS / UKMTO Feed",
    sourceUrl: raw.sourceUrl || null,
    timestamp: raw.publishedAt || raw.timestamp || new Date().toISOString(),
    location: raw.location || "Maritime Corridor",
    affectedCorridor: raw.affectedCorridors || raw.affectedCorridor || [],
    affectedSuppliers: raw.affectedSuppliers || [],
    severity: raw.severity || "LOW",
    confidence: raw.confidence || "HIGH",
    confidenceScore: raw.confidenceScore || 0.92,
    dataStatus: isLive ? "LIVE" : "SIMULATED",
    isSimulated: !isLive,
    provider: raw.provider || "AIS Chokepoint Engine",
    vesselActivity: raw.vesselActivity || "Standard Transit Flow",
    trafficChangePct: raw.trafficChangePct || 0
  };
}

export function normalizeSanctionsSignal(raw, isLive = false) {
  return {
    id: raw.id || `sanc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    type: "sanctions",
    title: raw.title || "Sanctions Regulatory Bulletin",
    description: raw.summary || raw.description || "International compliance advisory.",
    source: raw.source || "OFAC / EU Maritime Directorate",
    sourceUrl: raw.sourceUrl || null,
    timestamp: raw.publishedAt || raw.timestamp || new Date().toISOString(),
    location: raw.location || "Global Regulatory",
    affectedCorridor: raw.affectedCorridors || raw.affectedCorridor || [],
    affectedSuppliers: raw.affectedSuppliers || ["russia"],
    severity: raw.severity || "HIGH",
    confidence: raw.confidence || "HIGH",
    confidenceScore: raw.confidenceScore || 0.88,
    dataStatus: isLive ? "LIVE" : "SIMULATED",
    isSimulated: !isLive,
    provider: raw.provider || "Sanctions Compliance Tracker",
    entity: raw.entity || "Maritime Insurers & Tanker Operators"
  };
}

export function normalizeMarketSignal(raw, isLive = false) {
  return {
    id: raw.id || `mkt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    type: "market",
    title: raw.title || "Crude Benchmark & Freight Update",
    description: raw.summary || raw.description || "Energy pricing and tanker freight index telemetry.",
    source: raw.source || "OPEC / Benchmark Index Wire",
    sourceUrl: raw.sourceUrl || null,
    timestamp: raw.publishedAt || raw.timestamp || new Date().toISOString(),
    location: raw.location || "Global Oil Exchanges",
    affectedCorridor: raw.affectedCorridors || raw.affectedCorridor || [],
    affectedSuppliers: raw.affectedSuppliers || [],
    severity: raw.severity || "MEDIUM",
    confidence: raw.confidence || "HIGH",
    confidenceScore: raw.confidenceScore || 0.95,
    dataStatus: isLive ? "LIVE" : "SIMULATED",
    isSimulated: !isLive,
    provider: raw.provider || "Energy Markets Engine",
    spotPriceUsd: raw.spotPriceUsd || 84.65,
    freightMultiplier: raw.freightMultiplier || 1.0
  };
}
