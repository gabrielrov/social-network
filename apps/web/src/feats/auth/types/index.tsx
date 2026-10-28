import { RegisterDTO } from '@repo/contracts/auth/schema'

export type FormError = {
  code: string
  origin: keyof RegisterDTO | string
  message: string
}
