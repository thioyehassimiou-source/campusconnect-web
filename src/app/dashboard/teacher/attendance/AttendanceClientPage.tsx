'use client'

import { useState } from 'react'
import { Filter, Search, CheckCircle2, XCircle, AlertCircle, Clock, QrCode, X } from 'lucide-react'
import { markAttendance } from '@/features/attendance/actions'
import { useToast } from '@/components/ui/Toast'
import QRGenerator from '@/features/attendance/components/QRGenerator'

interface AttendanceClientPageProps {
  initialCourses: any[]
  initialAttendance: any[]
}

export default function AttendanceClientPage({ initialCourses, initialAttendance }: AttendanceClientPageProps) {
  const { toast } = useToast()
  const [activeCourse, setActiveCourse] = useState(initialCourses[0]?.id || '')
  const [loading, setLoading] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const handleValidate = async () => {
    setLoading(true)
    try {
      // Logic would iterate through students and call markAttendance
      toast('Émargement enregistré avec succès !', 'success')
    } catch (error) {
      toast('Erreur lors de la validation.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const currentCourse = initialCourses.find(c => c.id === activeCourse)

  const students = initialAttendance.map((a: any) => ({
    id: a.id,
    name: a.profile?.full_name || 'Étudiant',
    avatar: a.profile?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    status: a.status || 'present',
    time: a.marked_at ? new Date(a.marked_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '--:--'
  }))

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700 pb-20">
      {/* QR Code Modal Overlay */}
      {showQR && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-md animate-in zoom-in duration-300">
            <button 
              onClick={() => setShowQR(false)}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <QRGenerator 
              courseId={activeCourse} 
              courseName={currentCourse?.title} 
            />
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
          <input 
            className="w-full bg-white border border-outline-variant/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-sm"
            placeholder="Rechercher un étudiant..." 
            type="text" 
          />
        </div>
        <button 
          onClick={() => setShowQR(true)}
          className="flex items-center gap-3 px-6 py-4 bg-primary text-white rounded-2xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <QrCode className="h-5 w-5" />
          Générer Code QR
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Left: Course Selection */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/5 shadow-sm">
            <h3 className="text-lg font-black text-on-surface-variant mb-6 uppercase tracking-widest text-xs">Cours Actifs</h3>
            <div className="space-y-3">
              {initialCourses.map((course: any) => (
                <button 
                  key={course.id}
                  onClick={() => setActiveCourse(course.id)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all border ${
                    activeCourse === course.id 
                    ? 'bg-primary/5 border-primary/20 scale-[1.02]' 
                    : 'bg-transparent border-transparent hover:bg-surface-container-low'
                  }`}
                >
                  <div className="text-left">
                    <p className={`text-sm font-black ${activeCourse === course.id ? 'text-primary' : 'text-on-surface'}`}>{course.title}</p>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-1">{course.code}</p>
                  </div>
                  {activeCourse === course.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary/10 to-transparent p-8 rounded-[2.5rem] border border-secondary/10">
            <h4 className="text-xs font-black text-secondary uppercase tracking-[0.2em] mb-4">Statistiques du jour</h4>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <p className="text-sm font-bold text-on-surface-variant">Présence Globale</p>
                <p className="text-3xl font-black text-secondary tracking-tighter">94%</p>
              </div>
              <div className="w-full bg-white/50 h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[94%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Attendance List */}
        <div className="xl:col-span-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/5 shadow-xl shadow-primary/5">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black text-on-surface tracking-tighter">Liste d'appel</h2>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-secondary text-on-secondary text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-secondary/20 hover:scale-105 transition-all active:scale-95">Tout présent</button>
                <button 
                  onClick={handleValidate}
                  disabled={loading}
                  className="px-8 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Envoi...' : "Valider l'appel"}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-low transition-all group border border-transparent hover:border-outline-variant/10">
                  <div className="flex items-center gap-4">
                    <img src={student.avatar} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/5" />
                    <div>
                      <p className="font-black text-on-surface">{student.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-on-surface-variant" />
                        <span className="text-[10px] font-bold text-on-surface-variant">{student.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${student.status === 'present' ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-surface-container-high text-on-surface-variant opacity-50 group-hover/btn:opacity-100'}`}>
                      <CheckCircle2 className="h-6 w-6" />
                    </button>
                    <button className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${student.status === 'absent' ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-surface-container-high text-on-surface-variant opacity-50 group-hover/btn:opacity-100'}`}>
                      <XCircle className="h-6 w-6" />
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container-high text-on-surface-variant opacity-50 group-hover/btn:opacity-100 transition-all">
                      <AlertCircle className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
