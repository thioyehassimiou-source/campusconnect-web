import { TrendingUp, UserX, Clock } from 'lucide-react'
import { AttendanceMetrics } from '../types'

interface AttendanceStatsProps {
  metrics: AttendanceMetrics
}

export function AttendanceStats({ metrics }: AttendanceStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 animate-in fade-in slide-in-from-top-6 duration-700">
      {/* Global Rate */}
      <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] flex items-center gap-8 shadow-sm border border-outline-variant/10 group hover:shadow-xl transition-all">
        <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
          <TrendingUp className="h-10 w-10" />
        </div>
        <div>
          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-50 mb-1">Taux d'assiduité global</p>
          <h3 className="text-4xl font-black text-primary font-headline tracking-tighter">{metrics.globalRate}%</h3>
          <p className="text-[10px] text-green-600 font-black flex items-center gap-1 mt-2">
            <TrendingUp className="h-3 w-3" /> {metrics.trend} ce mois
          </p>
        </div>
      </div>

      {/* Unjustified Absences */}
      <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] flex items-center gap-8 shadow-sm border border-outline-variant/10 group hover:shadow-xl transition-all">
        <div className="w-20 h-20 rounded-3xl bg-error/5 flex items-center justify-center text-error group-hover:bg-error group-hover:text-white transition-all duration-500">
          <UserX className="h-10 w-10" />
        </div>
        <div>
          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-50 mb-1">Absences injustifiées</p>
          <h3 className="text-4xl font-black text-primary font-headline tracking-tighter">{metrics.unjustifiedAbsences}</h3>
          <p className="text-[10px] text-on-surface-variant font-bold mt-2 uppercase tracking-widest opacity-40">Sur les 7 derniers jours</p>
        </div>
      </div>

      {/* Pending Sessions */}
      <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] flex items-center gap-8 shadow-sm border border-outline-variant/10 group hover:shadow-xl transition-all">
        <div className="w-20 h-20 rounded-3xl bg-primary-fixed/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
          <Clock className="h-10 w-10" />
        </div>
        <div>
          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-50 mb-1">Séances à valider</p>
          <h3 className="text-4xl font-black text-primary font-headline tracking-tighter">{metrics.pendingSessions.toString().padStart(2, '0')}</h3>
          <p className="text-[10px] text-on-surface-variant font-bold mt-2 uppercase tracking-widest opacity-40">Nécessite votre attention</p>
        </div>
      </div>
    </div>
  )
}
