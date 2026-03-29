import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import RegistrationForm from './RegistrationForm'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const error = params.error as string | undefined

  const supabase = await createClient()
  
  // Fetch faculties (priority to 'nom' over 'name')
  const { data: faculties, error: facError } = await supabase
    .from('faculties')
    .select('id, nom')
    .order('id')

  // Fetch departments (priority to 'nom' over 'name')
  const { data: departments, error: depError } = await supabase
    .from('departments')
    .select('id, nom, faculty_id')
    .order('id')

  // Fetch services (priority to 'nom' over 'name')
  const { data: services, error: servError } = await supabase
    .from('services')
    .select('id, nom')
    .order('id')

  if (facError) console.warn('Faculties error:', facError.message)
  if (depError) console.warn('Departments error:', depError.message)
  if (servError) console.warn('Services error:', servError.message)

  return (
    <main className="flex min-h-screen">
      {/* Section Gauche: Identité visuelle (Editorial Split) */}
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
        <div className="relative z-10 max-w-lg">
          <h2 className="text-5xl font-headline font-bold text-white leading-tight mb-6">Rejoignez l'excellence à Labé.</h2>
          <p className="text-white/70 text-lg leading-relaxed font-medium font-body">
            Accédez à vos cours, émargements et ressources académiques de l'Université de Labé via votre portail personnel sécurisé.
          </p>
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-primary bg-surface-container-low">
                  <img 
                    className="h-full w-full rounded-full object-cover"
                    src={`https://i.pravatar.cc/150?u=${i + 10}`}
                    alt="User"
                  />
                </div>
              ))}
            </div>
            <span className="text-white/60 text-sm font-bold italic font-headline uppercase tracking-widest">+5,000 Étudiants Actifs</span>
          </div>
        </div>
        <div className="relative z-10 text-white/40 text-[10px] font-black tracking-[0.3em] uppercase">
          © 2026 Université de Labé • Powered by CampusConnect
        </div>
      </div>

      {/* Section Droite: Formulaire (Canvas) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-white text-on-surface relative overflow-y-auto">
        {/* Mobile Header Overlay */}
        <div className="lg:hidden absolute top-8 left-8 z-20">
          <img src="/logo-campusconnect.png" alt="Logo" className="h-8 w-auto" />
        </div>
        
        <RegistrationForm 
          faculties={faculties || []} 
          departments={departments || []} 
          services={services || []} 
          error={error}
        />
      </div>
    </main>
  )
}
