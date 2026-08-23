"use client";

export default function TickerMarquee() {
  const tickerItems = [
    { label: "DATA PROVENANCE RIGOR", value: "75 AUDITED PARAMETERS", status: "VERIFIED", dotColor: "bg-emerald-500", valColor: "text-[#0B2540]" },
    { label: "SYSTEM RESILIENCE", value: "36 / 100 [CRITICAL]", status: "DERIVED", dotColor: "bg-rose-500", valColor: "text-rose-600" },
    { label: "REFINING NETWORK", value: "JAMNAGAR • VADINAR • PANIPAT • KOCHI • PARADIP • VISAKH", status: "OFFICIAL", dotColor: "bg-[#0284c7]", valColor: "text-[#0B2540]" },
    { label: "PROCUREMENT SAFEGUARD", value: "NON-EXECUTABLE DECISION SUPPORT", status: "RESTRICTED", dotColor: "bg-rose-500", valColor: "text-[#0B2540]" },
    { label: "MACRO FISCAL SHIELD", value: "GDP DRAG & CAD EXPOSURE", status: "MODEL", dotColor: "bg-amber-500", valColor: "text-[#0B2540]" },
    { label: "IMPORT DEPENDENCY", value: "89.1% (4.83 MBD)", status: "OFFICIAL", dotColor: "bg-[#0284c7]", valColor: "text-[#0B2540]" },
    { label: "ISPRL PHASE-I CAPACITY", value: "5.33 MMT (39.18 MBBL)", status: "OFFICIAL", dotColor: "bg-emerald-500", valColor: "text-emerald-700" },
    { label: "HORMUZ CHOKEPOINT SHARE", value: "58.4% TRANSIT", status: "MODEL", dotColor: "bg-amber-500", valColor: "text-amber-700" }
  ];

  return (
    <div 
      className="w-full h-11 sm:h-12 overflow-hidden bg-[#EFF8FF] border border-[#B9DDF5] rounded-xl shadow-xs flex items-center select-none marquee-container"
      aria-label="Running Intelligence Status Ticker"
    >
      <div className="animate-marquee-left flex items-center gap-6 sm:gap-8 px-4 text-xs font-mono">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 shrink-0 whitespace-nowrap">
            <span className={`w-2 h-2 rounded-full ${item.dotColor} shrink-0`} />
            <span className="text-[#0B2540] uppercase text-[11px] font-bold tracking-wider">
              {item.label}:
            </span>
            <span className={`${item.valColor} font-extrabold tracking-tight text-xs`}>
              {item.value}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#E1F0FA] border border-[#B9DDF5] text-[#007EA7] font-semibold">
              {item.status}
            </span>
            <span className="text-[#96C2E2] ml-4 font-bold">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
