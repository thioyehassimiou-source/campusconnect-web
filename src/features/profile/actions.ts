'use server'

import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/action-utils'
import { ProfileUpdateSchema } from './types'
import { updateProfile as updateProfileService } from './services/profileService'

export const updateProfileAction = createSafeAction(
  ProfileUpdateSchema,
  async (data) => {
    await updateProfileService(data)
    revalidatePath('/dashboard/profile')
    return { success: true }
  }
)
