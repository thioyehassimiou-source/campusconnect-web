interface AcademicHeaderProps {
  view: 'grid' | 'list'
  onViewChange: (view: 'grid' | 'list') => void
}

export function AcademicHeader({ view, onViewChange }: AcademicHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 animate-in fade-in slide-in-from-top-6 duration-700">
      <div>
        <h1 className="text-4xl font-black text-primary tracking-tighter font-headline leading-tight">
          Filières et Départements
        </h1>
        <p className="text-on-surface-variant text-lg font-medium opacity-70 mt-2 max-w-2xl">
          Gérez l'offre académique et les structures pédagogiques de l'établissement.
        </p>
      </div>

      <div className="flex gap-3">
        <div className="flex bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/10 shadow-inner">
          <button 
            onClick={() => onViewChange('grid')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'grid' ? 'bg-white text-primary shadow-lg shadow-primary/5' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Grille
          </button>
          <button 
            onClick={() => onViewChange('list')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'list' ? 'bg-white text-primary shadow-lg shadow-primary/5' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Liste
          </button>
        </div>
      </div>
    </div>
  )
}
