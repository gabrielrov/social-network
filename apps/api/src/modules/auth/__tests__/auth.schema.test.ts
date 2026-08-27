import { describe, expect, it } from 'vitest'
import {
  LoginDTO,
  loginSchema,
  RegisterDTO,
  registerSchema,
} from '@/modules/auth/auth.schema'

describe('login schema', () => {
  it('trims empty spaces', () => {
    const data: LoginDTO = {
      username: '  user  ',
      password: ' password ',
    }
    const result = loginSchema.safeParse(data)

    expect(result.success).toBe(true)
    expect(result.data).toStrictEqual({
      username: 'user',
      password: 'password',
    })
  })

  it('refuses empty strings', () => {
    const data: LoginDTO = {
      username: '',
      password: '',
    }
    const result = loginSchema.safeParse(data)

    expect(result.success).toBe(false)
  })
})

describe('register schema', () => {
  it('trims empty spaces on non-password fields', () => {
    const data: RegisterDTO = {
      username: ' user ',
      firstName: ' name ',
      surname: ' surname ',
      password: ' password ',
      confirmPassword: ' password ',
    }
    const result = registerSchema.safeParse(data)

    expect(result.success).toBe(true)
    expect(result.data).toStrictEqual({
      username: 'user',
      firstName: 'name',
      surname: 'surname',
      password: ' password ',
      confirmPassword: ' password ',
    })
  })

  it('refuses empty strings', () => {
    const data: RegisterDTO = {
      username: '',
      firstName: '',
      surname: '',
      password: '',
      confirmPassword: '',
    }
    const result = registerSchema.safeParse(data)

    expect(result.success).toBe(false)
  })

  it('requires password and confirmation password to match', () => {
    const correctData: RegisterDTO = {
      username: ' user ',
      firstName: ' name ',
      surname: ' surname ',
      password: ' password ',
      confirmPassword: ' password ',
    }

    const wrongData: RegisterDTO = {
      username: ' user ',
      firstName: ' name ',
      surname: ' surname ',
      password: ' password ',
      confirmPassword: ' different_password ',
    }

    const correctResult = registerSchema.safeParse(correctData)
    expect(correctResult.success).toBe(true)

    const wrongResult = registerSchema.safeParse(wrongData)
    expect(wrongResult.success).toBe(false)
  })
})
