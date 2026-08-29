import { Navigate, Outlet, useRouteLoaderData } from 'react-router-dom'

export function ProtectedRoute() {
  const currentUser = useRouteLoaderData('auth') // TODO: specify user type

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
