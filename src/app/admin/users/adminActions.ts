'use server'

import { createClient } from '@/lib/supabase/server'
import { requireRole } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function updateUserRole(userId: string, newRole: string) {
  // 1. Check if the current user is an admin
  await requireRole(['admin'])
  
  const supabase = await createClient()

  // 2. Update the role in the profiles table
  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId)

  if (error) {
    console.warn('Error updating user role:', error)
    throw new Error('Failed to update user role')
  }

  // 3. Revalidate the admin users page
  revalidatePath('/admin/users')
  
  return { success: true }
}
