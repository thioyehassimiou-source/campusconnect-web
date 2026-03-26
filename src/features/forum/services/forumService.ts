import { createClient } from '@/lib/supabase/server'
import { ForumThread } from '../types'

export async function getForumThreads(category: string = 'All') {
  const supabase = await createClient()
  
  let query = supabase
    .from('forum_threads')
    .select('*')
    .order('created_at', { ascending: false })

  if (category !== 'All') {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching forum threads:', error)
    return []
  }

  return data as ForumThread[]
}
