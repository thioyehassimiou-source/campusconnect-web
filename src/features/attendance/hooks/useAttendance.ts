import { useState } from 'react'
import { attendanceService, AttendanceSession } from '../services/attendance.service'

export function useAttendance() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [session, setSession] = useState<AttendanceSession | null>(null)

  /**
   * Teachers: Generate a new session
   */
  const generateSession = async (courseId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await attendanceService.createSession(courseId)
      setSession(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Students: Mark attendance using scanned QR data
   */
  const markStudentAttendance = async (payload: { session_id: string, signature: string, expires_at: string }) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Validate expiration manually in frontend as well for better UX
      const sessionExpiresAt = new Date(payload.expires_at).getTime()
      const now = new Date().getTime()

      if (now > sessionExpiresAt) {
        throw new Error('Ce QR Code a expiré.')
      }

      await attendanceService.markAttendance({
        session_id: payload.session_id,
        signature: payload.signature
      })
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetStatus = () => {
    setSuccess(false)
    setError(null)
  }

  return {
    generateSession,
    markStudentAttendance,
    session,
    isLoading,
    error,
    success,
    resetStatus,
    setError,
    setSuccess
  }
}
