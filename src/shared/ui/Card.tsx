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
        'bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-200',
        hoverable && 'hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:border-slate-300 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
