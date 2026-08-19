import React from 'react';
import { useDashboardAnalytics } from '@/entities/analytics/model/useAnalyticsQuery';
import { Card } from '@/shared/ui';
import { formatCurrency, formatNumber } from '@/shared/lib/utils';
import { Globe2 } from 'lucide-react';

export const UniversityDistribution: React.FC = () => {
  const { data } = useDashboardAnalytics();

  if (!data) return null;

  return (
    <Card className="p-6 flex flex-col justify-between gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-sm text-slate-900">
            Global Geographic Distribution & Revenue Share
          </h3>
        </div>
        <span className="text-[11px] font-medium text-slate-500">
          {data.regions.reduce((sum, r) => sum + r.partnerCount, 0)} Global Partners
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        {data.regions.map((region, idx) => (
          <div
            key={idx}
            className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between gap-3"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  {region.region}
                </span>
                <span className="text-xs font-bold text-blue-600">
                  {region.marketSharePercentage}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                {region.partnerCount} universities · {formatNumber(region.activeStudents)} students
              </p>
            </div>

            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                style={{ width: `${region.marketSharePercentage}%` }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Total ARR:</span>
              <span className="font-extrabold text-slate-900">
                {formatCurrency(region.totalRevenueUsd, true)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UniversityDistribution;
