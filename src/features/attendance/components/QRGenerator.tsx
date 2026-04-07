'use client'

import React, { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { RefreshCw, Clock, CheckCircle, Loader2, AlertTriangle } from 'lucide-react'
import { useAttendance } from '../hooks/useAttendance'

interface QRGeneratorProps {
  courseId: string
  courseName?: string
}

export default function QRGenerator({ courseId, courseName }: QRGeneratorProps) {
  const { generateSession, session, isLoading, error } = useAttendance()
  const [timeLeft, setTimeLeft] = useState<number>(0)

  // Initialize session on mount
  useEffect(() => {
    generateSession(courseId)
  }, [courseId])

  // Handle countdown timer based on session expiration
  useEffect(() => {
    if (!session?.expires_at) return

    const calculateTimeLeft = () => {
      const expires = new Date(session.expires_at).getTime()
      const now = new Date().getTime()
      const diff = Math.max(0, Math.floor((expires - now) / 1000))
      setTimeLeft(diff)
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [session])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // QR Data as requested: { session_id, signature, expires_at }
  const qrData = session ? JSON.stringify({
    session_id: session.id,
    signature: session.signature,
    expires_at: session.expires_at
  }) : ''

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto transform transition-all">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          {courseName || 'Session d\'Émargement'}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
          Scannez pour valider votre présence.
        </p>
      </div>

      <div className="relative p-6 bg-white rounded-3xl shadow-inner border-2 border-slate-100 dark:border-slate-800 mb-8 flex items-center justify-center min-h-[280px] min-w-[280px]">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-slate-400 text-xs font-bold animate-pulse uppercase tracking-widest">Génération...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center text-center gap-3">
            <AlertTriangle className="w-12 h-12 text-red-500" />
            <p className="text-red-500 text-sm font-bold">{error}</p>
          </div>
        ) : timeLeft > 0 ? (
          <div className="p-2 bg-white">
            <QRCodeSVG value={qrData} size={240} level="H" includeMargin={false} />
          </div>
        ) : (
          <div className="w-[240px] h-[240px] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700">
            <Clock className="w-12 h-12 text-red-500 mb-4 animate-pulse" />
            <p className="text-red-500 font-bold text-sm uppercase tracking-tighter">QR Code Expiré</p>
          </div>
        )}
      </div>

      <div className="w-full space-y-4">
        <div className="flex items-center justify-between px-5 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Clock className={`w-5 h-5 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-blue-500'}`} />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Expire dans</span>
          </div>
          <span className={`text-xl font-mono font-black ${timeLeft < 60 ? 'text-red-500' : 'text-blue-600'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>

        <button
          onClick={() => generateSession(courseId)}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm tracking-widest"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          Nouvelle Session
        </button>
      </div>

      <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
        <CheckCircle className="w-3.5 h-3.5" />
        Sécurité CampusConnect Active
      </div>
    </div>
  )
}
