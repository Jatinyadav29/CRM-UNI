import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-slate-500 tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-slate-400 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full bg-white border border-slate-100 text-slate-900 placeholder:text-slate-400 text-sm rounded-xl py-2.5 px-3.5 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-rose-500 bg-rose-50/30 focus:border-rose-600 focus:ring-rose-500',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-slate-400 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-rose-500 text-xs font-medium px-0.5">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-slate-500 text-xs px-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
