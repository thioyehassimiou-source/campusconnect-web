import { Conversation } from '../types'

interface ConversationListProps {
  conversations: Conversation[]
  activeId: string
  onSelect: (id: string) => void
}

export function ConversationList({ conversations, activeId, onSelect }: ConversationListProps) {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar py-6">
      {conversations.map(conv => (
        <button 
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          className={`w-full p-8 flex gap-6 transition-all relative group
            ${activeId === conv.id ? 'bg-white shadow-lg z-10' : 'hover:bg-white/50'}
          `}
        >
          {activeId === conv.id && <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-primary rounded-r-full shadow-lg" />}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-3xl bg-secondary-container flex items-center justify-center font-black text-secondary group-hover:scale-105 transition-transform">
              {conv.name?.charAt(0) || '?'}
            </div>
            {conv.isOnline && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full shadow-sm" />}
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="flex justify-between items-start mb-1 gap-4">
              <h4 className="font-black text-on-surface tracking-tight truncate group-hover:text-primary transition-colors">{conv.name || 'Conversation'}</h4>
              <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">
                {conv.lastMessageTime}
              </span>
            </div>
            <p className="text-sm text-on-surface-variant/60 font-medium truncate italic leading-tight">{conv.lastMessage || 'Pas de messages'}</p>
            {conv.unreadCount && conv.unreadCount > 0 && (
              <span className="absolute right-10 bottom-10 w-4 h-4 bg-primary rounded-full animate-pulse shadow-lg text-[8px] flex items-center justify-center text-white font-bold">{conv.unreadCount}</span>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
