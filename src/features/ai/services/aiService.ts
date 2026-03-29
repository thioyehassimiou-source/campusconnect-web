import { createClient } from '@/lib/supabase/server'

export async function getAIHistory() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('ai_history')
    .select('*')
    .eq('profile_id', user.id)
    .order('created_at', { ascending: true })

  if (error) {
    console.warn('Error fetching AI history:', error)
    return []
  }

  return data
}
