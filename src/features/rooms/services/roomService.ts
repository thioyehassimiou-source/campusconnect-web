import { createClient } from '@/lib/supabase/server'
import { Room } from '../types'

export async function getRooms() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching rooms:', error)
    return []
  }

  return data as any[]
}

export async function getRoomBookings(roomId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('room_bookings')
    .select('*')
    .eq('room_id', roomId)

  if (error) {
    console.error('Error fetching room bookings:', error)
    return []
  }

  return data
}
