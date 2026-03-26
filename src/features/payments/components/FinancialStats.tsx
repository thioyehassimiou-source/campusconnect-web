import { ShieldCheck, CalendarClock, CreditCard } from 'lucide-react'
import { FinancialSummary } from '../types'

interface FinancialStatsProps {
  summary: FinancialSummary
}

export function FinancialStats({ summary }: FinancialStatsProps) {
  const stats = [
    {
      label: 'Total Réglé',
      value: `${summary.totalPaid.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} ${summary.currency}`,
      icon: ShieldCheck,
      color: 'bg-emerald-100 text-emerald-700',
      iconColor: 'text-emerald-600'
    },
    {
      label: 'Frais en Attente',
      value: `${summary.pendingFees.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} ${summary.currency}`,
      icon: CalendarClock,
      color: 'bg-amber-100 text-amber-700',
      iconColor: 'text-amber-600'
    },
    {
      label: 'Plan de Paiement',
      value: summary.paymentPlan,
      icon: CreditCard,
      color: 'bg-blue-100 text-blue-700',
      iconColor: 'text-blue-600'
    }
  ]

  return (
    <div className="space-y-6">
      {stats.map((stat, i) => (
        <div 
          key={stat.label} 
          className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-sm border border-outline-variant/10 flex items-center gap-6 hover:shadow-xl hover:shadow-primary/5 transition-all group animate-in slide-in-from-right-4 duration-700"
          style={{ transitionDelay: `${i * 150}ms` }}
        >
          <div className={`p-4 rounded-2xl ${stat.color} shadow-inner transition-transform group-hover:scale-110`}>
            <stat.icon className="h-6 w-6" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] opacity-40">{stat.label}</p>
            <p className="text-xl font-black font-headline text-on-surface mt-1 truncate tracking-tight">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
