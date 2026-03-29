import { requireRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { FileText, CheckCircle, Clock, BookOpen, ExternalLink, CalendarDays } from 'lucide-react'

// Dynamic Server Component Fetching
async function getStudentAssignments() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('assignments')
    .select(`
      id,
      title,
      deadline,
      type,
      status,
      created_at,
      course:courses!inner(title, code)
    `)
    .eq('student_id', user.id)
    .order('deadline', { ascending: true })

  if (error) {
    console.warn('Error fetching assignments:', error)
    return []
  }

  return data || []
}

export default async function AssignmentsPage() {
  await requireRole(['student'])
  const assignments = await getStudentAssignments()

  const pending = assignments.filter((a: any) => a.status === 'pending')
  const completed = assignments.filter((a: any) => a.status === 'submitted' || a.status === 'graded')

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-gradient-to-br from-primary/5 to-secondary-container/10 p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl lg:text-5xl font-black font-headline text-on-surface tracking-tighter mb-4">
            Mes Devoirs
          </h1>
          <p className="text-on-surface-variant max-w-xl text-lg font-medium leading-relaxed">
            Gérez vos rendus, vos rapports de stage et vos projets de code en un seul endroit. Ne manquez aucune deadline.
          </p>
        </div>
        <div className="flex items-center gap-4 relative z-10 shrink-0">
          <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-outline-variant/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-3xl font-black text-on-surface tracking-tighter leading-none">{pending.length}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mt-1">À Rendre</p>
            </div>
          </div>
          <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-outline-variant/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-black text-on-surface tracking-tighter leading-none">{completed.length}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mt-1">Complétés</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content: Pending Assignments */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black font-headline tracking-tighter text-on-surface">Tâches Prioritaires</h2>
            <div className="h-px flex-1 bg-outline-variant/20 ml-4"></div>
          </div>

          {pending.length === 0 ? (
            <div className="bg-surface-container-low/30 rounded-[2.5rem] border border-dashed border-outline-variant/20 p-16 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface mb-2">Tout est à jour !</h3>
              <p className="text-on-surface-variant/70 max-w-sm">
                Vous n'avez aucun devoir en attente pour le moment. Profitez de ce temps pour réviser ou avancer sur vos projets.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pending.map((assignment: any) => {
                const deadlineDate = new Date(assignment.deadline)
                const isOverdue = deadlineDate < new Date()
                
                return (
                  <div key={assignment.id} className="group bg-white rounded-[2rem] p-6 border border-outline-variant/10 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center ${assignment.type === 'code' ? 'bg-blue-500/10 text-blue-600' : 'bg-purple-500/10 text-purple-600'}`}>
                      {assignment.type === 'code' ? <ExternalLink className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                    </div>
                    
                    <div className="flex-1 space-y-1 w-full">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] uppercase tracking-widest font-black text-primary bg-primary/5 px-2.5 py-1 rounded-md">
                          {assignment.course?.code}
                        </span>
                        {isOverdue && (
                          <span className="text-[10px] uppercase tracking-widest font-black text-red-600 bg-red-500/10 px-2.5 py-1 rounded-md animate-pulse">
                            En retard
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-black font-headline tracking-tight text-on-surface group-hover:text-primary transition-colors">
                        {assignment.title}
                      </h3>
                      <p className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                        <BookOpen className="h-4 w-4 opacity-50" />
                        {assignment.course?.title}
                      </p>
                    </div>

                    <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-outline-variant/10">
                      <div className={`text-sm font-black flex items-center gap-2 ${isOverdue ? 'text-red-500' : 'text-on-surface'}`}>
                        <CalendarDays className="h-4 w-4" />
                        {deadlineDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <button className="sm:mt-4 text-xs font-black uppercase tracking-widest bg-primary text-white px-6 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/20">
                        Soumettre
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Sidebar: Completed Assignments */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black font-headline tracking-tighter text-on-surface">Historique</h2>
          </div>

          <div className="bg-surface-container-low/30 rounded-[2.5rem] border border-outline-variant/10 p-6 space-y-4">
             {completed.length === 0 ? (
                <div className="text-center p-8 opacity-50">
                  <p className="text-sm font-bold uppercase tracking-widest">Aucun historique</p>
                </div>
             ) : (
                completed.map((assignment: any) => (
                  <div key={assignment.id} className="bg-white p-5 rounded-3xl border border-outline-variant/10 flex gap-4 items-start group hover:-translate-y-1 transition-transform">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 shrink-0 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface text-sm leading-tight mb-1 group-hover:text-primary transition-colors">{assignment.title}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">{assignment.course?.code}</p>
                      {assignment.status === 'graded' && (
                        <div className="mt-3 inline-block bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">
                          Note Disponible
                        </div>
                      )}
                    </div>
                  </div>
                ))
             )}
          </div>
        </div>

      </div>
    </div>
  )
}
