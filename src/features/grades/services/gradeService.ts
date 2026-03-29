import { createClient } from '@/lib/supabase/server'
import { Grade } from '../types'

export async function getStudentGrades() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('grades')
    .select(`
      *,
      course:courses(id, title, code, credits)
    `)
    .eq('student_id', user.id)
    .order('semester', { ascending: true })

  if (error) {
    console.warn('Error fetching grades:', error)
    return []
  }

  return data as Grade[]
}
