import { requireRole } from '@/lib/auth'
import { getStudentGrades } from '@/features/grades/services/gradeService'
import GradesClientPage from './GradesClientPage'

export default async function StudentGradesPage() {
  await requireRole(['student'])
  
  const initialGrades = await getStudentGrades()
  
  return <GradesClientPage initialGrades={initialGrades} />
}
