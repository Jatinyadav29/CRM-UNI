import React from 'react';
import { cn } from '../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  hoverable = false,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 @container',
        hoverable &&
          'hover:shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:border-slate-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
