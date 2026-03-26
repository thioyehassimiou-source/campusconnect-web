import { requireAuth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardRoot() {
  const { profile } = await requireAuth()
  const role = profile?.role || 'student'
  redirect(`/dashboard/${role}`)
}
