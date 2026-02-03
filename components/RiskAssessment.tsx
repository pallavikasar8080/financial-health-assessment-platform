
import React from 'react';
import { AIAnalysis } from '../types';
import { ShieldAlert, CheckCircle2, AlertTriangle, CreditCard, Banknote, Landmark } from 'lucide-react';

interface RiskProps {
  analysis: AIAnalysis;
}

const RiskAssessment: React.FC<RiskProps> = ({ analysis }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-rose-50 p-2 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-rose-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Risk Profile Analysis</h2>
          </div>
          
          <div className="space-y-4">
            {analysis.risks.map((risk, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-rose-50/50 border border-rose-100 group hover:border-rose-200 transition-colors">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <p className="text-slate-700 font-medium leading-relaxed">{risk}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/3 bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-xl font-bold mb-6">Credit Standing</h2>
          <div className="flex flex-col items-center text-center py-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-slate-800"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * analysis.healthScore) / 100}
                  className="text-indigo-500 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black">{analysis.healthScore}</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest">Score</span>
              </div>
            </div>
            <div className={`mt-8 px-6 py-2 rounded-full font-black uppercase text-sm tracking-wider ${
              analysis.creditworthiness === 'High' ? 'bg-emerald-500' : 'bg-amber-500'
            }`}>
              {analysis.creditworthiness} Creditworthiness
            </div>
            <p className="mt-6 text-slate-400 text-sm italic leading-relaxed">
              Based on cash flow volatility, debt-to-income ratios, and sector stability benchmarks.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Personalized Financial Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analysis.recommendations.map((rec, i) => (
            <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  {i === 0 ? <Banknote className="w-5 h-5 text-indigo-600" /> :
                   i === 1 ? <CreditCard className="w-5 h-5 text-indigo-600" /> :
                   <Landmark className="w-5 h-5 text-indigo-600" />}
                </div>
                <h4 className="font-bold text-slate-900">{rec.provider}</h4>
              </div>
              <h3 className="text-indigo-600 font-bold mb-3">{rec.product}</h3>
              <p className="text-sm text-slate-500 flex-1 leading-relaxed mb-6">
                {rec.reason}
              </p>
              <button className="w-full bg-white border border-slate-200 text-slate-900 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-colors text-sm">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
