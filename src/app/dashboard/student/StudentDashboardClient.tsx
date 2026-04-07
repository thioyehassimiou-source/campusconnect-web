'use client'

import { useStudentDashboard } from '@/features/dashboard/hooks/useDashboardData'
import { StatsCard } from '@/components/ui/StatsCard'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import dynamic from 'next/dynamic'
import { 
  MapPin,
  Clock, 
  GraduationCap,
  QrCode,
  CreditCard,
  Bell,
  ArrowRight
} from 'lucide-react'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { staggerContainer, slideUp } from '@/lib/animations'

const AnnouncementFeed = dynamic(() => import('@/features/announcements/components/AnnouncementFeed').then(mod => mod.AnnouncementFeed), {
  loading: () => <div className="h-40 animate-pulse bg-surface-container/50 rounded-2xl" />
})

const HomeworkCard = dynamic(() => import('@/components/ui/HomeworkCard').then(mod => mod.HomeworkCard), {
  loading: () => <div className="h-20 animate-pulse bg-surface-container/50 rounded-xl" />
})

export default function StudentDashboardClient({ initialProfile }: { initialProfile: any }) {
  const { data, loading, error } = useStudentDashboard()

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

  const nextClass = data?.upcomingCourses?.[0] || null

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="max-w-[1400px] mx-auto pb-32 px-4 sm:px-0 relative"
    >
      {/* Welcome Section */}
      <motion.section variants={slideUp} className="mb-14 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 relative z-10">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white tracking-tighter font-headline uppercase leading-none">
            Bonjour, <span className="text-primary dark:text-blue-400">{(initialProfile?.nom || initialProfile?.full_name)?.split(' ')[0] || 'Étudiant'}</span> 👋
          </h1>
          <p className="text-sm text-slate-900 dark:text-slate-400 font-black uppercase tracking-[0.2em] flex items-center gap-6">
            <span className="w-12 h-[3px] bg-primary dark:bg-blue-500" />
            Espace Numérique Étudiant • Université de Labé
          </p>
        </div>
        <NextLink href="/dashboard/student/attendance" passHref legacyBehavior>
          <Button className="group gap-4 px-10 py-5 bg-primary text-white hover:-translate-y-1 active:scale-95 border-none shadow-lg shadow-primary/20 dark:shadow-none text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <QrCode className="w-6 h-6" />
            Émarger maintenant
          </Button>
        </NextLink>
      </motion.section>

      {/* Core Stats Bento */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative z-10">
          <StatsCard 
            title="Présence Globale" 
            value={`${Math.round(data?.attendancePercentage || 0)}%`} 
            icon={<Clock className="h-6 w-6" />}
            trend={{ value: 2, label: 'cette semaine', isPositive: true }}
          />
          <StatsCard 
            title="Situation Financière" 
            value={data?.paymentStatus?.isUpToDate ? 'En règle' : 'À régulariser'} 
            icon={<CreditCard className="h-6 w-6" />}
            addon={data?.paymentStatus && data.paymentStatus.remainingBalance > 0 ? `Reliquat: ${data.paymentStatus.remainingBalance}${data.paymentStatus.currency}` : 'Solde payé'}
          />
          <StatsCard 
            title="Notifications" 
            value={data?.unreadNotifications || 0} 
            icon={<Bell className="h-6 w-6" />}
            addon="Messages non lus"
          />
          <StatsCard 
            title="Moyenne Semestrielle" 
            value="--" 
            icon={<GraduationCap className="h-6 w-6" />}
            addon="Session S1 2025"
          />
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 relative z-10">
        <motion.div variants={staggerContainer} className="xl:col-span-8 space-y-12">
          {/* Highlighted Next Class */}
          <motion.section variants={slideUp}>
            <div className="flex items-center justify-between mb-8 px-2 pl-4">
              <div className="flex items-center gap-4">
                 <div className="w-3 h-3 rounded-full bg-primary dark:bg-blue-500 animate-pulse" />
                 <h3 className="text-base font-black uppercase tracking-[0.1em] text-slate-950 dark:text-slate-200">Prochain Cours</h3>
              </div>
              <NextLink href="/dashboard/student/schedule" className="text-sm font-bold text-primary dark:text-blue-400/80 dark:hover:text-blue-400 uppercase tracking-wider flex items-center gap-3 group transition-all">
                Planning complet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NextLink>
            </div>
            
            <Card className="p-0 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-md group rounded-2xl transition-all duration-500">
              <div className="flex flex-col md:flex-row items-stretch justify-between gap-0">
                {nextClass ? (
                  <>
                    <div className="flex-1 flex flex-col md:flex-row items-center gap-10 p-10 md:p-12">
                      <div className="w-28 h-28 bg-slate-900 text-white dark:bg-blue-500/10 rounded-3xl flex flex-col items-center justify-center dark:text-blue-400 border border-slate-900 dark:border-blue-500/20 shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-xl shadow-slate-900/10">
                        <span className="text-6xl font-black font-headline tracking-tighter leading-none">{new Date(nextClass.startTime).getDate().toString().padStart(2, '0')}</span>
                        <span className="text-xs font-black uppercase tracking-widest opacity-80 dark:opacity-40 mt-2">
                          {new Date(nextClass.startTime).toLocaleString('fr-FR', { month: 'short' })}
                        </span>
                      </div>
                      <div className="text-center md:text-left space-y-4">
                        <h4 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tighter font-headline uppercase leading-tight group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-500">{nextClass.title}</h4>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-6 gap-x-10 mt-4">
                          <p className="text-sm text-slate-900 dark:text-slate-300 font-black uppercase tracking-wide flex items-center gap-4">
                             <MapPin className="h-6 w-6 text-primary dark:text-slate-400" />
                             {nextClass.location}
                          </p>
                          <p className="text-sm text-slate-900 dark:text-slate-300 font-black uppercase tracking-wide flex items-center gap-4">
                             <GraduationCap className="h-6 w-6 text-primary dark:text-slate-400" />
                             {nextClass.instructorName}
                          </p>
                        </div>
                      </div>
                    </div>
                     <div className="bg-slate-50/50 dark:bg-white/[0.03] p-12 flex flex-col items-center justify-center border-l border-slate-100 dark:border-white/5 shrink-0 min-w-[280px] transition-all">
                        <p className="text-3xl font-black text-slate-950 dark:text-white bg-white dark:bg-white/5 py-5 px-12 rounded-2xl border border-slate-200 dark:border-white/10 uppercase tracking-tighter shadow-md transition-transform duration-500">
                         {new Date(nextClass.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-xs font-black text-slate-900 dark:text-slate-400 uppercase tracking-[0.2em] mt-8">Session Active</p>
                     </div>
                  </>
                ) : (
                  <div className="flex-1 text-center py-24 px-12">
                    <p className="text-sm text-slate-900 dark:text-slate-300 font-bold uppercase tracking-wider italic">Archive académique • Aucune session prévue</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.section>

          <motion.section variants={slideUp}>
            <div className="flex items-center justify-between mb-10 px-4">
              <h3 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">Annonces Institut</h3>
            </div>
            <AnnouncementFeed />
          </motion.section>
        </motion.div>

        <motion.div variants={staggerContainer} className="xl:col-span-4 space-y-12">
          <motion.section variants={slideUp}>
             <h3 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-10 px-2">Agenda & Échéances</h3>
             <Card className="p-10 lg:p-16 bg-white dark:bg-white/5 border-dashed border-slate-200 dark:border-white/10 rounded-xl flex flex-col items-center justify-center group hover:border-primary/20 dark:hover:border-white/20 transition-all duration-700 relative overflow-hidden shadow-sm dark:shadow-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/10 dark:via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-24 h-24 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-8 border border-slate-100 dark:border-white/5 group-hover:scale-105 transition-transform duration-500 shadow-inner">
                   <QrCode className="w-10 h-10 text-slate-900 dark:text-white/20 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors" />
                </div>
                <p className="text-sm text-slate-900 dark:text-slate-300 font-bold text-center uppercase tracking-wider leading-relaxed">
                  Votre agenda est parfaitement à jour
                </p>
             </Card>
          </motion.section>
        </motion.div>
      </div>
    </motion.div>
  )
}
