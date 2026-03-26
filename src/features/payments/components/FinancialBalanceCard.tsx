import { Landmark } from 'lucide-react'
import { FinancialSummary } from '../types'

interface FinancialBalanceCardProps {
  summary: FinancialSummary
}

export function FinancialBalanceCard({ summary }: FinancialBalanceCardProps) {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-outline-variant/5 flex flex-col justify-between h-full group animate-in fade-in zoom-in-98 duration-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-on-surface-variant font-black text-[10px] uppercase tracking-[0.3em] opacity-50">Solde Restant à Payer</p>
          <h3 className="text-6xl font-black font-headline text-primary mt-3 tracking-tighter group-hover:scale-[1.02] transition-transform duration-500">
            {summary.remainingBalance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} {summary.currency}
          </h3>
        </div>
        <div className="bg-primary/5 p-5 rounded-[2rem] shadow-inner ring-1 ring-primary/5 group-hover:rotate-12 transition-transform duration-700">
          <Landmark className="h-10 w-10 text-primary" />
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Progression du règlement annuel</span>
            <p className="text-sm font-black text-on-surface">{summary.progressPercentage}% Complété</p>
          </div>
          <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-tighter">
            PROCHAINE ÉCHÉANCE : {summary.nextDeadline}
          </span>
        </div>
        
        <div className="relative w-full bg-surface-container-low h-4 rounded-full overflow-hidden shadow-inner ring-1 ring-black/5">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-container rounded-full shadow-[0_0_15px_rgba(0,24,95,0.3)] transition-all duration-1000 ease-out"
            style={{ width: `${summary.progressPercentage}%` }}
          />
        </div>
        
        <p className="text-[10px] text-on-surface-variant/60 font-bold italic tracking-wide">
          * Les paiements effectués par virement peuvent prendre jusqu'à 48h pour être crédités.
        </p>
      </div>
    </div>
  )
}
