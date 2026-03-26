export interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  isOnline: boolean
  isGroup: boolean
  role?: 'student' | 'professor' | 'staff'
  unreadCount?: number
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  isSent: boolean
  attachment?: {
    name: string
    size: string
    type: 'pdf' | 'image' | 'doc'
    url: string
  }
}
