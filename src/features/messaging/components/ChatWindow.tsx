import { Video, Phone, MoreVertical, Paperclip, Send, Smile } from 'lucide-react'
import { Message, Conversation } from '../types'
import { useToast } from '@/components/ui/Toast'

interface ChatWindowProps {
  conversation: Conversation
  messages: Message[]
}

export function ChatWindow({ conversation, messages }: ChatWindowProps) {
  const { toast } = useToast()

  const handleComingSoon = () => toast('Fonctionnalité bientôt disponible !', 'info')

  return (
    <div className="flex-1 flex flex-col bg-surface-container-lowest h-full relative border-r border-outline-variant/10">
      {/* Chat Header */}
      <div className="h-20 flex items-center justify-between px-8 bg-white/50 backdrop-blur-md border-b border-outline-variant/5 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={conversation.avatar} 
              alt={conversation.name} 
              className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/5" 
            />
            {conversation.isOnline && (
              <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>
          <div>
            <h3 className="font-black text-on-surface tracking-tight">{conversation.name}</h3>
            <p className="text-[10px] text-green-600 font-black flex items-center gap-1.5 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              En ligne
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleComingSoon} className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-all">
            <Video className="h-5 w-5" />
          </button>
          <button onClick={handleComingSoon} className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-all">
            <Phone className="h-5 w-5" />
          </button>
          <button onClick={handleComingSoon} className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-all">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
        <div className="flex justify-center mb-4">
          <span className="text-[10px] bg-surface-container-low text-on-surface-variant px-4 py-1.5 rounded-full font-black uppercase tracking-widest opacity-80">
            Aujourd'hui
          </span>
        </div>

        {messages.map((msg, i) => (
          <div key={msg.id} className={`flex items-end gap-3 max-w-[85%] ${msg.isSent ? 'ml-auto flex-row-reverse' : ''}`}>
            {!msg.isSent && (
              <img 
                src={conversation.avatar} 
                alt="Sender" 
                className="w-8 h-8 rounded-full object-cover mb-1 ring-1 ring-black/5" 
              />
            )}
            <div className={`flex flex-col ${msg.isSent ? 'items-end' : 'items-start'}`}>
              <div className={`
                p-4 rounded-[1.25rem] shadow-sm transition-all
                ${msg.isSent 
                  ? 'bg-primary text-white rounded-br-none shadow-primary/10' 
                  : 'bg-surface-container-low text-on-surface rounded-bl-none border border-outline-variant/10'
                }
              `}>
                <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
              </div>
              
              {msg.attachment && (
                <div className="mt-2 bg-surface-container-low p-3 rounded-2xl border border-outline-variant/20 flex items-center gap-4 cursor-pointer hover:bg-surface-container-high transition-all max-w-xs shadow-sm group">
                  <div className="w-10 h-10 bg-red-100 flex items-center justify-center rounded-xl text-red-600 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl" data-icon="picture_as_pdf">picture_as_pdf</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-black truncate text-on-surface">{msg.attachment.name}</p>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{msg.attachment.size} • PDF</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary" data-icon="download">download</span>
                </div>
              )}
              
              <span className="text-[10px] text-on-surface-variant mt-1.5 px-2 font-bold opacity-60">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white/80 backdrop-blur-md border-t border-outline-variant/10 sticky bottom-0 z-20">
        <div className="flex items-center gap-3 bg-surface-container-low p-2 px-4 rounded-[1.5rem] focus-within:ring-2 focus-within:ring-primary/10 transition-all shadow-inner border border-outline-variant/5">
          <button className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
            <Paperclip className="h-5 w-5" />
          </button>
          <input 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 font-medium" 
            placeholder="Écrire un message..." 
            type="text"
          />
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
              <Smile className="h-5 w-5" />
            </button>
            <button className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-lg shadow-primary/30 active:scale-95 transition-all hover:shadow-primary/40">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
