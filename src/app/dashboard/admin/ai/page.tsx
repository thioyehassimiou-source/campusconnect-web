import { requireRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Bot, BarChart3, Zap, AlertCircle, CheckCircle2, Clock } from 'lucide-react'

export default async function AdminAIAnalyticsPage() {
  await requireRole(['admin'])

  const supabase = await createClient()

  const { data: analytics } = await supabase
    .from('ai_analytics')
    .select('*, profile:profiles(full_name, role)')
    .order('created_at', { ascending: false })
    .limit(50)

  const totalCalls = analytics?.length || 0
  const totalActions = analytics?.filter(a => a.query_type === 'workflow_step').length || 0
  const uniqueUsers = new Set(analytics?.map(a => a.profile_id)).size

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-in fade-in duration-700">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-primary tracking-tighter mb-1">Analytics IA</h2>
        <p className="text-on-surface-variant font-medium opacity-70 text-sm">Suivi en temps réel de l'usage de l'Agent Actif</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <StatCard icon={Bot} label="Requêtes totales" value={totalCalls} />
        <StatCard icon={Zap} label="Actions déclenchées" value={totalActions} />
        <StatCard icon={BarChart3} label="Utilisateurs actifs" value={uniqueUsers} />
      </div>

      {/* Logs */}
      <div className="bg-white rounded-[2.5rem] border border-outline-variant/10 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-outline-variant/5">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-on-surface-variant/50">Journal d'activité IA</h3>
        </div>
        <div className="divide-y divide-outline-variant/5">
          {analytics && analytics.length > 0 ? analytics.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-6 hover:bg-surface-container-low/20 transition-colors">
              <div className="flex items-center gap-5">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${entry.query_type === 'workflow_step' ? 'bg-primary/5 text-primary' : 'bg-surface-container-high text-on-surface-variant/40'}`}>
                  {entry.query_type === 'workflow_step' ? <Zap className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-sm font-black text-on-surface">
                    {entry.profile?.full_name || 'Utilisateur inconnu'}
                    <span className="ml-2 text-[9px] font-black uppercase tracking-widest text-on-surface-variant/30">{entry.profile?.role}</span>
                  </p>
                  <p className="text-[10px] text-on-surface-variant/40 font-medium">
                    {entry.action_triggered ? `→ ${entry.action_triggered}` : 'Requête conversationnelle'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/30">
                    {entry.model_used?.replace('-versatile', '')}
                  </p>
                  <div className={`flex items-center gap-1 text-[9px] font-black uppercase ${entry.status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                    {entry.status === 'success' ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                    {entry.status}
                  </div>
                </div>
                <p className="text-[9px] font-black text-on-surface-variant/30 whitespace-nowrap flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(entry.created_at).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                </p>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 text-on-surface-variant/30">
              <Bot className="h-10 w-10 mx-auto mb-4" />
              <p className="text-xs font-black uppercase tracking-widest">Aucune activité IA enregistrée</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value }: { icon: any, label: string, value: number }) {
  return (
    <div className="p-8 bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
      <Icon className="h-5 w-5 text-primary mb-4" />
      <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">{label}</p>
      <p className="text-4xl font-black tracking-tighter text-primary">{value}</p>
    </div>
  )
}
