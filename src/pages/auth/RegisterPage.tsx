import React from 'react';
import { RegisterForm } from '@/features/auth/register-account/ui/RegisterForm';
import { Link } from 'react-router';
import { Building2, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-slate-50 font-sans">
      {/* Left Panel: Solid bg-blue-600 branding (Desktop) */}
      <div className="bg-blue-600 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Top Branding */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-sm">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              Genesis CRM
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            </h1>
            <p className="text-[11px] font-medium text-blue-100 uppercase tracking-wider">
              Institutional Onboarding
            </p>
          </div>
        </div>

        {/* Center Hero Copy & Value Props */}
        <div className="my-10 lg:my-0 flex flex-col gap-6 max-w-lg z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/40 border border-blue-400/30 text-xs font-semibold text-white self-start">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Partner Registration</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Connect Your Higher-Ed Institution to Global Student Inflow
          </h2>

          <p className="text-sm text-blue-100 font-normal leading-relaxed">
            Join the Genesis CRM network to unlock direct candidate applications, manage multi-year contract milestones, and track cohort capacity in real-time.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-blue-700/40 border border-blue-400/20 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-200 shrink-0" />
              <span className="text-xs font-medium text-white">Dedicated Partner Portal</span>
            </div>
            <div className="p-3.5 rounded-xl bg-blue-700/40 border border-blue-400/20 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-200 shrink-0" />
              <span className="text-xs font-medium text-white">Automated Enrollment URL</span>
            </div>
          </div>
        </div>

        {/* Footer Subtext */}
        <div className="text-xs text-blue-200 z-10 hidden sm:block">
          © {new Date().getFullYear()} Genesis CRM Inc. Strictly confidential and restricted enterprise access.
        </div>
      </div>

      {/* Right Panel: Centered Form (Pure bg-white Card on light slate-50 background) */}
      <div className="flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Create Partner Account
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Fill in your representative details to establish your institutional profile.
            </p>
          </div>

          <RegisterForm />

          <div className="text-center text-xs text-slate-500 font-medium pt-3 border-t border-slate-100">
            Already have an account?{' '}
            <Link
              to="/"
              className="text-blue-600 font-bold hover:text-blue-700 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
