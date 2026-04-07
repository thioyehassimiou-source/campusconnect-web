// src/features/dashboard/hooks/useDashboardData.ts
import { useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { getStudentDashboardData, getTeacherDashboardData } from '../services/dashboardService'
import { StudentDashboardData, TeacherDashboardData } from '../types'
import { createClient } from '@/lib/supabase/client'

import { useUser } from '@/providers/UserProvider'

export function useStudentDashboard() {
  const { user, loading: userLoading } = useUser()
  const supabase = createClient()
  
  const { data, error, isLoading, mutate: revalidate } = useSWR<StudentDashboardData>(
    user ? 'student-dashboard' : null,
    () => getStudentDashboardData(supabase),
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 5, // 5 minutes
    }
  )

  useEffect(() => {
    if (!user) return

    const setupRealtime = () => {
      const channel = supabase
        .channel('student-dashboard-updates')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'attendance', filter: `profile_id=eq.${user.id}` }, () => revalidate())
        .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `profile_id=eq.${user.id}` }, () => revalidate())
        .on('postgres_changes', { event: '*', schema: 'public', table: 'financial_summaries', filter: `user_id=eq.${user.id}` }, () => revalidate())
        .subscribe()

      return channel
    }

    const channel = setupRealtime()

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [supabase, user, revalidate])

  return { 
    data: data || null, 
    loading: isLoading || userLoading, 
    error: error || null, 
    refresh: revalidate 
  }
}

export function useTeacherDashboard() {
  const { user, loading: userLoading } = useUser()
  const supabase = createClient()

  const { data, error, isLoading, mutate: revalidate } = useSWR<TeacherDashboardData>(
    user ? 'teacher-dashboard' : null,
    () => getTeacherDashboardData(supabase),
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 5, // 5 minutes
    }
  )

  useEffect(() => {
    if (!user) return

    const setupRealtime = () => {
      const channel = supabase
        .channel('teacher-dashboard-updates')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'attendance' }, () => revalidate())
        .on('postgres_changes', { event: '*', schema: 'public', table: 'sessions' }, () => revalidate())
        .subscribe()

      return channel
    }

    const channel = setupRealtime()

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [supabase, user, revalidate])

  return { 
    data: data || null, 
    loading: isLoading, 
    error: error || null, 
    refresh: revalidate 
  }
}
