import React from 'react';
import { Outlet } from 'react-router';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
