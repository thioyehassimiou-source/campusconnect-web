import { Search } from 'lucide-react'
import { Conversation } from '../types'
import { ConversationList } from './ConversationList'

interface ChatSidebarProps {
  conversations: Conversation[]
  activeId: string
  onSelect: (id: string) => void
}

export function ChatSidebar({ conversations, activeId, onSelect }: ChatSidebarProps) {
  return (
    <aside className="w-[420px] border-r border-outline-variant/10 flex flex-col bg-surface-container-low/30">
      <div className="p-10 border-b border-outline-variant/10">
        <h2 className="text-3xl font-black font-headline text-primary mb-8 tracking-tighter">Messages</h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40" />
          <input 
            type="text" 
            placeholder="Rechercher une conversation..." 
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-outline-variant/10 focus:ring-4 focus:ring-primary/5 text-sm font-medium transition-all" 
          />
        </div>
      </div>

      <ConversationList 
        conversations={conversations} 
        activeId={activeId} 
        onSelect={onSelect} 
      />
    </aside>
  )
}
