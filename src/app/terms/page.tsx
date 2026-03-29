import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen font-body p-8 md:p-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-12 hover:gap-4 transition-all">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Link>
        
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-headline font-black text-primary tracking-tighter">Conditions d'Utilisation</h1>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-on-surface-variant font-medium leading-relaxed">
          <section>
            <h2 className="text-xl font-black text-primary uppercase tracking-widest mb-4">Acceptation</h2>
            <p>En accédant à CampusConnect, vous acceptez de respecter le règlement intérieur de l'Université de Labé et les présentes conditions d'utilisation.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-primary uppercase tracking-widest mb-4">Usage</h2>
            <p>L'utilisation de la plateforme est réservée à des fins académiques. Tout usage abusif (fraude, harcèlement) pourra entraîner des sanctions disciplinaires.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-primary uppercase tracking-widest mb-4">Responsabilité</h2>
            <p>L'utilisateur est responsable de la confidentialité de ses identifiants de connexion.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
