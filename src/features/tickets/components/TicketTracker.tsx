'use client'

import { useState } from 'react'
import { TicketCard } from '@/features/tickets/components/TicketCard'
import { TicketDetailView } from '@/features/tickets/components/TicketDetailView'
import { createTicketReply } from '@/features/tickets/actions'
import { useRouter } from 'next/navigation'
import { mockTickets, mockTicketActivity } from '@/features/tickets/mockData'
import { Ticket, TicketActivity } from '@/features/tickets/types'

interface TicketTrackerProps {
  initialTickets: Ticket[]
  initialActivities: TicketActivity[]
}

export default function TicketTracker({ initialTickets, initialActivities }: TicketTrackerProps) {
  const router = useRouter()
  const [activeTicket, setActiveTicket] = useState<Ticket>(initialTickets[0] || mockTickets[0])
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'resolved' | 'urgent'>('all')
  
  const displayedTickets = initialTickets.length > 0 ? initialTickets : mockTickets
  const activities = initialActivities.length > 0 ? initialActivities : mockTicketActivity

  const handleReply = async (text: string) => {
    if (!text.trim() || !activeTicket) return
    try {
      await createTicketReply(activeTicket.id, text)
      router.refresh()
    } catch (error) {
      console.warn('Failed to send reply:', error)
      alert('Erreur lors de l\'envoi de la réponse')
    }
  }

  return (
    <div className="flex gap-10 h-[calc(100vh-140px)] w-full -m-10 p-10 overflow-hidden">
      {/* Sidebar: Tickets List */}
      <section className="w-[420px] flex flex-col gap-8 shrink-0 overflow-hidden">
        <div className="flex items-center justify-between shrink-0">
          <h2 className="text-3xl font-black tracking-tighter text-primary font-headline leading-tight">
            Mes Signalements
          </h2>
          <span className="bg-secondary-container text-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-inner border border-primary/5">
            {mockTickets.length} Total
          </span>
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar shrink-0">
          {['all', 'in_progress', 'resolved', 'urgent'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f as any)}
              className={`
                px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                ${filter === f 
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' 
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }
              `}
            >
              {f === 'all' ? 'Tous' : f === 'in_progress' ? 'En cours' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-4 no-scrollbar">
          {displayedTickets.map((ticket) => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket} 
              isActive={activeTicket.id === ticket.id}
              onClick={() => setActiveTicket(ticket)}
            />
          ))}
        </div>
      </section>

      {/* Main Container: Detail View */}
      <TicketDetailView 
        ticket={activeTicket} 
        activities={activities.filter((a: any) => a.ticketId === activeTicket.id)}
        onReply={handleReply}
      />
    </div>
  )
}
