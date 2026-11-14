import { envWrapper } from '@/config/env'
import { ApiError } from '@/errors'
import { RegisterDTO } from '@repo/contracts/auth/schema'

export async function registerUser(data: RegisterDTO): Promise<void> {
  const res = await fetch(`${envWrapper.apiUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new ApiError(res.status)
}
