'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { useAttendance } from '../hooks/useAttendance'
import { Camera, CheckCircle2, AlertCircle, Loader2, XCircle, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn, slideUp, buttonClickProps } from '@/lib/animations'

export default function QRScanner() {
  const { markStudentAttendance, isLoading, error, success, resetStatus, setError } = useAttendance()
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    // Only initialize scanner on the client side
    if (typeof window !== 'undefined' && !isInitialized.current && !success && !error) {
      // Use a small delay to ensure the DOM element is ready
      const timer = setTimeout(() => {
        const scanner = new Html5QrcodeScanner(
          "reader",
          { 
            fps: 20, 
            qrbox: { width: 250, height: 250 },
            formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ],
            aspectRatio: 1.0
          },
          /* verbose= */ false
        )

        scanner.render(async (decodedText) => {
          try {
            const payload = JSON.parse(decodedText)
            
            // Validate structure before sending
            if (!payload.session_id || !payload.signature || !payload.expires_at) {
              throw new Error('Format de QR Code invalide (Champs manquants).')
            }
            
            // Stop scanner to prevent multiple scans
            if (scannerRef.current) {
              await scannerRef.current.clear()
              isInitialized.current = false
            }
            
            // Mark attendance
            await markStudentAttendance(payload)
            
          } catch (err: any) {
            setError(err.message || 'Échec du parsing du QR code.')
            import('@/lib/logger').then(({ logger }) => {
              logger.trackFailure('QR_SCAN_ERROR', err, { decodedText })
            })
          }
        }, (errorMessage) => {
          // Scanner is working, just didn't find a QR code in this frame
        })

        scannerRef.current = scanner
        isInitialized.current = true
      }, 100)

      return () => clearTimeout(timer)
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error)
        isInitialized.current = false
      }
    }
  }, [markStudentAttendance, success, error, setError])

  const handleReset = () => {
    resetStatus()
    // Explicitly reset the initialization ref to allow scanner to restart
    isInitialized.current = false
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 min-h-[480px] rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md mx-auto overflow-hidden"
    >
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
          SCAN D'ÉMARGEMENT
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          Positionnez le code dans le cadre
        </p>
      </div>

      <div className="relative w-full aspect-square bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-100 dark:border-slate-800">
        {!success && !error && !isLoading && (
          <div id="reader" className="w-full h-full [&>div]:!border-none [&_video]:object-cover"></div>
        )}

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div 
              key="loading"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-xl z-20"
            >
              <div className="relative">
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                   <div className="w-12 h-12 bg-blue-500/20 rounded-full" />
                </motion.div>
              </div>
              <p className="mt-6 text-white font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">Validation...</p>
            </motion.div>
          )}

          {success && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-500 z-30"
            >
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-5 bg-white rounded-full mb-8 shadow-2xl"
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-500" />
              </motion.div>
              <motion.h4 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white text-3xl font-black mb-2 tracking-tighter"
              >
                PRÉSENT !
              </motion.h4>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.4 }}
                className="text-emerald-50 text-center px-10 mb-10 text-sm font-bold"
              >
                Votre présence a été enregistrée avec succès.
              </motion.p>
              <motion.button
                {...buttonClickProps}
                onClick={handleReset}
                className="px-10 py-5 bg-white text-emerald-600 font-black rounded-2xl shadow-2xl transition-all hover:bg-slate-50 uppercase text-xs tracking-widest"
              >
                C'est noté
              </motion.button>
            </motion.div>
          )}

          {error && (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-rose-600 z-30"
            >
              <motion.div 
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="p-5 bg-white/20 rounded-full mb-8 backdrop-blur-md"
              >
                 <XCircle className="w-16 h-16 text-white" />
              </motion.div>
              <h4 className="text-white text-2xl font-black mb-3 tracking-tighter">ERREUR</h4>
              <p className="text-rose-50 text-center px-12 mb-10 text-sm font-bold leading-relaxed">{error}</p>
              <motion.button
                {...buttonClickProps}
                onClick={handleReset}
                className="px-10 py-5 bg-white text-rose-600 font-black rounded-2xl shadow-2xl transition-all hover:bg-slate-50 uppercase text-xs tracking-widest"
              >
                Réessayer
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
        <ShieldCheck className="w-5 h-5 text-indigo-500" />
        <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          SÉCURISÉ • CERTIFIÉ CAMPUSCONNECT
        </span>
      </div>
    </motion.div>
  )
}
