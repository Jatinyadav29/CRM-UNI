import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/entities/user/model/authSlice';
import universityReducer from '@/entities/university/model/universitySlice';
import pipelineReducer from '@/entities/pipeline/model/pipelineSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  university: universityReducer,
  pipeline: pipelineReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
