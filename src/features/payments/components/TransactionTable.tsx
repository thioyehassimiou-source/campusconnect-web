import { FileText, CreditCard, Landmark, Smartphone, ChevronLeft, ChevronRight } from 'lucide-react'
import { Transaction } from '../types'

interface TransactionTableProps {
  transactions: Transaction[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'credit_card': return <CreditCard className="h-3.5 w-3.5" />
      case 'transfer': return <Landmark className="h-3.5 w-3.5" />
      case 'mobile_money': return <Smartphone className="h-3.5 w-3.5" />
      default: return <CreditCard className="h-3.5 w-3.5" />
    }
  }

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case 'credit_card': return 'Carte Bancaire'
      case 'transfer': return 'Virement'
      case 'mobile_money': return 'Mobile Money'
      default: return 'Autre'
    }
  }

  return (
    <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-xl border border-outline-variant/10 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/30 border-b border-outline-variant/5">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">ID Transaction</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">Désignation</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">Date</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">Mode</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50 text-right">Montant</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">Statut</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50 text-center">Facture</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {transactions.map((tx) => (
              <tr key={tx.id} className="group hover:bg-surface-container-low/20 transition-colors">
                <td className="px-8 py-6 text-xs font-black text-on-surface-variant opacity-60 tracking-widest">{tx.reference}</td>
                <td className="px-8 py-6">
                  <p className="text-sm font-black text-on-surface tracking-tight">{tx.designation}</p>
                  <p className="text-[10px] text-on-surface-variant/50 font-bold uppercase tracking-widest mt-0.5">{tx.category}</p>
                </td>
                <td className="px-8 py-6 text-sm font-semibold text-on-surface-variant">{tx.date}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <span className="p-1.5 rounded-lg bg-surface-container-low">
                      {getModeIcon(tx.mode)}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">{getModeLabel(tx.mode)}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-black text-right tracking-tight text-primary">
                  {tx.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} {tx.currency}
                </td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest border border-green-100/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Payé
                  </span>
                </td>
                <td className="px-8 py-6 text-center">
                  <button className="p-3 text-primary hover:bg-primary/5 rounded-2xl transition-all group-hover:rotate-6 shadow-sm">
                    <FileText className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-10 py-6 flex items-center justify-between bg-surface-container-low/10 border-t border-outline-variant/10">
        <p className="text-[10px] text-on-surface-variant/50 font-black uppercase tracking-widest">
          Affichage de 1-{transactions.length} sur 12 transactions
        </p>
        <div className="flex gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/20 text-on-surface-variant opacity-30 cursor-not-allowed">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white text-[10px] font-black shadow-lg shadow-primary/10">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/20 hover:bg-white transition-all text-[10px] font-black">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/20 hover:bg-white transition-all text-on-surface-variant">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
