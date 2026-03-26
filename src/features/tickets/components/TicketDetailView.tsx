import { MoreVertical, Calendar, Category, PriorityHigh, Paperclip, Image as ImageIcon, Smile, Send } from 'lucide-react'
import { Ticket, TicketActivity } from '../types'
import { ActivityLog } from './ActivityLog'

interface TicketDetailViewProps {
  ticket: Ticket
  activities: TicketActivity[]
  onReply: (text: string) => void
}

export function TicketDetailView({ ticket, activities, onReply }: TicketDetailViewProps) {
  const isInProgress = ticket.status === 'in_progress'

  return (
    <section className="flex-1 flex flex-col bg-surface-container-lowest rounded-[2.5rem] shadow-2xl shadow-black/5 ring-1 ring-on-surface/5 overflow-hidden animate-in fade-in zoom-in-98 duration-1000">
      {/* Detail Header */}
      <div className="p-10 border-b border-outline-variant/10 flex justify-between items-start bg-slate-50/30 backdrop-blur-sm">
        <div>
          <div className="flex flex-wrap items-center gap-6 mb-4">
            <h2 className="text-3xl font-black text-on-background tracking-tighter font-headline leading-tight">
              {ticket.title}
            </h2>
            <span className={`
              px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm
              ${isInProgress ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}
            `}>
              {ticket.status === 'in_progress' ? 'En cours' : 'Résolu'}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-8 text-[11px] text-on-surface-variant/60 font-black uppercase tracking-widest">
            <span className="flex items-center gap-3">
              <Calendar className="h-4 w-4 opacity-40" />
              Ouvert le {ticket.createdAt}
            </span>
            <span className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base opacity-40">category</span>
              {ticket.category}
            </span>
            <span className="flex items-center gap-3">
              <PriorityHigh className="h-4 w-4 opacity-40" />
              Priorité : {ticket.priority}
            </span>
          </div>
        </div>
        
        <button className="p-4 text-on-surface-variant hover:bg-white rounded-2xl transition-all shadow-sm active:scale-95">
          <MoreVertical className="h-6 w-6" />
        </button>
      </div>

      {/* Activity Log Area */}
      <ActivityLog activities={activities} />

      {/* Input Area */}
      <div className="p-8 bg-surface-container-low/50 border-t border-outline-variant/10">
        <div className="bg-surface-container-lowest p-3 rounded-[2rem] shadow-xl border border-outline-variant/10 flex flex-col group focus-within:ring-4 focus-within:ring-primary/5 transition-all">
          <textarea 
            className="w-full bg-transparent border-none focus:ring-0 text-base font-medium p-5 resize-none h-32 placeholder:text-on-surface-variant/30" 
            placeholder="Écrivez votre réponse ici..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                onReply((e.target as HTMLTextAreaElement).value)
                ;(e.target as HTMLTextAreaElement).value = ''
              }
            }}
          />
          <div className="flex items-center justify-between p-3 border-t border-outline-variant/5 mt-2">
            <div className="flex gap-2">
              <button className="p-3.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-xl transition-all">
                <Paperclip className="h-5 w-5" />
              </button>
              <button className="p-3.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-xl transition-all">
                <ImageIcon className="h-5 w-5" />
              </button>
              <button className="p-3.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-xl transition-all">
                <Smile className="h-5 w-5" />
              </button>
            </div>
            
            <button className="bg-primary text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-primary-container hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20">
              Envoyer 
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
