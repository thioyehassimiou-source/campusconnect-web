'use client'

import { Grade, AcademicSummary } from '@/features/grades/types'
import { GraduationCap, BookOpen, CheckCircle2, AlertCircle, BarChart3, Download } from 'lucide-react'
import { useState } from 'react'

export default function GradesClientPage({ initialGrades }: { initialGrades: Grade[] }) {
  const [grades] = useState(initialGrades)

  // Calculate stats
  const summary: AcademicSummary = grades.reduce((acc, curr) => {
    const credits = curr.course?.credits || 0
    acc.totalCredits += credits
    if (curr.grade >= 10) acc.validatedCredits += credits
    if (curr.status === 'pending') acc.pendingModules += 1
    return acc
  }, { gpa: 0, totalCredits: 0, validatedCredits: 0, pendingModules: 0 })

  const validGrades = grades.filter(g => g.grade !== null)
  summary.gpa = validGrades.length > 0 
    ? validGrades.reduce((acc, curr) => acc + curr.grade, 0) / validGrades.length 
    : 0

  const semesters = Array.from(new Set(grades.map(g => g.semester))).sort()

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight mb-1">Relevé de Notes</h2>
          <p className="text-[11px] text-emerald-500/80 font-black uppercase tracking-[0.2em]">
            Année Académique 2023-2024 — Licence 3 Informatique
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-300 hover:bg-slate-800 transition-all">
          <Download className="h-3.5 w-3.5" />
          Télécharger PDF
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={BarChart3} label="Moyenne Générale" value={summary.gpa.toFixed(2)} suffix="/20" color="emerald" />
        <StatCard icon={CheckCircle2} label="Crédits Validés" value={summary.validatedCredits} suffix={`/${summary.totalCredits}`} color="blue" />
        <StatCard icon={BookOpen} label="Modules Validés" value={grades.filter(g => g.grade >= 10).length} suffix={`/${grades.length}`} color="amber" />
        <StatCard icon={AlertCircle} label="Rattrapages" value={grades.filter(g => g.grade < 10 && g.grade !== null).length} color="rose" />
      </div>

      {/* Semesters */}
      <div className="space-y-8">
        {semesters.length > 0 ? semesters.map(sem => (
          <section key={sem}>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 bg-white/5" />
              <h3 className="text-xs font-black text-slate-900 dark:text-slate-400 uppercase tracking-[0.25em]">Semestre {sem}</h3>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="grid gap-3">
              {grades.filter(g => g.semester === sem).map(grade => (
                <GradeRow key={grade.id} grade={grade} />
              ))}
            </div>
          </section>
        )) : (
          <div className="text-center py-16 bg-slate-950/40 rounded-xl border border-dashed border-white/5">
            <p className="text-[11px] text-slate-900 dark:text-slate-400 font-black uppercase tracking-widest">Aucune note enregistrée pour le moment</p>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, suffix, color }: any) {
  const colors: any = {
    emerald: 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10',
    blue: 'bg-blue-500/5 text-blue-400 border-blue-500/10',
    amber: 'bg-amber-500/5 text-amber-400 border-amber-500/10',
    rose: 'bg-rose-500/5 text-rose-400 border-rose-500/10',
  }

  return (
    <div className={`p-4 rounded-xl border ${colors[color]} transition-all`}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 mb-3">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-400 mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black tracking-tighter">{value}</span>
        {suffix && <span className="text-xs font-bold opacity-40">{suffix}</span>}
      </div>
    </div>
  )
}

function GradeRow({ grade }: { grade: Grade }) {
  const isValidated = grade.grade >= 10
  
  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl border border-white/5 hover:border-emerald-500/20 transition-all group">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs border ${isValidated ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
          {grade.grade?.toFixed(1) || 'N/A'}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">{grade.course?.title}</h4>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-slate-400 mt-0.5">
            {grade.course?.code} — {grade.course?.credits} CRÉDITS
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end">
          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md border ${isValidated ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
            {isValidated ? 'Validé' : 'À rattraper'}
          </span>
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
          <BarChart3 className="h-3.5 w-3.5 text-slate-600" />
        </div>
      </div>
    </div>
  )
}
