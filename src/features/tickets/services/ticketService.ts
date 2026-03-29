import { createClient } from '@/lib/supabase/server'
import { Ticket, TicketActivity } from '../types'

export async function getTickets() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .or(`user_id.eq.${user.id},assigned_to.eq.${user.id}`)
    .order('created_at', { ascending: false })

  if (error) {
    console.warn('Error fetching tickets:', error)
    return []
  }

  return data as Ticket[]
}

export async function getTicketActivities(ticketId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ticket_activities')
    .select('*')
    .eq('ticket_id', ticketId)
    .order('created_at', { ascending: true })

  if (error) {
    console.warn('Error fetching ticket activities:', error)
    return []
  }

  return data as TicketActivity[]
}

export async function createTicketReply(ticketId: string, content: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('ticket_activities')
    .insert({
      ticket_id: ticketId,
      content,
      type: 'message',
      author_id: user.id
    })

  if (error) throw error
}
