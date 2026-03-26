import { Ticket } from '../types'

interface TicketCardProps {
  ticket: Ticket
  isActive?: boolean
  onClick: () => void
}

export function TicketCard({ ticket, isActive, onClick }: TicketCardProps) {
  const isResolved = ticket.status === 'resolved'
  const isInProgress = ticket.status === 'in_progress'
  const isClosed = ticket.status === 'closed'

  return (
    <div 
      onClick={onClick}
      className={`
        bg-surface-container-lowest p-6 rounded-2xl cursor-pointer transition-all border-l-4 group
        ${isActive 
          ? 'border-primary ring-2 ring-primary/5 shadow-xl shadow-primary/5' 
          : 'border-transparent hover:bg-surface-container-low ring-1 ring-on-surface/5'
        }
        animate-in slide-in-from-left-4 duration-500
      `}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">
          #{ticket.reference}
        </span>
        <span className={`
          flex items-center gap-2 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest
          ${isInProgress ? 'text-amber-700 bg-amber-50' : ''}
          ${isResolved ? 'text-emerald-700 bg-emerald-50' : ''}
          ${isClosed ? 'text-error bg-error-container/30' : ''}
        `}>
          <span className={`w-2 h-2 rounded-full ${isInProgress ? 'bg-amber-500' : ''} ${isResolved ? 'bg-emerald-500' : ''} ${isClosed ? 'bg-error' : ''}`} />
          {ticket.status === 'in_progress' ? 'EN COURS' : ticket.status.toUpperCase()}
        </span>
      </div>

      <h3 className={`font-black text-on-surface mb-2 tracking-tight transition-colors ${isActive ? 'text-primary' : 'group-hover:text-primary/70'}`}>
        {ticket.title}
      </h3>
      <p className="text-xs text-on-surface-variant line-clamp-2 mb-6 font-medium leading-relaxed opacity-70">
        {ticket.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex -space-x-3">
          {ticket.assignee ? (
            <img 
              src={ticket.assignee.avatar} 
              alt={ticket.assignee.name} 
              className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm ring-1 ring-black/5" 
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-[10px] font-black text-on-surface-variant/40 shadow-sm ring-1 ring-black/5">
              --
            </div>
          )}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
          {ticket.updatedAt}
        </span>
      </div>
    </div>
  )
}
