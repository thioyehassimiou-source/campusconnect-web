'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="w-full h-[calc(100vh-140px)] flex items-center justify-center p-10">
      <div className="max-w-xl w-full bg-white rounded-[3.5rem] p-16 shadow-2xl shadow-error/5 border border-error/10 text-center animate-in zoom-in-95 duration-700">
        <div className="w-24 h-24 bg-error/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10">
          <AlertTriangle className="h-12 w-12 text-error" />
        </div>
        
        <h2 className="text-4xl font-black font-headline text-on-surface tracking-tighter mb-6">Oups ! Quelque chose a mal tourné.</h2>
        <p className="text-on-surface-variant text-lg font-medium opacity-70 mb-12">
          Une erreur inattendue est survenue lors du chargement de cette page. Notre équipe technique a été alertée.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => reset()}
            className="flex-1 flex items-center justify-center gap-4 bg-primary text-white px-8 py-5 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
          >
            <RefreshCcw className="h-5 w-5" />
            Réessayer
          </button>
          <Link
            href="/dashboard"
            className="flex-1 flex items-center justify-center gap-4 bg-surface-container-low text-primary px-8 py-5 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.2em] hover:bg-white border-2 border-outline-variant/10 transition-all active:scale-95"
          >
            <Home className="h-5 w-5" />
            Tableau de bord
          </Link>
        </div>
      </div>
    </div>
  )
}
