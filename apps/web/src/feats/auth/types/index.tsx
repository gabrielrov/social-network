import { LoginDTO, RegisterDTO } from '@repo/contracts/auth/schema'
import { AuthErrorCode } from '@repo/contracts/auth/types'

export type RegisterFormError = {
  origin: keyof RegisterDTO
  code?: AuthErrorCode
  message?: string
}

export type LoginFormError = {
  origin: keyof LoginDTO
  code?: AuthErrorCode
  message?: string
}
