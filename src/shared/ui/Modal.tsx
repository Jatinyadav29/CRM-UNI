import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6">
      {/* Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity duration-200"
      />

      {/* Adaptive Modal Dialog: Full-screen sheet on mobile (< sm), centered dialog on >= sm */}
      <div
        className={cn(
          'relative w-full h-full sm:h-auto bg-white rounded-none sm:rounded-2xl shadow-sm border-0 sm:border sm:border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col sm:max-h-[90vh]',
          maxWidths[maxWidth]
        )}
      >
        <div className="flex items-start justify-between p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 sticky top-0 bg-white z-10 shrink-0">
          <div>
            {title && (
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-slate-500 font-medium mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
