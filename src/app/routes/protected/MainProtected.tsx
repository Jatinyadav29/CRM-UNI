import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '@/app/store/hooks';
import { Loader2 } from 'lucide-react';

export const MainProtected: React.FC = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center gap-3 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-xs font-semibold text-slate-400">
          Verifying security session...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default MainProtected;
