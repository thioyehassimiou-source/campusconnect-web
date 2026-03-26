import { ScheduleEvent, DayInfo } from '../types'
import { CourseBlock } from './CourseBlock'

interface WeeklyCalendarProps {
  days: DayInfo[]
  hours: string[]
  events: ScheduleEvent[]
}

export function WeeklyCalendar({ days, hours, events }: WeeklyCalendarProps) {
  const HOUR_HEIGHT = 80
  const START_HOUR = 8

  return (
    <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/10 shadow-2xl shadow-primary/5 animate-in fade-in zoom-in-95 duration-500">
      {/* Grid Header Days */}
      <div className="grid grid-cols-[60px_repeat(5,1fr)] bg-surface-container-low border-b border-outline-variant/20">
        <div className="p-4" />
        {days.map((day) => (
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
        <div className="grid grid-cols-[60px_repeat(5,1fr)] relative">
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
          {days.map((day, dayIdx) => (
            <div 
              key={day.name} 
              className={`border-l border-outline-variant/10 relative h-[880px] ${day.isToday ? 'bg-primary/[0.02]' : ''}`}
            >
              {/* Today's Time Indicator */}
              {day.isToday && (
                <div 
                  className="absolute left-0 right-0 border-t-2 border-error z-20 flex items-center pointer-events-none"
                  style={{ top: '320px' }} // Hardcoded for the demo, could be dynamic
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
                .filter((e) => e.day === dayIdx)
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
