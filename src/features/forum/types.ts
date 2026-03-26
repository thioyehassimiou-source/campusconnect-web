export interface ForumCategory {
  id: string
  name: string
  icon: string
  count?: number
  isActive?: boolean
}

export interface ForumThread {
  id: string
  title: string
  contentSnippet: string
  author: {
    name: string
    avatar: string
  }
  categoryName: string
  categorySlug: string
  category: string // Added for compatibility with filters
  replyCount: number
  likeCount: number
  timestamp: string
  isPopular?: boolean
  imageUrl?: string
  isLiked?: boolean
}

export interface ForumMember {
  id: string
  name: string
  avatar: string
  status: 'online' | 'away' | 'offline'
  badge: string
}
