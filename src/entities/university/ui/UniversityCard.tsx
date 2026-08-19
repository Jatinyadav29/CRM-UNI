import React from 'react';
import { Card } from '@/shared/ui';
import { formatCurrency, formatNumber } from '@/shared/lib/utils';
import { Globe, Users, Award, TrendingUp } from 'lucide-react';
import type { IUniversity } from '../model/types';
import { UniversityStatusBadge, UniversityTierBadge } from './UniversityBadge';
import { useNavigate } from 'react-router';

export interface UniversityCardProps {
  university: IUniversity;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({ university }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => navigate(`/main/universities/${university.id}`)}
      className="group flex flex-col justify-between overflow-hidden border-slate-200/90 hover:border-slate-400"
    >
      {/* Header with image cover */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-100">
        <img
          src={university.heroImageUrl}
          alt={university.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

        {/* Badges on Hero */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <UniversityTierBadge tier={university.tier} />
        </div>
        <div className="absolute top-3 right-3">
          <UniversityStatusBadge status={university.status} size="sm" />
        </div>

        {/* University Logo and Name Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5">
          <img
            src={university.logoUrl}
            alt={university.code}
            className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-md bg-white shrink-0"
          />
          <div className="min-w-0 flex-1 text-white">
            <h4 className="font-bold text-sm truncate leading-tight drop-shadow-xs">
              {university.name}
            </h4>
            <p className="text-[11px] text-slate-200 truncate flex items-center gap-1">
              <Globe className="w-3 h-3 text-slate-300" />
              {university.city}, {university.country}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-4">
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-100 text-center">
          <div className="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 font-medium">
              <Award className="w-3 h-3 text-amber-500" />
              Rank
            </div>
            <p className="text-sm font-black text-slate-900 mt-0.5">
              #{university.globalRanking}
            </p>
          </div>

          <div className="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 font-medium">
              <Users className="w-3 h-3 text-indigo-500" />
              Students
            </div>
            <p className="text-sm font-black text-slate-900 mt-0.5">
              {formatNumber(university.totalStudentBody)}
            </p>
          </div>

          <div className="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 font-medium">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              Leads
            </div>
            <p className="text-sm font-black text-slate-900 mt-0.5">
              {university.activeLeadsCount}
            </p>
          </div>
        </div>

        {/* Footer: Contract Value & Programs */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
              Contract Value
            </span>
            <p className="text-sm font-black text-slate-900">
              {formatCurrency(university.annualContractValueUsd)}
              <span className="text-[10px] text-slate-500 font-normal"> /yr</span>
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
              Contact
            </span>
            <p className="text-xs font-semibold text-slate-700 truncate max-w-32">
              {university.contactPerson.name}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
