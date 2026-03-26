import { createClient } from '@/lib/supabase/server'
import { Announcement } from '../types'

export async function getAnnouncements() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching announcements:', error)
    return []
  }

  return data as Announcement[]
}
