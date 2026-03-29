import { Eye, Download as DownloadIcon, CheckCircle2, MoreHorizontal } from 'lucide-react'
import { Assignment } from '../types'

interface AssignmentTableProps {
  assignments: Assignment[]
}

export function AssignmentTable({ assignments }: AssignmentTableProps) {
  return (
    <div className="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden border border-outline-variant/10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50 border-b border-surface-variant/20">
              <th className="px-8 py-6 text-[11px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Matière</th>
              <th className="px-6 py-6 text-[11px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Titre du devoir</th>
              <th className="px-6 py-6 text-[11px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Échéance</th>
              <th className="px-6 py-6 text-[11px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Statut</th>
              <th className="px-8 py-6 text-[11px] font-black text-on-surface-variant uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-variant/10">
            {assignments.map((item) => (
              <tr 
                key={item.id} 
                className={`transition-colors group ${
                  item.status === 'En retard' ? 'hover:bg-error/[0.02]' : 
                  item.status === 'Soumis' ? 'bg-surface-container-low/10 hover:bg-surface-container-low/20' : 
                  'hover:bg-surface-container-low/30'
                }`}
              >
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.courseColor} shadow-sm`} />
                    <span className="text-sm font-black text-on-surface tracking-tight">{item.course}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <p className="text-sm font-bold text-on-surface-variant group-hover:text-on-surface transition-colors">{item.title}</p>
                  <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest mt-0.5">{item.type} • {item.format}</p>
                </td>
                <td className="px-6 py-6">
                  <div className="flex flex-col">
                    <span className={`text-sm font-black tracking-tight ${item.status === 'En retard' ? 'text-error' : 'text-on-surface'}`}>
                      {item.dueDate}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${item.status === 'Soumis' ? 'text-green-600' : 'text-on-surface-variant opacity-50'}`}>
                      {item.dueRelative}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className={`
                    inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                    ${item.status === 'En retard' ? 'bg-error-container text-on-error-container' : 
                      item.status === 'Soumis' ? 'bg-green-100 text-green-700' : 
                      'bg-secondary-fixed text-on-secondary-fixed-variant'}
                  `}>
                    {item.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end items-center gap-3">
                    {item.status !== 'Soumis' ? (
                      <>
                        <button className="p-2.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-xl transition-all" title="Voir le sujet">
                          <Eye className="h-4.5 w-4.5" />
                        </button>
                        <button className="px-5 py-2 bg-primary text-white text-[11px] font-black rounded-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                          Déposer
                        </button>
                      </>
                    ) : (
                      <button className="px-5 py-2 bg-surface-container-high text-on-surface-variant text-[11px] font-black rounded-lg transition-all flex items-center gap-2 uppercase tracking-widest opacity-80 cursor-default">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Rendu</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-8 py-5 bg-surface-container-low/30 flex items-center justify-between border-t border-surface-variant/10">
        <span className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">
          Affichage de 1-{assignments.length} sur 6 devoirs
        </span>
        <div className="flex gap-1.5">
          <button className="p-2 rounded-xl hover:bg-surface-container-high transition-colors opacity-30 cursor-not-allowed">
             <MoreHorizontal className="h-4 w-4" />
          </button>
          <button className="px-4 py-1.5 text-xs font-black bg-primary text-white rounded-lg shadow-md">1</button>
          <button className="px-4 py-1.5 text-xs font-black hover:bg-surface-container-high text-on-surface-variant rounded-lg transition-colors border border-outline-variant/10">2</button>
        </div>
      </div>
    </div>
  )
}
