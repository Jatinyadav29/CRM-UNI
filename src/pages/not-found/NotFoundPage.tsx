import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/shared/ui';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50 font-sans">
      <div className="max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center gap-4">
        <span className="text-5xl font-black text-indigo-600">404</span>
        <h2 className="text-xl font-bold text-slate-900">Page Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested page or dashboard endpoint does not exist.
        </p>
        <Button
          onClick={() => navigate('/main')}
          leftIcon={<Home className="w-4 h-4" />}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
