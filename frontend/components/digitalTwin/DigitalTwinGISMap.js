"use client";

import { useState } from "react";
import { getGISNodes, getGISRoutes } from "@/lib/data/schemas/routeSchema";
import { 
  GlobeIcon, 
  ShieldIcon, 
  ActivityIcon, 
  AlertTriangleIcon, 
  DatabaseIcon, 
  NavigationIcon,
  ZapIcon
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

  // Geographic projection helper (Equirectangular into SVG viewBox 0 0 1000 550)
  // Maps Longitude [-110 to 120] and Latitude [-45 to 65]
  const projectGeo = (lat, lng) => {
    const minLng = -105;
    const maxLng = 115;
    const minLat = -40;
    const maxLat = 65;

    const x = ((lng - minLng) / (maxLng - minLng)) * 960 + 20;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 500 + 25;
    return { x: Math.max(10, Math.min(990, x)), y: Math.max(10, Math.min(540, y)) };
  };

  return (
    <div className="command-card rounded-2xl p-5 border border-slate-800 bg-[#070b14] space-y-4">
      
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Geospatial Energy Grid & Maritime Maritime AIS Simulator
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-semibold">
              GIS GEODETIC VIEW
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Georeferenced spatial tracking of global loading basins, chokepoints, Indian crude ports, pipelines, and ISPRL cavern complexes.
          </p>
        </div>

        {/* Infrastructure Layer Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1">
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
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition cursor-pointer min-h-[32px] ${
                filterType === btn.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold"
                  : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mandatory Demo Data Notice */}
      <div className="rounded-xl p-3 bg-amber-950/30 border border-amber-800/50 flex items-start gap-2.5 text-xs font-mono text-amber-300">
        <AlertTriangleIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>SIMULATED AIS / NO LIVE FEED CONNECTED:</strong> Facility geodetic positions reflect public port registers. Maritime vessel tracks and routing flow densities are synthetic decision-support simulations, not live satellite AIS observations.
        </span>
      </div>

      {/* Layer Visibility Toggles */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 px-2">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={showMaritime}
            onChange={(e) => setShowMaritime(e.target.checked)}
            className="accent-cyan-500 cursor-pointer"
          />
          <span>Maritime Arterial Routes</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={showPipelines}
            onChange={(e) => setShowPipelines(e.target.checked)}
            className="accent-cyan-500 cursor-pointer"
          />
          <span>Domestic & Bypass Pipelines</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={showChokepoints}
            onChange={(e) => setShowChokepoints(e.target.checked)}
            className="accent-cyan-500 cursor-pointer"
          />
          <span>Strategic Chokepoints</span>
        </label>
      </div>

      {/* Interactive GIS SVG Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#04070e] p-2">
        <svg
          viewBox="0 0 1000 550"
          className="w-full h-auto max-h-[520px] select-none"
        >
          <defs>
            {/* Glow filters */}
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-rose" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Gradients */}
            <linearGradient id="grad-ocean" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#040813" />
              <stop offset="100%" stopColor="#020408" />
            </linearGradient>
          </defs>

          {/* Ocean Background Grid */}
          <rect width="1000" height="550" fill="url(#grad-ocean)" />
          
          {/* Latitude & Longitude Reference Grid Lines */}
          {[100, 200, 300, 400, 500].map(y => (
            <line key={`lat-${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="#0e1e33" strokeDasharray="3 6" />
          ))}
          {[200, 400, 600, 800].map(x => (
            <line key={`lng-${x}`} x1={x} y1="0" x2={x} y2="550" stroke="#0e1e33" strokeDasharray="3 6" />
          ))}

          {/* Regional Landmass Indicative Contours */}
          {/* Indian Subcontinent Stylized Outline */}
          <path
            d="M 680 180 L 730 200 L 750 260 L 740 330 L 710 370 L 695 330 L 670 260 L 650 200 Z"
            fill="#0a1526"
            stroke="#162c4a"
            strokeWidth="1.5"
            opacity="0.8"
          />
          {/* Arabian Peninsula & Persian Gulf */}
          <path
            d="M 540 180 L 610 190 L 620 250 L 580 300 L 530 280 L 510 210 Z"
            fill="#0a1526"
            stroke="#162c4a"
            strokeWidth="1.5"
            opacity="0.8"
          />
          {/* Africa Stylized Outline */}
          <path
            d="M 440 190 L 510 200 L 540 280 L 500 450 L 460 500 L 410 400 L 380 280 L 400 210 Z"
            fill="#0a1526"
            stroke="#162c4a"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* Maritime Routes */}
          {showMaritime && rawRoutes.filter(r => r.type === "maritime").map((route) => {
            const isSelected = selectedRouteId === route.id;
            const points = route.coordinates.map(coord => projectGeo(coord[0], coord[1]));
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

          {/* Pipelines */}
          {showPipelines && rawRoutes.filter(r => r.type === "pipeline").map((route) => {
            const isSelected = selectedRouteId === route.id;
            const points = route.coordinates.map(coord => projectGeo(coord[0], coord[1]));
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

          {/* Nodes */}
          {filteredNodes.map((node) => {
            const { x, y } = projectGeo(node.lat, node.lng);
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
              nodeColor = "#a855f7"; // Purple
              nodeRadius = 7;
            }

            return (
              <g
                key={node.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => onSelectNode(node.id)}
                className="cursor-pointer group"
              >
                {/* Ping ring for selected or high risk */}
                {(isSelected || node.riskScore >= 80) && (
                  <circle
                    r={nodeRadius + 6}
                    fill="none"
                    stroke={nodeColor}
                    strokeWidth="1.5"
                    opacity="0.5"
                    className="animate-ping"
                  />
                )}

                <circle
                  r={nodeRadius}
                  fill={nodeColor}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? "2.5" : "1"}
                  filter={isSelected ? "url(#glow-cyan)" : undefined}
                />

                {/* Text Label */}
                <text
                  x={nodeRadius + 4}
                  y={3}
                  fill={isSelected ? "#ffffff" : "#94a3b8"}
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight={isSelected ? "bold" : "normal"}
                  className="pointer-events-none group-hover:fill-white"
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Map Legend */}
        <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-sm text-[10px] font-mono text-slate-300 space-y-1.5 pointer-events-none">
          <span className="font-bold text-slate-100 uppercase block border-b border-slate-800 pb-1">Map Legend</span>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /> Crude Basins</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Critical Chokepoints</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Discharge Ports</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> Refineries</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> ISPRL Caverns</div>
        </div>
      </div>

      {/* Selected Node / Route Detail Inspection Drawer */}
      {activeNode && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-start justify-between border-b border-slate-800 pb-2">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold font-mono text-slate-100">{activeNode.name}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase font-semibold">
                  {activeNode.type}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  activeNode.riskScore >= 80 ? "bg-rose-950 text-rose-300 border border-rose-800" :
                  activeNode.riskScore >= 50 ? "bg-amber-950 text-amber-300 border border-amber-800" :
                  "bg-emerald-950 text-emerald-300 border border-emerald-800"
                }`}>
                  RISK: {activeNode.riskScore}/100 ({activeNode.status})
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                Coordinates: {activeNode.lat.toFixed(4)}° N, {activeNode.lng.toFixed(4)}° E | Source: {activeNode.sourceStatus}
              </p>
            </div>

            <div className="text-right font-mono text-xs">
              <span className="text-slate-500 block text-[10px]">CURRENT FLOW:</span>
              <span className="font-bold text-cyan-400 text-sm">
                {activeNode.currentFlowMBD ? `${activeNode.currentFlowMBD} MBD` : activeNode.capacityMBD ? `${activeNode.capacityMBD} MBD (Cap)` : `${activeNode.capacityMillionBarrels} MBBL`}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            {activeNode.notes}
          </p>
        </div>
      )}

      {/* Selected Route Detail if clicked */}
      {activeRoute && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center text-cyan-300 font-bold">
            <span>Selected Corridor: {activeRoute.name}</span>
            <span>Flow: {activeRoute.flowMBD} MBD | Transit: {activeRoute.transitDays} Days</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            Origin: {activeRoute.originId} → Destination: {activeRoute.destinationId} | Risk Score: {activeRoute.riskScore}/100
          </div>
        </div>
      )}

    </div>
  );
}
