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
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

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
        { name: 'Assistance IA', href: '/dashboard/ai', icon: Bot },
      ]
    },
    {
      label: 'Académie',
      items: [
        { name: 'Emploi du temps', href: '/dashboard/student/schedule', icon: Calendar },
        { name: 'Supports & Maquettes', href: '/dashboard/student/resources', icon: FolderOpen },
        { name: 'Évaluations', href: '/dashboard/student/assignments', icon: ClipboardList },
        { name: 'Relevés de notes', href: '/dashboard/student/grades', icon: GraduationCap },
      ]
    },
    {
      label: 'Campus',
      items: [
        { name: 'Espaces & Labos', href: '/dashboard/student/rooms', icon: MapPin },
        { name: 'Catalogue', href: '/dashboard/courses', icon: BookOpen },
        { name: 'Forum', href: '/dashboard/forum', icon: MessagesSquare },
        { name: 'Contacts', href: '/dashboard/student/contacts', icon: Headset },
      ]
    },
    {
      label: 'Moi',
      items: [
        { name: 'Paiements', href: '/dashboard/student/payments', icon: CreditCard },
        { name: 'Messagerie', href: '/dashboard/student/messages', icon: Mail },
        { name: 'Support', href: '/dashboard/tickets', icon: LifeBuoy },
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
        { name: 'Assistance IA', href: '/dashboard/ai', icon: Bot },
      ]
    },
    {
      label: 'Gestion',
      items: [
        { name: 'Emploi du temps', href: '/dashboard/teacher/schedule', icon: Calendar },
        { name: 'Émargements', href: '/dashboard/teacher/attendance', icon: ClipboardCheck },
        { name: 'Mes Cours', href: '/dashboard/teacher/courses', icon: BookOpen },
        { name: 'Supports de cours', href: '/dashboard/teacher/resources', icon: Book },
      ]
    },
    {
      label: 'Communication',
      items: [
        { name: 'Messagerie', href: '/dashboard/teacher/messages', icon: Mail },
        { name: 'Forum', href: '/dashboard/forum', icon: MessagesSquare },
        { name: 'Support', href: '/dashboard/tickets', icon: LifeBuoy },
      ]
    }
  ]
}

export function Sidebar({ role, profile }: { role: string, profile?: any }) {
  const pathname = usePathname()
  const router = useRouter()
  const navigation = roleNavigation[role] || roleNavigation.student

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-white flex flex-col py-8 border-r border-outline-variant/5 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="px-8 mb-12">
        <h1 className="text-2xl font-black text-primary tracking-tighter font-headline">Univ-Labé</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] opacity-50">Portail Officiel</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-8 custom-scrollbar">
        {navigation.map((group) => (
          <div key={group.label}>
            <h3 className="px-4 text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] mb-4">{group.label}</h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center gap-4 py-3.5 px-4 rounded-2xl transition-all duration-300 group
                      ${isActive 
                        ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' 
                        : 'text-on-surface-variant hover:bg-surface-container-low hover:translate-x-1'
                      }
                    `}
                  >
                    <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-on-surface-variant/50 group-hover:text-primary transition-colors'}`} />
                    <span className={`text-xs ${isActive ? 'font-black' : 'font-bold'}`}>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-6 mt-8 pt-8 border-t border-outline-variant/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full py-4 px-4 text-on-surface-variant hover:bg-error/5 hover:text-error transition-all rounded-2xl group"
        >
          <LogOut className="h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
          <span className="text-xs font-black uppercase tracking-widest">Quitter</span>
        </button>
      </div>
    </aside>
  )
}
