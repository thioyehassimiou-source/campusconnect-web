import { requireRole } from '@/lib/auth'
import DepartmentsClientPage from './DepartmentsClientPage'

export default async function DepartmentsPage() {
  await requireRole(['student', 'teacher', 'admin'])
  return <DepartmentsClientPage />
}
