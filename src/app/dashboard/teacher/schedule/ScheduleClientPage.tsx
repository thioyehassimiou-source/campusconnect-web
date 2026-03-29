'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { WeeklyCalendar } from '@/features/schedule/components/WeeklyCalendar'
import { ScheduleStats } from '@/features/schedule/components/ScheduleStats'

const FRENCH_MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
const FRENCH_DAYS = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']
const hours = Array.from({ length: 11 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`)

type ViewMode = 'day' | 'week' | 'month'

function getWeekStart(date: Date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function getWeekNumber(date: Date) {
  const oneJan = new Date(date.getFullYear(), 0, 1)
  return Math.ceil((((date.getTime() - oneJan.getTime()) / 86400000) + oneJan.getDay() + 1) / 7)
}

function getSemester(date: Date) {
  return date.getMonth() < 6 ? 'Semestre 1' : 'Semestre 2'
}

export default function SchedulePage() {
  const [baseDate, setBaseDate] = useState(new Date())
  const [view, setView] = useState<ViewMode>('week')

  const weekStart = useMemo(() => getWeekStart(baseDate), [baseDate])

  const days = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(weekStart)
      d.setDate(weekStart.getDate() + i)
      // day index offset: Monday=1 in our array
      const dayIdx = d.getDay() === 0 ? 6 : d.getDay() - 1
      return {
        name: FRENCH_DAYS[(d.getDay())],
        date: d.getDate(),
        isToday: d.getTime() === today.getTime()
      }
    })
  }, [weekStart])

  const navigate = (direction: 'prev' | 'next' | 'today') => {
    if (direction === 'today') { setBaseDate(new Date()); return }
    const offset = { week: 7, day: 1, month: 30 }[view]
    const d = new Date(baseDate)
    d.setDate(d.getDate() + (direction === 'next' ? offset : -offset))
    setBaseDate(d)
  }

  const headerLabel = view === 'day'
    ? `${FRENCH_DAYS[baseDate.getDay()]} ${baseDate.getDate()} ${FRENCH_MONTHS[baseDate.getMonth()]} ${baseDate.getFullYear()}`
    : view === 'week'
    ? `${FRENCH_MONTHS[weekStart.getMonth()]} ${weekStart.getFullYear()}`
    : `${FRENCH_MONTHS[baseDate.getMonth()]} ${baseDate.getFullYear()}`

  const subLabel = view === 'day'
    ? getSemester(baseDate)
    : `Semaine ${getWeekNumber(weekStart)} — ${getSemester(weekStart)}`

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700 pb-20">
      {/* Calendar Header Controls */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-10 gap-8">
        <div>
          <h2 className="text-4xl font-black text-primary tracking-tighter mb-1">{headerLabel}</h2>
          <p className="text-on-surface-variant font-black uppercase tracking-[0.2em] text-xs opacity-70">
            {subLabel}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          {/* View Switcher */}
          <div className="flex items-center gap-1 bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/10 shadow-inner">
            {(['day', 'week', 'month'] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  view === v
                    ? 'bg-surface-container-lowest shadow-md text-primary ring-1 ring-black/5'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {v === 'day' ? 'Jour' : v === 'week' ? 'Semaine' : 'Mois'}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('prev')}
              className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-all border border-outline-variant/10 bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('today')}
              className="px-5 py-2 text-[11px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-full transition-all border border-primary/20 bg-white shadow-sm"
            >
              Aujourd'hui
            </button>
            <button
              onClick={() => navigate('next')}
              className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-all border border-outline-variant/10 bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <WeeklyCalendar
        days={view === 'day' ? [days.find(d => d.isToday) || days[0]] : days}
        hours={hours}
        events={[]}
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
