'use client'

import { useState, useRef } from 'react'
import { Camera } from 'lucide-react'
import { useToast } from '@/components/ui/Toast'
import { createClient } from '@/lib/supabase/client'
import { ProfileHeader } from '@/features/profile/components/ProfileHeader'
import { AcademicInfoCard } from '@/features/profile/components/AcademicInfoCard'
import { PersonalInfoForm } from '@/features/profile/components/PersonalInfoForm'
import { CampusStatusCard } from '@/features/profile/components/CampusStatusCard'
import { Profile, AccountStatus } from '@/features/profile/types'

interface ProfileClientPageProps {
  initialProfile: Profile | null
}

export default function ProfileClientPage({ initialProfile }: ProfileClientPageProps) {
  const [profile, setProfile] = useState<Profile>(initialProfile || {} as Profile)
  const [uploading, setUploading] = useState(false)
  
  const { success, error } = useToast()
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${profile.id}-${Math.random()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // 1. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // 3. Update Profile Table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile.id)

      if (updateError) throw updateError

      setProfile(prev => ({ ...prev, avatar_url: publicUrl }))
      success('Photo de profil mise à jour !')
    } catch (err: any) {
      error(err.message || "Erreur lors de l'envoi de la photo.")
    } finally {
      setUploading(false)
    }
  }

  // derive status from real profile if available, otherwise fallback to restrictive states to avoid fake 'A JOUR'
  const realStatus: AccountStatus = {
    badge: 'INACTIF',
    library: 'SUSPENDU',
    tuition: 'EN ATTENTE'
  }

  return (
    <div className="max-w-6xl mx-auto pb-24 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="relative">
        <ProfileHeader profile={profile} />
        
        {/* Hidden File Input for Avatar */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
        
        {/* Overlay the Edit Button in Header logic or just trigger it */}
        <button 
          disabled={uploading}
          onClick={handleAvatarClick}
          className="absolute top-28 left-32 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all disabled:opacity-50 border-4 border-white"
        >
          {uploading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Camera className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <PersonalInfoForm profile={profile} />
        </div>
        
        <div className="space-y-10">
          <AcademicInfoCard profile={profile} />
          <CampusStatusCard status={realStatus} />
        </div>
      </div>
    </div>
  )
}
