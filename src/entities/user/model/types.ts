export type UserRole =
  | 'super_admin'
  | 'partnership_director'
  | 'regional_manager'
  | 'crm_analyst'
  | 'university_partner';

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  department: string;
  assignedRegion: string;
  universityId?: string;
  createdAt: string;
}

export interface IAuthState {
  user: IUser | null;
  sessionToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ILoginCredentials {
  email: string;
  password?: string;
  username?: string;
  role?: UserRole;
  universityId?: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password?: string;
  department?: string;
  role?: UserRole;
  universityId?: string;
}
