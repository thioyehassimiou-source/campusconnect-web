import { Ticket, TicketActivity } from '@/features/tickets/types'
import { PlusCircle } from 'lucide-react'
import TicketTracker from '@/features/tickets/components/TicketTracker'

export default function TicketsPage({ 
  initialTickets, 
  initialActivities 
}: { 
  initialTickets: Ticket[], 
  initialActivities: TicketActivity[] 
}) {
  return (
    <div className="h-full flex flex-col">
      {/* Sub Header / Action Bar */}
      <div className="flex items-center justify-end mb-10 animate-in fade-in slide-in-from-right-6 duration-700">
        <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all group">
          <PlusCircle className="h-5 w-5" />
          <span>Nouveau Signalement</span>
        </button>
      </div>

      {/* Tracker Interface */}
      <TicketTracker 
        initialTickets={initialTickets} 
        initialActivities={initialActivities} 
      />
    </div>
  )
}
