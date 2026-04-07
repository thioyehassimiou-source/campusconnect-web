'use client'

import { useState } from 'react'
import { Calendar as CalendarIcon, MessageSquare, Star, Send, CheckCircle2, User } from 'lucide-react'

export default function SupportServices() {
  const [activeTab, setActiveTab] = useState<'appointment' | 'feedback'>('appointment')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="bg-slate-900/40 rounded-[3.5rem] border border-white/5 overflow-hidden">
      <div className="flex border-b border-white/5">
        <button
          onClick={() => setActiveTab('appointment')}
          className={`flex-1 py-6 text-[10px] font-black uppercase tracking-widest transition-all ${
            activeTab === 'appointment' ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Prendre Rendez-vous
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`flex-1 py-6 text-[10px] font-black uppercase tracking-widest transition-all ${
            activeTab === 'feedback' ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Avis & Témoignages
        </button>
      </div>

      <div className="p-10">
        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>
            <h4 className="text-xl font-black text-white mb-2">Demande Envoyée !</h4>
            <p className="text-sm text-slate-400 font-medium">Un conseiller vous contactera sous 24h.</p>
          </div>
        ) : (
          <>
            {activeTab === 'appointment' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <CalendarIcon className="h-5 w-5 text-emerald-500" />
                  <h4 className="font-black text-white uppercase tracking-widest text-xs">Session d'Orientation</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Date</label>
                    <input type="date" className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white text-xs focus:border-emerald-500/50 outline-none" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Heure</label>
                    <select className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white text-xs focus:border-emerald-500/50 outline-none" required>
                      <option>09:00</option>
                      <option>11:00</option>
                      <option>14:00</option>
                      <option>16:00</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Motif de consultation</label>
                  <textarea 
                    placeholder="Ex: Précisions sur les débouchés en MIAGE..."
                    className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white text-xs focus:border-emerald-500/50 outline-none h-24 resize-none"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl shadow-emerald-500/20">
                  Confirmer le Rendez-vous
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <MessageSquare className="h-5 w-5 text-emerald-500" />
                  <h4 className="font-black text-white uppercase tracking-widest text-xs">Partager votre Expérience</h4>
                </div>
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-5 w-5 text-amber-500 fill-amber-500/20 cursor-pointer hover:fill-amber-500 transition-all" />
                  ))}
                </div>
                <textarea 
                  placeholder="Votre avis sur l'orientation reçue..."
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white text-xs focus:border-emerald-500/50 outline-none h-32 resize-none"
                  required
                ></textarea>
                <button type="submit" className="w-full py-4 bg-slate-100 text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  Publier mon Avis
                </button>

                <div className="pt-8 border-t border-white/5 mt-8 space-y-6">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Témoignages récents</p>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-emerald-500" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-300">Alpha Oumar D.</span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                      "Grâce à l'analyse des coefficients, j'ai réalisé que mon profil SM était idéal pour l'Informatique. Très utile !"
                    </p>
                  </div>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </section>
  )
}
