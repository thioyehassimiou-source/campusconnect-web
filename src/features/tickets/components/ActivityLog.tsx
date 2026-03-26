import { TicketActivity } from '../types'

interface ActivityLogProps {
  activities: TicketActivity[]
}

export function ActivityLog({ activities }: ActivityLogProps) {
  return (
    <div className="flex-1 overflow-y-auto p-10 space-y-10 bg-white no-scrollbar">
      {activities.map((activity) => {
        if (activity.type === 'system') {
          return (
            <div key={activity.id} className="flex justify-center animate-in fade-in duration-700">
              <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] bg-surface-container-low px-6 py-2 rounded-full border border-outline-variant/5 shadow-sm">
                {activity.content}
              </span>
            </div>
          )
        }

        const isSupport = activity.role === 'support'

        return (
          <div key={activity.id} className={`flex gap-6 max-w-2xl ${isSupport ? 'ml-auto flex-row-reverse text-right' : ''} animate-in slide-in-from-bottom-4 duration-500`}>
            {activity.author && (
              <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg overflow-hidden ring-4 border-2 border-white ${isSupport ? 'ring-primary/5' : 'ring-secondary/5'}`}>
                <img src={activity.author.avatar} alt={activity.author.name} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="space-y-3 w-full">
              <div className={`flex items-baseline gap-3 ${isSupport ? 'justify-end' : ''}`}>
                <span className="font-black text-sm tracking-tight text-on-surface">{activity.author?.name}</span>
                <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">{activity.timestamp}</span>
              </div>
              
              <div className={`
                p-6 rounded-[2rem] text-sm leading-relaxed shadow-sm transition-all
                ${isSupport 
                  ? 'bg-primary text-white rounded-tr-none shadow-xl shadow-primary/10 text-left' 
                  : 'bg-surface-container-low text-on-surface rounded-tl-none border border-outline-variant/10'
                }
              `}>
                {activity.content}
              </div>

              {activity.attachmentUrl && (
                <div className={`flex ${isSupport ? 'justify-end' : ''} mt-4`}>
                  <div className="w-80 aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white group relative cursor-zoom-in">
                    <img src={activity.attachmentUrl} alt="Attachment" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
