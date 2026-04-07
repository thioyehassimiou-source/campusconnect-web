'use client'

import { useTeacherDashboard } from '@/features/dashboard/hooks/useDashboardData'
import { StatsCard } from '@/components/ui/StatsCard'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { 
  Users, 
  BookOpen, 
  GraduationCap,
  Clock, 
  Plus,
  Download,
  ArrowRight
} from 'lucide-react'

const TeacherCourseCard = dynamic(() => import('@/components/ui/TeacherCourseCard').then(mod => mod.TeacherCourseCard), {
  loading: () => <div className="h-32 animate-pulse bg-surface-container/50 rounded-2xl" />
})

const QuickTask = dynamic(() => import('@/components/ui/QuickTask').then(mod => mod.QuickTask), {
  loading: () => <div className="h-24 animate-pulse bg-surface-container/50 rounded-xl" />
})

export default function TeacherDashboardClient({ initialProfile }: { initialProfile: any }) {
  const { data, loading, error } = useTeacherDashboard()

  if (loading && !data) {
    return <div className="flex items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
    </div>
  }

  if (error) {
     return (
       <div className="p-8 text-center">
         <p className="text-error font-semibold">Erreur lors de la récupération des données.</p>
         <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Réessayer</Button>
       </div>
     )
  }

  const activeCourses = data?.coursesStats.map(c => ({
      id: c.id,
      code: 'COUR', 
      title: c.title,
      schedule: 'Horaire défini',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
      progress: c.averageAttendance,
      studentCount: c.studentCount,
      color: 'blue'
  })) || []

  const totalStudents = data?.coursesStats.reduce((acc, curr) => acc + curr.studentCount, 0) || 0

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-32 px-4 sm:px-0 relative">

      {/* Header Section */}
      <div className="mb-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10 relative z-10">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter font-headline uppercase leading-tight">
            Bonjour, <span className="text-blue-900 dark:text-blue-300">Dr. {initialProfile?.full_name?.split(' ').pop() || 'Professeur'}</span> 🎓
          </h1>
          <p className="text-sm text-slate-950 dark:text-slate-300 font-bold uppercase tracking-wider flex items-center gap-6">
            <span className="w-8 h-[2px] bg-blue-900 dark:bg-blue-400" />
            Espace Gestion Académique • Université de Labé
          </p>
        </div>
        <div className="flex gap-4">
          <NextLink href="/dashboard/teacher/resources" passHref legacyBehavior>
            <Button variant="outline" className="gap-4 px-10 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white/80 hover:text-primary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300">
              <Download className="h-6 w-6" />
              Journal complet
            </Button>
          </NextLink>
          <NextLink href="/dashboard/teacher/courses" passHref legacyBehavior>
            <Button className="group gap-4 px-10 py-5 bg-primary text-white hover:-translate-y-1 active:scale-95 border-none shadow-lg shadow-primary/20 dark:shadow-none text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Plus className="h-6 w-6" />
              Nouveau cours
            </Button>
          </NextLink>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 relative z-10">
        <StatsCard 
          title="Étudiants Inscrits" 
          value={totalStudents.toString()} 
          icon={<Users className="h-6 w-6" />}
          trend={{ value: 4, label: 'ce mois', isPositive: true }}
        />
        <StatsCard 
          title="Cours d'Aujourd'hui" 
          value={activeCourses.length.toString()} 
          icon={<BookOpen className="h-6 w-6" />}
          addon="Sessions actives"
        />
        <StatsCard 
          title="Taux de Présence" 
          value="85%" 
          icon={<GraduationCap className="h-6 w-6" />}
          trend={{ value: 1.2, label: 'pts', isPositive: true }}
        />
        <StatsCard 
          title="Évaluations en Attente" 
          value="12" 
          icon={<Clock className="h-6 w-6" />}
          addon="À corriger"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="flex items-center justify-between mb-6 px-2 pl-4">
            <h3 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">Mes Cours</h3>
            <NextLink href="/dashboard/teacher/courses" className="text-sm font-bold text-primary dark:text-blue-400/80 hover:text-primary dark:hover:text-blue-400 uppercase tracking-wider flex items-center gap-3 group transition-all">
                Gérer le catalogue
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </NextLink>
          </div>
          <div className="space-y-8">
            {activeCourses.length > 0 ? activeCourses.map((course) => (
              <TeacherCourseCard key={course.id} {...course} />
            )) : (
              <Card className="py-24 flex flex-col items-center justify-center border-dashed border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 rounded-xl hover:border-primary/20 transition-all duration-500 shadow-sm dark:shadow-none">
                <p className="text-sm text-slate-900 dark:text-slate-400 font-bold uppercase tracking-wider italic text-center">Aucun cours assigné • Session S1</p>
              </Card>
            )}
          </div>
        </div>

        <div className="space-y-10">
          <div className="flex items-center justify-between mb-6 px-2 pl-4">
            <h3 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-10 px-2">Dernières Activités</h3>
          </div>
          <Card className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-10 py-10 rounded-xl shadow-sm dark:shadow-none transition-all">
            <div className="space-y-6">
              {data?.recentAttendance.map(session => (
                <div key={session.sessionId} className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-6 last:border-0 last:pb-0 group">
                  <div className="space-y-2">
                    <p className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight group-hover:text-primary dark:group-hover:text-blue-400 transition-colors uppercase font-headline">{session.courseTitle}</p>
                    <p className="text-sm text-slate-900 dark:text-slate-300 font-bold uppercase tracking-wider">
                      {new Date(session.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-[900] text-2xl text-primary dark:text-blue-400 tracking-tighter leading-none">{session.presentCount}/{session.totalCount}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-400 uppercase tracking-wider mt-2 shrink-0">Présents</p>
                  </div>
                </div>
              ))}
              {(!data?.recentAttendance || data.recentAttendance.length === 0) && (
                <p className="text-center text-sm text-slate-900 dark:text-slate-400 py-12 italic font-bold uppercase tracking-wider leading-relaxed">Historique vide</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
