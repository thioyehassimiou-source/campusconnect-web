'use client'

export default function StudentDashboardLoading() {
  return (
    <div className="max-w-[1400px] mx-auto pb-32 px-4 sm:px-0 animate-pulse">
      {/* Welcome Section Skeleton */}
      <div className="mb-14 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
        <div className="space-y-4">
          <div className="h-12 w-80 bg-slate-100 dark:bg-white/5 rounded-2xl" />
          <div className="h-4 w-64 bg-slate-50 dark:bg-white/[0.02] rounded-lg" />
        </div>
        <div className="h-14 w-48 bg-slate-100 dark:bg-white/10 rounded-full" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-48 bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[2rem] p-8 space-y-6">
            <div className="w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-2xl" />
            <div className="space-y-3">
              <div className="h-3 w-24 bg-slate-100 dark:bg-white/5 rounded-full" />
              <div className="h-8 w-20 bg-slate-100 dark:bg-white/10 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        <div className="xl:col-span-8 space-y-12">
          {/* Main Card Skeleton */}
          <div className="h-64 bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[2rem]" />
          <div className="h-96 bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[2rem]" />
        </div>
        <div className="xl:col-span-4 h-[600px] bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[2rem]" />
      </div>
    </div>
  )
}
