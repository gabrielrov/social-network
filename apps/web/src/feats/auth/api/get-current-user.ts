import { envWrapper } from '@/config/env'

// TODO: use User type instead of object
export async function getCurrentUser(token: string): Promise<object | null> {
  const res = await fetch(envWrapper.apiUrl + '/api/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (res.status === 401) {
    return null
  }

  if (!res.ok) throw new Error('Failed to fetch user')

  return await res.json()
}
