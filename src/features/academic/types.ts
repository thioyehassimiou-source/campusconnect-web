export type AcademicPole = 'Tech' | 'Business' | 'Créatif' | 'Pôle Scientifique' | 'Humanités' | 'Santé'

export interface Department {
  id: string
  name: string
  description: string
  pole: AcademicPole
  icon: string
  color: string
  badgeColor: string
  trackCount: number
  studentCount: number
  facultyAvatars: string[]
}
