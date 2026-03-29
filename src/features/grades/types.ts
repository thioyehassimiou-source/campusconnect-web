export interface Grade {
  id: string
  student_id: string
  course_id: string
  grade: number
  semester: number
  academic_year: string
  status: 'pending' | 'validated' | 'retake'
  created_at: string
  course?: {
    id: string
    title: string
    code: string
    credits: number
  }
}

export interface AcademicSummary {
  gpa: number
  totalCredits: number
  validatedCredits: number
  pendingModules: number
}
