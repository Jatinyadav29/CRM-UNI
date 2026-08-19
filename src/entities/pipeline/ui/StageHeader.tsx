import React from 'react';
import { formatCurrency } from '@/shared/lib/utils';
import type { IPipelineColumn } from '../model/types';

export interface StageHeaderProps {
  column: IPipelineColumn;
}

export const StageHeader: React.FC<StageHeaderProps> = ({ column }) => {
  return (
    <div className="flex flex-col gap-1.5 pb-3 border-b border-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-slate-900 tracking-tight">
            {column.title}
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-black bg-slate-200/80 text-slate-700">
            {column.dealCount}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Total Weighted:</span>
        <span className="font-bold text-slate-800">
          {formatCurrency(column.totalValueUsd)}
        </span>
      </div>
    </div>
  );
};
