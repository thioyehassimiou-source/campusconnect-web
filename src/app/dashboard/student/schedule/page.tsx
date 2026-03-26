import { requireRole } from '@/lib/auth'
import ScheduleClientPage from './ScheduleClientPage'
import { getSchedule } from '@/features/schedule/services/scheduleService'

export default async function StudentSchedulePage() {
  await requireRole(['student'])
  
  const initialSchedule = await getSchedule()
  
  return <ScheduleClientPage initialSchedule={initialSchedule} />
}
