import { envWrapper } from '@/config/env'
import { ApiError } from '@/errors'
import { RegisterDTO } from '@repo/contracts/auth/schema'

export async function registerUser(data: RegisterDTO) {
  const res = await fetch(`${envWrapper.apiUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (res.status === 409) throw new ApiError(409)
  if (!res.ok) throw new ApiError(res.status)
}
