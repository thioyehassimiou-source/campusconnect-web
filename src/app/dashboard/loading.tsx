export default function DashboardLoading() {
  return (
    <div className="max-w-[1400px] mx-auto pb-20 animate-pulse">
      {/* Welcome skeleton */}
      <section className="mb-12">
        <div className="h-10 bg-surface-container-high rounded-2xl w-64 mb-3" />
        <div className="h-5 bg-surface-container-high rounded-xl w-96" />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Main column */}
        <div className="xl:col-span-8 space-y-12">
          {/* Next class skeleton */}
          <div className="bg-surface-container-high/50 h-40 rounded-[3rem]" />
          {/* Announcements skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-surface-container-high/50 h-24 rounded-3xl" />
            ))}
          </div>
        </div>

        {/* Side column */}
        <div className="xl:col-span-4 space-y-10">
          <div className="bg-surface-container-high/50 h-48 rounded-[2.5rem]" />
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="bg-surface-container-high/50 h-20 rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
