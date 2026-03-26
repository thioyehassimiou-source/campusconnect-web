import { requireRole } from '@/lib/auth'
import { StatsCard } from '@/components/ui/StatsCard'
import { TeacherCourseCard } from '@/components/ui/TeacherCourseCard'
import { QuickTask } from '@/components/ui/QuickTask'
import { createClient } from '@/lib/supabase/server'
import { 
  Users, 
  BookOpen, 
  AutoGraph, 
  Clock, 
  Download, 
  Plus,
  ArrowRight,
  GraduationCap,
  MessageSquare,
  FileText
} from 'lucide-react'

export default async function TeacherDashboard() {
  const { profile } = await requireRole(['teacher'])
  const supabase = await createClient()

  // Fetch real teacher courses from Supabase
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('teacher_id', profile.id)

  const activeCourses = courses?.map(c => ({
      id: c.id,
      code: c.code || 'COUR-001',
      title: c.title,
      schedule: c.schedule_summary || 'Horaire à définir',
      image: c.image_url || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
      progress: Math.floor(Math.random() * 80) + 10, // Simulated progress
      studentCount: 25, // Fallback
      color: 'blue'
  })) || []

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black font-headline text-primary tracking-tight">
            Bonjour, Dr. {profile?.full_name?.split(' ').pop() || 'Professeur'}
          </h2>
          <p className="text-on-surface-variant font-medium mt-1">Voici un aperçu de vos activités académiques pour aujourd'hui.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-surface-container-lowest text-primary font-bold rounded-xl border border-outline-variant/20 hover:bg-surface-container-high transition-all text-sm flex items-center gap-2 shadow-sm">
            <Download className="h-4 w-4" />
            Rapport mensuel
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all text-sm flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouveau cours
          </button>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard 
          title="Étudiants suivis" 
          value="148" 
          icon={<Users className="h-6 w-6 text-primary" />}
          trend={{ value: 12, label: 'mois', isPositive: true }}
        />
        <StatsCard 
          title="Cours actifs" 
          value={activeCourses.length.toString()} 
          icon={<BookOpen className="h-6 w-6 text-amber-700" />}
          addon="Stable"
        />
        <StatsCard 
          title="Moyenne de classe" 
          value="14.2" 
          icon={<GraduationCap className="h-6 w-6 text-purple-700" />}
          trend={{ value: 0.5, label: 'pts', isPositive: true }}
        />
        <StatsCard 
          title="Devoirs à corriger" 
          value="32" 
          icon={<Clock className="h-6 w-6 text-error" />}
          addon="Urgent"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-black font-headline text-primary tracking-tight">Cours actifs</h3>
            <button className="text-sm font-bold text-primary hover:underline transition-all">Voir tout le catalogue</button>
          </div>
          <div className="space-y-4">
            {activeCourses.length > 0 ? activeCourses.map((course) => (
              <TeacherCourseCard key={course.id} {...course} />
            )) : (
              <p className="text-center py-20 text-on-surface-variant font-bold opacity-30">Aucun cours actif pour le moment.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-black font-headline text-primary tracking-tight">Tâches rapides</h3>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
            <div className="space-y-8">
              <QuickTask 
                title="Saisir les notes"
                description="Finalisez les évaluations du semestre."
                icon={<GraduationCap className="h-5 w-5" />}
                theme="error"
                actionText="Commencer"
              />
              <QuickTask 
                title="Valider les syllabus"
                description="Mise à jour pour le semestre suivant."
                icon={<FileText className="h-5 w-5" />}
                theme="secondary"
                actionText="Revoir les documents"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
