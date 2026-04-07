import { createClient } from '@/lib/supabase/server'
import { Course } from '../types'

export async function getCourses() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('courses')
    .select('id, title, code, description, credits, instructor_id, department_id, level')
    .order('title', { ascending: true })

  if (error) {
    console.warn('Error fetching courses:', error)
    return []
  }

  return data as unknown as any[]
}
