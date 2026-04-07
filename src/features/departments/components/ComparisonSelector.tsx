'use client'

import { useState, useEffect } from 'react'
import { Department } from '../data'
import { Scale, Check, Plus, X } from 'lucide-react'
import Link from 'next/link'

export default function ComparisonSelector({ department }: { department: Department }) {
  const [comparedSlugs, setComparedSlugs] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cc_comparison_list')
    if (saved) setComparedSlugs(JSON.parse(saved))
  }, [])

  const isCompared = comparedSlugs.includes(department.slug)

  const toggleComparison = () => {
    let newList: string[]
    if (isCompared) {
      newList = comparedSlugs.filter(s => s !== department.slug)
    } else {
      newList = [...comparedSlugs, department.slug].slice(-3) // Max 3 for comparison
    }
    setComparedSlugs(newList)
    localStorage.setItem('cc_comparison_list', JSON.stringify(newList))
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggleComparison}
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all border ${
          isCompared 
            ? 'bg-emerald-500 border-emerald-500 text-white' 
            : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-emerald-500/30'
        }`}
      >
        {isCompared ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {isCompared ? 'Prêt à comparer' : 'Ajouter au comparateur'}
      </button>

      {comparedSlugs.length > 0 && (
        <Link
          href="/departements/comparer"
          className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
        >
          <Scale className="h-4 w-4" />
          Comparer ({comparedSlugs.length})
        </Link>
      )}
    </div>
  )
}
