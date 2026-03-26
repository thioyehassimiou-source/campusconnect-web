'use client'

import { CheckCheck, HelpCircle } from 'lucide-react'
import { NotificationStatsCard } from '@/features/notifications/components/NotificationStatsCard'
import { NotificationFilters } from '@/features/notifications/components/NotificationFilters'
import { NotificationItem } from '@/features/notifications/components/NotificationItem'

interface NotificationsClientPageProps {
  initialNotifications: any[]
}

export default function NotificationsPage({ initialNotifications }: NotificationsClientPageProps) {
  const notifications = initialNotifications.map(n => ({
        id: n.id,
        title: n.title,
        content: n.content,
        timestamp: new Date(n.created_at).toLocaleTimeString(),
        status: n.is_read ? 'read' : 'unread',
        type: n.type || 'info',
        dateGroup: new Date(n.created_at).toDateString() === new Date().toDateString() ? "Aujourd'hui" : "Plus ancien"
      }))

  const unreadCount = notifications.filter((n: any) => n.status === 'unread').length
  
  const todayNotifs = notifications.filter((n: any) => n.dateGroup === "Aujourd'hui")
  const olderNotifs = notifications.filter((n: any) => n.dateGroup !== "Aujourd'hui")

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 animate-in fade-in slide-in-from-top-6 duration-700">
        <div>
          <h2 className="text-4xl font-black text-primary tracking-tighter font-headline leading-tight">
            Centre de Notifications
          </h2>
          <p className="text-on-surface-variant text-lg font-medium opacity-70 mt-2">
            Gérez vos alertes académiques et les mises à jour de CampusConnect.
          </p>
        </div>
        <button className="flex items-center gap-3 px-6 py-3 bg-surface-container-low text-primary text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-secondary-container transition-all active:scale-95 shadow-sm">
          <CheckCheck className="h-4 w-4" />
          Tout marquer comme lu
        </button>
      </div>

      {/* Bento Meta Layer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        <div className="md:col-span-8">
          <NotificationFilters />
        </div>
        <div className="md:col-span-4">
          <NotificationStatsCard count={unreadCount} />
        </div>
      </div>

      {/* Chronological Stream */}
      <div className="space-y-12">
        {/* Today */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] px-4">
            Aujourd'hui
          </h3>
          <div className="space-y-4">
            {todayNotifs.length > 0 ? todayNotifs.map((n: any) => (
              <NotificationItem key={n.id} notification={n} />
            )) : (
              <p className="text-center py-10 text-on-surface-variant/40 text-xs font-black uppercase tracking-widest">Aucune notification aujourd'hui</p>
            )}
          </div>
        </div>

        {/* Older */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] px-4 pt-6">
            Plus ancien
          </h3>
          <div className="space-y-4">
            {olderNotifs.map((n: any) => (
              <NotificationItem key={n.id} notification={n} />
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="pt-12 flex justify-center animate-in fade-in duration-1000">
          <button className="px-10 py-4 border-2 border-outline-variant/10 text-on-surface-variant text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-surface-container-low transition-all hover:border-primary/20 active:scale-95">
            Charger les notifications plus anciennes
          </button>
        </div>
      </div>

      {/* Floating Action Hint */}
      <div className="fixed bottom-10 right-10 z-50">
        <button className="w-16 h-16 bg-white shadow-2xl shadow-black/10 rounded-full flex items-center justify-center text-primary hover:scale-110 transition-all active:scale-95 border border-outline-variant/10 group">
          <HelpCircle className="h-7 w-7 transition-colors group-hover:text-primary-container" />
          <span className="absolute right-full mr-4 px-4 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Support Technique
          </span>
        </button>
      </div>
    </div>
  )
}
