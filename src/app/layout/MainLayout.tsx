import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { AppSidebar } from '@/widgets/app-sidebar/ui/AppSidebar';
import { AppHeader } from '@/widgets/app-header/ui/AppHeader';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer on route transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const getHeaderContext = () => {
    switch (location.pathname) {
      case '/partner-portal':
        return {
          title: 'University Partner Portal',
          subtitle: 'Institutional Overview, Signed MoU Agreement & Public Enrollment',
        };
      case '/main/universities':
        return {
          title: 'University Partner Directory',
          subtitle: 'Accredited Higher-Ed Network & Admissions Capacity',
        };
      case '/main/pipeline':
        return {
          title: 'Institutional Sales Pipeline',
          subtitle: 'Active Multi-Year Contract Stages & Revenue Probabilities',
        };
      case '/main/analytics':
        return {
          title: 'Executive Telemetry & Reports',
          subtitle: 'ARR Growth, Funnel Conversions & Regional Share',
        };
      default:
        return {
          title: 'Executive Intelligence CRM',
          subtitle: 'Global University Network & Enrollment Pipeline',
        };
    }
  };

  const headerContext = getHeaderContext();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased relative">
      {/* Desktop Persistent Left Sidebar (Hidden on mobile < md) */}
      <AppSidebar />

      {/* Mobile Drawer (Stacking Context: Strictly Positive z-50, 0 negative z-indexes) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet Container (320px support: w-72 max-w-[85vw]) */}
          <div className="relative z-50 flex-1 w-72 max-w-[85vw] bg-white shadow-sm border-r border-slate-100 flex flex-col animate-in slide-in-from-left duration-200">
            <AppSidebar
              isMobileDrawer
              onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AppHeader
          title={headerContext.title}
          subtitle={headerContext.subtitle}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
