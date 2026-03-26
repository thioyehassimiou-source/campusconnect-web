import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markAttendance(courseId: string, studentId: string, status: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('attendance')
    .insert({
      course_id: courseId,
      profile_id: studentId,
      status
    })

  if (error) throw error
  
  revalidatePath('/dashboard/teacher/attendance')
}
