import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../api/analyticsApi';

export const analyticsKeys = {
  all: ['analytics'] as const,
  overview: (timeframe?: string) => ['analytics', 'overview', timeframe] as const,
};

export const useDashboardAnalytics = (timeframe = '30d') => {
  return useQuery({
    queryKey: analyticsKeys.overview(timeframe),
    queryFn: () => analyticsApi.getDashboardAnalytics(timeframe),
    staleTime: 1000 * 60 * 5,
  });
};
