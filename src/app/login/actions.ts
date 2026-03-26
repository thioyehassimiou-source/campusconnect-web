'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  // Fetch the user's role to redirect to the correct dashboard
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .single()

  const role = profile?.role?.toLowerCase() || 'student'
  const roleRedirect = role === 'admin' ? 'admin' : role === 'teacher' ? 'teacher' : 'student'

  redirect(`/dashboard/${roleRedirect}`)
}
