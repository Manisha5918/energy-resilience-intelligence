"use client";

import { useState } from "react";
import { AnchorIcon, AlertTriangleIcon, NavigationIcon, InfoIcon, GlobeIcon } from "@/components/ui/Icons";
import { SIMULATED_CORRIDOR_METRICS } from "@/lib/riskData";
import SpatialGlobe from "@/components/ui/SpatialGlobe";

export default function CorridorRiskMap() {
  const [selectedCorridorId, setSelectedCorridorId] = useState("hormuz");
  const [viewMode, setViewMode] = useState("3d"); // "3d" or "2d"

  const selectedCorridor = SIMULATED_CORRIDOR_METRICS.find(
    (c) => c.id === selectedCorridorId
  ) || SIMULATED_CORRIDOR_METRICS[0];

  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 space-y-5 bg-white shadow-sm">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <NavigationIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Critical Maritime Corridors & Supply Network
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              TACTICAL DIGITAL TWIN
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Interactive routing network mapping crude flows from global production hubs to Indian refinery terminals.
          </p>
        </div>

        {/* View Mode Toggle (3D Globe vs 2D Schematic) */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-slate-100 border border-slate-200 p-0.5 rounded-lg">
            <button
              onClick={() => setViewMode("3d")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "3d"
                  ? "bg-white text-sky-800 shadow-sm border border-slate-200 font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GlobeIcon className="w-3.5 h-3.5 text-sky-600" />
              <span>3D Spatial</span>
            </button>
            <button
              onClick={() => setViewMode("2d")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "2d"
                  ? "bg-white text-sky-800 shadow-sm border border-slate-200 font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <NavigationIcon className="w-3.5 h-3.5 text-sky-600" />
              <span>2D Grid</span>
            </button>
          </div>

          {/* Corridor Quick Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {SIMULATED_CORRIDOR_METRICS.map((corridor) => {
              const isSelected = corridor.id === selectedCorridorId;
              const isCritical = corridor.riskLevel === "CRITICAL";
              const isHigh = corridor.riskLevel === "HIGH";

              return (
                <button
                  key={corridor.id}
                  onClick={() => setSelectedCorridorId(corridor.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-sky-50 border border-sky-300 text-sky-900 shadow-xs font-bold"
                      : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className="mr-1.5">
                    {isCritical ? "🔴" : isHigh ? "🟡" : "🟢"}
                  </span>
                  {corridor.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Visual: Tactical SVG Supply Chain Network OR 3D Spatial Globe */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        
        {/* Network Canvas (3D or 2D) */}
        <div className="lg:col-span-7 bg-[#070b14] rounded-xl border border-slate-800/90 p-4 relative overflow-hidden flex items-center justify-center min-h-[300px]">
          {viewMode === "3d" ? (
            <SpatialGlobe activeCorridor={selectedCorridorId} height={340} />
          ) : (
            <>
              {/* Subtle Radar sweep background grid */}
              <div className="absolute inset-0 tactical-grid-bg opacity-30 pointer-events-none"></div>

              <svg 
                viewBox="0 0 700 360" 
                className="w-full h-auto max-h-[340px] select-none"
              >
            <defs>
              <linearGradient id="hormuzGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="redseaGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="capeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* ROUTE 1: Strait of Hormuz to Indian West Coast */}
            <path
              d="M 120 120 Q 260 110 490 170"
              fill="none"
              stroke={selectedCorridorId === "hormuz" ? "#f59e0b" : "#475569"}
              strokeWidth={selectedCorridorId === "hormuz" ? "3.5" : "1.5"}
              strokeDasharray={selectedCorridorId === "hormuz" ? "6,4" : "none"}
              className={selectedCorridorId === "hormuz" ? "animate-pulse" : ""}
              filter={selectedCorridorId === "hormuz" ? "url(#glow)" : "none"}
            />

            {/* ROUTE 2: Red Sea / Bab-el-Mandeb to India */}
            <path
              d="M 80 190 Q 230 240 480 200"
              fill="none"
              stroke={selectedCorridorId === "redsea" ? "#f43f5e" : "#475569"}
              strokeWidth={selectedCorridorId === "redsea" ? "3.5" : "1.5"}
              strokeDasharray={selectedCorridorId === "redsea" ? "6,4" : "none"}
              className={selectedCorridorId === "redsea" ? "animate-pulse" : ""}
              filter={selectedCorridorId === "redsea" ? "url(#glow)" : "none"}
            />

            {/* ROUTE 3: Cape of Good Hope Diversion */}
            <path
              d="M 60 300 Q 260 340 500 240"
              fill="none"
              stroke={selectedCorridorId === "cape_route" ? "#10b981" : "#475569"}
              strokeWidth={selectedCorridorId === "cape_route" ? "3" : "1.5"}
              strokeDasharray={selectedCorridorId === "cape_route" ? "6,4" : "none"}
              className={selectedCorridorId === "cape_route" ? "animate-pulse" : ""}
            />

            {/* ROUTE 4: Intercoastal Arabian Sea to East Coast Ports */}
            <path
              d="M 490 170 Q 560 210 570 200"
              fill="none"
              stroke={selectedCorridorId === "arabian_sea" ? "#06b6d4" : "#334155"}
              strokeWidth={selectedCorridorId === "arabian_sea" ? "3" : "1"}
            />

            {/* --- NODES: Origins (Left) --- */}
            {/* Persian Gulf */}
            <g 
              className="cursor-pointer" 
              onClick={() => setSelectedCorridorId("hormuz")}
            >
              <circle cx="120" cy="120" r="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="120" cy="120" r="5" fill="#f59e0b" className="animate-ping opacity-60" />
              <circle cx="120" cy="120" r="5" fill="#f59e0b" />
              <text x="120" y="96" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                PERSIAN GULF
              </text>
              <text x="120" y="148" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">
                (Iraq, Saudi, UAE, KW)
              </text>
            </g>

            {/* Red Sea / Bab-el-Mandeb */}
            <g 
              className="cursor-pointer" 
              onClick={() => setSelectedCorridorId("redsea")}
            >
              <circle cx="80" cy="190" r="13" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
              <circle cx="80" cy="190" r="5" fill="#f43f5e" className="animate-ping opacity-60" />
              <circle cx="80" cy="190" r="5" fill="#f43f5e" />
              <text x="80" y="168" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                BAB-EL-MANDEB
              </text>
              <text x="80" y="218" fill="#f43f5e" fontSize="8" textAnchor="middle" fontFamily="monospace">
                (Red Sea Conflict Zone)
              </text>
            </g>

            {/* Cape Route / Atlantic */}
            <g 
              className="cursor-pointer" 
              onClick={() => setSelectedCorridorId("cape_route")}
            >
              <circle cx="60" cy="300" r="12" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <circle cx="60" cy="300" r="4" fill="#10b981" />
              <text x="60" y="280" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                CAPE ROUTE
              </text>
              <text x="60" y="325" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">
                (West Africa / US / Baltic)
              </text>
            </g>

            {/* CHOKEPOINT MARKER: Strait of Hormuz */}
            <g className="cursor-pointer" onClick={() => setSelectedCorridorId("hormuz")}>
              <rect x="250" y="115" width="80" height="24" rx="4" fill="#090d16" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="290" y="131" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                ⚠️ HORMUZ (39km)
              </text>
            </g>

            {/* --- NODES: Indian Destination Terminals (Right) --- */}
            {/* West Coast Ports */}
            <g>
              <rect x="470" y="130" width="100" height="60" rx="6" fill="#0b1322" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="520" y="146" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                WEST COAST PORTS
              </text>
              <text x="520" y="160" fill="#cbd5e1" fontSize="8" textAnchor="middle" fontFamily="sans-serif">
                Mundra • Vadinar • Sikka
              </text>
              <text x="520" y="174" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">
                Refineries: Jamnagar / Panipat
              </text>
            </g>

            {/* Southern & East Coast Ports */}
            <g>
              <rect x="470" y="210" width="100" height="60" rx="6" fill="#0b1322" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="520" y="226" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                SOUTH & EAST PORTS
              </text>
              <text x="520" y="240" fill="#cbd5e1" fontSize="8" textAnchor="middle" fontFamily="sans-serif">
                Kochi • Mangalore • Vizag
              </text>
              <text x="520" y="254" fill="#10b981" fontSize="8" textAnchor="middle" fontFamily="sans-serif">
                SPR: Padur • Vizag • Mangalore
              </text>
            </g>

            {/* Legend / Info */}
            <text x="350" y="345" fill="#64748b" fontSize="9" textAnchor="middle" fontFamily="monospace">
              [Click any corridor or node to inspect risk telemetry]
            </text>
          </svg>
          </>
          )}

        </div>

        {/* Selected Corridor Telemetry Card (3-Layer Progressive Disclosure) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm">
          
          {/* LEVEL 1: Always Visible Summary */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Corridor Intelligence
              </span>
              <h4 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2 mt-0.5">
                {selectedCorridor.name}
              </h4>
            </div>
            <span className={`text-xs font-mono px-2.5 py-1 rounded-lg font-bold border ${
              selectedCorridor.riskLevel === "CRITICAL"
                ? "bg-rose-50 text-rose-800 border-rose-200"
                : selectedCorridor.riskLevel === "HIGH"
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
            }`}>
              {selectedCorridor.riskScore} / 100 ({selectedCorridor.riskLevel} RISK)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">National Import Share</span>
              <div className="text-xl font-bold text-sky-700 mt-0.5">{selectedCorridor.shareOfImports}%</div>
              <span className="text-[11px] text-slate-600 font-medium block mt-0.5">{selectedCorridor.volumeMbd} MBD import flow</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Transit Duration</span>
              <div className="text-xl font-bold text-slate-900 mt-0.5">{selectedCorridor.transitDaysAvg}</div>
              <span className="text-[11px] text-slate-600 font-medium block mt-0.5">{selectedCorridor.freightIndex}</span>
            </div>
          </div>

          {/* LEVEL 2: Expandable Risk Drivers */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100/80 cursor-pointer font-mono text-xs font-semibold text-slate-700 select-none">
                <span className="flex items-center gap-1.5">
                  <AlertTriangleIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span>Primary Risk Drivers ({selectedCorridor.primaryRiskDrivers.length})</span>
                </span>
                <span className="text-[11px] text-slate-500 font-normal">Click to toggle</span>
              </summary>
              <div className="p-3 bg-white space-y-2 border-t border-slate-200">
                <div className="flex flex-wrap gap-1.5">
                  {selectedCorridor.primaryRiskDrivers.map((driver, idx) => (
                    <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                      {driver}
                    </span>
                  ))}
                </div>
              </div>
            </details>
          </div>

          {/* LEVEL 3: Expandable Analyst Deep Dive / Technical Details */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100/80 cursor-pointer font-mono text-xs font-semibold text-slate-700 select-none">
                <span className="flex items-center gap-1.5">
                  <InfoIcon className="w-3.5 h-3.5 text-sky-600" />
                  <span>Technical & Refinery Linkages</span>
                </span>
                <span className="text-[11px] text-slate-500 font-normal">Analyst detail</span>
              </summary>
              <div className="p-3 bg-white space-y-3 border-t border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold block">
                    Dependent Refineries & Terminals
                  </span>
                  <p className="text-xs text-slate-700 mt-1 font-sans leading-relaxed">
                    {selectedCorridor.dependentRefineries.join(" • ")}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-sky-50/70 border border-sky-200">
                  <span className="text-[10px] font-mono text-sky-900 uppercase font-bold block mb-1">
                    Strategic Fallback / Bypass Corridor
                  </span>
                  <p className="text-xs text-slate-700 font-sans leading-relaxed">
                    {selectedCorridor.alternativeRoute}
                  </p>
                </div>

                <div className="text-[10px] font-mono text-slate-500 flex justify-between pt-1 border-t border-slate-100">
                  <span>Data Source: PPAC / DGCIS Verified</span>
                  <span className="font-semibold text-sky-700">[MODELLED TELEMETRY]</span>
                </div>
              </div>
            </details>
          </div>

        </div>

      </div>

    </div>
  );
}
