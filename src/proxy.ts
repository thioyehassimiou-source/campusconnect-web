import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/auth/callback',
  '/',
  '/terms',
  '/privacy',
]

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/admin',
  '/api/ai',
]

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix))
}

export default async function proxy(request: NextRequest) {
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
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
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

  const pathname = request.nextUrl.pathname
  const url = request.nextUrl.clone()

  // 1. Protection for unauthenticated users accessing private routes
  if (!user && isProtectedRoute(pathname)) {
    url.pathname = '/login'
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  // 2. Role-based checks and convenience redirects for authenticated users
  if (user) {
    const isAuthPath = pathname === '/login' || pathname === '/register'
    const isDashboardPath = pathname.startsWith('/dashboard')
    const isAdminPath = pathname.startsWith('/admin')

    if (isAuthPath || isDashboardPath || isAdminPath) {
      // 🚀 OPTIMIZATION: LECTURE DIRECTE DEPUIS LE JWT (app_metadata.role)
      const role = (user.app_metadata?.role || 'student').toLowerCase()

      if (isAuthPath) {
        const roleRedirect = role === 'admin' ? 'admin' : role === 'teacher' ? 'teacher' : 'student'
        url.pathname = `/dashboard/${roleRedirect}`
        return NextResponse.redirect(url)
      }

      // Protection des routes Administrateur
      if (isAdminPath && role !== 'admin') {
        const fallback = role === 'teacher' ? 'teacher' : 'student'
        url.pathname = `/dashboard/${fallback}`
        return NextResponse.redirect(url)
      }
      
      // Protection des dashboards spécifiques
      if (pathname.startsWith('/dashboard/teacher') && role !== 'teacher' && role !== 'admin') {
         url.pathname = `/dashboard/${role}`
         return NextResponse.redirect(url)
      }
      if (pathname.startsWith('/dashboard/student') && role !== 'student' && role !== 'admin') {
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
