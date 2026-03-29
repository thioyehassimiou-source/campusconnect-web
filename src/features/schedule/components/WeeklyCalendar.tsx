import { useState, useEffect } from 'react'
import { ScheduleEvent, DayInfo } from '../types'
import { CourseBlock } from './CourseBlock'

interface WeeklyCalendarProps {
  days: DayInfo[]
  hours: string[]
  events: ScheduleEvent[]
  view: 'day' | 'week' | 'month'
}

export function WeeklyCalendar({ days, hours, events, view }: WeeklyCalendarProps) {
  const HOUR_HEIGHT = 80
  const START_HOUR = 8
  const now = new Date()

  const [currentTimePos, setCurrentTimePos] = useState<number | null>(null)

  useEffect(() => {
    const updatePos = () => {
      const d = new Date()
      if (d.getHours() < START_HOUR || d.getHours() >= START_HOUR + hours.length) {
        setCurrentTimePos(null)
        return
      }
      const minutesSinceStart = (d.getHours() - START_HOUR) * 60 + d.getMinutes()
      setCurrentTimePos((minutesSinceStart / 60) * HOUR_HEIGHT)
    }
    updatePos()
    const interval = setInterval(updatePos, 60000)
    return () => clearInterval(interval)
  }, [hours.length])

  return (
    <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/10 shadow-2xl shadow-primary/5 animate-in fade-in zoom-in-95 duration-500">
      {/* Grid Header Days */}
      <div className={`grid ${view === 'week' ? 'grid-cols-[60px_repeat(5,1fr)]' : 'grid-cols-[60px_1fr]'} bg-surface-container-low border-b border-outline-variant/20`}>
        <div className="p-4" />
        {days
          .filter((day, idx) => view === 'week' || day.isToday || (view === 'day' && idx === (now.getDay() === 0 ? 0 : now.getDay() - 1)))
          .map((day) => (
          <div 
            key={day.name} 
            className={`p-5 text-center border-l border-outline-variant/10 transition-colors ${day.isToday ? 'bg-primary/5' : ''}`}
          >
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${day.isToday ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}>
              {day.name}
            </p>
            <p className={`text-2xl font-black ${day.isToday ? 'text-primary' : 'text-on-surface'}`}>
              {day.date}
            </p>
          </div>
        ))}
      </div>

      {/* Scrollable Grid Body */}
      <div className="max-h-[700px] overflow-y-auto relative custom-scrollbar bg-white/50">
        <div className={`grid ${view === 'week' ? 'grid-cols-[60px_repeat(5,1fr)]' : 'grid-cols-[60px_1fr]'} relative`}>
          {/* Hours Column */}
          <div className="bg-surface-container-lowest/80 backdrop-blur-sm z-10">
            {hours.map((hour) => (
              <div 
                key={hour} 
                className="h-[80px] pr-4 text-right text-[11px] font-black text-on-surface-variant/40 flex items-start pt-2 justify-end"
              >
                {hour}
              </div>
            ))}
          </div>

          {/* Day Columns */}
          {days
            .filter((day, idx) => view === 'week' || day.isToday || (view === 'day' && idx === (now.getDay() === 0 ? 0 : now.getDay() - 1)))
            .map((day, dayIdx) => (
            <div 
              key={day.name} 
              className={`border-l border-outline-variant/10 relative h-[880px] ${day.isToday ? 'bg-primary/[0.02]' : ''}`}
            >
              {/* Today's Time Indicator */}
              {day.isToday && currentTimePos !== null && (
                <div 
                  className="absolute left-0 right-0 border-t-2 border-error z-20 flex items-center pointer-events-none"
                  style={{ top: `${currentTimePos}px` }}
                >
                  <div className="w-2.5 h-2.5 bg-error rounded-full -ml-1.25 shadow-sm animate-pulse" />
                </div>
              )}

              {/* Grid Horizontal Lines */}
              {hours.map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-full border-t border-outline-variant/5 pointer-events-none" 
                  style={{ top: `${i * HOUR_HEIGHT}px` }} 
                />
              ))}

              {/* Events for this day */}
              {events
                .filter((e) => e.day === days.indexOf(day))
                .map((event) => (
                  <CourseBlock 
                    key={event.id} 
                    event={event} 
                    hourHeight={HOUR_HEIGHT} 
                    startHour={START_HOUR} 
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
