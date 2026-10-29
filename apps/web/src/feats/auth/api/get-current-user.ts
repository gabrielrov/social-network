import { envWrapper } from '@/config/env'
import { ApiError } from '@/errors'

// TODO: use User type instead of object
export async function getCurrentUser(token: string): Promise<object | null> {
  const res = await fetch(envWrapper.apiUrl + '/api/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (res.status === 401) {
    return null
  }

  if (!res.ok) throw new ApiError(res.status)

  return await res.json()
}
