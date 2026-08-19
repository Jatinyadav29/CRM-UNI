import React, { useEffect, useRef } from 'react';
import { useDashboardAnalytics } from '@/entities/analytics/model/useAnalyticsQuery';
import { MetricCard } from '@/entities/analytics/ui/MetricCard';
import { Card, Skeleton } from '@/shared/ui';
import { formatCurrency } from '@/shared/lib/utils';
import { animateStaggerCards } from '@/shared/lib/gsap';
import { TrendingUp, Layers, Sparkles } from 'lucide-react';

export interface AnalyticsOverviewProps {
  timeframe?: string;
}

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({
  timeframe = '30d',
}) => {
  const { data, isPending } = useDashboardAnalytics(timeframe);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm: gsap.MatchMedia | undefined;

    if (!isPending && data && containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.metric-animate');
      if (cards.length) {
        mm = animateStaggerCards(cards, 0.05);
      }
    }

    return () => {
      mm?.revert();
    };
  }, [isPending, data, timeframe]);

  if (isPending || !data) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 w-full rounded-3xl" />
          <Skeleton className="h-80 w-full rounded-3xl" />
        </div>
      </div>
    );
  }

  // Dynamic calculations from live arrays
  const maxForecastVal = Math.max(
    ...data.revenueForecast.map((rf) => Math.max(rf.actualUsd, rf.contractPipelineUsd)),
    1
  );

  const initialFunnelCount = data.funnel[0]?.count || 1;
  const finalFunnelCount = data.funnel[data.funnel.length - 1]?.count || 0;
  const overallConversionPct =
    Math.round((finalFunnelCount / initialFunnelCount) * 1000) / 10;

  return (
    <div ref={containerRef} className="flex flex-col gap-6">
      {/* Top row: 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.kpis.map((kpi) => (
          <div key={kpi.id} className="metric-animate">
            <MetricCard metric={kpi} />
          </div>
        ))}
      </div>

      {/* Second row: Conversion Funnel + Revenue Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <Card className="p-6 flex flex-col justify-between gap-5 border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                Institutional Conversion Funnel
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              Avg Cycle: 34 Days
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {data.funnel.map((step, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800">{step.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-normal">
                      {step.count} institutions
                    </span>
                    <span className="text-indigo-600 font-bold">
                      {step.conversionRate}%
                    </span>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${step.conversionRate}%` }}
                    className="h-full bg-linear-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-700"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-900 flex items-center justify-between">
            <span>Overall Pipeline Conversion Rate:</span>
            <span className="font-extrabold text-sm">{overallConversionPct}%</span>
          </div>
        </Card>

        {/* Revenue Forecast by Month */}
        <Card className="p-6 flex flex-col justify-between gap-5 border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                Monthly Contract & Pipeline Inflow
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              Q1-Q2 2026
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {data.revenueForecast.map((rf, idx) => {
              const actualWidth = Math.min(100, (rf.actualUsd / maxForecastVal) * 100);
              const pipeWidth = Math.min(100, (rf.contractPipelineUsd / maxForecastVal) * 100);

              return (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <span className="w-8 font-bold text-slate-700">
                    {rf.month}
                  </span>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative">
                      <div
                        style={{ width: `${pipeWidth}%` }}
                        className="h-full bg-slate-300 rounded-full absolute"
                      />
                      <div
                        style={{ width: `${actualWidth}%` }}
                        className="h-full bg-emerald-500 rounded-full absolute"
                      />
                    </div>
                  </div>
                  <span className="w-20 text-right font-black text-slate-900">
                    {formatCurrency(rf.actualUsd, true)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Closed Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span>Weighted Pipeline</span>
              </div>
            </div>
            <span className="font-bold text-slate-700">6 Month Trend</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
