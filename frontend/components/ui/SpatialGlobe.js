"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Geographic coordinates of key oil nodes (latitude, longitude in degrees)
const GEOGRAPHIC_NODES = [
  // Origins
  { id: "ras_tanura", name: "Ras Tanura (Saudi)", lat: 26.64, lon: 50.16, type: "origin", color: "#38bdf8" },
  { id: "basrah", name: "Basrah Terminal (Iraq)", lat: 29.80, lon: 48.80, type: "origin", color: "#38bdf8" },
  { id: "fujairah", name: "Fujairah Bypass (UAE)", lat: 25.12, lon: 56.34, type: "bypass", color: "#34d399" },
  { id: "primorsk", name: "Primorsk / Baltic (Russia)", lat: 60.36, lon: 28.60, type: "origin", color: "#60a5fa" },
  { id: "loop_us", name: "LOOP Terminal (USA)", lat: 28.88, lon: -90.02, type: "origin", color: "#818cf8" },
  { id: "bonny", name: "Bonny Terminal (Nigeria)", lat: 4.45, lon: 7.17, type: "origin", color: "#a78bfa" },
  
  // Chokepoints
  { id: "hormuz", name: "Strait of Hormuz", lat: 26.56, lon: 56.25, type: "chokepoint", risk: "CRITICAL", color: "#f43f5e" },
  { id: "bab_mandeb", name: "Bab-el-Mandeb", lat: 12.58, lon: 43.33, type: "chokepoint", risk: "HIGH", color: "#fbbf24" },
  { id: "cape", name: "Cape of Good Hope", lat: -34.35, lon: 18.47, type: "chokepoint", risk: "LOW", color: "#34d399" },
  { id: "malacca", name: "Strait of Malacca", lat: 1.43, lon: 102.89, type: "chokepoint", risk: "LOW", color: "#34d399" },

  // Destination Indian Ports
  { id: "sikka", name: "Sikka / Vadinar (Gujarat)", lat: 22.43, lon: 69.83, type: "destination", color: "#06b6d4" },
  { id: "kochi", name: "Kochi SPM (Kerala)", lat: 9.93, lon: 76.26, type: "destination", color: "#06b6d4" },
  { id: "vizag", name: "Visakhapatnam SPR (AP)", lat: 17.68, lon: 83.21, type: "destination", color: "#06b6d4" },
  { id: "paradip", name: "Paradip SPM (Odisha)", lat: 20.31, lon: 86.61, type: "destination", color: "#06b6d4" },
  { id: "mangalore", name: "Mangaluru SPR (KA)", lat: 12.91, lon: 74.85, type: "destination", color: "#06b6d4" },
];

const ACTIVE_FLOW_ARCS = [
  { from: "ras_tanura", to: "hormuz", risk: "CRITICAL" },
  { from: "basrah", to: "hormuz", risk: "CRITICAL" },
  { from: "hormuz", to: "sikka", risk: "CRITICAL" },
  { from: "fujairah", to: "sikka", risk: "LOW" },
  { from: "bab_mandeb", to: "kochi", risk: "HIGH" },
  { from: "primorsk", to: "cape", risk: "LOW" },
  { from: "cape", to: "sikka", risk: "LOW" },
  { from: "loop_us", to: "cape", risk: "LOW" },
  { from: "bonny", to: "cape", risk: "LOW" },
  { from: "sikka", to: "kochi", risk: "LOW" },
  { from: "kochi", to: "vizag", risk: "LOW" },
];

