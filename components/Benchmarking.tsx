
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AIAnalysis } from '../types';
import { Info, BarChart3 } from 'lucide-react';

interface BenchmarkingProps {
  analysis: AIAnalysis;
}

const Benchmarking: React.FC<BenchmarkingProps> = ({ analysis }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-emerald-50 p-2 rounded-lg">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Industry Comparison</h2>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analysis.benchmarks} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="metric" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="userValue" name="Your Business" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="industryAvg" name="Industry Average" fill="#94a3b8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="md:w-80 space-y-6">
          <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl">
             <h3 className="text-xl font-bold mb-4">Market Position</h3>
             <p className="text-sm leading-relaxed text-emerald-100">
               Your business is currently performing <span className="text-white font-bold">18% above</span> the sector average in liquidity management but trailing in operational efficiency.
             </p>
             <div className="mt-8 pt-8 border-t border-emerald-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-emerald-300">Efficiency Index</span>
                  <span className="text-xs font-bold">72/100</span>
                </div>
                <div className="w-full h-2 bg-emerald-800 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-400" style={{ width: '72%' }} />
                </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Optimization Note</h4>
              <p className="text-xs text-slate-500 mt-1">Reducing accounts payable cycle could improve your benchmark ranking by 15%.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benchmarking;
