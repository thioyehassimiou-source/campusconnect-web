import { TrendingUp, Users } from 'lucide-react'
import { ForumMember } from '../types'

interface ForumSidebarWidgetsProps {
  trending: { category: string; title: string; views: string; color: string }[]
  members: ForumMember[]
}

export function ForumSidebarWidgets({ trending, members }: ForumSidebarWidgetsProps) {
  return (
    <aside className="w-80 bg-surface-container-low/50 p-8 hidden 2xl:flex flex-col gap-12 animate-in fade-in slide-in-from-right-6 duration-1000">
      {/* Trending Topics */}
      <div>
        <h3 className="font-headline font-black text-on-surface mb-8 flex items-center gap-3 text-lg leading-tight tracking-tight">
          <TrendingUp className="h-6 w-6 text-primary" />
          Tendances
        </h3>
        <div className="space-y-4">
          {trending.map((topic, i) => (
            <div 
              key={topic.title} 
              className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/5 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-2 ${topic.color}`}>{topic.category}</p>
              <p className="text-sm font-black text-on-surface line-clamp-1 group-hover:text-primary transition-colors tracking-tight">{topic.title}</p>
              <p className="text-[10px] text-on-surface-variant/40 mt-2 font-bold uppercase tracking-widest italic">{topic.views}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Members */}
      <div>
        <h3 className="font-headline font-black text-on-surface mb-8 flex items-center gap-3 text-lg leading-tight tracking-tight">
          <Users className="h-6 w-6 text-primary" />
          Membres actifs
        </h3>
        <div className="space-y-6">
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-4 group cursor-pointer transition-all hover:translate-x-1">
              <div className="relative shrink-0">
                <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-2xl object-cover shadow-sm ring-2 ring-white" />
                <span className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${member.status === 'online' ? 'bg-green-500' : 'bg-slate-300'}`} />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-black text-on-surface group-hover:text-primary transition-colors truncate tracking-tight">{member.name}</p>
                <p className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest mt-0.5">{member.badge} • En ligne</p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-10 py-4 rounded-2xl border-2 border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 hover:bg-white hover:text-primary transition-all active:scale-95 shadow-sm">
          Voir tous les membres
        </button>
      </div>
    </aside>
  )
}
