import { SupabaseClient } from '@supabase/supabase-js'
import { logger } from '@/lib/logger'

export interface AttendanceSession {
  id: string
  course_id: string
  instructor_id: string
  expires_at: string
  created_at: string
  signature?: string // Added for HMAC security
}

export interface AttendanceRecord {
  success: boolean
  message: string
}

export const attendanceService = {
  /**
   * Fetch attendance with pagination (Student or Teacher)
   */
  async getAttendance(supabase: SupabaseClient, courseId?: string, page = 1, limit = 20) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const from = (page - 1) * limit
    const to = from + limit - 1

    try {
      let query = supabase.from('attendance').select(`
        id,
        status,
        marked_at,
        course:courses(id, title, code)
      `)

      if (courseId) {
        query = query.eq('course_id', courseId)
      } else {
        query = query.eq('profile_id', user.id)
      }

      const { data, error } = await query
        .order('marked_at', { ascending: false })
        .range(from, to)

      if (error) throw error
      return data
    } catch (err) {
      logger.trackFailure('getAttendance', err)
      return []
    }
  },

  /**
   * Create a new attendance session (Teacher)
   */
  async createSession(courseId: string): Promise<AttendanceSession> {
    const response = await fetch('/api/attendance/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course_id: courseId })
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Erreur lors de la création de la session')

    return {
      id: data.session_id,
      course_id: courseId,
      instructor_id: '', 
      expires_at: data.expires_at,
      created_at: new Date().toISOString(),
      signature: data.signature
    }
  },

  /**
   * Mark attendance for the current student (Student)
   */
  async markAttendance(payload: { session_id: string, signature: string }): Promise<AttendanceRecord> {
    // Get geolocation before sending
    const coords = await new Promise<{ lat: number, lng: number }>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('La géolocalisation n’est pas supportée par votre navigateur.'))
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => reject(new Error('Veuillez autoriser la localisation pour émarger.')),
        { enableHighAccuracy: true, timeout: 5000 }
      )
    })

    const response = await fetch('/api/attendance/mark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        latitude: coords.lat,
        longitude: coords.lng
      })
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.error || "Erreur lors de l'émargement")

    return data as AttendanceRecord
  }
}
