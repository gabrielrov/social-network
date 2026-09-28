import { Link } from 'react-router-dom'
import brandIcon from '@/assets/brand-icon.svg'

function Input(props: React.ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className="rounded-full bg-zinc-700 px-3.5 py-3 text-stone-200 select-none"
      title="test"
    />
  )
}

export function LoginPage() {
  return (
    <div className="flex min-h-svh overflow-auto bg-gray-400">
      <main className="flex w-full items-center justify-center bg-neutral-100 px-8 py-3 text-center sm:w-1/3 sm:max-w-150 sm:min-w-min sm:items-start sm:pt-8">
        <div className="w-full max-w-88 sm:max-w-80">
          <div className="mb-9 space-y-0.5">
            <img
              src={brandIcon}
              draggable="false"
              className="mx-auto mb-4 w-25 select-none"
              alt="brand logo"
            />
            <p className="text-xl font-bold ">Welcome back!</p>
            <p className="text-sm text-stone-500">
              Please fill in your login details
            </p>
          </div>
          <form action="">
            <div className="flex flex-col gap-4 text-sm">
              <label className="sr-only" htmlFor="username">
                Username
              </label>
              <Input id="username" type="text" placeholder="Username" />

              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <Input id="password" type="password" placeholder="Password" />

              <button className="cursor-pointer rounded-full bg-zinc-900 py-3 font-bold text-white outline-2 select-none hover:bg-white hover:text-zinc-900 hover:outline-zinc-900">
                Login
              </button>
            </div>
          </form>
          <button className="mt-4 w-full cursor-pointer rounded-full bg-linear-to-r from-orange-500 via-fuchsia-500 to-blue-500 px-3.5 py-1.5 font-bold text-white outline-2 transition-colors duration-500 ease-in-out select-none hover:bg-white hover:bg-none hover:text-zinc-900 hover:outline-zinc-900">
            Guest User
          </button>
          <p className="mt-6 text-start text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-bold text-zinc-900 hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </main>

      {/* TODO: add pretty stuff to this section */}
      <div className="hidden grow gap-29 bg-zinc-900 px-7 py-4 sm:flex sm:flex-col sm:justify-center">
        <p className="text-4xl font-bold text-stone-300 max-w-100 texcen">
          Your masterprice deserves the{' '}
          <span className="text-green-400">Spotlight</span>, join the community
          and share your ideas
        </p>
      </div>
    </div>
  )
}
