import { createClient } from '@/lib/supabase/client'

export const announcementService = {
  async getLatestAnnouncements(limit = 10) {
    const supabase = createClient()
    const { data: announcements, error } = await supabase
      .from('announcements')
      .select('id, title, summary, created_at, author_id')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) return []

    // Fetch authors separately if join fails
    const authorIds = [...new Set(announcements.map(a => a.author_id).filter(Boolean))]
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name')
      .in('id', authorIds)

    const profileMap = Object.fromEntries(profiles?.map(p => [p.id, p]) || [])

    return announcements.map(a => ({
      ...a,
      profiles: profileMap[a.author_id] || { full_name: 'Administration' }
    }))
  }
}
