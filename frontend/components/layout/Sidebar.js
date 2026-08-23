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
  ActivityIcon 
} from "@/components/ui/Icons";

const NAV_GROUPS = [
  {
    groupTitle: "MONITORING",
    items: [
      {
        label: "Executive Dashboard",
        shortLabel: "Executive Dashboard",
        fullTitle: "National Resilience Cockpit & Executive Decision Briefing",
        href: "/",
        icon: ShieldIcon,
        badge: "Active",
      },
      {
        label: "Geopolitical Intel",
        shortLabel: "Geopolitical Intel",
        fullTitle: "Geopolitical Threat Telemetry & Chokepoint Signal Feeds",
        href: "/intelligence",
        icon: GlobeIcon,
        badge: "Live Mock",
      },
      {
        label: "Risk Alert Center",
        shortLabel: "Risk Alert Center",
        fullTitle: "Active Real-Time Threat Alerts & Incident Log",
        href: "/alerts",
        icon: AlertTriangleIcon,
        badge: "5 Alerts",
      }
    ]
  },
  {
    groupTitle: "SIMULATION",
    items: [
      {
        label: "Maritime Routes",
        shortLabel: "Maritime Routes",
        fullTitle: "Maritime Corridors, Chokepoint Delays & Freight Surcharges",
        href: "/routes",
        icon: NavigationIcon,
        badge: "4 Corridors",
      },
      {
        label: "Disruption Simulator",
        shortLabel: "Disruption Simulator",
        fullTitle: "Stress Simulation Engine & Disruption Variance Matrix",
        href: "/scenarios",
        icon: SlidersIcon,
        badge: "Simulator",
      },
      {
        label: "Supply Chain Twin",
        shortLabel: "Supply Chain Twin",
        fullTitle: "Topological Network Digital Twin & Node Flow Graph",
        href: "/digital-twin",
        icon: ActivityIcon,
        badge: "25 Nodes",
      }
    ]
  },
  {
    groupTitle: "OPERATIONS",
    items: [
      {
        label: "Procurement Orchestrator",
        shortLabel: "Procurement Orchestrator",
        fullTitle: "Adaptive Multi-Sourcing & Contingency Sourcing Rebalancer",
        href: "/procurement",
        icon: ShieldIcon,
        badge: "Optimizer",
      },
      {
        label: "Strategic Reserves",
        shortLabel: "Strategic Reserves",
        fullTitle: "ISPRL Tri-Cavern Inventory & Commercial Depletion Modeling",
        href: "/reserves",
        icon: DatabaseIcon,
        badge: "8.1 Days",
      },
      {
        label: "Data Quality Center",
        shortLabel: "Data Quality Center",
        fullTitle: "Data Provenance, Quality Scores & Audit Traceability",
        href: "/data-center",
        icon: DatabaseIcon,
        badge: "4 Datasets",
      }
    ]
  }
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside 
        className={`fixed inset-y-0 left-0 z-45 w-[280px] shrink-0 border-r border-[#D8E8F5] bg-[#F4F9FD] flex flex-col justify-between p-4 shadow-xs md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:z-30 transform transition-transform duration-200 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        aria-label="Platform Sidebar Navigation"
      >
        <div className="space-y-4 overflow-y-auto flex-1 pr-1">
          
          {NAV_GROUPS.map((group, groupIdx) => (
            <div key={group.groupTitle} className={groupIdx > 0 ? "pt-3 border-t border-[#E2EEF8]" : ""}>
              {/* Section Header: Muted Blue-Gray, Uppercase, Letter-Spaced */}
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#627D98] px-3 mb-2 font-bold flex items-center justify-between">
                <span>{group.groupTitle}</span>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1" aria-label={`${group.groupTitle} Navigation`}>
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={item.fullTitle}
                      onClick={onClose}
                      className={`sidebar-nav-item group flex items-center justify-between px-3 py-2.5 min-h-[44px] rounded-xl text-xs transition-all duration-200 ease-out ${
                        isActive
                          ? "bg-[#E6F4FF] text-[#0B3C61] border border-[#8DD3FF] shadow-[0_2px_8px_rgba(2,132,199,0.08)] font-bold"
                          : "text-[#102A43] hover:text-[#0B3C61] hover:bg-[#EEF7FD] border border-transparent font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-1">
                        {/* Unified Blue-Gray/Blue Icon System */}
                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive 
                            ? "text-[#0284C7]" 
                            : "text-[#829AB1] group-hover:text-[#334E68]"
                        }`} />
                        <span className="truncate">{item.shortLabel}</span>
                      </div>

                      {/* Clean Status Badges */}
                      {item.badge && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border shrink-0 font-medium ${
                          isActive 
                            ? "bg-white border-[#BEE3F8] text-[#0B3C61] font-bold shadow-2xs" 
                            : "bg-[#EDF5FB] border-[#D5E4F0] text-[#45627D]"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}

        </div>

        {/* Clean Status & System Footer */}
        <div className="pt-4 border-t border-[#D8E8F5] space-y-2 shrink-0">
          <div className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-[#EDF5FB] border border-[#D8E8F5] text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-[#334E68] font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>SYSTEM READY</span>
            </div>
            <span className="text-[10px] text-[#627D98] font-semibold">SOVEREIGN</span>
          </div>

          <div className="text-[10px] text-[#829AB1] font-mono px-2 flex items-center justify-between">
            <span>India Energy Resilience</span>
            <span>PPAC Verified</span>
          </div>
        </div>
      </aside>
    </>
  );
}
