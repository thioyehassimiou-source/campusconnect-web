export interface AttendanceStudent {
  id: string
  name: string
  avatar: string
  curriculum: string
  studentId: string
  isPresent: boolean
}

export interface CourseAttendance {
  id: string
  name: string
  icon: string
  color: string
  sessions: number
  absences: number
  rate: number
}

export interface AttendanceMetrics {
  globalRate: number
  trend: string
  unjustifiedAbsences: number
  pendingSessions: number
}
