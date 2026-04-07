import { requireRole } from '@/lib/auth'
import { announcementService } from '@/features/announcements/services/announcementService'
import { createClient } from '@/lib/supabase/server'
import { Megaphone, Calendar, User, ArrowRight } from 'lucide-react'

export default async function NewsPage() {
  const { profile } = await requireRole(['student', 'teacher', 'admin'])
  const supabase = await createClient()
  const announcements = await announcementService.getLatestAnnouncements(supabase, 10)

  return (
    <div className="max-w-[1000px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-primary tracking-tighter mb-2 font-headline">Actualités du Campus</h1>
        <p className="text-on-surface-variant font-medium text-lg opacity-80">Restez informé des derniers événements et annonces officielles.</p>
      </header>

      <div className="space-y-8">
        {announcements.map((announcement) => (
          <article 
            key={announcement.id} 
            className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/5 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-4">
                  <span className="px-4 py-1.5 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                    Officiel
                  </span>
                  <div className="flex items-center gap-2 text-on-surface-variant font-bold text-[10px] uppercase tracking-widest opacity-60">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(announcement.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
                
                <h2 className="text-2xl font-black text-on-surface mb-4 group-hover:text-primary transition-colors tracking-tight">
                  {announcement.title}
                </h2>
                
                <p className="text-on-surface-variant leading-relaxed mb-6 font-medium line-clamp-3">
                  {announcement.content}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-outline-variant/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
                       <User className="h-4 w-4 text-on-surface-variant" />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant">
                      {(announcement.profiles as any)?.full_name || 'Administration'}
                    </span>
                  </div>
                  
                  <button className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest group/btn">
                    Lire la suite
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}

        {announcements.length === 0 && (
          <div className="py-20 text-center bg-surface-container-low rounded-[3rem] border border-dashed border-outline-variant/20">
            <Megaphone className="h-12 w-12 text-on-surface-variant/20 mx-auto mb-4" />
            <p className="text-on-surface-variant font-black uppercase tracking-widest text-sm">Aucune actualité pour le moment</p>
          </div>
        )}
      </div>
    </div>
  )
}
