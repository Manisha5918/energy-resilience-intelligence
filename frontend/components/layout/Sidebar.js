"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldIcon, 
  GlobeIcon, 
  NavigationIcon, 
  AlertTriangleIcon, 
  SlidersIcon, 
  DatabaseIcon, 
  AnchorIcon,
  ChevronRightIcon,
  ActivityIcon
} from "@/components/ui/Icons";

const NAV_ITEMS = [
  {
    label: "Executive Dashboard",
    href: "/",
    icon: ShieldIcon,
    badge: "Active",
    badgeColor: "bg-cyan-950 text-cyan-400 border-cyan-800",
    description: "Main resilience overview & metrics"
  },
  {
    label: "Geopolitical Intelligence",
    href: "/intelligence",
    icon: GlobeIcon,
    badge: "Live Mock",
    badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
    description: "Chokepoint & regional threat feed"
  },
  {
    label: "Maritime Routes",
    href: "/routes",
    icon: NavigationIcon,
    badge: "4 Corridors",
    badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
    description: "Hormuz, Red Sea & Cape analysis"
  },
  {
    label: "Risk Alert Center",
    href: "/alerts",
    icon: AlertTriangleIcon,
    badge: "5 Alerts",
    badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
    description: "Critical & High priority warnings"
  },
  {
    label: "Disruption Scenarios",
    href: "/scenarios",
    icon: SlidersIcon,
    badge: "Simulator",
    badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
    description: "Simulate Hormuz / Red Sea blockages"
  },
  {
    label: "Adaptive Procurement",
    href: "/procurement",
    icon: ShieldIcon,
    badge: "Orchestrator",
    badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
    description: "Ranked resilience-adjusted sourcing"
  },
  {
    label: "Supply Chain Twin",
    href: "/digital-twin",
    icon: ActivityIcon,
    badge: "Digital Twin",
    badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
    description: "Topological graph & network flows"
  },
  {
    label: "Strategic Reserves (SPR)",
    href: "/reserves",
    icon: DatabaseIcon,
    badge: "9.5 Days",
    badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
    description: "Vizag, Mangalore, Padur inventory"
  },
  {
    label: "Data Quality Center",
    href: "/data-center",
    icon: DatabaseIcon,
    badge: "Provenance",
    badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
    description: "Provider health, freshness & audit trail"
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800/80 bg-[#090d15]/90 hidden md:flex flex-col justify-between p-4">
      <div className="space-y-6">
        
        {/* Section Header */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 px-3 mb-2 font-semibold">
            Command Modules
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-cyan-950/40 text-cyan-300 border border-cyan-700/50 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border text-[9px] ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Tactical Status Snapshot */}
        <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] uppercase tracking-wider text-slate-500">Chokepoint Alert</span>
            <span className="text-[10px] text-amber-400 font-bold">HORMUZ ELEVATED</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-amber-500 h-1.5 rounded-full w-[78%] animate-pulse"></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
            58.4% of imports vulnerable to single chokepoint transit disruption.
          </p>
        </div>

      </div>

      {/* Safety Notice Footer */}
      <div className="pt-4 border-t border-slate-800/80">
        <div className="text-[10px] text-slate-500 font-mono flex items-start gap-1.5">
          <AnchorIcon className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>India Strategic Energy Architecture Prototype</span>
        </div>
      </div>
    </aside>
  );
}
