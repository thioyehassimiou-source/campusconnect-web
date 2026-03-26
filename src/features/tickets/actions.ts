'use server'

import { requireAuth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function createTicketReply(ticketId: string, content: string) {
  const { supabase, user } = await requireAuth()
  
  if (!content.trim()) throw new Error('Le message ne peut pas être vide')

  const { error } = await supabase
    .from('ticket_activities')
    .insert({
      ticket_id: ticketId,
      content,
      type: 'message',
      author_id: user.id
    })

  if (error) {
    console.error('Error creating ticket reply:', error)
    throw new Error('Erreur lors de l\'envoi de la réponse')
  }

  revalidatePath('/dashboard/tickets')
  return { success: true }
}

export async function createTicket(formData: FormData) {
  const { supabase, user } = await requireAuth()
  
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as string || 'Bug'

  const { error } = await supabase
    .from('tickets')
    .insert({
      title,
      description,
      category,
      status: 'open',
      priority: 'medium',
      user_id: user.id
    })

  if (error) {
    console.error('Error creating ticket:', error)
    throw new Error('Erreur lors de la création du ticket')
  }

  revalidatePath('/dashboard/tickets')
  return { success: true }
}
