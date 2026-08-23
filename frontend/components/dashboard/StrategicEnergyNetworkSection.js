"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ShieldIcon, NavigationIcon, ActivityIcon, DatabaseIcon } from "@/components/ui/Icons";

export default function StrategicEnergyNetworkSection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // 3D Scene rotation & interaction state (Slow 40s continuous auto-orbit cycle)
  const stateRef = useRef({
    rotY: 0.18,
    rotX: 0.08,
    autoSpeed: 0.0011, // ~40-45s per full 360 degree orbit
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    lastRotY: 0.18,
    lastRotX: 0.08,
    particles: []
  });

  // Initialize cargo particle streams along primary supply corridors
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        t: Math.random(),
        speed: 0.0012 + Math.random() * 0.0016,
        corridor: i % 6,
        size: 1.5 + Math.random() * 1.5,
        alpha: 0.45 + Math.random() * 0.5
      });
    }
    stateRef.current.particles = particles;
  }, []);

  // Spatial Projection with fixed camera distance and depth calculation
  const projectPoint = useCallback((x, y, z, cx, cy, radiusScale, rx, ry) => {
    // 3D Rotation around the center of the network
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;

    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    // Stable 2D projective coordinates centered in the viewport
    const px = cx + x1 * radiusScale;
    const py = cy + y2 * radiusScale;

    // Normalized depth factor from 0.35 (back) to 1.0 (front)
    const normalizedDepth = (z2 + 250) / 500;
    const depthFactor = Math.max(0.35, Math.min(1.0, normalizedDepth));

    return {
      x: px,
      y: py,
      z: z2,
      depthFactor
    };
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 450;
    };
    window.addEventListener("resize", handleResize);

    // Geographically calibrated spatial nodes: Wide horizontal distribution
    // Basra / Iraq → Upper-Left
    // Ras Tanura / Saudi → Left
    // Cape of Good Hope → Upper-Left outer bypass
    // Primorsk / Baltic → Lower-Left Russian crude vector
    // Bab-el-Mandeb → Left-Center / Red Sea
    // Strait of Hormuz → Center-Left (Critical Chokepoint)
    // Fujairah → Center (UAE Bypass)
    // Indian Ports/Refineries → Right Side
    // Strait of Malacca → Far-Right / Upper-Right
    const nodes = [
      {
        id: "basra",
        name: "Basra",
        sub: "Iraq • 20.3%",
        x: -340,
        y: -95,
        z: -25,
        type: "origin",
        color: "#38bdf8",
        priority: 1
      },
      {
        id: "ras_tanura",
        name: "Ras Tanura",
        sub: "Saudi • 14.8%",
        x: -310,
        y: -30,
        z: -45,
        type: "origin",
        color: "#38bdf8",
        priority: 1
      },
      {
        id: "primorsk",
        name: "Primorsk / Baltic",
        sub: "Russia Urals Vector",
        x: -330,
        y: 85,
        z: -30,
        type: "origin",
        color: "#38bdf8",
        priority: 2
      },
      {
        id: "cape_route",
        name: "Cape of Good Hope",
        sub: "+12-14d Diversion Route",
        x: -210,
        y: 110,
        z: 60,
        type: "diversion",
        color: "#c084fc",
        priority: 2
      },
      {
        id: "bab_mandeb",
        name: "Bab-el-Mandeb",
        sub: "Red Sea Chokepoint Risk",
        x: -220,
        y: 40,
        z: 35,
        type: "risk",
        color: "#fbbf24",
        priority: 2
      },
      {
        id: "hormuz",
        name: "Strait of Hormuz",
        sub: "58.4% Critical Chokepoint",
        x: -140,
        y: -40,
        z: 10,
        type: "chokepoint",
        color: "#f43f5e",
        priority: 3 // High priority
      },
      {
        id: "fujairah",
        name: "Fujairah",
        sub: "UAE Deepwater Bypass",
        x: -50,
        y: -10,
        z: -15,
        type: "origin",
        color: "#38bdf8",
        priority: 2
      },
      {
        id: "vadinar",
        name: "Vadinar SPM",
        sub: "20 MMTPA Refinery Port",
        x: 80,
        y: -85,
        z: -15,
        type: "port",
        color: "#10b981",
        priority: 2
      },
      {
        id: "jamnagar",
        name: "Jamnagar / Sikka",
        sub: "33 MMTPA Mega Refinery",
        x: 85,
        y: -35,
        z: -20,
        type: "port",
        color: "#10b981",
        priority: 3
      },
      {
        id: "mangalore",
        name: "Mangalore / Padur",
        sub: "4.00 MMT SPR Caverns",
        x: 135,
        y: 35,
        z: 20,
        type: "spr",
        color: "#10b981",
        priority: 2
      },
      {
        id: "kochi",
        name: "Kochi SPM",
        sub: "15.5 MMTPA Refinery",
        x: 145,
        y: 80,
        z: 35,
        type: "port",
        color: "#10b981",
        priority: 2
      },
      {
        id: "vizag",
        name: "Visakhapatnam",
        sub: "1.33 MMT SPR Cavern",
        x: 235,
        y: 10,
        z: 10,
        type: "spr",
        color: "#10b981",
        priority: 2
      },
      {
        id: "paradip",
        name: "Paradip SPM",
        sub: "15 MMTPA Refinery",
        x: 260,
        y: -45,
        z: -25,
        type: "port",
        color: "#10b981",
        priority: 2
      },
      {
        id: "malacca",
        name: "Strait of Malacca",
        sub: "Far East Transit Vector",
        x: 340,
        y: 60,
        z: 40,
        type: "chokepoint",
        color: "#f43f5e",
        priority: 2
      }
    ];

    // Maritime sea lane corridors
    const corridors = [
      { from: "basra", to: "hormuz", stroke: "rgba(56, 189, 248, 0.45)", width: 1.5 },
      { from: "ras_tanura", to: "hormuz", stroke: "rgba(56, 189, 248, 0.45)", width: 1.5 },
      { from: "fujairah", to: "vadinar", stroke: "rgba(56, 189, 248, 0.6)", width: 2 },
      { from: "hormuz", to: "jamnagar", stroke: "rgba(244, 63, 94, 0.8)", width: 2.5, dashed: true },
      { from: "primorsk", to: "vadinar", stroke: "rgba(56, 189, 248, 0.45)", width: 1.5 },
      { from: "bab_mandeb", to: "kochi", stroke: "rgba(251, 191, 36, 0.65)", width: 2 },
      { from: "cape_route", to: "kochi", stroke: "rgba(192, 132, 252, 0.6)", width: 2 },
      { from: "cape_route", to: "vizag", stroke: "rgba(192, 132, 252, 0.45)", width: 1.5 },
      { from: "jamnagar", to: "mangalore", stroke: "rgba(16, 185, 129, 0.5)", width: 1.8 },
      { from: "mangalore", to: "kochi", stroke: "rgba(16, 185, 129, 0.6)", width: 2 },
      { from: "kochi", to: "vizag", stroke: "rgba(16, 185, 129, 0.4)", width: 1.5 },
      { from: "vizag", to: "paradip", stroke: "rgba(16, 185, 129, 0.55)", width: 1.8 },
      { from: "vizag", to: "malacca", stroke: "rgba(244, 63, 94, 0.5)", width: 1.5 }
    ];

    let animationFrameId;
    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Perfectly scale network to fill ~86% of container width and ~72% of height
      const targetWidth = width * 0.86;
      const targetHeight = height * 0.72;
      const baseSpanX = 720;
      const baseSpanY = 240;
      const radiusScale = Math.min(targetWidth / baseSpanX, targetHeight / baseSpanY, 1.4);

      // Smooth continuous auto-rotation: 1 rotation every ~40s
      if (!stateRef.current.isDragging) {
        stateRef.current.rotY += stateRef.current.autoSpeed;
        stateRef.current.rotX = 0.08 + Math.sin(time * 0.15) * 0.015;
      }

      const rx = stateRef.current.rotX;
      const ry = stateRef.current.rotY;

      // 1. Draw Subtle Holographic Geodesic Globe Background
      ctx.save();
      const globeRX = 350 * radiusScale;
      const globeRY = 150 * radiusScale;

      // Atmospheric glow
      const atmosGrad = ctx.createRadialGradient(cx, cy, globeRY * 0.3, cx, cy, globeRX * 1.05);
      atmosGrad.addColorStop(0, "rgba(14, 165, 233, 0.045)");
      atmosGrad.addColorStop(0.7, "rgba(14, 165, 233, 0.012)");
      atmosGrad.addColorStop(1, "transparent");
      ctx.fillStyle = atmosGrad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, globeRX * 1.05, globeRY * 1.05, 0, 0, Math.PI * 2);
      ctx.fill();

      // Latitude and Longitude grid rings with wider spacing for subtle elegance
      ctx.strokeStyle = "rgba(56, 189, 248, 0.04)";
      ctx.lineWidth = 1;
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        const rLat = globeRX * Math.cos(latRad);
        const yLat = globeRY * Math.sin(latRad) * 0.65;
        ctx.beginPath();
        ctx.ellipse(cx, cy + yLat, rLat, rLat * 0.24, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Orbital defense perimeter rings
      ctx.strokeStyle = "rgba(14, 165, 233, 0.09)";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, globeRX * 0.98, globeRY * 0.88, ry * 0.12, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(16, 185, 129, 0.07)";
      ctx.beginPath();
      ctx.ellipse(cx, cy, globeRX * 1.03, globeRY * 0.94, -ry * 0.1, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Project all nodes with depth
      const projectedNodes = {};
      nodes.forEach((node) => {
        const p = projectPoint(node.x, node.y, node.z, cx, cy, radiusScale, rx, ry);
        projectedNodes[node.id] = { ...node, ...p };
      });

      // 2. Draw Luminous Sea Lane Corridor Connections
      corridors.forEach((corr) => {
        const pFrom = projectedNodes[corr.from];
        const pTo = projectedNodes[corr.to];
        if (!pFrom || !pTo) return;

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = corr.stroke;
        ctx.lineWidth = corr.width;
        if (corr.dashed) {
          ctx.setLineDash([5, 4]);
          ctx.lineDashOffset = -time * 20;
        }

        // Curved arc between locations
        const midX = (pFrom.x + pTo.x) / 2;
        const midY = (pFrom.y + pTo.y) / 2 - 10 * radiusScale;
        ctx.moveTo(pFrom.x, pFrom.y);
        ctx.quadraticCurveTo(midX, midY, pTo.x, pTo.y);
        ctx.stroke();
        ctx.restore();
      });

      // 3. Draw Dynamic Animated Cargo Particles Traveling along Routes
      const tracks = [
        [projectedNodes["basra"], projectedNodes["hormuz"], projectedNodes["jamnagar"]],
        [projectedNodes["ras_tanura"], projectedNodes["hormuz"], projectedNodes["jamnagar"]],
        [projectedNodes["bab_mandeb"], projectedNodes["kochi"], projectedNodes["mangalore"]],
        [projectedNodes["cape_route"], projectedNodes["vizag"], projectedNodes["paradip"]],
        [projectedNodes["fujairah"], projectedNodes["vadinar"], projectedNodes["jamnagar"]],
        [projectedNodes["vizag"], projectedNodes["malacca"], projectedNodes["paradip"]]
      ];

      stateRef.current.particles.forEach((pt) => {
        pt.t = (pt.t + pt.speed) % 1;
        const track = tracks[pt.corridor];
        if (!track || !track[0] || !track[1] || !track[2]) return;

        let px, py;
        if (pt.t < 0.5) {
          const localT = pt.t * 2;
          const midX = (track[0].x + track[1].x) / 2;
          const midY = (track[0].y + track[1].y) / 2 - 10 * radiusScale;
          px = (1 - localT) * (1 - localT) * track[0].x + 2 * (1 - localT) * localT * midX + localT * localT * track[1].x;
          py = (1 - localT) * (1 - localT) * track[0].y + 2 * (1 - localT) * localT * midY + localT * localT * track[1].y;
        } else {
          const localT = (pt.t - 0.5) * 2;
          const midX = (track[1].x + track[2].x) / 2;
          const midY = (track[1].y + track[2].y) / 2 - 10 * radiusScale;
          px = (1 - localT) * (1 - localT) * track[1].x + 2 * (1 - localT) * localT * midX + localT * localT * track[2].x;
          py = (1 - localT) * (1 - localT) * track[1].y + 2 * (1 - localT) * localT * midY + localT * localT * track[2].y;
        }

        ctx.save();
        const pColor = pt.corridor === 0 || pt.corridor === 1 || pt.corridor === 5 
          ? `rgba(244, 63, 94, ${pt.alpha})` 
          : `rgba(56, 189, 248, ${pt.alpha})`;
        ctx.fillStyle = pColor;
        ctx.shadowColor = pt.corridor === 0 ? "#f43f5e" : "#38bdf8";
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(px, py, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 4. Draw Node Cores & Soft Radar Pulses
      Object.values(projectedNodes).forEach((node) => {
        const nodeRadius = node.type === "chokepoint" ? 5.5 : node.type === "spr" ? 5 : 4;

        // Pulsing radar rings for critical chokepoints and SPR reserves
        if (node.type === "chokepoint" || node.type === "spr" || node.type === "risk") {
          const pulse = (Math.sin(time * 2.8 + node.x * 0.05) + 1) * 2.5;
          ctx.save();
          ctx.beginPath();
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1.1;
          ctx.globalAlpha = 0.35 * node.depthFactor;
          ctx.arc(node.x, node.y, nodeRadius + pulse, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Main Node Core
        ctx.save();
        ctx.globalAlpha = node.depthFactor;
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = node.type === "chokepoint" ? 10 : 6;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 5. COLLISION-AWARE SCREEN-SPACE BILLBOARD LABELS
      // Measure and construct label boxes
      const rawLabels = Object.values(projectedNodes).map((node) => {
        ctx.font = '600 10px "JetBrains Mono", monospace';
        const nameW = ctx.measureText(node.name).width;
        ctx.font = '400 8.5px "JetBrains Mono", monospace';
        const subW = ctx.measureText(node.sub).width;
        const pillW = Math.max(nameW, subW) + 16;
        const pillH = 24;

        // Default natural horizontal displacement
        let lx = node.x > cx ? node.x + 12 : node.x - pillW - 12;
        let ly = node.y - pillH / 2;

        return {
          node,
          pillW,
          pillH,
          x: lx,
          y: ly,
          priority: node.priority,
          depthFactor: node.depthFactor
        };
      });

      // Sort by priority (higher priority chokepoints processed first)
      rawLabels.sort((a, b) => b.priority - a.priority);

      // Iterative 2D Label Collision Resolution
      const placedBoxes = [];
      rawLabels.forEach((label) => {
        let bestX = label.x;
        let bestY = label.y;

        // Clamp to screen bounds
        bestX = Math.max(10, Math.min(width - label.pillW - 10, bestX));
        bestY = Math.max(10, Math.min(height - label.pillH - 10, bestY));

        // Check collision against already placed boxes
        for (let iter = 0; iter < 8; iter++) {
          let hasCollision = false;
          for (const placed of placedBoxes) {
            const overlapX = Math.abs((bestX + label.pillW / 2) - (placed.x + placed.w / 2)) < (label.pillW + placed.w) / 2 + 4;
            const overlapY = Math.abs((bestY + label.pillH / 2) - (placed.y + placed.h / 2)) < (label.pillH + placed.h) / 2 + 4;

            if (overlapX && overlapY) {
              hasCollision = true;
              // Vertically offset based on relative position
              if (bestY <= placed.y) {
                bestY = placed.y - label.pillH - 5;
              } else {
                bestY = placed.y + placed.h + 5;
              }
              bestY = Math.max(10, Math.min(height - label.pillH - 10, bestY));
              break;
            }
          }
          if (!hasCollision) break;
        }

        placedBoxes.push({
          x: bestX,
          y: bestY,
          w: label.pillW,
          h: label.pillH,
          node: label.node,
          depthFactor: label.depthFactor
        });
      });

      // Render Resolved Labels
      placedBoxes.forEach((box) => {
        const { node, depthFactor, x: lx, y: ly, w: pillW, h: pillH } = box;

        ctx.save();
        // Fade smoothly when rotated toward the back
        ctx.globalAlpha = 0.4 + 0.6 * depthFactor;

        // Subtle leader line connecting displaced label to node
        ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(lx + (node.x > cx ? 0 : pillW), ly + pillH / 2);
        ctx.stroke();

        // Glassmorphic Label Container
        ctx.fillStyle = "rgba(7, 17, 31, 0.92)";
        ctx.strokeStyle = node.type === "chokepoint" 
          ? "rgba(244, 63, 94, 0.65)" 
          : node.type === "spr" 
          ? "rgba(16, 185, 129, 0.55)" 
          : node.type === "diversion"
          ? "rgba(192, 132, 252, 0.55)"
          : node.type === "risk"
          ? "rgba(251, 191, 36, 0.55)"
          : "rgba(56, 189, 248, 0.4)";
        ctx.lineWidth = 1;

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(lx, ly, pillW, pillH, 4);
        } else {
          ctx.rect(lx, ly, pillW, pillH);
        }
        ctx.fill();
        ctx.stroke();

        // Category dot
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(lx + 6, ly + 8.5, 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Primary Name (Crisp 10px white)
        ctx.fillStyle = "#ffffff";
        ctx.font = '600 10px "JetBrains Mono", monospace';
        ctx.fillText(node.name, lx + 12, ly + 11);

        // Secondary Metadata (8.5px color-coded)
        ctx.fillStyle = node.type === "chokepoint"
          ? "#fda4af"
          : node.type === "spr"
          ? "#86efac"
          : node.type === "diversion"
          ? "#e9d5ff"
          : node.type === "risk"
          ? "#fde68a"
          : "#93c5fd";
        ctx.font = '400 8.5px "JetBrains Mono", monospace';
        ctx.fillText(node.sub, lx + 12, ly + 20);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [projectPoint]);

  // Drag interaction handlers (Optional manual inspection)
  const handleMouseDown = (e) => {
    stateRef.current.isDragging = true;
    stateRef.current.dragStartX = e.clientX;
    stateRef.current.dragStartY = e.clientY;
    stateRef.current.lastRotY = stateRef.current.rotY;
    stateRef.current.lastRotX = stateRef.current.rotX;
    setIsInteracting(true);
  };

  const handleMouseMove = (e) => {
    if (!stateRef.current.isDragging) return;
    const dx = e.clientX - stateRef.current.dragStartX;
    const dy = e.clientY - stateRef.current.dragStartY;
    stateRef.current.rotY = stateRef.current.lastRotY + dx * 0.003;
    stateRef.current.rotX = Math.max(-0.12, Math.min(0.22, stateRef.current.lastRotX + dy * 0.0018));
  };

  const handleMouseUp = () => {
    stateRef.current.isDragging = false;
    setTimeout(() => setIsInteracting(false), 800);
  };

  return (
    <section 
      ref={containerRef}
      aria-label="3D Maritime Spatial Sphere Visualization"
      className="p-5 sm:p-6 lg:p-7 rounded-3xl bg-[#07111F] text-white border border-slate-800 shadow-2xl flex flex-col justify-between space-y-4 relative overflow-hidden max-h-[calc(100vh-5rem)] min-h-[580px] lg:h-[calc(100vh-6rem)]"
    >
      {/* Background Ambience Glow */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[350px] bg-sky-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[350px] bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />

      {/* 1. TOP HEADER: Title, Subtitle, Legend (20-22% of Card Height) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800/80 pb-3 relative z-10 shrink-0">
        <div className="space-y-0.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-mono text-[11px] font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>3D MARITIME SPATIAL SPHERE</span>
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-cyan-900/60 font-semibold">
              ● AUTO ORBIT • 40s CYCLE • COLLISION-AWARE LABELS
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight pt-0.5">
            National Crude Supply Chain &amp; Corridor Map
          </h2>

          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Continuous topological spatial model of India&apos;s crude import corridors, chokepoint transit vectors, subterranean strategic reserves, and coastal refinery SPMs.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-300 shrink-0">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" /> Origins
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e]" /> Chokepoints
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" /> Red Sea Risk
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]" /> Diversion
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" /> ISPRL / Ports
          </span>
        </div>
      </div>

      {/* 2. CENTER: Large HD Interactive Spatial Network Viewport (65-70% of Card Height) */}
      <div 
        className="relative w-full flex-1 min-h-[340px] max-h-[480px] rounded-2xl bg-[#040A14] border border-slate-800/90 overflow-hidden shadow-inner flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="High definition 3D spatial sphere visualization of India crude oil supply network and maritime sea lanes"
          className="w-full h-full select-none"
          style={{ width: "100%", height: "100%", display: "block" }}
        />

        {/* Top-Right Tag */}
        <div className="absolute top-2.5 right-2.5 pointer-events-none">
          <span className="text-[9px] font-mono text-cyan-300 bg-slate-900/85 px-2.5 py-0.5 rounded border border-cyan-800/60 backdrop-blur-md shadow-xs">
            ● AUTO ORBIT • 40s CYCLE • COLLISION-AWARE LABELS
          </span>
        </div>

        {/* Bottom-Left Simulation Disclaimer */}
        <div className="absolute bottom-2.5 left-2.5 pointer-events-none">
          <span className="text-[9px] font-mono text-slate-400 bg-slate-900/85 px-2.5 py-0.5 rounded border border-slate-800 backdrop-blur-md shadow-xs">
            SIMULATION MODEL • NOT LIVE SCADA
          </span>
        </div>

        {/* Bottom-Right Optional Drag Hint */}
        <div className="absolute bottom-2.5 right-2.5 pointer-events-none">
          <span className="text-[9px] font-mono text-slate-400 bg-slate-900/85 px-2.5 py-0.5 rounded border border-slate-800 backdrop-blur-md shadow-xs">
            Optional drag to inspect perspective
          </span>
        </div>
      </div>

      {/* 3. INTEGRATED COMPACT KPI CARDS (10-12% of Card Height) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-0.5 font-mono text-xs shrink-0">
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5 shadow-2xs">
          <span className="text-[9px] text-slate-400 uppercase font-semibold block">Crude Demand</span>
          <span className="text-sm font-bold text-white block">5.42 MBD</span>
          <span className="text-[9px] text-slate-400">Daily Consumption</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5 shadow-2xs">
          <span className="text-[9px] text-slate-400 uppercase font-semibold block">Strategic Terminals</span>
          <span className="text-sm font-bold text-sky-400 block">12+ SPMs</span>
          <span className="text-[9px] text-sky-400/80">Deepwater Berths</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5 shadow-2xs">
          <span className="text-[9px] text-slate-400 uppercase font-semibold block">SPR Installed</span>
          <span className="text-sm font-bold text-emerald-400 block">39.18 MBBL</span>
          <span className="text-[9px] text-emerald-400/80">5.33 MMT Buffer</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5 shadow-2xs">
          <span className="text-[9px] text-slate-400 uppercase font-semibold block">Theoretical Cover</span>
          <span className="text-sm font-bold text-emerald-400 block">8.1 Days</span>
          <span className="text-[9px] text-emerald-400/80">Phase-1 Standalone</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-[9px] text-slate-400 uppercase font-semibold block">Import Dependency</span>
          <span className="text-sm font-bold text-rose-400 block">89.1%</span>
          <span className="text-[9px] text-rose-400/80">4.83 MBD Net Import</span>
        </div>
      </div>

    </section>
  );
}
