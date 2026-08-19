import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '@/app/store/hooks';
import { useUniversitiesQuery } from '@/entities/university/model/useUniversityQuery';
import { UniversityCard } from '@/entities/university/ui/UniversityCard';
import {
  UniversityStatusBadge,
  UniversityTierBadge,
} from '@/entities/university/ui/UniversityBadge';
import { formatCurrency, formatNumber } from '@/shared/lib/utils';
import { Skeleton } from '@/shared/ui';
import { animateStaggerCards } from '@/shared/lib/gsap';
import { useNavigate } from 'react-router';
import { ChevronRight } from 'lucide-react';

export const UniversityTable: React.FC = () => {
  const navigate = useNavigate();
  const { filters, viewMode } = useAppSelector((state) => state.university);
  const { data: universities = [], isPending } = useUniversitiesQuery(filters);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm: gsap.MatchMedia | undefined;

    if (!isPending && universities.length > 0 && containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.stagger-item');
      if (elements.length) {
        mm = animateStaggerCards(elements, 0.05);
      }
    }

    return () => {
      mm?.revert();
    };
  }, [isPending, universities.length, viewMode]);

  if (isPending) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-72 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (universities.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
        <h4 className="text-base font-bold text-slate-900">
          No partner institutions found
        </h4>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Try clearing your search query or adjusting your tier/status filters.
        </p>
      </div>
    );
  }

  // Grid View Mode — auto-fit responsive grid
  if (viewMode === 'grid') {
    return (
      <div
        ref={containerRef}
        className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5"
      >
        {universities.map((uni) => (
          <div key={uni.id} className="stagger-item">
            <UniversityCard university={uni} />
          </div>
        ))}
      </div>
    );
  }

  // Table View Mode (Responsive: Stacked cards on mobile, full table on tablet & desktop)
  return (
    <div ref={containerRef} className="w-full">
      {/* Mobile Stacked View — auto-fit grid */}
      <div className="block md:hidden">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {universities.map((uni) => (
            <div key={uni.id} className="stagger-item">
              <UniversityCard university={uni} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100 uppercase tracking-wider text-[10px] sticky top-0">
              <tr>
                <th className="py-3.5 px-4">Rank</th>
                <th className="py-3.5 px-4">Institution</th>
                <th className="py-3.5 px-4">Tier</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4 text-right">Students</th>
                <th className="py-3.5 px-4 text-right">Contract Value</th>
                <th className="py-3.5 px-4 text-right">Leads</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {universities.map((uni) => (
                <tr
                  key={uni.id}
                  onClick={() => navigate(`/main/universities/${uni.id}`)}
                  className="stagger-item hover:bg-slate-50 transition-colors cursor-pointer min-h-[44px]"
                >
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    #{uni.globalRanking}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={uni.logoUrl}
                        alt={uni.code}
                        className="w-7 h-7 rounded-lg object-cover border border-slate-100"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block">
                          {uni.name}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {uni.code}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <UniversityTierBadge tier={uni.tier} size="sm" />
                  </td>
                  <td className="py-3.5 px-4">
                    <UniversityStatusBadge status={uni.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    {uni.city}, {uni.country}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                    {formatNumber(uni.totalStudentBody)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-slate-900">
                    {formatCurrency(uni.annualContractValueUsd)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-emerald-600">
                    {uni.activeLeadsCount}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UniversityTable;
