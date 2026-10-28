import { RegisterDTO } from '@repo/contracts/auth/schema'
import { AuthErrorCode } from '@repo/contracts/auth/types'

export type FormError = {
  code: AuthErrorCode
  origin: keyof RegisterDTO | string
  message: string
}
