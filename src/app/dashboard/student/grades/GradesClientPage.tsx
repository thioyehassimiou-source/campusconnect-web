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
    <div className="max-w-6xl mx-auto pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black text-primary tracking-tighter mb-1">Relevé de Notes</h2>
          <p className="text-on-surface-variant font-black uppercase tracking-[0.2em] text-xs opacity-70">
            Année Académique 2023-2024 — Licence 3 Informatique
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-outline-variant/10 rounded-2xl text-[11px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition-all shadow-sm">
          <Download className="h-4 w-4" />
          Télécharger PDF
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          icon={BarChart3} 
          label="Moyenne Générale" 
          value={summary.gpa.toFixed(2)} 
          suffix="/20"
          color="primary"
        />
        <StatCard 
          icon={CheckCircle2} 
          label="Crédits Validés" 
          value={summary.validatedCredits} 
          suffix={`/${summary.totalCredits}`}
          color="secondary"
        />
        <StatCard 
          icon={BookOpen} 
          label="Modules Validés" 
          value={grades.filter(g => g.grade >= 10).length} 
          suffix={`/${grades.length}`}
          color="tertiary"
        />
        <StatCard 
          icon={AlertCircle} 
          label=" Rattrapages" 
          value={grades.filter(g => g.grade < 10 && g.grade !== null).length} 
          color="error"
        />
      </div>

      {/* Semesters */}
      <div className="space-y-12">
        {semesters.length > 0 ? semesters.map(sem => (
          <section key={sem}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-outline-variant/10" />
              <h3 className="text-sm font-black text-on-surface-variant/40 uppercase tracking-[0.3em]">Semestre {sem}</h3>
              <div className="h-px flex-1 bg-outline-variant/10" />
            </div>

            <div className="grid gap-4">
              {grades.filter(g => g.semester === sem).map(grade => (
                <GradeRow key={grade.id} grade={grade} />
              ))}
            </div>
          </section>
        )) : (
          <div className="text-center py-20 bg-surface-container-low/20 rounded-[3rem] border border-dashed border-outline-variant/20">
            <p className="text-on-surface-variant/40 font-black uppercase tracking-widest text-xs">Aucune note enregistrée pour le moment</p>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, suffix, color }: any) {
  const colors: any = {
    primary: 'bg-primary/5 text-primary border-primary/10',
    secondary: 'bg-secondary-container/20 text-secondary border-secondary/10',
    tertiary: 'bg-tertiary-container/10 text-tertiary-container border-tertiary-container/10',
    error: 'bg-error/5 text-error border-error/10'
  }

  return (
    <div className={`p-6 rounded-[2.5rem] border ${colors[color]} shadow-sm hover:shadow-md transition-all`}>
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/50 mb-4">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black tracking-tighter">{value}</span>
        {suffix && <span className="text-sm font-bold opacity-40">{suffix}</span>}
      </div>
    </div>
  )
}

function GradeRow({ grade }: { grade: Grade }) {
  const isValidated = grade.grade >= 10
  
  return (
    <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-outline-variant/10 hover:border-primary/20 hover:shadow-premium-sm transition-all group">
      <div className="flex items-center gap-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs ${isValidated ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
          {grade.grade?.toFixed(1) || 'N/A'}
        </div>
        <div>
          <h4 className="text-sm font-black text-on-surface tracking-tight group-hover:text-primary transition-colors">{grade.course?.title}</h4>
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mt-0.5">
            {grade.course?.code} — {grade.course?.credits} CRÉDITS
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="hidden sm:flex flex-col items-end">
          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${isValidated ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {isValidated ? 'Validé' : 'À rattraper'}
          </span>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors cursor-pointer">
          <BarChart3 className="h-4 w-4 text-on-surface-variant/30" />
        </div>
      </div>
    </div>
  )
}
