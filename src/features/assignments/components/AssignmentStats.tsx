import { AlertCircle, Clock, TrendingUp, CheckCircle2 } from 'lucide-react'

interface AssignmentStatsProps {
  lateCount: number
  upcomingCount: number
  averageGrade: number
  successRate: number
}

export function AssignmentStats({ lateCount, upcomingCount, averageGrade, successRate }: AssignmentStatsProps) {
  const stats = [
    {
      label: 'En retard',
      value: lateCount.toString().padStart(2, '0'),
      icon: AlertCircle,
      color: 'text-error',
      borderColor: 'border-error'
    },
    {
      label: 'À venir',
      value: upcomingCount.toString().padStart(2, '0'),
      icon: Clock,
      color: 'text-tertiary-container',
      borderColor: 'border-[#ffddba]'
    },
    {
      label: 'Moyenne travaux',
      value: averageGrade.toFixed(1),
      icon: TrendingUp,
      color: 'text-primary',
      borderColor: 'border-primary'
    },
    {
      label: 'Taux de réussite',
      value: `${successRate}%`,
      icon: CheckCircle2,
      color: 'text-secondary',
      borderColor: 'border-secondary'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div 
          key={stat.label} 
          className={`bg-surface-container-lowest p-6 rounded-2xl border-l-[6px] ${stat.borderColor} shadow-sm transition-all hover:translate-y-[-2px] hover:shadow-lg`}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60 mb-1">
            {stat.label}
          </p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-black text-on-surface font-headline tracking-tighter">
              {stat.value}
            </span>
            <stat.icon className={`${stat.color} h-8 w-8 opacity-20`} strokeWidth={3} />
          </div>
        </div>
      ))}
    </div>
  )
}
