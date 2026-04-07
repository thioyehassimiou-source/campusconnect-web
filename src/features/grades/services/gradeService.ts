import { createClient } from '@/lib/supabase/server'

export async function getStudentGrades() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  // grades table uses: subject, value, coefficient, type, semester
  // course_id exists but courses table is empty — avoid join to prevent error
  const { data, error } = await supabase
    .from('grades')
    .select('id, subject, value, coefficient, type, semester, created_at')
    .eq('student_id', user.id)
    .order('semester', { ascending: true })

  if (error) {
    console.warn('Error fetching grades:', error)
    return []
  }

  // Map to a normalized shape expected by the UI
  return (data || []).map((g: any) => ({
    id: g.id,
    student_id: user.id,
    course_id: null,
    grade: g.value,
    semester: g.semester,
    academic_year: '2024-2025',
    status: 'validated' as const,
    created_at: g.created_at,
    // Synthetic course info from native columns
    course: {
      id: g.id,
      title: g.subject,
      code: g.type,
      credits: g.coefficient ?? 1,
    }
  }))
}
