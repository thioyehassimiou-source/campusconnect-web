import { requireRole } from '@/lib/auth'
import AssignmentsClientPage from './AssignmentsClientPage'

export default async function AssignmentsPage() {
  await requireRole(['student'])
  return <AssignmentsClientPage />
}
