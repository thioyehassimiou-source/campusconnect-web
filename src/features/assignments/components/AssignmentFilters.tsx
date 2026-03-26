import { Info, ChevronDown } from 'lucide-react'

interface AssignmentFiltersProps {
  courses: string[]
  currentCourse: string
  currentStatus: string
  onCourseChange: (course: string) => void
  onStatusChange: (status: string) => void
}

export function AssignmentFilters({ courses, currentCourse, currentStatus, onCourseChange, onStatusChange }: AssignmentFiltersProps) {
  const statuses = ['Tout', 'À rendre', 'En retard', 'Soumis']

  return (
    <div className="bg-surface-container-lowest p-5 rounded-3xl flex flex-wrap items-center gap-6 shadow-sm border border-outline-variant/5">
      <div className="flex items-center space-x-3 bg-surface-container-low px-4 py-2.5 rounded-2xl border border-outline-variant/10 group">
        <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.15em] opacity-60">Cours:</span>
        <div className="relative">
          <select 
            value={currentCourse}
            onChange={(e) => onCourseChange(e.target.value)}
            className="bg-transparent border-none text-sm font-black text-on-surface focus:ring-0 py-0 pr-8 cursor-pointer appearance-none tracking-tight"
          >
            {courses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="flex items-center space-x-3 bg-surface-container-low px-4 py-2.5 rounded-2xl border border-outline-variant/10">
        <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.15em] opacity-60">Statut:</span>
        <div className="flex gap-1.5">
          {statuses.map(s => (
            <button 
              key={s}
              onClick={() => onStatusChange(s)}
              className={`
                text-[10px] px-4 py-1.5 rounded-xl font-black uppercase tracking-widest transition-all
                ${currentStatus === s 
                  ? 'bg-primary text-white shadow-md scale-105' 
                  : 'hover:bg-surface-container-high text-on-surface-variant border border-transparent'
                }
              `}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="ml-auto flex items-center space-x-3 text-on-surface-variant px-4 py-2 bg-surface-container-low/50 rounded-2xl">
        <span className="text-xs font-bold tracking-tight">6 devoirs en cours</span>
        <Info className="h-4 w-4 opacity-40" />
      </div>
    </div>
  )
}
