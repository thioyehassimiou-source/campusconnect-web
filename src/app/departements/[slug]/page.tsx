import { notFound } from 'next/navigation'
import Link from 'next/link'
import { departments } from '@/features/departments/data'
import { 
  ArrowLeft, 
  User, 
  ShieldCheck, 
  History, 
  GraduationCap, 
  Briefcase, 
  Building2,
  Globe,
  CheckCircle2,
  Cpu,
  BarChart,
  Target,
  TrendingUp,
  FileText,
  Users,
  Sparkles
} from 'lucide-react'
import EligibilityTester from '@/features/departments/components/EligibilityTester'
import SupportServices from '@/features/departments/components/SupportServices'

const iconMap: Record<string, any> = {
  Laptop: Cpu,
  BarChart: BarChart,
  TrendingUp: TrendingUp,
  FileText: FileText,
  Users: Users,
  Globe: Globe,
  GraduationCap: GraduationCap
}

export default async function DepartmentPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const department = departments[slug]

  if (!department) {
    notFound()
  }

  const DeptIcon = iconMap[department.icon] || Cpu

  return (
    <div className="min-h-screen bg-white text-slate-700 selection:bg-primary/10 selection:text-primary font-body">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/#faculties" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour
          </Link>
          <div className="flex items-center gap-6">
             <div className="text-right hidden sm:block">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/60 mb-0.5">FILIÈRE ACADÉMIQUE</p>
                <p className="text-xs font-bold text-slate-900">{department.faculty}</p>
             </div>
             <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                <DeptIcon className="h-5 w-5 text-primary" />
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Header Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400">
              Département Officiel
            </div>
            {department.isCertified && (
              <div className="px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3" />
                Accrédité
              </div>
            )}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 font-headline leading-tight">
            {department.name}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-4xl">
            {department.description}
          </p>
        </section>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Responsable</h4>
                    <p className="text-base font-black text-slate-900 tracking-tight">{department.head}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Programmes</h4>
                    <p className="text-base font-black text-slate-900 tracking-tight">{department.programDirector}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Content */}
            <div className="space-y-10">
              <section className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight font-headline flex items-center gap-3">
                  <History className="h-5 w-5 text-primary" />
                  Contexte & Vision
                </h3>
                <p className="text-base text-slate-500 leading-relaxed italic border-l-4 border-primary/20 pl-6">
                  {department.history}
                </p>
              </section>

              <section className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight font-headline flex items-center gap-3">
                  <Target className="h-5 w-5 text-primary" />
                  Missions de la Filière
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {department.missions.map((mission, i) => (
                    <div key={i} className="flex gap-4 items-start">
                       <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                       <p className="text-sm font-medium text-slate-600 leading-snug">{mission}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight font-headline">Cursus & Matières</h3>
                <div className="flex flex-wrap gap-2 mb-10">
                  {department.degrees.map((degree, i) => (
                    <span key={i} className="px-4 py-2 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">{degree}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {department.subjects.map((subject, i) => (
                    <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500">{subject}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
             <section className="p-10 bg-primary rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-8 tracking-tighter">Votre Admission</h3>
                  <div className="space-y-4 mb-8">
                    <div className="p-5 bg-white/10 rounded-2xl border border-white/10">
                      <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Moyenne Recommandée</p>
                      <p className="text-3xl font-black">{department.admissionCriteria.minAverage}/20</p>
                    </div>
                    <div className="p-5 bg-white/10 rounded-2xl border border-white/10">
                      <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Séries Bac</p>
                      <p className="text-sm font-black">{department.admissionCriteria.bacSeries.join(' • ')}</p>
                    </div>
                  </div>
                  <Link href="https://parcoursupguinee.org" target="_blank" className="w-full py-4 bg-white text-primary rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                    <Globe className="h-4 w-4" />
                    Explorer sur Parcoursup
                  </Link>
                </div>
                <Globe className="absolute -right-8 -bottom-8 h-48 w-48 text-white opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
             </section>

             <EligibilityTester department={department} />

             <section className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
                  <Briefcase className="h-4 w-4" />
                  Métiers & Carrières
                </h3>
                <div className="space-y-3">
                  {department.careerPaths.map((career, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-1 h-1 rounded-full bg-primary" />
                       <p className="text-sm font-bold text-slate-500">{career}</p>
                    </div>
                  ))}
                </div>
             </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-100 py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">© {new Date().getFullYear()} CampusConnect — Université de Labé</p>
        </div>
      </footer>
    </div>
  )
}
