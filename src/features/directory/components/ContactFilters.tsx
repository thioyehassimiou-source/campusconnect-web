'use client'

import { Filter } from 'lucide-react'

export function ContactFilters() {
  const categories = ['Tous', 'Administration', 'Pédagogie', 'Technique', 'Ressources']
  
  return (
    <div className="flex gap-2 bg-surface-container-low p-1 rounded-2xl border border-outline-variant/10 shadow-inner">
      {categories.map((cat, idx) => (
        <button 
          key={cat}
          className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all
            ${idx === 0 ? 'bg-white shadow-md text-primary' : 'text-on-surface-variant hover:bg-surface-container-high'}
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
