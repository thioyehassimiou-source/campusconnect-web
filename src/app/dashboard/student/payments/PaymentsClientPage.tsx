'use client'

import { Download, Wallet, HelpCircle, FileText } from 'lucide-react'
import { FinancialBalanceCard } from '@/features/payments/components/FinancialBalanceCard'
import { FinancialStats } from '@/features/payments/components/FinancialStats'
import { TransactionTable } from '@/features/payments/components/TransactionTable'
import { SecurityInfoCard } from '@/features/payments/components/SecurityInfoCard'
import { FinancialSummary, Transaction } from '@/features/payments/types'
import { useToast } from '@/components/ui/Toast'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface PaymentsClientPageProps {
  initialSummary: FinancialSummary | null
  initialTransactions: Transaction[]
}

export default function PaymentsClientPage({ initialSummary, initialTransactions }: PaymentsClientPageProps) {
  const [summary, setSummary] = useState(initialSummary)
  const [transactions, setTransactions] = useState(initialTransactions)
  const [isPaying, setIsPaying] = useState(false)
  const [isTicketLoading, setIsTicketLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'success' | 'pending'>('all')
  
  const { info, success, error } = useToast()
  const supabase = createClient()
  const router = useRouter()

  const handlePayment = async () => {
    if (!summary) return
    setIsPaying(true)
    
    try {
      const amount = 500 // Simulation d'un paiement de 500€
      const ref = `PAY-${Math.random().toString(36).substring(7).toUpperCase()}`
      
      // 1. Create Transaction
      const { error: txError } = await supabase
        .from('transactions')
        .insert({
          user_id: summary.userId,
          amount,
          status: 'paid',
          designation: 'Paiement Frais de Scolarité',
          reference: ref,
          category: 'Scolarité',
          mode: 'credit_card'
        })
      
      if (txError) throw txError

      // 2. Update Financial Summary
      const newTotalPaid = Number(summary.totalPaid) + amount
      const newRemaining = Math.max(0, Number(summary.remainingBalance) - amount)
      
      const { error: summaryError } = await supabase
        .from('financial_summaries')
        .update({
          total_paid: newTotalPaid,
          remaining_balance: newRemaining,
          progress_percentage: Math.min(100, Math.round((newTotalPaid / (newTotalPaid + (newRemaining > 0 ? newRemaining : 0))) * 100))
        })
        .eq('user_id', summary.userId)

      if (summaryError) throw summaryError

      success('Paiement effectué avec succès !')
      router.refresh()
    } catch (err: any) {
      error(err.message || 'Erreur lors du paiement.')
    } finally {
      setIsPaying(false)
    }
  }

  const handleOpenTicket = async () => {
    if (!summary) return
    const title = window.prompt("Sujet de votre demande ?")
    const description = window.prompt("Description du problème ?")
    
    if (!title || !description) return
    
    setIsTicketLoading(true)
    try {
      const { error: ticketError } = await supabase
        .from('tickets')
        .insert({
          user_id: summary.userId,
          title,
          description,
          status: 'open',
          priority: 'medium',
          category: 'Finance'
        })

      if (ticketError) throw ticketError
      success('Ticket ouvert avec succès ! Notre équipe vous répondra bientôt.')
    } catch (err: any) {
      error(err.message || "Erreur lors de l'ouverture du ticket.")
    } finally {
      setIsTicketLoading(false)
    }
  }

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true
    if (filter === 'success') return t.status === 'paid'
    return t.status === 'pending'
  })

  if (!summary) {
    return (
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-32 text-center animate-in fade-in">
        <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-white/5">
          <Wallet className="h-8 w-8 text-slate-500" />
        </div>
        <h2 className="text-2xl font-black text-white mb-3 tracking-tight">Aucun Dossier Financier</h2>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-400 max-w-md mx-auto mb-8">
          Votre profil financier n'a pas encore été initialisé pour cette année académique. Veuillez contacter le service comptabilité.
        </p>
        <button 
          disabled
          className="cursor-not-allowed opacity-50 px-6 py-3 rounded-xl bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2"
        >
          <HelpCircle className="w-4 h-4" />
          Contacter la Scolarité (Bientôt)
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 animate-in fade-in duration-300">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight mb-1">Gestion des Frais</h2>
          <p className="text-[11px] text-emerald-500/80 font-black uppercase tracking-[0.2em]">Consultez votre solde et gérez vos règlements académiques.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            disabled
            className="cursor-not-allowed opacity-50 px-5 py-2.5 rounded-lg bg-slate-900 border border-white/5 font-black text-slate-300 text-[10px] uppercase tracking-widest flex items-center gap-2"
          >
            <Download className="h-3.5 w-3.5" />
            Relevé (Bientôt)
          </button>
          <button 
            disabled={isPaying}
            onClick={handlePayment}
            className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-900/30 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            <Wallet className="h-3.5 w-3.5" />
            {isPaying ? 'Traitement...' : 'Payer maintenant'}
          </button>
        </div>
      </section>

      {/* Financial Overview Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FinancialBalanceCard summary={summary as any} />
        </div>
        <div>
          <FinancialStats summary={summary as any} />
        </div>
      </div>

      {/* Transactions Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-base font-black text-white tracking-tight">Historique des Transactions</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filter === 'all' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-400 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              Tous
            </button>
            <button 
              onClick={() => setFilter('success')} 
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filter === 'success' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-400 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              Réussis
            </button>
            <button 
              onClick={() => setFilter('pending')} 
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filter === 'pending' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-400 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              En cours
            </button>
          </div>
        </div>
        
        <TransactionTable transactions={filteredTransactions as any} />
      </section>

      {/* Secure Info & Support */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <SecurityInfoCard />
        </div>
        
        <div className="bg-emerald-600 p-6 rounded-xl text-white flex flex-col justify-between shadow-lg shadow-emerald-900/30 relative overflow-hidden group">
          <HelpCircle className="h-8 w-8 opacity-30 mb-6" />
          <div className="relative z-10">
            <h4 className="text-base font-black mb-2 tracking-tight">Besoin d'aide ?</h4>
            <p className="text-[10px] opacity-80 leading-relaxed font-bold mb-4">Contactez le service comptabilité.</p>
            <button 
              disabled={isTicketLoading}
              onClick={handleOpenTicket}
              className="text-[9px] font-black uppercase tracking-widest border-b border-white/40 hover:border-white transition-all pb-0.5 disabled:opacity-50"
            >
              {isTicketLoading ? 'Envoi...' : 'Ouvrir un ticket'}
            </button>
          </div>
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/5 rounded-full blur-2xl" />
        </div>
      </div>
    </div>
  )
}
