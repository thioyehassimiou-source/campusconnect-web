import { CourseAttendance } from '../types'

interface AttendanceTableProps {
  courses: CourseAttendance[]
}

export function AttendanceTable({ courses }: AttendanceTableProps) {
  return (
    <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm h-full animate-in fade-in slide-in-from-right-6 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <h4 className="text-2xl font-black text-primary font-headline tracking-tighter">Liste des cours & Assiduité</h4>
        <div className="flex bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/5 shadow-inner">
          <button className="px-5 py-2 bg-surface-container-lowest text-primary text-[10px] font-black uppercase tracking-widest rounded-lg shadow-md transition-all">Semestre 1</button>
          <button className="px-5 py-2 text-on-surface-variant text-[10px] font-black uppercase tracking-widest hover:text-primary transition-all">Semestre 2</button>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 border-b border-outline-variant/10">
              <th className="pb-5 pl-2">Matière / Cours</th>
              <th className="pb-5 px-6 text-center">Séances</th>
              <th className="pb-5 px-6 text-center">Absences</th>
              <th className="pb-5 pr-2">Assiduité</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {courses.map((course) => (
              <tr key={course.id} className="group hover:bg-surface-container-low/50 transition-all">
                <td className="py-6 pl-2">
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl ${course.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                      <span className="material-symbols-outlined text-xl">{course.icon}</span>
                    </div>
                    <div>
                      <span className="text-sm font-black text-primary tracking-tight transition-colors group-hover:text-primary-container">
                        {course.name}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-6 text-center text-sm font-black text-on-surface opacity-70">{course.sessions}</td>
                <td className={`py-6 px-6 text-center text-sm font-black ${course.absences > 0 ? 'text-error' : 'text-on-surface/20'}`}>
                  {course.absences.toString().padStart(2, '0')}
                </td>
                <td className="py-6 pr-2 min-w-[200px]">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-3 bg-surface-container rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${course.rate >= 85 ? 'bg-primary' : 'bg-error'}`} 
                        style={{ width: `${course.rate}%` }}
                      ></div>
                    </div>
                    <span className={`text-[11px] font-black w-14 text-right ${course.rate >= 85 ? 'text-primary' : 'text-error'}`}>
                      {course.rate}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
