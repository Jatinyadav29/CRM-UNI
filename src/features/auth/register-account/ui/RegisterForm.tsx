import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { registerUserThunk } from '@/entities/user/model/authThunks';
import { Button, Input, Select } from '@/shared/ui';
import { User, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { IRegisterPayload } from '@/entities/user/model/types';

export const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterPayload>({
    defaultValues: {
      department: 'Global Academic Partnerships',
    },
  });

  const onSubmit = async (data: IRegisterPayload) => {
    const result = await dispatch(registerUserThunk(data));
    if (registerUserThunk.fulfilled.match(result)) {
      navigate('/main');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
      {error && (
        <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-100 rounded-xl font-medium">
          {error}
        </div>
      )}

      <Input
        label="Full Name"
        leftIcon={<User className="w-4 h-4" />}
        placeholder="Sarah Jenkins"
        error={errors.name?.message}
        {...register('name', {
          required: 'Full name is required',
          minLength: { value: 3, message: 'Must be at least 3 characters' },
        })}
      />

      <Input
        label="Institutional Email"
        type="email"
        leftIcon={<Mail className="w-4 h-4" />}
        placeholder="s.jenkins@ox.ac.uk"
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email',
          },
        })}
      />

      <Select
        label="Department"
        {...register('department')}
        options={[
          { value: 'Global Academic Partnerships', label: 'Global Academic Partnerships' },
          { value: 'International Student Recruitment', label: 'International Student Recruitment' },
          { value: 'Admissions & Enrollment', label: 'Admissions & Enrollment' },
          { value: 'Executive CRM Management', label: 'Executive CRM Management' },
        ]}
      />

      <Input
        label="Password"
        type="password"
        leftIcon={<Lock className="w-4 h-4" />}
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 6, message: 'Minimum 6 characters required' },
        })}
      />

      <Button
        type="submit"
        isLoading={isLoading}
        size="lg"
        className="w-full mt-2"
      >
        Create Partner Account
      </Button>
    </form>
  );
};

export default RegisterForm;
