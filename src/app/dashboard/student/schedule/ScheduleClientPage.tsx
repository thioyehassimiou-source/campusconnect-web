'use client'

import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { WeeklyCalendar } from '@/features/schedule/components/WeeklyCalendar'
import { ScheduleStats } from '@/features/schedule/components/ScheduleStats'
import { ScheduleEvent, EventType } from '@/features/schedule/types'
const hours = Array.from({ length: 11 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`)

interface ScheduleClientPageProps {
  initialSchedule: any[]
}

export default function ScheduleClientPage({ initialSchedule }: ScheduleClientPageProps) {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week')
  // Calculate current week days
  const now = new Date()
  const currentDay = now.getDay() // 0 is Sunday
  const monday = new Date(now)
  monday.setDate(now.getDate() - (currentDay === 0 ? 6 : currentDay - 1))

  const days = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    return {
      name: date.toLocaleDateString('fr-FR', { weekday: 'long' }),
      date: date.getDate(),
      isToday: date.toDateString() === now.toDateString()
    }
  })

  const currentMonthYear = now.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  const weekNumber = Math.ceil((now.getDate() + new Date(now.getFullYear(), now.getMonth(), 1).getDay()) / 7)

  // Map Supabase data to ScheduleEvent type
  const events: ScheduleEvent[] = initialSchedule.map(s => {
    const startDate = new Date(s.start_time)
    const endDate = new Date(s.end_time)
    
    // Check if current course
    const eventDay = startDate.getDay() - 1 // 0 = Mon
    const currentDayIdx = now.getDay() - 1
    
    const startTimeNum = startDate.getHours() + startDate.getMinutes() / 60
    const endTimeNum = endDate.getHours() + endDate.getMinutes() / 60
    const currentTimeNum = now.getHours() + now.getMinutes() / 60
    
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
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700 pb-20">
      {/* Calendar Header Controls */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-10 gap-8">
        <div>
          <h2 className="text-4xl font-black text-primary tracking-tighter mb-1 capitalize">{currentMonthYear}</h2>
          <p className="text-on-surface-variant font-black uppercase tracking-[0.2em] text-xs opacity-70">
            Semaine {weekNumber} — Semestre 2
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-1 bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/10 shadow-inner">
            <button 
              onClick={() => setView('day')}
              className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${view === 'day' ? 'bg-surface-container-lowest shadow-md text-primary ring-1 ring-black/5' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              Jour
            </button>
            <button 
              onClick={() => setView('week')}
              className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${view === 'week' ? 'bg-surface-container-lowest shadow-md text-primary ring-1 ring-black/5' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              Semaine
            </button>
            <button 
              onClick={() => setView('month')}
              className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${view === 'month' ? 'bg-surface-container-lowest shadow-md text-primary ring-1 ring-black/5' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              Mois
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-all border border-outline-variant/10 bg-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="px-5 py-2 text-[11px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-full transition-all border border-primary/20 bg-white shadow-sm">
              Aujourd'hui
            </button>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-all border border-outline-variant/10 bg-white">
              <ChevronRight className="h-5 w-5" />
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
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-primary to-primary-container text-white rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group z-50">
        <Plus className="h-8 w-8 group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>
  )
}
