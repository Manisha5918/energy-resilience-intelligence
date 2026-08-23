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
      <div className="command-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-slate-600 font-semibold flex items-center gap-1.5">
            <GlobeIcon className="w-4 h-4 text-purple-600" />
            Events Ingested
          </span>
          <span className="text-[10px] font-mono text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold">
            MULTI-SOURCE
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-slate-900">{totalEvents}</span>
          <span className="text-xs text-slate-500 font-mono">active threat signals</span>
        </div>
        <div className="text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-100">
          News • AIS • Sanctions • Markets
        </div>
      </div>

      {/* 2. High-Risk Signals */}
      <div className="command-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-slate-600 font-semibold flex items-center gap-1.5">
            <AlertTriangleIcon className="w-4 h-4 text-rose-600" />
            High / Critical Threats
          </span>
          <span className="text-[10px] font-mono text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-bold">
            ELEVATED
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-rose-700">{highRiskCount}</span>
          <span className="text-xs text-slate-500 font-mono">requiring monitoring</span>
        </div>
        <div className="text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-100">
          Bab-el-Mandeb &amp; Hormuz alerts
        </div>
      </div>

      {/* 3. Affected Shipping Corridors */}
      <div className="command-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-slate-600 font-semibold flex items-center gap-1.5">
            <ActivityIcon className="w-4 h-4 text-sky-600" />
            Affected Corridors
          </span>
          <span className="text-[10px] font-mono text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold">
            CHOKEPOINTS
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-sky-700">{affectedCorridorsCount}</span>
          <span className="text-xs text-slate-500 font-mono">maritime arteries</span>
        </div>
        <div className="text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-100">
          Strait of Hormuz • Red Sea • Cape
        </div>
      </div>

      {/* 4. Affected Sovereign Suppliers */}
      <div className="command-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-slate-600 font-semibold flex items-center gap-1.5">
            <ShieldIcon className="w-4 h-4 text-amber-600" />
            Exposed Suppliers
          </span>
          <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
            SOVEREIGN
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-amber-700">{affectedSuppliersCount}</span>
          <span className="text-xs text-slate-500 font-mono">nations with signals</span>
        </div>
        <div className="text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-100">
          Russia • Iraq • Saudi Arabia • UAE
        </div>
      </div>

    </div>
  );
}
