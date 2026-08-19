import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Input, Select } from '@/shared/ui';
import { useCreateUniversityMutation } from '@/entities/university/model/useUniversityQuery';
import type { UniversityStatus, UniversityTier } from '@/entities/university/model/types';

export interface CreateUniversityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  code: string;
  country: string;
  city: string;
  tier: UniversityTier;
  status: UniversityStatus;
  globalRanking: number;
  annualContractValueUsd: number;
  activeLeadsCount: number;
  contactName: string;
  contactEmail: string;
}

export const CreateUniversityModal: React.FC<CreateUniversityModalProps> = ({
  isOpen,
  onClose,
}) => {
  const createMutation = useCreateUniversityMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      tier: 'Tier 2 (National Leader)',
      status: 'Lead',
      globalRanking: 120,
      annualContractValueUsd: 65000,
      activeLeadsCount: 150,
    },
  });

  const onSubmit = async (data: FormValues) => {
    await createMutation.mutateAsync({
      name: data.name,
      code: data.code.toUpperCase(),
      country: data.country,
      city: data.city,
      tier: data.tier,
      status: data.status,
      globalRanking: Number(data.globalRanking),
      annualContractValueUsd: Number(data.annualContractValueUsd),
      activeLeadsCount: Number(data.activeLeadsCount),
      contactPerson: {
        name: data.contactName,
        email: data.contactEmail,
        phone: '+1 555 0199',
        role: 'Director of Global Admissions',
      },
    });

    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add University Partner"
      description="Onboard a new academic institution into the CRM database."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="University Name"
            placeholder="e.g. Imperial College London"
            error={errors.name?.message}
            {...register('name', { required: 'University name is required' })}
          />

          <Input
            label="Institutional Code"
            placeholder="e.g. ICL"
            error={errors.code?.message}
            {...register('code', { required: 'Code is required' })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Country"
            placeholder="United Kingdom"
            error={errors.country?.message}
            {...register('country', { required: 'Country is required' })}
          />

          <Input
            label="City"
            placeholder="London"
            error={errors.city?.message}
            {...register('city', { required: 'City is required' })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Partnership Tier"
            {...register('tier')}
            options={[
              { value: 'Tier 1 (Global Elite)', label: 'Tier 1 (Global Elite)' },
              { value: 'Tier 2 (National Leader)', label: 'Tier 2 (National Leader)' },
              { value: 'Tier 3 (Regional Focus)', label: 'Tier 3 (Regional Focus)' },
            ]}
          />

          <Select
            label="Current Status"
            {...register('status')}
            options={[
              { value: 'Active Partner', label: 'Active Partner' },
              { value: 'Contract Pending', label: 'Contract Pending' },
              { value: 'In Negotiation', label: 'In Negotiation' },
              { value: 'Lead', label: 'Lead' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Global Rank"
            type="number"
            {...register('globalRanking', { valueAsNumber: true })}
          />

          <Input
            label="Est. Contract ($)"
            type="number"
            {...register('annualContractValueUsd', { valueAsNumber: true })}
          />

          <Input
            label="Active Leads"
            type="number"
            {...register('activeLeadsCount', { valueAsNumber: true })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <Input
            label="Primary Contact Name"
            placeholder="Dr. John Watson"
            {...register('contactName', { required: 'Contact name is required' })}
          />

          <Input
            label="Contact Email"
            type="email"
            placeholder="j.watson@uni.ac.uk"
            {...register('contactEmail', { required: 'Contact email is required' })}
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={createMutation.isPending}>
            Save Partner Profile
          </Button>
        </div>
      </form>
    </Modal>
  );
};
