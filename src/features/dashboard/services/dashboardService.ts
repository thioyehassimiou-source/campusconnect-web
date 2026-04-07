import { StudentDashboardData, TeacherDashboardData } from '../types'
import { logger } from '@/lib/logger'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getStudentDashboardData(supabase: SupabaseClient): Promise<StudentDashboardData> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  try {
    const [
      attendanceRes,
      financialRes,
      upcomingCoursesRes,
      notificationsRes
    ] = await Promise.all([
      supabase.from('attendance').select('status').eq('profile_id', user.id),
      supabase.from('financial_summaries')
        .select('total_paid, remaining_balance, currency, is_up_to_date') // Selection optimisée
        .eq('user_id', user.id)
        .single(),
      supabase
        .from('schedules')
        .select('id, start_time, end_time, location, courses(title, location, instructor:profiles!instructor_id(full_name))')
        .eq('profile_id', user.id)
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true })
        .limit(3),
      supabase
        .from('notifications')
        .select('id', { count: 'exact' })
        .eq('profile_id', user.id)
        .eq('is_read', false)
    ])

    // Process Attendance
    const attendance = attendanceRes.data || []
    const presentCount = attendance.filter(a => a.status === 'present').length
    const attendancePercentage = attendance.length > 0 ? (presentCount / attendance.length) * 100 : 0

    // Process Financial
    const financial = financialRes.data
    const paymentStatus = {
      totalPaid: financial?.total_paid || 0,
      remainingBalance: financial?.remaining_balance || 0,
      currency: financial?.currency || '€',
      isUpToDate: financial?.is_up_to_date ?? ((financial?.remaining_balance || 0) <= 0)
    }

    // Process Upcoming Courses
    const upcomingCourses = (upcomingCoursesRes.data || []).map(s => ({
      id: s.id,
      title: (s.courses as any)?.title || 'Cours inconnu',
      startTime: s.start_time,
      endTime: s.end_time,
      location: s.location || (s.courses as any)?.location || 'Salle à définir',
      instructorName: (s.courses as any)?.instructor?.full_name || 'Professeur'
    }))

    return {
      attendancePercentage,
      paymentStatus,
      upcomingCourses,
      unreadNotifications: notificationsRes.count || 0
    }
  } catch (err) {
    logger.trackFailure('getStudentDashboardData', err)
    throw err
  }
}

export async function getTeacherDashboardData(supabase: SupabaseClient): Promise<TeacherDashboardData> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  try {
    // 1. Get Teacher's Courses - Only needed fields
    const { data: courses } = await supabase
      .from('courses')
      .select('id, title, department_id, level')
      .eq('instructor_id', user.id)

    if (!courses || courses.length === 0) {
      return { coursesStats: [], recentAttendance: [] }
    }

    const courseIds = courses.map(c => c.id)
    const departmentIds = [...new Set(courses.map(c => c.department_id))]
    
    // Process departments in 1 query to prevent N+1 query loops
    const { data: departments } = await supabase
      .from('departments')
      .select('id, name')
      .in('id', departmentIds)
    const deptMap = new Map((departments || []).map(d => [d.id, d.name]))

    // 2. Fetch stats and attendance in parallel
    const [
      studentCountsRes,
      recentSessionsRes
    ] = await Promise.all([
      // Optimized: Count profiles using the pre-fetched department map
      Promise.all(courses.map(async (course: any) => {
         const deptName = deptMap.get(course.department_id)
         if (!deptName) return { courseId: course.id, count: 0 }
           
         const { count } = await supabase
           .from('profiles')
           .select('id', { count: 'exact', head: true })
           .eq('department', deptName)
           .eq('level', course.level)
         return { courseId: course.id, count: count || 0 }
      })),
      // Recent Sessions - Limited fields
      supabase
        .from('sessions')
        .select('id, created_at, courses(title), attendance(status)')
        .in('course_id', courseIds)
        .order('created_at', { ascending: false })
        .limit(5)
    ])

    const coursesStats = courses.map((c: any) => ({
      id: c.id,
      title: c.title,
      studentCount: studentCountsRes.find((s: any) => s.courseId === c.id)?.count || 0,
      averageAttendance: 85 // RPC get_average_attendance suggested for next sprint
    }))

    const recentAttendance = (recentSessionsRes.data || []).map((s: any) => {
      const presentCount = (s.attendance as any[])?.filter((a: any) => a.status === 'present').length || 0
      return {
        sessionId: s.id,
        courseTitle: (s.courses as any)?.title || 'Cours',
        date: s.created_at,
        presentCount,
        totalCount: (s.attendance as any[])?.length || 0
      }
    })

    return {
      coursesStats,
      recentAttendance
    }
  } catch (err) {
    logger.trackFailure('getTeacherDashboardData', err)
    throw err
  }
}
