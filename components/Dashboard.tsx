
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FinancialData, AIAnalysis, Metric, View } from '../types';
import { MOCK_DATA } from '../constants';
import { TrendingUp, TrendingDown, DollarSign, Wallet, ArrowUpRight, ArrowDownRight, Activity, ShieldAlert, FileText } from 'lucide-react';

interface DashboardProps {
  data: FinancialData;
  analysis: AIAnalysis;
  onNavigate: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, analysis, onNavigate }) => {
  const metrics: Metric[] = [
    { name: 'Monthly Revenue', value: `$${data.revenue.toLocaleString()}`, change: '+12.5%', trend: 'up' },
    { name: 'Monthly Expenses', value: `$${data.expenses.toLocaleString()}`, change: '-2.1%', trend: 'down' },
    { name: 'Receivables', value: `$${data.accountsReceivable.toLocaleString()}`, change: '+5.4%', trend: 'up' },
    { name: 'Profit Margin', value: `${((data.revenue - data.expenses) / data.revenue * 100).toFixed(1)}%`, change: '+3.2%', trend: 'up' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Enterprise Overview</h1>
          <p className="text-slate-500 mt-1">Real-time health pulse for {data.businessName}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-500 font-medium uppercase">Financial Health Score</span>
            <div className="flex items-center gap-3">
               <span className="text-3xl font-black text-indigo-600">{analysis.healthScore}</span>
               <div className="w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-indigo-600 transition-all duration-1000"
                   style={{ width: `${analysis.healthScore}%` }}
                 />
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg">
                {m.name.includes('Revenue') ? <DollarSign className="w-5 h-5 text-indigo-600" /> : 
                 m.name.includes('Expenses') ? <Wallet className="w-5 h-5 text-indigo-600" /> :
                 <Activity className="w-5 h-5 text-indigo-600" />}
              </div>
              <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
                m.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {m.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {m.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{m.name}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">Cash Flow Trends</h2>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#94a3b8" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Insights</h2>
          <div className="space-y-4 flex-1">
            {analysis.risks.slice(0, 3).map((risk, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="bg-rose-100 text-rose-600 p-2 rounded-xl h-fit">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Potential Risk</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{risk}</p>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <h4 className="text-sm font-bold text-slate-900 mb-3">Credit Health</h4>
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                <span className="text-sm text-indigo-700 font-semibold">Stability Rating</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  analysis.creditworthiness === 'High' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {analysis.creditworthiness}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('analysis')}
            className="mt-8 w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group"
          >
            <FileText className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            Generate Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
