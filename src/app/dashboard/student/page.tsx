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
  const { profile, supabase } = await requireRole(['student'])

  // Fetch all data in parallel (4x faster than sequential awaits)
  const [
    { data: courses },
    { data: gradesData },
    { data: assignments },
    { data: schedule }
  ] = await Promise.all([
    supabase.from('courses').select('credits').eq('id', profile?.department_id),
    supabase.from('grades').select('grade').eq('student_id', profile?.id),
    supabase
      .from('assignments')
      .select('*')
      .eq('student_id', profile?.id)
      .order('deadline', { ascending: true })
      .limit(3),
    supabase
      .from('schedule')
      .select('*, courses(*, profiles!instructor_id(*))')
      .eq('profile_id', profile?.id)
      .gte('end_time', new Date().toISOString())
      .order('start_time', { ascending: true })
      .limit(1)
      .maybeSingle() // Use maybeSingle instead of single to avoid 406 on empty results
  ])

  // Derived stats
  const totalCredits = courses?.reduce((acc, curr) => acc + ((curr as any).credits || 0), 0) || 0
  const gpa = gradesData && (gradesData as any[]).length > 0
    ? ((gradesData as any[]).reduce((acc, curr) => acc + (curr.grade || 0), 0) / (gradesData as any[]).length).toFixed(2)
    : '--'

  const nextClass = schedule ? {
    title: schedule.courses?.title,
    location: schedule.location || schedule.courses?.location,
    instructor: schedule.courses?.profiles?.full_name,
    startTime: new Date(schedule.start_time),
    endTime: new Date(schedule.end_time)
  } : null

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
                {nextClass ? (
                  <>
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-primary/10 rounded-[1.8rem] flex flex-col items-center justify-center text-primary border border-primary/20">
                        <span className="text-xl font-black">{nextClass.startTime.getDate().toString().padStart(2, '0')}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                          {nextClass.startTime.toLocaleString('fr-FR', { month: 'short' })}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-on-surface tracking-tight mb-1">{nextClass.title}</h4>
                        <p className="text-on-surface-variant font-bold flex items-center gap-2">
                           <MapPin className="h-4 w-4 text-primary" />
                           {nextClass.location} — {nextClass.instructor}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <span className="px-6 py-2 bg-primary text-white rounded-2xl text-xs font-black tracking-widest shadow-lg shadow-primary/30 uppercase">
                        {new Date() >= nextClass.startTime && new Date() <= nextClass.endTime ? 'En direct' : 'À venir'}
                       </span>
                       <p className="text-xs font-bold text-on-surface-variant/40">
                        {nextClass.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} — 
                        {nextClass.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </p>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 text-center py-4">
                    <p className="text-on-surface-variant font-bold">Aucun cours prévu prochainement.</p>
                  </div>
                )}
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
                <Link href="/dashboard/student/grades" className="bg-white p-6 rounded-3xl border border-outline-variant/10 flex flex-col items-center text-center shadow-sm hover:bg-primary/5 transition-colors group">
                   <GraduationCap className="h-6 w-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                   <p className="text-2xl font-black tracking-tighter">{gpa}</p>
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Moyenne</p>
                </Link>
                 <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 flex flex-col items-center text-center shadow-sm">
                    <BookOpen className="h-6 w-6 text-amber-600 mb-3" />
                    <p className="text-2xl font-black tracking-tighter">{totalCredits}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">ECTS Total</p>
                 </div>
             </div>
          </div>

          {/* Pending Tasks */}
          <section>
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-on-surface-variant/50 mb-6 px-4">Échéances</h3>
             <div className="space-y-4">
                {assignments && assignments.length > 0 ? (
                  assignments.map((assignment) => (
                    <HomeworkCard 
                      key={assignment.id}
                      title={assignment.title} 
                      deadline={new Date(assignment.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} 
                      type={assignment.type as 'report' | 'code'} 
                    />
                  ))
                ) : (
                  <p className="px-4 text-sm text-on-surface-variant/60 italic font-medium">Aucune échéance à venir.</p>
                )}
             </div>
          </section>

        </div>

      </div>
    </div>
  )
}
