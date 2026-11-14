import { getUserByToken } from '@/feats/auth/api/getUser'

export async function authLoader(): Promise<object | null> {
  const token = localStorage.getItem('token')

  if (!token) {
    return null
  }

  try {
    return await getUserByToken(token)
  } catch {
    return null
  }
}
