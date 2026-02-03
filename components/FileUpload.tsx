
import React, { useState, useRef } from 'react';
import { Upload, FileCode, CheckCircle2, Loader2, Info, FileSpreadsheet, Sparkles, FileText } from 'lucide-react';
import { FinancialData } from '../types';
import { INDUSTRIES } from '../constants';
import { extractFinancials } from '../services/geminiService';

interface FileUploadProps {
  onDataSubmit: (data: FinancialData) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataSubmit, isLoading }) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [formData, setFormData] = useState<FinancialData>({
    revenue: 0,
    expenses: 0,
    accountsReceivable: 0,
    accountsPayable: 0,
    inventory: 0,
    taxPaid: 0,
    loans: 0,
    industry: 'Retail',
    businessName: ''
  });



  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    try {
  const extractedData = await extractFinancials(file);

  // ✅ If AI returns nothing, DO NOT throw error
  if (!extractedData || Object.keys(extractedData).length === 0) {
    console.warn("AI extraction failed, using manual entry");
    return;
  }

  setFormData(prev => ({
    ...prev,
    businessName: extractedData.businessName ?? prev.businessName,
    industry: extractedData.industry ?? prev.industry,
    revenue: extractedData.revenue ?? prev.revenue,
    expenses: extractedData.expenses ?? prev.expenses,
    accountsReceivable: extractedData.accountsReceivable ?? prev.accountsReceivable,
    accountsPayable: extractedData.accountsPayable ?? prev.accountsPayable,
    inventory: extractedData.inventory ?? prev.inventory,
    taxPaid: extractedData.taxPaid ?? prev.taxPaid,
    loans: extractedData.loans ?? prev.loans,
  }));
} catch (err) {
  console.error("Hard failure during extraction:", err);

  // ✅ DO NOT BLOCK USER
  
}
finally {
      setIsExtracting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDataSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Financial Health Assessment</h1>
        <p className="text-slate-500 text-lg">Securely analyze your business performance with advanced AI modeling</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
         <label
  className={`bg-white p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer group flex flex-col items-center justify-center text-center relative overflow-hidden ${
    isExtracting
      ? 'border-indigo-400 bg-indigo-50/30'
      : 'border-slate-200 hover:border-indigo-400'
  }`}
>
  {isExtracting && (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-10 pointer-events-none">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-2" />
      <p className="text-sm font-bold text-indigo-600 px-4">
        AI Analyzing Document...
      </p>
    </div>
  )}

  <div className="bg-slate-50 p-4 rounded-2xl group-hover:bg-indigo-50 transition-colors mb-4">
    <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-600" />
  </div>

  <h3 className="text-lg font-bold text-slate-900">Upload Statements</h3>
  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
    Drop your bank statement, PDF, CSV, or ledger export here to auto-fill.
  </p>

  <div className="mt-4 flex gap-2">
    <FileText className="w-5 h-5 text-slate-400" />
    <FileSpreadsheet className="w-5 h-5 text-slate-400" />
    <FileCode className="w-5 h-5 text-slate-400" />
  </div>

  <input
    type="file"
    accept=".pdf,.csv,.txt,.json,.xlsx"
    onChange={handleFileChange}
     className="absolute inset-0 opacity-0 cursor-pointer"
  />
</label>
 
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-4">
                 <Info className="w-5 h-5 text-indigo-400" />
                 <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Smart Extraction</span>
               </div>
               <p className="text-sm leading-relaxed text-slate-300">
                 Our AI understands PDFs directly. It reads tables, line items, and headers to identify key performance indicators automatically.
               </p>
             </div>
             <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          </div>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 relative">
            {formData.businessName && !isExtracting && (
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-2 shadow-lg animate-bounce">
                <Sparkles className="w-3 h-3" />
                AI-EXTRACTED DATA
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Business Name</label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="e.g. Acme Corp"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Monthly Revenue ($)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.revenue}
                  onChange={(e) => setFormData({...formData, revenue: Number(e.target.value)})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Monthly Expenses ($)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.expenses}
                  onChange={(e) => setFormData({...formData, expenses: Number(e.target.value)})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Existing Debt ($)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.loans}
                  onChange={(e) => setFormData({...formData, loans: Number(e.target.value)})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tax Paid (Annual) ($)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.taxPaid}
                  onChange={(e) => setFormData({...formData, taxPaid: Number(e.target.value)})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isExtracting}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-indigo-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Generating Health Intelligence...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  Analyze Financial Health
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
