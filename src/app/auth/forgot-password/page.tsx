'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'
import Link from 'next/link'
import { ArrowLeft, Mail, Send } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  
  const { toast } = useToast()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) throw error
      
      setSent(true)
      toast('Lien de réinitialisation envoyé !', 'success')
    } catch (err: any) {
      toast(err.message || 'Une erreur est survenue.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-xl">
        <Link href="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour
        </Link>

        <h1 className="text-3xl font-black text-white mb-4">Mot de passe oublié ?</h1>
        <p className="text-slate-400 text-sm font-medium mb-10">
          Entrez votre adresse email universitaire pour recevoir un lien de réinitialisation.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@univ-labe.edu.gn"
                  className="w-full pl-16 pr-6 py-5 bg-white/[0.03] border border-white/5 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all font-bold"
                />
              </div>
            </div>

            <Button type="submit" className="w-full py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-900/20" disabled={loading}>
              {loading ? 'Envoi...' : 'Envoyer le lien'}
              {!loading && <Send className="w-4 h-4 ml-2" />}
            </Button>
          </form>
        ) : (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Vérifiez votre boîte mail</h2>
            <p className="text-slate-400 text-sm mb-8">Nous avons envoyé un lien à <span className="text-emerald-400 font-bold">{email}</span>.</p>
            <Link href="/login" className="inline-flex items-center justify-center rounded-2xl bg-slate-900 text-white border border-white/5 w-full py-4 text-sm font-bold hover:bg-slate-800 transition-colors">
              Retour à la connexion
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
