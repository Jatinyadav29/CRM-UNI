import React, { useState } from 'react';
import { AnalyticsOverview } from '@/widgets/analytics-overview/ui/AnalyticsOverview';
import { UniversityDistribution } from '@/widgets/university-distribution/ui/UniversityDistribution';
import { TimeframeSelector } from '@/features/filter-analytics/ui/TimeframeSelector';
import { BarChart3 } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState('30d');

  return (
    <div className="p-6 sm:p-8 flex flex-col gap-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>Telemetry & Forecasts</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Revenue Intelligence & Regional Reports
          </h2>
          <p className="text-xs text-slate-500">
            Comprehensive breakdown of conversion funnels, pipeline velocity, and market penetration.
          </p>
        </div>

        <TimeframeSelector timeframe={timeframe} onChange={setTimeframe} />
      </div>

      {/* Analytics Overview */}
      <AnalyticsOverview timeframe={timeframe} />

      {/* Distribution */}
      <UniversityDistribution />
    </div>
  );
};

export default AnalyticsPage;
