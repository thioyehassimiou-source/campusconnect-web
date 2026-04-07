import { FileText, Code } from 'lucide-react'

interface HomeworkCardProps {
  title: string
  deadline: string
  type: 'report' | 'code'
}

export function HomeworkCard({ title, deadline, type }: HomeworkCardProps) {
  return (
    <div className="card-premium p-6 flex items-center justify-between group shadow-sm transition-all duration-300">
      <div className="flex items-center gap-5">
        <div className={`
          w-14 h-14 rounded-2xl flex items-center justify-center shrink-0
          ${type === 'report' ? 'bg-error-container/20 text-error' : 'bg-secondary-container/20 text-on-secondary-container'}
        `}>
          {type === 'report' ? <FileText className="h-6 w-6" /> : <Code className="h-6 w-6" />}
        </div>
        <div className="space-y-1">
          <p className="text-base font-bold text-on-surface tracking-tight">{title}</p>
          <p className="text-sm text-on-surface-variant font-medium">Deadline : {deadline}</p>
        </div>
      </div>
      <button className="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-sm font-bold hover:scale-[1.05] active:scale-95 transition-all shadow-sm shrink-0">
        Déposer
      </button>
    </div>
  )
}
