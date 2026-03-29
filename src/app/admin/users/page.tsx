import { requireRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { 
  User as UserIcon, 
  Shield, 
  Mail, 
  Calendar,
  MoreVertical,
  Search
} from 'lucide-react'
import RoleSelector from './RoleSelector'

export default async function AdminUsersPage() {
  await requireRole(['admin'])
  const supabase = await createClient()

  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* ... header remains same ... */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-primary tracking-tighter mb-2 font-headline">
            Gestion des Utilisateurs
          </h1>
          <p className="text-on-surface-variant font-medium text-lg opacity-80">
            Administrez les comptes et les rôles de la plateforme.
          </p>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Rechercher un utilisateur..." 
            className="pl-12 pr-6 py-4 bg-surface-container-low rounded-2xl border border-outline-variant/5 w-full md:w-[400px] font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant/10">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/50">Utilisateur</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/50">Rôle</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/50">Details</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-sm group-hover:scale-110 transition-transform">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt="" className="w-full h-full rounded-2xl object-cover" />
                        ) : (
                          <UserIcon className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        <p className="font-black text-on-surface tracking-tight">{user.full_name}</p>
                        <p className="text-xs text-on-surface-variant font-bold opacity-60 flex items-center gap-1.5">
                           <Mail className="h-3 w-3" /> {user.student_id || 'ID non défini'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <RoleSelector userId={user.id} currentRole={user.role} />
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-on-surface-variant flex items-center gap-2">
                        <Calendar className="h-3 w-3 opacity-40" /> 
                        Inscrit le {new Date(user.created_at).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">{user.faculty || 'Interne'}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all border border-transparent hover:border-outline-variant/10 hover:shadow-sm">
                      <MoreVertical className="h-5 w-5 text-on-surface-variant/40" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
