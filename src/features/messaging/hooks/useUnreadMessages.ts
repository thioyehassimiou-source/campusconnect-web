'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

import { useUser } from '@/providers/UserProvider'

export function useUnreadMessages() {
  const [unreadCount, setUnreadCount] = useState(0)
  const { user } = useUser()
  const supabase = createClient()

  useEffect(() => {
    if (!user) {
      setUnreadCount(0)
      return
    }

    const fetchUnreadCount = async () => {
      // Count messages where read_at is null AND sender is not me
      // AND I am a participant in the conversation
      const { data, error } = await supabase
        .from('messages')
        .select('id, conversation_id')
        .is('read_at', null)
        .neq('sender_id', user.id)

      if (data) {
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
  }, [supabase, user])

  return unreadCount
}
