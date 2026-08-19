import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer active:scale-[0.98] min-h-[44px] sm:min-h-0';

    const variants = {
      primary:
        'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900 shadow-sm hover:shadow',
      secondary:
        'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-300',
      outline:
        'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-400',
      ghost:
        'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-300',
      danger:
        'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm',
    };

    const sizes = {
      sm: 'text-xs px-3 py-2 sm:py-1.5 gap-1.5 font-medium',
      md: 'text-sm px-4 py-2.5 gap-2 font-medium',
      lg: 'text-base px-5 py-3 gap-2.5 font-semibold',
      icon: 'p-2.5 w-11 h-11 sm:w-10 sm:h-10',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
