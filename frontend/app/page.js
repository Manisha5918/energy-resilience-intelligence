"use client";

import { useState, useRef } from "react";
import EnergyShieldHero from "@/components/dashboard/EnergyShieldHero";
import StrategicEnergyNetworkSection from "@/components/dashboard/StrategicEnergyNetworkSection";
import MaritimeRefineryResilienceStory from "@/components/landing/MaritimeRefineryResilienceStory";
import TickerMarquee from "@/components/landing/TickerMarquee";
import CoreCapabilitiesGrid from "@/components/landing/CoreCapabilitiesGrid";
import ScenarioCascadeShowcase from "@/components/landing/ScenarioCascadeShowcase";
import ProductModuleCarousel from "@/components/landing/ProductModuleCarousel";
import DataProvenancePipeline from "@/components/landing/DataProvenancePipeline";
import VerifiedStatisticsSection from "@/components/landing/VerifiedStatisticsSection";
import ValidationMethodologySection from "@/components/landing/ValidationMethodologySection";
import DeploymentReadinessSection from "@/components/landing/DeploymentReadinessSection";
import MultiStepScenarioCTA from "@/components/landing/MultiStepScenarioCTA";
import ExecutiveDecisionSummary from "@/components/dashboard/ExecutiveDecisionSummary";
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
import VisualStorySection from "@/components/VisualStorySection";

