import { Bell, Check, ClipboardList, Megaphone, School } from 'lucide-react'

export function NotificationFilters() {
  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between shadow-sm border border-outline-variant/10 animate-in fade-in duration-700 delay-200">
      <div className="flex items-center gap-3">
        <button className="px-6 py-3 bg-secondary-container text-primary text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-sm">Toutes</button>
        <button className="px-6 py-3 hover:bg-surface-container-low text-on-surface-variant text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all">Non lues</button>
        <button className="px-6 py-3 hover:bg-surface-container-low text-on-surface-variant text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all">Archivées</button>
      </div>
      
      <div className="mt-6 md:mt-0 flex items-center gap-6">
        <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Filtrer par :</span>
        <div className="flex gap-3">
          <button className="p-3.5 bg-surface-container-low text-primary rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm" title="Cours">
            <School className="h-5 w-5" />
          </button>
          <button className="p-3.5 bg-surface-container-low text-primary rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm" title="Devoirs">
            <ClipboardList className="h-5 w-5" />
          </button>
          <button className="p-3.5 bg-surface-container-low text-primary rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm" title="Annonces">
            <Megaphone className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
