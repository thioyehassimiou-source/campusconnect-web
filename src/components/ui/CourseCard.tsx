import { MapPin, Video } from 'lucide-react'

interface CourseCardProps {
  timeStart: string
  timeEnd: string
  title: string
  location: string
  instructor: string
  type: 'PRESENTIEL' | 'DISTANCIEL'
  isHighlight?: boolean
}

export function CourseCard({ timeStart, timeEnd, title, location, instructor, type, isHighlight }: CourseCardProps) {
  return (
    <div className={`
      card-premium p-6 flex items-center gap-8 border-l-[6px] interactive-element group entrance-up
      ${isHighlight ? 'border-primary ring-1 ring-primary/10 bg-primary/[0.01]' : 'border-outline-variant/10'}
    `}>
      <div className="text-center min-w-[80px] p-4 bg-surface-container-low/30 rounded-[var(--radius-standard)] group-hover:bg-primary/10 transition-colors duration-500">
        <p className="text-sm font-black text-on-surface tracking-tighter">{timeStart}</p>
        <p className="text-[10px] text-on-surface-variant/40 uppercase font-black tracking-widest mt-1">{timeEnd}</p>
      </div>
      <div className="flex-1">
        <h4 className="text-base font-black font-headline text-on-surface group-hover:text-primary transition-colors leading-tight mb-2 tracking-tighter">{title}</h4>
        <div className="flex items-center gap-4 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
          <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest flex items-center gap-2">
            {type === 'PRESENTIEL' ? <MapPin className="h-3.5 w-3.5 text-primary/60" /> : <Video className="h-3.5 w-3.5 text-indigo-500/60" />}
            {location}
          </p>
          <div className="h-1 w-1 bg-outline-variant/30 rounded-full"></div>
          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{instructor}</p>
        </div>
      </div>
      <div className="text-right">
        <span className={`
          inline-block px-4 py-1.5 text-[9px] rounded-full font-black uppercase tracking-[0.2em] shadow-sm border transition-all duration-500
          ${type === 'PRESENTIEL' 
            ? 'bg-secondary-container/10 text-on-secondary-container border-secondary-container/20 group-hover:bg-secondary-container/20' 
            : 'bg-tertiary-fixed/10 text-on-tertiary-fixed border-tertiary-fixed/20 group-hover:bg-tertiary-fixed/20'
          }
        `}>
          {type}
        </span>
      </div>
    </div>
  )
}
