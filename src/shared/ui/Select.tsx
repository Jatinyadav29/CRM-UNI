import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, children, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold text-slate-500 tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full appearance-none bg-white border border-slate-100 text-slate-900 text-sm rounded-xl min-h-[44px] py-2.5 pl-3.5 pr-10 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer',
              error && 'border-rose-500 bg-rose-50/30',
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
        </div>
        {error && (
          <p className="text-rose-500 text-xs font-medium px-0.5">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
