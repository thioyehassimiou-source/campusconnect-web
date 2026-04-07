'use client'

import { useState } from 'react'
import { AcademicHeader } from '@/features/academic/components/AcademicHeader'
import { AcademicFilters } from '@/features/academic/components/AcademicFilters'
import { DepartmentCard } from '@/features/academic/components/DepartmentCard'
import { departments } from '@/features/departments/data'

export default function AcademicDepartmentsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <div className="max-w-[1500px] mx-auto pb-20">
      {/* Editorial Header */}
      <AcademicHeader view={view} onViewChange={setView} />

      {/* Control Layer */}
      <AcademicFilters />

      {/* Grid Canvas */}
      <div className={`grid gap-10 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {Object.values(departments).map((dept: any) => (
          <DepartmentCard key={dept.slug} department={dept} />
        ))}
      </div>

      {/* Footer / Meta */}
      <footer className="mt-24 pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-black uppercase tracking-widest text-on-surface-variant/30">
        <p>© 2026 CampusConnect - Système de Gestion Académique Intégré</p>
        <div className="flex gap-10">
          <span className="cursor-not-allowed opacity-50 transition-colors">Politique de confidentialité (Bientôt)</span>
          <span className="cursor-not-allowed opacity-50 transition-colors">Documentation administrative (Bientôt)</span>
          <span className="cursor-not-allowed opacity-50 transition-colors">Contact Support (Bientôt)</span>
        </div>
      </footer>
    </div>
  )
}
