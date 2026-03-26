import { requireRole } from '@/lib/auth'
import AttendanceClientPage from './AttendanceClientPage'
import { getAttendance } from '@/features/attendance/services/attendanceService'
import { getCourses } from '@/features/courses/services/courseService'

export default async function TeacherAttendancePage() {
  await requireRole(['teacher', 'admin'])
  
  const courses = await getCourses()
  const initialAttendance = courses.length > 0 
    ? await getAttendance(courses[0].id)
    : []

  return <AttendanceClientPage initialCourses={courses} initialAttendance={initialAttendance} />
}
