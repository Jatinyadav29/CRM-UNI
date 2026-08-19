const getEnvVariable = (key: string, devFallback: string): string => {
  const envVal = import.meta.env[key];
  if (envVal) return envVal;

  if (import.meta.env.PROD && !envVal && !devFallback) {
    console.error(`[ENV CRITICAL] Required environment variable "${key}" is missing in production build.`);
  }

  return devFallback;
};

export const ENV = {
  SUPABASE_URL: getEnvVariable(
    'VITE_SUPABASE_URL',
    'https://lhzjahtcuvyqeqxzdsqg.supabase.co'
  ),
  SUPABASE_ANON_KEY:
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    getEnvVariable(
      'VITE_SUPABASE_ANON_KEY',
      'sb_publishable_VownLeqlzYBm_6GdXOKW7A_QxQV-iFf'
    ),
  IS_PROD: Boolean(import.meta.env.PROD),
  IS_DEV: Boolean(import.meta.env.DEV),
} as const;
