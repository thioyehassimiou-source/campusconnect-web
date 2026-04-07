import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import RegistrationForm from './RegistrationForm'
import { Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const error = params.error as string | undefined

  const supabase = await createClient()
  
  const { data: faculties } = await supabase.from('faculties').select('id, name').order('id')
  const { data: departments } = await supabase.from('departments').select('id, name, faculty_id').order('id')
  const { data: services } = await supabase.from('services').select('id, name').order('id')

  return (
    <main className="flex min-h-screen bg-white overflow-hidden font-body">
      {/* Section Gauche: Identité visuelle */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 bg-primary overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-white/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="p-2 bg-white rounded-xl shadow-lg">
              <Image src="/logo-campusconnect.png" alt="Logo" width={28} height={28} className="w-7 h-7 object-contain" />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-white uppercase font-headline">CampusConnect</h1>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-6xl font-black text-white leading-[0.9] tracking-tighter mb-8 font-headline">
            Tracez votre <br/>
            <span className="text-blue-200 italic">Avenir.</span>
          </h2>
          <p className="text-blue-100 text-lg font-medium leading-relaxed opacity-80">
            Rejoignez la plateforme numérique phare de l'Université de Labé.
          </p>
        </div>

        <div className="relative z-10 text-[10px] font-black text-blue-200/50 uppercase tracking-[0.4em]">
          © 2026 Université de Labé
        </div>
      </div>

      {/* Section Droite: Formulaire */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 relative overflow-y-auto">
        <div className="w-full max-w-md relative z-10">
          <div className="mb-10">
            <Link href="/" className="lg:hidden flex items-center gap-2 w-fit px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-primary uppercase tracking-widest mb-8 hover:bg-slate-100 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter font-headline">Inscription</h2>
            <p className="text-slate-400 text-sm font-medium">Rejoignez-nous en quelques étapes.</p>
          </div>

          <RegistrationForm 
            faculties={faculties || []} 
            departments={departments || []} 
            services={services || []} 
            error={error}
          />
        </div>
      </div>
    </main>
  )
}
