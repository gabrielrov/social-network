import { envWrapper } from '@/config/env'
import { ApiError } from '@/errors'
import { UserDTO } from '@repo/contracts/user/types'

export async function getUser(username: string): Promise<UserDTO | null> {
  const res = await fetch(envWrapper.apiUrl + '/api/users/' + username)

  if (res.status === 404) {
    return null
  }

  if (!res.ok) throw new ApiError(res.status)

  return await res.json()
}

export async function getUserByToken(token: string): Promise<UserDTO | null> {
  const res = await fetch(envWrapper.apiUrl + '/api/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (res.status === 401) {
    return null
  }

  if (!res.ok) throw new ApiError(res.status)

  return await res.json()
}
