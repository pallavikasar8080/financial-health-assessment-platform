
import React, { useState } from 'react';
import { Link2, ShieldCheck, CheckCircle2, AlertCircle, Building2, CreditCard, RefreshCw, Zap } from 'lucide-react';

const INTEGRATIONS = [
  {
    id: 'plaid',
    name: 'Plaid Banking',
    description: 'Connect 12,000+ US/Global banks to fetch real-time transactions.',
    icon: Building2,
    status: 'connected',
    lastSync: '2 hours ago'
  },
  {
    id: 'stripe',
    name: 'Stripe Payments',
    description: 'Import revenue data, refunds, and customer lifetime value metrics.',
    icon: CreditCard,
    status: 'disconnected',
    lastSync: 'Never'
  },
  {
    id: 'gst',
    name: 'Tax/GST Portal',
    description: 'Official government integration for tax filing and compliance checks.',
    icon: ShieldCheck,
    status: 'disconnected',
    lastSync: 'Never'
  }
];

const Integrations: React.FC = () => {
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (id: string) => {
    setConnecting(id);
    setTimeout(() => setConnecting(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">External Integrations</h2>
          <p className="text-slate-500 mt-1">Manage secure data pipelines for real-time health monitoring.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 font-bold text-sm">
          <Zap className="w-4 h-4 fill-emerald-700" />
          Active Data Stream: Stable
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INTEGRATIONS.map((item) => {
          const Icon = item.icon;
          const isConnected = item.status === 'connected';

          return (
            <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${isConnected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                {isConnected ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    LIVE
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                    <AlertCircle className="w-3.5 h-3.5" />
                    INACTIVE
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">{item.description}</p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="text-xs text-slate-400 font-medium">
                  Last Sync: {item.lastSync}
                </div>
                <button
                  onClick={() => handleConnect(item.id)}
                  disabled={connecting === item.id || isConnected}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    isConnected 
                      ? 'bg-slate-50 text-slate-400 cursor-not-allowed' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
                  }`}
                >
                  {connecting === item.id ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : isConnected ? (
                    'Linked'
                  ) : (
                    <>
                      <Link2 className="w-4 h-4" />
                      Connect
                    </>
                  )}
                </button>
              </div>

              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                <Icon className="w-32 h-32" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900 text-white p-10 rounded-[40px] relative overflow-hidden shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-500 p-2 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Enterprise-Grade Security</h3>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              All financial data is encrypted using 256-bit AES at rest and TLS 1.3 in transit. We maintain read-only access to your accounts and never store login credentials.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-wider">
                SOC2 Compliant
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-wider">
                GDPR Ready
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-wider">
                ISO 27001
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 backdrop-blur-sm">
               <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-bold text-indigo-400 uppercase tracking-widest">Encryption Status</span>
                  <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded font-black">VALID</span>
               </div>
               <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 animate-pulse" style={{ width: `${30 + i * 20}%`, animationDelay: `${i * 200}ms` }} />
                    </div>
                  ))}
               </div>
               <div className="mt-8 font-mono text-[10px] text-slate-500 leading-tight">
                  ENCRYPT_SESSION_KEY: AE82-1F92-BC21-992X<br/>
                  CIPHER_SUITE: ECDHE-RSA-AES256-GCM-SHA384<br/>
                  HANDSHAKE_COMPLETE: 200 OK
               </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] -mr-48 -mt-48" />
      </div>
    </div>
  );
};

export default Integrations;
