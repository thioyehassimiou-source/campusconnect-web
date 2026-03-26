import { Folder, ArrowRight } from 'lucide-react'
import { CourseFolder as CourseFolderType, FileType } from '../types'

interface CourseFolderProps {
  folder: CourseFolderType
}

export function CourseFolder({ folder }: CourseFolderProps) {
  const getBadgeColor = (type: FileType) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-600'
      case 'ppt': return 'bg-blue-100 text-blue-600'
      case 'mp4': return 'bg-orange-100 text-orange-600'
      case 'fig': return 'bg-purple-100 text-purple-600'
      default: return 'bg-slate-100 text-slate-600'
    }
  }

  return (
    <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 hover:shadow-2xl hover:shadow-primary/5 transition-all group cursor-pointer animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-start mb-8">
        <div className="p-4 bg-secondary-container rounded-2xl text-primary shadow-inner">
          <Folder className="h-8 w-8" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
          {folder.documentCount} Documents
        </span>
      </div>
      
      <h3 className="text-2xl font-black text-primary mb-3 font-headline tracking-tighter">
        {folder.name}
      </h3>
      <p className="text-sm text-on-surface-variant leading-relaxed opacity-70 line-clamp-2 font-medium">
        {folder.description}
      </p>
      
      <div className="mt-8 pt-8 border-t border-outline-variant/10 flex items-center justify-between">
        <div className="flex -space-x-3">
          {folder.fileTypes.map((type, idx) => (
            <span 
              key={idx}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black uppercase border-4 border-white shadow-sm hover:scale-110 transition-transform ${getBadgeColor(type)}`}
            >
              {type}
            </span>
          ))}
        </div>
        <div className="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center text-outline group-hover:text-primary group-hover:border-primary group-hover:bg-primary/5 transition-all">
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
