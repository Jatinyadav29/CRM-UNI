import React from 'react';
import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  GraduationCap,
  Kanban,
  BarChart3,
  Sparkles,
  Building2,
  ExternalLink,
  ShieldAlert,
  X,
} from 'lucide-react';
import { LogoutButton } from '@/features/auth/logout-button/ui/LogoutButton';
import { useAppSelector } from '@/app/store/hooks';
import { UserAvatar } from '@/entities/user/ui/UserAvatar';

export interface AppSidebarProps {
  onCloseMobileMenu?: () => void;
  isMobileDrawer?: boolean;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  onCloseMobileMenu,
  isMobileDrawer = false,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const isPartner = user?.role === 'university_partner';
  const partnerUniId = user?.universityId || 'uni_oxford_01';

  const adminNavItems = [
    {
      to: '/main',
      label: 'Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
      end: true,
    },
    {
      to: '/main/universities',
      label: 'University Partners',
      icon: <GraduationCap className="w-4 h-4" />,
      end: false,
    },
    {
      to: '/main/pipeline',
      label: 'Pipeline & Deals',
      icon: <Kanban className="w-4 h-4" />,
      end: false,
    },
    {
      to: '/main/analytics',
      label: 'Analytics & Forecasts',
      icon: <BarChart3 className="w-4 h-4" />,
      end: false,
    },
    {
      to: '/partner-portal',
      label: 'Partner Portal Preview',
      icon: <Building2 className="w-4 h-4" />,
      end: false,
    },
  ];

  const partnerNavItems = [
    {
      to: '/partner-portal',
      label: 'My Institution Portal',
      icon: <Building2 className="w-4 h-4" />,
      end: true,
    },
    {
      to: `/enroll/${partnerUniId}`,
      label: 'Public Enrollment Form',
      icon: <ExternalLink className="w-4 h-4" />,
      end: false,
    },
  ];

  const activeItems = isPartner ? partnerNavItems : adminNavItems;

  return (
    <aside
      className={`bg-white text-slate-900 flex flex-col justify-between select-none min-h-screen ${
        isMobileDrawer
          ? 'w-72 sm:w-80'
          : 'w-64 border-r border-slate-100 shrink-0 hidden md:flex'
      }`}
    >
      {/* Brand Header */}
      <div className="flex flex-col">
        <div className="p-5 sm:p-6 pb-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm text-white font-black text-base">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
                Genesis CRM
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              </h2>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                {isPartner ? 'Partner Portal' : 'Enterprise B2B Hub'}
              </p>
            </div>
          </div>

          {isMobileDrawer && onCloseMobileMenu && (
            <button
              type="button"
              onClick={onCloseMobileMenu}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav className="p-4 flex flex-col gap-1">
          <div className="flex items-center justify-between px-3 py-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {isPartner ? 'Partner Scope' : 'Workspace'}
            </span>
            {isPartner && (
              <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded border border-amber-100">
                Restricted
              </span>
            )}
          </div>

          {activeItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => {
                if (onCloseMobileMenu) onCloseMobileMenu();
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 sm:py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 min-h-[44px] ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-slate-100 flex flex-col gap-3">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-slate-50 border border-slate-100">
          <UserAvatar user={user} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 truncate">
              {user?.fullName || 'Alex Vance'}
            </p>
            <p className="text-[10px] text-slate-500 truncate flex items-center gap-1">
              {isPartner && <ShieldAlert className="w-3 h-3 text-amber-500 shrink-0" />}
              {user?.role?.replace('_', ' ') || 'partnership_director'}
            </p>
          </div>
        </div>

        <LogoutButton className="justify-center w-full py-2.5 bg-slate-50 hover:bg-rose-50 text-rose-600 hover:text-rose-700 border border-slate-100 min-h-[44px] rounded-xl" />
      </div>
    </aside>
  );
};

export default AppSidebar;
