import { MapPin, User, Clock } from 'lucide-react'
import { ScheduleEvent } from '../types'

interface CourseBlockProps {
  event: ScheduleEvent
  hourHeight: number // height of one hour in pixels (80 from Stitch)
  startHour: number  // earliest hour shown (8 from Stitch)
}

export function CourseBlock({ event, hourHeight, startHour }: CourseBlockProps) {
  const start = parseTime(event.startTime)
  const end = parseTime(event.endTime)
  const duration = end - start
  
  const top = (start - startHour) * hourHeight
  const height = duration * hourHeight

  const getStyles = (type: string) => {
    switch (type) {
      case 'CM': return 'bg-primary/10 border-primary text-primary hover:bg-primary/15'
      case 'Lab': return 'bg-secondary-container/30 border-secondary text-secondary hover:bg-secondary-container/50'
      case 'TD': return 'bg-primary/5 border-primary/40 text-primary hover:bg-primary/10'
      case 'Seminar': return 'bg-tertiary-container/10 border-tertiary-container text-tertiary-container hover:bg-tertiary-container/15'
      default: return 'bg-surface-container-high border-outline-variant text-on-surface-variant'
    }
  }

  return (
    <div 
      className={`absolute left-2 right-2 rounded-xl p-3 border-l-4 transition-all cursor-pointer shadow-sm hover:shadow-md group ${event.isCurrent ? 'z-30 ring-2 ring-primary ring-offset-2 animate-pulse-subtle scale-[1.02]' : 'z-5'} ${getStyles(event.type)}`}
      style={{ top: `${top}px`, height: `${height}px` }}
    >
      {event.isCurrent && (
        <div className="absolute -top-2.5 -right-2.5 bg-primary text-white text-[8px] font-black px-2 py-1 rounded-full shadow-lg z-40 transform rotate-12">
          EN COURS
        </div>
      )}
      <div className="flex flex-col h-full justify-between">
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest opacity-80 mb-1 block">
            {event.type === 'CM' ? 'COURS MAGISTRAL' : event.type === 'Lab' ? 'LABORATOIRE' : event.type === 'TD' ? 'TD' : 'SÉMINAIRE'}
          </span>
          <h4 className="text-sm font-black leading-tight tracking-tight group-hover:scale-[1.01] transition-transform origin-left">
            {event.title}
          </h4>
        </div>
        
        {(event.location || event.instructor) && (
          <div className="flex items-center gap-3 mt-auto">
            {event.location && (
              <div className="flex items-center gap-1 text-[10px] font-bold opacity-70">
                <MapPin className="h-3 w-3" />
                <span>{event.location}</span>
              </div>
            )}
            {event.instructor && (
              <div className="flex items-center gap-1 text-[10px] font-bold opacity-70">
                <User className="h-3 w-3" />
                <span>{event.instructor}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function parseTime(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours + minutes / 60
}
