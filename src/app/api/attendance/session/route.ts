import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user is a teacher
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'teacher' && profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Insufficient role' }, { status: 403 })
    }

    const { course_id } = await req.json()
    if (!course_id) {
      return NextResponse.json({ error: 'course_id is required' }, { status: 400 })
    }

    // Expiration in 5 minutes
    const expires_at = new Date(Date.now() + 5 * 60 * 1000).toISOString()

    const { data: session, error: sessionError } = await supabase
      .from('attendance_sessions')
      .insert({
        course_id,
        instructor_id: user.id,
        expires_at
      })
      .select()
      .single()

    if (sessionError) {
      return NextResponse.json({ error: sessionError.message }, { status: 500 })
    }

    // Generate Signature
    const secret = process.env.QR_SECRET_KEY || 'campus-connect-security-v1'
    const signature = crypto.createHmac('sha256', secret).update(session.id).digest('hex')

    return NextResponse.json({
      session_id: session.id,
      signature,
      expires_at
    })
  } catch (error: any) {
    console.error('API Session Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
