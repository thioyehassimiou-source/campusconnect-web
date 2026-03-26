import { requireRole } from '@/lib/auth'
import MessagesClientPage from './MessagesClientPage'

export default async function TeacherMessagesPage() {
  await requireRole(['teacher'])
  return <MessagesClientPage />
}
