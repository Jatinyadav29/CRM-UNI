import React from 'react';
import { cn } from '@/shared/lib/utils';
import type { IUser } from '../model/types';

export interface UserAvatarProps {
  user?: IUser | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md',
  className,
}) => {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const initials = user?.fullName
    ? user.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  if (user?.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user.fullName || 'User Avatar'}
        className={cn(
          'rounded-full object-cover border border-slate-200 shadow-xs',
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full bg-linear-to-tr from-slate-800 to-slate-950 text-white font-bold flex items-center justify-center border border-slate-700 shadow-xs select-none',
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
};
