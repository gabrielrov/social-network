import { FormButton } from '@/pages/auth/FormButton'
import { FormInput } from '@/pages/auth/FormInput'
import { Link } from 'react-router-dom'

export function RegisterForm() {
  // TODO: add functionality
  return (
    <div>
      <form action="">
        <div className="flex flex-col gap-4 text-sm">
          <FormInput id="username" type="text" placeholder="Username" />
          <FormInput id="firstName" type="text" placeholder="First name" />
          <FormInput id="surname" type="text" placeholder="Surname" />
          <FormInput id="password" type="password" placeholder="Password" />
          <FormInput
            id="cPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <FormButton>Register</FormButton>
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
