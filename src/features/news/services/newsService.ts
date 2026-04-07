import { createClient } from '@/lib/supabase/server'
import { Announcement } from '../types'

export async function getAnnouncements() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('announcements')
    .select('id, title, content, type, date, author, image, read_time, engagement, status')
    .order('created_at', { ascending: false })

  if (error) {
    console.warn('Error fetching announcements:', error)
    return []
  }

  return data as unknown as Announcement[]
}
