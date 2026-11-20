import { envWrapper } from '@/config/env'
import { ApiError } from '@/errors'
import { LoginDTO } from '@repo/contracts/auth/schema'

export async function getUserToken(data: LoginDTO): Promise<string> {
  const res = await fetch(`${envWrapper.apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new ApiError(res.status)

  const token = (await res.json()).token as string
  return token
}
