'use client'

import { Megaphone, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { announcementService } from '../services/announcementService'

export function AnnouncementFeed() {
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await announcementService.getLatestAnnouncements()
        setAnnouncements(data)
      } catch (e) {
        console.error('Failed to load announcements')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return (
    <div className="bg-surface-container-low p-8 rounded-2xl h-full animate-pulse">
       <div className="h-4 w-1/3 bg-surface-variant rounded mb-6"></div>
       <div className="space-y-6">
          <div className="h-20 bg-surface-variant rounded"></div>
          <div className="h-20 bg-surface-variant rounded"></div>
       </div>
    </div>
  )

  return (
    <div className="bg-surface-container-low p-8 rounded-2xl h-full shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-2 mb-6 text-primary">
        <Megaphone className="h-5 w-5" />
        <h3 className="text-lg font-headline font-black tracking-tight">Dernières annonces</h3>
      </div>
      
      <div className="space-y-6">
        {announcements.length > 0 ? announcements.map((announcement) => (
          <div key={announcement.id} className="relative pl-4 border-l border-outline-variant/30 group hover:border-primary transition-colors">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 flex items-center gap-1">
              <Clock className="h-2 w-2" />
              {new Date(announcement.created_at).toLocaleDateString('fr-FR')}
            </p>
            <h5 className="text-sm font-bold text-on-surface leading-tight group-hover:text-primary transition-colors text-balance">
              {announcement.title}
            </h5>
            <p className="text-xs text-on-surface-variant mt-2 line-clamp-2 font-medium">
              {announcement.summary}
            </p>
          </div>
        )) : (
          <p className="text-xs font-bold text-on-surface-variant opacity-40 italic">Aucune annonce récente.</p>
        )}
      </div>

      <button className="w-full mt-8 py-3 bg-surface-container-highest text-on-surface-variant text-sm font-bold rounded-lg hover:bg-surface-variant transition-colors shadow-sm">
        Toutes les annonces
      </button>
    </div>
  )
}
