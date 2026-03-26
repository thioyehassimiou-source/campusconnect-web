import { MoreVertical, Clock, FolderOpen, Bell, Mail, School, ClipboardList, Info } from 'lucide-react'
import { NotificationItem as NotificationType } from '../types'

interface NotificationItemProps {
  notification: NotificationType
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const isUnread = notification.status === 'unread'

  const getIcon = () => {
    switch (notification.categoryIcon) {
      case 'assignment': return <ClipboardList className="h-6 w-6" />
      case 'campaign': return <Bell className="h-6 w-6" />
      case 'mail': return <Mail className="h-6 w-6" />
      case 'school': return <School className="h-6 w-6" />
      default: return <Info className="h-6 w-6" />
    }
  }

  return (
    <div className={`
      group relative rounded-3xl p-6 flex items-start gap-6 transition-all cursor-pointer border border-transparent
      ${isUnread 
        ? 'bg-surface-container-lowest hover:bg-surface-container-low shadow-lg shadow-primary/5' 
        : 'bg-surface-container-low/40 hover:bg-surface-container-low'
      }
      animate-in slide-in-from-left-4 duration-500
    `}>
      {isUnread && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-14 bg-primary rounded-r-full shadow-[0_0_15px_rgba(0,24,95,0.4)]" />
      )}
      
      <div className={`
        w-14 h-14 flex-shrink-0 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110
        ${notification.categoryColor}
      `}>
        {getIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h4 className={`text-base truncate tracking-tight transition-colors ${isUnread ? 'font-black text-on-surface group-hover:text-primary' : 'font-semibold text-on-surface-variant'}`}>
            {notification.title}
          </h4>
          {isUnread && (
            <span className="shrink-0 text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest border border-primary/5">
              NOUVEAU
            </span>
          )}
        </div>
        
        <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${isUnread ? 'text-on-surface-variant font-medium' : 'text-on-surface-variant/60 font-medium'}`}>
          {notification.description}
        </p>

        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
          <span className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            {notification.timestamp}
          </span>
          <span className="flex items-center gap-2">
            <FolderOpen className="h-3.5 w-3.5" />
            {notification.categoryName}
          </span>
        </div>
      </div>

      <button className="opacity-0 group-hover:opacity-100 p-2.5 hover:bg-white rounded-xl transition-all self-center shadow-sm">
        <MoreVertical className="h-5 w-5 text-on-surface-variant" />
      </button>
    </div>
  )
}
