'use server'

import { requireRole } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function createAnnouncement(formData: FormData) {
  // Only admins or teachers can create announcements
  const { supabase, profile } = await requireRole(['admin', 'teacher'])
  
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string || 'Général'
  
  const { error } = await supabase.from('announcements').insert({
    title,
    content,
    summary: content.substring(0, 150) + '...',
    category,
    author_id: profile.id
  })

  if (error) {
    console.warn('Error creating announcement:', error)
    throw new Error('Erreur lors de la création de l\'annonce')
  }
  
  revalidatePath('/dashboard/news')
  revalidatePath('/dashboard')
  
  return { success: true }
}
