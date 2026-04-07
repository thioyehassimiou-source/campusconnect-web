import { requireRole } from '@/lib/auth'
import AttendanceClientPage from './AttendanceClientPage'
import { attendanceService } from '@/features/attendance/services/attendance.service'
import { getCourses } from '@/features/courses/services/courseService'
import { createClient } from '@/lib/supabase/server'

export default async function TeacherAttendancePage() {
  await requireRole(['teacher', 'admin'])
  const supabase = await createClient()
  
  const courses = await getCourses()
  const initialAttendance = courses.length > 0 
    ? await attendanceService.getAttendance(supabase, courses[0].id)
    : []

  return <AttendanceClientPage initialCourses={courses} initialAttendance={initialAttendance} />
}
