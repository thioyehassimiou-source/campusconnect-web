import { requireRole } from '@/lib/auth'
import { StatsCard } from '@/components/ui/StatsCard'
import { AttendanceChart } from '@/components/ui/AttendanceChart'
import { AdminActionsTable } from '@/components/ui/AdminActionsTable'
import { SystemAlerts, QuickActionsGrid } from '@/components/ui/AdminShortcuts'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { 
  Users, 
  School, 
  Badge, 
  Activity, 
  ShieldCheck
} from 'lucide-react'

export default async function AdminDashboard() {
  // Fetch real stats from Supabase - in parallel for performance
  const supabase = await createClient()
  
  const [
    { count: totalUsers },
    { count: totalStudents },
    { count: totalStaff }
  ] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'student'),
    supabase.from('profiles').select('id', { count: 'exact', head: true }).in('role', ['teacher', 'admin'])
  ])

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black font-headline text-primary tracking-tight">Vue d'ensemble du campus</h2>
          <p className="text-on-surface-variant font-medium mt-1">Données consolidées en temps réel pour l'administration.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/logs" className="px-5 py-2.5 bg-surface-container-low text-on-surface-variant rounded-xl text-sm font-bold hover:bg-surface-container-high transition-all shadow-sm">
            Exporter le rapport
          </Link>
          <Link href="/admin/users" className="px-5 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95">
            Actions administratives
          </Link>
        </div>
      </header>

      {/* Bento Grid: Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard 
          title="Total Utilisateurs" 
          value={(totalUsers || 0).toLocaleString()} 
          icon={<Users className="h-6 w-6 text-primary" />}
          trend={{ value: 4.2, label: 'mois', isPositive: true }}
          shape="full"
        />
        <StatsCard 
          title="Étudiants Actifs" 
          value={(totalStudents || 0).toLocaleString()} 
          icon={<School className="h-6 w-6 text-indigo-700" />}
          addon="Actif"
          shape="full"
        />
        <StatsCard 
          title="Personnel" 
          value={(totalStaff || 0).toLocaleString()} 
          icon={<Badge className="h-6 w-6 text-slate-700" />}
          addon="Permanent"
          shape="full"
        />
        <StatsCard 
          title="État du système" 
          value="Opérationnel" 
          icon={<Activity className="h-6 w-6 text-green-700" />}
          isLive
          shape="full"
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <AttendanceChart />
          <AdminActionsTable />
        </div>

        <div className="space-y-8">
          <SystemAlerts />
          <QuickActionsGrid />
          
          {/* Security Visual Card */}
          <div className="bg-primary rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/30 group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                 <ShieldCheck className="h-6 w-6 text-blue-300" />
                 <h4 className="font-headline font-black text-xl tracking-tight">Sécurité Campus</h4>
              </div>
              <p className="text-sm text-blue-100 mb-8 leading-relaxed font-medium">
                Le système de surveillance est actuellement en mode "Haute Performance". Aucun incident signalé.
              </p>
              <div className="flex -space-x-2">
                {[1, 2].map((i) => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/100?u=security${i}`} 
                    alt="Agent" 
                    className="w-9 h-9 rounded-full border-2 border-primary object-cover" 
                  />
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-primary bg-primary-container flex items-center justify-center text-[10px] font-black text-white">
                  +4
                </div>
              </div>
            </div>
            {/* Decorative background elements */}
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="absolute -left-4 -top-4 w-32 h-32 bg-primary-container/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
