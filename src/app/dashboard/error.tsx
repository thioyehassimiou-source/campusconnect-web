'use client'

import { useEffect } from 'react'
import { AlertTriangle, Home } from 'lucide-react'
import Link from 'next/link'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error('Dashboard Error Boundary caught an error:', error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="w-20 h-20 bg-red-500/10 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-red-500/20">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>
      <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Oups, une erreur est survenue</h2>
      <p className="text-sm font-medium text-slate-400 max-w-md mx-auto mb-10 leading-relaxed">
        Nous avons rencontré un problème inattendu lors du chargement de cette section. L'équipe technique a été notifiée.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-900/30 transition-all"
        >
          Réessayer
        </button>
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-xl bg-slate-900 text-slate-300 hover:text-white text-[10px] font-black uppercase tracking-widest border border-white/5 hover:bg-slate-800 transition-all flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
