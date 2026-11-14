import { getCurrentUser } from '@/feats/auth/api/get-current-user'

export async function authLoader(): Promise<object | null> {
  const token = localStorage.getItem('token')

  if (!token) {
    return null
  }

  try {
    return await getCurrentUser(token)
  } catch {
    return null
  }
}
