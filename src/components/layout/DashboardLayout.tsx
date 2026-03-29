import { DashboardLayoutClient } from './DashboardLayoutClient'
import { getUserContext } from '@/lib/auth'

export async function DashboardLayout({
  children,
  role
}: {
  children: React.ReactNode,
  role: string
}) {
  const ctx = await getUserContext()
  const profile = ctx?.profile

  return (
    <DashboardLayoutClient role={role} profile={profile}>
      {children}
    </DashboardLayoutClient>
  )
}
