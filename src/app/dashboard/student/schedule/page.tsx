import { requireRole } from '@/lib/auth'
import dynamic from 'next/dynamic'
import { getSchedule } from '@/features/schedule/services/scheduleService'

const ScheduleClientPage = dynamic(() => import('./ScheduleClientPage'), {
  loading: () => <div className="animate-pulse bg-slate-900/50 rounded-3xl h-[600px] w-full" />
})

export default async function StudentSchedulePage() {
  await requireRole(['student'])
  
  const initialSchedule = await getSchedule()
  
  return <ScheduleClientPage initialSchedule={initialSchedule} />
}
