import brandIcon from '@/assets/brand/brand-icon.svg'
import React from 'react'

interface FormLayoutProps {
  title: string
  subtitle: string
  children: React.ReactElement
}

export function FormLayout({ title, subtitle, children }: FormLayoutProps) {
  return (
    <main className="flex w-full items-center justify-center bg-neutral-100 px-8 py-3 sm:w-1/3 sm:max-w-150 sm:min-w-74 sm:items-start sm:py-8 ">
      <div className="w-full max-w-88 sm:max-w-80">
        <div className="mb-9 space-y-0.5">
          <img
            className="mx-auto mb-4 w-25 select-none"
            src={brandIcon}
            draggable="false"
            alt="brand logo"
          />
          <p className="text-center text-xl font-bold ">{title}</p>
          <p className="text-center text-sm text-stone-500">{subtitle}</p>
        </div>
        {children}
      </div>
    </main>
  )
}
