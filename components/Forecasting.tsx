
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AIAnalysis } from '../types';
import { TrendingUp, Sparkles, ChevronRight } from 'lucide-react';

interface ForecastProps {
  analysis: AIAnalysis;
}

const Forecasting: React.FC<ForecastProps> = ({ analysis }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">3-Month Strategic Forecast</h2>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analysis.forecast}>
                <defs>
                  <linearGradient id="colorPredRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Area 
                  type="monotone" 
                  dataKey="predictedRevenue" 
                  name="Projected Revenue"
                  stroke="#4f46e5" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorPredRev)" 
                  strokeDasharray="5 5"
                />
                <Area 
                  type="monotone" 
                  dataKey="predictedExpenses" 
                  name="Projected Expenses"
                  stroke="#94a3b8" 
                  strokeWidth={3} 
                  fill="transparent" 
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-black uppercase tracking-widest text-indigo-300">AI Recommendation</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Optimization Strategy</h3>
            <div className="space-y-4">
              {analysis.costOptimization.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/10 p-4 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors cursor-default">
                  <div className="bg-indigo-500 rounded-full p-1 mt-1">
                    <ChevronRight className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-sm font-medium leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full -mb-24 -mr-24 blur-2xl" />
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Financial Intelligence Summary</h3>
          <div className="prose prose-slate prose-sm max-w-none">
            <p className="text-slate-600 leading-relaxed font-medium mb-6">
              {analysis.summary}
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-indigo-500">
               <span className="text-[10px] uppercase font-black text-indigo-600 tracking-wider mb-2 block">Strategic Business Advice</span>
               <p className="text-slate-800 leading-relaxed font-semibold text-lg italic">
                 {analysis.detailedInsights}
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecasting;
