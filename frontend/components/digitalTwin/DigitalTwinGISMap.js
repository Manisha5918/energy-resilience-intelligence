"use client";

import { useState } from "react";
import { getGISNodes, getGISRoutes } from "@/lib/data/schemas/routeSchema";
import { 
  GlobeIcon, 
  AlertTriangleIcon
} from "@/components/ui/Icons";

export default function DigitalTwinGISMap({
  selectedNodeId,
  onSelectNode
}) {
  const [filterType, setFilterType] = useState("ALL"); // ALL | SUPPLIERS | CHOKEPOINTS | PORTS | REFINERIES | RESERVES
  const [showMaritime, setShowMaritime] = useState(true);
  const [showPipelines, setShowPipelines] = useState(true);
  const [showChokepoints, setShowChokepoints] = useState(true);
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const rawNodes = getGISNodes();
  const rawRoutes = getGISRoutes();

  // Filter nodes based on active selection
  const filteredNodes = rawNodes.filter((node) => {
    if (filterType === "ALL") return true;
    if (filterType === "SUPPLIERS") return node.type === "supplier";
    if (filterType === "CHOKEPOINTS") return node.type === "chokepoint";
    if (filterType === "PORTS") return node.type === "port";
    if (filterType === "REFINERIES") return node.type === "refinery";
    if (filterType === "RESERVES") return node.type === "reserve";
    return true;
  });

  const activeNode = rawNodes.find(n => n.id === selectedNodeId) || filteredNodes[0];
  const activeRoute = rawRoutes.find(r => r.id === selectedRouteId);

  // Readability-optimized layout coordinates map (SVG viewBox 0 0 1000 550)
  // Ensures ample horizontal/vertical separation between Indo-Gulf nodes
  const CUSTOM_COORDS = {
    "geo-houston": { x: 120, y: 310, labelAnchor: "start", labelDx: 12, labelDy: 4 },
    "geo-santos": { x: 260, y: 440, labelAnchor: "start", labelDx: 12, labelDy: 4 },
    "geo-choke-cape": { x: 440, y: 480, labelAnchor: "middle", labelDx: 0, labelDy: 18 },
    "geo-primorsk": { x: 480, y: 90, labelAnchor: "start", labelDx: 12, labelDy: 4 },
    "geo-choke-bab": { x: 460, y: 330, labelAnchor: "end", labelDx: -12, labelDy: 4 },
    "geo-basra": { x: 490, y: 190, labelAnchor: "end", labelDx: -12, labelDy: 4 },
    "geo-ras-tanura": { x: 510, y: 235, labelAnchor: "end", labelDx: -12, labelDy: 4 },
    "geo-choke-hormuz": { x: 555, y: 255, labelAnchor: "middle", labelDx: 0, labelDy: -14 },
    "geo-fujairah": { x: 585, y: 275, labelAnchor: "start", labelDx: 12, labelDy: 4 },
    "geo-ref-panipat": { x: 740, y: 160, labelAnchor: "middle", labelDx: 0, labelDy: -14 },
    "geo-port-mundra": { x: 670, y: 215, labelAnchor: "end", labelDx: -10, labelDy: 4 },
    "geo-port-vadinar": { x: 670, y: 245, labelAnchor: "end", labelDx: -10, labelDy: 4 },
    "geo-ref-jamnagar": { x: 670, y: 275, labelAnchor: "end", labelDx: -10, labelDy: 4 },
    "geo-ref-vadinar": { x: 670, y: 305, labelAnchor: "end", labelDx: -10, labelDy: 4 },
    "geo-port-mumbai": { x: 700, y: 335, labelAnchor: "end", labelDx: -10, labelDy: 4 },
    "geo-ref-mumbai": { x: 700, y: 365, labelAnchor: "end", labelDx: -10, labelDy: 4 },
    "geo-port-mangalore": { x: 720, y: 395, labelAnchor: "end", labelDx: -10, labelDy: 4 },
    "geo-spr-padur": { x: 720, y: 420, labelAnchor: "end", labelDx: -10, labelDy: 4 },
    "geo-spr-mangalore": { x: 720, y: 445, labelAnchor: "end", labelDx: -10, labelDy: 4 },
    "geo-port-kochi": { x: 730, y: 475, labelAnchor: "end", labelDx: -10, labelDy: 4 },
    "geo-ref-kochi": { x: 730, y: 500, labelAnchor: "end", labelDx: -10, labelDy: 4 },
    "geo-port-visakh": { x: 820, y: 330, labelAnchor: "start", labelDx: 12, labelDy: 4 },
    "geo-spr-visakh": { x: 820, y: 355, labelAnchor: "start", labelDx: 12, labelDy: 4 },
    "geo-port-paradip": { x: 860, y: 260, labelAnchor: "start", labelDx: 12, labelDy: 4 },
    "geo-ref-paradip": { x: 860, y: 285, labelAnchor: "start", labelDx: 12, labelDy: 4 },
    "geo-choke-malacca": { x: 920, y: 420, labelAnchor: "start", labelDx: 12, labelDy: 4 }
  };

  const projectNode = (node) => {
    if (CUSTOM_COORDS[node.id]) {
      return CUSTOM_COORDS[node.id];
    }
    const minLng = -105;
    const maxLng = 115;
    const minLat = -40;
    const maxLat = 65;
    const x = ((node.lng - minLng) / (maxLng - minLng)) * 960 + 20;
    const y = ((maxLat - node.lat) / (maxLat - minLat)) * 500 + 25;
    return { x: Math.max(20, Math.min(980, x)), y: Math.max(20, Math.min(530, y)), labelAnchor: "start", labelDx: 10, labelDy: 4 };
  };

  return (
    <div className="rounded-2xl p-5 sm:p-6 border border-[#D5E5F1] bg-[#F8FBFE] space-y-4 shadow-xs">
      
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D5E5F1] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-bold text-[#0B2540] font-mono tracking-tight">
              Geospatial Energy Grid &amp; Maritime AIS Simulator
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] font-bold">
              GIS GEODETIC VIEW
            </span>
          </div>
          <p className="text-xs text-[#526B82] mt-1 font-sans">
            Georeferenced spatial tracking of global loading basins, chokepoints, Indian crude ports, pipelines, and ISPRL cavern complexes.
          </p>
        </div>

        {/* Infrastructure Layer Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "ALL", label: "All Layers" },
            { id: "SUPPLIERS", label: "Crude Basins" },
            { id: "CHOKEPOINTS", label: "Chokepoints" },
            { id: "PORTS", label: "Import Ports" },
            { id: "REFINERIES", label: "Refineries" },
            { id: "RESERVES", label: "SPR Caverns" }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilterType(btn.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer min-h-[34px] ${
                filterType === btn.id
                  ? "bg-[#0284c7] text-white border border-[#0284c7] font-bold shadow-xs"
                  : "bg-white text-[#0B2540] border border-[#D5E5F1] hover:bg-[#EEF7FD] font-medium"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mandatory Demo Data Notice (High Contrast Light Amber) */}
      <div className="rounded-xl p-3.5 bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-2.5 text-xs font-mono text-[#92400E]">
        <AlertTriangleIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          <strong className="font-bold">SIMULATED AIS / NO LIVE FEED CONNECTED:</strong> Facility geodetic positions reflect public port registers. Maritime vessel tracks and routing flow densities are synthetic decision-support simulations, not live satellite AIS observations.
        </span>
      </div>

      {/* Layer Visibility Toggles */}
      <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-[#0B2540] font-medium px-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showMaritime}
            onChange={(e) => setShowMaritime(e.target.checked)}
            className="accent-[#0284c7] cursor-pointer w-4 h-4"
          />
          <span>Maritime Arterial Routes</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showPipelines}
            onChange={(e) => setShowPipelines(e.target.checked)}
            className="accent-[#0284c7] cursor-pointer w-4 h-4"
          />
          <span>Domestic &amp; Bypass Pipelines</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showChokepoints}
            onChange={(e) => setShowChokepoints(e.target.checked)}
            className="accent-[#0284c7] cursor-pointer w-4 h-4"
          />
          <span>Strategic Chokepoints</span>
        </label>
      </div>

      {/* Interactive GIS SVG Canvas (High Contrast Dark Navy Map) */}
      <div className="relative rounded-2xl overflow-hidden border border-[#1E293B] bg-[#07111F] shadow-lg p-2">
        <svg
          viewBox="0 0 1000 550"
          className="w-full h-auto max-h-[540px] select-none"
        >
          <defs>
            {/* Glow filters */}
            <filter id="gis-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="grad-gis-ocean" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#07111F" />
              <stop offset="100%" stopColor="#040914" />
            </linearGradient>
          </defs>

          {/* Ocean Background Grid */}
          <rect width="1000" height="550" fill="url(#grad-gis-ocean)" />
          
          {/* Latitude & Longitude Reference Grid Lines */}
          {[100, 200, 300, 400, 500].map(y => (
            <line key={`lat-${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="#0F243E" strokeDasharray="3 6" />
          ))}
          {[200, 400, 600, 800].map(x => (
            <line key={`lng-${x}`} x1={x} y1="0" x2={x} y2="550" stroke="#0F243E" strokeDasharray="3 6" />
          ))}

          {/* Stylized Regional Landmass Contours */}
          {/* Indian Subcontinent */}
          <path
            d="M 660 180 L 740 180 L 790 220 L 870 260 L 830 350 L 760 480 L 720 460 L 680 340 L 660 260 Z"
            fill="#0C1D33"
            stroke="#1B385D"
            strokeWidth="1.5"
            opacity="0.8"
          />
          {/* Arabian Peninsula */}
          <path
            d="M 480 180 L 560 190 L 590 270 L 540 330 L 460 330 L 470 230 Z"
            fill="#0C1D33"
            stroke="#1B385D"
            strokeWidth="1.5"
            opacity="0.8"
          />
          {/* Africa */}
          <path
            d="M 420 190 L 460 210 L 460 330 L 480 440 L 440 510 L 380 440 L 370 280 L 390 210 Z"
            fill="#0C1D33"
            stroke="#1B385D"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* Maritime Routes */}
          {showMaritime && rawRoutes.filter(r => r.type === "maritime").map((route) => {
            const isSelected = selectedRouteId === route.id;
            const points = route.coordinates.map(coord => {
              const matchedNode = rawNodes.find(n => Math.abs(n.lat - coord[0]) < 0.2 && Math.abs(n.lng - coord[1]) < 0.2);
              if (matchedNode && CUSTOM_COORDS[matchedNode.id]) {
                return CUSTOM_COORDS[matchedNode.id];
              }
              const minLng = -105;
              const maxLng = 115;
              const minLat = -40;
              const maxLat = 65;
              return {
                x: ((coord[1] - minLng) / (maxLng - minLng)) * 960 + 20,
                y: ((maxLat - coord[0]) / (maxLat - minLat)) * 500 + 25
              };
            });
            const pathData = points.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y}`, "");
            const strokeColor = route.riskScore >= 80 ? "#f43f5e" : route.riskScore >= 50 ? "#f59e0b" : "#10b981";

            return (
              <g key={route.id} onClick={() => setSelectedRouteId(route.id)} className="cursor-pointer">
                <path
                  d={pathData}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isSelected ? "3.5" : "1.8"}
                  strokeDasharray={route.status.includes("HIGH") ? "4 4" : "none"}
                  opacity={isSelected ? "1.0" : "0.75"}
                  className="hover:stroke-white transition-all"
                />
              </g>
            );
          })}

          {/* Domestic & Bypass Pipelines */}
          {showPipelines && rawRoutes.filter(r => r.type === "pipeline").map((route) => {
            const isSelected = selectedRouteId === route.id;
            const points = route.coordinates.map(coord => {
              const matchedNode = rawNodes.find(n => Math.abs(n.lat - coord[0]) < 0.2 && Math.abs(n.lng - coord[1]) < 0.2);
              if (matchedNode && CUSTOM_COORDS[matchedNode.id]) {
                return CUSTOM_COORDS[matchedNode.id];
              }
              const minLng = -105;
              const maxLng = 115;
              const minLat = -40;
              const maxLat = 65;
              return {
                x: ((coord[1] - minLng) / (maxLng - minLng)) * 960 + 20,
                y: ((maxLat - coord[0]) / (maxLat - minLat)) * 500 + 25
              };
            });
            const pathData = points.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y}`, "");

            return (
              <g key={route.id} onClick={() => setSelectedRouteId(route.id)} className="cursor-pointer">
                <path
                  d={pathData}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth={isSelected ? "3.5" : "2"}
                  strokeDasharray="6 3"
                  opacity="0.9"
                  className="hover:stroke-white transition-all"
                />
              </g>
            );
          })}

          {/* Node Elements & High-Contrast Pill Labels */}
          {filteredNodes.map((node) => {
            const pos = projectNode(node);
            const isSelected = selectedNodeId === node.id;

            let nodeColor = "#38bdf8"; // Default cyan
            let nodeRadius = 6;

            if (node.type === "supplier") {
              nodeColor = "#818cf8"; // Indigo
              nodeRadius = 7;
            } else if (node.type === "chokepoint") {
              nodeColor = node.riskScore >= 80 ? "#f43f5e" : "#fbbf24";
              nodeRadius = 8;
            } else if (node.type === "port") {
              nodeColor = "#34d399"; // Emerald
              nodeRadius = 6;
            } else if (node.type === "refinery") {
              nodeColor = "#fb923c"; // Orange
              nodeRadius = 7;
            } else if (node.type === "reserve") {
              nodeColor = "#c084fc"; // Purple
              nodeRadius = 7;
            }

            const labelX = pos.x + (pos.labelDx || 10);
            const labelY = pos.y + (pos.labelDy || 4);
            const anchor = pos.labelAnchor || "start";

            return (
              <g
                key={node.id}
                onClick={() => onSelectNode(node.id)}
                className="cursor-pointer group"
              >
                {/* Ping ring for selected or high risk */}
                {(isSelected || node.riskScore >= 80) && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={nodeRadius + 6}
                    fill="none"
                    stroke={nodeColor}
                    strokeWidth="1.5"
                    opacity="0.5"
                    className="animate-ping"
                  />
                )}

                {/* Node Circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeRadius}
                  fill={nodeColor}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? "2.5" : "1.2"}
                  filter={isSelected ? "url(#gis-glow-cyan)" : undefined}
                />

                {/* Leader line to node if displaced */}
                {Math.abs(pos.labelDx || 0) > 15 && (
                  <line
                    x1={pos.x}
                    y1={pos.y}
                    x2={labelX}
                    y2={labelY}
                    stroke="#475569"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {/* High-Legibility Label Text */}
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={anchor}
                  fill={isSelected ? "#00C7E8" : "#F8FAFC"}
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight={isSelected ? "bold" : "600"}
                  className="pointer-events-none drop-shadow-md group-hover:fill-white"
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Map Legend */}
        <div className="absolute bottom-4 left-4 p-3.5 rounded-xl bg-[#07111F]/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-slate-200 space-y-1.5 pointer-events-none shadow-lg">
          <span className="font-bold text-white uppercase block border-b border-slate-700 pb-1">Map Legend</span>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /> Crude Basins</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Critical Chokepoints</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Discharge Ports</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> Refineries</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> ISPRL Caverns</div>
        </div>
      </div>

      {/* Selected Node / Route Detail Inspection Drawer */}
      {activeNode && (
        <div className="p-4 rounded-xl bg-white border border-[#D5E5F1] space-y-2.5 shadow-xs">
          <div className="flex items-start justify-between border-b border-[#D5E5F1] pb-2.5">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold font-mono text-[#0B2540]">{activeNode.name}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EFF8FF] border border-[#B9DDF5] text-[#0C2340] uppercase font-bold">
                  {activeNode.type}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  activeNode.riskScore >= 80 ? "bg-rose-50 text-rose-700 border border-rose-200" :
                  activeNode.riskScore >= 50 ? "bg-amber-50 text-amber-800 border border-amber-200" :
                  "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}>
                  RISK: {activeNode.riskScore}/100 ({activeNode.status})
                </span>
              </div>
              <p className="text-xs text-[#526B82] mt-1 font-mono">
                Coordinates: {activeNode.lat.toFixed(4)}° N, {activeNode.lng.toFixed(4)}° E | Source: {activeNode.sourceStatus}
              </p>
            </div>

            <div className="text-right font-mono text-xs">
              <span className="text-[#526B82] block text-[10px] font-bold">CURRENT FLOW:</span>
              <span className="font-bold text-[#0284c7] text-sm">
                {activeNode.currentFlowMBD ? `${activeNode.currentFlowMBD} MBD` : activeNode.capacityMBD ? `${activeNode.capacityMBD} MBD (Cap)` : `${activeNode.capacityMillionBarrels} MBBL`}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#45627D] font-sans leading-relaxed">
            {activeNode.notes}
          </p>
        </div>
      )}

      {/* Selected Route Detail if clicked */}
      {activeRoute && (
        <div className="p-4 rounded-xl bg-white border border-[#D5E5F1] space-y-2 font-mono text-xs shadow-xs">
          <div className="flex justify-between items-center text-[#0B2540] font-bold">
            <span className="text-[#0284c7]">Selected Corridor: {activeRoute.name}</span>
            <span>Flow: {activeRoute.flowMBD} MBD | Transit: {activeRoute.transitDays} Days</span>
          </div>
          <div className="text-[#526B82] text-[11px]">
            Origin: {activeRoute.originId} → Destination: {activeRoute.destinationId} | Risk Score: {activeRoute.riskScore}/100
          </div>
        </div>
      )}

    </div>
  );
}
