import { resetPassword } from '../login/actions'
import { GraduationCap, ArrowLeft, Mail } from 'lucide-react'
import Link from 'next/link'
import { SubmitButton } from '@/components/ui/SubmitButton'

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const error = params.error

  return (
    <main className="flex min-h-screen">
      {/* Section Gauche: Identité visuelle */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover mix-blend-overlay opacity-20"
            alt="University Library"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC90xq0bAp2LpzOuJLA9wey7W2zmDbba8ycB_4INEOHuv1InB6g5-MRUKiZGkyHxhcsGa-6RaKmLGJfUEDPnbsmJWpYUsU7XB7Sc-pZytJakajsdRt0ZZ-Ncno-n0VTCMgKw5Vl1iUBAd_tK94U1E-m9tezbaOgYCqUaCJZCpp-E6fQ2g3EPhpQalQD828sHhr5Tgyg_pAxgt6FFyUPdeTGKTSs967WfWsC-y0hQ5ouDkPtqiw3yZF___GUx6tFw7xxR2s66LGPT-w"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-transparent opacity-95"></div>
        </div>
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo-campusconnect.png" alt="Logo" className="h-8 w-auto border-none" />
            <h1 className="text-2xl font-headline font-extrabold tracking-tight text-white">CampusConnect</h1>
          </Link>
        </div>
        <div className="relative z-10 max-w-lg text-white">
          <h2 className="text-5xl font-headline font-bold leading-tight mb-6">Récupération de compte.</h2>
          <p className="text-white/70 text-lg leading-relaxed font-medium font-body">
            Ne vous inquiétez pas, cela arrive. Entrez votre matricule et nous vous enverrons un lien de réinitialisation.
          </p>
        </div>
        <p className="relative z-10 text-white/40 text-xs font-bold uppercase tracking-widest">
            © 2026 CampusConnect • Sécurité Prioritaire
        </p>
      </div>

      {/* Section Droite: Formulaire */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-white text-on-surface relative">
        <div className="w-full max-w-md">
          <Link href="/login" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-12 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Retour à la connexion</span>
          </Link>

          <div className="mb-10 text-center lg:text-left pt-6 lg:pt-0">
            <h2 className="text-4xl font-black text-primary mb-3 font-headline tracking-tighter">Mot de passe oublié</h2>
            <p className="text-slate-500 text-sm font-medium">Un lien de réinitialisation sera envoyé à votre adresse institutionnelle.</p>
          </div>

          {error && (
            <div className="mb-8 rounded-2xl bg-red-50 p-4 border border-red-100 animate-in fade-in slide-in-from-top-4 duration-500">
              <p className="text-xs font-bold text-red-600">
                {String(error)}
              </p>
            </div>
          )}

          <form action={resetPassword} className="space-y-6" autoComplete="off">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Matricule (INE)</label>
              <div className="relative">
                <input 
                  name="student_id"
                  required
                  type="text"
                  pattern="^[A-Z]{4}\d{10}$"
                  title="Le matricule doit contenir 4 lettres suivies de 10 chiffres"
                  placeholder="Ex: TTHA1585331656"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 transition-all font-body text-slate-900 placeholder:text-slate-300 uppercase"
                />
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
              </div>
            </div>

            <SubmitButton 
              className="w-full py-5 bg-primary text-white font-headline font-black uppercase tracking-[0.2em] rounded-3xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all text-xs"
            >
              Envoyer le lien
            </SubmitButton>
          </form>

          <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
             <Mail className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
             <p className="text-xs text-slate-500 leading-relaxed font-medium">
               Le lien sera envoyé à l'adresse se terminant par <span className="text-slate-900 font-bold">@campusconnect.local</span>. Si vous n'avez pas accès à votre messagerie, veuillez contacter le service informatique.
             </p>
          </div>
        </div>
      </div>
    </main>
  )
}
