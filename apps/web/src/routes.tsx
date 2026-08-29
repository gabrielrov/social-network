import { RouteObject } from 'react-router-dom'
import { ProtectedRoute } from '@/feats/auth/components/protected-route'
import { authLoader } from '@/feats/auth/utils/auth-loader'

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
    // TODO: element: <LoginPage />,
  },
]
