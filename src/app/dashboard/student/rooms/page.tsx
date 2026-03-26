import { requireRole } from '@/lib/auth'
import RoomsClientPage from './RoomsClientPage'
import { getRooms, getRoomBookings } from '@/features/rooms/services/roomService'

export default async function RoomsPage() {
  await requireRole(['student', 'teacher', 'admin'])
  
  const rooms = await getRooms()
  
  // Fetch bookings for the first room as initial state
  const initialBookings = rooms.length > 0 
    ? await getRoomBookings(rooms[0].id)
    : []

  return <RoomsClientPage initialRooms={rooms} initialBookings={initialBookings} />
}
