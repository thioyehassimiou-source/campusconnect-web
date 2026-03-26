export type NewsCategory = 'Académique' | 'Événements' | 'Campus' | 'Maintenance' | 'Sport' | 'Événement Campus'

export interface NewsAuthor {
  name: string
  role: string
  avatar: string
}

export interface Announcement {
  id: string
  title: string
  summary: string
  content?: string
  category: NewsCategory
  date: string
  timeAgo: string
  author: NewsAuthor
  image?: string
  tags?: string[]
}
