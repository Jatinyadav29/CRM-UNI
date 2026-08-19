import { createClient } from '@supabase/supabase-js';
import { ENV } from '../config/env';
import type { Database } from './supabaseTypes';

export const supabase = createClient<Database>(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
