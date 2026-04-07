'use client'

import { ChevronLeft, ChevronRight, Plus, WifiOff } from 'lucide-react'
import { useState, useEffect } from 'react'
import { WeeklyCalendar } from '@/features/schedule/components/WeeklyCalendar'
import { ScheduleStats } from '@/features/schedule/components/ScheduleStats'
import { ScheduleEvent, EventType } from '@/features/schedule/types'
import { useToast } from '@/components/ui/Toast'
import { addWeeks, subWeeks, startOfWeek, format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useUser } from '@/providers/UserProvider'
const hours = Array.from({ length: 11 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`)

interface ScheduleClientPageProps {
  initialSchedule: any[]
}

export default function ScheduleClientPage({ initialSchedule }: ScheduleClientPageProps) {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isAdding, setIsAdding] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const { info, success, error } = useToast()
  const { user } = useUser()
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Calculate week days based on currentDate
  const monday = startOfWeek(currentDate, { weekStartsOn: 1 })

  const days = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    return {
      name: format(date, 'eeee', { locale: fr }),
      date: date.getDate(),
      isToday: date.toDateString() === new Date().toDateString()
    }
  })

  const currentMonthYear = format(currentDate, 'MMMM yyyy', { locale: fr })
  const weekNumber = format(currentDate, 'w', { locale: fr })

  const handlePrevWeek = () => setCurrentDate(prev => subWeeks(prev, 1))
  const handleNextWeek = () => setCurrentDate(prev => addWeeks(prev, 1))
  const handleToday = () => setCurrentDate(new Date())

  const handleAddEvent = async () => {
    const title = window.prompt("Titre de l'événement ?")
    if (!title) return
    
    setIsAdding(true)
    try {
      const start = new Date(currentDate)
      start.setHours(9, 0, 0, 0)
      const end = new Date(start)
      end.setHours(11, 0, 0, 0)

      if (!user) throw new Error('Utilisateur non connecté')

      const { error: insertError } = await supabase
        .from('schedule')
        .insert({
          profile_id: user.id,
          type: 'personal',
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          location: 'Visioconférence'
        })

      if (insertError) throw insertError
      
      // We also need to link this to a Dummy course or handle NULL course in WeeklyCalendar
      // Since 'course_id' might be mandatory, I'll check its requirement.

      success('Événement personnel ajouté !')
      router.refresh()
    } catch (err: any) {
      error(err.message || "Erreur lors de l'ajout.")
    } finally {
      setIsAdding(false)
    }
  }

  // Map Supabase data to ScheduleEvent type
  const events: ScheduleEvent[] = initialSchedule.map(s => {
    const startDate = new Date(s.start_time)
    const endDate = new Date(s.end_time)
    
    // Check if current course
    const eventDay = startDate.getDay() - 1 // 0 = Mon
    const currentDayIdx = new Date().getDay() - 1
    
    const startTimeNum = startDate.getHours() + startDate.getMinutes() / 60
    const endTimeNum = endDate.getHours() + endDate.getMinutes() / 60
    const currentTimeNum = new Date().getHours() + new Date().getMinutes() / 60
    
    const isCurrent = eventDay === currentDayIdx && 
                      currentTimeNum >= startTimeNum && 
                      currentTimeNum <= endTimeNum

    return {
      id: s.id,
      title: s.course?.title || 'Cours inconnu',
      type: (s.type === 'class' ? 'CM' : s.type.toUpperCase()) as EventType,
      startTime: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      day: eventDay,
      location: s.location || s.course?.location,
      isCurrent
    }
  })

  const currentEvent = events.find(e => e.isCurrent)

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-300 pb-20">
      {/* Offline data banner */}
      {!isOnline && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl">
          <WifiOff className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <p className="text-xs font-bold text-amber-900 dark:text-amber-300">
            Mode hors-ligne — Affichage de votre dernier emploi du temps enregistré
          </p>
        </div>
      )}
      {/* Calendar Header Controls */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-6 gap-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight mb-1 capitalize">{currentMonthYear}</h2>
          <p className="text-[11px] text-emerald-500/80 font-black uppercase tracking-[0.2em]">
            Semaine {weekNumber} — Semestre 2
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-white/5">
            <button 
              onClick={() => setView('day')}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${view === 'day' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-900 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}
            >
              Jour
            </button>
            <button 
              onClick={() => setView('week')}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${view === 'week' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-900 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}
            >
              Semaine
            </button>
            <button 
              onClick={() => setView('month')}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${view === 'month' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-900 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}
            >
              Mois
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevWeek}
              className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-400"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button 
              onClick={handleToday}
              className="px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all border border-emerald-500/20 bg-slate-900"
            >
              Aujourd'hui
            </button>
            <button 
              onClick={handleNextWeek}
              className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-400"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <WeeklyCalendar 
        days={days} 
        hours={hours} 
        events={events} 
        view={view}
      />

      {/* Bottom Stats */}
      <ScheduleStats />

      {/* FAB Action */}
      <button 
        disabled={isAdding}
        onClick={handleAddEvent}
        className="fixed bottom-8 right-8 w-12 h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-900/30 flex items-center justify-center active:scale-95 transition-all z-50 disabled:opacity-50"
      >
        {isAdding ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Plus className="h-5 w-5" />
        )}
      </button>
    </div>
  )
}
