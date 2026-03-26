'use client'

import { Download, Wallet, HelpCircle } from 'lucide-react'
import { FinancialBalanceCard } from '@/features/payments/components/FinancialBalanceCard'
import { FinancialStats } from '@/features/payments/components/FinancialStats'
import { TransactionTable } from '@/features/payments/components/TransactionTable'
import { SecurityInfoCard } from '@/features/payments/components/SecurityInfoCard'
import { mockFinancialSummary, mockTransactions } from '@/features/payments/mockData'
import { FinancialSummary, Transaction } from '@/features/payments/types'

interface PaymentsClientPageProps {
  initialSummary: FinancialSummary | null
  initialTransactions: Transaction[]
}

export default function PaymentsClientPage({ initialSummary, initialTransactions }: PaymentsClientPageProps) {
  const summary = initialSummary || mockFinancialSummary
  const transactions = initialTransactions.length > 0 ? initialTransactions : mockTransactions

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 animate-in fade-in slide-in-from-top-6 duration-700">
        <div>
          <h2 className="text-4xl font-black font-headline text-primary tracking-tighter leading-tight">Gestion des Frais</h2>
          <p className="text-on-surface-variant text-lg font-medium opacity-70 mt-2">Consultez votre solde et gérez vos règlements académiques.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-4 rounded-[1.5rem] bg-white border-2 border-outline-variant/10 font-black text-primary text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-surface-container-low transition-all active:scale-95 shadow-sm">
            <Download className="h-4 w-4" />
            Relevé complet
          </button>
          <button className="px-10 py-4 rounded-[1.5rem] bg-gradient-to-br from-primary to-primary-container text-white text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-4 shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
            <Wallet className="h-4 w-4" />
            Payer maintenant
          </button>
        </div>
      </section>

      {/* Financial Overview Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <FinancialBalanceCard summary={summary} />
        </div>
        <div>
          <FinancialStats summary={summary} />
        </div>
      </div>

      {/* Transactions Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-2xl font-black font-headline text-primary tracking-tight">Historique des Transactions</h3>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full bg-primary text-white shadow-xl shadow-primary/10 transition-all">Tous</button>
            <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-all">Réussis</button>
            <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-all">En cours</button>
          </div>
        </div>
        
        <TransactionTable transactions={transactions} />
      </section>

      {/* Secure Info & Support */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
          <SecurityInfoCard />
        </div>
        
        <div className="bg-primary p-10 rounded-[2.5rem] text-white flex flex-col justify-between shadow-2xl shadow-primary/20 relative overflow-hidden group animate-in slide-in-from-right-12 duration-1000">
          <HelpCircle className="h-12 w-12 opacity-30 mb-8 transition-transform group-hover:scale-110" />
          <div className="relative z-10">
            <h4 className="text-2xl font-black font-headline mb-4 tracking-tight">Besoin d'aide ?</h4>
            <p className="text-sm opacity-70 leading-relaxed font-medium mb-8">Contactez le service comptabilité pour toute question sur vos frais.</p>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-white/30 hover:border-white transition-all pb-1">
              Ouvrir un ticket
            </button>
          </div>
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
        </div>
      </div>
    </div>
  )
}
