export interface IKpiMetric {
  id: string;
  label: string;
  value: string | number;
  changePercentage: number;
  trend: 'up' | 'down' | 'neutral';
  timeframe: string;
  sparkline: number[];
  category: 'revenue' | 'partners' | 'students' | 'velocity';
}

export interface IConversionFunnelStep {
  stage: string;
  count: number;
  conversionRate: number;
  dropoffRate: number;
}

export interface IRegionalDistribution {
  region: string;
  partnerCount: number;
  activeStudents: number;
  totalRevenueUsd: number;
  marketSharePercentage: number;
}

export interface IRevenueForecastPoint {
  month: string;
  actualUsd: number;
  forecastUsd: number;
  contractPipelineUsd: number;
}

export interface IDashboardAnalyticsSummary {
  kpis: IKpiMetric[];
  funnel: IConversionFunnelStep[];
  regions: IRegionalDistribution[];
  revenueForecast: IRevenueForecastPoint[];
}
