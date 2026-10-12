import React from 'react'

interface FormButtonProps {
  children: string
}

export function FormButton({ children }: FormButtonProps) {
  return (
    <button className="cursor-pointer rounded-full bg-zinc-900 py-3 font-bold text-white outline-2 select-none hover:bg-white hover:text-zinc-900 hover:outline-zinc-900">
      {children}
    </button>
  )
}
