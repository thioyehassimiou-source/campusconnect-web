export type NotificationStatus = 'unread' | 'read' | 'archived'
export type NotificationCategory = 'school' | 'assignment' | 'campaign' | 'mail' | 'grade'

export interface NotificationItem {
  id: string
  title: string
  description: string
  timestamp: string
  categoryName: string
  categoryIcon: string
  categoryColor: string
  status: NotificationStatus
  dateGroup: 'Aujourd\'hui' | 'Hier' | 'Plus ancien'
}
