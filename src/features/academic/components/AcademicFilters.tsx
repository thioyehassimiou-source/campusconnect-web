import { ChevronDown, Calendar, CheckCircle2, ListFilter } from 'lucide-react'

export function AcademicFilters() {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-12 animate-in fade-in duration-700 delay-200">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 mr-4">Filtrer par :</span>
      
      <button className="px-6 py-3 bg-secondary-container text-primary text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
        Tous les Pôles
        <ChevronDown className="h-4 w-4" />
      </button>

      <button className="px-6 py-3 bg-surface-container-low text-on-surface-variant text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-3 hover:bg-surface-container-high transition-all">
        <Calendar className="h-4 w-4 opacity-40" />
        Année Universitaire
        <ChevronDown className="h-4 w-4 opacity-40" />
      </button>

      <button className="px-6 py-3 bg-surface-container-low text-on-surface-variant text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-3 hover:bg-surface-container-high transition-all">
        <CheckCircle2 className="h-4 w-4 opacity-40" />
        Statut Actif
        <ChevronDown className="h-4 w-4 opacity-40" />
      </button>

      <div className="ml-auto flex items-center gap-3 text-on-surface-variant text-[10px] font-black uppercase tracking-widest opacity-60">
        <ListFilter className="h-4 w-4" />
        Trier par : Alphabétique
      </div>
    </div>
  )
}
