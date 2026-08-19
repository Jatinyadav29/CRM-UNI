export const ENV = {
  SUPABASE_URL:
    import.meta.env.VITE_SUPABASE_URL || 'https://lhzjahtcuvyqeqxzdsqg.supabase.co',
  SUPABASE_ANON_KEY:
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    'sb_publishable_VownLeqlzYBm_6GdXOKW7A_QxQV-iFf',
  IS_PROD: import.meta.env.PROD,
  IS_DEV: import.meta.env.DEV,
} as const;
