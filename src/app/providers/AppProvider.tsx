import React from 'react';
import { StoreProvider } from './StoreProvider';
import { QueryProvider } from './QueryProvider';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { ToastContainer } from 'react-toastify';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryProvider>
      <StoreProvider>
        <SmoothScrollProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="light"
          />
        </SmoothScrollProvider>
      </StoreProvider>
    </QueryProvider>
  );
};
