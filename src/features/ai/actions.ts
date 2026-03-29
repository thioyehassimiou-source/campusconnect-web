'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveAIHistory(query: string, response: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('ai_history')
    .insert({
      profile_id: user.id,
      query,
      response
    })

  if (error) throw error
  
  revalidatePath('/dashboard/ai')
}
