import { getUserByToken } from '@/feats/user/api/getUser'
import { UserDTO } from '@repo/contracts/user/types'

export async function authLoader(): Promise<UserDTO | null> {
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
