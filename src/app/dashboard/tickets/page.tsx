import { requireRole } from '@/lib/auth'
import TicketsClientPage from './TicketTrackerPage'
import { getTickets, getTicketActivities } from '@/features/tickets/services/ticketService'

export default async function TicketsPage() {
  // Secure route server-side
  await requireRole(['student', 'teacher', 'admin'])

  // Initial data fetch
  const initialTickets = await getTickets()
  
  // Fetch activities for the first ticket if it exists
  const initialActivities = initialTickets.length > 0 
    ? await getTicketActivities(initialTickets[0].id)
    : []

  return (
    <TicketsClientPage 
      initialTickets={initialTickets} 
      initialActivities={initialActivities} 
    />
  )
}
