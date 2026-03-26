import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { requireAuth } from '@/lib/auth'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireAuth()
  const role = profile?.role || 'student'

  return (
    <DashboardLayout role={role}>
      {children}
    </DashboardLayout>
  )
}
