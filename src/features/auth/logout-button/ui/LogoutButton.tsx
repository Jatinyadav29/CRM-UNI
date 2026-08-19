import React from 'react';
import { useAppDispatch } from '@/app/store/hooks';
import { logoutUserThunk } from '@/entities/user/model/authThunks';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';

export interface LogoutButtonProps {
  className?: string;
  showText?: boolean;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  className,
  showText = true,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer ${
        className || ''
      }`}
      title="Sign Out"
    >
      <LogOut className="w-4 h-4" />
      {showText && <span>Sign Out</span>}
    </button>
  );
};
