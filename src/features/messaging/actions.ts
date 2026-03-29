'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function sendMessage(conversationId: string, content: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content: content
    })

  if (error) throw error

  revalidatePath('/dashboard/student/messages')
  revalidatePath('/dashboard/teacher/messages')
}

export async function markMessagesAsRead(conversationId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('messages')
    .update({ read_at: new Date().toISOString() })
    .eq('conversation_id', conversationId)
    .neq('sender_id', user.id)
    .is('read_at', null)

  if (error) throw error

  // Also mark related notifications as read
  await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', user.id)
    .eq('type', 'message')
    .eq('is_read', false)
    .filter('link', 'ilike', `%messages%`) 

  revalidatePath('/dashboard/student/messages')
  revalidatePath('/dashboard/teacher/messages')
}
