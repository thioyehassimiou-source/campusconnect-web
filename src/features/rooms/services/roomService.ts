import { createClient } from '@/lib/supabase/server'
import { Room } from '../types'

export async function getRooms() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('rooms')
    .select('id, name, building, floor, capacity, equipment, status, image, type')
    .order('name', { ascending: true })

  if (error) {
    console.warn('Error fetching rooms:', error)
    return []
  }

  return data as any[]
}

export async function getRoomBookings(roomId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('room_bookings')
    .select('id, room_id, user_id, start_time, end_time, status, reason, title')
    .eq('room_id', roomId)

  if (error) {
    console.warn('Error fetching room bookings:', error)
    return []
  }

  return data
}
