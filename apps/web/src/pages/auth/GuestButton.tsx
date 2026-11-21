import { loginAsGuest } from '@/feats/auth/utils/login'
import ErrorText from '@/pages/auth/ErrorText'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function GuestButton() {
  const [hasError, setHasError] = useState(false)
  const navigate = useNavigate()

  async function handleClick() {
    try {
      await loginAsGuest()
      setHasError(false)
      navigate('/')
    } catch {
      setHasError(true)
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="mt-4 w-full cursor-pointer rounded-full bg-linear-to-r from-orange-500 via-fuchsia-500 to-blue-500 px-3.5 py-1.5 font-bold text-white outline-2 transition-colors duration-500 ease-in-out select-none hover:bg-white hover:bg-none hover:text-zinc-900 hover:outline-zinc-900"
        type="button"
      >
        Guest User
      </button>
      {hasError && <ErrorText>Connection error</ErrorText>}
    </div>
  )
}
