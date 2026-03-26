import { requireRole } from '@/lib/auth'
import { CourseListing } from '@/features/courses/components/CourseListing'
import { getCourses } from '@/features/courses/services/courseService'

export default async function CoursesPage() {
  // Secure route server-side
  await requireRole(['student', 'teacher', 'admin'])

  // Fetch real data
  const initialCourses = await getCourses()

  return (
    <div className="max-w-7xl mx-auto pb-24">
      <CourseListing initialCourses={initialCourses} />
    </div>
  )
}
