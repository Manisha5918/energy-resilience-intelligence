import { DatabaseIcon, ShieldIcon, ActivityIcon, CheckCircleIcon } from "@/components/ui/Icons";
import { SIMULATED_SPR_SITES, SIMULATED_COMMERCIAL_STORAGE, calculateTotalReserveCover } from "@/lib/reserveData";

export const metadata = {
  title: "Strategic Petroleum Reserves (SPR) | EnergyShield",
  description: "India's underground rock cavern reserves, commercial crude inventory, and cover duration.",
};

export default function ReservesPage() {
  const summary = calculateTotalReserveCover();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-xl bg-[#0b121e] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-400">
            <DatabaseIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-mono text-white">Strategic Petroleum Reserves (SPR)</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                ISPRL AUDIT MODEL
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Underground rock cavern inventory, commercial refinery tankage buffers, and national crude days cover.
            </p>
          </div>
        </div>

        <div className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-800/60">
          DEMO MODE • SIMULATED DATA
        </div>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="command-card p-4 rounded-xl border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Total SPR Inventory</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            {summary.sprTotalBarrels} <span className="text-xs text-slate-400">MBBL</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Across Vizag, Mangalore & Padur caverns.
          </p>
        </div>

        <div className="command-card p-4 rounded-xl border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase">SPR Days Cover</div>
          <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
            {summary.sprDaysCover} <span className="text-xs text-slate-400">Days</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Based on 4.67 MBD daily import demand.
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

      {/* Cavern Sites Table */}
      <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-semibold font-mono text-slate-100 flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-emerald-400" />
            Underground Rock Cavern Storage Facilities (ISPRL)
          </h2>
          <span className="text-[10px] font-mono text-slate-500">PHASE I & PHASE II SITES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SIMULATED_SPR_SITES.map((site) => (
            <div key={site.id} className="p-4 rounded-xl bg-[#070b14] border border-slate-800/80 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold font-mono text-slate-100">{site.name}</h3>
                  <span className="text-[11px] text-slate-400">{site.state}</span>
                </div>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                  site.fillRatePct > 0 
                    ? "bg-emerald-950 text-emerald-400 border-emerald-800" 
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}>
                  {site.phase}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Capacity</span>
                  <span className="text-slate-200 font-bold">{site.capacityMillionBarrels} MBBL</span>
                  <span className="text-[9px] text-slate-500 block">({site.capacityMillionMetricTonnes} MMT)</span>
                </div>
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Fill Status</span>
                  <span className="text-emerald-400 font-bold">{site.fillRatePct}%</span>
                  <span className="text-[9px] text-slate-500 block">{site.currentInventoryMillionBarrels} MBBL filled</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="text-[11px] text-slate-400">
                  <span className="font-mono text-slate-500">Storage Type:</span> {site.type}
                </div>
                <div className="text-[11px] text-slate-400">
                  <span className="font-mono text-slate-500">Connectivity:</span> {site.connectivity}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[9px] font-mono text-slate-500 flex justify-between">
                <span>{site.status}</span>
                <span>{site.daysCoverAtNationalConsumption} Days Cover</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
