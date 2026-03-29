import { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface QuickTaskProps {
  title: string
  description: string
  icon: ReactNode
  theme: 'error' | 'secondary' | 'tertiary'
  actionText: string
  href?: string
}

export function QuickTask({ title, description, icon, theme, actionText, href }: QuickTaskProps) {
  const themeMap = {
    error: 'bg-error-container text-error',
    secondary: 'bg-secondary-container text-primary',
    tertiary: 'bg-tertiary-container text-on-tertiary-container',
  }

  return (
    <div className="flex gap-4 group">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${themeMap[theme]}`}>
        {icon}
      </div>
      <div>
        <h5 className="font-black text-sm text-on-surface tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h5>
        <p className="text-xs text-on-surface-variant mt-1 font-medium">{description}</p>
        <Link 
          href={href || '#'} 
          className="mt-3 text-xs font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all group/btn"
        >
          {actionText} 
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
