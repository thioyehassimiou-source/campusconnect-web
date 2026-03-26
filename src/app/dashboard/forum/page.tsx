import { requireRole } from '@/lib/auth'
import ForumClientPage from './ForumClientPage'
import { getForumThreads } from '@/features/forum/services/forumService'

export default async function ForumPage() {
  // Secure route server-side for authenticated users
  await requireRole(['student', 'teacher', 'admin'])

  // Fetch real data
  const initialThreads = await getForumThreads()

  return <ForumClientPage initialThreads={initialThreads} />
}
