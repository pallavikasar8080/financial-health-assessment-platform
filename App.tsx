
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FileUpload from './components/FileUpload';
import RiskAssessment from './components/RiskAssessment';
import Forecasting from './components/Forecasting';
import Benchmarking from './components/Benchmarking';
import Integrations from './components/Integrations';
import { analyzeFinancials } from './services/geminiService';
import { FinancialData, AIAnalysis, View } from './types';
import { Menu, X, Bell, User, AlertCircle, UploadCloud, Download, ArrowLeft, ShieldCheck, Check, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('upload');
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set professional document title for PDF file naming
  useEffect(() => {
    if (financialData) {
      const dateStr = new Date().toISOString().split('T')[0];
      document.title = `FinPulse_Report_${financialData.businessName.replace(/\s+/g, '_')}_${dateStr}`;
    } else {
      document.title = 'FinPulse SME Health';
    }
  }, [financialData]);

  const handleDataSubmit = async (data: FinancialData) => {
    setIsLoading(true);
    try {
      const results = await analyzeFinancials(data);
      setFinancialData(data);
      setAnalysis(results);
      setCurrentView('dashboard');
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPDF = () => {
    // 1. Immediately update UI to show "Processing"
    setIsExporting(true);
    
    // 2. We use a minimal delay to allow the React state change to paint to the screen
    // then trigger the native print dialog. This is the most reliable way.
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 150);
  };

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-200 rounded-full animate-spin border-t-indigo-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-indigo-600 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900">FinPulse AI is thinking...</h2>
            <p className="text-slate-500 mt-1">Analyzing transactions and generating benchmarks</p>
          </div>
        </div>
      );
    }

    if (currentView !== 'upload' && currentView !== 'integrations' && (!financialData || !analysis)) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center max-w-md mx-auto">
          <div className="bg-amber-50 p-4 rounded-full mb-6">
            <AlertCircle className="w-12 h-12 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Analysis Data Missing</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            We need your financial statements to generate this report. Please upload your data first.
          </p>
          <button 
            onClick={() => setCurrentView('upload')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <UploadCloud className="w-5 h-5" />
            Go to Upload
          </button>
        </div>
      );
    }

    if (currentView === 'upload') {
      return <FileUpload onDataSubmit={handleDataSubmit} isLoading={isLoading} />;
    }

    if (currentView === 'integrations') {
      return <Integrations />;
    }

    const data = financialData!;
    const results = analysis!;

    switch (currentView) {
      case 'dashboard':
        return <Dashboard data={data} analysis={results} onNavigate={setCurrentView} />;
      case 'risk':
        return <RiskAssessment analysis={results} />;
      case 'forecast':
        return <Forecasting analysis={results} />;
      case 'benchmarks':
        return <Benchmarking analysis={results} />;
      case 'analysis':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between print:hidden">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
              <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-md min-w-[180px] justify-center ${
                  isExporting ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {isExporting ? 'Generating...' : 'Export PDF'}
              </button>
            </div>

            {/* Targeted Report Container */}
            <div className="report-to-print bg-white p-12 rounded-[40px] border border-slate-200 shadow-xl max-w-4xl mx-auto print:shadow-none print:border-none print:p-0 print:max-w-none print:w-full print:m-0 print:block">
               <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8">
                 <div>
                   <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Strategic Intelligence Report</h2>
                   <p className="text-slate-500 font-medium">Detailed Analysis for {data.businessName}</p>
                 </div>
                 <div className="bg-slate-900 text-white p-4 rounded-2xl text-center min-w-[120px] print:bg-slate-900 print:text-white">
                    <span className="block text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Health Score</span>
                    <span className="text-3xl font-black">{results.healthScore}</span>
                 </div>
               </div>

               <div className="grid grid-cols-1 gap-12">
                 <section>
                   <h3 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-4">Executive Summary</h3>
                   <div className="prose prose-slate max-w-none">
                      <p className="text-xl text-slate-800 leading-relaxed font-medium">{results.summary}</p>
                   </div>
                 </section>

                 <section className="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100 print:bg-indigo-50 print:border-indigo-100">
                    <h3 className="text-sm font-black text-indigo-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                      Detailed Business Insights
                    </h3>
                    <p className="text-lg font-bold text-slate-900 leading-snug">{results.detailedInsights}</p>
                 </section>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <section className="bg-slate-50 p-8 rounded-3xl print:bg-slate-50 print:border print:border-slate-100">
                     <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-200 pb-4">Key Risks Identified</h3>
                     <ul className="space-y-4">
                       {results.risks.map((risk, i) => (
                         <li key={i} className="flex gap-3 text-slate-700 font-medium">
                           <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 shrink-0" />
                           {risk}
                         </li>
                       ))}
                     </ul>
                   </section>

                   <section className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100 print:bg-emerald-50 print:border-emerald-100">
                     <h3 className="text-sm font-black text-emerald-800 uppercase tracking-widest mb-6 border-b border-slate-200 pb-4">Cost Optimization Tips</h3>
                     <ul className="space-y-4">
                       {results.costOptimization.map((tip, i) => (
                         <li key={i} className="flex gap-3 text-emerald-900 font-medium">
                           <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
                           {tip}
                         </li>
                       ))}
                     </ul>
                   </section>
                 </div>

                 <section className="pt-8 border-t border-slate-100 flex justify-between items-center opacity-50 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                   <span>FinPulse Intelligence Unit</span>
                   <span>Confidential Report</span>
                   <span>{new Date().toLocaleDateString()}</span>
                 </section>
               </div>
            </div>
          </div>
        );
      default:
        return <Dashboard data={data} analysis={results} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="print:hidden">
        <Sidebar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          hasData={!!financialData} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:pl-64' : 'pl-0'} print:pl-0 print:m-0`}>
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200 px-8 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="h-4 w-px bg-slate-200 mx-2 hidden lg:block" />
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-100 text-xs font-black uppercase tracking-widest">
               <ShieldCheck className="w-3.5 h-3.5" />
               AES-256 Secure
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-500 relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">Admin User</p>
                <p className="text-xs text-slate-500">Business Owner</p>
              </div>
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto print:p-0 print:max-w-none print:m-0">
          {renderView()}
        </div>
      </main>

      <button className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-2xl shadow-2xl shadow-indigo-200 hover:scale-110 transition-transform z-50 print:hidden">
        <SparkleIcon />
      </button>

      {/* Simplified Print CSS for Maximum Compatibility */}
      <style>{`
        @media print {
          /* Setup basic page environment */
          @page {
            size: A4 portrait;
            margin: 15mm;
          }

          /* Hide UI clutter instantly */
          .print\\:hidden, 
          header, 
          aside, 
          .fixed, 
          nav, 
          button {
            display: none !important;
            visibility: hidden !important;
          }

          /* Clean up structural elements for standard flow */
          body, #root, main, .p-8 {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            overflow: visible !important;
            display: block !important;
          }

          /* Force report to be the only thing the print engine sees clearly */
          .report-to-print {
            display: block !important;
            width: 100% !important;
            max-width: none !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          /* Ensure background colors and text colors are printed */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Explicit color mapping for high-fidelity PDF */
          .bg-slate-900 { background-color: #0f172a !important; color: white !important; }
          .bg-indigo-600 { background-color: #4f46e5 !important; color: white !important; }
          .bg-indigo-50\\/50 { background-color: #f5f3ff !important; }
          .bg-slate-50 { background-color: #f8fafc !important; border: 1px solid #e2e8f0 !important; }
          .bg-emerald-50\\/50 { background-color: #ecfdf5 !important; }
          .text-indigo-600 { color: #4f46e5 !important; }
          .text-slate-900 { color: #0f172a !important; }
          
          section {
            page-break-inside: avoid;
            margin-bottom: 25px;
            display: block !important;
          }

          /* Remove global scrollbars and constraints */
          html, body {
            height: auto !important;
            overflow: visible !important;
          }
        }
      `}</style>
    </div>
  );
};

const SparkleIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export default App;
