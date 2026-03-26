import { requireRole } from '@/lib/auth'
import ScheduleClientPage from './ScheduleClientPage'

export default async function TeacherSchedulePage() {
  await requireRole(['teacher'])
  return <ScheduleClientPage />
}
