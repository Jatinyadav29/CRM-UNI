import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  setSearch,
  setTierFilter,
  setStatusFilter,
  setSorting,
  resetFilters,
  setViewMode,
} from '@/entities/university/model/universitySlice';
import { Search, RotateCcw, LayoutGrid, Table, Plus } from 'lucide-react';
import { Button } from '@/shared/ui';

export interface UniversityFilterBarProps {
  onOpenCreateModal?: () => void;
}

export const UniversityFilterBar: React.FC<UniversityFilterBarProps> = ({
  onOpenCreateModal,
}) => {
  const dispatch = useAppDispatch();
  const { filters, viewMode } = useAppSelector((state) => state.university);

  // Local state for immediate typing responsiveness + 300ms debounce into Redux / React Query
  const [localSearch, setLocalSearch] = useState(filters.search || '');

  useEffect(() => {
    setLocalSearch(filters.search || '');
  }, [filters.search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== (filters.search || '')) {
        dispatch(setSearch(localSearch));
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localSearch, dispatch, filters.search]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
      {/* Search Input with Debounce */}
      <div className="relative flex-1 min-w-[240px]">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          type="text"
          placeholder="Search partner universities, cities, countries..."
          className="w-full bg-slate-50 border border-slate-200/90 text-slate-900 text-sm rounded-xl py-2 pl-10 pr-4 outline-none focus:bg-white focus:border-slate-800 transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Filter Selects & Controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Tier Filter */}
        <select
          value={filters.tier || ''}
          onChange={(e) => dispatch(setTierFilter(e.target.value))}
          className="text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-2 px-3 rounded-xl outline-none cursor-pointer transition-colors"
        >
          <option value="">All Tiers</option>
          <option value="Tier 1 (Global Elite)">Tier 1 (Global Elite)</option>
          <option value="Tier 2 (National Leader)">Tier 2 (National Leader)</option>
          <option value="Tier 3 (Regional Focus)">Tier 3 (Regional Focus)</option>
        </select>

        {/* Status Filter */}
        <select
          value={filters.status || ''}
          onChange={(e) => dispatch(setStatusFilter(e.target.value))}
          className="text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-2 px-3 rounded-xl outline-none cursor-pointer transition-colors"
        >
          <option value="">All Statuses</option>
          <option value="Active Partner">Active Partner</option>
          <option value="Contract Pending">Contract Pending</option>
          <option value="In Negotiation">In Negotiation</option>
          <option value="Lead">Lead</option>
        </select>

        {/* Sort selector */}
        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-') as [
              'ranking' | 'name' | 'contractValue' | 'leads',
              'asc' | 'desc'
            ];
            dispatch(setSorting({ sortBy, sortOrder }));
          }}
          className="text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-2 px-3 rounded-xl outline-none cursor-pointer transition-colors"
        >
          <option value="ranking-asc">Rank: Highest (#1 first)</option>
          <option value="ranking-desc">Rank: Lowest</option>
          <option value="contractValue-desc">Contract Value: High to Low</option>
          <option value="leads-desc">Active Leads: Most</option>
          <option value="name-asc">Name: A to Z</option>
        </select>

        {/* Reset Filter Button */}
        {(localSearch || filters.tier || filters.status) && (
          <button
            onClick={() => {
              setLocalSearch('');
              dispatch(resetFilters());
            }}
            title="Reset Filters"
            className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}

        {/* View Toggle (Grid / Table) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => dispatch(setViewMode('grid'))}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-400 hover:text-slate-700'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => dispatch(setViewMode('table'))}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-400 hover:text-slate-700'
            }`}
            title="Table View"
          >
            <Table className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add University Button */}
        {onOpenCreateModal && (
          <Button
            size="sm"
            onClick={onOpenCreateModal}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Partner
          </Button>
        )}
      </div>
    </div>
  );
};
