'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const studentId = formData.get('student_id') as string
  const password = formData.get('password') as string

  // Validation INE
  const ineRegex = /^[A-Z]{4}\d{10}$/
  if (!studentId || !ineRegex.test(studentId)) {
    return redirect('/login?error=Le matricule (INE) doit contenir 4 lettres majuscules suivies de 10 chiffres.')
  }

  // Generate internal email mapping
  const email = `${studentId.toLowerCase()}@campusconnect.local`

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message.includes('Email not confirmed')) {
      return redirect('/login?message=check-email')
    }
    if (error.message.includes('Invalid login credentials')) {
      return redirect('/login?error=Matricule ou mot de passe incorrect.')
    }
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
