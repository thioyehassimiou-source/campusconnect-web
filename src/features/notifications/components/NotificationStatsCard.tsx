interface NotificationStatsCardProps {
  count: number
}

export function NotificationStatsCard({ count }: NotificationStatsCardProps) {
  return (
    <div className="bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-8 text-white flex flex-col justify-between shadow-2xl shadow-primary/20 relative overflow-hidden h-full group animate-in fade-in zoom-in-95 duration-700 delay-300">
      <div className="relative z-10 transition-transform group-hover:translate-x-2">
        <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">En attente</span>
        <div className="text-6xl font-black mt-2 tracking-tighter">{count}</div>
        <p className="text-white/70 text-xs mt-3 font-semibold uppercase tracking-widest">Nouvelles alertes aujourd'hui</p>
      </div>
      
      <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[12rem] text-white/10 rotate-12 transition-transform group-hover:rotate-0 duration-700" style={{ fontVariationSettings: "'wght' 700" }}>
        notifications_active
      </span>
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
    </div>
  )
}
