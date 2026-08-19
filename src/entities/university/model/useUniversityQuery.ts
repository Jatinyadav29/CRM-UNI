import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { universityApi } from '../api/universityApi';
import type { IUniversity, UniversityFilters } from './types';
import { toast } from 'react-toastify';

export const universityKeys = {
  all: ['universities'] as const,
  list: (filters?: UniversityFilters) => ['universities', 'list', filters] as const,
  detail: (id: string) => ['universities', 'detail', id] as const,
};

export const useUniversitiesQuery = (filters?: UniversityFilters) => {
  return useQuery({
    queryKey: universityKeys.list(filters),
    queryFn: () => universityApi.getUniversities(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUniversityDetailQuery = (id: string) => {
  return useQuery({
    queryKey: universityKeys.detail(id),
    queryFn: () => universityApi.getUniversityById(id),
    enabled: Boolean(id),
  });
};

export const useCreateUniversityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<IUniversity>) => universityApi.createUniversity(payload),
    onSuccess: (newUni) => {
      queryClient.invalidateQueries({ queryKey: universityKeys.all });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      toast.success(`Successfully added ${newUni.name}`);
    },
    onError: () => {
      toast.error('Failed to create university partner.');
    },
  });
};

export const useEnrollStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      universityId,
      programId,
      studentData,
    }: {
      universityId: string;
      programId: string;
      studentData: {
        fullName: string;
        email: string;
        phone: string;
        nationality: string;
        gpa?: string;
        notes?: string;
      };
    }) => universityApi.enrollStudent(universityId, programId, studentData),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: universityKeys.all });
      queryClient.invalidateQueries({ queryKey: universityKeys.detail(variables.universityId) });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      toast.success(`Application submitted! Ref: ${res.referenceNumber}`);
    },
    onError: () => {
      toast.error('Enrollment submission failed. Please try again.');
    },
  });
};
