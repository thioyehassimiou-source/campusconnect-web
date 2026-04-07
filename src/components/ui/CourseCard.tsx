import { MapPin, Video } from 'lucide-react'
import { motion } from 'framer-motion'
import { slideUp } from '@/lib/animations'

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
    <motion.div 
      variants={slideUp}
      className={`
        card-premium p-4 md:p-6 flex items-center gap-6 border-l-4 group
        ${isHighlight ? 'border-emerald-500' : 'border-white/5'}
      `}
    >
      <div className="text-center min-w-[70px] p-3 bg-slate-900 rounded-lg group-hover:bg-emerald-500/10 transition-colors duration-300">
        <p className="text-xs font-black text-white tracking-tighter">{timeStart}</p>
        <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mt-0.5">{timeEnd}</p>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors leading-tight mb-1 tracking-tight">{title}</h4>
        <div className="flex items-center gap-3 opacity-60">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
            {type === 'PRESENTIEL' ? <MapPin className="h-3 w-3 text-emerald-500/60" /> : <Video className="h-3 w-3 text-blue-500/60" />}
            {location}
          </p>
          <div className="h-0.5 w-0.5 bg-slate-700 rounded-full"></div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{instructor}</p>
        </div>
      </div>
      <div className="hidden sm:block">
        <span className={`
          px-3 py-1 text-[8px] rounded-md font-black uppercase tracking-widest border
          ${type === 'PRESENTIEL' 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
          }
        `}>
          {type}
        </span>
      </div>
    </motion.div>
  )
}
