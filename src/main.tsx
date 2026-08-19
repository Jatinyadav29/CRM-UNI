import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppProvider } from './app/providers/AppProvider';
import AppRoutes from './app/routes/AppRoutes';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find root element');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </React.StrictMode>
);
