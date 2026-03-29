import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()
  const isProtectedPath = url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/admin')
  const isAuthPath = url.pathname === '/login' || url.pathname === '/register'

  // 1. Protection for unauthenticated users accessing private routes
  if (!user && isProtectedPath) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 2. Role-based checks for authenticated users
  if (user) {
    if (isProtectedPath || isAuthPath) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      const role = (profile?.role || 'student').toLowerCase()

      if (isAuthPath) {
        const roleRedirect = role === 'admin' ? 'admin' : role === 'teacher' ? 'teacher' : 'student'
        url.pathname = `/dashboard/${roleRedirect}`
        return NextResponse.redirect(url)
      }

      if (url.pathname.startsWith('/admin') && role !== 'admin') {
        url.pathname = `/dashboard/${role === 'teacher' ? 'teacher' : 'student'}`
        return NextResponse.redirect(url)
      }
      
      if (url.pathname.startsWith('/dashboard/teacher') && role !== 'teacher' && role !== 'admin') {
         url.pathname = `/dashboard/${role}`
         return NextResponse.redirect(url)
      }
      if (url.pathname.startsWith('/dashboard/student') && role !== 'student' && role !== 'admin') {
         url.pathname = `/dashboard/${role}`
         return NextResponse.redirect(url)
      }
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
