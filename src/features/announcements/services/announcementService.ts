import { logger } from '@/lib/logger'
import { SupabaseClient } from '@supabase/supabase-js'

export const announcementService = {
  async getLatestAnnouncements(supabase: SupabaseClient, limit = 10, page = 1) {
    const from = (page - 1) * limit
    const to = from + limit - 1

    try {
      const { data: announcements, error } = await supabase
        .from('announcements')
        .select(`
          id, 
          title, 
          summary,
          content,
          created_at, 
          profiles:author_id(nom, full_name)
        `)
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) throw error

      return announcements || []
    } catch (err) {
      logger.trackFailure('getLatestAnnouncements', err)
      return []
    }
  }
}
