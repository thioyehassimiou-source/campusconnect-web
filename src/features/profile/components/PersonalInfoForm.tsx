'use client'

import { useActionState } from 'react'
import { Profile } from '../types'
import { updateProfileAction } from '../actions'
import { Loader2, Save } from 'lucide-react'

interface PersonalInfoFormProps {
  profile: Profile
}

export function PersonalInfoForm({ profile }: PersonalInfoFormProps) {
  const [state, action, isPending] = useActionState(updateProfileAction, null)

  return (
    <form action={action} className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-sm border border-outline-variant/10 animate-in fade-in slide-in-from-left-6 duration-700">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-primary font-headline tracking-tight">Détails de l'utilisateur</h3>
        <button 
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 group-hover:scale-110 transition-transform" />}
          Sauvegarder
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-50 ml-1">Nom complet</label>
          <input 
            name="full_name"
            className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 transition-all placeholder:opacity-30" 
            type="text" 
            defaultValue={profile.full_name || ''}
          />
          {state?.fieldErrors?.full_name && <p className="text-[10px] text-error font-bold ml-1">{state.fieldErrors.full_name[0]}</p>}
        </div>

        <div className="space-y-3 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-50 ml-1">Email universitaire</label>
          <input 
            className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-bold text-on-surface opacity-60 cursor-not-allowed" 
            type="email" 
            readOnly
            defaultValue={profile.email || ''}
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-50 ml-1">Téléphone</label>
          <input 
            name="phone"
            className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 transition-all" 
            type="text" 
            defaultValue={profile.phone || ''}
          />
          {state?.fieldErrors?.phone && <p className="text-[10px] text-error font-bold ml-1">{state.fieldErrors.phone[0]}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-50 ml-1">Date de naissance</label>
          <input 
            name="birth_date"
            className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 transition-all" 
            type="text" 
            defaultValue={profile.birth_date || ''}
          />
          {state?.fieldErrors?.birth_date && <p className="text-[10px] text-error font-bold ml-1">{state.fieldErrors.birth_date[0]}</p>}
        </div>

        <div className="space-y-3 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-50 ml-1">Biographie</label>
          <textarea 
            name="bio"
            className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 transition-all min-h-[120px] resize-none" 
            defaultValue={profile.bio || ''}
          />
          {state?.fieldErrors?.bio && <p className="text-[10px] text-error font-bold ml-1">{state.fieldErrors.bio[0]}</p>}
        </div>
      </div>

      {state?.error && (
        <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-2xl text-error text-[10px] font-black uppercase tracking-widest text-center">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-600 text-[10px] font-black uppercase tracking-widest text-center">
          Profil mis à jour avec succès
        </div>
      )}
    </form>
  )
}