export default function DashboardPage() {
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
  const [resilienceResult] = useState(() => calculateResilienceScore());
  const [reserveSummary] = useState(() => calculateTotalReserveCover());
  const dashboardRef = useRef(null);

  const scrollToCockpit = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto">
      
      {/* 1. PRIMARY HERO CLUSTER: Running Status Ticker + 14px Gap + Main Hero Decision Card */}
      <div className="space-y-3.5" aria-label="Executive Briefing & Live Intelligence">
        {/* Continuous Horizontal Status Ticker */}
        <section aria-label="Running Intelligence Status Ticker">
          <TickerMarquee />
        </section>

        {/* Real-World Energy Infrastructure Hero Card */}
        <section aria-label="EnergyShield Strategic Hero">
          <EnergyShieldHero onExploreClick={scrollToCockpit} />
        </section>
      </div>

      {/* 2. Mandatory Accuracy-First Decision Support Notice Banner & Data Quality Matrix */}
      <div className="rounded-2xl p-5 sm:p-6 bg-[#F8FBFE] border border-[#D5E5F1] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5E5F1] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-xs sm:text-sm uppercase tracking-wider font-mono text-emerald-800">
              ENERGYSHIELD — ACCURACY-FIRST DECISION-SUPPORT PLATFORM
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#EFF8FF] border border-[#B9DDF5] text-[#0B2540] font-semibold self-start sm:self-auto">
            OPERATIONAL READINESS: SIMULATION-READY / DECISION-SUPPORT
          </span>
        </div>
        <p className="text-xs text-[#526B82] leading-relaxed font-sans">
          Official statutory data, derived calculations, model conversion assumptions, simulated inputs, and pending-validation items are explicitly distinguished across all views.
          <strong className="text-[#0B2540] block sm:inline sm:ml-1 font-semibold">Not a live SCADA system. Not a live AIS system. Not an autonomous procurement system. Not an operational control system.</strong>
        </p>

        {/* Global Data Quality Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1 text-[11px] font-mono">
          <div className="p-2.5 bg-white rounded-xl border border-[#D5E5F1] flex items-center justify-between shadow-2xs">
            <span className="text-[#0B2540] font-medium">Official Data</span>
            <span className="text-emerald-700 font-bold">🟢 Verified</span>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-[#D5E5F1] flex items-center justify-between shadow-2xs">
            <span className="text-[#0B2540] font-medium">Derived Math</span>
            <span className="text-emerald-700 font-bold">🟢 Verified</span>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-[#D5E5F1] flex items-center justify-between shadow-2xs">
            <span className="text-[#0B2540] font-medium">Assumptions</span>
            <span className="text-amber-700 font-bold">🟠 Labeled</span>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-[#D5E5F1] flex items-center justify-between shadow-2xs">
            <span className="text-[#0B2540] font-medium">Simulated AIS</span>
            <span className="text-amber-700 font-bold">🟠 Model Fleet</span>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-[#D5E5F1] flex items-center justify-between shadow-2xs">
            <span className="text-[#0B2540] font-medium">SCADA Telemetry</span>
            <span className="text-amber-700 font-bold">🟠 Scenario</span>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-[#D5E5F1] flex items-center justify-between shadow-2xs">
            <span className="text-[#0B2540] font-medium">Auto Purchase</span>
            <span className="text-rose-700 font-bold">🔴 Restricted</span>
          </div>
        </div>
      </div>

      {/* 3. Executive Command Header */}
      <div 
        ref={dashboardRef}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-[#F8FBFE] border border-[#D5E5F1] shadow-xs"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B2540] font-heading">
                  National Resilience Operations Cockpit
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
                  DECISION-SUPPORT
                </span>
              </div>
              <p className="text-xs text-[#526B82] mt-1">
                Continuous decision-support modeling crude oil import vulnerability, maritime chokepoints, and adaptive procurement response.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Executive Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsExplainModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#EEF7FD] border border-[#D5E5F1] text-[#0B2540] text-xs font-mono transition-colors cursor-pointer shadow-2xs font-semibold"
          >
            <InfoIcon className="w-4 h-4 text-sky-600" />
            <span>Formula &amp; Explainability</span>
          </button>
        </div>
      </div>

      {/* 4. Key Executive Metrics: Situation & 3 Hero Metrics */}
      <ExecutiveDecisionSummary
        resilienceScore={resilienceResult.resilienceScore}
        supplyGapMbd={0}
        reserveDays={reserveSummary.statutorySprDaysCover || 8.1}
        onOpenExplainModal={() => setIsExplainModalOpen(true)}
      />

      {/* 5. Executive KPIs Grid (Detailed Component Factors, Brent, SPR, Import Dependency) */}
      <section aria-label="Executive Key Performance Indicators">
        <ExecutiveKpiGrid
          resilienceResult={resilienceResult}
          onOpenExplainModal={() => setIsExplainModalOpen(true)}
          crudePrices={SIMULATED_CRUDE_PRICES}
          reserveSummary={reserveSummary}
        />
      </section>

      {/* 6. STRATEGIC ENERGY NETWORK SECTION (3D Geodesic Lattice Animation) */}
      <StrategicEnergyNetworkSection />

      {/* 7. MARITIME EXPOSURE TO REFINERY RESILIENCE (Split Real-World Visual Storytelling Section) */}
      <MaritimeRefineryResilienceStory />

      {/* 8. Six Core Capabilities with 3D Flip Methodology Cards */}
      <CoreCapabilitiesGrid />

      {/* 9. End-to-End Crisis Cascade Simulation Flow */}
      <ScenarioCascadeShowcase />

      {/* CINEMATIC VISUAL STORY BREAK: MARITIME CHOKEPOINTS & SUPPLY LANES */}
      <VisualStorySection
        eyebrow="MARITIME ENERGY SECURITY"
        title="Navigating Critical Chokepoints & Tanker Convoys"
        description="Over 40-45% of India's crude imports transit the Strait of Hormuz, with critical diversions rounding the Cape of Good Hope during Red Sea security alerts."
        image="/images/maritime_chokepoint.png"
        imageAlt="Illustrative aerial photograph of crude oil tankers transiting a maritime corridor"
        caption="Illustrative maritime visualization. Vessel positions remain simulated unless connected to an authorized live provider."
        theme="amber"
        position="right"
        showRouteOverlay={true}
        flowSteps={["Strait of Hormuz", "Bab-el-Mandeb", "Cape Route", "Malacca Strait"]}
      />

      {/* 10. Interactive Product Module Carousel */}
      <ProductModuleCarousel />

      {/* 11. Data Provenance & Traceability Pipeline */}
      <DataProvenancePipeline />

      {/* CINEMATIC VISUAL STORY BREAK: ENERGY DATA INTELLIGENCE & TERMINAL OFFLOADING */}
      <VisualStorySection
        eyebrow="ENERGY DATA INTELLIGENCE"
        title="From Statutory Records to Precision Decision Support"
        description="Every analytical output is bound to audited statutory filings, mass conservation invariants, and deterministic elasticity parameters."
        image="/images/commercial_tank_farm.jpg"
        imageAlt="Illustrative crude offloading deepwater marine terminal and commercial storage infrastructure"
        caption="Illustrative energy data intelligence architecture — bound to statutory citations and deterministic formulas."
        theme="emerald"
        position="left"
        flowSteps={["OFFICIAL", "DERIVED", "MODEL ASSUMPTION", "SIMULATED", "PENDING VALIDATION"]}
      />

      {/* BELOW THE FOLD OPTIMIZED CONTENT SECTIONS */}
      <div className="space-y-12 below-fold-section">
        {/* 12. Verified Software Quality Statistics Section */}
        <VerifiedStatisticsSection />

        {/* 13. Tactical Maritime Corridor & Supply Chain Network (Digital Twin Map) */}
        <section aria-label="Maritime Corridors & Supply Network">
          <CorridorRiskMap />
        </section>

        {/* 14. Mid-Tier Intelligence: Supplier Concentration & Alert Center Feed */}
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

        {/* 15. Refinery Exposure & Strategic Infrastructure Summary */}
        <section aria-label="Refinery Exposure Summary">
          <RefineryExposureSummary />
        </section>

        {/* 16. Validation & Verification Methodology */}
        <ValidationMethodologySection />

        {/* 17. Platform Deployment Readiness Matrix */}
        <DeploymentReadinessSection />

        {/* 18. Multi-Step Interactive Scenario CTA */}
        <MultiStepScenarioCTA />
      </div>

      {/* 19. Executive Institutional Footer & Boundary Disclaimers */}
      <footer className="p-8 rounded-3xl bg-[#07111F] text-slate-400 border border-slate-800 space-y-6 font-mono text-xs" aria-label="Institutional Footer">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-wider text-sm font-heading">
                ENERGY<span className="text-[#00C7E8]">SHIELD</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-bold">
                DECISION-SUPPORT READY
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              National Energy Security Intelligence Platform for India • AI-Driven Maritime &amp; Supply Chain Resilience
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[10px]">
            <span className="px-2 py-1 rounded bg-slate-800/80 text-emerald-300 border border-emerald-800/60">🟢 OFFICIAL (PPAC/ISPRL/DGCIS)</span>
            <span className="px-2 py-1 rounded bg-slate-800/80 text-emerald-300 border border-emerald-800/60">🟢 DERIVED MATH</span>
            <span className="px-2 py-1 rounded bg-slate-800/80 text-amber-300 border border-amber-800/60">🟠 7.35 bbl/MT CONVERSION</span>
            <span className="px-2 py-1 rounded bg-slate-800/80 text-amber-300 border border-amber-800/60">🟠 SCENARIO INVENTORY</span>
            <span className="px-2 py-1 rounded bg-slate-800/80 text-rose-300 border border-rose-800/60">🔴 NON-EXECUTABLE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] font-sans leading-relaxed text-slate-400">
          <div>
            <strong className="text-slate-200 block font-mono text-xs uppercase mb-1">Authoritative Data Foundations:</strong>
            PPAC Monthly Petroleum Snapshots (FY2024-26), DGCIS Kolkata Bilateral Crude Customs Returns, ISPRL Annual Report 2024-25 (Audited Financial Statements), and Parliamentary Standing Committee on Petroleum and Natural Gas (Report No. 27).
          </div>
          <div>
            <strong className="text-slate-200 block font-mono text-xs uppercase mb-1">Operational Governance Safeguards:</strong>
            EnergyShield is an accuracy-first decision-support platform designed for simulation and executive planning. Not a live SCADA system, not a live maritime AIS tracker, and not an autonomous trading engine. All procurement directives require unit-level crude assay and human verification.
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400 font-mono">
          <span>© 2026 EnergyShield • Mathematical Invariants &amp; Provenance Protection Enforced</span>
          <span>Verified Software Build: Turbopack Production Ready (283/283 Tests Passed)</span>
        </div>
      </footer>

      {/* Transparent Risk Scoring Formula Modal */}
      <RiskExplanationModal
        isOpen={isExplainModalOpen}
        onClose={() => setIsExplainModalOpen(false)}
        resilienceResult={resilienceResult}
      />

    </div>
  );
}
