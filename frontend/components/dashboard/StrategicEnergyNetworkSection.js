"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function StrategicEnergyNetworkSection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D Scene rotation & interaction state (40s continuous auto-orbit)
  const stateRef = useRef({
    rotY: 0.18,
    rotX: 0.08,
    autoSpeed: 0.0011, // ~40-45s full orbit
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    lastRotY: 0.18,
    lastRotX: 0.08,
    particles: [],
    hoveredNodeId: null,
    mouseCanvasPos: { x: -100, y: -100 },
    placedLabels: []
  });

  // Initialize cargo particle streams along primary supply corridors
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 90; i++) {
      particles.push({
        t: Math.random(),
        speed: 0.0014 + Math.random() * 0.0016,
        corridor: i % 7,
        size: 1.5 + Math.random() * 1.5,
        alpha: 0.5 + Math.random() * 0.5
      });
    }
    stateRef.current.particles = particles;
  }, []);

  // Spatial Projection with fixed camera distance and depth calculation
  const projectPoint = useCallback((x, y, z, cx, cy, radiusScale, rx, ry) => {
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;

    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    const px = cx + x1 * radiusScale;
    const py = cy + y2 * radiusScale;

    // Depth factor: 0.40 (back) to 1.0 (front)
    const normalizedDepth = (z2 + 250) / 500;
    const depthFactor = Math.max(0.40, Math.min(1.0, normalizedDepth));

    return {
      x: px,
      y: py,
      z: z2,
      depthFactor
    };
  }, []);

  // Main Canvas Render Loop with Collision-Avoidance Label Solver
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 480);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 480;
    };
    window.addEventListener("resize", handleResize);

    // Geographically calibrated spatial nodes: Wide horizontal distribution & distinct tiers
    const nodes = [
      // === TIER 1: CRITICAL CHOKEPOINTS & MAJOR HUBS (ALWAYS VISIBLE, PROMINENT) ===
      {
        id: "hormuz",
        name: "Strait of Hormuz",
        sub: "58.4% Critical Transit",
        capacity: "21.0 MBD (Total) / 2.80 MBD (India)",
        type: "Chokepoint",
        route: "Persian Gulf → Arabian Sea",
        status: "CRITICAL",
        tier: 1,
        x: -140,
        y: -40,
        z: 10,
        color: "#f43f5e",
        labelOffsetAngle: -90, // Top
        labelDist: 38
      },
      {
        id: "bab_mandeb",
        name: "Bab-el-Mandeb",
        sub: "Red Sea Chokepoint",
        capacity: "6.2 MBD / 0.85 MBD (India)",
        type: "Chokepoint",
        route: "Suez / Red Sea → Kochi",
        status: "SEVERE RISK",
        tier: 1,
        x: -230,
        y: 45,
        z: 35,
        color: "#fbbf24",
        labelOffsetAngle: 140, // Bottom-Left
        labelDist: 40
      },
      {
        id: "malacca",
        name: "Strait of Malacca",
        sub: "Far East Transit",
        capacity: "16.0 MBD / 0.40 MBD (India)",
        type: "Chokepoint",
        route: "Far East / Pacific Sea Lanes",
        status: "MODERATE",
        tier: 1,
        x: 350,
        y: 65,
        z: 40,
        color: "#f43f5e",
        labelOffsetAngle: 25, // Right
        labelDist: 42
      },
      {
        id: "basra",
        name: "Basra",
        sub: "Iraq • 20.3%",
        capacity: "3.50 MBD Offloading",
        type: "Crude Loading Basin",
        route: "Basrah Heavy/Medium to Indian Refiners",
        status: "ELEVATED",
        tier: 1,
        x: -340,
        y: -95,
        z: -25,
        color: "#38bdf8",
        labelOffsetAngle: -140, // Top-Left
        labelDist: 40
      },
      {
        id: "ras_tanura",
        name: "Ras Tanura",
        sub: "Saudi • 14.8%",
        capacity: "6.50 MBD Offloading",
        type: "Crude Loading Basin",
        route: "Arab Light/Heavy to Jamnagar & Vadinar",
        status: "ELEVATED",
        tier: 1,
        x: -315,
        y: -30,
        z: -45,
        color: "#38bdf8",
        labelOffsetAngle: 180, // Left
        labelDist: 42
      },
      {
        id: "fujairah",
        name: "Fujairah",
        sub: "UAE Bypass",
        capacity: "2.00 MBD Habshan Pipeline Bypass",
        type: "Offshore Bypass Terminal",
        route: "Habshan-Fujairah Pipeline to West Coast India",
        status: "MODERATE",
        tier: 1,
        x: -50,
        y: -10,
        z: -15,
        color: "#34d399",
        labelOffsetAngle: 45, // Bottom-Right
        labelDist: 38
      },
      {
        id: "jamnagar",
        name: "Jamnagar / Sikka",
        sub: "33 MMTPA Mega Refinery",
        capacity: "660 kbd Processing (RIL Complex)",
        type: "Refinery Complex & SPM Berth",
        route: "Intake from Hormuz & Fujairah",
        status: "STABLE",
        tier: 1,
        x: 95,
        y: -35,
        z: -20,
        color: "#10b981",
        labelOffsetAngle: 0, // Right
        labelDist: 42
      },
      {
        id: "vadinar",
        name: "Vadinar SPM",
        sub: "20 MMTPA Port",
        capacity: "400 kbd (Nayara Energy)",
        type: "Deepwater Port & Refinery",
        route: "Primary Western Discharge Berth",
        status: "STABLE",
        tier: 1,
        x: 85,
        y: -85,
        z: -15,
        color: "#10b981",
        labelOffsetAngle: -45, // Top-Right
        labelDist: 42
      },
      {
        id: "mangalore",
        name: "Mangalore / Padur",
        sub: "4.00 MMT SPR Caverns",
        capacity: "1.50 MMT (Mangalore) + 2.50 MMT (Padur)",
        type: "Strategic Petroleum Reserve",
        route: "ISPRL Phase-1 Underground Cavern Grid",
        status: "STRATEGIC BUFFER",
        tier: 1,
        x: 145,
        y: 40,
        z: 20,
        color: "#a855f7",
        labelOffsetAngle: -150, // Middle-Left
        labelDist: 40
      },

      // === TIER 2: SECONDARY REFINERIES, PORTS & DIVERSION VECTORS ===
      {
        id: "panipat",
        name: "Panipat",
        sub: "15 MMTPA IOCL",
        capacity: "300 kbd IOCL Northern Complex",
        type: "Inland Refinery",
        route: "Salaya-Mathura-Panipat Pipeline (SMPL)",
        status: "OPERATIONAL",
        tier: 2,
        x: 110,
        y: -130,
        z: 0,
        color: "#fb923c",
        labelOffsetAngle: -90, // Top
        labelDist: 34
      },
      {
        id: "mumbai",
        name: "Mumbai",
        sub: "Jawahar Dweep Berth",
        capacity: "450 kbd (BPCL & HPCL Refineries)",
        type: "Port & Refining Terminal",
        route: "Western Coastal Supply Axis",
        status: "STABLE",
        tier: 2,
        x: 105,
        y: 5,
        z: 5,
        color: "#34d399",
        labelOffsetAngle: 135, // Bottom-Left
        labelDist: 35
      },
      {
        id: "kochi",
        name: "Kochi",
        sub: "15.5 MMTPA SPM",
        capacity: "310 kbd (BPCL Kochi Refinery)",
        type: "Deepwater SPM Berth",
        route: "Red Sea & Cape Direct Intake",
        status: "STABLE",
        tier: 2,
        x: 155,
        y: 90,
        z: 35,
        color: "#34d399",
        labelOffsetAngle: 60, // Bottom-Right
        labelDist: 38
      },
      {
        id: "vizag",
        name: "Visakhapatnam",
        sub: "1.33 MMT SPR",
        capacity: "1.33 MMT SPR Cavern + HPCL Refinery",
        type: "SPR Cavern & Eastern Berth",
        route: "East Coast Supply & Bay of Bengal Intake",
        status: "STRATEGIC BUFFER",
        tier: 2,
        x: 245,
        y: 15,
        z: 10,
        color: "#a855f7",
        labelOffsetAngle: -30, // Top-Right
        labelDist: 38
      },
      {
        id: "paradip",
        name: "Paradip",
        sub: "15 MMTPA Refinery",
        capacity: "300 kbd (IOCL Paradip)",
        type: "Deepwater Offshore SPM",
        route: "Eastern Energy Corridor",
        status: "STABLE",
        tier: 2,
        x: 275,
        y: -40,
        z: -25,
        color: "#34d399",
        labelOffsetAngle: 15, // Right
        labelDist: 38
      },
      {
        id: "primorsk",
        name: "Primorsk / Baltic",
        sub: "Russia Urals",
        capacity: "1.80 MBD Loading",
        type: "Long-Range Supply Basin",
        route: "Atlantic / Mediterranean Corridor to India",
        status: "ELEVATED",
        tier: 2,
        x: -330,
        y: 90,
        z: -30,
        color: "#60a5fa",
        labelOffsetAngle: -140, // Top-Left
        labelDist: 38
      },
      {
        id: "cape_route",
        name: "Cape of Good Hope",
        sub: "+12-14d Diversion",
        capacity: "15.0 MBD Alternative Artery",
        type: "Maritime Bypass Artery",
        route: "Atlantic to Indian Ocean Southern Arc",
        status: "ALTERNATIVE",
        tier: 2,
        x: -210,
        y: 120,
        z: 60,
        color: "#c084fc",
        labelOffsetAngle: 90, // Bottom
        labelDist: 38
      }
    ];

    // Maritime sea lane corridors
    const corridors = [
      { from: "basra", to: "hormuz", stroke: "rgba(56, 189, 248, 0.45)", width: 1.5 },
      { from: "ras_tanura", to: "hormuz", stroke: "rgba(56, 189, 248, 0.45)", width: 1.5 },
      { from: "fujairah", to: "vadinar", stroke: "rgba(56, 189, 248, 0.6)", width: 2 },
      { from: "hormuz", to: "jamnagar", stroke: "rgba(244, 63, 94, 0.85)", width: 2.5, dashed: true },
      { from: "vadinar", to: "panipat", stroke: "rgba(56, 189, 248, 0.5)", width: 1.8, dashed: true },
      { from: "primorsk", to: "vadinar", stroke: "rgba(56, 189, 248, 0.45)", width: 1.5 },
      { from: "bab_mandeb", to: "kochi", stroke: "rgba(251, 191, 36, 0.7)", width: 2 },
      { from: "cape_route", to: "kochi", stroke: "rgba(192, 132, 252, 0.6)", width: 2 },
      { from: "cape_route", to: "vizag", stroke: "rgba(192, 132, 252, 0.45)", width: 1.5 },
      { from: "jamnagar", to: "mumbai", stroke: "rgba(16, 185, 129, 0.5)", width: 1.8 },
      { from: "mumbai", to: "mangalore", stroke: "rgba(16, 185, 129, 0.5)", width: 1.8 },
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

      // Perfectly scale network to fill ~88% of container width and ~78% of height
      const targetWidth = width * 0.88;
      const targetHeight = height * 0.78;
      const baseSpanX = 740;
      const baseSpanY = 260;
      const radiusScale = Math.min(targetWidth / baseSpanX, targetHeight / baseSpanY, 1.45);

      // Smooth continuous auto-rotation: 1 rotation every ~40s
      if (!stateRef.current.isDragging) {
        stateRef.current.rotY += stateRef.current.autoSpeed;
        stateRef.current.rotX = 0.08 + Math.sin(time * 0.15) * 0.015;
      }

      const rx = stateRef.current.rotX;
      const ry = stateRef.current.rotY;

      // 1. Draw Subtle Holographic Geodesic Globe Background
      ctx.save();
      const globeRX = 370 * radiusScale;
      const globeRY = 160 * radiusScale;

      // Atmospheric glow
      const atmosGrad = ctx.createRadialGradient(cx, cy, globeRY * 0.3, cx, cy, globeRX * 1.05);
      atmosGrad.addColorStop(0, "rgba(14, 165, 233, 0.045)");
      atmosGrad.addColorStop(0.7, "rgba(14, 165, 233, 0.012)");
      atmosGrad.addColorStop(1, "transparent");
      ctx.fillStyle = atmosGrad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, globeRX * 1.05, globeRY * 1.05, 0, 0, Math.PI * 2);
      ctx.fill();

      // Latitude and Longitude grid rings
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
      ctx.restore();

      // Project all nodes with depth
      const projectedNodes = {};
      nodes.forEach((node) => {
        const p = projectPoint(node.x, node.y, node.z, cx, cy, radiusScale, rx, ry);
        projectedNodes[node.id] = { ...node, ...p };
      });

      // Check hover hit testing
      const { x: mouseX, y: mouseY } = stateRef.current.mouseCanvasPos;
      let foundHoveredNode = null;

      // 2. Draw Sea Lane Corridors
      corridors.forEach((corr) => {
        const pFrom = projectedNodes[corr.from];
        const pTo = projectedNodes[corr.to];
        if (!pFrom || !pTo) return;

        const isCorrHovered = stateRef.current.hoveredNodeId === corr.from || stateRef.current.hoveredNodeId === corr.to;

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = isCorrHovered ? "#ffffff" : corr.stroke;
        ctx.lineWidth = isCorrHovered ? corr.width + 1.5 : corr.width;
        if (corr.dashed) {
          ctx.setLineDash([5, 4]);
          ctx.lineDashOffset = -time * 20;
        }

        const midX = (pFrom.x + pTo.x) / 2;
        const midY = (pFrom.y + pTo.y) / 2 - 12 * radiusScale;
        ctx.moveTo(pFrom.x, pFrom.y);
        ctx.quadraticCurveTo(midX, midY, pTo.x, pTo.y);
        ctx.stroke();
        ctx.restore();
      });

      // 3. Draw Cargo Particles
      const tracks = [
        [projectedNodes["basra"], projectedNodes["hormuz"], projectedNodes["jamnagar"]],
        [projectedNodes["ras_tanura"], projectedNodes["hormuz"], projectedNodes["jamnagar"]],
        [projectedNodes["bab_mandeb"], projectedNodes["kochi"], projectedNodes["mangalore"]],
        [projectedNodes["cape_route"], projectedNodes["vizag"], projectedNodes["paradip"]],
        [projectedNodes["fujairah"], projectedNodes["vadinar"], projectedNodes["jamnagar"]],
        [projectedNodes["vadinar"], projectedNodes["panipat"], projectedNodes["jamnagar"]],
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
          const midY = (track[0].y + track[1].y) / 2 - 12 * radiusScale;
          px = (1 - localT) * (1 - localT) * track[0].x + 2 * (1 - localT) * localT * midX + localT * localT * track[1].x;
          py = (1 - localT) * (1 - localT) * track[0].y + 2 * (1 - localT) * localT * midY + localT * localT * track[1].y;
        } else {
          const localT = (pt.t - 0.5) * 2;
          const midX = (track[1].x + track[2].x) / 2;
          const midY = (track[1].y + track[2].y) / 2 - 12 * radiusScale;
          px = (1 - localT) * (1 - localT) * track[1].x + 2 * (1 - localT) * localT * midX + localT * localT * track[2].x;
          py = (1 - localT) * (1 - localT) * track[1].y + 2 * (1 - localT) * localT * midY + localT * localT * track[2].y;
        }

        ctx.save();
        const pColor = pt.corridor === 0 || pt.corridor === 1 || pt.corridor === 6 
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
        const isHovered = stateRef.current.hoveredNodeId === node.id;
        const nodeRadius = node.tier === 1 ? (node.type === "Chokepoint" ? 6.5 : 5.5) : 4.5;

        // Check if mouse is near node marker (radius 18px hit target)
        const distToMouse = Math.hypot(node.x - mouseX, node.y - mouseY);
        if (distToMouse < 18) {
          foundHoveredNode = node;
        }

        // Pulsing radar rings
        if (node.type === "Chokepoint" || node.type === "Strategic Petroleum Reserve" || isHovered) {
          const pulse = (Math.sin(time * 3 + node.x * 0.05) + 1) * 3;
          ctx.save();
          ctx.beginPath();
          ctx.strokeStyle = node.color;
          ctx.lineWidth = isHovered ? 2 : 1.2;
          ctx.globalAlpha = 0.45 * node.depthFactor;
          ctx.arc(node.x, node.y, nodeRadius + pulse, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Main Node Core
        ctx.save();
        ctx.globalAlpha = isHovered ? 1.0 : node.depthFactor;
        ctx.fillStyle = isHovered ? "#ffffff" : node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isHovered ? 15 : (node.tier === 1 ? 10 : 6);
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? nodeRadius + 2 : nodeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 5. COLLISION-AVOIDANCE LABEL SYSTEM
      // Measure and construct label boxes
      const rawLabels = Object.values(projectedNodes).map((node) => {
        const isTier1 = node.tier === 1;
        const isHovered = stateRef.current.hoveredNodeId === node.id;

        // Tier 1 labels show Full Name + Subtitle
        // Tier 2 labels show Name only (unless hovered)
        ctx.font = isTier1 ? '700 10px "JetBrains Mono", monospace' : '600 9px "JetBrains Mono", monospace';
        const nameW = ctx.measureText(node.name).width;

        let subW = 0;
        if (isTier1 || isHovered) {
          ctx.font = '500 8.5px "JetBrains Mono", monospace';
          subW = ctx.measureText(node.sub).width;
        }

        const pillW = Math.max(nameW, subW) + (isTier1 ? 18 : 14);
        const pillH = (isTier1 || isHovered) ? 24 : 17;

        // Calculate natural radial offset from node marker
        const rad = (node.labelOffsetAngle * Math.PI) / 180;
        const targetDist = (node.labelDist || 38) * radiusScale;
        const anchorX = node.x + Math.cos(rad) * targetDist;
        const anchorY = node.y + Math.sin(rad) * targetDist;

        // Center pill on anchor position
        const lx = anchorX - pillW / 2;
        const ly = anchorY - pillH / 2;

        return {
          node,
          pillW,
          pillH,
          x: lx,
          y: ly,
          targetX: lx,
          targetY: ly,
          tier: node.tier,
          isHovered,
          depthFactor: node.depthFactor
        };
      });

      // Sort: Tier 1 & hovered nodes get prioritized placement
      rawLabels.sort((a, b) => {
        if (a.isHovered) return -1;
        if (b.isHovered) return 1;
        return a.tier - b.tier;
      });

      // Force-directed bounding-box collision solver (prevents all text overlap with 10px min gap)
      const placedBoxes = [];
      rawLabels.forEach((label) => {
        let bestX = label.x;
        let bestY = label.y;

        // Screen boundary clamping
        bestX = Math.max(10, Math.min(width - label.pillW - 10, bestX));
        bestY = Math.max(10, Math.min(height - label.pillH - 10, bestY));

        // Iterative collision displacement
        for (let iter = 0; iter < 12; iter++) {
          let collisionFound = false;

          for (const placed of placedBoxes) {
            const minGapX = (label.pillW + placed.pillW) / 2 + 10;
            const minGapY = (label.pillH + placed.pillH) / 2 + 8;

            const centerLx = bestX + label.pillW / 2;
            const centerLy = bestY + label.pillH / 2;
            const centerPx = placed.x + placed.pillW / 2;
            const centerPy = placed.y + placed.pillH / 2;

            const dx = centerLx - centerPx;
            const dy = centerLy - centerPy;

            if (Math.abs(dx) < minGapX && Math.abs(dy) < minGapY) {
              collisionFound = true;
              // Push along least overlap axis
              const overlapX = minGapX - Math.abs(dx);
              const overlapY = minGapY - Math.abs(dy);

              if (overlapY <= overlapX) {
                bestY += (dy >= 0 ? 1 : -1) * (overlapY + 4);
              } else {
                bestX += (dx >= 0 ? 1 : -1) * (overlapX + 4);
              }

              bestX = Math.max(10, Math.min(width - label.pillW - 10, bestX));
              bestY = Math.max(10, Math.min(height - label.pillH - 10, bestY));
            }
          }

          if (!collisionFound) break;
        }

        placedBoxes.push({
          x: bestX,
          y: bestY,
          pillW: label.pillW,
          pillH: label.pillH,
          node: label.node,
          tier: label.tier,
          isHovered: label.isHovered,
          depthFactor: label.depthFactor
        });
      });

      stateRef.current.placedLabels = placedBoxes;

      // Render Resolved Labels & Curved Leader Lines
      placedBoxes.forEach((box) => {
        const { node, depthFactor, x: lx, y: ly, pillW, pillH, tier, isHovered } = box;

        // Check if mouse is hovering over this label pill
        if (mouseX >= lx && mouseX <= lx + pillW && mouseY >= ly && mouseY <= ly + pillH) {
          foundHoveredNode = node;
        }

        ctx.save();
        ctx.globalAlpha = isHovered ? 1.0 : (0.45 + 0.55 * depthFactor);

        // Leader Line connecting displaced label to node marker
        const pillCenterX = lx + pillW / 2;
        const pillCenterY = ly + pillH / 2;
        const leaderAttachX = node.x < pillCenterX ? lx : lx + pillW;
        const leaderAttachY = ly + pillH / 2;

        const distToMarker = Math.hypot(node.x - leaderAttachX, node.y - leaderAttachY);
        if (distToMarker > 14) {
          ctx.strokeStyle = isHovered 
            ? "#00C7E8" 
            : tier === 1 
            ? "rgba(56, 189, 248, 0.45)" 
            : "rgba(148, 163, 184, 0.28)";
          ctx.lineWidth = isHovered ? 1.8 : 1;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          // Curved bezier leader line
          const midLeaderX = (node.x + leaderAttachX) / 2;
          const midLeaderY = (node.y + leaderAttachY) / 2 - 4;
          ctx.quadraticCurveTo(midLeaderX, midLeaderY, leaderAttachX, leaderAttachY);
          ctx.stroke();

          // Small anchor dot on node
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Glassmorphic Label Container Card
        ctx.fillStyle = isHovered 
          ? "rgba(11, 26, 47, 0.98)" 
          : "rgba(7, 17, 31, 0.92)";
        ctx.strokeStyle = isHovered
          ? "#00C7E8"
          : node.type === "Chokepoint" 
          ? "rgba(244, 63, 94, 0.7)" 
          : node.type === "Strategic Petroleum Reserve" 
          ? "rgba(168, 85, 247, 0.65)" 
          : node.tier === 1
          ? "rgba(56, 189, 248, 0.5)"
          : "rgba(71, 85, 105, 0.6)";
        ctx.lineWidth = isHovered ? 1.8 : (node.tier === 1 ? 1.2 : 0.9);

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(lx, ly, pillW, pillH, 4.5);
        } else {
          ctx.rect(lx, ly, pillW, pillH);
        }
        ctx.fill();
        ctx.stroke();

        // Status color dot
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(lx + 6.5, ly + (pillH > 20 ? 8.5 : 8.5), 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Primary Name (Sharp crisp white)
        ctx.fillStyle = isHovered ? "#00C7E8" : "#FFFFFF";
        ctx.font = tier === 1 ? '700 10px "JetBrains Mono", monospace' : '600 9px "JetBrains Mono", monospace';
        ctx.fillText(node.name, lx + 12, ly + (pillH > 20 ? 11 : 12));

        // Subtitle info for Tier 1 or hovered nodes
        if (pillH > 20) {
          ctx.fillStyle = node.type === "Chokepoint"
            ? "#fda4af"
            : node.type === "Strategic Petroleum Reserve"
            ? "#d8b4fe"
            : node.color === "#34d399"
            ? "#a7f3d0"
            : "#93c5fd";
          ctx.font = '500 8.5px "JetBrains Mono", monospace';
          ctx.fillText(node.sub, lx + 12, ly + 20);
        }

        ctx.restore();
      });

      // Update hovered state React hook if changed
      if (foundHoveredNode?.id !== stateRef.current.hoveredNodeId) {
        stateRef.current.hoveredNodeId = foundHoveredNode?.id || null;
        setHoveredNode(foundHoveredNode);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [projectPoint]);

  // Drag & Hover interaction handlers
  const handleMouseDown = (e) => {
    stateRef.current.isDragging = true;
    stateRef.current.dragStartX = e.clientX;
    stateRef.current.dragStartY = e.clientY;
    stateRef.current.lastRotY = stateRef.current.rotY;
    stateRef.current.lastRotX = stateRef.current.rotX;
  };

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    stateRef.current.mouseCanvasPos = { x, y };
    setMousePos({ x: e.clientX, y: e.clientY });

    if (!stateRef.current.isDragging) return;
    const dx = e.clientX - stateRef.current.dragStartX;
    const dy = e.clientY - stateRef.current.dragStartY;
    stateRef.current.rotY = stateRef.current.lastRotY + dx * 0.003;
    stateRef.current.rotX = Math.max(-0.12, Math.min(0.22, stateRef.current.lastRotX + dy * 0.0018));
  };

  const handleMouseUp = () => {
    stateRef.current.isDragging = false;
  };

  const handleMouseLeave = () => {
    stateRef.current.isDragging = false;
    stateRef.current.mouseCanvasPos = { x: -100, y: -100 };
    stateRef.current.hoveredNodeId = null;
    setHoveredNode(null);
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

      {/* 1. TOP HEADER: Title, Subtitle, Legend */}
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

      {/* 2. CENTER: Large HD Interactive Spatial Network Viewport */}
      <div 
        className="relative w-full flex-1 min-h-[340px] max-h-[480px] rounded-2xl bg-[#040A14] border border-slate-800/90 overflow-hidden shadow-inner flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="High definition 3D spatial sphere visualization of India crude oil supply network and maritime sea lanes"
          className="w-full h-full select-none"
          style={{ width: "100%", height: "100%", display: "block" }}
        />

        {/* Top-Right Active Status Tag */}
        <div className="absolute top-2.5 right-2.5 pointer-events-none">
          <span className="text-[9px] font-mono text-cyan-300 bg-slate-900/85 px-2.5 py-0.5 rounded border border-cyan-800/60 backdrop-blur-md shadow-xs">
            ● AUTO ORBIT • COLLISION-AWARE LABELS
          </span>
        </div>

        {/* Bottom-Left Simulation Disclaimer */}
        <div className="absolute bottom-2.5 left-2.5 pointer-events-none">
          <span className="text-[9px] font-mono text-slate-400 bg-slate-900/85 px-2.5 py-0.5 rounded border border-slate-800 backdrop-blur-md shadow-xs">
            SIMULATION MODEL • NOT LIVE SCADA
          </span>
        </div>

        {/* Bottom-Right Interaction Hint */}
        <div className="absolute bottom-2.5 right-2.5 pointer-events-none">
          <span className="text-[9px] font-mono text-slate-400 bg-slate-900/85 px-2.5 py-0.5 rounded border border-slate-800 backdrop-blur-md shadow-xs">
            Hover to inspect • Drag to rotate
          </span>
        </div>

        {/* Rich Hover Inspection HUD Card */}
        {hoveredNode && (
          <div 
            className="absolute top-4 left-4 p-3.5 rounded-2xl bg-[#071322]/95 border border-cyan-500/50 shadow-2xl backdrop-blur-md font-mono text-xs text-white max-w-sm space-y-2 pointer-events-none z-30 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between gap-2 border-b border-cyan-800/60 pb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hoveredNode.color }} />
                <strong className="font-bold text-white text-sm">{hoveredNode.name}</strong>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                {hoveredNode.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Type:</span>
                <span className="text-slate-200">{hoveredNode.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Capacity / Flow:</span>
                <span className="text-cyan-300 font-bold">{hoveredNode.capacity}</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-300 pt-1 border-t border-slate-800/80">
              <span className="text-slate-400 block uppercase text-[9px]">Supply Vector / Route:</span>
              <span>{hoveredNode.route}</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. INTEGRATED COMPACT KPI CARDS */}
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

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5 shadow-2xs col-span-2 sm:span-1">
          <span className="text-[9px] text-slate-400 uppercase font-semibold block">Import Dependency</span>
          <span className="text-sm font-bold text-rose-400 block">89.1%</span>
          <span className="text-[9px] text-rose-400/80">4.83 MBD Net Import</span>
        </div>
      </div>

    </section>
  );
}
