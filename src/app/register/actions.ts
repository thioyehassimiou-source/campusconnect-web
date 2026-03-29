'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function register(formData: FormData) {
  const rawStudentId = formData.get('student_id') as string
  const studentId = rawStudentId ? rawStudentId.trim().toUpperCase() : ''
  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const fullName = `${firstName} ${lastName}`.trim()
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm_password') as string
  const role = 'student' // Force student role for all registrations
  const department = formData.get('department') as string
  const faculty = formData.get('faculty') as string
  const level = formData.get('level') as string

  // Validation INE
  const ineRegex = /^[A-Z]{4}\d{10}$/
  if (!studentId || !ineRegex.test(studentId)) {
    return redirect(`/register?error=${encodeURIComponent('Le matricule (INE) doit contenir 4 lettres majuscules suivies de 10 chiffres.')}`)
  }

  // Generate internal email
  const email = `${studentId.toLowerCase()}@campusconnect.local`

  const supabase = await createClient()
  const requireEmailConfirmation = process.env.REQUIRE_EMAIL_CONFIRMATION === 'true'

  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role,
      }
    }
  })

  if (signUpError) {
    if (signUpError.message.includes('already registered')) {
      return redirect('/login?error=account-exists')
    }
    return redirect(`/register?error=${encodeURIComponent(signUpError.message)}`)
  }

  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: data.user.id,
        full_name: fullName,
        role: role,
        matricule: studentId,
        student_id: studentId, // Keeping this field as backup if it was used elsewhere
        faculty: faculty,
        department: department,
        level: level,
        updated_at: new Date().toISOString()
      })

    if (profileError) {
      console.warn('Profile creation/update failed:', profileError)
    }
  }

  if (requireEmailConfirmation) {
    return redirect('/login?message=check-email')
  }

  redirect(`/dashboard/student`)
}
