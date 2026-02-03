
export const INDUSTRIES = [
  'Manufacturing',
  'Retail',
  'Agriculture',
  'Services',
  'Logistics',
  'E-commerce',
  'Technology'
];

export const MOCK_DATA: any[] = [
  { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
  { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
  { month: 'Mar', revenue: 48000, expenses: 38000, profit: 10000 },
  { month: 'Apr', revenue: 61000, expenses: 40000, profit: 21000 },
  { month: 'May', revenue: 55000, expenses: 36000, profit: 19000 },
  { month: 'Jun', revenue: 67000, expenses: 42000, profit: 25000 },
];

export const SYSTEM_INSTRUCTION = `
You are a senior SME Financial Consultant. Analyze the provided financial data for a business.
Provide a detailed response in JSON format including:
- healthScore (0-100)
- summary (Brief English executive summary)
- detailedInsights (A deep-dive English strategic analysis of the business performance)
- risks (Array of identified financial risks)
- costOptimization (Array of actionable cost-cutting strategies)
- creditworthiness (Low/Medium/High)
- recommendations (Array of financial products from banks/NBFCs)
- forecast (Predict next 3 months revenue/expenses based on trends)
- benchmarks (Compare user values vs industry averages)

Be professional, data-driven, and supportive of SME owners. Output strictly in English.
`;
