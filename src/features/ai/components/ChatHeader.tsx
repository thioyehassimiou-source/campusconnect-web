import { PlusCircle } from 'lucide-react'

export function ChatHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 animate-in fade-in slide-in-from-top-6 duration-700">
      <div>
        <h2 className="text-4xl font-black text-primary tracking-tighter font-headline flex items-center gap-4 leading-tight">
          CampusConnect AI
          <span className="px-3 py-1.5 bg-secondary-container text-primary text-[10px] rounded-xl uppercase tracking-widest font-black shadow-inner border border-primary/5">
            Beta
          </span>
        </h2>
        <p className="text-on-surface-variant text-lg font-medium opacity-70 mt-2">
          Votre assistant pédagogique intelligent, disponible 24/7.
        </p>
      </div>
      
      <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all group">
        <PlusCircle className="h-5 w-5" />
        <span>Nouvelle Session</span>
      </button>
    </div>
  )
}
