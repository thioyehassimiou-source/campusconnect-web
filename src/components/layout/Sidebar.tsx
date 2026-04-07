'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LogOut,
  LayoutDashboard,
  Calendar,
  GraduationCap,
  Mail,
  Book,
  User,
  Settings,
  MapPin,
  ClipboardList,
  FolderOpen,
  LifeBuoy,
  MessagesSquare,
  CreditCard,
  ChevronDown,
  Newspaper,
  Bot,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useUnreadMessages } from '@/features/messaging/hooks/useUnreadMessages'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface NavItem {
  name: string
  href: string
  icon: any
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const roleNavigation: Record<string, NavGroup[]> = {
  student: [
    {
      label: 'Général',
      items: [
        { name: 'Dashboard', href: '/dashboard/student', icon: LayoutDashboard },
        { name: 'Actualités', href: '/dashboard/news', icon: Newspaper },
        { name: 'Assistance IA', href: '/dashboard/student/ai', icon: Bot },
      ]
    },
    {
      label: 'Académie',
      items: [
        { name: 'Emploi du temps', href: '/dashboard/student/schedule', icon: Calendar },
        // { name: 'Supports & Maquettes', href: '/dashboard/student/resources', icon: FolderOpen },
        { name: 'Évaluations', href: '/dashboard/student/assignments', icon: ClipboardList },
        { name: 'Relevés de notes', href: '/dashboard/student/grades', icon: GraduationCap },
        { name: 'Catalogue', href: '/dashboard/courses', icon: BookOpen },
      ]
    },
    {
      label: 'Communication',
      items: [
        { name: 'Messagerie', href: '/dashboard/student/messages', icon: Mail },
        // { name: 'Forum', href: '/dashboard/forum', icon: MessagesSquare },
        { name: 'Assistance', href: '/dashboard/tickets', icon: LifeBuoy },
      ]
    },
    {
      label: 'Campus',
      items: [
        { name: 'Espaces & Labos', href: '/dashboard/student/rooms', icon: MapPin },
        { name: 'Paiements', href: '/dashboard/student/payments', icon: CreditCard },
        { name: 'Profil', href: '/dashboard/student/profile', icon: User },
      ]
    }
  ],
  teacher: [
    {
      label: 'Général',
      items: [
        { name: 'Dashboard', href: '/dashboard/teacher', icon: LayoutDashboard },
        { name: 'Actualités', href: '/dashboard/news', icon: Newspaper },
        { name: 'Assistance IA', href: '/dashboard/teacher/ai', icon: Bot },
      ]
    },
    {
      label: 'Académie',
      items: [
        { name: 'Emploi du temps', href: '/dashboard/teacher/schedule', icon: Calendar },
        { name: 'Mes Cours', href: '/dashboard/teacher/courses', icon: BookOpen },
        // { name: 'Supports de cours', href: '/dashboard/teacher/resources', icon: Book },
        { name: 'Émargements', href: '/dashboard/teacher/attendance', icon: ClipboardCheck },
      ]
    },
    {
      label: 'Communication',
      items: [
        { name: 'Messagerie', href: '/dashboard/teacher/messages', icon: Mail },
        // { name: 'Forum', href: '/dashboard/forum', icon: MessagesSquare },
        { name: 'Assistance', href: '/dashboard/tickets', icon: LifeBuoy },
      ]
    }
  ],
  admin: [
    {
      label: 'Général',
      items: [
        { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
        { name: 'Actualités', href: '/dashboard/news', icon: Newspaper },
      ]
    },
    {
      label: 'Système',
      items: [
        { name: 'Utilisateurs', href: '/admin/users', icon: User },
        { name: 'Paramètres', href: '/admin/settings', icon: Settings },
        { name: 'Logs', href: '/admin/logs', icon: ClipboardList },
      ]
    }
  ]
}

export function Sidebar({ role, profile, isOpen, onClose }: { role: string, profile?: any, isOpen?: boolean, onClose?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigation = roleNavigation[role] || roleNavigation.student

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  useEffect(() => {
    if (!isOpen) { 
      document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '5rem' : '18rem')
    } else {
      document.documentElement.style.setProperty('--sidebar-width', '0px')
    }
  }, [isCollapsed, isOpen])

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-full bg-[#00185F] text-white transition-all duration-300 ease-in-out z-50 flex flex-col shadow-2xl shadow-[#00185F]/20
        ${isCollapsed ? 'md:w-20' : 'md:w-72'}
        ${isOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full md:translate-x-0'}
      `}>
        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3 top-10 w-6 h-6 bg-[#00185F] border border-white/20 rounded-full items-center justify-center shadow-md z-50 group hover:bg-white/10 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3 text-white/70 group-hover:text-white" /> : <ChevronLeft className="h-3 w-3 text-white/70 group-hover:text-white" />}
        </button>

        {/* Brand */}
        <div className={`px-8 mt-10 mb-12 transition-all duration-300 ${isCollapsed ? 'md:px-2 md:items-center md:flex md:flex-col' : ''}`}>
          <Link href="/" className="flex items-center gap-4 group">
            <div className="p-2 rounded-xl bg-white/10 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
              <Image src="/logo-campusconnect.png" alt="Logo" width={24} height={24} className="w-6 h-6 object-contain brightness-0 invert transition-all" />
            </div>
            {(!isCollapsed || isOpen) && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <h1 className="text-base font-black text-white tracking-tight leading-none uppercase">CampusConnect</h1>
                <p className="text-[10px] text-blue-200/90 font-bold uppercase tracking-wider mt-1.5 opacity-80">Université de Labé</p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-8 custom-scrollbar">
          {navigation.map((group, groupIndex) => (group.items.length > 0 && (
            <div key={group.label}>
              {(!isCollapsed || isOpen) && (
                <h3 className="px-4 text-xs font-bold text-blue-300/70 uppercase tracking-widest mb-4">{group.label}</h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href
                  const unreadMessagesCount = useUnreadMessages()
                  const showBadge = item.name === 'Messagerie' && unreadMessagesCount > 0

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={`
                        flex items-center gap-4 py-3.5 md:py-2.5 px-5 md:px-4 rounded-xl transition-all duration-200 group relative
                        ${isActive 
                          ? 'bg-white/10 text-white shadow-sm' 
                          : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
                        }
                      `}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="active-nav-indicator"
                          className="absolute left-0 w-1.5 h-5 bg-blue-400 rounded-r-full"
                        />
                      )}
                      
                      <item.icon className={`h-5 w-5 md:h-4.5 md:w-4.5 shrink-0 transition-all duration-200 ${isActive ? 'text-white' : 'text-blue-100/60 group-hover:text-white'} ${!isActive && 'group-hover:scale-110'}`} />
                      
                      {(!isCollapsed || isOpen) && (
                        <span className={`text-sm tracking-wide ${isActive ? 'font-black' : 'font-semibold'}`}>
                          {item.name}
                        </span>
                      )}
                      
                      {showBadge && (
                         <span className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          )))}
        </nav>

        {/* User Profile Area */}
        <div className="p-4 border-t border-white/10 mt-auto">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 mb-4 group hover:border-white/20 transition-all">
             <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xs font-black text-white overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                   {profile?.avatar_url ? (
                     <img src={profile.avatar_url} className="w-full h-full object-cover" />
                   ) : (profile?.full_name || 'U').charAt(0).toUpperCase()}
                </div>
                {(!isCollapsed || isOpen) && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{profile?.full_name?.split(' ')[0]}</p>
                    <p className="text-xs text-blue-300/80 font-bold uppercase tracking-wider">{role}</p>
                  </div>
                )}
             </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full py-3 px-4 text-rose-300/80 hover:bg-rose-500/20 hover:text-rose-200 transition-all duration-200 rounded-xl group"
          >
            <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            {(!isCollapsed || isOpen) && <span className="text-xs font-bold uppercase tracking-wider">Déconnexion</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
