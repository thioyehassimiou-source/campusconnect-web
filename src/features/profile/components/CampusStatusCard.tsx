import { CreditCard, Library, BadgeCheck } from 'lucide-react'
import { AccountStatus } from '../types'

interface CampusStatusProps {
  status: AccountStatus
}

export function CampusStatusCard({ status }: CampusStatusProps) {
  const items = [
    { label: 'Badge Étudiant', value: status.badge, icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Bibliothèque', value: status.library, icon: Library, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Frais Scolaires', value: status.tuition, icon: BadgeCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' }
  ]

  return (
    <div className="bg-surface-container-low p-8 rounded-[2.5rem] space-y-5 shadow-inner border border-outline-variant/5 animate-in fade-in slide-in-from-right-6 duration-1000">
      <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 opacity-70 ml-2">Statut du compte</h4>
      {items.map((item) => (
        <div key={item.label} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-outline-variant/5 transition-all hover:scale-[1.02]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary/40">
              <item.icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-black text-on-surface-variant tracking-tight">{item.label}</span>
          </div>
          <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${item.color} ${item.bg} border border-emerald-100`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}
