import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Input, Select } from '@/shared/ui';
import { useCreateDealMutation } from '@/entities/pipeline/model/usePipelineQuery';
import type { DealPriority, PipelineStage } from '@/entities/pipeline/model/types';

export interface CreateDealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  title: string;
  universityName: string;
  stage: PipelineStage;
  dealValueUsd: number;
  expectedCloseDate: string;
  priority: DealPriority;
  probabilityPercentage: number;
}

export const CreateDealModal: React.FC<CreateDealModalProps> = ({
  isOpen,
  onClose,
}) => {
  const createMutation = useCreateDealMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      stage: 'discovery',
      dealValueUsd: 95000,
      priority: 'high',
      probabilityPercentage: 35,
      expectedCloseDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    },
  });

  const onSubmit = async (data: FormValues) => {
    await createMutation.mutateAsync({
      title: data.title,
      universityName: data.universityName,
      stage: data.stage,
      dealValueUsd: Number(data.dealValueUsd),
      priority: data.priority,
      probabilityPercentage: Number(data.probabilityPercentage),
      expectedCloseDate: data.expectedCloseDate,
    });

    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Deal Opportunity"
      description="Add a new institutional sales pipeline opportunity."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Deal Opportunity Title"
          placeholder="e.g. Postgraduate STEM Lead Acceleration Suite"
          error={errors.title?.message}
          {...register('title', { required: 'Title is required' })}
        />

        <Input
          label="University / Institution Name"
          placeholder="e.g. University of Cambridge"
          error={errors.universityName?.message}
          {...register('universityName', { required: 'University name is required' })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Initial Stage"
            {...register('stage')}
            options={[
              { value: 'discovery', label: 'Discovery & Intro' },
              { value: 'qualification', label: 'Qualification & Scoping' },
              { value: 'proposal_presented', label: 'Proposal Presented' },
              { value: 'negotiation', label: 'Legal & Procurement' },
              { value: 'contract_signed', label: 'Closed Won' },
            ]}
          />

          <Select
            label="Priority Level"
            {...register('priority')}
            options={[
              { value: 'critical', label: 'Critical' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Deal Value ($)"
            type="number"
            {...register('dealValueUsd', { valueAsNumber: true, required: true })}
          />

          <Input
            label="Probability (%)"
            type="number"
            {...register('probabilityPercentage', { valueAsNumber: true })}
          />

          <Input
            label="Target Close Date"
            type="date"
            {...register('expectedCloseDate', { required: true })}
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={createMutation.isPending}>
            Add to Pipeline
          </Button>
        </div>
      </form>
    </Modal>
  );
};
