"use client";

import { 
  XIcon, 
  ShieldIcon, 
  InfoIcon, 
  CheckCircleIcon,
  ActivityIcon 
} from "@/components/ui/Icons";
import { generateRiskExplanation, RISK_WEIGHTS } from "@/lib/riskScoringEngine";

export default function RiskExplanationModal({ isOpen, onClose, resilienceResult }) {
  if (!isOpen) return null;

  const explanation = generateRiskExplanation(resilienceResult);
  const { factorExplanations, formula, interpretation, resilienceScore, supplyRiskIndex, riskAssessment } = explanation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0b121e] border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-700/60 text-cyan-400">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-slate-100 font-mono">
                  Transparent Risk Scoring Architecture
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                  EXPLAINABILITY ENGINE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Mathematical breakdown of India&apos;s current Energy Resilience and Supply Risk scores.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Current Score Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">Resilience Score</div>
            <div className="text-2xl font-bold font-mono text-cyan-400 mt-0.5">
              {resilienceScore} <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium mt-1">
              Status: <span className="text-cyan-300 uppercase">{riskAssessment.level}</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">Total Risk Deduction</div>
            <div className="text-2xl font-bold font-mono text-rose-400 mt-0.5">
              -{supplyRiskIndex} <span className="text-xs text-slate-400">pts</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium mt-1">
              Weighted penalty against 100 max
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">System Thresholds</div>
            <div className="text-[11px] font-mono text-slate-300 space-y-0.5 mt-1">
              <div><span className="text-emerald-400">80-100:</span> Strong (Low Risk)</div>
              <div><span className="text-cyan-400">60-79:</span> Moderate Caution</div>
              <div><span className="text-amber-400">40-59:</span> High Vulnerability</div>
              <div><span className="text-rose-400">0-39:</span> Critical Disruption</div>
            </div>
          </div>
        </div>

        {/* Formula Box */}
        <div className="p-4 rounded-xl bg-[#070b12] border border-cyan-900/40 my-4 font-mono text-xs text-cyan-300">
          <div className="text-[10px] uppercase text-cyan-500 font-semibold mb-1 flex items-center gap-1.5">
            <ActivityIcon className="w-3.5 h-3.5" />
            Transparent Scoring Formula
          </div>
          <div className="overflow-x-auto text-slate-200 py-1 font-semibold">
            {formula}
          </div>
        </div>

        {/* Granular Factor Contribution Table */}
        <div className="my-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
            Factor-by-Factor Point Contribution
          </h3>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300 font-mono">
              <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-3">Risk Factor</th>
                  <th className="py-2.5 px-3 text-center">Input Value (0-100)</th>
                  <th className="py-2.5 px-3 text-center">Model Weight</th>
                  <th className="py-2.5 px-3 text-right">Penalty Added</th>
                  <th className="py-2.5 px-3">Operational Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-[#090d16]">
                {factorExplanations.map((factor) => (
                  <tr key={factor.key} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-medium text-slate-100">
                      {factor.label}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-200">
                      {factor.inputValue}
                    </td>
                    <td className="py-3 px-3 text-center text-slate-400">
                      {factor.weightPct}%
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-rose-400">
                      +{factor.contribution.toFixed(2)} pts
                    </td>
                    <td className="py-3 px-3 text-slate-400 text-[11px] font-sans">
                      {factor.rationale}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interpretation Note */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold font-mono text-[11px]">
            <InfoIcon className="w-4 h-4" />
            Executive Interpretation
          </div>
          <p className="text-slate-400 leading-relaxed font-sans">
            {interpretation}
          </p>
          <p className="text-[11px] text-slate-500 font-mono">
            * Note: All weights and risk indicators represent simulated demonstration models for Phase 1.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-xs font-mono transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
}
