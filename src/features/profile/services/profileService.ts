import { createClient } from '@/lib/supabase/server'
import { Profile, ProfileUpdate } from '../types'

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.warn('Error fetching profile:', error)
    return null
  }

  // Inject email from auth user if needed, as it lives in auth.users
  return {
    ...data,
    email: user.email
  } as Profile
}

export async function updateProfile(updates: ProfileUpdate) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)

  if (error) throw error
}
