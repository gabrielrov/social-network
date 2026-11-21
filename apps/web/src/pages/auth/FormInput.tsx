import React, { useState } from 'react'
import { RegisterDTO } from '@repo/contracts/auth/schema'
import visibilityOn from '@/assets/material/visibility-on.svg'
import visibilityOff from '@/assets/material/visibility-off.svg'

interface FormInputProps extends Omit<React.ComponentProps<'input'>, 'name'> {
  errorMsg?: string
  id: keyof RegisterDTO
}

export function FormInput({ errorMsg, id, type, ...props }: FormInputProps) {
  const [value, setValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const warnId = id + 'Warn'
  const isPassword = type === 'password'
  const showPasswordIcon = isPassword && value.length > 0

  return (
    <div className="">
      <label className="sr-only" htmlFor={id}>
        {props.placeholder}
      </label>
      <div className="relative">
        <input
          {...props}
          className="w-full rounded-full bg-zinc-700 px-3.5 py-3 text-stone-200 select-none"
          style={{ paddingRight: showPasswordIcon ? '3.2rem' : 'auto' }}
          id={id}
          name={id}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          aria-invalid={!!errorMsg}
          aria-describedby={errorMsg ? warnId : undefined}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {showPasswordIcon && (
          <div className="absolute top-1/2 right-5 size-4.5 -translate-y-1/2">
            <button
              className="cursor-pointer"
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
            >
              <img src={showPassword ? visibilityOn : visibilityOff} alt="" />
            </button>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="mt-1.5 flex items-center" aria-live="polite">
          <svg
            className="ml-1.5 size-3.5 flex-none fill-red-400"
            viewBox="0 -960 960 960"
            aria-hidden="true"
          >
            <path d="M508.5-291.5Q520-303 520-320t-11.5-28.5Q497-360 480-360t-28.5 11.5Q440-337 440-320t11.5 28.5Q463-280 480-280t28.5-11.5ZM440-440h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>

          <p id={warnId} className="ml-1 text-xs text-red-400">
            {errorMsg}
          </p>
        </div>
      )}
    </div>
  )
}
