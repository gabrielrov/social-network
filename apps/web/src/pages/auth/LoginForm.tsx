import { Link } from 'react-router-dom'
import { LoginButton } from '@/pages/auth/LoginButton'
import { FormInput } from '@/pages/auth/FormInput'
import { GuestButton } from '@/pages/auth/GuestButton'

export function LoginForm() {
  // TODO: add functionality
  return (
    <div>
      <form action="">
        <div className="flex flex-col gap-4 text-sm">
          <FormInput id="username" type="text" placeholder="Username" />
          <FormInput id="password" type="password" placeholder="Password" />
          <LoginButton />
        </div>
      </form>
      <GuestButton />
      <p className="mt-6 text-start text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="font-bold text-zinc-900 hover:underline">
          Signup
        </Link>
      </p>
    </div>
  )
}
