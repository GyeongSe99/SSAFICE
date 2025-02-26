import { createBrowserRouter, Navigate } from 'react-router-dom'
import { NotFoundPage } from '@/pages/notFound'
import { LoginPage } from '@/pages/login'
import { SignupPage } from '@/pages/signup'
import { LandingPage } from '@/pages/landing'
import { MatterMostSyncPage } from '@/pages/mmSync'
import { MainPage } from '@/pages/main'
import { baseLayout } from './layouts/baseLayout'
import { ProPage } from '@/pages/pro'
import ProtectedRoute from '@/app/layouts/ProtectedRoute'
import { SSORedirect, LoginRedirect } from '@/pages/redirect'

type AppRouterProps = {
  isAuthenticated: boolean
  role: string | null
}

export const appRouter = ({ isAuthenticated, role }: AppRouterProps) => {
  return createBrowserRouter([
    {
      path: '/',
      element: baseLayout,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: isAuthenticated ? <Navigate to='/main' /> : <Navigate to='/landing' />,
        },
        {
          path: 'landing',
          element: <LandingPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'signup',
          element: <SignupPage />,
        },
        {
          path: 'mattermost/sync',
          element: <MatterMostSyncPage />,
        },
        {
          path: '/sso/providers/ssafy/callback',
          element: <SSORedirect />,
        },
        {
          path: 'main',
          element:
            role === 'ROLE_USER' ? (
              <ProtectedRoute role='ROLE_USER'>
                <MainPage />
              </ProtectedRoute>
            ) : role === 'ROLE_ADMIN' ? (
              <ProtectedRoute role='ROLE_ADMIN'>
                <ProPage />
              </ProtectedRoute>
            ) : (
              <LoginRedirect />
            ),
        },
      ],
    },
  ])
}
