import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Calendar, MessageSquare, ArrowRight, ChevronRight, GraduationCap } from 'lucide-react'
import InteractiveElement from '@/components/landing/InteractiveElement'
import { ThemeToggleLight } from '@/components/theme/ThemeToggle'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="bg-surface text-on-surface selection:bg-secondary-container selection:text-on-secondary-container min-h-screen scroll-smooth overflow-x-hidden w-full">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-primary/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-primary/10">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 w-full max-w-screen-xl mx-auto box-border">
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-[1.02]">
            <div className="bg-white p-1.5 rounded-xl shadow-sm">
              <img src="/logo-campusconnect.png" alt="CampusConnect Logo" className="h-9 w-auto" />
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-headline font-black text-white leading-tight tracking-tighter">CampusConnect</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/60 leading-none decoration-none">Université de Labé</div>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10 font-headline font-bold text-xs uppercase tracking-widest text-white/70">
            <a href="#features" className="hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-white pb-1">Services</a>
            <a href="#faculties" className="hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-white pb-1">Facultés</a>
            <a href="#contact" className="hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-white pb-1">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggleLight />
            <Link href="/login" className="px-4 py-2 text-white font-headline font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-300 rounded-xl">
              Connexion
            </Link>
            <Link href="/register" className="px-6 py-3 bg-white text-primary font-headline font-black text-xs uppercase tracking-widest rounded-2xl active:scale-95 transition-transform duration-200 shadow-xl shadow-white/10 hover:bg-white/90">
              Inscription
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-32 w-full max-w-screen-xl mx-auto overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center flex-col md:flex-row">
            <div className="z-10 text-center lg:text-left entrance-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-[10px] font-black tracking-[0.2em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Innovation Académique en Guinée
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-primary leading-[1] mb-8 tracking-tighter font-headline">
                L'Excellence <br/>
                <span className="text-primary-container/80 italic">Redéfinie.</span>
              </h1>
              <p className="text-xl text-on-surface-variant leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0 font-body font-medium">
                Découvrez CampusConnect, le portail numérique officiel de l'Université de Labé. Une plateforme intégrée pour une gestion académique fluide et performante.
              </p>
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <Link href="/register" className="px-10 py-5 bg-primary text-white font-black uppercase tracking-[0.2em] text-xs rounded-[2rem] shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300 font-headline flex items-center gap-3">
                  Commencer l'aventure
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#features" className="px-10 py-5 border-2 border-outline-variant text-primary font-black uppercase tracking-[0.2em] text-xs rounded-[2rem] hover:bg-surface-container transition-all duration-300 active:scale-95 font-headline">
                  Découvrir nos services
                </a>
              </div>
            </div>
            <div className="relative group entrance-up">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-container rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white dark:bg-surface p-4 rounded-[3rem] shadow-2xl overflow-hidden border border-outline-variant/5">
                <img 
                  alt="Université de Labé" 
                  className="w-full h-auto rounded-[2.5rem] object-cover aspect-[4/3] grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgXeqgPZFrWKb_BlbXYVxL3WKFSJTbIaNzzywqdf921EGF8ceTfxigKXfZ2u2nfjv2cjBhM24vun0Vu1GxLsE22nSSJ9Ou6eT44F7rEaYuywLUTdnstQhcvz0lheJYXmkup0DKQhK4LukJL8TW8qNfIourbSDw17l7cAD_et8yoHlOspHumZ25hK7Ht6_FfvJhxzrsunjfDGMUlZBFw918b4Sq9122zXUg_fDg-noD8l1J2jV0ql7mWbFcpFi97clNjhYg71EX8pc"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Chiffres Clés */}
        <section className="py-24 bg-surface-container-low border-y border-outline-variant/10">
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-label text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-16">Nos Chiffres Clés</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24">
              {[
                { val: '+5000', label: 'Étudiants Actifs' },
                { val: '3', label: "Facultés d'Excellence" },
                { val: '15+', label: 'Filières de Licence' },
                { val: '100%', label: 'Digitalisé' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <span className="text-5xl lg:text-6xl font-headline font-black text-primary tracking-tighter transition-transform group-hover:scale-110">{stat.val}</span>
                  <span className="text-[10px] font-label text-on-surface-variant font-black uppercase tracking-widest opacity-60 mt-2">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="features" className="py-20 lg:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/[0.03] to-primary/[0.08] border-y border-primary/10">
          <div className="w-full max-w-screen-xl mx-auto">
          <div className="mb-16 lg:mb-24 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-primary mb-8 tracking-tighter font-headline">Services Intégrés</h2>
            <div className="w-24 h-2 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Calendar, title: 'Gestion Académique', desc: 'Accès en temps réel aux emplois du temps, relevés de notes et suivi des crédits ECTS.' },
              { icon: MessageSquare, title: 'Communication', desc: 'Forums de discussion par matière, messagerie sécurisée et notifications du Rectorat.' },
              { icon: GraduationCap, title: 'Émargements', desc: 'Validation des présences via QR Code sécurisé pour un suivi automatisé et transparent.' }
            ].map((service, i) => (
              <Link key={i} href="/login" className="block group">
              <InteractiveElement className="p-12 bg-white/80 dark:bg-surface/80 backdrop-blur-sm rounded-[3.5rem] border border-primary/20 hover:border-primary/40 transition-all duration-500 shadow-xl shadow-primary/5 hover:shadow-primary/10 flex flex-col items-center text-center h-full">
                <div className="w-24 h-24 rounded-[2rem] bg-primary/5 flex items-center justify-center mb-10 group-hover:bg-primary group-hover:rotate-12 transition-all duration-500">
                  <service.icon className="h-10 w-10 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-3xl font-black text-primary mb-6 tracking-tight font-headline">{service.title}</h3>
                <p className="text-lg text-on-surface-variant leading-relaxed font-medium font-body">{service.desc}</p>
              </InteractiveElement>
              </Link>
            ))}
          </div>
          </div>
        </section>

        {/* Faculties Section */}
        <section id="faculties" className="py-20 lg:py-32 bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-container/20 -skew-x-12 translate-x-1/2"></div>
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-12 lg:mb-20 tracking-tighter text-center lg:text-left font-headline">Nos Facultés</h2>
            <div className="grid lg:grid-cols-3 gap-12">
              {[
                { title: 'Sciences & Techniques (FST)', items: ['Informatique', 'MIAGE', 'Mathématiques Appliquées', 'Biologie & Environnement', 'Énergie Photovoltaïque'] },
                { title: 'Admin & Gestion (FSAG)', items: ['Administration Publique', 'Économie', 'Gestion', 'Économie Sociale et Solidaire'] },
                { title: 'Lettres & Humaines (FLSH)', items: ['Sociologie & Anthropologie', 'Langue Anglaise', 'Langue Arabe', 'Lettres Modernes'] }
              ].map((faculty, i) => (
                <InteractiveElement key={i} className="p-10 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all">
                  <h4 className="text-2xl font-black mb-6 text-white font-headline">{faculty.title}</h4>
                  <ul className="space-y-4 text-sm font-medium opacity-80 font-body">
                    {faculty.items.map((item, j) => <li key={j}>• {item}</li>)}
                  </ul>
                </InteractiveElement>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl mx-auto">
          <div className="w-full mx-auto bg-surface-container p-8 lg:p-24 text-center rounded-[2rem] lg:rounded-[3rem] border border-outline-variant/10 shadow-premium relative overflow-hidden entrance-up box-border">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-black font-headline text-primary mb-8 tracking-tighter">Prêt à transformer votre futur ?</h2>
            <p className="text-on-surface-variant text-lg mb-12 max-w-xl mx-auto leading-relaxed font-medium">Rejoignez des milliers d'étudiants sur la plateforme académique la plus avancée de Guinée.</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/register" className="px-12 py-5 bg-primary text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-3">
                S'inscrire maintenant
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="px-12 py-5 border-2 border-primary/20 text-primary rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary/5 transition-all">
                Se connecter
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-primary w-full border-t border-white/10 relative overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute -top-40 right-0 w-[600px] h-[400px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none max-w-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none max-w-full" />

        {/* Main footer content */}
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-12 border-b border-white/10">
            
            {/* Brand column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Link href="/" className="flex items-center gap-3 group w-fit">
                <div className="bg-white/10 p-2 rounded-xl border border-white/10 group-hover:bg-white/20 transition-all">
                  <img src="/logo-campusconnect.png" alt="CampusConnect" className="h-8 w-auto" />
                </div>
                <div>
                  <div className="text-2xl font-headline font-black text-white tracking-tighter">CampusConnect</div>
                  <div className="text-xs font-black uppercase tracking-widest text-white/50">Université de Labé</div>
                </div>
              </Link>

              <p className="text-base font-medium text-white/60 leading-relaxed max-w-xs">
                La plateforme numérique officielle de l'Université de Labé. Conçue pour l'excellence académique en République de Guinée.
              </p>

              {/* Status badge */}
              <div className="flex items-center gap-2 w-fit px-4 py-2 rounded-full border border-white/10 bg-white/5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-white/70">Plateforme opérationnelle</span>
              </div>
            </div>

            {/* Links grid */}
            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { title: 'Plateforme', links: [{ label: 'Connexion', href: '/login' }, { label: 'Inscription', href: '/register' }] },
                { title: 'Institution', links: [{ label: 'À Propos', href: '/about' }, { label: 'Facultés', href: '#faculties' }] },
                { title: 'Support', links: [{ label: 'Aide', href: '/contact' }, { label: 'Contact', href: '/contact' }] },
                { title: 'Légal', links: [{ label: 'Confidentialité', href: '/privacy' }, { label: 'Conditions', href: '/terms' }] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <span className="font-black text-xs uppercase tracking-wider text-white/50 border-b border-white/10 pb-2">
                    {col.title}
                  </span>
                  {col.links.map((link, j) => (
                    <Link 
                      key={j} 
                      href={link.href} 
                      className="text-sm font-semibold text-white/70 hover:text-white transition-all duration-200 uppercase tracking-wide hover:translate-x-0.5"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
            <p className="text-sm font-bold text-white/40 uppercase tracking-wider">
              © {new Date().getFullYear()} Université de Labé — République de Guinée
            </p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/30">
                <span className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                Propulsé par IA Groq Llama 3.3
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
