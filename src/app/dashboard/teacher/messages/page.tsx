import { requireRole } from '@/lib/auth'
import MessagesClientPage from './MessagesClientPage'

import { getConversations } from '@/features/messaging/services/messagingService'

export default async function TeacherMessagesPage() {
  await requireRole(['teacher'])
  const conversations = await getConversations()
  return <MessagesClientPage initialConversations={conversations} />
}
