import { createClient } from '@/lib/supabase/client'
import { Conversation, Message } from '../types'

export async function getConversations() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('participants')
    .select(`
      conversationId:conversation_id,
      conversations (
        id,
        name,
        createdAt:created_at,
        updatedAt:updated_at
      )
    `)
    .eq('user_id', user.id)

  if (error) {
    console.warn('Error fetching conversations:', error)
    return []
  }

  return data.map((p: any) => ({
    ...p.conversations,
    id: p.conversations.id,
    name: p.conversations.name,
    createdAt: p.conversations.createdAt,
    updatedAt: p.conversations.updatedAt
  })) as Conversation[]
}

export async function getMessages(conversationId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('messages')
    .select(`
      id,
      conversationId:conversation_id,
      senderId:sender_id,
      content,
      createdAt:created_at
    `)
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })

  if (error) {
    console.warn('Error fetching messages:', error)
    return []
  }

  return data as Message[]
}
