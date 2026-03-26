import { createClient } from '@/lib/supabase/server'
import { Conversation, Message } from '../types'

export async function getConversations() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('conversations')
    .select(`
      *,
      participants:conversation_participants(*)
    `)
    .contains('participants', [user.id])
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching conversations:', error)
    return []
  }

  return data as Conversation[]
}

export async function getMessages(conversationId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching messages:', error)
    return []
  }

  return data as Message[]
}
