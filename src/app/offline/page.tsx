'use client'

import Link from 'next/link'
import { WifiOff, RefreshCw, BookOpen, Calendar } from 'lucide-react'

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Animated offline icon */}
        <div className="relative mx-auto w-28 h-28 mb-10">
          <div className="absolute inset-0 rounded-full bg-slate-100 dark:bg-white/5 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <WifiOff className="w-12 h-12 text-slate-400 dark:text-slate-600" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-slate-950 dark:text-white uppercase tracking-tighter mb-3 leading-none">
          Connexion perdue
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10 max-w-xs mx-auto">
          Vous êtes hors ligne. Certaines fonctionnalités restent accessibles grâce au cache de l'application.
        </p>

        {/* Available offline features */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <Link
            href="/dashboard/student/schedule"
            className="group flex flex-col items-center gap-3 p-6 bg-slate-50 dark:bg-white/[0.03] rounded-2xl border border-slate-100 dark:border-white/5 hover:border-primary/20 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary dark:text-blue-400" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">Emploi du temps</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">Disponible hors-ligne</span>
          </Link>

          <Link
            href="/dashboard/student"
            className="group flex flex-col items-center gap-3 p-6 bg-slate-50 dark:bg-white/[0.03] rounded-2xl border border-slate-100 dark:border-white/5 hover:border-primary/20 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary dark:text-blue-400" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">Dashboard</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">Données en cache</span>
          </Link>
        </div>

        {/* Retry button */}
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-black text-xs uppercase tracking-[0.15em] rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Réessayer la connexion
        </button>

        <p className="mt-10 text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest">
          CampusConnect • Mode Hors-Ligne
        </p>
      </div>
    </main>
  )
}
