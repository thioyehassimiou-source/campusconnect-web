import { UserProfile } from '../types'

interface PersonalInfoFormProps {
  profile: UserProfile
}

export function PersonalInfoForm({ profile }: PersonalInfoFormProps) {
  return (
    <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-sm border border-outline-variant/10 animate-in fade-in slide-in-from-left-6 duration-700">
      <h3 className="text-xl font-black text-primary mb-8 font-headline tracking-tight">Détails de l'utilisateur</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-50 ml-1">Prénom</label>
          <input 
            className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 transition-all placeholder:opacity-30" 
            type="text" 
            defaultValue={profile.firstName}
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-50 ml-1">Nom</label>
          <input 
            className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 transition-all placeholder:opacity-30" 
            type="text" 
            defaultValue={profile.lastName}
          />
        </div>
        <div className="space-y-3 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-50 ml-1">Email universitaire</label>
          <input 
            className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-bold text-on-surface opacity-60 cursor-not-allowed" 
            type="email" 
            readOnly
            defaultValue={profile.email}
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-50 ml-1">Téléphone</label>
          <input 
            className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 transition-all" 
            type="text" 
            defaultValue={profile.phone}
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-50 ml-1">Date de naissance</label>
          <input 
            className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 transition-all" 
            type="text" 
            defaultValue={profile.birthDate}
          />
        </div>
        <div className="space-y-3 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-50 ml-1">Biographie</label>
          <textarea 
            className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 transition-all min-h-[120px] resize-none" 
            defaultValue={profile.bio}
          />
        </div>
      </div>
    </div>
  )
}
