import { ApiError } from '@/errors'
import { getUserToken } from '@/feats/user/api/getUserToken'
import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('getUserToken', () => {
  it('throws ApiError if response not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 400 })),
    )

    await expect(
      getUserToken({ username: 'user', password: 'password' }),
    ).rejects.toThrow(ApiError)
  })

  it('returns token on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response(JSON.stringify({ token: 'abc123' }), { status: 200 }),
        ),
    )

    expect(await getUserToken({ username: 'user', password: 'password' })).toBe(
      'abc123',
    )
  })
})
