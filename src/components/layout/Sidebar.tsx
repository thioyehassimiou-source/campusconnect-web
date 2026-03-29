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
  Headset,
  BookOpen,
  ClipboardCheck,
  Newspaper,
  Bot,
  LifeBuoy,
  MessagesSquare,
  CreditCard,
  ChevronDown
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useUnreadMessages } from '@/features/messaging/hooks/useUnreadMessages'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
        { name: 'Supports & Maquettes', href: '/dashboard/student/resources', icon: FolderOpen },
        { name: 'Évaluations', href: '/dashboard/student/assignments', icon: ClipboardList },
        { name: 'Relevés de notes', href: '/dashboard/student/grades', icon: GraduationCap },
        { name: 'Catalogue', href: '/dashboard/courses', icon: BookOpen },
      ]
    },
    {
      label: 'Communication',
      items: [
        { name: 'Messagerie', href: '/dashboard/student/messages', icon: Mail },
        { name: 'Forum', href: '/dashboard/forum', icon: MessagesSquare },
        { name: 'Assistance', href: '/dashboard/tickets', icon: LifeBuoy },
      ]
    },
    {
      label: 'Campus',
      items: [
        { name: 'Espaces & Labos', href: '/dashboard/student/rooms', icon: MapPin },
        { name: 'Paiements', href: '/dashboard/student/payments', icon: CreditCard },
        { name: 'Contacts', href: '/dashboard/student/contacts', icon: Headset },
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
        { name: 'Supports de cours', href: '/dashboard/teacher/resources', icon: Book },
        { name: 'Émargements', href: '/dashboard/teacher/attendance', icon: ClipboardCheck },
      ]
    },
    {
      label: 'Communication',
      items: [
        { name: 'Messagerie', href: '/dashboard/teacher/messages', icon: Mail },
        { name: 'Forum', href: '/dashboard/forum', icon: MessagesSquare },
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
      // Use rems instead of px to scale perfectly with global font-size changes
      document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '6rem' : '18rem')
    } else {
      document.documentElement.style.setProperty('--sidebar-width', '0px')
    }
  }, [isCollapsed, isOpen])

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-full bg-white dark:bg-surface/95 backdrop-blur-sm border-r border-outline-variant/10 transition-all duration-500 ease-in-out z-50 shadow-premium flex flex-col
        ${isCollapsed ? 'md:w-24' : 'md:w-72'}
        ${isOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full md:translate-x-0'}
      `}>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3.5 top-12 w-7 h-7 bg-white dark:bg-surface-container-highest border border-outline-variant/20 rounded-full items-center justify-center shadow-premium interactive-element z-50 group"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        <div className={`px-8 mt-12 mb-12 transition-all duration-500 ${isCollapsed ? 'md:px-4 md:items-center md:flex md:flex-col' : ''}`}>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-11 h-11 rounded-[var(--radius-standard)] bg-primary/5 dark:bg-primary/10 flex items-center justify-center interactive-element shrink-0 p-2">
              <img src="/logo-campusconnect.png" alt="Logo" className="h-full w-auto object-contain" />
            </div>
            {(!isCollapsed || isOpen) && <h1 className="text-2xl font-black text-primary tracking-tighter font-headline animate-in fade-in slide-in-from-left-2 duration-500">CampusConnect</h1>}
          </div>
          {(!isCollapsed || isOpen) && (
            <div className="flex items-center gap-2 mt-2 ml-1 animate-in fade-in slide-in-from-left-2 duration-700">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.25em] opacity-30">Portail Officiel</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-4 space-y-9 custom-scrollbar">
          {navigation.map((group, groupIndex) => (
            <div key={group.label} className="entrance-right" style={{ animationDelay: `${200 + groupIndex * 100}ms` }}>
              <h3 className="px-5 text-[9px] font-black text-on-surface-variant/30 uppercase tracking-[0.35em] mb-5">{group.label}</h3>
              <div className="space-y-1.5">
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
                        flex items-center gap-4 py-4 px-5 rounded-[var(--radius-standard)] transition-all duration-300 group relative interactive-element
                        ${isActive 
                          ? 'bg-primary text-white shadow-premium scale-[1.02]' 
                          : 'text-on-surface-variant/60 hover:bg-primary/5 hover:text-primary hover:translate-x-1'
                        }
                      `}
                    >
                      <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-white' : 'text-on-surface-variant/30 group-hover:text-primary transition-all group-hover:scale-110'}`} />
                      {(!isCollapsed || isOpen) && <span className="text-[11px] font-black uppercase tracking-widest leading-none animate-in fade-in slide-in-from-left-2 duration-300">{item.name}</span>}
                      
                      {showBadge && (
                         <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-error rounded-full shadow-[0_0_8px_rgba(186,26,26,0.5)] animate-pulse" />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="px-6 mt-8 py-8 border-t border-outline-variant/10">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-4 w-full py-4.5 px-5 text-on-surface-variant/40 hover:bg-error/5 hover:text-error transition-all rounded-[var(--radius-standard)] group ${isCollapsed && !isOpen ? 'md:justify-center' : ''}`}
          >
            <LogOut className="h-5 w-5 group-hover:opacity-100 group-hover:-translate-x-1 transition-all shrink-0" />
            {(!isCollapsed || isOpen) && <span className="text-[11px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-left-2 duration-300">Déconnexion</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
