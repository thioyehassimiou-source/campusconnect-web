'use client'

import { useState } from 'react'
import { Bell, Search, Menu, Sparkles } from 'lucide-react'
import { useNotifications } from '@/features/notifications/hooks/useNotifications'
import { NotificationDrawer } from '@/features/notifications/components/NotificationDrawer'
import { ThemeToggleDark } from '@/components/theme/ThemeToggle'

export function Navbar({ role, profile, toggleMobileMenu }: { role: string, profile: any, toggleMobileMenu: () => void }) {
  const { notifications, unreadCount, markAsRead } = useNotifications()
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  return (
    <nav className="fixed top-4 right-4 z-40 left-4 md:left-[calc(var(--sidebar-width,18rem)+1rem)] transition-all duration-300">
      <div className="bg-white/90 dark:bg-[#0f172a]/80 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-white/5 shadow-sm dark:shadow-none">
        {/* Mobile Toggle */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors mr-2 bg-slate-50 dark:bg-white/5 rounded-xl"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="flex items-center bg-slate-50 dark:bg-white/5 px-4 py-2 rounded-xl group focus-within:ring-2 focus-within:ring-primary/10 dark:focus-within:ring-blue-400/10 transition-all border border-slate-100 dark:border-white/5 focus-within:border-primary/30 dark:focus-within:border-blue-400/30">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 group-focus-within:text-primary dark:group-focus-within:text-blue-400 transition-all" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full placeholder:text-slate-400 dark:placeholder:text-slate-500 ml-3 text-slate-900 dark:text-slate-100"
              placeholder="Rechercher..."
              type="text"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-2 pr-4 border-r border-slate-100 dark:border-white/10">
             <div className="hidden md:block">
                <ThemeToggleDark />
             </div>
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`text-slate-400 hover:text-primary transition-all relative p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 group ${isNotificationsOpen ? 'text-primary dark:text-blue-400 bg-primary/5 dark:bg-blue-400/10' : ''}`}
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadCount > 0 && !isNotificationsOpen && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" />
              )}
            </button>

            {isNotificationsOpen && (
              <NotificationDrawer 
                notifications={notifications}
                onClose={() => setIsNotificationsOpen(false)}
                onMarkRead={markAsRead}
              />
            )}
          </div>

          {/* User */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="text-right hidden xl:block">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-none mb-1 uppercase">
                {profile?.full_name || 'Utilisateur'}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                Portail U-Labé
              </p>
            </div>
            <div className="relative shrink-0">
               <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group-hover:border-primary/30 dark:group-hover:border-blue-400/30 transition-all flex items-center justify-center overflow-hidden shadow-sm">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-[800] text-primary dark:text-blue-400 uppercase">
                       {(profile?.full_name || 'U').charAt(0)}
                    </span>
                  )}
               </div>
               <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
