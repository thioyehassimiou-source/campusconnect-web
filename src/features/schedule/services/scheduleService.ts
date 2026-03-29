import { createClient } from '@/lib/supabase/server'
import { ScheduleEvent } from '../types'

export async function getSchedule() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('schedule')
    .select(`
      *,
      course:courses(*)
    `)
    .eq('profile_id', user.id)
    .order('start_time', { ascending: true })

  if (error) {
    console.warn('Error fetching schedule:', error)
    return []
  }

  return data as any[] // Map to ScheduleEvent in Client Component
}
