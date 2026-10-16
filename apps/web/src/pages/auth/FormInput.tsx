import React from 'react'
import { RegisterDTO } from '@repo/contracts/auth'

interface FormInputProps extends Omit<React.ComponentProps<'input'>, 'name'> {
  errorMsg?: string
  id: keyof RegisterDTO
}

export function FormInput({ errorMsg, id, ...props }: FormInputProps) {
  const warnId = id + 'Warn'

  return (
    <div className="">
      <label className="sr-only" htmlFor={id}>
        {props.placeholder}
      </label>
      <input
        {...props}
        className="w-full rounded-full bg-zinc-700 px-3.5 py-3 text-stone-200 select-none"
        id={id}
        name={id}
        aria-invalid={!!errorMsg}
        aria-describedby={errorMsg ? warnId : undefined}
      />

      {errorMsg && (
        <div className="mt-1.5 flex items-center" aria-live="polite">
          <svg
            className="size-3.5 flex-none ml-1.5 fill-red-400"
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
