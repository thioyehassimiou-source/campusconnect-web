import { useState } from 'react'
import { Check, X, Search } from 'lucide-react'
import { AttendanceStudent } from '../types'

interface AttendanceMarkerProps {
  students: AttendanceStudent[]
}

export function AttendanceMarker({ students: initialStudents }: AttendanceMarkerProps) {
  const [students, setStudents] = useState(initialStudents)
  
  const togglePresence = (id: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, isPresent: !s.isPresent } : s))
  }

  const presentCount = students.filter(s => s.isPresent).length

  return (
    <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-left-6 duration-700">
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h4 className="text-2xl font-black text-primary font-headline tracking-tighter">Marquer la présence</h4>
          <p className="text-sm text-on-surface-variant font-bold opacity-60 mt-1">Session : Intelligence Artificielle</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-green-50 text-green-700 text-[10px] font-black rounded-xl border border-green-100 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(22,163,74,0.5)]"></span>
            Direct
          </span>
        </div>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-3 custom-scrollbar">
        {students.map((student) => (
          <div 
            key={student.id} 
            className={`
              flex items-center justify-between p-5 rounded-2xl transition-all duration-300 border border-transparent
              ${student.isPresent 
                ? 'bg-secondary-container/20 border-secondary-container/20 shadow-sm' 
                : 'bg-surface-container-low hover:bg-surface-container-high'
              }
            `}
          >
            <div className="flex items-center gap-5">
              <div className="relative">
                <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-colors ${student.isPresent ? 'bg-green-500' : 'bg-slate-300'}`} />
              </div>
              <div>
                <p className={`text-sm font-black transition-colors ${student.isPresent ? 'text-primary' : 'text-on-surface-variant'}`}>{student.name}</p>
                <p className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest">{student.curriculum} • ID: {student.studentId}</p>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer group">
              <input 
                type="checkbox" 
                checked={student.isPresent} 
                onChange={() => togglePresence(student.id)}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-outline-variant/10">
        <button className="w-full py-5 bg-gradient-to-r from-primary to-primary-container text-white font-black text-[12px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all group">
          Valider l'appel ({presentCount} présents)
        </button>
      </div>
    </div>
  )
}
