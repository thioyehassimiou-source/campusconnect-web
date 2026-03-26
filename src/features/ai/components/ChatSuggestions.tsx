import { Suggestion } from '../types'

interface ChatSuggestionsProps {
  suggestions: Suggestion[]
  onSelect: (text: string) => void
}

export function ChatSuggestions({ suggestions, onSelect }: ChatSuggestionsProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar animate-in fade-in duration-700 delay-200">
      {suggestions.map((s) => (
        <button 
          key={s.id}
          onClick={() => onSelect(s.text)}
          className="whitespace-nowrap px-6 py-4 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl text-[11px] font-black text-on-surface-variant hover:bg-secondary-container hover:text-primary hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all flex items-center gap-4 group active:scale-95"
        >
          <span className="material-symbols-outlined text-xl text-primary opacity-40 group-hover:opacity-100 transition-opacity">
            {s.icon}
          </span>
          <span className="uppercase tracking-widest">{s.text}</span>
        </button>
      ))}
    </div>
  )
}
