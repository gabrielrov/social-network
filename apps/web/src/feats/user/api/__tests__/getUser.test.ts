import { envWrapper } from '@/config/env'
import { ApiError } from '@/errors'
import { getUser, getUserByToken } from '@/feats/user/api/getUser'
import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('getUser', () => {
  it('return null on 404 status', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 404 })),
    )

    expect(await getUser('unexistent_user')).toBe(null)
  })

  it('throws ApiError if response not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 400 })),
    )

    await expect(getUser('user')).rejects.toThrow(ApiError)
  })

  it('returns fetch response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify('response'), {
          status: 200,
        }),
      ),
    )

    const username = 'name'

    expect(await getUser(username)).toBe('response')

    expect(fetch).toHaveBeenCalledWith(
      envWrapper.apiUrl + '/api/users/' + username,
    )
  })
})

describe('getUserByToken', () => {
  it('returns null on 401 status', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 401 })),
    )

    expect(await getUserByToken('unexistent_user')).toBe(null)
  })

  it('throws ApiError if response not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 400 })),
    )

    await expect(getUserByToken('user')).rejects.toThrow(ApiError)
  })

  it('returns fetch response', async () => {
    const token = 'token'

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(token), {
          status: 200,
        }),
      ),
    )

    expect(await getUserByToken(token)).toBe(token)

    expect(fetch).toHaveBeenCalledWith(envWrapper.apiUrl + '/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
  })
})
