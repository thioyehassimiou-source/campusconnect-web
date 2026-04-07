'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function resetPassword(formData: FormData) {
  const rawStudentId = formData.get('student_id') as string
  const studentId = rawStudentId ? rawStudentId.trim().toUpperCase() : ''

  const ineRegex = /^[A-Z]{4}\d{10}$/
  if (!studentId || !ineRegex.test(studentId)) {
    return redirect('/forgot-password?error=Matricule (INE) invalide.')
  }

  const email = `${studentId.toLowerCase()}@campusconnect.local`
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').origin}/dashboard/profile`,
  })

  if (error) {
    return redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`)
  }

  return redirect('/login?message=reset-link-sent')
}

export async function login(formData: FormData) {
  const rawStudentId = formData.get('student_id') as string
  const studentId = rawStudentId ? rawStudentId.trim().toUpperCase() : ''
  const password = formData.get('password') as string

  // Validation INE
  const ineRegex = /^[A-Z]{4}\d{10}$/
  if (!studentId || !ineRegex.test(studentId)) {
    return redirect('/login?error=Le matricule (INE) doit contenir 4 lettres majuscules suivies de 10 chiffres.')
  }

  // Generate internal email mapping
  const email = `${studentId.toLowerCase()}@campusconnect.local`

  const supabase = await createClient()

  // RATE LIMITING: Check for failed attempts (max 5 in 15 mins)
  const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString()
  const { count: failedAttempts } = await supabase
    .from('auth_logs')
    .select('*', { count: 'exact', head: true })
    .eq('identifier', studentId)
    .eq('event_type', 'login_attempt')
    .eq('status', 'failure')
    .gte('created_at', fifteenMinsAgo)
  
  if (failedAttempts && failedAttempts >= 5) {
    return redirect('/login?error=Trop de tentatives échouées. Veuillez patienter 15 minutes.')
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Log failure
    await supabase.from('auth_logs').insert({
      identifier: studentId,
      event_type: 'login_attempt',
      status: 'failure'
    })

    if (error.message.includes('Email not confirmed')) {
      return redirect('/login?message=check-email')
    }
    if (error.message.includes('Invalid login credentials')) {
      return redirect('/login?error=Matricule ou mot de passe incorrect.')
    }
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  // Log success
  await supabase.from('auth_logs').insert({
      identifier: studentId,
      event_type: 'login_attempt',
      status: 'success'
  })

  redirect('/')
}
