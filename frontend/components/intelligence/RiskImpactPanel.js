"use client";

import { ShieldIcon, ActivityIcon, AlertTriangleIcon, InfoIcon } from "@/components/ui/Icons";

export default function RiskImpactPanel({ riskImpact }) {
  const { baselineResilience, adjustedResilience, scoreDelta, factorDeltas, interpretation } = riskImpact;

  return (
    <div className="command-card rounded-xl p-5 border border-slate-800 space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wide">
              Dynamic Risk Engine Integration & Score Impact
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              INTELLIGENCE-ADJUSTED RESILIENCE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Demonstrates real-time modulation of the 5-factor mathematical model driven by ingested threat signals.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          DELTA: <span className="text-rose-400 font-bold">{scoreDelta} PTS</span>
        </div>
      </div>

      {/* Side-by-Side Overall Score Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-500">Baseline Resilience</span>
          <div className="text-2xl font-bold font-mono text-slate-300 mt-0.5">
            {baselineResilience.resilienceScore} <span className="text-xs text-slate-500">/ 100</span>
          </div>
          <div className="text-[11px] font-mono text-cyan-400 uppercase mt-1">
            {baselineResilience.riskAssessment.level}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-slate-500">Intelligence-Adjusted Score</span>
          <div className="text-2xl font-bold font-mono text-rose-400 mt-0.5">
            {adjustedResilience.resilienceScore} <span className="text-xs text-slate-500">/ 100</span>
          </div>
          <div className="text-[11px] font-mono text-rose-400 uppercase mt-1">
            {adjustedResilience.riskAssessment.level}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-slate-500">Threat Penalty</span>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-0.5">
            {scoreDelta} <span className="text-xs text-slate-500">points</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-sans">
            Applied dynamically via recency-weighted signals
          </div>
        </div>
      </div>

      {/* Factor Progression Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead className="bg-slate-900/90 text-[10px] uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Risk Factor (Weight %)</th>
              <th className="py-2.5 px-2 text-center">Baseline</th>
              <th className="py-2.5 px-2 text-center">Intelligence Adjusted</th>
              <th className="py-2.5 px-2 text-center">Delta Impact</th>
              <th className="py-2.5 px-3">Signal Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-[#070b12]">
            {factorDeltas.map((f, idx) => (
              <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-100">{f.factor}</td>
                <td className="py-2.5 px-2 text-center text-slate-400">{f.baseline}</td>
                <td className="py-2.5 px-2 text-center font-bold text-white">{f.adjusted}</td>
                <td className={`py-2.5 px-2 text-center font-bold ${f.delta > 0 ? "text-rose-400" : "text-slate-400"}`}>
                  {f.delta > 0 ? `+${f.delta}` : "0"}
                </td>
                <td className="py-2.5 px-3 text-[11px] text-slate-400 font-sans">{f.rationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-lg bg-[#060a12] border border-cyan-900/50 text-xs text-slate-300 font-sans leading-relaxed">
        <span className="font-mono text-[10px] uppercase font-bold text-cyan-400 block mb-1">
          Executive Interpretation:
        </span>
        {interpretation}
      </div>

    </div>
  );
}
