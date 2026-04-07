import { createClient } from '@/lib/supabase/server'
import { Ticket, TicketActivity } from '../types'

export async function getTickets(): Promise<Ticket[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('tickets')
    .select('id, title, status, priority, category, created_at, user_id, assigned_to')
    .or(`user_id.eq.${user.id},assigned_to.eq.${user.id}`)
    .order('created_at', { ascending: false })

  if (error) {
    console.warn('Error fetching tickets:', error)
    return []
  }

  return (data as any[]).map(t => ({
    id: t.id,
    title: t.title,
    status: t.status,
    priority: t.priority,
    category: t.category,
    createdAt: t.created_at,
    reference: t.id.split('-')[0].toUpperCase(),
    description: '', // Not fetched in list
    updatedAt: t.updated_at || t.created_at
  }))
}

export async function getTicketActivities(ticketId: string): Promise<TicketActivity[]> {
  // ticket_activities table doesn't exist in the current schema
  // Return empty array to prevent page crash
  return []
}