export default function SpatialGlobe({ className = "", height = 360, activeCorridor = "hormuz" }) {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const rotationRef = useRef({ yaw: 1.1, pitch: 0.35, isDragging: false, lastMouseX: 0, lastMouseY: 0 });

  // Convert lat/lon to 3D sphere coordinate (x, y, z) on unit sphere
  const latLonToVector3 = useCallback((lat, lon, radius = 1) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return {
      x: -(radius * Math.sin(phi) * Math.cos(theta)),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta)
    };
  }, []);

  // Rotate 3D point by yaw and pitch
  const rotatePoint = useCallback((p, yaw, pitch) => {
    // Rotate around Y axis (yaw)
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const x1 = p.x * cosY - p.z * sinY;
    const z1 = p.x * sinY + p.z * cosY;

    // Rotate around X axis (pitch)
    const cosP = Math.cos(pitch);
    const sinP = Math.sin(pitch);
    const y2 = p.y * cosP - z1 * sinP;
    const z2 = p.y * sinP + z1 * cosP;

    return { x: x1, y: y2, z: z2 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particleOffset = 0;

    // Handle high-DPI crisp rendering
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const checkReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      const globeRadius = Math.min(width, height) * 0.42;
      const centerX = width / 2;
      const centerY = height / 2;

      // Auto rotate if not dragging
      if (!rotationRef.current.isDragging && !checkReducedMotion) {
        rotationRef.current.yaw += 0.0035;
      }
      particleOffset = (particleOffset + 0.012) % 1;

      const { yaw, pitch } = rotationRef.current;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw outer ambient atmospheric glow
      const atmoGradient = ctx.createRadialGradient(
        centerX, centerY, globeRadius * 0.8,
        centerX, centerY, globeRadius * 1.25
      );
      atmoGradient.addColorStop(0, "rgba(6, 182, 212, 0.12)");
      atmoGradient.addColorStop(0.5, "rgba(14, 165, 233, 0.04)");
      atmoGradient.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = atmoGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Globe Sphere Body (Dark / Translucent with gradient)
      const bodyGradient = ctx.createRadialGradient(
        centerX - globeRadius * 0.3, centerY - globeRadius * 0.3, globeRadius * 0.1,
        centerX, centerY, globeRadius
      );
      bodyGradient.addColorStop(0, "rgba(18, 28, 48, 0.85)");
      bodyGradient.addColorStop(0.7, "rgba(10, 16, 28, 0.95)");
      bodyGradient.addColorStop(1, "rgba(4, 7, 13, 0.98)");
      ctx.fillStyle = bodyGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Globe boundary ring
      ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Draw Latitude & Longitude Coordinate Wireframe
      ctx.lineWidth = 0.6;
      // Parallels (Latitude lines)
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 10) {
          const v = latLonToVector3(lat, lon, globeRadius);
          const r = rotatePoint(v, yaw, pitch);
          if (r.z > -globeRadius * 0.1) {
            const screenX = centerX + r.x;
            const screenY = centerY + r.y;
            if (first) {
              ctx.moveTo(screenX, screenY);
              first = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = "rgba(148, 163, 184, 0.09)";
        ctx.stroke();
      }

      // Meridians (Longitude lines)
      for (let lon = -180; lon < 180; lon += 45) {
        ctx.beginPath();
        let first = true;
        for (let lat = -80; lat <= 80; lat += 8) {
          const v = latLonToVector3(lat, lon, globeRadius);
          const r = rotatePoint(v, yaw, pitch);
          if (r.z > -globeRadius * 0.1) {
            const screenX = centerX + r.x;
            const screenY = centerY + r.y;
            if (first) {
              ctx.moveTo(screenX, screenY);
              first = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
        ctx.stroke();
      }

      // 4. Draw Maritime Great Circle Arc Flow Trajectories
      ACTIVE_FLOW_ARCS.forEach((arc) => {
        const fromNode = GEOGRAPHIC_NODES.find((n) => n.id === arc.from);
        const toNode = GEOGRAPHIC_NODES.find((n) => n.id === arc.to);
        if (!fromNode || !toNode) return;

        const isCritical = arc.risk === "CRITICAL";
        const isHigh = arc.risk === "HIGH";
        const arcColor = isCritical ? "#f43f5e" : isHigh ? "#fbbf24" : "#10b981";

        // Sample arc points along Great Circle
        ctx.beginPath();
        const steps = 24;
        let arcVisible = false;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const alt = Math.sin(t * Math.PI) * (globeRadius * 0.14);
          const currentRadius = globeRadius + alt;
          
          const curLat = fromNode.lat + (toNode.lat - fromNode.lat) * t;
          const curLon = fromNode.lon + (toNode.lon - fromNode.lon) * t;
          const v = latLonToVector3(curLat, curLon, currentRadius);
          const r = rotatePoint(v, yaw, pitch);

          if (r.z > 0) {
            arcVisible = true;
            const sx = centerX + r.x;
            const sy = centerY + r.y;
            if (i === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
        }

        if (arcVisible) {
          ctx.strokeStyle = isCritical ? "rgba(244, 63, 94, 0.45)" : isHigh ? "rgba(251, 191, 36, 0.35)" : "rgba(16, 185, 129, 0.35)";
          ctx.lineWidth = isCritical ? 2.0 : 1.4;
          ctx.stroke();

          // Animated energy pulse particle traveling along the arc
          const pt = (particleOffset + (arc.from.charCodeAt(0) % 5) * 0.2) % 1;
          const alt = Math.sin(pt * Math.PI) * (globeRadius * 0.14);
          const curLat = fromNode.lat + (toNode.lat - fromNode.lat) * pt;
          const curLon = fromNode.lon + (toNode.lon - fromNode.lon) * pt;
          const pv = latLonToVector3(curLat, curLon, globeRadius + alt);
          const pr = rotatePoint(pv, yaw, pitch);

          if (pr.z > 0) {
            const px = centerX + pr.x;
            const py = centerY + pr.y;
            ctx.fillStyle = arcColor;
            ctx.beginPath();
            ctx.arc(px, py, isCritical ? 3.0 : 2.2, 0, Math.PI * 2);
            ctx.fill();
            // Glow halo around particle
            ctx.fillStyle = isCritical ? "rgba(244, 63, 94, 0.35)" : "rgba(16, 185, 129, 0.35)";
            ctx.beginPath();
            ctx.arc(px, py, isCritical ? 6.0 : 4.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // 5. Draw Geographic Nodes & Chokepoint Markers
      GEOGRAPHIC_NODES.forEach((node) => {
        const v = latLonToVector3(node.lat, node.lon, globeRadius);
        const r = rotatePoint(v, yaw, pitch);

        // Only draw nodes on visible hemisphere (facing viewer)
        if (r.z > -10) {
          const sx = centerX + r.x;
          const sy = centerY + r.y;
          const isSelected = selectedNode?.id === node.id || activeCorridor === node.id;
          const isChokepoint = node.type === "chokepoint";

          // Node shadow / outer pulse
          ctx.fillStyle = isChokepoint ? "rgba(244, 63, 94, 0.25)" : "rgba(6, 182, 212, 0.2)";
          ctx.beginPath();
          ctx.arc(sx, sy, isSelected ? 9 : 6, 0, Math.PI * 2);
          ctx.fill();

          // Node core pin
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(sx, sy, isSelected ? 4.5 : 3.0, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Node typography label on front face
          if (r.z > globeRadius * 0.25 || isSelected) {
            ctx.font = isSelected ? "bold 11px 'JetBrains Mono', monospace" : "10px 'Inter', sans-serif";
            ctx.fillStyle = isSelected ? "#38bdf8" : "rgba(226, 232, 240, 0.85)";
            ctx.fillText(node.name, sx + 8, sy + 3);
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [latLonToVector3, rotatePoint, selectedNode, activeCorridor]);

  // Mouse & Touch Drag Controls for interactive orbital inspection
  const handleMouseDown = (e) => {
    rotationRef.current.isDragging = true;
    setIsDragging(true);
    rotationRef.current.lastMouseX = e.clientX;
    rotationRef.current.lastMouseY = e.clientY;
  };

  const handleMouseMove = (e) => {
    if (!rotationRef.current.isDragging) return;
    const deltaX = e.clientX - rotationRef.current.lastMouseX;
    const deltaY = e.clientY - rotationRef.current.lastMouseY;
    rotationRef.current.yaw += deltaX * 0.008;
    rotationRef.current.pitch = Math.max(-0.8, Math.min(0.8, rotationRef.current.pitch + deltaY * 0.008));
    rotationRef.current.lastMouseX = e.clientX;
    rotationRef.current.lastMouseY = e.clientY;
  };

  const handleMouseUp = () => {
    rotationRef.current.isDragging = false;
    setIsDragging(false);
  };

  return (
    <div 
      className={`relative w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#0a0f1d] to-[#060a12] border border-slate-800/80 shadow-2xl group ${className}`}
      onMouseLeave={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* 3D Hardware Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{ width: "100%", height: `${height}px`, display: "block" }} 
      />

      {/* Top HUD Overlay */}
      <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="text-[11px] font-mono text-cyan-300 font-semibold tracking-wider uppercase">
          3D Maritime Spatial Sphere • 60 FPS
        </span>
      </div>

      {/* Quick Interactive Orbit Hint */}
      <div className="absolute bottom-3 left-3 pointer-events-none">
        <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-slate-700/60 backdrop-blur-sm">
          🖱 Drag to rotate globe • Great Circle Geodesic Flow
        </span>
      </div>

      {/* Corridor Status Legend */}
      <div className="absolute top-3 right-3 pointer-events-none flex flex-col gap-1 text-[10px] font-mono">
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-950/70 border border-rose-800 text-rose-300">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          Hormuz: CRITICAL
        </span>
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-800 text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Fujairah / Cape: NOMINAL
        </span>
      </div>
    </div>
  );
}
