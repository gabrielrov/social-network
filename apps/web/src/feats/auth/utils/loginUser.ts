import { getUserToken } from '@/feats/user/api/getUserToken'
import { LoginDTO } from '@repo/contracts/auth/schema'

export async function loginUser(data: LoginDTO): Promise<void> {
  const token = await getUserToken(data)
  localStorage.setItem('token', token)
}
