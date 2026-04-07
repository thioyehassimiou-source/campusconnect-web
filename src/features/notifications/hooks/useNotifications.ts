'use client'

import { useEffect } from 'react'
import useSWR, { mutate as globalMutate } from 'swr'
import { createClient } from '@/lib/supabase/client'
import { AppNotification } from '../types'

import { useUser } from '@/providers/UserProvider'

export function useNotifications() {
  const { user, loading: userLoading } = useUser()
  const supabase = createClient()

  const { data: notifications = [], error, mutate } = useSWR<AppNotification[]>(
    user ? ['notifications', user.id] : null,
    async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)

      return (data || []) as AppNotification[]
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 30, // 30 seconds
    }
  )

  const unreadCount = notifications.filter(n => !n.is_read).length

  useEffect(() => {
    // Subscribe to new notifications
    const channel = supabase
      .channel('public:notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications'
        },
        () => {
          mutate()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, mutate])

  const markAsRead = async (id: string) => {
    // Optimistic update
    const newNotifications = notifications.map(n => 
      n.id === id ? { ...n, is_read: true } : n
    )
    
    mutate(newNotifications, false) // Update locally without revalidating immediately

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
    
    if (error) {
      // Revert if error
      mutate()
    }
  }

  return { 
    notifications, 
    unreadCount, 
    markAsRead, 
    loading: !notifications && !error,
    error 
  }
}
