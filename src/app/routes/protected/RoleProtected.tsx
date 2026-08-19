import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '@/app/store/hooks';
import type { UserRole } from '@/entities/user/model/types';
import { Loader2 } from 'lucide-react';

export interface RoleProtectedProps {
  allowedRoles?: UserRole[];
  redirectPath?: string;
}

export const RoleProtected: React.FC<RoleProtectedProps> = ({
  allowedRoles = ['super_admin', 'partnership_director', 'regional_manager', 'crm_analyst'],
  redirectPath,
}) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center gap-3 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If university_partner tries to access admin routes
  if (user.role === 'university_partner' && !allowedRoles.includes('university_partner')) {
    return <Navigate to="/partner-portal" replace />;
  }

  // If user role is not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectPath || (user.role === 'university_partner' ? '/partner-portal' : '/main')} replace />;
  }

  return <Outlet />;
};

export default RoleProtected;
