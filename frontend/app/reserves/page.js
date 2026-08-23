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
        <div className="command-card p-4 rounded-xl border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Scenario Inventory (Not Live SCADA)</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            {summary.sprTotalBarrels} <span className="text-xs text-slate-400">MBBL</span>
          </div>
          <div className="text-[10px] font-mono text-amber-400/90 mt-1 flex items-center justify-between">
            <span>85% Assumed Fill</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950/60 border border-amber-800/40 text-amber-300">SCENARIO ONLY</span>
          </div>
        </div>

        <div className="command-card p-4 rounded-xl border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Scenario SPR Days Cover</div>
          <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
            {summary.sprDaysCover} <span className="text-xs text-slate-400">Days</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Based on {netImportRequirement} MBD net import need.
          </p>
        </div>

        <div className="command-card p-4 rounded-xl border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Commercial Industry Buffer</div>
          <div className="text-2xl font-bold font-mono text-slate-200 mt-1">
            {summary.commercialDaysCover} <span className="text-xs text-slate-400">Days</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Refinery tank farms & pipeline stocks.
          </p>
        </div>

        <div className="command-card p-4 rounded-xl border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Combined National Cover</div>
          <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">
            {summary.totalCombinedCoverDays} <span className="text-xs text-slate-400">Days</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {summary.statusRecommendation}
          </p>
        </div>
      </div>

      {/* Decision-Oriented Strategic Reserve Response Card */}
      <div className="command-card rounded-xl p-5 border border-cyan-500/30 bg-gradient-to-r from-[#0c1626] via-[#09111c] to-[#070a0f] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
            <ShieldIcon className="w-4 h-4" />
            <span>Decision Response: Strategic Petroleum Reserve Bridge Protocol</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
            HORMUZ DISRUPTION CONTINGENCY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">Projected Supply Gap</span>
            <div className="text-xl font-bold text-rose-400">{projectedGapMbd} MBD</div>
            <span className="text-[10px] text-slate-400 font-sans block">{contingencySimulation.parameters.supplyDisruptionPct}% disruption over {contingencySimulation.parameters.durationDays}-day shock</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">Recommended Drawdown</span>
            <div className="text-xl font-bold text-amber-300">{recommendedDrawdownMbd} MBD</div>
            <span className="text-[10px] text-slate-400 font-sans block">Controlled cavern release to Western SPM grid</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">Remaining Emergency Cover</span>
            <div className="text-xl font-bold text-emerald-400">{remainingCoverDays} Days</div>
            <span className="text-[10px] text-slate-400 font-sans block">Post-{contingencySimulation.parameters.durationDays}-day residual SPR buffer</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#070e1c] border border-cyan-800/40 text-xs text-slate-300 font-sans leading-relaxed flex items-start gap-2">
          <InfoIcon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            <strong>Strategic Reserve Role:</strong> Reserve drawdown is deployed as a temporary emergency bridge while alternate crude procurement via UAE Habshan-Fujairah pipeline and Cape of Good Hope routes ramps up to delivery.
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
      <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-semibold font-mono text-slate-100 flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-emerald-400" />
            Underground Rock Cavern Storage Facilities (ISPRL Phase-1)
          </h2>
          <span className="text-[10px] font-mono text-slate-500">STATUTORY LEGAL DISCLOSURES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SIMULATED_SPR_SITES.map((site) => (
            <div key={site.id} className="p-4 rounded-xl bg-[#070b14] border border-slate-800/80 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold font-mono text-slate-100">{site.name}</h3>
                  <span className="text-[11px] text-slate-400">{site.state}</span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border bg-emerald-950 text-emerald-400 border-emerald-800">
                  {site.phase || "Phase-1"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Capacity</span>
                  <span className="text-slate-200 font-bold">{site.capacityMillionBarrels} MBBL</span>
                  <span className="text-[9px] text-slate-500 block">({site.capacityMetricTonnes || site.capacityMillionMetricTonnes} MMT)</span>
                </div>
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Telemetry Status</span>
                  <span className="text-amber-400 font-bold text-[10px]">CLASSIFIED</span>
                  <span className="text-[9px] text-slate-500 block">SCADA restricted</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="text-[11px] text-slate-400">
                  <span className="font-mono text-slate-500">Storage Type:</span> {site.cavernType || site.type}
                </div>
                <div className="text-[11px] text-slate-400">
                  <span className="font-mono text-slate-500">Connected Refinery:</span> {site.connectedRefinery || site.connectivity}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[9px] font-mono text-slate-500 flex justify-between">
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
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0b1626] via-[#09121f] to-[#070a0f] border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
            <CheckCircleIcon className="w-4 h-4" />
            <span>Operational Response Protocol Complete</span>
          </div>
          <p className="text-xs text-slate-300 font-sans mt-1">
            Review statutory audit trail in Data Quality Center or return to Executive Command Center.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/data-center"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-mono text-xs font-bold transition-all cursor-pointer"
          >
            <DatabaseIcon className="w-4 h-4" />
            <span>Audit Data Provenance Ledger →</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <ShieldIcon className="w-4 h-4" />
            <span>Return to Executive Command Center →</span>
          </Link>
        </div>
      </div>

    </div>
  );
}

