import { Link, useNavigate } from 'react-router-dom'
import { FormInput } from '@/pages/auth/FormInput'
import { GuestButton } from '@/pages/auth/GuestButton'
import { FormButton } from '@/pages/auth/FormButton'
import { LoginFormError } from '@/feats/auth/types'
import { useState } from 'react'
import { LoginDTO, loginSchema } from '@repo/contracts/auth/schema'
import { getUser } from '@/feats/user/api/getUser'
import { loginUser } from '@/feats/auth/utils/loginUser'
import { getLoginErrorMsg } from '@/feats/auth/utils/getErrorMsg'
import { ApiError } from '@/errors'

export function LoginForm() {
  const [errors, setErrors] = useState<LoginFormError[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data: LoginDTO = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    }

    const schemaIssues = loginSchema.safeParse(data).error?.issues || []
    const issues: LoginFormError[] = schemaIssues.map((issue) => ({
      code: issue.code,
      origin: issue.path[0] as keyof LoginDTO,
      message: issue.message,
    }))

    const usernameHasIssue = issues.some((issue) => issue.origin === 'username')
    if (!usernameHasIssue) {
      try {
        const user = await getUser(data.username)
        if (!user) issues.push({ origin: 'username', code: 'unexistent' })
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
      await loginUser(data)
      setErrors([])
      navigate('/')
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setErrors([{ origin: 'password', code: 'wrong_password' }])
        return
      }

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
            errorMsg={getLoginErrorMsg(errors, 'username')}
          />
          <FormInput
            id="password"
            type="password"
            placeholder="Password"
            errorMsg={getLoginErrorMsg(errors, 'password')}
          />
          <FormButton disabled={isSubmitting}>Login</FormButton>
        </div>
      </form>
      <GuestButton />
      <p className="mt-6 text-start text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-bold text-zinc-900 hover:underline"
        >
          Signup
        </Link>
      </p>
    </div>
  )
}
