import { loginUser } from '@/feats/auth/utils/login'
import { getUserToken } from '@/feats/user/api/getUserToken'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock(import('@/feats/user/api/getUserToken'))

afterEach(() => {
  localStorage.clear()
})

describe('loginUser', () => {
  it('sets localStorage token', async () => {
    expect(localStorage.getItem('token')).toBe(null)

    vi.mocked(getUserToken).mockResolvedValue('test')
    await loginUser({ username: 'user', password: 'password' })

    expect(localStorage.getItem('token')).toBe('test')
  })
})
