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
      group bg-surface-container-lowest hover:bg-surface-container-low p-5 rounded-xl transition-all shadow-sm flex items-center gap-6 border-l-4
      ${isHighlight ? 'border-primary' : 'border-surface-variant'}
    `}>
      <div className="text-center min-w-[60px]">
        <p className="text-sm font-bold text-on-surface">{timeStart}</p>
        <p className="text-[10px] text-on-surface-variant uppercase font-bold">{timeEnd}</p>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1 font-medium">
          {type === 'PRESENTIEL' ? <MapPin className="h-3 w-3" /> : <Video className="h-3 w-3 text-indigo-500" />}
          {location}
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-on-surface">{instructor}</p>
        <span className={`
          inline-block px-2 py-0.5 text-[10px] rounded-full font-bold mt-1
          ${type === 'PRESENTIEL' ? 'bg-secondary-container text-on-secondary-container' : 'bg-tertiary-fixed text-on-tertiary-fixed'}
        `}>
          {type}
        </span>
      </div>
    </div>
  )
}
