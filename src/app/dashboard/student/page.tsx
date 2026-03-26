import { requireRole } from '@/lib/auth'
import { StatsCard } from '@/components/ui/StatsCard'
import { CourseCard } from '@/components/ui/CourseCard'
import { HomeworkCard } from '@/components/ui/HomeworkCard'
import { AnnouncementFeed } from '@/features/announcements/components/AnnouncementFeed'
import Link from 'next/link'
import { 
  BookOpen, 
  MapPin,
  Clock, 
  Star, 
  MessageSquare,
  GraduationCap
} from 'lucide-react'

export default async function StudentDashboard() {
  const { profile } = await requireRole(['student'])

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Welcome Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-black text-primary tracking-tighter mb-2 font-headline">
          Bonjour, {profile?.full_name?.split(' ')[0] || 'Étudiant'} 👋
        </h1>
        <p className="text-on-surface-variant font-medium text-lg opacity-80">Ravi de vous revoir. Voici vos priorités pour aujourd'hui.</p>
      </section>

      {/* Focused Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Primary Content: Timeline & Action */}
        <div className="xl:col-span-8 space-y-12">
          
          {/* Highlighted Next Class */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-on-surface-variant/50">Prochain Cours</h3>
              <Link href="/dashboard/student/schedule" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Voir tout le planning</Link>
            </div>
            <div className="bg-primary p-1 rounded-[3rem] shadow-2xl shadow-primary/20 group">
              <div className="bg-white p-8 rounded-[2.8rem] flex flex-col md:flex-row items-center justify-between gap-8 transition-all group-hover:bg-primary/5">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-[1.8rem] flex flex-col items-center justify-center text-primary border border-primary/20">
                    <span className="text-xl font-black">09</span>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Sept</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-on-surface tracking-tight mb-1">Algorithmique en langage C</h4>
                    <p className="text-on-surface-variant font-bold flex items-center gap-2">
                       <MapPin className="h-4 w-4 text-primary" />
                       Bâtiment Informatique — Dr. Sow
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <span className="px-6 py-2 bg-primary text-white rounded-2xl text-xs font-black tracking-widest shadow-lg shadow-primary/30">EN DIRECT</span>
                   <p className="text-xs font-bold text-on-surface-variant/40">09:00 — 10:30</p>
                </div>
              </div>
            </div>
          </section>

          {/* Core Support: Announcements */}
          <section>
            <AnnouncementFeed />
          </section>

        </div>

        {/* Secondary Content: Stats & Shortcuts */}
        <div className="xl:col-span-4 space-y-10">
          
          <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/5 shadow-inner">
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40 mb-6 text-center">Aperçu Académique</h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 flex flex-col items-center text-center shadow-sm">
                   <GraduationCap className="h-6 w-6 text-primary mb-3" />
                   <p className="text-2xl font-black tracking-tighter">14.5</p>
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Moyenne</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 flex flex-col items-center text-center shadow-sm">
                   <BookOpen className="h-6 w-6 text-amber-600 mb-3" />
                   <p className="text-2xl font-black tracking-tighter">12</p>
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-40">ECTS</p>
                </div>
             </div>
          </div>

          {/* Pending Tasks */}
          <section>
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-on-surface-variant/50 mb-6 px-4">Échéances</h3>
             <div className="space-y-4">
                <HomeworkCard 
                  title="Algorithmique - TP1" 
                  deadline="Demain, 23:59" 
                  type="code" 
                />
                <HomeworkCard 
                  title="Sociologie - Fiche de lecture" 
                  deadline="25 Octobre" 
                  type="report" 
                />
             </div>
          </section>

        </div>

      </div>
    </div>
  )
}
