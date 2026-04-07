import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { rateLimitResponse } from '@/lib/rate-limiter'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { session_id, signature, latitude, longitude } = await req.json()

    // 0. Rate Limiting (Prevent Brute-Force/Scanning)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const limitResponse = rateLimitResponse(ip, 5) // Low limit for attendance
    if (limitResponse) return limitResponse

    if (!session_id || !signature) {
      return NextResponse.json({ error: 'session_id and signature are required' }, { status: 400 })
    }

    // 1. Verify Geolocation (Anti-Fraud)
    if (!latitude || !longitude) {
      return NextResponse.json({ 
        error: 'Géolocalisation requise.', 
        message: 'Vous devez autoriser la localisation pour émarger.' 
      }, { status: 400 })
    }

    // 2. Verify Signature (HMAC)
    const secret = process.env.QR_SECRET_KEY || 'campus-connect-security-v1'
    const expectedSignature = crypto.createHmac('sha256', secret).update(session_id).digest('hex')
    
    // Constant time comparison to prevent timing attacks
    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )

    if (!isSignatureValid) {
      return NextResponse.json({ 
        error: 'Signature invalide. Le QR code a peut-être été altéré.' 
      }, { status: 400 })
    }

    // 3. Fetch Session Details & Validation
    const { data: session, error: sessionError } = await supabase
      .from('attendance_sessions')
      .select('expires_at, course_id')
      .eq('id', session_id)
      .single()

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session introuvable.' }, { status: 404 })
    }

    // Check expiration
    if (new Date(session.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Le QR Code a expiré.' }, { status: 400 })
    }

    // 4. Mark Attendance with Geolocation Metadata
    const { error: markError } = await supabase
      .from('attendance')
      .insert({
        student_id: user.id,
        session_id: session_id,
        course_id: session.course_id,
        status: 'present',
        metadata: {
          location: { lat: latitude, lng: longitude },
          ip: ip,
          user_agent: req.headers.get('user-agent'),
          scanned_at: new Date().toISOString()
        }
      })

    if (markError) {
      // Handle Unique Constraint (already emarged)
      if (markError.code === '23505') {
        return NextResponse.json({ error: 'Vous avez déjà émargé pour cette session.' }, { status: 400 })
      }
      return NextResponse.json({ error: markError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Émargement enregistré avec succès.' })
  } catch (error: any) {
    console.error('API Mark Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
