import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="bg-surface text-on-surface selection:bg-secondary-container selection:text-on-secondary-container min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-6 md:px-10 py-4 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3">
            <img src="/logo-campusconnect.png" alt="CampusConnect Logo" className="h-10 w-auto" />
            <div className="flex flex-col">
              <div className="text-xl font-headline font-black text-primary leading-tight tracking-tighter">CampusConnect</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-primary-container leading-none opacity-80">Université de Labé</div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-10 font-headline font-bold text-xs uppercase tracking-widest text-on-surface-variant">
            <a className="text-primary border-b-2 border-primary pb-1" href="#features">Services</a>
            <a className="hover:text-primary transition-all duration-300" href="#faculties">Facultés</a>
            <a className="hover:text-primary transition-all duration-300" href="#">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="px-4 py-2 text-primary font-headline font-black text-xs uppercase tracking-widest hover:bg-surface-container-low transition-all duration-300 rounded-xl">
              Connexion
            </Link>
            <Link href="/register" className="px-6 py-3 bg-primary text-white font-headline font-black text-xs uppercase tracking-widest rounded-2xl active:scale-95 transition-transform duration-200 shadow-xl shadow-primary/20 hover:bg-primary-container">
              Inscription
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative px-6 md:px-10 py-16 lg:py-32 max-w-screen-2xl mx-auto overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-[10px] font-black tracking-[0.2em] text-primary uppercase bg-secondary-container/50 rounded-full border border-primary/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Innovation Académique en Guinée
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-primary leading-[1] mb-8 tracking-tighter font-headline">
                L'Excellence <br/>
                <span className="text-primary-container opacity-90 italic">Redéfinie.</span>
              </h1>
              <p className="text-xl text-on-surface-variant leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0 font-body font-medium">
                Découvrez CampusConnect, le portail numérique officiel de l'Université de Labé. Une plateforme intégrée pour une gestion académique fluide et performante.
              </p>
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <Link href="/register" className="px-10 py-5 bg-primary text-white font-black uppercase tracking-[0.2em] text-xs rounded-[2rem] shadow-2xl shadow-primary/30 hover:scale-105 transition-all duration-300 font-headline">
                  Commencer l'aventure
                </Link>
                <button className="px-10 py-5 border-2 border-outline-variant text-primary font-black uppercase tracking-[0.2em] text-xs rounded-[2rem] hover:bg-white transition-all duration-300 active:scale-95 font-headline">
                  Découvrir nos services
                </button>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-container rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-4 rounded-[3rem] shadow-2xl overflow-hidden border border-outline-variant/5">
                <img 
                  alt="Université de Labé" 
                  className="w-full h-auto rounded-[2.5rem] object-cover aspect-[4/3] grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgXeqgPZFrWKb_BlbXYVxL3WKFSJTbIaNzzywqdf921EGF8ceTfxigKXfZ2u2nfjv2cjBhM24vun0Vu1GxLsE22nSSJ9Ou6eT44F7rEaYuywLUTdnstQhcvz0lheJYXmkup0DKQhK4LukJL8TW8qNfIourbSDw17l7cAD_et8yoHlOspHumZ25hK7Ht6_FfvJhxzrsunjfDGMUlZBFw918b4Sq9122zXUg_fDg-noD8l1J2jV0ql7mWbFcpFi97clNjhYg71EX8pc"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Real Data Social Proof */}
        <section className="py-24 bg-surface-container-low border-y border-outline-variant/10">
          <div className="max-w-screen-2xl mx-auto px-10 text-center">
            <p className="font-label text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-16">Nos Chiffres Clés</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24">
              <div className="flex flex-col items-center group">
                <span className="text-5xl lg:text-6xl font-headline font-black text-primary tracking-tighter transition-transform group-hover:scale-110">+5000</span>
                <span className="text-[10px] font-label text-on-surface-variant font-black uppercase tracking-widest opacity-60 mt-2">Étudiants Actifs</span>
              </div>
              <div className="flex flex-col items-center group">
                <span className="text-5xl lg:text-6xl font-headline font-black text-primary tracking-tighter transition-transform group-hover:scale-110">3</span>
                <span className="text-[10px] font-label text-on-surface-variant font-black uppercase tracking-widest opacity-60 mt-2">Facultés d'Excellence</span>
              </div>
              <div className="flex flex-col items-center group">
                <span className="text-5xl lg:text-6xl font-headline font-black text-primary tracking-tighter transition-transform group-hover:scale-110">15+</span>
                <span className="text-[10px] font-label text-on-surface-variant font-black uppercase tracking-widest opacity-60 mt-2">Filières de Licence</span>
              </div>
              <div className="flex flex-col items-center group">
                <span className="text-5xl lg:text-6xl font-headline font-black text-primary tracking-tighter transition-transform group-hover:scale-110">100%</span>
                <span className="text-[10px] font-label text-on-surface-variant font-black uppercase tracking-widest opacity-60 mt-2">Digitalisé</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section (Fixed Layout) */}
        <section id="features" className="py-40 px-6 md:px-10 max-w-screen-2xl mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-5xl lg:text-6xl font-black text-primary mb-8 tracking-tighter font-headline">Services Intégrés</h2>
            <div className="w-24 h-2 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="group p-12 bg-white rounded-[3.5rem] border border-outline-variant/10 hover:border-primary/20 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-[2rem] bg-secondary-container/30 flex items-center justify-center mb-10 group-hover:bg-primary group-hover:rotate-12 transition-all duration-500">
                <span className="material-symbols-outlined text-5xl text-primary group-hover:text-white transition-colors">calendar_month</span>
              </div>
              <h3 className="text-3xl font-black text-primary mb-6 tracking-tight font-headline">Gestion Académique</h3>
              <p className="text-lg text-on-surface-variant leading-relaxed font-medium">
                Accès en temps réel aux emplois du temps, relevés de notes et suivi des crédits ECTS pour chaque semestre.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="group p-12 bg-white rounded-[3.5rem] border border-outline-variant/10 hover:border-primary/20 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-[2rem] bg-secondary-container/30 flex items-center justify-center mb-10 group-hover:bg-primary group-hover:rotate-12 transition-all duration-500">
                <span className="material-symbols-outlined text-5xl text-primary group-hover:text-white transition-colors">forum</span>
              </div>
              <h3 className="text-3xl font-black text-primary mb-6 tracking-tight font-headline">Communication</h3>
              <p className="text-lg text-on-surface-variant leading-relaxed font-medium">
                Forums de discussion par matière, messagerie sécurisée et notifications instantanées du Rectorat.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="group p-12 bg-white rounded-[3.5rem] border border-outline-variant/10 hover:border-primary/20 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-[2rem] bg-secondary-container/30 flex items-center justify-center mb-10 group-hover:bg-primary group-hover:rotate-12 transition-all duration-500">
                <span className="material-symbols-outlined text-5xl text-primary group-hover:text-white transition-colors">qr_code_scanner</span>
              </div>
              <h3 className="text-3xl font-black text-primary mb-6 tracking-tight font-headline">Émargements</h3>
              <p className="text-lg text-on-surface-variant leading-relaxed font-medium">
                Validation des présences via QR Code sécurisé pour un suivi automatisé et transparent de l'assiduité.
              </p>
            </div>
          </div>
        </section>

        {/* Faculties Section (Real Data) */}
        <section id="faculties" className="py-32 bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-container/20 -skew-x-12 translate-x-1/2"></div>
          <div className="max-w-screen-2xl mx-auto px-10 relative z-10">
            <h2 className="text-5xl lg:text-7xl font-black mb-20 tracking-tighter text-center lg:text-left font-headline">Nos Facultés</h2>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="p-10 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all">
                <h4 className="text-2xl font-black mb-6 text-tertiary-fixed-dim font-headline">Sciences & Techniques (FST)</h4>
                <ul className="space-y-4 text-sm font-medium opacity-80 font-body">
                  <li>• Informatique</li>
                  <li>• MIAGE</li>
                  <li>• Mathématiques Appliquées</li>
                  <li>• Biologie & Environnement</li>
                  <li>• Énergie Photovoltaïque</li>
                </ul>
              </div>
              <div className="p-10 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all">
                <h4 className="text-2xl font-black mb-6 text-tertiary-fixed-dim font-headline">Admin & Gestion (FSAG)</h4>
                <ul className="space-y-4 text-sm font-medium opacity-80 font-body">
                  <li>• Administration Publique</li>
                  <li>• Économie</li>
                  <li>• Gestion</li>
                  <li>• Économie Sociale et Solidaire</li>
                </ul>
              </div>
              <div className="p-10 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all">
                <h4 className="text-2xl font-black mb-6 text-tertiary-fixed-dim font-headline">Lettres & Humaines (FLSH)</h4>
                <ul className="space-y-4 text-sm font-medium opacity-80 font-body">
                  <li>• Sociologie & Anthropologie</li>
                  <li>• Langue Anglaise</li>
                  <li>• Langue Arabe</li>
                  <li>• Lettres Modernes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-low w-full py-20 border-t border-outline-variant/10">
        <div className="flex flex-col md:flex-row justify-between items-center px-10 gap-16 w-full max-w-screen-2xl mx-auto">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <img src="/logo-campusconnect.png" alt="CampusConnect Logo" className="h-8 w-auto grayscale opacity-50" />
              <div className="font-headline font-black text-2xl text-primary tracking-tighter opacity-80">CampusConnect</div>
            </div>
            <p className="font-body text-[11px] font-black uppercase tracking-[0.3em] text-on-surface-variant/60 leading-relaxed">
              © 2026 Université de Labé. <br/> 
              Conçu pour l'excellence académique en République de Guinée.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col gap-4">
              <span className="font-black text-[10px] uppercase tracking-widest text-primary">Plateforme</span>
              <a className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors" href="/login">Connexion</a>
              <a className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors" href="/register">Inscription</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-black text-[10px] uppercase tracking-widest text-primary">Institution</span>
              <a className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors" href="#">Rectorat</a>
              <a className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors" href="#">Facultés</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-black text-[10px] uppercase tracking-widest text-primary">Support</span>
              <a className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors" href="#">Assistance</a>
              <a className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors" href="#">Documentation</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-black text-[10px] uppercase tracking-widest text-primary">Légal</span>
              <a className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors" href="#">Confidentialité</a>
              <a className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors" href="#">Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
