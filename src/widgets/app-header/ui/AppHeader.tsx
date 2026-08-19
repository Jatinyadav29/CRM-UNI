import React from 'react';
import { useAppSelector } from '@/app/store/hooks';
import { UserAvatar } from '@/entities/user/ui/UserAvatar';
import { Bell, ShieldCheck, Menu } from 'lucide-react';
import { LogoutButton } from '@/features/auth/logout-button/ui/LogoutButton';

export interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  onOpenMobileMenu?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = 'Executive Intelligence CRM',
  subtitle = 'Global University Network & Enrollment Pipeline',
  onOpenMobileMenu,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between transition-all">
      {/* Left: Mobile Drawer Trigger + Title */}
      <div className="flex items-center gap-3 min-w-0">
        {onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open Navigation Menu"
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="min-w-0">
          <h1 className="text-sm sm:text-lg font-bold text-slate-900 leading-tight tracking-tight truncate">
            {title}
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block truncate">{subtitle}</p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Environment Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Supabase Live</span>
        </div>

        {/* Notification Icon */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-0.5 sm:mx-1" />

        {/* User Profile */}
        <div className="flex items-center gap-2.5">
          <UserAvatar user={user} size="sm" />
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[120px]">
              {user?.fullName || 'Enterprise Admin'}
            </span>
            <span className="text-[10px] text-slate-500 font-medium capitalize truncate">
              {user?.role?.replace('_', ' ') || 'Director'}
            </span>
          </div>
        </div>

        <LogoutButton showText={false} className="p-2 min-h-[44px] min-w-[44px]" />
      </div>
    </header>
  );
};

export default AppHeader;
