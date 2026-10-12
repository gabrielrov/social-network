import { RouteObject } from 'react-router-dom'
import { ProtectedRoute } from '@/feats/auth/components/protected-route'
import { authLoader } from '@/feats/auth/utils/auth-loader'
import { AuthLayout } from '@/pages/auth/AuthLayout'
import { LoginForm } from '@/pages/auth/LoginForm'

export const routes: RouteObject[] = [
  {
    id: 'auth',
    loader: authLoader,
    element: <ProtectedRoute />,
    // TODO: errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        // TODO: element: <Home />,
      },
    ],
  },

  {
    path: '/login',
    element: (
      <AuthLayout
        title="Welcome back!"
        subtitle="Please fill in your login details"
      />
    ),
    children: [{ element: <LoginForm />, index: true }],
  },
  // TODO:
  // {
  //   path: '/register',
  //   element: <AuthLayout />,
  // children: [{ element: <RegisterForm/>, index: true }],
  // },
]
