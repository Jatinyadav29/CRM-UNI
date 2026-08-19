import React, { useState } from 'react';
import { AnalyticsOverview } from '@/widgets/analytics-overview/ui/AnalyticsOverview';
import { UniversityDistribution } from '@/widgets/university-distribution/ui/UniversityDistribution';
import { TimeframeSelector } from '@/features/filter-analytics/ui/TimeframeSelector';
import { usePipelineDeals } from '@/entities/pipeline/model/usePipelineQuery';
import { DealCard } from '@/entities/pipeline/ui/DealCard';
import { Button, Card } from '@/shared/ui';
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
      {/* Top Banner / Welcome Bar: Clean White Card on Slate-50 Background */}
      <Card className="p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Performance Telemetry</span>
          </div>
          <h2 className="text-fluid-lg font-bold text-slate-900 tracking-tight">
            Academic Global Pipeline Dashboard
          </h2>
          <p className="text-xs text-slate-500 font-medium max-w-xl">
            Real-time multi-currency ARR monitoring, partner university conversion funnels, and recruitment operations across 4 continents.
          </p>
        </div>

        <TimeframeSelector timeframe={timeframe} onChange={setTimeframe} />
      </Card>

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
