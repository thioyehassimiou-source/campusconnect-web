'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function register(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('first-name') as string
  const lastName = formData.get('last-name') as string
  const fullName = `${firstName} ${lastName}`.trim()
  const role = formData.get('role') as string
  const department = formData.get('department') as string
  const faculty = formData.get('faculty') as string
  const level = formData.get('level') as string
  const service = formData.get('service') as string
  const studentId = formData.get('email') as string 

  const supabase = await createClient()

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
    return redirect(`/register?error=${encodeURIComponent(signUpError.message)}`)
  }

  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        role: role,
        student_id: studentId,
        faculty: faculty,
        department: department,
        level: level,
        service: service
      })
      .eq('id', data.user.id)

    if (profileError) {
       console.error('Profile update error:', profileError)
    }
  }

  const roleRedirect = role.toLowerCase() === 'admin' ? 'admin' : 
                       role.toLowerCase() === 'teacher' ? 'teacher' : 'student'
  
  redirect(`/dashboard/${roleRedirect}`)
}
