import { ReactNode } from 'react'
import { Card } from './Card'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  theme?: 'primary' | 'default'
  addon?: string
  shape?: string
  trend?: {
    value: number
    label: string
    isPositive: boolean
  }
  isLive?: boolean
}

export function StatsCard({ title, value, icon, theme = 'default', addon, trend, isLive }: StatsCardProps) {
  if (theme === 'primary') {
    return (
      <Card className="bg-primary text-white border-none shadow-lg shadow-primary/20 relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              {icon}
            </div>
            {isLive && (
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">Live</span>
              </div>
            )}
          </div>
          <p className="text-5xl font-extrabold tracking-tight">{value}</p>
          <p className="text-sm font-bold text-white/90 mt-2 uppercase tracking-wider">{title}</p>
        </div>
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-3xl opacity-50"></div>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col h-full bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300 p-8">
      <div className="flex justify-between items-start mb-8">
        <div className="p-4 rounded-2xl bg-blue-50 text-blue-900 border border-blue-100 dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-400/20 shadow-sm group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        {addon && (
          <span className="text-[10px] font-black px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-200 border border-slate-800/10 dark:border-white/5 uppercase tracking-[0.1em] shadow-sm">
            {addon}
          </span>
        )}
      </div>
      <div className="space-y-4">
        <p className="text-sm font-black uppercase tracking-[0.08em] text-slate-800 dark:text-slate-400/80 leading-none">
          {title}
        </p>
        <div className="flex items-baseline gap-4">
          <p className="text-[2.25rem] font-black text-slate-950 dark:text-white tracking-tighter group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-300 leading-none">
            {value}
          </p>
          {trend && (
            <span className={`text-[10px] font-black px-2.5 py-2 rounded-xl border-none shadow-sm ${trend.isPositive ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-rose-100 text-rose-900 dark:bg-rose-500/20 dark:text-rose-400'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </span>
          )}
        </div>
        {trend && (
          <p className="text-xs text-slate-900 dark:text-slate-500 font-bold flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-white/5 mt-4">
            <span className={`w-2 h-2 rounded-full ${trend.isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
            vs {trend.label}
          </p>
        )}
      </div>
    </Card>
  )
}
