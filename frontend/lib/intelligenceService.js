/**
 * EnergyShield Intelligence Service Layer
 * 
 * Aggregates multi-source feeds (News, Maritime AIS, Sanctions, Markets)
 * and exposes normalized signal streams to client components and backend engines.
 */

import { fetchNewsSignals } from "./providers/newsProvider.js";
import { fetchShippingSignals } from "./providers/shippingProvider.js";
import { fetchSanctionsSignals } from "./providers/sanctionsProvider.js";
import { fetchMarketSignals } from "./providers/marketProvider.js";
import { SIMULATED_INTELLIGENCE_EVENTS } from "./intelligenceData.js";
import { getSystemDataHealth } from "./dataFreshness.js";

export async function getNewsSignals() {
  return await fetchNewsSignals();
}

export async function getShippingSignals() {
  return await fetchShippingSignals();
}

export async function getSanctionsSignals() {
  return await fetchSanctionsSignals();
}

export async function getMarketSignals() {
  return await fetchMarketSignals();
}

export async function getAllSignals() {
  const [news, shipping, sanctions, market] = await Promise.all([
    fetchNewsSignals(),
    fetchShippingSignals(),
    fetchSanctionsSignals(),
    fetchMarketSignals()
  ]);

  const providers = [
    {
      name: "Geopolitical News Wire",
      type: "news",
      isLive: news.isLive,
      status: news.status,
      dataStatus: news.dataStatus,
      latencyMs: news.latencyMs || 15,
      lastUpdated: news.retrievedAt,
      signalCount: news.signals?.length || 0
    },
    {
      name: "Maritime AIS & Chokepoints",
      type: "shipping",
      isLive: shipping.isLive,
      status: shipping.status,
      dataStatus: shipping.dataStatus,
      latencyMs: shipping.latencyMs || 20,
      lastUpdated: shipping.retrievedAt,
      signalCount: shipping.signals?.length || 0
    },
    {
      name: "Sanctions & Compliance Tracker",
      type: "sanctions",
      isLive: sanctions.isLive,
      status: sanctions.status,
      dataStatus: sanctions.dataStatus,
      latencyMs: sanctions.latencyMs || 10,
      lastUpdated: sanctions.retrievedAt,
      signalCount: sanctions.signals?.length || 0
    },
    {
      name: "Crude Benchmark & Tanker Freight",
      type: "market",
      isLive: market.isLive,
      status: market.status,
      dataStatus: market.dataStatus,
      latencyMs: market.latencyMs || 12,
      lastUpdated: market.retrievedAt,
      signalCount: market.signals?.length || 0
    }
  ];

  const systemHealth = getSystemDataHealth(providers);

  return {
    isLive: systemHealth.overallStatus === "LIVE",
    systemHealth,
    status: systemHealth.overallStatus,
    retrievedAt: new Date().toISOString(),
    events: SIMULATED_INTELLIGENCE_EVENTS,
    providers
  };
}
