import { createClient } from '@/lib/supabase/client'
import { Conversation, Message } from '../types'
import { logger } from '@/lib/logger'

export async function getConversations() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  try {
    // 1. Fetch conversations, last message, and unread counts in exactly 1 query via RPC
    const { data: conversations, error } = await supabase
      .rpc('get_user_conversations_with_stats', { p_user_id: user.id })

    if (error) throw error

    return (conversations || []).map((c: any) => ({
      id: c.id,
      name: c.name,
      updatedAt: c.updated_at,
      unreadCount: Number(c.unread_count) || 0,
      lastMessage: c.last_message,
      lastMessageTime: c.last_message_time
        ? new Date(c.last_message_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        : undefined
    } as Conversation))
  } catch (err) {
    logger.trackFailure('getConversations', err)
    return []
  }
}

export async function getMessages(conversationId: string, page = 1, limit = 30) {
  const supabase = createClient()
  const from = (page - 1) * limit
  const to = from + limit - 1

  try {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        id,
        conversation_id,
        sender_id,
        content,
        created_at
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false }) // Newest first for pagination logic usually
      .range(from, to)

    if (error) throw error

    // Map back to camelCase for the frontend if needed (the original code used it)
    return (data || []).map(m => ({
       id: m.id,
       conversationId: m.conversation_id,
       senderId: m.sender_id,
       content: m.content,
       createdAt: m.created_at
    })).reverse() as Message[] // Reverse to show oldest first in chat UI
  } catch (err) {
    logger.trackFailure('getMessages', err)
    return []
  }
}
