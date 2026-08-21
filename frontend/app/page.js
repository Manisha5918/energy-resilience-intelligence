"use client";

import { useState } from "react";
import ExecutiveKpiGrid from "@/components/dashboard/ExecutiveKpiGrid";
import RiskExplanationModal from "@/components/dashboard/RiskExplanationModal";
import CorridorRiskMap from "@/components/dashboard/CorridorRiskMap";
import SupplierConcentrationCard from "@/components/dashboard/SupplierConcentrationCard";
import AlertCenterFeed from "@/components/dashboard/AlertCenterFeed";
import RefineryExposureSummary from "@/components/dashboard/RefineryExposureSummary";
import { calculateResilienceScore } from "@/lib/riskScoringEngine";
import { SIMULATED_CRUDE_PRICES } from "@/lib/riskData";
import { calculateTotalReserveCover } from "@/lib/reserveData";
import { ShieldIcon, InfoIcon } from "@/components/ui/Icons";

export default function DashboardPage() {
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
  const [resilienceResult] = useState(() => calculateResilienceScore());
  const [reserveSummary] = useState(() => calculateTotalReserveCover());

  return (
    <div className="space-y-6">
      
      {/* Executive Command Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0c1424] via-[#090e18] to-[#070a0f] border border-cyan-500/20 shadow-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-700/60 text-cyan-400">
              <ShieldIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
                  India National Energy Supply Chain Resilience
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                  EXECUTIVE COMMAND CENTER
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Continuous decision-support modeling crude oil import vulnerability, maritime chokepoints, and adaptive procurement response.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Executive Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsExplainModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 text-xs font-mono transition-colors cursor-pointer"
          >
            <InfoIcon className="w-4 h-4" />
            <span>Formula & Explainability</span>
          </button>
        </div>
      </div>

      {/* 1. Executive KPIs Grid (Resilience Gauge, Risk Factors, Brent, SPR, Import Dependency) */}
      <section aria-label="Executive Key Performance Indicators">
        <ExecutiveKpiGrid
          resilienceResult={resilienceResult}
          onOpenExplainModal={() => setIsExplainModalOpen(true)}
          crudePrices={SIMULATED_CRUDE_PRICES}
          reserveSummary={reserveSummary}
        />
      </section>

      {/* 2. Tactical Maritime Corridor & Supply Chain Network (Digital Twin Map) */}
      <section aria-label="Maritime Corridors & Supply Network">
        <CorridorRiskMap />
      </section>

      {/* 3. Mid-Tier Intelligence: Supplier Concentration & Alert Center Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Supplier Concentration & HHI (6 Cols) */}
        <section className="lg:col-span-6" aria-label="Supplier Concentration">
          <SupplierConcentrationCard />
        </section>

        {/* Real-time Filterable Threat & Alert Feed (6 Cols) */}
        <section className="lg:col-span-6" aria-label="Risk Alert Center">
          <AlertCenterFeed />
        </section>

      </div>

      {/* 4. Refinery Exposure & Strategic Infrastructure Summary */}
      <section aria-label="Refinery Exposure Summary">
        <RefineryExposureSummary />
      </section>

      {/* Transparent Risk Scoring Formula Modal */}
      <RiskExplanationModal
        isOpen={isExplainModalOpen}
        onClose={() => setIsExplainModalOpen(false)}
        resilienceResult={resilienceResult}
      />

    </div>
  );
}
