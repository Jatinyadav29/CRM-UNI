import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { loginUserThunk } from '@/entities/user/model/authThunks';
import { Button, Input } from '@/shared/ui';
import { AtSign, Lock, ShieldCheck, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { ILoginCredentials } from '@/entities/user/model/types';

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ILoginCredentials>({
    defaultValues: {
      username: 'alex.vance',
      password: 'Password123!',
    },
  });

  const onSubmit = async (data: ILoginCredentials) => {
    const result = await dispatch(loginUserThunk(data));
    if (loginUserThunk.fulfilled.match(result)) {
      if (result.payload.user.role === 'university_partner') {
        navigate('/partner-portal');
      } else {
        navigate('/main');
      }
    }
  };

  const handleQuickFill = (role: 'admin' | 'oxford' | 'stanford') => {
    if (role === 'admin') {
      setValue('username', 'alex.vance');
      setValue('password', 'Password123!');
    } else if (role === 'oxford') {
      setValue('username', 'oxford.partner');
      setValue('password', 'PartnerSecure2026!');
    } else if (role === 'stanford') {
      setValue('username', 'stanford.partner');
      setValue('password', 'PartnerSecure2026!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {error && (
        <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-100 rounded-xl font-medium">
          {error}
        </div>
      )}

      {/* Quick Demo Role Selector */}
      <div className="flex flex-col gap-1.5 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Quick Demo Persona Select:
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickFill('admin')}
            className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-100 text-[11px] font-bold text-slate-800 hover:text-blue-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            CRM Admin
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('oxford')}
            className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-100 text-[11px] font-bold text-slate-800 hover:text-blue-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            Oxford Partner
          </button>
        </div>
      </div>

      <Input
        label="Username / Email"
        leftIcon={<AtSign className="w-4 h-4" />}
        placeholder="alex.vance"
        error={errors.username?.message}
        {...register('username', {
          required: 'Username or email is required',
          minLength: { value: 3, message: 'Must be at least 3 characters' },
        })}
      />

      <div className="flex flex-col gap-1">
        <Input
          label="Password"
          type="password"
          leftIcon={<Lock className="w-4 h-4" />}
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Must be at least 6 characters' },
          })}
        />
        <div className="flex justify-end">
          <a
            href="#forgot"
            className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        size="lg"
        className="w-full mt-1"
      >
        Sign In to Portal
      </Button>
    </form>
  );
};

export default LoginForm;
