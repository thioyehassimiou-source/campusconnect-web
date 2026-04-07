import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Button } from './Button'
import Link from 'next/link'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-white/[0.02] border-2 border-dashed border-slate-100 dark:border-white/5 rounded-[2rem] animate-in fade-in zoom-in-95 duration-500">
      <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-6 shadow-inner">
        <Icon className="w-10 h-10 text-slate-300 dark:text-white/10" />
      </div>
      <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 leading-none">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-[280px] leading-relaxed mb-8">{description}</p>
      
      {action && (
        <Link href={action.href}>
          <Button variant="outline" className="px-8">
            {action.label}
          </Button>
        </Link>
      )}
    </div>
  )
}
