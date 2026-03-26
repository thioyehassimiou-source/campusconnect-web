'use client'

import { Bell, Search, Settings } from 'lucide-react'
import Link from 'next/link'

export function Navbar({ role, profile }: { role: string, profile: any }) {
  return (
    <header className="h-16 fixed top-0 right-0 left-64 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 z-40 border-b border-gray-100">
      <div className="flex items-center bg-surface-container-low px-4 py-1.5 rounded-full w-96 group focus-within:ring-2 focus-within:ring-primary/10 transition-all">
        <Search className="h-4 w-4 text-outline group-focus-within:text-primary transition-colors" />
        <input
          className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-outline/60 ml-2"
          placeholder="Rechercher un cours, un prof..."
          type="text"
        />
      </div>

      <div className="flex items-center gap-6">
        <Link href="/dashboard/notifications" className="text-slate-500 hover:text-blue-700 transition-all relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-white"></span>
        </Link>
        <button className="text-slate-500 hover:text-blue-700 transition-all p-2 rounded-full hover:bg-gray-100">
          <Settings className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-surface-variant/50">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-on-surface tracking-tight">
              {profile?.full_name || 'Utilisateur'}
            </p>
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
              {profile?.department || role}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden ring-2 ring-primary/10">
            {profile?.avatar_url ? (
               <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
               <span className="text-xs font-bold text-primary">
                 {(profile?.full_name || 'U').charAt(0).toUpperCase()}
               </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
