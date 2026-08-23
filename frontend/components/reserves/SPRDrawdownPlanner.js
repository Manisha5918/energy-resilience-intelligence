"use client";

import { useState } from "react";
import { generateSPRDrawdownSchedule } from "@/lib/reserveSchedulerEngine";
import { 
  DatabaseIcon, 
  ActivityIcon, 
  AlertTriangleIcon, 
  ShieldIcon, 
  SlidersIcon,
  ZapIcon
} from "@/components/ui/Icons";

export default function SPRDrawdownPlanner() {
  const [horizonDays, setHorizonDays] = useState(30);
  const [dailyDeficitMbd, setDailyDeficitMbd] = useState(1.50);
  const [maxAggregateWithdrawalMbd, setMaxAggregateWithdrawalMbd] = useState(2.50);
  const [reserveFloorPercent, setReserveFloorPercent] = useState(20.0);
  const [refillStartDay, setRefillStartDay] = useState(45);
  const [viewMode, setViewMode] = useState("SUMMARY"); // SUMMARY | DAY_BY_DAY | CAVERNS

  // Run dynamic simulation
  const scheduleData = generateSPRDrawdownSchedule({
    horizonDays,
    dailyDeficitMbd,
    maxAggregateWithdrawalMbd,
    reserveFloorPercent,
    refillStartDay
  });

  const { scheduleDays, warnings, reserveFloorMbbl, totalInitialStockMbbl, totalCapacityMbbl, disclaimer } = scheduleData;

  // Selected sample days for clean chart / table representation
  const sampleSteps = horizonDays === 30 ? 6 : horizonDays === 60 ? 10 : 15;
  const sampledDays = scheduleDays.filter((_, idx) => idx % Math.max(1, Math.floor(scheduleDays.length / sampleSteps)) === 0 || idx === scheduleDays.length - 1);

  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-6">
      
      {/* Header & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              ISPRL Day-by-Day Drawdown & Refill Scheduler
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
              SIMULATED DYNAMICS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Simulate day-by-day discharge trajectories across Vizag, Mangalore, and Padur caverns subject to aggregate 2.50 MBD pump ceiling and reserve floor rules.
          </p>
        </div>

        {/* Horizon Quick Toggles */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          {[30, 60, 90].map((days) => (
            <button
              key={days}
              onClick={() => setHorizonDays(days)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer min-h-[36px] ${
                horizonDays === days
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              aria-label={`Select ${days} Days Horizon`}
            >
              {days} Days
            </button>
          ))}
        </div>
      </div>

      {/* Mandatory Demo Data Notice */}
      <div className="rounded-xl p-3.5 bg-amber-50 border border-amber-200 flex items-start gap-3">
        <AlertTriangleIcon className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 space-y-0.5">
          <span className="font-bold tracking-wide uppercase font-mono text-[11px] block">
            {disclaimer}
          </span>
          <p className="text-amber-800/90 leading-relaxed">
            Statutory cavern nameplates (5.33 MMT / 39.18 Mbbl) reflect official ISPRL Phase-I project disclosures. Sub-hourly SCADA telemetry and day-to-day valve discharge orders are modeled decision-support dynamics pending sovereign integration.
          </p>
        </div>
      </div>

      {/* Warning State Triggers */}
      {warnings.length > 0 && (
        <div className="space-y-2">
          {warnings.map((warn) => (
            <div
              key={warn.id}
              className={`rounded-xl p-3.5 border flex items-start gap-2.5 text-xs font-mono ${
                warn.level === "CRITICAL"
                  ? "bg-rose-50 border-rose-200 text-rose-900"
                  : warn.level === "HIGH"
                  ? "bg-amber-50 border-amber-200 text-amber-900"
                  : "bg-sky-50 border-sky-200 text-sky-900"
              }`}
            >
              <AlertTriangleIcon className={`w-4 h-4 shrink-0 mt-0.5 ${
                warn.level === "CRITICAL" ? "text-rose-600" : "text-amber-600"
              }`} />
              <div>
                <span className="font-bold block">{warn.title}</span>
                <p className="mt-0.5 opacity-90">{warn.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Parameter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
        
        {/* 1. Deficit Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-600 font-semibold">Supply Deficit (MBD):</span>
            <span className="font-bold text-slate-900">{dailyDeficitMbd} MBD</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="3.5"
            step="0.1"
            value={dailyDeficitMbd}
            onChange={(e) => setDailyDeficitMbd(parseFloat(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <span className="text-[10px] text-slate-500">Unmet import volume</span>
        </div>

        {/* 2. Pump Cap Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-600 font-semibold">Max Pump Cap (MBD):</span>
            <span className="font-bold text-slate-900">{maxAggregateWithdrawalMbd} MBD</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="3.5"
            step="0.25"
            value={maxAggregateWithdrawalMbd}
            onChange={(e) => setMaxAggregateWithdrawalMbd(parseFloat(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <span className="text-[10px] text-amber-700 font-semibold block">MODEL ASSUMPTION — VERIFY WITH ISPRL</span>
        </div>

        {/* 3. Reserve Floor Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-600 font-semibold">Reserve Floor (%):</span>
            <span className="font-bold text-slate-900">{reserveFloorPercent}% ({reserveFloorMbbl} Mbbl)</span>
          </div>
          <input
            type="range"
            min="10"
            max="40"
            step="5"
            value={reserveFloorPercent}
            onChange={(e) => setReserveFloorPercent(parseFloat(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <span className="text-[10px] text-slate-500">Statutory buffer floor</span>
        </div>

        {/* 4. Refill Start Day */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-600 font-semibold">Refill Start Day:</span>
            <span className="font-bold text-slate-900">Day {refillStartDay}</span>
          </div>
          <input
            type="range"
            min="15"
            max="90"
            step="5"
            value={refillStartDay}
            onChange={(e) => setRefillStartDay(parseInt(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <span className="text-[10px] text-slate-500">Shipment arrival window</span>
        </div>
      </div>

      {/* Cavern Trajectories Visualization Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Vizag */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-900">Visakhapatnam (1.33 MMT)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">East Coast</span>
          </div>
          <div className="flex items-baseline justify-between text-xs font-mono">
            <span className="text-slate-500">Remaining:</span>
            <span className="font-bold text-slate-900">
              {scheduleDays[scheduleDays.length - 1].vizagStockMbbl} / 9.78 Mbbl
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (scheduleDays[scheduleDays.length - 1].vizagStockMbbl / 9.78) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500 block">
            Max discharge: 0.65 MBD | Linked to HPCL Visakh
          </span>
        </div>

        {/* Mangalore */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-900">Mangalore (1.50 MMT)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">West Coast</span>
          </div>
          <div className="flex items-baseline justify-between text-xs font-mono">
            <span className="text-slate-500">Remaining:</span>
            <span className="font-bold text-slate-900">
              {scheduleDays[scheduleDays.length - 1].mangaloreStockMbbl} / 11.03 Mbbl
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (scheduleDays[scheduleDays.length - 1].mangaloreStockMbbl / 11.03) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500 block">
            Max discharge: 0.75 MBD | Linked to MRPL & SPM
          </span>
        </div>

        {/* Padur */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-900">Padur (2.50 MMT)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">West Coast</span>
          </div>
          <div className="flex items-baseline justify-between text-xs font-mono">
            <span className="text-slate-500">Remaining:</span>
            <span className="font-bold text-slate-900">
              {scheduleDays[scheduleDays.length - 1].padurStockMbbl} / 18.37 Mbbl
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (scheduleDays[scheduleDays.length - 1].padurStockMbbl / 18.37) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500 block">
            Max discharge: 1.10 MBD | Largest Phase-1 Cavern
          </span>
        </div>
      </div>

      {/* Day-by-Day Schedule Time-Series Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider">
            {horizonDays}-Day Step-by-Step Drawdown Trajectory
          </h4>
          <span className="text-[11px] font-mono text-slate-500">
            Initial Stock: {totalInitialStockMbbl} Mbbl | Floor: {reserveFloorMbbl} Mbbl
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="py-2 px-3 font-semibold">Day</th>
                <th className="py-2 px-3 font-semibold">Deficit (MBD)</th>
                <th className="py-2 px-3 font-semibold">SPR Release</th>
                <th className="py-2 px-3 font-semibold">Net Deficit</th>
                <th className="py-2 px-3 font-semibold">Total Stock</th>
                <th className="py-2 px-3 font-semibold">Cover Remaining</th>
                <th className="py-2 px-3 font-semibold">Vizag</th>
                <th className="py-2 px-3 font-semibold">Mangalore</th>
                <th className="py-2 px-3 font-semibold">Padur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {sampledDays.map((d) => {
                const isFloorBreached = d.totalRemainingStockMbbl < reserveFloorMbbl;
                return (
                  <tr key={d.day} className={`hover:bg-slate-50 ${isFloorBreached ? "bg-rose-50/40 text-rose-950 font-semibold" : ""}`}>
                    <td className="py-2 px-3 font-bold text-slate-900">Day {d.day}</td>
                    <td className="py-2 px-3">{d.requiredSupplyDeficitMbd} MBD</td>
                    <td className="py-2 px-3 text-emerald-700 font-bold">-{d.sprReleaseMbd} MBD</td>
                    <td className="py-2 px-3 text-slate-600">{d.remainingDeficitMbd} MBD</td>
                    <td className="py-2 px-3 font-bold text-slate-900">{d.totalRemainingStockMbbl} Mbbl</td>
                    <td className="py-2 px-3">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        d.daysOfCoverRemaining < 3.0 ? "bg-rose-100 text-rose-800" :
                        d.daysOfCoverRemaining < 6.0 ? "bg-amber-100 text-amber-800" :
                        "bg-emerald-100 text-emerald-800"
                      }`}>
                        {d.daysOfCoverRemaining} days
                      </span>
                    </td>
                    <td className="py-2 px-3">{d.vizagStockMbbl}</td>
                    <td className="py-2 px-3">{d.mangaloreStockMbbl}</td>
                    <td className="py-2 px-3">{d.padurStockMbbl}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
