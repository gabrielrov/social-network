import React from 'react'

export function FormButton({
  children,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      className="cursor-pointer rounded-full bg-zinc-900 py-3 font-bold text-white outline-2 select-none hover:bg-white hover:text-zinc-900 hover:outline-zinc-900"
      {...props}
    >
      {children}
    </button>
  )
}
