
import React from 'react';
import { LayoutDashboard, FileText, ShieldAlert, TrendingUp, BarChart3, Upload, ChevronRight, X, Link2, ShieldCheck } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  hasData: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, hasData, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analysis', label: 'AI Analysis', icon: FileText },
    { id: 'risk', label: 'Risk & Credit', icon: ShieldAlert },
    { id: 'forecast', label: 'Forecasting', icon: TrendingUp },
    { id: 'benchmarks', label: 'Benchmarking', icon: BarChart3 },
    { id: 'integrations', label: 'Integrations', icon: Link2 },
    { id: 'upload', label: 'Update Data', icon: Upload },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={`w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col border-r border-slate-800 z-40 transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">FinPulse</span>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id as View);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`} />
                  <span className="flex-1 text-sm font-medium text-left">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 text-indigo-300" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Core Active</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Securely processing financial data with industry-leading encryption and AI analysis.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
