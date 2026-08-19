import React from 'react';
import { Outlet } from 'react-router';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
