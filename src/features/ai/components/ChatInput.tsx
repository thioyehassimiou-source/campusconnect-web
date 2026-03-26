import { Paperclip, Mic, Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (text: string) => void
}

export function ChatInput({ onSend }: ChatInputProps) {
  return (
    <div className="p-10 bg-surface-container-low/80 backdrop-blur-md sticky bottom-0 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="max-w-5xl mx-auto relative group">
        <div className="bg-surface-container-lowest rounded-3xl shadow-2xl p-2.5 flex items-center gap-3 border border-outline-variant/10 group-focus-within:border-primary/30 group-focus-within:shadow-primary/5 transition-all">
          <button className="p-4 text-on-surface-variant hover:bg-surface-container-high rounded-2xl transition-all hover:text-primary">
            <Paperclip className="h-6 w-6" />
          </button>
          
          <textarea 
            className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface py-4 px-2 resize-none text-base font-medium placeholder:text-on-surface-variant/40" 
            placeholder="Posez votre question à l'IA..."
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                onSend((e.target as HTMLTextAreaElement).value)
                ;(e.target as HTMLTextAreaElement).value = ''
              }
            }}
          />
          
          <div className="flex items-center gap-2 pr-2">
            <button className="p-4 text-on-surface-variant hover:bg-surface-container-high rounded-2xl transition-all hover:text-primary">
              <Mic className="h-6 w-6" />
            </button>
            <button className="w-14 h-14 bg-gradient-to-br from-primary to-primary-container text-white rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all hover:shadow-primary/40 group/send">
              <Send className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-5">
          <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="material-symbols-outlined text-sm">info</span>
            L'IA peut faire des erreurs. Vérifiez les informations importantes.
          </p>
        </div>
      </div>
    </div>
  )
}
