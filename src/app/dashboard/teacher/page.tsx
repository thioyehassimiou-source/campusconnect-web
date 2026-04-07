import { requireRole } from '@/lib/auth'
import TeacherDashboardClient from './TeacherDashboardClient'

export default async function TeacherDashboard() {
  const { profile } = await requireRole(['teacher'])

  return <TeacherDashboardClient initialProfile={profile} />
}
