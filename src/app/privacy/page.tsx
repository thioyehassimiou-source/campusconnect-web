import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen font-body p-8 md:p-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-12 hover:gap-4 transition-all">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Link>
        
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-headline font-black text-primary tracking-tighter">Politique de Confidentialité</h1>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-on-surface-variant font-medium leading-relaxed">
          <section>
            <h2 className="text-xl font-black text-primary uppercase tracking-widest mb-4">Introduction</h2>
            <p>L'Université de Labé s'engage à protéger la vie privée de ses étudiants et de son personnel. Cette politique décrit comment CampusConnect collecte et utilise vos données.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-primary uppercase tracking-widest mb-4">Collecte des Données</h2>
            <p>Nous collectons les informations nécessaires à votre parcours académique : nom, email universitaire, numéro d'étudiant, et données d'émargement.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-primary uppercase tracking-widest mb-4">Utilisation</h2>
            <p>Vos données sont exclusivement utilisées pour la gestion pédagogique, le suivi des présences et la communication officielle de l'université.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
