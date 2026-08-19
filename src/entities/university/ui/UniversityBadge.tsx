import React from 'react';
import { Badge, type BadgeProps } from '@/shared/ui';
import type { UniversityStatus, UniversityTier } from '../model/types';

interface UniversityStatusBadgeProps {
  status: UniversityStatus;
  size?: BadgeProps['size'];
}

export const UniversityStatusBadge: React.FC<UniversityStatusBadgeProps> = ({
  status,
  size = 'md',
}) => {
  const variantMap: Record<UniversityStatus, BadgeProps['variant']> = {
    'Active Partner': 'success',
    'Contract Pending': 'info',
    'In Negotiation': 'warning',
    Lead: 'neutral',
    Archived: 'danger',
  };

  return (
    <Badge variant={variantMap[status] || 'neutral'} size={size}>
      {status}
    </Badge>
  );
};

interface UniversityTierBadgeProps {
  tier: UniversityTier;
  size?: 'sm' | 'md';
}

export const UniversityTierBadge: React.FC<UniversityTierBadgeProps> = ({
  tier,
  size = 'sm',
}) => {
  const isTier1 = tier.includes('Tier 1');
  const isTier2 = tier.includes('Tier 2');

  return (
    <span
      className={`inline-flex items-center rounded-md font-bold ${
        size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[11px]'
      } ${
        isTier1
          ? 'bg-amber-100/80 text-amber-900 border border-amber-300/60'
          : isTier2
          ? 'bg-indigo-50 text-indigo-800 border border-indigo-200/60'
          : 'bg-slate-100 text-slate-700 border border-slate-200'
      }`}
    >
      {tier.split('(')[0].trim()}
    </span>
  );
};
