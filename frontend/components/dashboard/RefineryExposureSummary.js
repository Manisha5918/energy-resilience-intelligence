"use client";

import { DatabaseIcon, InfoIcon, ShieldIcon } from "@/components/ui/Icons";

const SIMULATED_REFINERY_DATA = [
  {
    id: "ref-jamnagar",
    name: "Jamnagar Refinery Complex (RIL)",
    location: "Gujarat (West Coast / Gulf of Kutch)",
    capacityMmtpa: 68.2,
    capacityMbd: 1.36,
    exposedCorridor: "Strait of Hormuz (Primary) / Arabian Sea",
    riskLevel: "HIGH",
    crudeBufferDays: 14.5,
    status: "Active - Processing heavy Persian Gulf & Russian grades",
    connectivity: "Direct Marine SBM, Mundra Pipeline linkage"
  },
  {
    id: "ref-vadinar",
    name: "Vadinar Refinery (Nayara Energy)",
    location: "Gujarat (West Coast / Vadinar SPM)",
    capacityMmtpa: 20.0,
    capacityMbd: 0.40,
    exposedCorridor: "Strait of Hormuz / Arabian Sea",
    riskLevel: "HIGH",
    crudeBufferDays: 12.0,
    status: "Active - High sour crude slate",
    connectivity: "Dedicated Vadinar Port deepwater SPM"
  },
  {
    id: "ref-panipat",
    name: "Panipat Refinery (IOCL)",
    location: "Haryana (Northern Inland Grid)",
    capacityMmtpa: 15.0,
    capacityMbd: 0.30,
    exposedCorridor: "Strait of Hormuz (Feeder via Mundra-Panipat Pipeline)",
    riskLevel: "HIGH",
    crudeBufferDays: 9.2,
    status: "Vulnerable - Dependent on continuous 1,400km pipeline feed",
    connectivity: "Salaya-Mathura-Panipat Crude Oil Pipeline (SMPL)"
  },
  {
    id: "ref-kochi",
    name: "Kochi Refinery (BPCL)",
    location: "Kerala (South-West Coast)",
    capacityMmtpa: 15.5,
    capacityMbd: 0.31,
    exposedCorridor: "Red Sea / Bab-el-Mandeb & West Africa",
    riskLevel: "CRITICAL",
    crudeBufferDays: 11.4,
    status: "Exposed - Heavy intake of diverted Red Sea / Suez cargoes",
    connectivity: "Kochi Single Point Mooring (SPM)"
  },
  {
    id: "ref-paradip",
    name: "Paradip Refinery (IOCL)",
    location: "Odisha (East Coast / Bay of Bengal)",
    capacityMmtpa: 15.0,
    capacityMbd: 0.30,
    exposedCorridor: "Cape of Good Hope / Malacca / Red Sea Diversion",
    riskLevel: "MODERATE",
    crudeBufferDays: 16.8,
    status: "High Flexibility - Direct coastal SPM & Phase II SPR linkage",
    connectivity: "Paradip Port SPM, Paradip-Haldia-Barauni Pipeline"
  },
  {
    id: "ref-vizag",
    name: "Visakh Refinery (HPCL)",
    location: "Andhra Pradesh (East Coast)",
    capacityMmtpa: 11.0,
    capacityMbd: 0.22,
    exposedCorridor: "Cape Route & Middle East Feeder",
    riskLevel: "MODERATE",
    crudeBufferDays: 18.0,
    status: "Directly linked to Vizag Underground Rock Cavern SPR",
    connectivity: "HPCL SPM & Visakhapatnam SPR rock cavern bypass"
  }
];

export default function RefineryExposureSummary() {
  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 space-y-5 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Refinery Node Exposure & Pipeline Dependency
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              NATIONAL REFINING INFRASTRUCTURE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluates individual refinery exposure to maritime chokepoints and crude tankage buffer reserves.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-600 font-medium">
          TOTAL CAPACITY: <span className="text-sky-800 font-bold">~5.2 MBD (~255 MMTPA)</span>
        </div>
      </div>

      {/* Grid of Refineries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SIMULATED_REFINERY_DATA.map((refinery) => {
          const isCritical = refinery.riskLevel === "CRITICAL";
          const isHigh = refinery.riskLevel === "HIGH";

          return (
            <div
              key={refinery.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900 font-heading">
                    {refinery.name}
                  </h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border shrink-0 ${
                    isCritical
                      ? "bg-rose-50 text-rose-800 border-rose-200"
                      : isHigh
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200"
                  }`}>
                    {refinery.riskLevel}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-sans">
                  {refinery.location}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Throughput</span>
                  <span className="text-slate-900 font-bold text-sm block mt-0.5">{refinery.capacityMbd} MBD</span>
                  <span className="text-[10px] text-slate-500 block">({refinery.capacityMmtpa} MMTPA)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Crude Buffer</span>
                  <span className={`font-bold text-sm block mt-0.5 ${refinery.crudeBufferDays < 10 ? "text-amber-700" : "text-emerald-700"}`}>
                    {refinery.crudeBufferDays} Days
                  </span>
                  <span className="text-[10px] text-slate-500 block">Onsite / Pipe</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="text-xs font-mono">
                  <span className="text-slate-500 font-semibold">Exposed Corridor:</span>{" "}
                  <span className="text-slate-800 font-medium">{refinery.exposedCorridor}</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed font-sans">
                  {refinery.status}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-500 flex justify-between items-center">
                <span className="truncate">{refinery.connectivity}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-[10px] font-mono text-slate-400 text-right pt-1 font-medium">
        [SIMULATED REFINERY NETWORK & CRUDE RUN METRICS]
      </div>

    </div>
  );
}
