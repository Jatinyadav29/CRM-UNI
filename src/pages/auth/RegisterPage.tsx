import React from 'react';
import { RegisterForm } from '@/features/auth/register-account/ui/RegisterForm';
import { Link } from 'react-router';
import { Sparkles, GraduationCap } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-slate-950 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800/20 flex flex-col animate-in fade-in zoom-in-95 duration-300">
        {/* Banner */}
        <div className="relative h-40 overflow-hidden bg-linear-to-br from-violet-900 via-slate-900 to-slate-950 p-6 flex flex-col justify-end text-white">
          <div className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
            <GraduationCap className="w-5 h-5 text-violet-400" />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet-300 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Genesis Network</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white leading-tight">
            Create Account
          </h2>
          <p className="text-xs text-slate-300">
            Access international university CRM datasets & telemetry
          </p>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8 flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Institutional Onboarding
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill in your details to establish your representative profile.
            </p>
          </div>

          <RegisterForm />

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Already have an account?{' '}
            <Link to="/" className="text-slate-900 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
