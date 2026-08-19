import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UniversityFilters } from './types';

interface UniversityState {
  filters: UniversityFilters;
  selectedUniversityId: string | null;
  viewMode: 'grid' | 'table';
}

const initialState: UniversityState = {
  filters: {
    search: '',
    tier: '',
    status: '',
    country: '',
    sortBy: 'ranking',
    sortOrder: 'asc',
  },
  selectedUniversityId: null,
  viewMode: 'grid',
};

export const universitySlice = createSlice({
  name: 'university',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setTierFilter: (state, action: PayloadAction<string>) => {
      state.filters.tier = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload;
    },
    setCountryFilter: (state, action: PayloadAction<string>) => {
      state.filters.country = action.payload;
    },
    setSorting: (
      state,
      action: PayloadAction<{ sortBy: UniversityFilters['sortBy']; sortOrder: 'asc' | 'desc' }>
    ) => {
      state.filters.sortBy = action.payload.sortBy;
      state.filters.sortOrder = action.payload.sortOrder;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSelectedUniversityId: (state, action: PayloadAction<string | null>) => {
      state.selectedUniversityId = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'table'>) => {
      state.viewMode = action.payload;
    },
  },
});

export const {
  setSearch,
  setTierFilter,
  setStatusFilter,
  setCountryFilter,
  setSorting,
  resetFilters,
  setSelectedUniversityId,
  setViewMode,
} = universitySlice.actions;

export default universitySlice.reducer;
