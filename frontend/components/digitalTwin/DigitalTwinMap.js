"use client";

import { useState } from "react";
import { ShieldIcon, NavigationIcon, GlobeIcon, DatabaseIcon, ActivityIcon, AlertTriangleIcon } from "@/components/ui/Icons";

export default function DigitalTwinMap({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  filterType,
  onChangeFilterType
}) {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  const filteredNodes = nodes.filter((n) => {
    if (filterType === "ALL") return true;
    if (filterType === "SUPPLIERS") return n.type === "supplier";
    if (filterType === "CORRIDORS") return ["corridor", "chokepoint"].includes(n.type);
    if (filterType === "PORTS") return n.type === "port";
    if (filterType === "REFINERIES") return n.type === "refinery";
    if (filterType === "RESERVES") return n.type === "reserve";
    return true;
  });

  return (
    <div className="command-card rounded-2xl p-5 border border-slate-800 space-y-4 bg-gradient-to-b from-[#0a0f1d] via-[#070b14] to-[#04070c]">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Topological Supply Chain Network Graph
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              PHYSICAL ARTERIAL FLOWS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any infrastructure node to inspect live flow telemetry, risk exposure, and alternative bypass options.
          </p>
        </div>

        {/* Node Category Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          {["ALL", "SUPPLIERS", "CORRIDORS", "PORTS", "REFINERIES", "RESERVES"].map((t) => {
            const isSelected = filterType === t;
            return (
              <button
                key={t}
                onClick={() => onChangeFilterType(t)}
                className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative w-full overflow-x-auto rounded-xl border border-slate-800/80 bg-[#050810] p-2">
        <svg
          viewBox="0 0 1000 420"
          className="w-full h-auto min-w-[750px] select-none"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" />
            </pattern>

            {/* Gradient Markers */}
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="disruptedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <rect width="1000" height="420" fill="url(#grid)" />

          {/* Section Boundary Labels */}
          <g className="text-[10px] font-mono fill-slate-600 font-bold uppercase">
            <text x="70" y="25">1. Global Origins</text>
            <text x="320" y="25">2. Maritime Chokepoints</text>
            <text x="610" y="25">3. Indian Receiving Ports</text>
            <text x="830" y="25">4. Refineries & SPR</text>
          </g>

          {/* Flow Edges */}
          {edges.map((e) => {
            const from = nodes.find((n) => n.id === e.from);
            const to = nodes.find((n) => n.id === e.to);
            if (!from || !to) return null;

            const isDisrupted = e.isDisrupted;
            const strokeColor = isDisrupted ? "#f43f5e" : "#0ea5e9";
            const strokeWidth = isDisrupted ? 1.5 : Math.max(1.5, Math.min(4.5, e.volumeMbd * 2.2));
            const strokeDash = isDisrupted ? "4,4" : "none";

            // Bezier curve control points for smooth pipeline curves
            const dx = to.x - from.x;
            const cx1 = from.x + dx * 0.45;
            const cy1 = from.y;
            const cx2 = from.x + dx * 0.55;
            const cy2 = to.y;

            return (
              <g key={e.id} className="transition-opacity">
                <path
                  d={`M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDash}
                  strokeOpacity={isDisrupted ? 0.9 : 0.45}
                  className={isDisrupted ? "animate-pulse" : ""}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {filteredNodes.map((n) => {
            const isSelected = n.id === selectedNodeId;
            const isHovered = n.id === hoveredNodeId;
            const isCritical = n.riskTier === "CRITICAL";
            const isHigh = n.riskTier === "HIGH";
            const isMod = n.riskTier === "MODERATE";

            let nodeFill = "#0f172a";
            let nodeStroke = "#38bdf8";

            if (isCritical) {
              nodeFill = "#4c0519";
              nodeStroke = "#f43f5e";
            } else if (isHigh) {
              nodeFill = "#451a03";
              nodeStroke = "#f59e0b";
            } else if (isMod) {
              nodeFill = "#082f49";
              nodeStroke = "#06b6d4";
            } else {
              nodeFill = "#064e3b";
              nodeStroke = "#10b981";
            }

            if (isSelected) {
              nodeStroke = "#ffffff";
            }

            const radius = n.type === "supplier" ? 14 : n.type === "chokepoint" ? 16 : n.type === "port" ? 13 : 11;

            return (
              <g
                key={n.id}
                onClick={() => onSelectNode(n.id)}
                onMouseEnter={() => setHoveredNodeId(n.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className="cursor-pointer transition-all duration-150"
              >
                {/* Glow ring on selection or hover */}
                {(isSelected || isHovered) && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={radius + 6}
                    fill="none"
                    stroke={nodeStroke}
                    strokeWidth="2"
                    strokeOpacity="0.6"
                    className="animate-ping"
                  />
                )}

                {/* Node Body */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={radius}
                  fill={nodeFill}
                  stroke={nodeStroke}
                  strokeWidth={isSelected ? 3 : 1.8}
                />

                {/* Center Icon Initial */}
                <text
                  x={n.x}
                  y={n.y + 3.5}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {n.type === "chokepoint" ? "⚠️" : n.shortName.slice(0, 2).toUpperCase()}
                </text>

                {/* Node Label Text */}
                <text
                  x={n.x}
                  y={n.y + radius + 11}
                  textAnchor="middle"
                  fill={isSelected ? "#38bdf8" : isCritical ? "#fda4af" : "#cbd5e1"}
                  fontSize="9.5"
                  fontFamily="sans-serif"
                  fontWeight={isSelected ? "bold" : "500"}
                  className="pointer-events-none"
                >
                  {n.shortName}
                </text>

                {/* Subtitle / Volume Pill */}
                <text
                  x={n.x}
                  y={n.y + radius + 21}
                  textAnchor="middle"
                  fill={isCritical ? "#f43f5e" : "#64748b"}
                  fontSize="8"
                  fontFamily="monospace"
                  className="pointer-events-none"
                >
                  {n.currentFlowMbd ? `${n.currentFlowMbd} MBD` : `${n.currentRisk}/100`}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Map Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-slate-400 pt-1">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Low Risk (&lt;40)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Moderate (40–59)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>Critical / Disrupted (&gt;75)</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
          <span>Solid Line: Active Flow</span>
          <span>Dashed Red: Disrupted Artery</span>
        </div>
      </div>

    </div>
  );
}
