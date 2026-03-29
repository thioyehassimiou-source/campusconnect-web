import { Landmark, GraduationCap, Calendar, History } from 'lucide-react'
import { Profile } from '../types'

interface AcademicInfoCardProps {
  profile: Profile
}

export function AcademicInfoCard({ profile }: AcademicInfoCardProps) {
  const items = [
    { label: 'Faculté', value: profile.faculty, icon: Landmark },
    { label: 'Cursus', value: profile.curriculum, icon: History },
    { label: 'Année', value: profile.year, icon: Calendar }
  ]

  return (
    <div className="bg-primary text-white p-10 rounded-[2.5rem] shadow-2xl shadow-primary/20 overflow-hidden relative group animate-in fade-in slide-in-from-right-6 duration-700">
      <div className="relative z-10">
        <h3 className="text-xl font-black mb-10 font-headline tracking-tighter">Informations académiques</h3>
        <div className="space-y-8">
          {items.map((item) => (
            <div key={item.label} className="flex items-start space-x-6">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md shadow-inner">
                <item.icon className="h-6 w-6 text-blue-200" strokeWidth={3} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-blue-200/60 uppercase font-black tracking-[0.25em]">{item.label}</p>
                <p className="text-base font-black tracking-tight">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-1000 rotate-12">
        <GraduationCap className="h-64 w-64 text-white" fill="currentColor" />
      </div>
    </div>
  )
}
