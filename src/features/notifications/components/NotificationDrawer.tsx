'use client'

import { AppNotification } from '../types'
import { Bell, Mail, BookOpen, GraduationCap, Info, X } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { motion, AnimatePresence } from 'framer-motion'
import { slideUp, staggerContainer, fadeIn } from '@/lib/animations'

const iconMap = {
  message: Mail,
  announcement: BookOpen,
  grade: GraduationCap,
  info: Info
}

export function NotificationDrawer({ 
  notifications, 
  onClose,
  onMarkRead 
}: { 
  notifications: AppNotification[], 
  onClose: () => void,
  onMarkRead: (id: string) => void
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className="absolute top-full right-0 mt-4 w-[400px] bg-white rounded-[2rem] border border-outline-variant/10 shadow-premium-lg z-50 overflow-hidden"
    >
      <div className="p-6 border-b border-outline-variant/5 flex items-center justify-between bg-surface-container-low/30">
        <div>
          <h3 className="text-sm font-black text-primary tracking-tight">Notifications</h3>
          <p className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest mt-0.5">Vos dernières alertes</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all">
          <X className="h-4 w-4 text-on-surface-variant/40" />
        </button>
      </div>

      <div className="max-h-[480px] overflow-y-auto custom-scrollbar">
        {notifications.length > 0 ? (
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="divide-y divide-outline-variant/5"
          >
            {notifications.map((n) => {
              const Icon = iconMap[n.type] || Info
              return (
                <motion.div 
                  key={n.id} 
                  variants={slideUp}
                  className={`p-6 hover:bg-primary/[0.02] transition-colors group relative cursor-pointer ${!n.is_read ? 'bg-primary/[0.01]' : ''}`}
                  onClick={() => onMarkRead(n.id)}
                >
                  {!n.is_read && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
                  )}
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                      n.type === 'message' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                      n.type === 'grade' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                      'bg-primary/5 border-primary/10 text-primary'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-on-surface mb-1 truncate">{n.title}</p>
                      <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed line-clamp-2 opacity-70">{n.content}</p>
                      <p className="text-[9px] font-black text-on-surface-variant/30 uppercase tracking-widest mt-3">
                        {formatDistanceToNow(new Date(n.created_at), { addSuffix: true, locale: fr })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-20 text-center"
          >
            <div className="w-16 h-16 bg-primary/5 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6">
              <Bell className="h-8 w-8 text-primary/20" />
            </div>
            <p className="text-xs font-black text-primary/40 uppercase tracking-widest">Aucune notification</p>
          </motion.div>
        )}
      </div>

      <div className="p-4 bg-surface-container-low/30 border-t border-outline-variant/5 text-center">
        <button className="text-[9px] font-black text-primary uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
          Tout marquer comme lu
        </button>
      </div>
    </motion.div>
  )
}
