import { AlertTriangle, Info, UserPlus, FileText, Calendar, Lock } from 'lucide-react'
import Link from 'next/link'

export function SystemAlerts() {
  return (
    <section className="bg-surface-container-low p-6 rounded-[2rem] border border-outline-variant/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-black font-headline text-on-surface tracking-tight">Alertes Système</h3>
        <AlertTriangle className="h-5 w-5 text-on-surface-variant" />
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-white rounded-xl border-l-4 border-error flex gap-4 shadow-sm">
          <AlertTriangle className="h-5 w-5 text-error mt-0.5" />
          <div>
            <p className="text-sm font-bold text-on-surface tracking-tight">Serveur Mail Surchargé</p>
            <p className="text-xs text-on-surface-variant mt-0.5 font-medium">Retard de 15min sur les notifications.</p>
            <button className="mt-2 text-[10px] font-black text-primary hover:underline uppercase tracking-wider">
              REDÉMARRER LE SERVICE
            </button>
          </div>
        </div>
        <div className="p-4 bg-white rounded-xl border-l-4 border-tertiary-container flex gap-4 shadow-sm">
          <Info className="h-5 w-5 text-tertiary-container mt-0.5" />
          <div>
            <p className="text-sm font-bold text-on-surface tracking-tight">Maintenance Planifiée</p>
            <p className="text-xs text-on-surface-variant mt-0.5 font-medium">Samedi 14 Octobre à 02:00 UTC.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function QuickActionsGrid() {
  const actions = [
    { label: 'Nouvel Étudiant', icon: UserPlus, href: '/admin/users' },
    { label: 'Générer Rapport', icon: FileText, href: '/admin/logs' },
    { label: 'Planning Global', icon: Calendar, href: '/admin/settings' },
    { label: 'Sécurité', icon: Lock, href: '/admin/settings' },
  ]

  return (
    <section className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-sm border border-surface-variant/20">
      <h3 className="font-black font-headline text-on-surface mb-6 tracking-tight">Raccourcis rapides</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link 
            key={action.label} 
            href={action.href}
            className="p-4 bg-surface-container-low rounded-xl flex flex-col items-center gap-2 hover:bg-secondary-container transition-all group active:scale-95"
          >
            <action.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-on-surface-variant uppercase text-center tracking-tight">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
