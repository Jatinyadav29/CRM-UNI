import React from 'react';
import { Card } from '@/shared/ui';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { IKpiMetric } from '../model/types';

export interface MetricCardProps {
  metric: IKpiMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const isPositive = metric.trend === 'up';
  const isNegative = metric.trend === 'down';

  return (
    <Card className="p-5 flex flex-col justify-between gap-4">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          {metric.label}
        </span>
        <div
          className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md ${
            isPositive
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              : isNegative
              ? 'bg-rose-50 text-rose-700 border border-rose-100'
              : 'bg-slate-50 text-slate-500 border border-slate-100'
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          ) : isNegative ? (
            <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
          ) : (
            <Minus className="w-3.5 h-3.5" />
          )}
          <span>
            {metric.changePercentage > 0 ? '+' : ''}
            {metric.changePercentage}%
          </span>
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          {metric.value}
        </h3>
        <span className="text-[11px] text-slate-500 font-medium">
          {metric.timeframe}
        </span>
      </div>

      {/* Sparkline Visualizer */}
      <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden flex gap-0.5">
        {metric.sparkline.map((val, idx) => {
          const max = Math.max(...metric.sparkline);
          const heightPercent = Math.max(20, (val / max) * 100);
          return (
            <div
              key={idx}
              style={{ width: `${100 / metric.sparkline.length}%` }}
              className="h-full flex items-end"
            >
              <div
                style={{ height: `${heightPercent}%` }}
                className="w-full bg-blue-600 rounded-xs opacity-75"
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
};
