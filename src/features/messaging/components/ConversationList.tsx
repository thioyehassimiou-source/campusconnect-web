import { Edit } from 'lucide-react'
import { Conversation } from '../types'

interface ConversationListProps {
  conversations: Conversation[]
  activeId: string
  onSelect: (id: string) => void
}

export function ConversationList({ conversations, activeId, onSelect }: ConversationListProps) {
  return (
    <div className="w-96 flex flex-col bg-surface-container-low h-full border-r border-outline-variant/10">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black font-headline text-on-surface tracking-tight">Messages</h2>
          <button className="bg-primary text-white p-2.5 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center hover:scale-105 transition-transform active:scale-95">
            <Edit className="h-4 w-4" />
          </button>
        </div>
        
        {/* Chips Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
          <button className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full whitespace-nowrap uppercase tracking-widest shadow-md">
            Tous
          </button>
          <button className="bg-surface-container-lowest text-on-surface-variant text-[10px] font-bold px-4 py-2 rounded-full whitespace-nowrap border border-outline-variant/20 hover:bg-surface-container-high transition-colors uppercase tracking-widest">
            Groupes
          </button>
          <button className="bg-surface-container-lowest text-on-surface-variant text-[10px] font-bold px-4 py-2 rounded-full whitespace-nowrap border border-outline-variant/20 hover:bg-surface-container-high transition-colors uppercase tracking-widest">
            Profs
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 px-3 pb-6 custom-scrollbar">
        {conversations.map((conv) => {
          const isActive = conv.id === activeId
          return (
            <div 
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`
                flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer group
                ${isActive 
                  ? 'bg-surface-container-lowest shadow-md border-l-4 border-primary scale-[1.02]' 
                  : 'hover:bg-white/60 border-l-4 border-transparent'
                }
              `}
            >
              <div className="relative flex-shrink-0">
                {conv.isGroup ? (
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden flex-wrap group-hover:scale-105 transition-transform">
                    <div className="w-1/2 h-1/2 bg-blue-200" />
                    <div className="w-1/2 h-1/2 bg-purple-200" />
                    <div className="w-1/2 h-1/2 bg-amber-200" />
                    <div className="w-1/2 h-1/2 bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">+2</div>
                  </div>
                ) : (
                  <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full object-cover group-hover:scale-105 transition-transform" />
                )}
                {conv.isOnline && !conv.isGroup && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className={`text-sm truncate tracking-tight ${isActive || conv.unreadCount ? 'font-black text-on-surface' : 'font-bold text-on-surface-variant'}`}>
                    {conv.name}
                  </h3>
                  <span className={`text-[10px] font-bold ${isActive ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}>
                    {conv.lastMessageTime}
                  </span>
                </div>
                <p className={`text-xs truncate ${isActive || conv.unreadCount ? 'text-on-surface font-bold' : 'text-on-surface-variant font-medium opacity-80'}`}>
                   {conv.lastMessage}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
