import { createClient } from '@/lib/supabase/server'

export async function getNotifications() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('notifications')
    .select('id, title, message, type, is_read, created_at, link')
    .eq('profile_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.warn('Error fetching notifications:', error)
    return []
  }

  return data as any[]
}
