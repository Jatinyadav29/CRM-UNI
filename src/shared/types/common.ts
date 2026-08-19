export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export type SortOrder = 'asc' | 'desc';

export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

export type ThemeMode = 'light' | 'dark' | 'system';
