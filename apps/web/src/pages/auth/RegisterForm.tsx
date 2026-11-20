import { FormButton } from '@/pages/auth/FormButton'
import { FormInput } from '@/pages/auth/FormInput'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerSchema, RegisterDTO } from '@repo/contracts/auth/schema'
import { getRegisterErrorMsg } from '@/feats/auth/utils/getErrorMsg'
import { RegisterFormError } from '@/feats/auth/types'
import { registerUser } from '@/feats/auth/api/registerUser'
import { getUser } from '@/feats/auth/api/getUser'
import { loginUser } from '@/feats/auth/utils/loginUser'

export function RegisterForm() {
  const [errors, setErrors] = useState<RegisterFormError[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data: RegisterDTO = {
      username: formData.get('username') as string,
      firstName: formData.get('firstName') as string,
      surname: formData.get('surname') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    }

    const schemaIssues = registerSchema.safeParse(data).error?.issues || []
    const issues: RegisterFormError[] = schemaIssues.map((issue) => ({
      code: issue.code,
      origin: issue.path[0] as keyof RegisterDTO,
      message: issue.message,
    }))

    const usernameHasIssue = issues.some((issue) => issue.origin === 'username')
    if (!usernameHasIssue) {
      try {
        const user = await getUser(data.username)
        if (user) issues.push({ origin: 'username', code: 'conflict' })
      } catch {
        issues.push({ origin: 'username', code: 'connection' })
      }
    }

    if (issues.length > 0) {
      setErrors(issues)
      setIsSubmitting(false)
      return
    }

    try {
      await registerUser(data)
      await loginUser(data)
      setErrors([])
      navigate('/')
    } catch {
      setErrors([{ origin: 'username', code: 'connection' }])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 text-sm">
          <FormInput
            id="username"
            type="text"
            placeholder="Username"
            errorMsg={getRegisterErrorMsg(errors, 'username')}
          />
          <FormInput
            id="firstName"
            type="text"
            placeholder="First name"
            errorMsg={getRegisterErrorMsg(errors, 'firstName')}
          />
          <FormInput
            id="surname"
            type="text"
            placeholder="Surname"
            errorMsg={getRegisterErrorMsg(errors, 'surname')}
          />
          <FormInput
            id="password"
            type="password"
            placeholder="Password"
            errorMsg={getRegisterErrorMsg(errors, 'password')}
          />
          <FormInput
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            errorMsg={getRegisterErrorMsg(errors, 'confirmPassword')}
          />
          <FormButton disabled={isSubmitting}>Register</FormButton>
        </div>
        <p className="mt-6 text-start text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-zinc-900 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
