import { requireRole } from '@/lib/auth'
import StudentDashboardClient from './StudentDashboardClient'

export default async function StudentDashboard() {
  const { profile } = await requireRole(['student'])

  return <StudentDashboardClient initialProfile={profile} />
}
