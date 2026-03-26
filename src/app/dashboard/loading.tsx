export default function DashboardLoading() {
  return (
    <div className="w-full h-full p-10 animate-pulse space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <div className="h-10 w-64 bg-surface-container-high rounded-2xl" />
          <div className="h-5 w-96 bg-surface-container-low rounded-xl" />
        </div>
        <div className="h-16 w-48 bg-primary/20 rounded-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 h-[450px] bg-white rounded-[3.5rem] border border-outline-variant/10 shadow-sm" />
        <div className="h-[450px] bg-white rounded-[3.5rem] border border-outline-variant/10 shadow-sm" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-surface-container-low rounded-[2rem]" />
        ))}
      </div>
    </div>
  )
}
