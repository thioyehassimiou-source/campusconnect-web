import { requireRole } from '@/lib/auth'
import ProfileClientPage from './ProfileClientPage'
import { getProfile } from '@/features/profile/services/profileService'

export default async function ProfilePage() {
  await requireRole(['student', 'teacher', 'admin'])
  
  const profile = await getProfile()
  
  return <ProfileClientPage initialProfile={profile} />
}
