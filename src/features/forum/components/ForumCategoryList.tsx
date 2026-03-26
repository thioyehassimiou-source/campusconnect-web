import { Sparkles } from 'lucide-react'
import { ForumCategory } from '../types'

interface ForumCategoryListProps {
  categories: ForumCategory[]
}

export function ForumCategoryList({ categories }: ForumCategoryListProps) {
  return (
    <aside className="w-80 bg-surface-container-low/50 p-8 hidden xl:flex flex-col h-full animate-in fade-in slide-in-from-left-6 duration-1000">
      <h2 className="font-headline font-black text-on-surface mb-8 tracking-tighter text-xl">Catégories</h2>
      
      <div className="space-y-3 flex-1">
        {categories.map((cat) => (
          <button 
            key={cat.id} 
            className={`
              w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group
              ${cat.isActive 
                ? 'bg-surface-container-lowest shadow-xl shadow-primary/5 text-primary scale-[1.02]' 
                : 'hover:bg-surface-container-high text-on-surface-variant'
              }
            `}
          >
            <div className="flex items-center gap-4">
              <span className={`material-symbols-outlined transition-transform group-hover:scale-110 ${cat.isActive ? 'text-primary' : 'text-on-surface-variant/40'}`} style={{ fontVariationSettings: cat.isActive ? "'FILL' 1" : "" }}>
                {cat.icon}
              </span>
              <span className={`text-sm font-black tracking-tight ${cat.isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                {cat.name}
              </span>
            </div>
            {cat.count && (
              <span className={`text-[10px] font-black px-3 py-1 rounded-full ${cat.isActive ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-on-surface-variant/40'}`}>
                {cat.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-12 p-8 bg-gradient-to-br from-secondary-container/40 to-secondary-container/10 rounded-[2rem] relative overflow-hidden group border border-outline-variant/10 shadow-sm">
        <div className="relative z-10">
          <h3 className="font-headline font-black text-primary mb-3 text-lg leading-tight">Besoin d'aide ?</h3>
          <p className="text-xs text-on-secondary-container leading-relaxed mb-6 font-medium opacity-80">Consultez notre guide communautaire pour bien démarrer sur CampusConnect.</p>
          <button className="text-[10px] font-black text-primary uppercase tracking-widest border-b-2 border-primary/20 hover:border-primary transition-all pb-1">
            Lire le règlement
          </button>
        </div>
        <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:opacity-20 transition-opacity rotate-12 group-hover:rotate-0 duration-700">
          <Sparkles className="h-24 w-24 text-primary" />
        </div>
      </div>
    </aside>
  )
}
