import { FileText, Code } from 'lucide-react'

interface HomeworkCardProps {
  title: string
  deadline: string
  type: 'report' | 'code'
}

export function HomeworkCard({ title, deadline, type }: HomeworkCardProps) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between group shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center
          ${type === 'report' ? 'bg-error-container/20 text-error' : 'bg-secondary-container/20 text-on-secondary-container'}
        `}>
          {type === 'report' ? <FileText className="h-6 w-6" /> : <Code className="h-6 w-6" />}
        </div>
        <div>
          <p className="font-bold text-on-surface tracking-tight">{title}</p>
          <p className="text-xs text-on-surface-variant font-medium">Deadline : {deadline}</p>
        </div>
      </div>
      <button className="bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-bold hover:scale-[1.05] active:scale-95 transition-all shadow-sm">
        Déposer
      </button>
    </div>
  )
}
