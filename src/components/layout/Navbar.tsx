'use client'

import { useState } from 'react'
import { Bell, Search, Settings, Menu } from 'lucide-react'
import Link from 'next/link'
import { useNotifications } from '@/features/notifications/hooks/useNotifications'
import { NotificationDrawer } from '@/features/notifications/components/NotificationDrawer'
import { ThemeToggleDark } from '@/components/theme/ThemeToggle'

export function Navbar({ role, profile, toggleMobileMenu }: { role: string, profile: any, toggleMobileMenu: () => void }) {
  const { notifications, unreadCount, markAsRead } = useNotifications()
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  return (
    <nav 
      className="fixed top-0 right-0 z-40 glass px-6 md:px-10 py-5 flex items-center justify-between transition-all duration-500 ease-in-out entrance-up shadow-sm left-0 md:left-[var(--sidebar-width,18rem)] md:rounded-l-[2rem] border-l border-white/20"
      style={{ animationDelay: '50ms' }}
    >
      {/* Mobile Menu Toggle */}
      <button 
        onClick={toggleMobileMenu}
        className="md:hidden p-2 text-on-surface-variant/60 hover:text-primary transition-colors mr-2"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Search Section */}
      <div className="flex-1 max-w-xl">
        <div className="flex items-center bg-surface-container-low/40 dark:bg-white/5 px-6 py-2.5 rounded-full group focus-within:ring-2 focus-within:ring-primary/10 transition-all border border-transparent focus-within:border-primary/5 focus-within:scale-[1.01] shadow-inner-premium focus-within:shadow-premium-md">
          <Search className="h-4 w-4 text-on-surface-variant/30 group-focus-within:text-primary transition-all group-focus-within:scale-110" />
          <input
            className="bg-transparent border-none focus:ring-0 text-[11px] font-black w-full placeholder:text-on-surface-variant/20 ml-4 uppercase tracking-[0.2em] mt-0.5 text-on-surface"
            placeholder="Rechercher une ressource, un cours..."
            type="text"
          />
        </div>
      </div>

      {/* Right Actions Container */}
      <div className="flex items-center gap-8">
        {/* Utility Buttons */}
        <div className="flex items-center gap-3 pr-8 border-r border-outline-variant/10 relative">
          <ThemeToggleDark />
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`text-on-surface-variant/40 hover:text-primary transition-all relative p-3 rounded-full hover:bg-primary/[0.03] interactive-element group ${isNotificationsOpen ? 'text-primary bg-primary/[0.03]' : ''}`}
          >
            <Bell className="h-5 w-5 group-hover:scale-110 transition-transform" />
            {unreadCount > 0 && !isNotificationsOpen && (
              <span className="absolute top-2.5 right-2.5 min-w-[18px] h-[18px] px-1 bg-error text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white dark:ring-inverse-surface shadow-lg animate-in zoom-in-50 duration-300">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <NotificationDrawer 
              notifications={notifications}
              onClose={() => setIsNotificationsOpen(false)}
              onMarkRead={markAsRead}
            />
          )}

          <Link 
            href={`/dashboard/${role}/profile`}
            className="text-on-surface-variant/40 hover:text-primary transition-all p-3 rounded-full hover:bg-primary/[0.03] interactive-element group"
          >
            <Settings className="h-5 w-5 group-hover:rotate-45 transition-transform" />
          </Link>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-5 interactive-element group pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-[11px] font-black text-on-surface tracking-tight leading-none mb-1.5 group-hover:text-primary transition-colors">
              {profile?.full_name || 'Utilisateur'}
            </p>
            <p className="text-[9px] text-on-surface-variant/40 font-black uppercase tracking-[0.25em]">
              {profile?.department || role}
            </p>
          </div>
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-primary-container/10 p-0.5 border border-primary/5 shadow-premium-sm group-hover:shadow-premium transition-all">
              <div className="w-full h-full rounded-full bg-primary/5 flex items-center justify-center overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-black text-primary/60">
                    {(profile?.full_name || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-inverse-surface shadow-sm"></div>
          </div>
        </div>
      </div>
    </nav>
  )
}
