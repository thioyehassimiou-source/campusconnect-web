import { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  theme?: 'primary' | 'default'
  addon?: string
  shape?: 'xl' | 'full'
  isLive?: boolean
  trend?: {
    value: number
    label: string
    isPositive: boolean
  }
}

export function StatsCard({ title, value, icon, theme = 'default', addon, trend, shape = 'xl', isLive }: StatsCardProps) {
  if (theme === 'primary') {
    return (
      <div className="bg-primary text-on-primary p-6 rounded-[var(--radius-premium)] shadow-premium relative overflow-hidden interactive-element group">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white/10 p-2.5 rounded-[var(--radius-standard)]">
              {icon}
            </div>
            {isLive && (
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider">Live</span>
              </div>
            )}
          </div>
          <p className="text-4xl font-headline font-black tracking-tighter">{value}</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-on-primary/70 mt-1">{title}</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-50"></div>
      </div>
    )
  }

  return (
    <div className="card-premium p-7 interactive-element group entrance-up">
      <div className="flex justify-between items-start mb-8">
        <div className="p-4 rounded-[var(--radius-premium)] bg-primary/5 text-primary transition-all duration-500 border border-primary/10">
          {icon}
        </div>
        {addon && (
          <span className="text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.25em] bg-primary text-white transition-all">
            {addon}
          </span>
        )}
        {isLive && (
          <div className="flex items-center gap-2.5 bg-green-50 dark:bg-green-500/10 px-4 py-2 rounded-full border border-green-200/30">
             <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
             <span className="text-[10px] font-black text-green-700 dark:text-green-400 uppercase tracking-widest leading-none">Live Now</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40 mb-2">{title}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-5xl font-headline font-black text-on-surface tracking-tighter group-hover:text-primary transition-colors duration-500">{value}</p>
          {trend && (
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm border ${trend.isPositive ? 'bg-green-50 text-green-600 border-green-100 dark:bg-green-500/10 dark:border-green-500/20' : 'bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:border-red-500/20'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </span>
          )}
        </div>
        <p className="text-[10px] text-on-surface-variant/20 font-black uppercase tracking-widest mt-4 flex items-center gap-2">
          <span className="w-1 h-1 bg-primary/20 rounded-full"></span>
          vs {trend?.label || 'période précédente'}
        </p>
      </div>
    </div>
  )
}
