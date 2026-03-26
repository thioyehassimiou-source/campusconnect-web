export type AssignmentStatus = 'À rendre' | 'En retard' | 'Soumis'

export interface Assignment {
  id: string
  title: string
  course: string
  courseColor: string
  dueDate: string
  dueRelative: string
  status: AssignmentStatus
  type: string
  format: string
  submittedAt?: string
}

export interface AssignmentStats {
  lateCount: number
  upcomingCount: number
  averageGrade: number
  successRate: number
}
