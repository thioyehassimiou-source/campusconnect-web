'use client'

import { useState, useMemo } from 'react'
import { Department } from '../data'
import { calculateDepartmentMatch } from '../scoring'
import { Profile } from '@/features/profile/types'
import { Sparkles, CheckCircle2, AlertCircle, XCircle, Info } from 'lucide-react'

interface EligibilityTesterProps {
  department: Department
}

export default function EligibilityTester({ department }: EligibilityTesterProps) {
  const [bacSeries, setBacSeries] = useState<Profile['bac_series']>(null)
  const [bacAverage, setBacAverage] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const result = useMemo(() => {
    if (!bacSeries || !bacAverage) return null
    const mockProfile: Partial<Profile> = {
      bac_series: bacSeries,
      bac_average: bacAverage,
      interests: [] // Base match on series and average
    }
    return calculateDepartmentMatch(mockProfile as Profile, department)
  }, [bacSeries, bacAverage, department])

  const getStatusColor = (level: string) => {
    switch (level) {
      case 'Élevé': return 'text-emerald-500 bg-emerald-500/10'
      case 'Moyen': return 'text-amber-500 bg-amber-500/10'
      case 'Faible': return 'text-rose-500 bg-rose-500/10'
      case 'Incompatible': return 'text-slate-500 bg-slate-500/10'
      default: return 'text-slate-400 bg-slate-400/5'
    }
  }

  const getStatusIcon = (level: string) => {
    switch (level) {
      case 'Élevé': return <CheckCircle2 className="h-5 w-5" />
      case 'Moyen': return <CheckCircle2 className="h-5 w-5" />
      case 'Faible': return <AlertCircle className="h-5 w-5" />
      case 'Incompatible': return <XCircle className="h-5 w-5" />
      default: return <Info className="h-5 w-5" />
    }
  }

  return (
    <section className="bg-slate-900/60 p-10 rounded-[3.5rem] border border-primary/30 shadow-2xl shadow-primary/5 relative overflow-hidden transition-all duration-500">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Sparkles className="h-20 w-20 text-primary" />
      </div>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40">
          <Sparkles className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-black text-white tracking-tight">Vérifier mon Éligibilité</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary/80">Série du Baccalauréat</label>
          <div className="flex gap-2">
            {['SM', 'SE', 'SS'].map((series) => (
              <button
                key={series}
                onClick={() => { setBacSeries(series as any); setShowResult(true); }}
                className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all ${
                  bacSeries === series 
                    ? 'bg-primary border-primary text-white' 
                    : 'bg-slate-950/50 border-white/5 text-slate-400 hover:border-primary/30'
                }`}
              >
                {series}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary/80">Moyenne Estimée (0-20)</label>
          <input
            type="number"
            placeholder="Ex: 14.5"
            step="0.01"
            min="0"
            max="20"
            onChange={(e) => { setBacAverage(parseFloat(e.target.value)); setShowResult(true); }}
            className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-primary/50 placeholder:text-slate-600 appearance-none"
          />
        </div>

        {showResult && result && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500 mt-8 space-y-6">
            <div className={`p-6 rounded-2xl flex flex-col gap-4 ${getStatusColor(result.matchLevel)} border border-primary/10 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 px-3 py-1 bg-white/10 text-[8px] font-black uppercase tracking-widest rounded-bl-xl border-l border-b border-white/5">
                Calcul Officiel
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(result.matchLevel)}
                  <span className="text-sm font-black uppercase tracking-widest">Match {result.matchLevel}</span>
                </div>
                <div className="text-2xl font-black">{result.score}%</div>
              </div>
              <p className="text-sm font-medium leading-relaxed opacity-90 italic">
                "{result.advice}"
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Pondération des Matières</p>
              <div className="grid grid-cols-2 gap-3">
                {department.subjectWeights.map((sw, i) => (
                  <div key={i} className="p-4 bg-slate-950/30 rounded-2xl border border-white/5 flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase truncate">{sw.name}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-white">Coef {sw.coefficient}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className={`w-1.5 h-3 rounded-sm ${j < sw.coefficient ? 'bg-primary' : 'bg-white/5'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Détails du Scoring</p>
              {result.factors.map((factor, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-slate-400">{factor.label}</span>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${factor.achieved ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
                    {factor.impact}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl shadow-primary/20 mt-4">
              Prendre RDV avec un Conseiller
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
