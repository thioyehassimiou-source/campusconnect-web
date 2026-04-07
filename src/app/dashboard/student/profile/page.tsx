import { requireRole } from '@/lib/auth'
import dynamic from 'next/dynamic'
import { getProfile } from '@/features/profile/services/profileService'

const ProfileClientPage = dynamic(() => import('./ProfileClientPage'), {
  loading: () => <div className="animate-pulse bg-slate-900/50 rounded-3xl h-[600px] w-full" />
})

export default async function ProfilePage() {
  await requireRole(['student', 'teacher', 'admin'])
  
  const profile = await getProfile()
  
  return <ProfileClientPage initialProfile={profile} />
}
