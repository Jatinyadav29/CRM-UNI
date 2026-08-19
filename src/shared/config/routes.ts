export const ROUTES = {
  AUTH: {
    ROOT: '/',
    LOGIN: '/',
    REGISTER: '/register',
  },
  DASHBOARD: {
    ROOT: '/main',
    OVERVIEW: '/main',
    PIPELINE: '/main/pipeline',
    UNIVERSITIES: '/main/universities',
    UNIVERSITY_DETAIL: (id: string) => `/main/universities/${id}`,
    ANALYTICS: '/main/analytics',
  },
} as const;
