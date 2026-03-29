import { useRef, useEffect } from 'react'
import { Send, Paperclip, Image } from 'lucide-react'
import { Message, Conversation } from '../types'

interface ChatWindowProps {
  activeConv: Conversation
  messages: Message[]
  currentUserId: string | null
  messageText: string
  onMessageChange: (text: string) => void
  onSend: (e?: React.FormEvent) => void
}

export function ChatWindow({ activeConv, messages, currentUserId, messageText, onMessageChange, onSend }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <main className="flex-1 flex flex-col bg-white">
      <header className="px-10 py-8 border-b border-outline-variant/10 flex justify-between items-center shadow-sm relative z-10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center font-black text-secondary">
              {activeConv.name?.charAt(0) || '?'}
            </div>
            {activeConv.isOnline && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />}
          </div>
          <div>
            <h3 className="text-xl font-black text-on-surface tracking-tight leading-none mb-1">{activeConv.name || 'Conversation'}</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Actif il y a quelques instants</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-12 space-y-10 bg-surface-container-lowest/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.senderId === currentUserId ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
            <div className={`max-w-[70%] p-7 rounded-[2.5rem] shadow-sm relative group
              ${msg.senderId === currentUserId
                ? 'bg-primary text-white rounded-tr-lg shadow-xl shadow-primary/5' 
                : 'bg-white text-on-surface rounded-tl-lg border border-outline-variant/10'
              }
            `}>
              <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
              <span className={`absolute ${msg.senderId === currentUserId ? '-left-16' : '-right-16'} bottom-4 opacity-0 group-hover:opacity-40 transition-opacity text-[9px] font-black uppercase tracking-widest text-on-surface-variant`}>
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-8 bg-white border-t border-outline-variant/10">
        <form onSubmit={onSend} className="bg-surface-container-low p-2 rounded-[2.5rem] flex items-center gap-4 border border-outline-variant/5">
          <div className="flex gap-1 ml-2">
            <button type="button" className="p-3 text-on-surface-variant hover:text-primary transition-colors"><Paperclip className="h-5 w-5" /></button>
            <button type="button" className="p-3 text-on-surface-variant hover:text-primary transition-colors"><Image className="h-5 w-5" /></button>
          </div>
          <input 
            value={messageText}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Votre message..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-semibold p-4 placeholder:text-on-surface-variant/30" 
          />
          <button 
            type="submit"
            disabled={!messageText.trim()}
            className="bg-primary text-white p-5 rounded-3xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </footer>
    </main>
  )
}
