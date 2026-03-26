import { ArrowRight } from 'lucide-react'
import { Department } from '../types'

interface DepartmentCardProps {
  department: Department
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col border border-outline-variant/10 hover:border-primary/5 animate-in zoom-in-95 duration-700">
      <div className="flex justify-between items-start mb-12">
        <div className={`w-20 h-20 rounded-3xl ${department.color} flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
          <span className="material-symbols-outlined text-4xl leading-none">
            {department.icon}
          </span>
        </div>
        <span className={`px-5 py-2 ${department.badgeColor} text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm`}>
          Pôle {department.pole}
        </span>
      </div>

      <h3 className="text-3xl font-black text-on-background mb-4 font-headline tracking-tighter">
        {department.name}
      </h3>
      <p className="text-on-surface-variant text-base mb-10 leading-relaxed font-medium opacity-70">
        {department.description}
      </p>

      <div className="mt-auto space-y-8">
        <div className="flex items-center gap-6 py-6 border-t border-outline-variant/5">
          {department.facultyAvatars.length > 0 && (
            <div className="flex -space-x-3">
              {department.facultyAvatars.map((url, idx) => (
                <img 
                  key={idx}
                  src={url} 
                  alt="Faculty" 
                  className="w-10 h-10 rounded-full border-4 border-white object-cover shadow-sm ring-1 ring-black/5" 
                />
              ))}
              <div className="w-10 h-10 rounded-full bg-surface-container-high border-4 border-white flex items-center justify-center text-[10px] font-black text-on-surface-variant/40 shadow-sm">
                +12
              </div>
            </div>
          )}
          <div className="space-y-1">
            <span className="block text-sm font-black text-primary tracking-tight">
              {department.trackCount} Filières
            </span>
            <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">
              {department.studentCount.toLocaleString()} Étudiants
            </span>
          </div>
        </div>

        <button className="w-full py-5 bg-primary text-white font-black text-[12px] uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-4 group-hover:bg-primary-container transition-all shadow-xl shadow-primary/20 group-hover:shadow-primary/40 active:scale-95">
          Voir les détails
          <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  )
}
