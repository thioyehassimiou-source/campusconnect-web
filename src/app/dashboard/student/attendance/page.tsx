'use client'

import React from 'react'
import QRScanner from '@/features/attendance/components/QRScanner'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function StudentAttendancePage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6 animate-in fade-in duration-300">
      <div className="mb-6">
        <Link 
          href="/dashboard/student" 
          className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour
        </Link>
        <h1 className="text-xl font-black text-white tracking-tight mt-3">
          Émargement numérique
        </h1>
        <p className="text-[11px] text-emerald-500/80 font-black uppercase tracking-[0.2em] mt-1">
          Scannez le QR de votre professeur
        </p>
      </div>

      <div className="flex flex-col items-center">
        <QRScanner />
        
        <details className="mt-8 max-w-sm w-full bg-slate-900/30 p-4 rounded-xl border border-white/5">
          <summary className="text-[11px] font-black text-slate-900 dark:text-slate-400 uppercase tracking-widest cursor-pointer select-none">Instructions</summary>
          <ul className="space-y-2 mt-3 text-[11px] font-bold text-slate-900 dark:text-slate-400">
            <li className="flex gap-2">
              <span className="w-4 h-4 bg-emerald-500/10 text-emerald-400 rounded flex items-center justify-center text-[8px] font-black shrink-0">1</span>
              Autorisez l'accès à votre caméra.
            </li>
            <li className="flex gap-2">
              <span className="w-4 h-4 bg-emerald-500/10 text-emerald-400 rounded flex items-center justify-center text-[8px] font-black shrink-0">2</span>
              Cadrez le code QR dans la zone de scan.
            </li>
            <li className="flex gap-2">
              <span className="w-4 h-4 bg-emerald-500/10 text-emerald-400 rounded flex items-center justify-center text-[8px] font-black shrink-0">3</span>
              Attendez le message de confirmation.
            </li>
          </ul>
        </details>
      </div>
    </div>
  )
}
