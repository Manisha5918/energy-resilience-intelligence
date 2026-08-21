import AlertCenterFeed from "@/components/dashboard/AlertCenterFeed";
import { AlertTriangleIcon } from "@/components/ui/Icons";

export const metadata = {
  title: "Risk Alert Center | EnergyShield",
  description: "Continuous real-time threat detection and mitigation advisories.",
};

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-xl bg-[#0b121e] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-700/60 text-amber-400">
            <AlertTriangleIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-mono text-white">Risk Alert Center</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300">
                ACTIVE MONITORING
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Priority threat notifications, chokepoint incidents, and actionable mitigation guidance.
            </p>
          </div>
        </div>

        <div className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-800/60">
          DEMO MODE • SIMULATED ALERTS
        </div>
      </div>

      {/* Main Alert Feed Component */}
      <AlertCenterFeed />

    </div>
  );
}
