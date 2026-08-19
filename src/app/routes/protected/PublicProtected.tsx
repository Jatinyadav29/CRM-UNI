import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '@/app/store/hooks';
import { Loader2 } from 'lucide-react';

export const PublicProtected: React.FC = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center gap-3 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (user) {
    const targetPath =
      user.role === 'university_partner' ? '/partner-portal' : '/main';
    return <Navigate to={targetPath} replace />;
  }

  return <Outlet />;
};

export default PublicProtected;
