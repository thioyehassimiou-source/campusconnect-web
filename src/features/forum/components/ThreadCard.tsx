import { MessageSquare, Heart, Clock } from 'lucide-react'
import { ForumThread } from '../types'

interface ThreadCardProps {
  thread: ForumThread
}

export function ThreadCard({ thread }: ThreadCardProps) {
  return (
    <article className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group cursor-pointer border border-outline-variant/5 animate-in slide-in-from-bottom-6 duration-700">
      <div className="flex gap-8">
        <div className="relative shrink-0">
          <img 
            src={thread.author.avatar} 
            alt={thread.author.name} 
            className="w-14 h-14 rounded-2xl border-2 border-surface-container-low object-cover shadow-sm transition-transform group-hover:scale-105" 
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2 gap-4">
            <h3 className="text-xl font-black text-on-surface group-hover:text-primary transition-colors tracking-tighter leading-tight truncate">
              {thread.title}
            </h3>
            {thread.isPopular && (
              <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] font-black text-on-tertiary-container bg-tertiary-fixed px-3 py-1 rounded-full shadow-sm">
                Populaire
              </span>
            )}
          </div>
          
          <p className="text-on-surface-variant text-base line-clamp-2 leading-relaxed font-medium opacity-70 mb-6">
            {thread.contentSnippet}
          </p>

          {thread.imageUrl && (
            <div className="w-full h-64 rounded-3xl bg-surface-container-low mb-6 overflow-hidden border border-outline-variant/10 group-hover:shadow-lg transition-all duration-500">
              <img 
                src={thread.imageUrl} 
                alt="Post media" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          )}

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5 text-on-surface-variant/40 text-[10px] font-black uppercase tracking-widest group-hover:text-primary/60 transition-colors">
              <MessageSquare className="h-4 w-4" />
              <span>{thread.replyCount} réponses</span>
            </div>
            <div className={`flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest transition-colors ${thread.isLiked ? 'text-primary' : 'text-on-surface-variant/40 group-hover:text-error/60'}`}>
              <Heart className={`h-4 w-4 ${thread.isLiked ? 'fill-current' : ''}`} />
              <span>{thread.likeCount}</span>
            </div>
            <div className="flex items-center gap-2.5 text-on-surface-variant/40 text-[10px] font-black uppercase tracking-widest ml-auto opacity-60">
              <Clock className="h-4 w-4" />
              <span>{thread.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
