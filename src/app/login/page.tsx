import { login } from './actions'
import { GraduationCap, Mail, Lock, Eye, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const error = params.error

  return (
    <main className="flex min-h-screen">
      {/* Section Gauche: Identité visuelle (Editorial Split) - Identique à Register */}
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
          <h2 className="text-5xl font-headline font-bold leading-tight mb-6">Heureux de vous revoir.</h2>
          <p className="text-white/70 text-lg leading-relaxed font-medium font-body">
            Accédez à votre espace personnel pour suivre vos cours, émargements et ressources en toute sécurité.
          </p>
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[4, 5, 6].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-primary bg-surface-container-low">
                  <img 
                    className="h-full w-full rounded-full object-cover"
                    src={`https://i.pravatar.cc/150?u=${i + 20}`}
                    alt="User"
                  />
                </div>
              ))}
            </div>
            <span className="text-white/60 text-sm font-bold italic font-headline uppercase tracking-widest">Connecté à l'Univ-Labé</span>
          </div>
        </div>
        <div className="relative z-10 text-white/40 text-[10px] font-black tracking-[0.3em] uppercase">
          © 2026 Université de Labé • Powered by CampusConnect
        </div>
      </div>

      {/* Section Droite: Formulaire (Canvas) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-white text-on-surface relative">
        <div className="w-full max-w-md">
          {/* Mobile branding overlay */}
          <div className="lg:hidden absolute top-8 left-8">
            <img src="/logo-campusconnect.png" alt="Logo" className="h-8 w-auto" />
          </div>

          <div className="mb-10 text-center lg:text-left pt-6 lg:pt-0">
            <h2 className="text-4xl font-black text-primary mb-3 font-headline tracking-tighter">Connexion</h2>
            <p className="text-slate-500 text-sm font-medium">Entrez vos identifiants pour accéder à votre portail.</p>
          </div>

          {error && (
            <div className="mb-8 rounded-2xl bg-red-50 p-4 border border-red-100">
              <p className="text-xs font-bold text-red-600 font-medium">{String(error)}</p>
            </div>
          )}

          <form action={login} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email universitaire</label>
              <div className="relative">
                <input 
                  name="email"
                  required
                  type="email"
                  placeholder="nom@univ-campus.fr"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 transition-all font-body text-slate-900 placeholder:text-slate-300"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mot de passe</label>
                <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Oublié ?</Link>
              </div>
              <div className="relative">
                <input 
                  name="password"
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 transition-all font-body text-slate-900 placeholder:text-slate-300"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-primary transition-colors">
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center px-1">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded border-slate-200 text-primary focus:ring-primary/10" />
              <label htmlFor="remember" className="ml-2 text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer">Se souvenir de moi</label>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-primary text-white font-headline font-black uppercase tracking-[0.2em] rounded-3xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all text-xs"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Pas encore de compte ? 
              <Link href="/register" className="text-primary font-black ml-2 hover:underline">S'inscrire</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
