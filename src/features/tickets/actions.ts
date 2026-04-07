'use server'

import { requireAuth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createSafeAction } from '@/lib/action-utils'

const CreateTicketReplySchema = z.object({
  ticketId: z.string().uuid(),
  content: z.string().min(1, 'Le message ne peut pas être vide').max(2000, 'Le message est trop long')
})

const CreateTicketSchema = z.object({
  title: z.string().min(3, 'Le titre doit faire au moins 3 caractères').max(100, 'Le titre est trop long'),
  description: z.string().min(10, 'La description doit faire au moins 10 caractères').max(5000, 'La description est trop longue'),
  category: z.string().optional().default('Bug')
})

export const createTicketReply = createSafeAction(
  CreateTicketReplySchema,
  async ({ ticketId, content }) => {
    const { supabase, user } = await requireAuth()
    
    const { error } = await supabase
      .from('ticket_activities')
      .insert({
        ticket_id: ticketId,
        content,
        type: 'message',
        author_id: user.id
      })

    if (error) throw new Error('Erreur lors de l\'envoi de la réponse')

    revalidatePath('/dashboard/tickets')
    return { success: true }
  }
)

export const createTicket = createSafeAction(
  CreateTicketSchema,
  async (data) => {
    const { supabase, user } = await requireAuth()
    
    const { error } = await supabase
      .from('tickets')
      .insert({
        ...data,
        status: 'open',
        priority: 'medium',
        user_id: user.id
      })

    if (error) throw new Error('Erreur lors de la création du ticket')

    revalidatePath('/dashboard/tickets')
    return { success: true }
  }
)
