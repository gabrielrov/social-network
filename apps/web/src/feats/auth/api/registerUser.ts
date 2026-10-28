import { envWrapper } from '@/config/env'
import { RegisterDTO } from '@repo/contracts/auth/schema'

export async function registerUser(data: RegisterDTO) {
  const res = await fetch(`${envWrapper.apiUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (res.status === 409) throw new Error('conflict_error') // TODO: improve this
  if (!res.ok) throw new Error('Failed to register user')
}
