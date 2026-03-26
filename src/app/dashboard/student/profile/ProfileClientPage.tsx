'use client'

import { useState } from 'react'
import { User, Mail, Shield, Building, Edit3, Camera, Check } from 'lucide-react'
import { mockProfile, mockStatus, mockConnectedServices } from '@/features/profile/mockData'
import { UserProfile, ConnectedService } from '@/features/profile/types'

interface ProfileClientPageProps {
  initialProfile: UserProfile | null
}

export default function ProfileClientPage({ initialProfile }: ProfileClientPageProps) {
  const profile = initialProfile || mockProfile
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="max-w-6xl mx-auto pb-24 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="relative h-64 rounded-[3.5rem] bg-gradient-to-r from-primary/20 via-primary-container/40 to-secondary-container/20 overflow-hidden mb-[-80px] border border-outline-variant/10 shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.4),transparent)]" />
      </div>

      <div className="px-12 flex flex-col md:flex-row items-end gap-10 mb-16 relative z-10">
        <div className="relative group">
          <div className="w-48 h-48 rounded-[3rem] border-8 border-white overflow-hidden shadow-2xl bg-white group-hover:scale-105 transition-transform duration-500">
            <img src={profile.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400"} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-2 right-2 p-4 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all">
            <Camera className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 pb-4 flex justify-between items-end w-full">
          <div>
            <h2 className="text-5xl font-black font-headline text-on-surface tracking-tighter leading-tight mb-2">
              {profile.firstName} {profile.lastName}
            </h2>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-xl">
                <Shield className="h-4 w-4" />
                Étudiant
              </span>
              <span className="flex items-center gap-2 text-on-surface-variant/60 font-black text-xs uppercase tracking-widest">
                <Building className="h-4 w-4" />
                {profile.faculty}
              </span>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-3 bg-white border-2 border-outline-variant/10 px-8 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-container-low transition-all active:scale-95 shadow-sm"
          >
            {isEditing ? <Check className="h-4 w-4 text-green-500" /> : <Edit3 className="h-4 w-4" />}
            {isEditing ? 'Enregistrer' : 'Modifier le profil'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4">
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white rounded-[3.5rem] p-12 shadow-sm border border-outline-variant/5">
            <h3 className="text-2xl font-black font-headline text-primary mb-8 tracking-tight">Informations Personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-2">Email</label>
                <div className="bg-surface-container-low/50 p-5 rounded-2xl flex items-center gap-4 border border-outline-variant/10">
                  <Mail className="h-5 w-5 text-primary/40" />
                  <span className="font-bold text-on-surface opacity-70">{profile.email}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-2">Identifiant</label>
                <div className="bg-surface-container-low/50 p-5 rounded-2xl flex items-center gap-4 border border-outline-variant/10">
                  <User className="h-5 w-5 text-primary/40" />
                  <span className="font-bold text-on-surface opacity-70">#{profile.id.substring(0, 8).toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-2">Bio Communautaire</label>
              <textarea 
                className="w-full bg-surface-container-low/50 rounded-[2rem] p-8 border border-outline-variant/10 focus:ring-4 focus:ring-primary/5 min-h-[160px] text-on-surface font-medium resize-none transition-all"
                placeholder="Racontez-nous en un peu plus sur vous..."
                defaultValue={profile.bio || ''}
              />
            </div>
          </section>

          <section className="bg-surface-container-low/30 rounded-[3.5rem] p-12 border border-outline-variant/10">
            <h3 className="text-2xl font-black font-headline text-on-surface mb-8 tracking-tight">Statistiques Activité</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: 'Badge', value: mockStatus.badge },
                { label: 'Bibliothèque', value: mockStatus.library },
                { label: 'Scolarité', value: mockStatus.tuition }
              ].map(s => (
                <div key={s.label} className="bg-white p-6 rounded-3xl shadow-sm border border-outline-variant/5 text-center group hover:scale-105 transition-all">
                  <p className="text-xl font-black text-primary mb-1 tracking-tighter">{s.value}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">{s.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-10">
          <section className="bg-white rounded-[3.5rem] p-10 shadow-sm border border-outline-variant/5">
            <h3 className="text-2xl font-black font-headline text-on-surface mb-8 tracking-tight">Services Connectés</h3>
            <div className="space-y-4">
              {(mockConnectedServices as ConnectedService[]).map(s => (
                <div key={s.name} className="flex items-center justify-between p-5 bg-surface-container-low/50 rounded-2xl border border-outline-variant/10 group cursor-pointer hover:bg-white transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-primary/60">{s.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-black text-on-surface tracking-tight">{s.name}</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">{s.status}</p>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${s.status === 'CONNECTED' ? 'bg-green-500' : 'bg-outline-variant/40'}`} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
