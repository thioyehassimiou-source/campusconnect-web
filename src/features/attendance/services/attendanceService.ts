import { createClient } from '@/lib/supabase/server'

export async function getAttendance(courseId?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  let query = supabase.from('attendance').select(`
    *,
    course:courses(*)
  `)

  if (courseId) {
    query = query.eq('course_id', courseId)
  } else {
    query = query.eq('profile_id', user.id)
  }

  const { data, error } = await query.order('marked_at', { ascending: false })

  if (error) {
    console.warn('Error fetching attendance:', error)
    return []
  }

  return data
}
