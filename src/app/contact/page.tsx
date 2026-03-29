'use client'

import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import InteractiveElement from '@/components/landing/InteractiveElement'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // In a real app, this would call a server action
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body selection:bg-primary/10">
      {/* Mini Header */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-6 md:px-10 py-4 w-full max-w-screen-2xl mx-auto">
          <Link href="/" className="flex items-center gap-4 group text-primary hover:text-primary/80 transition-all font-headline font-black uppercase tracking-widest text-xs">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Retour
          </Link>
          <div className="flex items-center gap-3">
            <img src="/logo-campusconnect.png" alt="Logo" className="h-8 w-auto" />
            <span className="text-lg font-headline font-black text-primary tracking-tighter">CampusConnect</span>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-5xl lg:text-7xl font-headline font-black text-primary mb-6 tracking-tighter">Nous Contacter</h1>
            <p className="text-xl text-on-surface-variant font-medium max-w-2xl mx-auto leading-relaxed">
              Une question sur votre inscription ? Un problème technique ? Nos équipes sont là pour vous aider.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
              <InteractiveElement className="p-8 bg-white dark:bg-surface rounded-3xl border border-outline-variant/10 shadow-premium">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Email</p>
                    <p className="font-headline font-black text-primary text-sm">support@univ-labe.edu.gn</p>
                  </div>
                </div>
              </InteractiveElement>

              <InteractiveElement className="p-8 bg-white dark:bg-surface rounded-3xl border border-outline-variant/10 shadow-premium">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Téléphone</p>
                    <p className="font-headline font-black text-primary text-sm">+224 000 00 00 00</p>
                  </div>
                </div>
              </InteractiveElement>

              <InteractiveElement className="p-8 bg-white dark:bg-surface rounded-3xl border border-outline-variant/10 shadow-premium">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Localisation</p>
                    <p className="font-headline font-black text-primary text-sm">Campus Universitaire, Labé - République de Guinée</p>
                  </div>
                </div>
              </InteractiveElement>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
              <div className="bg-white dark:bg-surface p-10 lg:p-16 rounded-[4rem] border border-outline-variant/10 shadow-premium-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                
                {submitted ? (
                  <div className="text-center py-20 flex flex-col items-center animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                      <Send className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-3xl font-black text-primary mb-4 font-headline">Message Envoyé !</h3>
                    <p className="text-on-surface-variant font-medium mb-12">Merci de nous avoir contacté. Notre équipe vous répondra sous 24h à 48h.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="px-12 py-5 bg-primary text-white rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-12">
                      <h3 className="text-3xl font-black text-primary mb-4 font-headline">Envoyez-nous un message</h3>
                      <p className="text-on-surface-variant font-medium">Remplissez le formulaire ci-dessous et nous reviendrons vers vous rapidement.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Nom complet</label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-6 py-5 bg-surface-container-low border-none rounded-3xl focus:ring-4 focus:ring-primary/5 transition-all font-body text-on-surface placeholder:text-on-surface-variant/30"
                            placeholder="Votre nom"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Email universitaire</label>
                          <input 
                            required
                            type="email" 
                            className="w-full px-6 py-5 bg-surface-container-low border-none rounded-3xl focus:ring-4 focus:ring-primary/5 transition-all font-body text-on-surface placeholder:text-on-surface-variant/30"
                            placeholder="votre.email@univ-labe.edu.gn"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Sujet</label>
                        <select className="w-full px-6 py-5 bg-surface-container-low border-none rounded-3xl focus:ring-4 focus:ring-primary/5 transition-all font-body text-on-surface appearance-none cursor-pointer">
                          <option>Support Technique</option>
                          <option>Question Académique</option>
                          <option>Problème d'Inscription</option>
                          <option>Autre demande</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Message</label>
                        <textarea 
                          required
                          rows={6}
                          className="w-full px-6 py-5 bg-surface-container-low border-none rounded-3xl focus:ring-4 focus:ring-primary/5 transition-all font-body text-on-surface placeholder:text-on-surface-variant/30 resize-none"
                          placeholder="Comment pouvons-nous vous aider ?"
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        className="w-full lg:w-max px-16 py-6 bg-primary text-white rounded-full font-black uppercase tracking-[0.2em] text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4"
                      >
                        Envoyer le message
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-outline-variant/10 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40">
          © 2026 Université de Labé • CampusConnect Support
        </p>
      </footer>
    </div>
  )
}
