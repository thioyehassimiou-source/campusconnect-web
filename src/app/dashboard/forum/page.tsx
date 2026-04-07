import { requireRole } from '@/lib/auth'
import ForumClientPage from './ForumClientPage'

export default async function ForumPage() {
  // Secure route server-side for authenticated users
  await requireRole(['student', 'teacher', 'admin'])

  return <ForumClientPage />
}
