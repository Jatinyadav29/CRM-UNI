import React, { useEffect } from 'react';
import { initLenis, destroyLenis } from '@/shared/lib/lenis';

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
};
