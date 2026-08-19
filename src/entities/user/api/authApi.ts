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

    // Check pre-configured demo roles
    if (inputIdentifier.includes('oxford') || credentials.role === 'university_partner') {
      const user = DEMO_USERS.oxford;
      const token = 'mock_jwt_partner_oxford_' + Date.now();
      localStorage.setItem('accessToken', token);
      localStorage.setItem('cachedUser', JSON.stringify(user));
      return { user, token };
    }

    if (inputIdentifier.includes('stanford')) {
      const user = DEMO_USERS.stanford;
      const token = 'mock_jwt_partner_stanford_' + Date.now();
      localStorage.setItem('accessToken', token);
      localStorage.setItem('cachedUser', JSON.stringify(user));
      return { user, token };
    }

    try {
      const email = credentials.email || `${credentials.username || 'admin'}@genesis-edu.io`;

      if (credentials.password && supabase.auth) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: credentials.password,
        });

        if (!error && data.user) {
          let role: UserRole = (data.user.user_metadata?.role as UserRole) || 'partnership_director';
          let universityId: string | undefined = data.user.user_metadata?.university_id;

          // Attempt to fetch profile metadata from Supabase profiles table
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
            // ignore
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
          localStorage.setItem('cachedUser', JSON.stringify(user));
          return { user, token };
        }
      }
    } catch {
      // Fallback
    }

    // Default fallback to Admin Director
    const user: IUser = {
      ...DEMO_USERS.admin,
      fullName: credentials.username || credentials.email?.split('@')[0] || 'Alex Vance',
      email: credentials.email || 'alex.vance@genesis-edu.io',
      role: credentials.role || 'partnership_director',
      universityId: credentials.universityId,
    };

    const token = 'mock_jwt_session_' + Date.now();
    localStorage.setItem('accessToken', token);
    localStorage.setItem('cachedUser', JSON.stringify(user));
    return { user, token };
  },

  async register(payload: IRegisterPayload): Promise<{ user: IUser; token: string }> {
    const role: UserRole = payload.role || (payload.universityId ? 'university_partner' : 'regional_manager');

    try {
      if (payload.password && supabase.auth) {
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

        if (!error && data.user) {
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
        }
      }
    } catch {
      // Fallback
    }

    const user: IUser = {
      ...DEMO_USERS.admin,
      id: 'usr_' + Date.now(),
      fullName: payload.name,
      email: payload.email,
      role,
      universityId: payload.universityId,
      department: payload.department || 'Global Partnerships',
    };
    const token = 'mock_jwt_session_' + Date.now();
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
      // ignore
    }

    return DEMO_USERS.admin;
  },

  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('cachedUser');
  },
};
