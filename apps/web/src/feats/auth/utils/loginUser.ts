import getUserToken from '@/feats/auth/api/getUserToken'
import { LoginDTO } from '@repo/contracts/auth/schema'

export default async function loginUser(data: LoginDTO): Promise<void> {
  const token = await getUserToken(data)
  localStorage.setItem('token', token)
}
