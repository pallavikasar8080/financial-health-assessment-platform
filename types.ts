
export interface FinancialData {
  revenue: number;
  expenses: number;
  accountsReceivable: number;
  accountsPayable: number;
  inventory: number;
  taxPaid: number;
  loans: number;
  industry: string;
  businessName: string;
}

export interface Metric {
  name: string;
  value: number | string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface ChartData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface AIAnalysis {
  healthScore: number;
  summary: string;
  detailedInsights: string;
  risks: string[];
  costOptimization: string[];
  creditworthiness: 'Low' | 'Medium' | 'High';
  recommendations: {
    product: string;
    provider: string;
    reason: string;
  }[];
  forecast: {
    month: string;
    predictedRevenue: number;
    predictedExpenses: number;
  }[];
  benchmarks: {
    metric: string;
    userValue: number;
    industryAvg: number;
  }[];
}

export type View = 'dashboard' | 'analysis' | 'risk' | 'forecast' | 'benchmarks' | 'upload' | 'integrations';
