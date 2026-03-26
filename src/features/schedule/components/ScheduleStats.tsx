import { Timer, Science, ClipboardList } from 'lucide-react'

export function ScheduleStats() {
  const stats = [
    {
      label: 'Heures cette semaine',
      value: '24h 30m',
      icon: Timer,
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      label: 'Sessions Labo',
      value: '3 Sessions',
      icon: Science,
      color: 'text-secondary',
      bg: 'bg-secondary-container/50'
    },
    {
      label: 'Travaux à rendre',
      value: '2 Devoirs',
      icon: ClipboardList,
      color: 'text-tertiary-container',
      bg: 'bg-tertiary-container/10'
    }
  ]

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-surface-container-low p-6 rounded-3xl flex items-center gap-5 transition-all hover:translate-y-[-2px] hover:shadow-lg border border-outline-variant/5">
          <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-inner`}>
            <stat.icon className="h-7 w-7" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-1">
              {stat.label}
            </p>
            <p className="text-xl font-black text-on-surface tracking-tight">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
