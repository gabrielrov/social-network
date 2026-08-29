import { getCurrentUser } from '@/feats/auth/api/get-current-user'

export async function authLoader() {
  const token = localStorage.getItem('token')

  if (!token) {
    return null
  }

  return await getCurrentUser(token)
}
