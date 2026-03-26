import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const getUserContext = cache(async () => {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { user, profile, supabase }
})

export async function requireAuth() {
  const ctx = await getUserContext()
  if (!ctx || !ctx.user) {
    redirect('/login')
  }
  return ctx
}

export async function requireRole(allowedRoles: string[]) {
  const ctx = await requireAuth()
  const role = ctx.profile?.role || 'student'

  if (!allowedRoles.includes(role)) {
    redirect(`/dashboard/${role}`)
  }

  return { ...ctx, role }
}
