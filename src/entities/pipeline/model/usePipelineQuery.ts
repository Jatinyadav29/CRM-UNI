import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pipelineApi } from '../api/pipelineApi';
import type { IDeal, IPipelineColumn, PipelineStage } from './types';
import { toast } from 'react-toastify';

export const pipelineKeys = {
  all: ['pipeline'] as const,
  deals: () => ['pipeline', 'deals'] as const,
};

const STAGE_CONFIG: { id: PipelineStage; title: string; color: string }[] = [
  { id: 'discovery', title: 'Discovery & Intro', color: 'border-sky-500 bg-sky-500/10 text-sky-700' },
  { id: 'qualification', title: 'Qualification & Scoping', color: 'border-indigo-500 bg-indigo-500/10 text-indigo-700' },
  { id: 'proposal_presented', title: 'Proposal Presented', color: 'border-amber-500 bg-amber-500/10 text-amber-700' },
  { id: 'negotiation', title: 'Legal & Procurement', color: 'border-purple-500 bg-purple-500/10 text-purple-700' },
  { id: 'contract_signed', title: 'Closed Won 🎉', color: 'border-emerald-500 bg-emerald-500/10 text-emerald-700' },
  { id: 'churned', title: 'Closed Lost', color: 'border-slate-400 bg-slate-500/10 text-slate-600' },
];

export const usePipelineDeals = () => {
  return useQuery({
    queryKey: pipelineKeys.deals(),
    queryFn: pipelineApi.getDeals,
    staleTime: 1000 * 60 * 3,
  });
};

export const usePipelineColumns = (deals: IDeal[] = []): IPipelineColumn[] => {
  return STAGE_CONFIG.map((stage) => {
    const stageDeals = deals.filter((d) => d.stage === stage.id);
    const totalValueUsd = stageDeals.reduce((sum, d) => sum + d.dealValueUsd, 0);

    return {
      id: stage.id,
      title: stage.title,
      color: stage.color,
      deals: stageDeals,
      dealCount: stageDeals.length,
      totalValueUsd,
    };
  });
};

export const useMoveDealStageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dealId, newStage }: { dealId: string; newStage: PipelineStage }) =>
      pipelineApi.moveDealStage(dealId, newStage),
    onSuccess: (updatedDeal) => {
      queryClient.invalidateQueries({ queryKey: pipelineKeys.deals() });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      toast.success(`Moved to ${updatedDeal.stage.replace('_', ' ')}`);
    },
    onError: () => {
      toast.error('Failed to move deal.');
    },
  });
};

export const useCreateDealMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<IDeal>) => pipelineApi.createDeal(payload),
    onSuccess: (newDeal) => {
      queryClient.invalidateQueries({ queryKey: pipelineKeys.deals() });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      toast.success(`Created opportunity: ${newDeal.title}`);
    },
    onError: () => {
      toast.error('Failed to create deal.');
    },
  });
};
