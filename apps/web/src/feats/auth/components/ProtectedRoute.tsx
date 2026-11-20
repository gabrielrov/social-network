import { UserDTO } from '@repo/contracts/user/types'
import { Navigate, Outlet, useRouteLoaderData } from 'react-router-dom'

export function ProtectedRoute() {
  const currentUser = useRouteLoaderData<UserDTO>('auth')

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
