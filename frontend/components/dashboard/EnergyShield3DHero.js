"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ShieldIcon, NavigationIcon, SlidersIcon, ActivityIcon, ChevronRightIcon } from "@/components/ui/Icons";

export default function EnergyShield3DHero({ onExploreClick }) {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef(null);

  // 3D Scene state
  const sceneState = useRef({
    rotX: 0.25,
    rotY: 0.6,
    targetRotX: 0.25,
    targetRotY: 0.6,
    shieldPulse: 0,
    particles: []
  });

  // Initialize particle flow network
  useEffect(() => {
    const particles = [];
    // 60 particles traveling along 4 primary maritime crude corridors
    for (let i = 0; i < 60; i++) {
      particles.push({
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        corridor: i % 4, // 0: Hormuz->Sikka, 1: BabMandeb->Kochi, 2: Cape->Vizag, 3: Fujairah->Vadinar
        size: 1.5 + Math.random() * 2.0,
        alpha: 0.3 + Math.random() * 0.7
      });
    }
    sceneState.current.particles = particles;
  }, []);

  // 3D Projective geometry helper
  const project3D = useCallback((x, y, z, cx, cy, fov = 350) => {
    const scale = fov / (fov + z + 200);
    return {
      x: cx + x * scale,
      y: cy + y * scale,
      scale,
      visible: z + 200 > -100
    };
  }, []);

  // Rotate point (x, y, z) by angles rx, ry
  const rotatePoint3D = useCallback((x, y, z, rx, ry) => {
    // Y rotation (yaw)
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;

    // X rotation (pitch)
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    return { x: x1, y: y2, z: z2 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const checkReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Geodesic Shield Vertices (Hexagonal / Icosahedral slice)
    const shieldVertices = [
      { x: 0, y: -90, z: 20 },     // Top Apex
      { x: 75, y: -45, z: 10 },    // Upper Right
      { x: 85, y: 35, z: 5 },      // Lower Right
      { x: 0, y: 95, z: 25 },      // Bottom Point
      { x: -85, y: 35, z: 5 },     // Lower Left
      { x: -75, y: -45, z: 10 },   // Upper Left
      { x: 0, y: 0, z: 35 },       // Center Core Emblem
      { x: 40, y: -20, z: 25 },
      { x: 45, y: 25, z: 20 },
      { x: -45, y: 25, z: 20 },
      { x: -40, y: -20, z: 25 },
    ];

    const shieldFacets = [
      [0, 1, 7], [1, 2, 8], [2, 3, 8], [3, 4, 9], [4, 5, 10], [5, 0, 10],
      [0, 7, 10], [1, 8, 7], [2, 8, 3], [4, 9, 3], [5, 10, 9],
      [7, 6, 10], [7, 8, 6], [8, 9, 6], [9, 10, 6]
    ];

    // Maritime Crude Nodes in 3D Space (Spaced out for high legibility)
    const strategicNodes = [
      { id: "persian_gulf", name: "Persian Gulf", x: -210, y: -80, z: -30, color: "#d97706", risk: "CRITICAL", labelAlign: "left", labelOffset: { x: -10, y: -8 } },
      { id: "hormuz", name: "Strait of Hormuz", x: -110, y: -30, z: -10, color: "#dc2626", risk: "CHOKEPOINT", labelAlign: "center", labelOffset: { x: 0, y: -14 } },
      { id: "fujairah", name: "Fujairah Bypass", x: -70, y: 50, z: 10, color: "#059669", risk: "BYPASS", labelAlign: "center", labelOffset: { x: 0, y: 18 } },
      { id: "red_sea", name: "Bab-el-Mandeb", x: -230, y: 90, z: -20, color: "#d97706", risk: "HIGH", labelAlign: "left", labelOffset: { x: -10, y: 4 } },
      { id: "india_west", name: "Jamnagar / Sikka SPM", x: 130, y: -40, z: 25, color: "#0284c7", risk: "DESTINATION", labelAlign: "right", labelOffset: { x: 12, y: -4 } },
      { id: "india_south", name: "Kochi / Mangalore SPR", x: 110, y: 90, z: 20, color: "#059669", risk: "SPR_SITE", labelAlign: "right", labelOffset: { x: 12, y: 4 } },
      { id: "india_east", name: "Visakhapatnam SPR", x: 210, y: 30, z: 15, color: "#059669", risk: "SPR_SITE", labelAlign: "right", labelOffset: { x: 12, y: -4 } },
    ];

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      const cx = width / 2;
      const cy = height / 2;

      // Smooth camera interpolation towards mouse position
      if (!checkReducedMotion) {
        sceneState.current.rotX += (sceneState.current.targetRotX - sceneState.current.rotX) * 0.05;
        sceneState.current.rotY += (sceneState.current.targetRotY - sceneState.current.rotY) * 0.05;
        sceneState.current.shieldPulse += 0.025;
      }

      const { rotX, rotY, shieldPulse, particles } = sceneState.current;

      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Ambient Energy Grid / Depth Rings
      const ringPulse = Math.sin(shieldPulse * 0.5) * 8;
      ctx.strokeStyle = "rgba(2, 132, 199, 0.07)";
      ctx.lineWidth = 1;
      for (let r = 90; r <= 270; r += 55) {
        ctx.beginPath();
        ctx.ellipse(cx, cy + 15, r + ringPulse * 0.5, (r + ringPulse * 0.5) * 0.45, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 2. Render 3D Projected Energy Shield Mesh
      const projectedShield = shieldVertices.map((v) => {
        // Apply breathing pulse to z
        const pz = v.z + Math.sin(shieldPulse + v.y * 0.05) * 4;
        const r = rotatePoint3D(v.x, v.y, pz, rotX, rotY);
        return project3D(r.x, r.y, r.z, cx - 40, cy - 10);
      });

      // Draw Shield Facets (Glassmorphic Light Theme Poly Shading)
      shieldFacets.forEach((facet) => {
        const p1 = projectedShield[facet[0]];
        const p2 = projectedShield[facet[1]];
        const p3 = projectedShield[facet[2]];

        if (p1.visible && p2.visible && p3.visible) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.closePath();

          // Dynamic light facet gradient
          const facetGrad = ctx.createLinearGradient(p1.x, p1.y, p3.x, p3.y);
          facetGrad.addColorStop(0, "rgba(2, 132, 199, 0.10)");
          facetGrad.addColorStop(0.5, "rgba(14, 165, 233, 0.04)");
          facetGrad.addColorStop(1, "rgba(5, 150, 105, 0.08)");
          ctx.fillStyle = facetGrad;
          ctx.fill();

          ctx.strokeStyle = "rgba(2, 132, 199, 0.30)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });

      // 3. Render Strategic Nodes & Maritime Corridors
      const projectedNodes = strategicNodes.map((n) => {
        const r = rotatePoint3D(n.x, n.y, n.z, rotX, rotY);
        const p = project3D(r.x, r.y, r.z, cx, cy);
        return { ...n, px: p.x, py: p.y, scale: p.scale, z: r.z };
      });

      // Draw Maritime Corridor Flow Lines
      const corridors = [
        { from: "persian_gulf", via: "hormuz", to: "india_west", color: "rgba(217, 119, 6, 0.45)", risk: "CRITICAL" },
        { from: "fujairah", to: "india_west", color: "rgba(5, 150, 105, 0.55)", risk: "BYPASS" },
        { from: "red_sea", to: "india_south", color: "rgba(220, 38, 38, 0.45)", risk: "HIGH" },
        { from: "india_west", to: "india_south", color: "rgba(2, 132, 199, 0.35)", risk: "COASTAL" },
        { from: "india_south", to: "india_east", color: "rgba(5, 150, 105, 0.35)", risk: "SPR_LINK" },
      ];

      corridors.forEach((c) => {
        const n1 = projectedNodes.find((n) => n.id === c.from);
        const n2 = projectedNodes.find((n) => n.id === c.to);
        if (!n1 || !n2) return;

        ctx.beginPath();
        ctx.moveTo(n1.px, n1.py);
        if (c.via) {
          const viaNode = projectedNodes.find((n) => n.id === c.via);
          if (viaNode) {
            ctx.quadraticCurveTo(viaNode.px, viaNode.py, n2.px, n2.py);
          } else {
            ctx.lineTo(n2.px, n2.py);
          }
        } else {
          ctx.lineTo(n2.px, n2.py);
        }
        ctx.strokeStyle = c.color;
        ctx.lineWidth = c.risk === "CRITICAL" ? 2.0 : 1.4;
        ctx.stroke();
      });

      // 4. Update & Render Moving Crude Tanker Particles
      particles.forEach((p) => {
        if (!checkReducedMotion) {
          p.t = (p.t + p.speed) % 1;
        }

        // Determine particle path
        let n1, n2, via;
        if (p.corridor === 0) {
          n1 = projectedNodes.find((n) => n.id === "persian_gulf");
          via = projectedNodes.find((n) => n.id === "hormuz");
          n2 = projectedNodes.find((n) => n.id === "india_west");
        } else if (p.corridor === 1) {
          n1 = projectedNodes.find((n) => n.id === "red_sea");
          n2 = projectedNodes.find((n) => n.id === "india_south");
        } else if (p.corridor === 2) {
          n1 = projectedNodes.find((n) => n.id === "fujairah");
          n2 = projectedNodes.find((n) => n.id === "india_west");
        } else {
          n1 = projectedNodes.find((n) => n.id === "india_south");
          n2 = projectedNodes.find((n) => n.id === "india_east");
        }

        if (!n1 || !n2) return;

        let px, py;
        if (via) {
          // Quadratic Bezier interpolation
          const mt = 1 - p.t;
          px = mt * mt * n1.px + 2 * mt * p.t * via.px + p.t * p.t * n2.px;
          py = mt * mt * n1.py + 2 * mt * p.t * via.py + p.t * p.t * n2.py;
        } else {
          // Linear interpolation
          px = n1.px + (n2.px - n1.px) * p.t;
          py = n1.py + (n2.py - n1.py) * p.t;
        }

        // Draw glowing particle
        const isCritical = p.corridor === 0;
        ctx.fillStyle = isCritical ? "#d97706" : "#0284c7";
        ctx.beginPath();
        ctx.arc(px, py, p.size * (isCritical ? 1.2 : 1.0), 0, Math.PI * 2);
        ctx.fill();

        // Glow halo
        ctx.fillStyle = isCritical ? "rgba(217, 119, 6, 0.20)" : "rgba(2, 132, 199, 0.20)";
        ctx.beginPath();
        ctx.arc(px, py, p.size * 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Draw Strategic Node Hubs with Anti-Collision Pill Badges
      projectedNodes.forEach((node) => {
        // Outer pulsing ring for chokepoints
        if (node.risk === "CHOKEPOINT" || node.risk === "CRITICAL") {
          const pulse = Math.sin(shieldPulse * 2) * 3;
          ctx.strokeStyle = "rgba(220, 38, 38, 0.35)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(node.px, node.py, 10 + pulse, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Hub pin
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.px, node.py, 5.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw Pill Tag Background to prevent overlapping clash
        ctx.font = "600 11px 'Space Grotesk', sans-serif";
        const textMetrics = ctx.measureText(node.name);
        const textWidth = textMetrics.width;
        const textHeight = 14;

        let labelX = node.px + (node.labelOffset?.x || 10);
        let labelY = node.py + (node.labelOffset?.y || 4);

        if (node.labelAlign === "left") {
          labelX = node.px + (node.labelOffset?.x || -10) - textWidth;
        } else if (node.labelAlign === "center") {
          labelX = node.px - textWidth / 2;
        }

        // Pill background
        ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
        ctx.strokeStyle = "rgba(203, 213, 225, 0.9)";
        ctx.lineWidth = 1;
        const padX = 6;
        const padY = 3;
        ctx.beginPath();
        ctx.roundRect(labelX - padX, labelY - textHeight + 2, textWidth + padX * 2, textHeight + padY * 2, 4);
        ctx.fill();
        ctx.stroke();

        // High-contrast typography label
        ctx.fillStyle = "#0f172a";
        ctx.fillText(node.name, labelX, labelY + padY);
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [project3D, rotatePoint3D]);

  // Mouse tilt tracking
  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
    sceneState.current.targetRotY = 0.6 + x * 0.45;
    sceneState.current.targetRotX = 0.25 - y * 0.35;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    sceneState.current.targetRotY = 0.6;
    sceneState.current.targetRotX = 0.25;
  };

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#f8fafc] to-[#f1f5f9] border border-slate-200/90 shadow-xl p-6 sm:p-8 transition-all"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left 7 Cols: Value Proposition & Strategic Sovereign Mission */}
        <div className="lg:col-span-6 space-y-5 z-10">
          
          {/* Sovereign Security Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-medium shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600"></span>
            </span>
            <span className="tracking-wide uppercase font-semibold">National Energy Security Platform</span>
            <span className="text-sky-300">•</span>
            <span className="text-sky-700">India Model</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] font-heading">
            AI-Driven Crude Supply Chain Resilience & Decision-Support
          </h1>

          {/* High-Legibility Technical Narrative */}
          <p className="text-base text-slate-600 leading-relaxed font-body max-w-xl">
            India consumes <strong className="text-slate-900 font-semibold">5.42 MBD</strong> of crude oil with an <strong className="text-rose-600 font-semibold">89.1% import dependency</strong>. EnergyShield provides continuous explainable risk scoring, deterministic disruption simulation, and multi-objective procurement rerouting to safeguard national supply.
          </p>

          {/* Statutory Sovereign Snapshot Pills */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">Consumption</span>
              <span className="text-xl font-bold font-mono text-slate-900">5.42 <span className="text-xs text-slate-500">MBD</span></span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">Hormuz Transit</span>
              <span className="text-xl font-bold font-mono text-rose-600">&gt;58.4%</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">SPR Cover</span>
              <span className="text-xl font-bold font-mono text-emerald-700">8.1 <span className="text-xs text-slate-500">Days</span></span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer font-sans"
            >
              <ActivityIcon className="w-4 h-4" />
              <span>Explore Command Cockpit</span>
              <ChevronRightIcon className="w-4 h-4 ml-0.5" />
            </button>

            <Link
              href="/scenarios"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-sm font-medium transition-all shadow-sm hover:-translate-y-0.5"
            >
              <SlidersIcon className="w-4 h-4 text-sky-600" />
              <span>Simulate Disruption Shock</span>
            </Link>
          </div>

        </div>

        {/* Right 6 Cols: Hardware-Accelerated 3D Interactive Scene */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
          
          {/* Canvas Viewport with Fade-In Transition */}
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="3D interactive visualization of India's maritime crude supply corridors and strategic shield lattice"
            className="w-full h-full min-h-[380px] sm:min-h-[440px] select-none cursor-grab active:cursor-grabbing transition-opacity duration-500 ease-out"
            style={{ width: "100%", height: "100%", display: "block" }}
          />

          {/* 3D Scene Interactive Overlay Badge */}
          <div className="absolute top-2 right-2 pointer-events-none">
            <span className="text-[11px] font-mono text-slate-500 bg-white/90 px-2.5 py-1 rounded-md border border-slate-200 shadow-sm backdrop-blur-sm">
              ✨ 3D Spatial Geodesic Lattice • 60 FPS
            </span>
          </div>

          {/* Real-time Interaction Hint */}
          <div className="absolute bottom-2 right-2 pointer-events-none">
            <span className="text-[10px] font-mono text-slate-500 bg-white/90 px-2 py-0.5 rounded border border-slate-200 shadow-sm">
              Move cursor to rotate 3D energy shield
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
