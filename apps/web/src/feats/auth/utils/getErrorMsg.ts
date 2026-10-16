import { FormError } from '@/feats/auth/types'
import { RegisterDTO } from '@repo/contracts/auth'

export function getErrorMsg(
  formErrors: FormError[],
  origin: keyof RegisterDTO,
): string | undefined {
  const matchedError = formErrors.find((error) => error.origin === origin)

  if (!matchedError) return

  const code = matchedError.code

  if (code === 'too_small') {
    if (origin === 'username') {
      return 'Create an unique username'
    }
    if (origin === 'firstName') {
      return "What's your first name?"
    }
    if (origin === 'surname') {
      return "What's your surname?"
    }
    if (origin === 'password') {
      return 'At least 6 characters are required'
    }
  }

  if (origin === 'confirmPassword') {
    const passwordError = formErrors.find(
      (error) => error.origin === 'password',
    )

    if (passwordError) {
      return 'The original password is invalid'
    }

    if (code === 'password_mismatch' || code === 'too_small') {
      return "The passwords don't match"
    }
  }

  return matchedError.message
}
