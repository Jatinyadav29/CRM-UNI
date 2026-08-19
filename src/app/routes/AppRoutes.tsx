import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { useAppDispatch } from '@/app/store/hooks';
import { hydrateUserThunk } from '@/entities/user/model/authThunks';
import AuthLayout from '@/app/layout/AuthLayout';
import MainLayout from '@/app/layout/MainLayout';
import PublicProtected from './protected/PublicProtected';
import MainProtected from './protected/MainProtected';
import RoleProtected from './protected/RoleProtected';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import UniversitiesPage from '@/pages/universities/UniversitiesPage';
import UniversityDetailPage from '@/pages/universities/UniversityDetailPage';
import PipelinePage from '@/pages/pipeline/PipelinePage';
import AnalyticsPage from '@/pages/analytics/AnalyticsPage';
import PartnerPortalPage from '@/pages/partner-portal/PartnerPortalPage';
import StudentEnrollmentPage from '@/pages/public/StudentEnrollmentPage';
import NotFoundPage from '@/pages/not-found/NotFoundPage';

export const AppRoutes: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateUserThunk());
  }, [dispatch]);

  const router = createBrowserRouter([
    // Public Student Enrollment Route
    {
      path: '/enroll/:universityId',
      element: <StudentEnrollmentPage />,
    },

    // Public / Auth routes
    {
      path: '/',
      element: <PublicProtected />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              index: true,
              element: <LoginPage />,
            },
            {
              path: 'register',
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },

    // Protected Routes (CRM + Partner Portal)
    {
      element: <MainProtected />,
      children: [
        {
          element: <MainLayout />,
          children: [
            // University Partner Portal (Allowed for partners and admins)
            {
              path: '/partner-portal',
              element: <PartnerPortalPage />,
            },

            // Admin CRM Workspace (Protected by RoleProtected guard)
            {
              path: '/main',
              element: <RoleProtected />,
              children: [
                {
                  index: true,
                  element: <DashboardPage />,
                },
                {
                  path: 'universities',
                  element: <UniversitiesPage />,
                },
                {
                  path: 'universities/:id',
                  element: <UniversityDetailPage />,
                },
                {
                  path: 'pipeline',
                  element: <PipelinePage />,
                },
                {
                  path: 'analytics',
                  element: <AnalyticsPage />,
                },
              ],
            },
          ],
        },
      ],
    },

    // Catch-all
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
