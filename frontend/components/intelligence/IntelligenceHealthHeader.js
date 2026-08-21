"use client";

import { GlobeIcon, ActivityIcon, ShieldIcon, AlertTriangleIcon } from "@/components/ui/Icons";

export default function IntelligenceHealthHeader({ 
  totalEvents, 
  highRiskCount, 
  affectedCorridorsCount, 
  affectedSuppliersCount,
  status 
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. Ingested Events */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
            <GlobeIcon className="w-3.5 h-3.5 text-purple-400" />
            Events Ingested
          </span>
          <span className="text-[9px] font-mono text-purple-300 bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-800">
            MULTI-SOURCE
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-white">{totalEvents}</span>
          <span className="text-xs text-slate-400 font-mono">active threat signals</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-slate-500">
          News • AIS • Sanctions • Markets
        </div>
      </div>

      {/* 2. High-Risk Signals */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
            <AlertTriangleIcon className="w-3.5 h-3.5 text-rose-400" />
            High / Critical Threats
          </span>
          <span className="text-[9px] font-mono text-rose-400 bg-rose-950/80 px-1.5 py-0.5 rounded border border-rose-800">
            ELEVATED
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-rose-400">{highRiskCount}</span>
          <span className="text-xs text-slate-400 font-mono">requiring monitoring</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-slate-500">
          Bab-el-Mandeb & Hormuz naval alerts
        </div>
      </div>

      {/* 3. Affected Shipping Corridors */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
            <ActivityIcon className="w-3.5 h-3.5 text-cyan-400" />
            Affected Corridors
          </span>
          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800">
            CHOKEPOINTS
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-cyan-300">{affectedCorridorsCount}</span>
          <span className="text-xs text-slate-400 font-mono">maritime arteries</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-slate-500">
          Strait of Hormuz • Red Sea • Cape Route
        </div>
      </div>

      {/* 4. Affected Sovereign Suppliers */}
      <div className="command-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
            <ShieldIcon className="w-3.5 h-3.5 text-amber-400" />
            Exposed Suppliers
          </span>
          <span className="text-[9px] font-mono text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800">
            SOVEREIGN
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-amber-300">{affectedSuppliersCount}</span>
          <span className="text-xs text-slate-400 font-mono">nations with active signals</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-slate-500">
          Russia • Iraq • Saudi Arabia • UAE
        </div>
      </div>

    </div>
  );
}
