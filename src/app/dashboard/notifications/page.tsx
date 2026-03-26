import { requireRole } from '@/lib/auth'
import NotificationsClientPage from './NotificationsClientPage'
import { getNotifications } from '@/features/notifications/services/notificationService'

export default async function NotificationsPage() {
  await requireRole(['student', 'teacher', 'admin'])
  
  const initialNotifications = await getNotifications()
  
  return <NotificationsClientPage initialNotifications={initialNotifications} />
}
