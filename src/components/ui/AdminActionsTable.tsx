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
    <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-sm border border-outline-variant/5">
      <div className="p-6 border-b border-surface-container">
        <h3 className="text-lg font-black font-headline text-on-surface tracking-tight">Actions administratives récentes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Utilisateur</th>
              <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Action</th>
              <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {actions.map((record) => (
              <tr key={record.id} className="hover:bg-surface-container-low/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs ring-2 ring-white">
                      {record.initials}
                    </div>
                    <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                      {record.user}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant font-medium">{record.action}</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant font-medium">{record.date}</td>
                <td className="px-6 py-4">
                  <span className={`
                    inline-flex items-center px-2 py-1 rounded-full text-[10px] font-black
                    ${record.status === 'TERMINÉ' ? 'bg-green-100 text-green-700' : 
                      record.status === 'EN COURS' ? 'bg-blue-100 text-blue-700' : 
                      'bg-red-100 text-red-700'}
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
