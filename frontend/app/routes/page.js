import { NavigationIcon, AnchorIcon, InfoIcon, ShieldIcon } from "@/components/ui/Icons";
import { SIMULATED_SHIPPING_ROUTES } from "@/lib/routeData";

export const metadata = {
  title: "Maritime Routes & Chokepoints | EnergyShield",
  description: "Maritime shipping route analysis, transit times, and chokepoint vulnerabilities.",
};

export default function RoutesPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-xl bg-[#0b121e] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-700/60 text-blue-400">
            <NavigationIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-mono text-white">Maritime Route Intelligence</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-blue-300">
                4 CRITICAL ARTERIES
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparative analysis of tanker transit durations, freight multipliers, and alternative diversion corridors.
            </p>
          </div>
        </div>

        <div className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-800/60">
          DEMO MODE • SIMULATED DATA
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SIMULATED_SHIPPING_ROUTES.map((route) => {
          const isCritical = route.riskLevel === "CRITICAL";
          const isHigh = route.riskLevel === "HIGH";

          return (
            <div key={route.id} className="command-card rounded-xl p-5 border border-slate-800 space-y-3.5">
              <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">{route.corridor}</span>
                  <h3 className="text-sm font-bold font-mono text-slate-100 mt-0.5">{route.name}</h3>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border shrink-0 ${
                  isCritical
                    ? "bg-rose-950 text-rose-400 border-rose-800"
                    : isHigh
                    ? "bg-amber-950 text-amber-400 border-amber-800"
                    : "bg-emerald-950 text-emerald-400 border-emerald-800"
                }`}>
                  {route.riskLevel}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Transit Time</span>
                  <span className="text-slate-200 font-bold">{route.transitTimeDays} Days</span>
                </div>
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Freight Cost</span>
                  <span className="text-cyan-400 font-bold">{route.freightCostMultiplier}x</span>
                </div>
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-[9px] text-slate-500 uppercase block">Volume Share</span>
                  <span className="text-amber-400 font-bold">{route.volumeSharePct}%</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Chokepoint Exposure:</span>
                  <p className="text-slate-300 font-mono text-[11px] mt-0.5">{route.chokepointExposure}</p>
                </div>

                <div className="p-2 rounded bg-[#060a10] border border-cyan-900/50">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold block mb-0.5">
                    Alternative / Bypass Routing:
                  </span>
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed">{route.alternativeRoute}</p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Key Discharge Ports:</span>
                  <div className="flex flex-wrap gap-1 mt-1 font-mono text-[10px]">
                    {route.keyPorts.map((port, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {port}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[9px] font-mono text-slate-500 flex justify-between">
                <span>STATUS: {route.status}</span>
                <span>[SIMULATED ROUTE MODEL]</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
