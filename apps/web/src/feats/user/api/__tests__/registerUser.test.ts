import { envWrapper } from '@/config/env'
import { ApiError } from '@/errors'
import { registerUser } from '@/feats/user/api/registerUser'
import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('registerUser', () => {
  const userData = {
    username: 'user',
    firstName: 'name',
    surname: 'surname',
    password: 'password',
    confirmPassword: 'password',
  }

  it('throws ApiError if response not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 400 })),
    )

    await expect(registerUser(userData)).rejects.toThrow(ApiError)
  })

  it('calls fetch with user data', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 200 })),
    )

    await registerUser(userData)

    expect(fetch).toHaveBeenCalledWith(
      `${envWrapper.apiUrl}/api/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      },
    )
  })
})
