import { Showcase } from '@/pages/auth/Showcase'
import { FormLayout } from '@/pages/auth/FormLayout'
import { Outlet } from 'react-router-dom'

interface AuthLayoutProps {
  title: string
  subtitle: string
}

export function AuthLayout({ title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-svh">
      <FormLayout title={title} subtitle={subtitle}>
        <Outlet />
      </FormLayout>
      <Showcase />
    </div>
  )
}
