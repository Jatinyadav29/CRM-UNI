import React, { useState } from 'react';
import { AnalyticsOverview } from '@/widgets/analytics-overview/ui/AnalyticsOverview';
import { UniversityDistribution } from '@/widgets/university-distribution/ui/UniversityDistribution';
import { TimeframeSelector } from '@/features/filter-analytics/ui/TimeframeSelector';
import { usePipelineDeals } from '@/entities/pipeline/model/usePipelineQuery';
import { DealCard } from '@/entities/pipeline/ui/DealCard';
import { Button } from '@/shared/ui';
import { Link } from 'react-router';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState('30d');
  const { data: deals = [] } = usePipelineDeals();

  const priorityDeals = deals
    .filter((d) => d.stage === 'negotiation' || d.stage === 'proposal_presented')
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Top Welcome Banner: Solid bg-blue-600 container with crisp white typography */}
      <div className="bg-blue-600 text-white rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-500/40 border border-blue-400/30 text-xs font-semibold text-white self-start">
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>Executive Performance Telemetry</span>
          </div>
          <h2 className="text-fluid-lg font-extrabold text-white tracking-tight leading-tight">
            Academic Global Pipeline Dashboard
          </h2>
          <p className="text-xs text-blue-100 font-normal max-w-xl leading-relaxed">
            Real-time multi-currency ARR monitoring, partner university conversion funnels, and recruitment operations across 4 continents.
          </p>
        </div>

        <div className="shrink-0 bg-white/10 backdrop-blur-xs p-1 rounded-xl border border-white/20">
          <TimeframeSelector timeframe={timeframe} onChange={setTimeframe} />
        </div>
      </div>

      {/* Analytics Overview: 4 KPI Cards + Conversion Funnel + Revenue Forecast */}
      <AnalyticsOverview timeframe={timeframe} />

      {/* High-Value Opportunities Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              High-Velocity Deals Closing This Quarter
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Opportunities currently in proposal or negotiation stages
            </p>
          </div>

          <Link to="/main/pipeline">
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View Full Pipeline
            </Button>
          </Link>
        </div>

        {/* Responsive Grid for High-Velocity Deals */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {priorityDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>

      {/* Geographic & Regional Market Share Breakdown */}
      <UniversityDistribution />
    </div>
  );
};

export default DashboardPage;
