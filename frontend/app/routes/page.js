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
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 shadow-xs">
            <NavigationIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-heading text-slate-900">Maritime Route Intelligence</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
                4 CRITICAL ARTERIES
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Comparative analysis of tanker transit durations, freight multipliers, and alternative diversion corridors.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 font-semibold self-start sm:self-auto">
          DEMO MODE • SIMULATED DATA
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SIMULATED_SHIPPING_ROUTES.map((route) => {
          const isCritical = route.riskLevel === "CRITICAL";
          const isHigh = route.riskLevel === "HIGH";

          return (
            <div key={route.id} className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-3.5">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">{route.corridor}</span>
                  <h3 className="text-base font-bold font-heading text-slate-900 mt-0.5">{route.name}</h3>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border shrink-0 ${
                  isCritical
                    ? "bg-rose-50 text-rose-800 border-rose-200"
                    : isHigh
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}>
                  {route.riskLevel}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Transit Time</span>
                  <span className="text-slate-900 font-bold text-sm block mt-0.5">{route.transitTimeDays} Days</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Freight Cost</span>
                  <span className="text-sky-800 font-bold text-sm block mt-0.5">{route.freightCostMultiplier}x</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Volume Share</span>
                  <span className="text-amber-700 font-bold text-sm block mt-0.5">{route.volumeSharePct}%</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Chokepoint Exposure:</span>
                  <p className="text-slate-800 font-mono text-xs mt-0.5">{route.chokepointExposure}</p>
                </div>

                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                  <span className="text-[10px] font-mono text-sky-900 uppercase font-bold block mb-1">
                    Alternative / Bypass Routing:
                  </span>
                  <p className="text-slate-700 text-xs font-sans leading-relaxed">{route.alternativeRoute}</p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Key Discharge Ports:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5 font-mono text-[11px]">
                    {route.keyPorts.map((port, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200 font-medium">
                        {port}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-[10px] font-mono text-slate-500 flex justify-between items-center">
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
