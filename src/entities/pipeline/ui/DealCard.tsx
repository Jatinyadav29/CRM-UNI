import React from 'react';
import { Card } from '@/shared/ui';
import { formatCurrency, formatDate } from '@/shared/lib/utils';
import { Calendar } from 'lucide-react';
import type { IDeal, PipelineStage } from '../model/types';
import { useMoveDealStageMutation } from '../model/usePipelineQuery';

export interface DealCardProps {
  deal: IDeal;
}

const STAGES: { value: PipelineStage; label: string }[] = [
  { value: 'discovery', label: 'Discovery' },
  { value: 'qualification', label: 'Qualification' },
  { value: 'proposal_presented', label: 'Proposal' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'contract_signed', label: 'Closed Won' },
  { value: 'churned', label: 'Closed Lost' },
];

export const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const moveMutation = useMoveDealStageMutation();

  const priorityColors = {
    critical: 'bg-rose-50 text-rose-700 border-rose-100',
    high: 'bg-amber-50 text-amber-700 border-amber-100',
    medium: 'bg-blue-50 text-blue-700 border-blue-100',
    low: 'bg-slate-50 text-slate-600 border-slate-100',
  };

  return (
    <Card className="p-4 flex flex-col gap-3 group hover:border-slate-200">
      {/* Top row: University badge & Priority */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={deal.universityLogo}
            alt={deal.universityName}
            className="w-6 h-6 rounded-lg object-cover border border-slate-100 shrink-0"
          />
          <span className="text-xs font-bold text-slate-900 truncate">
            {deal.universityName}
          </span>
        </div>

        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 ${
            priorityColors[deal.priority]
          }`}
        >
          {deal.priority}
        </span>
      </div>

      {/* Deal Title */}
      <h5 className="font-semibold text-sm text-slate-900 leading-snug line-clamp-2">
        {deal.title}
      </h5>

      {/* Deal Value and Probability */}
      <div className="flex items-baseline justify-between pt-1 border-t border-slate-100">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Value</span>
          <p className="text-base font-black text-slate-900 leading-tight">
            {formatCurrency(deal.dealValueUsd)}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Win Prob</span>
          <p className="text-xs font-bold text-slate-700">
            {deal.probabilityPercentage}%
          </p>
        </div>
      </div>

      {/* Footer: Rep, Close Date & Stage Mover */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-1.5" title={`Assigned: ${deal.assignedRep.name}`}>
          <img
            src={deal.assignedRep.avatarUrl}
            alt={deal.assignedRep.name}
            className="w-5 h-5 rounded-full object-cover border border-slate-100"
          />
          <span className="text-[11px] font-medium text-slate-600 truncate max-w-20">
            {deal.assignedRep.name.split(' ')[0]}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(deal.expectedCloseDate)}</span>
        </div>
      </div>

      {/* Quick Stage Transition Dropdown */}
      <div className="pt-1">
        <select
          value={deal.stage}
          disabled={moveMutation.isPending}
          onChange={(e) =>
            moveMutation.mutate({
              dealId: deal.id,
              newStage: e.target.value as PipelineStage,
            })
          }
          className="w-full text-xs font-semibold py-1.5 px-2.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-700 outline-none cursor-pointer transition-colors focus:border-blue-600"
        >
          {STAGES.map((s) => (
            <option key={s.value} value={s.value}>
              Move to: {s.label}
            </option>
          ))}
        </select>
      </div>
    </Card>
  );
};
