export interface AppNotification {
  id: string
  user_id: string
  title: string
  content: string
  type: 'message' | 'announcement' | 'grade' | 'info'
  link?: string
  is_read: boolean
  created_at: string
}

export interface NotificationItem {
  id: string
  title: string
  description: string
  status: 'read' | 'unread'
  categoryIcon: 'assignment' | 'campaign' | 'mail' | 'school' | 'info'
  categoryColor: string
  categoryName: string
  timestamp: string
}
