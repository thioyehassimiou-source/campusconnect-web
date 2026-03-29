export interface Conversation {
  id: string
  name: string | null
  createdAt: string
  updatedAt: string
  lastMessage?: string
  lastMessageTime?: string
  avatar?: string
  isOnline?: boolean
  unreadCount?: number
}

export interface Participant {
  conversationId: string
  userId: string
  joinedAt: string
  user?: {
    fullName: string
    avatarUrl: string
  }
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  createdAt: string
  senderName?: string
}
