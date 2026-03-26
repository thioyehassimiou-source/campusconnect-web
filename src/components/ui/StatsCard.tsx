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
  const containerClass = `p-6 ${shape === 'full' ? 'rounded-[2.5rem]' : 'rounded-xl'} border-none shadow-[0px_12px_32px_rgba(19,28,30,0.04)] hover:shadow-[0px_16px_48px_rgba(19,28,30,0.08)] transition-all duration-300 group`

  if (theme === 'primary') {
    return (
      <div className="bg-primary text-on-primary p-6 rounded-xl border-none shadow-[0px_12px_32px_rgba(0,24,95,0.15)] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white/10 p-2 rounded-lg">
              {icon}
            </div>
            {isLive && (
              <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live</span>
              </div>
            )}
          </div>
          <p className="text-4xl font-headline font-bold">{value}</p>
          <p className="text-xs font-label text-on-primary/70 mt-1 uppercase tracking-wider font-bold">{title}</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-50"></div>
      </div>
    )
  }

  return (
    <div className={containerClass}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-indigo-50 transition-colors">
          {icon}
        </div>
        {addon && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${theme === 'default' ? 'text-primary-fixed-dim bg-primary' : ''}`}>
            {addon}
          </span>
        )}
        {isLive && (
          <div className="flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-full">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Live</span>
          </div>
        )}
      </div>
      <p className="text-4xl font-headline font-bold text-on-surface">{value}</p>
      <p className="text-xs font-label text-on-surface-variant mt-1 uppercase tracking-wider font-bold">{title}</p>
      {trend && (
        <div className="mt-2 flex items-center gap-1">
          <span className={`text-[10px] font-bold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '+' : '-'}{trend.value}%
          </span>
          <span className="text-[10px] text-on-surface-variant font-medium">vs {trend.label}</span>
        </div>
      )}
    </div>
  )
}
