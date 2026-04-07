import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Auth Callback Route
 * 
 * Handles the redirect from Supabase email confirmation links.
 * Exchanges the auth code for a session and redirects to dashboard.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectTo = searchParams.get('redirectTo') || '/dashboard/student'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Fetch role to redirect correctly
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .single()

      const role = profile?.role?.toLowerCase() || 'student'
      const rolePath = role === 'admin' ? 'admin' : role === 'teacher' ? 'teacher' : 'student'

      return NextResponse.redirect(`${origin}/dashboard/${rolePath}`)
    }
  }

  // If code exchange fails, redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=Confirmation échouée. Veuillez réessayer.`)
}
