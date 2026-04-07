import { Edit, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { slideUp, buttonClickProps } from '@/lib/animations'

interface TeacherCourseCardProps {
  id: string
  code: string
  title: string
  schedule: string
  image: string
  progress: number
  studentCount: number
  color: string
}

export function TeacherCourseCard({ code, title, schedule, image, progress, studentCount, color }: TeacherCourseCardProps) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-50',
    purple: 'text-purple-600 bg-purple-50',
    amber: 'text-amber-600 bg-amber-50',
  }

  return (
    <motion.div 
      variants={slideUp}
      initial="initial"
      animate="animate"
      className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm hover:shadow-md dark:shadow-none p-5 flex items-center gap-6 group interactive-element opacity-95 hover:opacity-100 transition-all duration-300"
    >
      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={image} 
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${colorMap[color] || colorMap.blue}`}>
              {code}
            </span>
            <h4 className="text-lg font-black text-slate-900 dark:text-white mt-1 tracking-tight">{title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{schedule}</p>
          </div>
          <div className="flex gap-2">
            <motion.button 
              {...buttonClickProps}
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary dark:hover:text-blue-400 transition-colors"
            >
              <Edit className="h-5 w-5" />
            </motion.button>
            <motion.button 
              {...buttonClickProps}
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary dark:hover:text-blue-400 transition-colors"
            >
              <Eye className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img 
                key={i}
                alt="Student" 
                className="w-7 h-7 rounded-full border-2 border-white object-cover" 
                src={`https://i.pravatar.cc/150?u=${i + studentCount}`} 
              />
            ))}
            <div className="w-7 h-7 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center text-[10px] font-black text-on-surface">
              +{studentCount - 3}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-on-surface-variant">Progression: {progress}%</span>
            <div className="w-24 bg-surface-container-high h-1 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-500" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
