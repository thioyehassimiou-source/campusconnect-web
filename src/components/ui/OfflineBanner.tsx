'use client'

import { useEffect, useState } from 'react'
import { WifiOff, Wifi } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true)
  const [wasOffline, setWasOffline] = useState(false)
  const [showReconnected, setShowReconnected] = useState(false)

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine)

    const handleOffline = () => {
      setIsOnline(false)
      setWasOffline(true)
    }

    const handleOnline = () => {
      setIsOnline(true)
      if (wasOffline) {
        setShowReconnected(true)
        setTimeout(() => setShowReconnected(false), 3000)
      }
    }

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [wasOffline])

  return (
    <AnimatePresence>
      {/* Offline banner */}
      {!isOnline && (
        <motion.div
          key="offline"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[999] bg-slate-900 dark:bg-slate-950 text-white px-4 py-3 flex items-center justify-center gap-3 shadow-xl"
        >
          <WifiOff className="w-4 h-4 text-rose-400 shrink-0" />
          <p className="text-xs font-black uppercase tracking-wider">
            Hors connexion — Affichage des données en cache
          </p>
        </motion.div>
      )}

      {/* Reconnected toast */}
      {showReconnected && (
        <motion.div
          key="reconnected"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[999] bg-emerald-600 text-white px-4 py-3 flex items-center justify-center gap-3 shadow-xl"
        >
          <Wifi className="w-4 h-4 shrink-0" />
          <p className="text-xs font-black uppercase tracking-wider">
            Connexion rétablie — Actualisation des données...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
