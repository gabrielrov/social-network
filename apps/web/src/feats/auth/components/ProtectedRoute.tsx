import { Navigate, Outlet, useRouteLoaderData } from 'react-router-dom'

export function ProtectedRoute() {
  const currentUser = useRouteLoaderData('auth')

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
