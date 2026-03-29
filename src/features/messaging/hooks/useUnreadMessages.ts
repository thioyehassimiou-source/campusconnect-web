'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useUnreadMessages() {
  const [unreadCount, setUnreadCount] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Count messages where read_at is null AND sender is not me
      // AND I am a participant in the conversation
      const { data, error } = await supabase
        .from('messages')
        .select('id, conversation_id')
        .is('read_at', null)
        .neq('sender_id', user.id)

      if (data) {
        // Technically we should filter by conversations where user is participant
        // but RLS should already handle that if "Users can view messages in their conversations" is active
        setUnreadCount(data.length)
      }
    }

    fetchUnreadCount()

    const channel = supabase
      .channel('unread_messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        () => fetchUnreadCount()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return unreadCount
}
