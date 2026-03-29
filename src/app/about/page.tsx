'use client'

import Link from 'next/link'
import { ArrowLeft, GraduationCap, Users, ShieldCheck, Zap } from 'lucide-react'
import InteractiveElement from '@/components/landing/InteractiveElement'

export default function AboutPage() {
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
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="mb-24 text-center">
            <h1 className="text-5xl lg:text-7xl font-headline font-black text-primary mb-8 tracking-tighter">
              L'Éducation, <br/>
              <span className="text-primary-container bg-primary/5 px-4 rounded-2xl italic">Connectée.</span>
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed font-medium max-w-2xl mx-auto">
              CampusConnect est la plateforme pionnière de transformation numérique pour l'Université de Labé, conçue pour unifier les services académiques et administratifs.
            </p>
          </section>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-32">
            <InteractiveElement className="p-10 bg-white dark:bg-surface rounded-[3rem] border border-outline-variant/10 shadow-premium">
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-black text-primary mb-4 font-headline">Notre Mission</h3>
              <p className="text-on-surface-variant font-medium leading-relaxed">
                Faciliter l'accès aux ressources pédagogiques et simplifier la gestion administrative pour chaque étudiant et enseignant de la République de Guinée.
              </p>
            </InteractiveElement>

            <InteractiveElement className="p-10 bg-white dark:bg-surface rounded-[3rem] border border-outline-variant/10 shadow-premium">
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-black text-primary mb-4 font-headline">Notre Vision</h3>
              <p className="text-on-surface-variant font-medium leading-relaxed">
                Devenir le standard de l'excellence numérique universitaire, favorisant l'innovation et la transparence dans tout le parcours académique.
              </p>
            </InteractiveElement>
          </div>

          {/* Content Body */}
          <section className="prose prose-slate max-w-none mb-32">
            <h2 className="text-3xl font-black text-primary font-headline mb-8">Pourquoi CampusConnect ?</h2>
            <div className="space-y-6 text-lg text-on-surface-variant font-medium leading-relaxed">
              <p>
                Face aux défis de la modernisation académique, l'Université de Labé a choisi de placer le numérique au cœur de sa stratégie. CampusConnect n'est pas seulement un portail ; c'est un écosystème complet.
              </p>
              <p>
                De la gestion des cours à l'émargement sécurisé par QR Code, nous avons développé des outils spécifiques pour garantir une traçabilité parfaite et une communication fluide entre le rectorat, les facultés et les étudiants.
              </p>
            </div>
          </section>

          {/* Key Values Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-outline-variant/10 py-16">
            {[
              { icon: Users, label: '+5000 Utilisateurs' },
              { icon: ShieldCheck, label: 'Sécurisé' },
              { icon: Zap, label: 'Temps Réel' },
              { icon: GraduationCap, label: 'Excellence' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <item.icon className="h-8 w-8 text-primary/40" />
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 text-center">{item.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <section className="bg-primary p-16 rounded-[4rem] text-center text-white shadow-2xl shadow-primary/30">
            <h2 className="text-3xl lg:text-4xl font-headline font-black mb-6">Prêt à nous rejoindre ?</h2>
            <p className="text-white/70 mb-10 max-w-lg mx-auto font-medium">L'aventure numérique de l'Université de Labé commence ici.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/register" className="px-10 py-5 bg-white text-primary rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all">
                S'inscrire
              </Link>
              <Link href="/contact" className="px-10 py-5 border-2 border-white/20 hover:bg-white/10 text-white rounded-full font-black uppercase tracking-widest text-xs transition-all">
                Nous contacter
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-12 border-t border-outline-variant/10 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40">
          © 2026 Université de Labé • CampusConnect V4.0
        </p>
      </footer>
    </div>
  )
}
