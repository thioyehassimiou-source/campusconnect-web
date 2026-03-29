interface ActionRecord {
  id: string
  user: string
  initials: string
  action: string
  date: string
  status: 'TERMINÉ' | 'EN COURS' | 'ERREUR'
}

const actions: ActionRecord[] = [
  { id: '1', user: 'Jean Dupont', initials: 'JD', action: 'Validation inscription L3', date: '12 oct. 2023', status: 'TERMINÉ' },
  { id: '2', user: 'Marie Lefebvre', initials: 'ML', action: 'Mise à jour accès bibliothèque', date: 'Il y a 2h', status: 'EN COURS' },
  { id: '3', user: 'Dr. Vallet', initials: 'CV', action: 'Publication nouveau cours', date: 'Hier', status: 'TERMINÉ' },
]

export function AdminActionsTable() {
  return (
    <div className="card-premium overflow-hidden entrance-up shadow-premium hover:shadow-premium-lg transition-all duration-500">
      <div className="p-6 border-b border-outline-variant/5 bg-surface-container-low/30">
        <h3 className="text-lg font-black font-headline text-on-surface tracking-tighter">Actions administratives récentes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low/50">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">Utilisateur</th>
              <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">Action</th>
              <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">Date</th>
              <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {actions.map((record) => (
              <tr key={record.id} className="hover:bg-primary/[0.02] transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs ring-2 ring-white dark:ring-white/5 shadow-sm group-hover:scale-110 transition-transform">
                      {record.initials}
                    </div>
                    <span className="text-sm font-black text-on-surface group-hover:text-primary transition-colors tracking-tight">
                      {record.user}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-on-surface-variant font-bold opacity-80">{record.action}</td>
                <td className="px-6 py-5 text-sm text-on-surface-variant font-bold opacity-60 tracking-tight">{record.date}</td>
                <td className="px-6 py-5">
                  <span className={`
                    inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase
                    ${record.status === 'TERMINÉ' ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 
                      record.status === 'EN COURS' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 
                      'bg-red-50 text-red-700 dark:bg-error/10 dark:text-error'}
                  `}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
