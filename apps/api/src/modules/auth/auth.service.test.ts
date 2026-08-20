import { User } from '@/generated/prisma/client'
import { LoginDTO } from '@/modules/auth/auth.schema'
import { login } from '@/modules/auth/auth.service'
import bcrypt from 'bcryptjs'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import jwt from 'jsonwebtoken'
import env from '@/config/env'
import { UnauthorizedError } from '@/errors'

vi.mock(import('@/modules/users/users.repository'))
const usersRepository = vi.mocked(
  await import('@/modules/users/users.repository'),
)

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('login service', () => {
  it('returns valid token on successful login', async () => {
    const loginData: LoginDTO = {
      username: 'name',
      password: 'password',
    }

    const mockUser: User = {
      id: '12345',
      username: 'mock_user',
      firstName: 'false',
      surname: 'user',
      passwordHash: await bcrypt.hash(loginData.password, 10),
      role: 'USER',
    }

    usersRepository.findByUsername.mockResolvedValue(mockUser)

    const token = await login(loginData)
    const payload = jwt.verify(token, env.jwtSecret)

    expect(payload.sub).toBe(mockUser.id)
  })

  it("throws if user doesn't exist", async () => {
    const loginData: LoginDTO = {
      username: 'name',
      password: 'password',
    }

    usersRepository.findByUsername.mockResolvedValue(null)

    await expect(login(loginData)).rejects.toThrow(UnauthorizedError)
  })

  it('throws if password is invalid', async () => {
    const loginData: LoginDTO = {
      username: 'name',
      password: 'invalid_password',
    }

    const mockUser: User = {
      id: '12345',
      username: 'mock_user',
      firstName: 'false',
      surname: 'user',
      passwordHash: await bcrypt.hash('valid_password', 10),
      role: 'USER',
    }

    usersRepository.findByUsername.mockResolvedValue(mockUser)

    await expect(login(loginData)).rejects.toThrow(UnauthorizedError)
  })
})
