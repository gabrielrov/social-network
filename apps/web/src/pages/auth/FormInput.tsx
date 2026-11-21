import React, { useState } from 'react'
import { RegisterDTO } from '@repo/contracts/auth/schema'
import visibilityOn from '@/assets/material/visibility-on.svg'
import visibilityOff from '@/assets/material/visibility-off.svg'
import ErrorText from '@/pages/auth/ErrorText'

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

      {errorMsg && <ErrorText id="warnId">{errorMsg}</ErrorText>}
    </div>
  )
}
