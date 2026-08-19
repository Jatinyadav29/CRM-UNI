import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DealPriority, PipelineStage } from './types';

interface PipelineState {
  selectedStageFilter: PipelineStage | 'all';
  selectedPriorityFilter: DealPriority | 'all';
  selectedDealId: string | null;
  searchQuery: string;
}

const initialState: PipelineState = {
  selectedStageFilter: 'all',
  selectedPriorityFilter: 'all',
  selectedDealId: null,
  searchQuery: '',
};

export const pipelineSlice = createSlice({
  name: 'pipeline',
  initialState,
  reducers: {
    setStageFilter: (state, action: PayloadAction<PipelineStage | 'all'>) => {
      state.selectedStageFilter = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<DealPriority | 'all'>) => {
      state.selectedPriorityFilter = action.payload;
    },
    setSelectedDealId: (state, action: PayloadAction<string | null>) => {
      state.selectedDealId = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setStageFilter,
  setPriorityFilter,
  setSelectedDealId,
  setSearchQuery,
} = pipelineSlice.actions;

export default pipelineSlice.reducer;
