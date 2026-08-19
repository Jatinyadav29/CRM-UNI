import { supabase } from '@/shared/api/supabaseClient';
import type { ILoginCredentials, IRegisterPayload, IUser, UserRole } from '../model/types';

export const DEMO_USERS: Record<string, IUser> = {
  admin: {
    id: 'usr_director_01',
    email: 'alex.vance@genesis-edu.io',
    fullName: 'Alex Vance',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'partnership_director',
    department: 'Global Academic Partnerships',
    assignedRegion: 'North America & Europe',
    createdAt: '2025-01-15T08:00:00Z',
  },
  oxford: {
    id: 'usr_partner_oxford',
    email: 'e.campbell@ox.ac.uk',
    fullName: 'Dr. Eleanor Campbell',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'university_partner',
    department: 'Oxford International Admissions',
    assignedRegion: 'United Kingdom',
    universityId: 'uni_oxford_01',
    createdAt: '2025-03-01T10:00:00Z',
  },
  stanford: {
    id: 'usr_partner_stanford',
    email: 'mthorne@stanford.edu',
    fullName: 'Marcus Thorne',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'university_partner',
    department: 'Stanford Outreach',
    assignedRegion: 'North America',
    universityId: 'uni_stanford_02',
    createdAt: '2025-02-15T09:00:00Z',
  },
};

export const authApi = {
  async login(credentials: ILoginCredentials): Promise<{ user: IUser; token: string }> {
    const inputIdentifier = (credentials.username || credentials.email || '').toLowerCase().trim();

    // Explicit Demo Role Quick-Fill Support
    if (inputIdentifier === 'oxford.partner' || inputIdentifier.includes('oxford')) {
      const user = DEMO_USERS.oxford;
      const token = 'mock_jwt_partner_oxford_' + Date.now();
      localStorage.setItem('accessToken', token);
      sessionStorage.setItem('cachedUserId', user.id);
      return { user, token };
    }

    if (inputIdentifier === 'stanford.partner' || inputIdentifier.includes('stanford')) {
      const user = DEMO_USERS.stanford;
      const token = 'mock_jwt_partner_stanford_' + Date.now();
      localStorage.setItem('accessToken', token);
      sessionStorage.setItem('cachedUserId', user.id);
      return { user, token };
    }

    if (inputIdentifier === 'alex.vance' || inputIdentifier.includes('alex')) {
      const user = DEMO_USERS.admin;
      const token = 'mock_jwt_director_' + Date.now();
      localStorage.setItem('accessToken', token);
      sessionStorage.setItem('cachedUserId', user.id);
      return { user, token };
    }

    // Live Supabase Authentication
    const email = credentials.email || (credentials.username?.includes('@') ? credentials.username : `${credentials.username}@genesis-edu.io`);

    if (!credentials.password) {
      throw new Error('Password is required.');
    }

    if (!supabase || !supabase.auth) {
      throw new Error('Supabase client is not initialized.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: credentials.password,
    });

    if (error) {
      throw new Error(error.message || 'Invalid username, email, or password.');
    }

    if (!data.user) {
      throw new Error('Authentication failed. No user record returned from server.');
    }

    let role: UserRole = (data.user.user_metadata?.role as UserRole) || 'partnership_director';
    let universityId: string | undefined = data.user.user_metadata?.university_id;

    // Fetch user profile metadata from Supabase profiles table
    try {
      const { data: profile } = await supabase
        .from('profiles' as unknown as 'universities')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      if (profile) {
        const p = profile as unknown as { role?: UserRole; university_id?: string };
        if (p.role) role = p.role;
        if (p.university_id) universityId = p.university_id;
      }
    } catch {
      // Non-critical profile query error
    }

    const user: IUser = {
      id: data.user.id,
      email: data.user.email || email,
      fullName: data.user.user_metadata?.full_name || credentials.username || 'Enterprise User',
      avatarUrl: data.user.user_metadata?.avatar_url || DEMO_USERS.admin.avatarUrl,
      role,
      department: data.user.user_metadata?.department || 'Academic Partnerships',
      assignedRegion: 'Global',
      universityId,
      createdAt: data.user.created_at,
    };

    const token = data.session?.access_token || 'sb_token_' + Date.now();
    localStorage.setItem('accessToken', token);
    sessionStorage.setItem('cachedUserId', user.id);
    return { user, token };
  },

  async register(payload: IRegisterPayload): Promise<{ user: IUser; token: string }> {
    const role: UserRole = payload.role || (payload.universityId ? 'university_partner' : 'regional_manager');

    if (!payload.email || !payload.password) {
      throw new Error('Email and password are required for registration.');
    }

    if (!supabase || !supabase.auth) {
      throw new Error('Supabase client is not initialized.');
    }

    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          full_name: payload.name,
          department: payload.department || 'Global Partnerships',
          role,
          university_id: payload.universityId,
        },
      },
    });

    if (error) {
      throw new Error(error.message || 'Registration failed. Please check your details.');
    }

    if (!data.user) {
      throw new Error('Registration failed. No user was created by the authentication server.');
    }

    const user: IUser = {
      id: data.user.id,
      email: data.user.email || payload.email,
      fullName: payload.name,
      avatarUrl: DEMO_USERS.admin.avatarUrl,
      role,
      department: payload.department || 'Academic Partnerships',
      assignedRegion: 'Global',
      universityId: payload.universityId,
      createdAt: data.user.created_at,
    };

    const token = data.session?.access_token || 'sb_token_' + Date.now();
    localStorage.setItem('accessToken', token);
    localStorage.setItem('cachedUser', JSON.stringify(user));
    return { user, token };
  },

  async hydrate(): Promise<IUser | null> {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
      const cached = localStorage.getItem('cachedUser');
      if (cached) {
        return JSON.parse(cached) as IUser;
      }
    } catch {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('cachedUser');
      return null;
    }

    return null;
  },

  async logout(): Promise<void> {
    try {
      if (supabase && supabase.auth) {
        await supabase.auth.signOut();
      }
    } catch {
      // ignore
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('cachedUser');
  },
};
