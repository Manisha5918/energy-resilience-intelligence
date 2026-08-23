import Link from "next/link";
import { DatabaseIcon, ShieldIcon, ActivityIcon, CheckCircleIcon, ZapIcon, InfoIcon } from "@/components/ui/Icons";
import SPRDrawdownPlanner from "@/components/reserves/SPRDrawdownPlanner";
import ISPRLOfficialRecordsViewer from "@/components/reserves/ISPRLOfficialRecordsViewer";
import { SIMULATED_SPR_SITES, SIMULATED_COMMERCIAL_STORAGE, SIMULATED_NATIONAL_ENERGY_METRICS, calculateTotalReserveCover } from "@/lib/reserveData";
import { runScenario, SPR_ENGINEERING_CONSTRAINTS } from "@/lib/scenarioEngine";

import VisualStorySection from "@/components/VisualStorySection";

export const metadata = {
  title: "Strategic Petroleum Reserves (SPR) | EnergyShield",
  description: "India's underground rock cavern reserves, commercial crude inventory, and cover duration.",
};

export default function ReservesPage() {
  const summary = calculateTotalReserveCover();
  const netImportRequirement = SIMULATED_NATIONAL_ENERGY_METRICS.dailyNetImportRequirementMbd;

  // Dynamically derive Hormuz contingency drawdown response via scenarioEngine
  const contingencySimulation = runScenario({
    scenarioId: "hormuz-closure",
    supplyDisruptionPercent: 42,
    durationDays: 15
  });
  const projectedGapMbd = contingencySimulation.supplyImpact.dailySupplyDeficitMbd;
  const recommendedDrawdownMbd = Number((Math.min(
    SPR_ENGINEERING_CONSTRAINTS.MAX_WITHDRAWAL_RATE_MBD,
    projectedGapMbd * SPR_ENGINEERING_CONSTRAINTS.POLICY_DRAWDOWN_RATIO
  )).toFixed(2));
  const remainingCoverDays = contingencySimulation.reserveImpact.scenarioSprDaysCover;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
            <DatabaseIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
                Strategic Petroleum Reserves (SPR)
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                ISPRL AUDIT MODEL
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Underground rock cavern inventory, commercial refinery tankage buffers, and national crude days cover.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-semibold self-start sm:self-auto">
          STATUTORY ISPRL PHASE-1 DATA
        </div>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-[#C7E3F7] bg-[#F4F9FD] shadow-xs">
          <div className="text-[10px] font-mono text-[#58708A] font-bold uppercase">Scenario Inventory (Not Live SCADA)</div>
          <div className="text-2xl font-bold font-mono text-[#00C98D] mt-1">
            {summary.sprTotalBarrels} <span className="text-xs text-[#58708A]">MBBL</span>
          </div>
          <div className="text-[10px] font-mono text-[#92400E] mt-1 flex items-center justify-between">
            <span>85% Assumed Fill</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] font-bold">SCENARIO ONLY</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#C7E3F7] bg-[#F4F9FD] shadow-xs">
          <div className="text-[10px] font-mono text-[#58708A] font-bold uppercase">Scenario SPR Days Cover</div>
          <div className="text-2xl font-bold font-mono text-[#0284c7] mt-1">
            {summary.sprDaysCover} <span className="text-xs text-[#58708A]">Days</span>
          </div>
          <p className="text-xs text-[#58708A] mt-1 font-sans">
            Based on {netImportRequirement} MBD net import need.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-[#C7E3F7] bg-[#F4F9FD] shadow-xs">
          <div className="text-[10px] font-mono text-[#58708A] font-bold uppercase">Commercial Industry Buffer</div>
          <div className="text-2xl font-bold font-mono text-[#16324F] mt-1">
            {summary.commercialDaysCover} <span className="text-xs text-[#58708A]">Days</span>
          </div>
          <p className="text-xs text-[#58708A] mt-1 font-sans">
            Refinery tank farms &amp; pipeline stocks.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-[#C7E3F7] bg-[#F4F9FD] shadow-xs">
          <div className="text-[10px] font-mono text-[#58708A] font-bold uppercase">Combined National Cover</div>
          <div className="text-2xl font-bold font-mono text-[#00C98D] mt-1">
            {summary.totalCombinedCoverDays} <span className="text-xs text-[#58708A]">Days</span>
          </div>
          <p className="text-xs text-[#58708A] mt-1 font-sans">
            {summary.statusRecommendation}
          </p>
        </div>
      </div>

      {/* Decision-Oriented Strategic Reserve Response Card */}
      <div className="rounded-2xl p-6 border border-[#C7E3F7] bg-white space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C7E3F7] pb-3">
          <div className="flex items-center gap-2 text-[#00B8D9] font-mono text-xs font-bold uppercase">
            <ShieldIcon className="w-4 h-4 text-[#0284c7]" />
            <span className="text-[#16324F]">Decision Response: Strategic Petroleum Reserve Bridge Protocol</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] font-bold">
            HORMUZ DISRUPTION CONTINGENCY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] space-y-1.5 shadow-2xs">
            <span className="text-[11px] font-bold text-[#16324F] uppercase tracking-wide block">Projected Supply Gap</span>
            <div className="text-2xl font-bold text-[#FF3D6E]">{projectedGapMbd} MBD</div>
            <span className="text-xs text-[#58708A] font-sans block leading-relaxed">{contingencySimulation.parameters.supplyDisruptionPct}% disruption over {contingencySimulation.parameters.durationDays}-day shock</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] space-y-1.5 shadow-2xs">
            <span className="text-[11px] font-bold text-[#16324F] uppercase tracking-wide block">Recommended Drawdown</span>
            <div className="text-2xl font-bold text-[#FFB81C]">{recommendedDrawdownMbd} MBD</div>
            <span className="text-xs text-[#58708A] font-sans block leading-relaxed">Controlled cavern release to Western SPM grid</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] space-y-1.5 shadow-2xs">
            <span className="text-[11px] font-bold text-[#16324F] uppercase tracking-wide block">Remaining Emergency Cover</span>
            <div className="text-2xl font-bold text-[#00C98D]">{remainingCoverDays} Days</div>
            <span className="text-xs text-[#58708A] font-sans block leading-relaxed">Post-{contingencySimulation.parameters.durationDays}-day residual SPR buffer</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#07111F] border border-[#1E293B] text-xs text-slate-200 font-sans leading-relaxed flex items-start gap-2.5">
          <InfoIcon className="w-4 h-4 text-[#00C7E8] shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">Strategic Reserve Role:</strong> Reserve drawdown is deployed as a temporary emergency bridge while alternate crude procurement via UAE Habshan-Fujairah pipeline and Cape of Good Hope routes ramps up to delivery.
          </span>
        </div>
      </div>

      {/* CINEMATIC VISUAL STORY BREAK: STRATEGIC PETROLEUM RESERVES */}
      <VisualStorySection
        eyebrow="STRATEGIC RESERVE CAPACITY"
        title="Physical capacity, scenario inventory and drawdown planning."
        description="India's Phase-I Strategic Petroleum Reserves span 5.33 MMT (39.18 MBBL) across underground unlined rock caverns in Visakhapatnam, Mangalore, and Padur."
        image="/images/strategic_cavern.png"
        imageAlt="Illustrative underground petroleum storage rock cavern"
        caption="Illustrative underground rock cavern visualization. Sub-surface inventory reflects simulated scenarios — not live SCADA telemetry."
        theme="emerald"
        position="left"
        safetyBadge={{ text: "SCENARIO INVENTORY (NOT LIVE SCADA)", variant: "warning" }}
        overlayStats={[
          { label: "Physical Installed", value: "5.33 MMT", subtext: "39.18 MBBL" },
          { label: "Sovereign Strategic", value: "5.03 MMT", subtext: "ISPRL Custody" },
          { label: "HPCL Leased", value: "0.30 MMT", subtext: "Commercial" }
        ]}
      />

      {/* Interactive SPR Drawdown Planner */}
      <section aria-label="Interactive SPR Drawdown Planner">
        <SPRDrawdownPlanner />
      </section>

      {/* Cavern Sites Table */}
      <div className="rounded-2xl p-6 border border-[#C7E3F7] bg-white space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#C7E3F7] pb-3">
          <h2 className="text-sm font-bold font-mono text-[#16324F] flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-emerald-600" />
            Underground Rock Cavern Storage Facilities (ISPRL Phase-1)
          </h2>
          <span className="text-[10px] font-mono text-[#58708A] font-bold">STATUTORY LEGAL DISCLOSURES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SIMULATED_SPR_SITES.map((site) => (
            <div key={site.id} className="p-4 rounded-xl bg-[#F4F9FD] border border-[#C7E3F7] space-y-3 shadow-2xs">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold font-mono text-[#16324F]">{site.name}</h3>
                  <span className="text-[11px] text-[#58708A]">{site.state}</span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200 font-bold">
                  {site.phase || "Phase-1"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white border border-[#D5E5F1]">
                  <span className="text-[9px] text-[#58708A] uppercase font-bold block">Capacity</span>
                  <span className="text-[#16324F] font-bold">{site.capacityMillionBarrels} MBBL</span>
                  <span className="text-[9px] text-[#58708A] block">({site.capacityMetricTonnes || site.capacityMillionMetricTonnes} MMT)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#D5E5F1]">
                  <span className="text-[9px] text-[#58708A] uppercase font-bold block">Telemetry Status</span>
                  <span className="text-[#D97706] font-bold text-[10px]">CLASSIFIED</span>
                  <span className="text-[9px] text-[#58708A] block">SCADA restricted</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="text-[11px] text-[#58708A]">
                  <span className="font-mono text-[#16324F] font-bold">Storage Type:</span> {site.cavernType || site.type}
                </div>
                <div className="text-[11px] text-[#58708A]">
                  <span className="font-mono text-[#16324F] font-bold">Connected Refinery:</span> {site.connectedRefinery || site.connectivity}
                </div>
              </div>

              <div className="pt-2 border-t border-[#D5E5F1] text-[9px] font-mono text-[#58708A] flex justify-between font-semibold">
                <span>{site.operationalStatus || site.status}</span>
                <span>{site.daysCoverAtNationalConsumption} Days Cover</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 34-Record ISPRL Sovereign Dataset & Reconciliation Audit */}
      <section aria-label="ISPRL Official Records Ledger">
        <ISPRLOfficialRecordsViewer />
      </section>

      {/* Decision Summary & Data Provenance Navigation */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#F0F8FF] via-[#F8FBFE] to-[#F3F9FF] border border-[#C7E3F7] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-mono text-xs font-bold uppercase">
            <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
            <span>Operational Response Protocol Complete</span>
          </div>
          <p className="text-xs text-[#58708A] font-sans mt-1">
            Review statutory audit trail in Data Quality Center or return to Executive Command Center.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/data-center"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#EEF7FF] border border-[#C7E3F7] text-[#0B2540] font-mono text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <DatabaseIcon className="w-4 h-4 text-sky-600" />
            <span>Audit Data Provenance Ledger →</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <ShieldIcon className="w-4 h-4 text-white" />
            <span>Return to Executive Command Center →</span>
          </Link>
        </div>
      </div>

    </div>
  );
}

