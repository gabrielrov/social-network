import { RegisterDTO } from '@repo/contracts/auth'

export type FormError = {
  code: string
  origin: keyof RegisterDTO | string
  message: string
}
