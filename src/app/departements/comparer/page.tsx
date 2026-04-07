'use client'

import { useState, useEffect } from 'react'
import { departments, Department } from '@/features/departments/data'
import { ArrowLeft, Scale, Target, Briefcase, Zap, Info, X } from 'lucide-react'
import Link from 'next/link'

export default function ComparisonPage() {
  const [selectedDepartments, setSelectedDepartments] = useState<Department[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cc_comparison_list')
    if (saved) {
      const slugs = JSON.parse(saved) as string[]
      const found = slugs.map(slug => departments[slug]).filter(Boolean)
      setSelectedDepartments(found)
    }
  }, [])

  const removeFromComparison = (slug: string) => {
    const newList = selectedDepartments.filter(d => d.slug !== slug)
    setSelectedDepartments(newList)
    localStorage.setItem('cc_comparison_list', JSON.stringify(newList.map(d => d.slug)))
  }

  if (selectedDepartments.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-8">
          <Scale className="h-10 w-10 text-slate-500" />
        </div>
        <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Comparateur Vide</h1>
        <p className="text-slate-400 max-w-md mb-10 font-medium">Vous n'avez sélectionné aucune filière à comparer. Retournez sur les pages des facultés pour les ajouter.</p>
        <Link href="/" className="px-10 py-5 bg-emerald-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-emerald-500/20">
          Explorer les Facultés
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-3 text-slate-500 hover:text-emerald-500 transition-colors font-black uppercase tracking-widest text-[10px] mb-12">
          <ArrowLeft className="h-4 w-4" />
          Retour à l'Accueil
        </Link>

        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 italic">Comparateur <span className="text-emerald-500 not-italic">Filières</span></h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">Analysez côte à côte les débouchés, les critères et les missions pour faire le meilleur choix académique.</p>
        </header>

        <div className="overflow-x-auto pb-12">
          <div className="flex gap-8 min-w-[800px]">
             {selectedDepartments.map((dept) => (
               <div key={dept.slug} className="flex-1 min-w-[300px] border border-white/5 rounded-[3rem] bg-slate-900/20 overflow-hidden relative group">
                  <button 
                    onClick={() => removeFromComparison(dept.slug)}
                    className="absolute top-6 right-6 p-2 bg-slate-950 text-slate-500 hover:text-rose-500 rounded-full border border-white/5 transition-colors z-20"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  {/* Header */}
                  <div className="p-10 border-b border-white/5 bg-slate-900/40">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                      <Zap className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight mb-2">{dept.name}</h2>
                    <p className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest">{dept.faculty}</p>
                  </div>

                  {/* Comparisons */}
                  <div className="space-y-12 p-10">
                    {/* Admission */}
                    <div className="space-y-4">
                       <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                         <Target className="h-3 w-3" /> Admission
                       </h3>
                       <div className="p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                          <p className="text-xs text-white/40 mb-2 uppercase font-black tracking-widest">Bac Recommandé</p>
                          <p className="font-bold text-white mb-4">{dept.admissionCriteria.bacSeries.join(', ')}</p>
                          <p className="text-xs text-white/40 mb-2 uppercase font-black tracking-widest">Moyenne</p>
                          <p className="text-2xl font-black text-emerald-500">{dept.admissionCriteria.minAverage}/20</p>
                       </div>
                    </div>

                    {/* Careers */}
                    <div className="space-y-4">
                       <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                         <Briefcase className="h-3 w-3" /> Débouchés
                       </h3>
                       <div className="flex flex-wrap gap-2">
                          {dept.careerPaths.slice(0, 4).map((career, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white/5 rounded-lg text-[10px] font-bold text-slate-300 border border-white/5">
                              {career}
                            </span>
                          ))}
                       </div>
                    </div>

                    {/* Subjects */}
                    <div className="space-y-4">
                       <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                         <Info className="h-3 w-3" /> Matières Clés
                       </h3>
                       <p className="text-sm font-medium text-slate-400 italic">
                          {dept.subjects.slice(0, 3).join(', ')}...
                       </p>
                    </div>

                    <Link 
                      href={`/departements/${dept.slug}`}
                      className="w-full py-4 bg-emerald-500/10 text-emerald-500 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all text-center block mt-8"
                    >
                      Voir Détails
                    </Link>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  )
}
