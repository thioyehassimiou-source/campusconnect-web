import { Edit3, GraduationCap } from 'lucide-react'
import { Profile } from '../types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface ProfileHeaderProps {
  profile: Profile
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const enrollDate = profile.created_at ? format(new Date(profile.created_at as string), 'MMM yyyy', { locale: fr }) : 'N/A'

  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between space-y-8 md:space-y-0 animate-in fade-in slide-in-from-top-6 duration-700">
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-8">
        <div className="relative group">
          <div className="w-40 h-40 rounded-[2.5rem] ring-8 ring-surface-container-high overflow-hidden shadow-2xl transition-transform group-hover:scale-[1.02] duration-500 bg-surface-container-lowest">
            <img 
              src={profile.avatar_url || '/placeholder-avatar.png'} 
              alt={profile.full_name || 'Avatar'} 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute -bottom-2 -right-2 bg-primary text-white p-3.5 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all border-4 border-white">
            <Edit3 className="h-5 w-5" />
          </button>
        </div>
        
        <div className="text-center sm:text-left pb-2">
          <h2 className="text-4xl font-black text-primary tracking-tighter mb-2 font-headline">
            {profile.full_name || 'Utilisateur'}
          </h2>
          <p className="text-on-surface-variant flex items-center justify-center sm:justify-start mt-1 font-bold opacity-70">
            <GraduationCap className="h-5 w-5 mr-2 text-primary opacity-60" strokeWidth={3} />
            {profile.role === 'student' ? `Étudiant en ${profile.faculty || 'Non spécifié'}` : profile.role}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-3 mt-6">
            <span className="px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-xl text-[10px] font-black uppercase tracking-widest shadow-inner">
              MATRICULE: {profile.student_id || 'N/A'}
            </span>
            <span className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant rounded-xl text-[10px] font-black uppercase tracking-widest shadow-inner">
              Inscrit en: {enrollDate}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 w-full md:w-auto">
        <button className="flex-1 md:flex-none px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-high transition-all border border-outline-variant/20">
          Aperçu Public
        </button>
        <button className="flex-1 md:flex-none px-10 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest bg-gradient-to-br from-primary to-primary-container text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
          Paramètres
        </button>
      </div>
    </section>
  )
}
