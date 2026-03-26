import { requireRole } from '@/lib/auth'
import MessagesClientPage from './MessagesClientPage'
import { getConversations } from '@/features/messaging/services/messagingService'

export default async function MessagesPage() {
  await requireRole(['student', 'teacher', 'admin'])
  
  const conversations = await getConversations()
  
  return <MessagesClientPage initialConversations={conversations} />
}
