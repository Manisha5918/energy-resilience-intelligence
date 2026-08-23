"use client";

import { ShieldIcon, ActivityIcon, AlertTriangleIcon, InfoIcon } from "@/components/ui/Icons";

export default function RiskImpactPanel({ riskImpact }) {
  const { baselineResilience, adjustedResilience, scoreDelta, factorDeltas, interpretation } = riskImpact;

  return (
    <div className="command-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-semibold text-slate-900 font-heading tracking-wide">
              Dynamic Risk Engine Integration &amp; Score Impact
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-semibold">
              INTELLIGENCE-ADJUSTED RESILIENCE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Demonstrates real-time modulation of the 5-factor mathematical model driven by ingested threat signals.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 self-start sm:self-auto font-semibold">
          DELTA: <span className="text-rose-700 font-bold">{scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta} PTS</span>
        </div>
      </div>

      {/* Side-by-Side Overall Score Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Baseline Resilience</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-0.5">
            {baselineResilience.resilienceScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <div className="text-[11px] font-mono text-sky-700 font-semibold uppercase mt-1">
            {baselineResilience.riskAssessment.level}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Intelligence-Adjusted Score</span>
          <div className="text-2xl font-bold font-mono text-rose-700 mt-0.5">
            {adjustedResilience.resilienceScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <div className="text-[11px] font-mono text-rose-700 font-semibold uppercase mt-1">
            {adjustedResilience.riskAssessment.level}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Threat Penalty</span>
          <div className="text-2xl font-bold font-mono text-amber-700 mt-0.5">
            {scoreDelta} <span className="text-xs text-slate-500 font-normal">points</span>
          </div>
          <div className="text-[11px] text-slate-600 mt-1 font-sans">
            Applied dynamically via recency-weighted signals
          </div>
        </div>
      </div>

      {/* Factor Progression Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-100 text-[10px] uppercase text-slate-600 border-b border-slate-200">
            <tr>
              <th className="py-3 px-3.5">Risk Factor (Weight %)</th>
              <th className="py-3 px-2.5 text-center">Baseline</th>
              <th className="py-3 px-2.5 text-center">Intelligence Adjusted</th>
              <th className="py-3 px-2.5 text-center">Delta Impact</th>
              <th className="py-3 px-3.5">Signal Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {factorDeltas.map((f, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3.5 font-semibold text-slate-900">{f.factor}</td>
                <td className="py-3 px-2.5 text-center text-slate-600 font-mono">{f.baseline}</td>
                <td className="py-3 px-2.5 text-center font-bold text-slate-900 font-mono">{f.adjusted}</td>
                <td className={`py-3 px-2.5 text-center font-bold font-mono ${f.delta > 0 ? "text-rose-700" : "text-slate-500"}`}>
                  {f.delta > 0 ? `+${f.delta}` : "0"}
                </td>
                <td className="py-3 px-3.5 text-xs text-slate-600 font-sans leading-relaxed">{f.rationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Executive Interpretation Box */}
      <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200 text-xs text-slate-800 font-sans leading-relaxed space-y-1">
        <span className="font-mono text-xs uppercase font-bold text-sky-900 block">
          Executive Interpretation:
        </span>
        <p className="text-slate-700 leading-relaxed">{interpretation}</p>
      </div>

    </div>
  );
}
