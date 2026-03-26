'use client'

import { createClient } from '@/lib/supabase/client'
import { revalidatePath } from 'next/cache'

export async function bookRoom(roomId: string, startTime: string, endTime: string, purpose: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('room_bookings')
    .insert({
      room_id: roomId,
      profile_id: user.id,
      start_time: startTime,
      end_time: endTime,
      purpose
    })

  if (error) throw error
  
  // revalidatePath('/dashboard/student/rooms') // Only works in server actions file called from server
}
