'use client'

export default function TeacherDashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8 animate-pulse text-slate-800 pt-4">
      <div className="w-64 h-8 bg-slate-800 rounded-lg mb-2"></div>
      <div className="w-48 h-4 bg-slate-800/50 rounded-lg"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="h-32 bg-slate-900 border border-white/5 rounded-3xl"></div>
        <div className="h-32 bg-slate-900 border border-white/5 rounded-3xl"></div>
      </div>

      <div className="w-full h-64 bg-slate-900 border border-white/5 rounded-3xl mt-8"></div>
    </div>
  )
}
