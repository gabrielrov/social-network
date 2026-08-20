import { User } from '@/generated/prisma/client'
import { LoginDTO, RegisterDTO } from '@/modules/auth/auth.schema'
import { login, register } from '@/modules/auth/auth.service'
import bcrypt from 'bcryptjs'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import jwt from 'jsonwebtoken'
import env from '@/config/env'
import { ConflictError, UnauthorizedError } from '@/errors'

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

describe('register service', async () => {
  it('throws if user exists', async () => {
    const registerData: RegisterDTO = {
      username: 'username',
      firstName: 'name',
      surname: 'surname',
      password: 'password',
      confirmPassword: 'password',
    }

    const mockUser: User = {
      id: '12345',
      username: 'mock_user',
      firstName: 'false',
      surname: 'user',
      passwordHash: 'hash',
      role: 'USER',
    }

    usersRepository.findByUsername.mockResolvedValue(mockUser)

    await expect(register(registerData)).rejects.toThrow(ConflictError)
  })

  it('calls createUser', async () => {
    const registerData: RegisterDTO = {
      username: 'username',
      firstName: 'name',
      surname: 'surname',
      password: 'password',
      confirmPassword: 'password',
    }

    usersRepository.findByUsername.mockResolvedValue(null)

    const passwordHash = await bcrypt.hash(registerData.password, 10)
    vi.spyOn(bcrypt, 'hash').mockResolvedValue(passwordHash as never)

    await register(registerData)

    expect(usersRepository.createUser).toHaveBeenCalledWith({
      username: registerData.username,
      firstName: registerData.firstName,
      surname: registerData.surname,
      passwordHash,
    })
  })
})
