import { AIMessage } from '../types'

interface ChatMessageProps {
  message: AIMessage
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant'

  return (
    <div className={`flex gap-6 max-w-5xl ${isAssistant ? '' : 'ml-auto flex-row-reverse'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      {/* Avatar */}
      <div className={`
        w-12 h-12 rounded-[1.25rem] flex-shrink-0 flex items-center justify-center shadow-lg
        ${isAssistant 
          ? 'bg-primary text-white shadow-primary/20' 
          : 'bg-secondary-container text-primary shadow-secondary/20 overflow-hidden'
        }
      `}>
        {isAssistant ? (
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
        ) : (
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" 
            alt="User" 
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Message Bubble */}
      <div className={`flex flex-col gap-3 ${isAssistant ? 'max-w-2xl' : 'items-end'}`}>
        <div className={`
          p-6 rounded-[2rem] shadow-sm border transition-all
          ${isAssistant 
            ? 'bg-surface-container-lowest rounded-tl-none border-outline-variant/10' 
            : 'bg-primary text-white rounded-tr-none border-primary/10 shadow-xl shadow-primary/10'
          }
        `}>
          <p className="text-base leading-relaxed font-medium">
            {message.content}
          </p>

          {/* Data Block Rendering */}
          {isAssistant && message.dataBlock && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {message.dataBlock.items.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-4 bg-surface-container-low/50 rounded-2xl flex items-center gap-4 border border-outline-variant/10 group hover:bg-secondary-container/20 hover:border-primary/20 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant group-hover:text-primary">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <span className={`text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 ${isAssistant ? 'ml-2' : 'mr-2'}`}>
          {isAssistant ? 'IA CampusConnect' : 'Vous'} • {message.timestamp}
        </span>
      </div>
    </div>
  )
}
