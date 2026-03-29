import { createClient } from '@/lib/supabase/server'

export async function getResources(courseId?: string) {
  const supabase = await createClient()
  
  let query = supabase.from('resources').select(`
    *,
    course:courses(*)
  `)

  if (courseId) {
    query = query.eq('course_id', courseId)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.warn('Error fetching resources:', error)
    return []
  }

  return data
}
